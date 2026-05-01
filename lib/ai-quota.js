import fs from 'node:fs/promises';
import path from 'node:path';

export const AI_DAILY_LIMITS = {
  hashtag:       { free: 5,  premium: 15 },
  keyword:       { free: 5,  premium: 15 },
  story:         { free: 3,  premium: 5  },
  imagegen:      { free: 2,  premium: 6  },
  imagegen_pool: { free: 6,  premium: 6  },
};

const DATA_DIR  = path.join(process.cwd(), '.data');
const DATA_FILE = path.join(DATA_DIR, 'ai-quotas.json');

let quotaStore  = null;
let writeQueue  = Promise.resolve();

function getPtNow() {
  return new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
}

export function getDateKeyPT() {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Los_Angeles',
    year:  'numeric',
    month: '2-digit',
    day:   '2-digit',
  }).format(new Date());
}

export function getResetCountdown() {
  const now      = getPtNow();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);

  const diff  = midnight.getTime() - now.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
}

function emptyStore() {
  return { usage: {}, allowance: {} };
}

async function ensureStore() {
  if (quotaStore) return quotaStore;

  try {
    const raw    = await fs.readFile(DATA_FILE, 'utf8');
    const parsed = JSON.parse(raw);

    // ── FIX: purane JSON mein allowance field nahi hoti ──
    quotaStore = {
      usage:     parsed?.usage     ?? {},
      allowance: parsed?.allowance ?? {},
    };
  } catch {
    quotaStore = emptyStore();
  }

  return quotaStore;
}

async function persistStore() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const payload = JSON.stringify(quotaStore, null, 2);
  writeQueue = writeQueue.then(() => fs.writeFile(DATA_FILE, payload, 'utf8'));
  await writeQueue;
}

function getKey(userId, tool, dateKey) {
  return `${dateKey}:${tool}:${userId}`;
}

function getLimit(tool, isPremium = false) {
  const limits = AI_DAILY_LIMITS[tool];
  if (!limits) throw new Error(`Unknown AI tool: ${tool}`);
  return isPremium ? limits.premium : limits.free;
}

export async function getQuotaStatus({ userId, tool, isPremium = false }) {
  const store    = await ensureStore();
  const dateKey  = getDateKeyPT();
  const baseLimit = getLimit(tool, isPremium);
  const extra    = Number(store.allowance?.[getKey(userId, tool, dateKey)] || 0);
  const limit    = baseLimit + extra;
  const used     = Number(store.usage?.[getKey(userId, tool, dateKey)]    || 0);
  const remaining = Math.max(0, limit - used);

  return {
    tool,
    isPremium,
    used,
    remaining,
    limit,
    baseLimit,
    extra,
    dateKey,
    reset: getResetCountdown(),
  };
}

export async function addQuotaAllowance({ userId, tool, amount }) {
  const store   = await ensureStore();
  const dateKey = getDateKeyPT();
  const key     = getKey(userId, tool, dateKey);

  // Safety net — agar kisi reason se undefined aa jaye
  if (!store.allowance) store.allowance = {};

  const current = Number(store.allowance[key] || 0);
  store.allowance[key] = current + amount;
  quotaStore = store;
  await persistStore();
  return getQuotaStatus({ userId, tool });
}

export async function consumeQuota({ userId, tool, isPremium = false }) {
  const status = await getQuotaStatus({ userId, tool, isPremium });
  if (status.remaining <= 0) {
    return { allowed: false, quota: status };
  }

  const store    = await ensureStore();
  const nextUsed = status.used + 1;
  store.usage[getKey(userId, tool, status.dateKey)] = nextUsed;
  quotaStore = store;
  await persistStore();

  return {
    allowed: true,
    quota: {
      ...status,
      used:      nextUsed,
      remaining: Math.max(0, status.limit - nextUsed),
    },
  };
}

export function getAiUserId(session) {
  return session?.user?.email || session?.user?.id || session?.user?.name || null;
}