import { NextResponse } from 'next/server';

const LIMIT = 1000;
const THRESHOLD = 0.9;

let usage = {
  counts: [0, 0, 0],
  date: new Date().toDateString(),
};

function resetIfNeeded() {
  const today = new Date().toDateString();
  if (usage.date !== today) {
    usage = {
      counts: [0, 0, 0],
      date: today,
    };
  }
}

function getKeys() {
  return [
    process.env.WHOIS_KEY_1 || '',
    process.env.WHOIS_KEY_2 || '',
    process.env.WHOIS_KEY_3 || '',
  ];
}

function pickKey() {
  resetIfNeeded();
  const keys = getKeys();
  for (let index = 0; index < keys.length; index += 1) {
    if (keys[index] && usage.counts[index] < LIMIT * THRESHOLD) {
      return { key: keys[index], index };
    }
  }
  return null;
}

function shapeWhois(data) {
  const payload = data?.result || data || {};
  return {
    registrar: payload.registrar_name || payload.registrar || '',
    createdDate: payload.created_date || payload.creation_date || payload.registered_date || '',
    updatedDate: payload.updated_date || payload.updatedDate || '',
    expiresDate: payload.expiration_date || payload.expires_date || payload.registry_expiry_date || '',
    status: payload.status ? (Array.isArray(payload.status) ? payload.status : [payload.status]) : [],
    nameServers: payload.name_servers || payload.nameservers || [],
    dnssec: payload.dnssec || payload.dnssec_status || 'Unsigned',
  };
}

export async function GET(request) {
  const domain = request.nextUrl.searchParams.get('domain')?.trim().toLowerCase();

  if (!domain || !/^(?!-)(?:[a-z0-9-]{1,63}\.)+[a-z]{2,}$/i.test(domain)) {
    return NextResponse.json({ error: 'Valid domain is required' }, { status: 400 });
  }

  const selected = pickKey();
  if (!selected) {
    return NextResponse.json({ error: 'WHOIS limit reached, try tomorrow' }, { status: 429 });
  }

  const keys = getKeys();
  let lastError = null;

  for (let offset = 0; offset < keys.length; offset += 1) {
    const index = (selected.index + offset) % keys.length;
    const key = keys[index];

    if (!key || usage.counts[index] >= LIMIT * THRESHOLD) continue;

    try {
      const response = await fetch(`https://whoisjson.com/api/v1/whois?domain=${encodeURIComponent(domain)}`, {
        headers: {
          Authorization: `TOKEN=${key}`,
        },
        cache: 'no-store',
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        lastError = new Error(data?.message || data?.error || `WHOIS error ${response.status}`);
        if ([401, 403, 429].includes(response.status)) {
          usage.counts[index] = Math.ceil(LIMIT * THRESHOLD);
          continue;
        }
        throw lastError;
      }

      usage.counts[index] += 1;

      return NextResponse.json({
        whois: shapeWhois(data),
        keyIndex: index,
        usage: usage.counts,
      });
    } catch (errorInstance) {
      lastError = errorInstance;
    }
  }

  return NextResponse.json(
    { error: lastError?.message || 'WHOIS lookup failed', usage: usage.counts },
    { status: 500 },
  );
}
