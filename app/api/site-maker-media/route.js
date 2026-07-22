import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

export async function POST(request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return NextResponse.json({ error: 'Supabase storage is not configured yet.' }, { status: 503 });
  const form = await request.formData(); const file = form.get('file'); const kind = form.get('kind') === 'video' ? 'video' : 'image';
  if (!file || typeof file.arrayBuffer !== 'function') return NextResponse.json({ error: 'A media file is required.' }, { status: 400 });
  const client = createClient(url, key); const path = `${kind}/${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '-')}`; const bytes = new Uint8Array(await file.arrayBuffer());
  const { error } = await client.storage.from('site-maker-media').upload(path, bytes, { contentType: file.type, upsert: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 502 });
  const publicUrl = client.storage.from('site-maker-media').getPublicUrl(path).data.publicUrl;
  return NextResponse.json({ url: publicUrl });
}
