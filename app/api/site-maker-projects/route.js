import { NextResponse } from 'next/server';
import { getSiteMakerAdmin } from '../../../lib/siteMakerSupabase';

export async function GET(request) {
  const id = new URL(request.url).searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Project id is required.' }, { status: 400 });
  const client = getSiteMakerAdmin(); if (!client) return NextResponse.json({ error: 'Supabase is not configured.' }, { status: 503 });
  const { data, error } = await client.from('site_maker_projects').select('id,name,sections,owner_token,created_at,updated_at').eq('id', id).maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 502 });
  if (!data) return NextResponse.json({ error: 'Project not found.' }, { status: 404 });
  const ownerToken = new URL(request.url).searchParams.get('ownerToken');
  return NextResponse.json({ ...data, readOnly: Boolean(ownerToken && ownerToken !== data.owner_token) });
}

export async function POST(request) {
  const client = getSiteMakerAdmin(); if (!client) return NextResponse.json({ error: 'Supabase is not configured.' }, { status: 503 });
  const body = await request.json(); const row = { name: body.name || 'Untitled site', sections: body.sections || [], owner_token: body.ownerToken };
  if (!row.owner_token) return NextResponse.json({ error: 'Owner token is required.' }, { status: 400 });
  const { data, error } = await client.from('site_maker_projects').insert(row).select('id,name,updated_at').single();
  if (error) return NextResponse.json({ error: error.message }, { status: 502 }); return NextResponse.json(data);
}

export async function PATCH(request) {
  const client = getSiteMakerAdmin(); if (!client) return NextResponse.json({ error: 'Supabase is not configured.' }, { status: 503 });
  const body = await request.json(); if (!body.id || !body.ownerToken) return NextResponse.json({ error: 'Project id and owner token are required.' }, { status: 400 });
  const { data, error } = await client.from('site_maker_projects').update({ name: body.name || 'Untitled site', sections: body.sections || [], updated_at: new Date().toISOString() }).eq('id', body.id).eq('owner_token', body.ownerToken).select('id,name,updated_at').single();
  if (error) return NextResponse.json({ error: error.message }, { status: 502 }); return NextResponse.json(data);
}
