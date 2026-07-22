import { NextResponse } from 'next/server';
import { getSiteMakerAdmin } from '../../../lib/siteMakerSupabase';

export async function POST(request) {
  const client = getSiteMakerAdmin(); if (!client) return NextResponse.json({ error: 'Supabase is not configured.' }, { status: 503 });
  const { projectId, formElementId, fields } = await request.json();
  if (!projectId || !formElementId || !fields) return NextResponse.json({ error: 'projectId, formElementId, and fields are required.' }, { status: 400 });
  const { error } = await client.from('site_maker_form_submissions').insert({ project_id: projectId, form_element_id: formElementId, fields });
  if (error) return NextResponse.json({ error: error.message }, { status: 502 }); return NextResponse.json({ ok: true });
}
