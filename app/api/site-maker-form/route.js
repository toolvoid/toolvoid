import { NextResponse } from 'next/server';
import { getSiteMakerAdmin } from '../../../lib/siteMakerSupabase';
import { checkRPM } from '../../../lib/rpmLimiter';

const MAX_BODY_BYTES = 20 * 1024;
const MAX_FIELDS = 30;
const MAX_FIELD_VALUE_LENGTH = 2000;
const PROJECT_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

async function readBodyWithinLimit(request) {
  const reader = request.body?.getReader();
  if (!reader) return '';

  const chunks = [];
  let totalBytes = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    totalBytes += value.byteLength;
    if (totalBytes > MAX_BODY_BYTES) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }

  const body = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(body);
}

export async function POST(request) {
  const ip = request.headers.get('x-real-ip')?.trim()
    || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || 'unknown';
  const rate = checkRPM('site-maker-form', ip);
  if (!rate.allowed) return NextResponse.json({ error: 'Too many submissions. Try again later.' }, { status: 429 });

  const contentLength = Number(request.headers.get('content-length'));
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'Request body must be 20 KB or smaller.' }, { status: 413 });
  }

  let rawBody;
  try {
    rawBody = await readBodyWithinLimit(request);
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }
  if (rawBody === null) return NextResponse.json({ error: 'Request body must be 20 KB or smaller.' }, { status: 413 });

  let body;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON request body.' }, { status: 400 });
  }

  const { projectId, formElementId, fields } = body || {};
  if (typeof projectId !== 'string' || !PROJECT_ID_PATTERN.test(projectId)) {
    return NextResponse.json({ error: 'projectId must be a valid UUID.' }, { status: 400 });
  }
  if (typeof formElementId !== 'string' || formElementId.length === 0 || formElementId.length > 100) {
    return NextResponse.json({ error: 'formElementId must be a string of 1 to 100 characters.' }, { status: 400 });
  }
  if (!fields || typeof fields !== 'object' || Array.isArray(fields)) {
    return NextResponse.json({ error: 'fields must be an object.' }, { status: 400 });
  }
  const entries = Object.entries(fields);
  if (entries.length > MAX_FIELDS) return NextResponse.json({ error: 'A maximum of 30 fields is allowed.' }, { status: 400 });
  if (entries.some(([, value]) => typeof value !== 'string' || value.length > MAX_FIELD_VALUE_LENGTH)) {
    return NextResponse.json({ error: 'Field values must be strings of 2000 characters or fewer.' }, { status: 400 });
  }

  const client = getSiteMakerAdmin(); if (!client) return NextResponse.json({ error: 'Supabase is not configured.' }, { status: 503 });
  const { error } = await client.from('site_maker_form_submissions').insert({ project_id: projectId, form_element_id: formElementId, fields });
  if (error) return NextResponse.json({ error: error.message }, { status: 502 }); return NextResponse.json({ ok: true });
}
