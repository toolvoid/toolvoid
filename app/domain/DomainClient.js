'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

const TLDS = [
  '.com', '.in', '.io', '.co', '.net', '.org', '.ai',
  '.app', '.dev', '.xyz', '.online', '.store', '.tech',
  '.info', '.biz', '.me', '.co.in', '.uk', '.us',
  '.ca', '.au', '.de', '.fr', '.jp', '.club',
  '.site', '.web', '.digital', '.agency', '.studio',
  '.solutions', '.media', '.company', '.services',
];

const TOP_TLDS = TLDS.slice(0, 10);
const PREFIXES = ['get', 'my', 'go', 'use', 'try', 'best', 'the', 'top', 'pro'];
const SUFFIXES = ['hq', 'app', 'io', 'hub', 'lab', 'ai', 'pro', 'now', 'plus'];
const RECORD_TYPES = ['A', 'AAAA', 'MX', 'TXT', 'CNAME', 'NS', 'SOA'];
const TABS = ['availability', 'whois', 'dns', 'ssl', 'ip', 'status', 'social', 'analyzer'];

const PRICES = {
  '.com': { godaddy: 849, namecheap: 750, hostinger: 699 },
  '.in': { godaddy: 499, namecheap: 450, hostinger: 399 },
  '.io': { godaddy: 4500, namecheap: 4200, hostinger: 3999 },
  '.co': { godaddy: 2299, namecheap: 2099, hostinger: 1999 },
  '.net': { godaddy: 1099, namecheap: 999, hostinger: 949 },
  '.org': { godaddy: 799, namecheap: 699, hostinger: 649 },
  '.ai': { godaddy: 8999, namecheap: 8500, hostinger: 7999 },
  '.app': { godaddy: 1399, namecheap: 1199, hostinger: 1099 },
  '.dev': { godaddy: 1199, namecheap: 999, hostinger: 949 },
  '.xyz': { godaddy: 199, namecheap: 149, hostinger: 129 },
  '.online': { godaddy: 249, namecheap: 199, hostinger: 179 },
  '.store': { godaddy: 299, namecheap: 249, hostinger: 229 },
  '.tech': { godaddy: 399, namecheap: 349, hostinger: 329 },
  '.info': { godaddy: 299, namecheap: 249, hostinger: 229 },
  '.biz': { godaddy: 449, namecheap: 399, hostinger: 379 },
  '.me': { godaddy: 699, namecheap: 649, hostinger: 599 },
  '.co.in': { godaddy: 699, namecheap: 599, hostinger: 549 },
  '.uk': { godaddy: 899, namecheap: 799, hostinger: 749 },
  '.us': { godaddy: 599, namecheap: 499, hostinger: 469 },
  '.ca': { godaddy: 899, namecheap: 799, hostinger: 759 },
  '.au': { godaddy: 1399, namecheap: 1299, hostinger: 1199 },
  '.de': { godaddy: 799, namecheap: 699, hostinger: 649 },
  '.fr': { godaddy: 899, namecheap: 799, hostinger: 749 },
  '.jp': { godaddy: 1199, namecheap: 1099, hostinger: 1049 },
  '.club': { godaddy: 299, namecheap: 249, hostinger: 219 },
  '.site': { godaddy: 159, namecheap: 129, hostinger: 119 },
  '.web': { godaddy: 259, namecheap: 219, hostinger: 199 },
  '.digital': { godaddy: 399, namecheap: 349, hostinger: 329 },
  '.agency': { godaddy: 349, namecheap: 299, hostinger: 279 },
  '.studio': { godaddy: 349, namecheap: 299, hostinger: 279 },
  '.solutions': { godaddy: 429, namecheap: 379, hostinger: 359 },
  '.media': { godaddy: 349, namecheap: 299, hostinger: 279 },
  '.company': { godaddy: 299, namecheap: 249, hostinger: 229 },
  '.services': { godaddy: 349, namecheap: 299, hostinger: 279 },
};

const SOCIALS = [
  { id: 'instagram', label: 'Instagram', icon: '📸', url: (v) => `https://www.instagram.com/${v}/` },
  { id: 'twitter', label: 'Twitter / X', icon: '🐦', url: (v) => `https://x.com/${v}` },
  { id: 'youtube', label: 'YouTube', icon: '▶️', url: (v) => `https://www.youtube.com/@${v}` },
  { id: 'linkedin', label: 'LinkedIn', icon: '💼', url: (v) => `https://www.linkedin.com/company/${v}` },
  { id: 'tiktok', label: 'TikTok', icon: '🎵', url: (v) => `https://www.tiktok.com/@${v}` },
  { id: 'github', label: 'GitHub', icon: '💻', url: (v) => `https://github.com/${v}` },
  { id: 'pinterest', label: 'Pinterest', icon: '📌', url: (v) => `https://www.pinterest.com/${v}/` },
];

const DEFAULT_LOADING = {
  availability: false,
  whois: false,
  dns: false,
  ssl: false,
  ip: false,
  status: false,
  social: false,
  analyzer: false,
  bulk: false,
  suggestions: false,
  watchlist: false,
};

const formatCurrency = (value) => `₹${new Intl.NumberFormat('en-IN').format(value)}/yr`;

const cleanBase = (value) => value.toLowerCase().trim().replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];

const normalizeDomain = (value) => cleanBase(value).replace(/[^a-z0-9.-]/g, '');

const getBaseKeyword = (value) => {
  const normalized = normalizeDomain(value);
  if (!normalized) return '';
  const parts = normalized.split('.');
  return parts[0] || '';
};

const isValidDomain = (value) => /^(?!-)(?:[a-z0-9-]{1,63}\.)+[a-z]{2,}$/i.test(normalizeDomain(value));

const daysBetween = (dateString) => {
  if (!dateString) return null;
  const parsed = new Date(dateString);
  if (Number.isNaN(parsed.getTime())) return null;
  return Math.ceil((parsed.getTime() - Date.now()) / 86400000);
};

const domainAgeLabel = (dateString) => {
  if (!dateString) return 'Unknown';
  const parsed = new Date(dateString);
  if (Number.isNaN(parsed.getTime())) return 'Unknown';
  let months = (new Date().getFullYear() - parsed.getFullYear()) * 12;
  months += new Date().getMonth() - parsed.getMonth();
  if (months < 0) months = 0;
  const years = Math.floor(months / 12);
  const remMonths = months % 12;
  if (!years) return `${remMonths} month${remMonths === 1 ? '' : 's'} old`;
  if (!remMonths) return `${years} year${years === 1 ? '' : 's'} old`;
  return `${years} year${years === 1 ? '' : 's'} ${remMonths} month${remMonths === 1 ? '' : 's'} old`;
};

const gradeForScore = (score) => {
  if (score >= 36) return 'A+';
  if (score >= 31) return 'A';
  if (score >= 24) return 'B';
  if (score >= 18) return 'C';
  return 'D';
};

export default function DomainCheckerPage() {
  const [domain, setDomain] = useState('');
  const [activeTab, setActiveTab] = useState('availability');
  const [loading, setLoading] = useState(DEFAULT_LOADING);
  const [results, setResults] = useState({});
  const [bulkDomains, setBulkDomains] = useState('');
  const [bulkMode, setBulkMode] = useState(false);
  const [bulkResults, setBulkResults] = useState([]);
  const [history, setHistory] = useState(() => {
    if (typeof window === 'undefined') return [];
    try {
      const savedHistory = JSON.parse(localStorage.getItem('dc_history') || '[]');
      return Array.isArray(savedHistory) ? savedHistory : [];
    } catch {
      return [];
    }
  });
  const [watchlist, setWatchlist] = useState(() => {
    if (typeof window === 'undefined') return [];
    try {
      const savedWatchlist = JSON.parse(localStorage.getItem('dc_watchlist') || '[]');
      return Array.isArray(savedWatchlist) ? savedWatchlist : [];
    } catch {
      return [];
    }
  });
  const [suggestions, setSuggestions] = useState([]);
  const [whoisKeyIndex, setWhoisKeyIndex] = useState(0);
  const [whoisUsage, setWhoisUsage] = useState([0, 0, 0]);
  const [showAllTlds, setShowAllTlds] = useState(false);
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('tld');
  const [availabilityProgress, setAvailabilityProgress] = useState({ done: 0, total: 0, label: '' });
  const [bulkProgress, setBulkProgress] = useState({ done: 0, total: 0 });
  const [error, setError] = useState('');
  const [exportMessage, setExportMessage] = useState('');
  const [nameGeneratorInput, setNameGeneratorInput] = useState('');

  const visibleTlds = showAllTlds ? TLDS : TOP_TLDS;
  const normalizedDomain = normalizeDomain(domain);
  const domainBase = getBaseKeyword(domain);
  const deferredBase = useMemo(() => getBaseKeyword(nameGeneratorInput || domain), [domain, nameGeneratorInput]);

  const fetchJsonWithFallback = useCallback(async (urls, options) => {
    let lastError = null;
    for (const url of urls) {
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          lastError = new Error(`HTTP ${response.status}`);
          continue;
        }
        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          return await response.json();
        }
        const text = await response.text();
        return JSON.parse(text);
      } catch (errorInstance) {
        lastError = errorInstance;
      }
    }
    throw lastError || new Error('Request failed');
  }, []);

  const checkDomainAvailability = useCallback(async (fullDomain) => {
    const currentDomain = normalizeDomain(fullDomain);
    const tld = currentDomain.slice(currentDomain.indexOf('.')) || '';
    try {
      const response = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(currentDomain)}&type=A`, {
        cache: 'no-store',
      });
      const data = await response.json();
      if (data.Status === 3) {
        return {
          domain: currentDomain,
          tld,
          available: true,
          label: 'Available',
          registrarUrl: `https://www.namecheap.com/domains/registration/results/?domain=${encodeURIComponent(currentDomain)}`,
        };
      }
      if (data.Status === 2) {
        return { domain: currentDomain, tld, available: null, label: 'Unknown' };
      }
      return { domain: currentDomain, tld, available: false, label: 'Taken', records: data.Answer || [] };
    } catch {
      return { domain: currentDomain, tld, available: null, label: 'Unknown' };
    }
  }, []);

  const fetchAvailability = useCallback(async (baseKeyword) => {
    if (!baseKeyword) return;
    const total = TLDS.length;
    setLoading((prev) => ({ ...prev, availability: true }));
    setAvailabilityProgress({ done: 0, total, label: `Checking ${total} extensions...` });
    setResults((prev) => ({ ...prev, availability: [], domain: `${baseKeyword}.com` }));

    let completed = 0;
    await Promise.all(
      TLDS.map(async (tld) => {
        const lookup = await checkDomainAvailability(`${baseKeyword}${tld}`);
        completed += 1;
        setResults((prev) => ({
          ...prev,
          availability: [...(prev.availability || []).filter((item) => item.domain !== lookup.domain), lookup],
        }));
        setAvailabilityProgress({ done: completed, total, label: `Checking ${total} extensions...` });
      }),
    );

    setLoading((prev) => ({ ...prev, availability: false }));
  }, [checkDomainAvailability]);

  useEffect(() => {
    try {
      localStorage.setItem('dc_history', JSON.stringify(history.slice(0, 10)));
    } catch {}
  }, [history]);

  useEffect(() => {
    try {
      localStorage.setItem('dc_watchlist', JSON.stringify(watchlist.slice(0, 20)));
    } catch {}
  }, [watchlist]);

  useEffect(() => {
    if (!domainBase || domainBase.length < 3) {
      setSuggestions([]);
      return;
    }

    const suggestionDomains = Array.from(new Set([
      ...PREFIXES.map((prefix) => `${prefix}${domainBase}.com`),
      ...SUFFIXES.map((suffix) => `${domainBase}${suffix}.com`),
      `${domainBase}app.io`,
      `${domainBase}hub.com`,
      `${domainBase}.in`,
      `${domainBase}.io`,
      `${domainBase}s.com`,
      `${domainBase.replace(/(.)\1+/g, '$1')}.com`,
      `${domainBase.slice(0, -1)}.com`,
      `${domainBase}-${domainBase.length > 4 ? domainBase.slice(-3) : 'hq'}.com`,
      `${domainBase.slice(0, Math.max(3, domainBase.length - 1))}.com`,
    ].filter((item) => item && isValidDomain(item)))).slice(0, 18);

    let cancelled = false;
    setLoading((prev) => ({ ...prev, suggestions: true }));
    setSuggestions(suggestionDomains.map((item) => ({ domain: item, status: 'checking' })));

    Promise.all(
      suggestionDomains.map(async (item) => {
        const lookup = await checkDomainAvailability(item);
        if (cancelled) return null;
        setSuggestions((prev) => prev.map((entry) => (
          entry.domain === item ? { ...entry, ...lookup } : entry
        )));
        return lookup;
      }),
    ).finally(() => {
      if (!cancelled) {
        setLoading((prev) => ({ ...prev, suggestions: false }));
      }
    });

    return () => {
      cancelled = true;
    };
  }, [checkDomainAvailability, domainBase]);

  const handleBulkCheck = useCallback(async () => {
    const rawItems = bulkMode
      ? bulkDomains.split('\n').map((item) => normalizeDomain(item)).filter(Boolean)
      : TLDS.map((tld) => `${getBaseKeyword(domain)}${tld}`);

    const items = Array.from(new Set(rawItems)).slice(0, 20);
    if (!items.length || items.some((item) => !isValidDomain(item))) {
      setError('Please enter valid domain');
      return;
    }

    setError('');
    setBulkResults([]);
    setBulkProgress({ done: 0, total: items.length });
    setLoading((prev) => ({ ...prev, bulk: true }));

    let completed = 0;
    await Promise.all(items.map(async (item) => {
      const lookup = await checkDomainAvailability(item);
      completed += 1;
      setBulkResults((prev) => [...prev.filter((row) => row.domain !== item), lookup]);
      setBulkProgress({ done: completed, total: items.length });
    }));

    setLoading((prev) => ({ ...prev, bulk: false }));
  }, [bulkDomains, bulkMode, checkDomainAvailability, domain]);

  const runPrimarySearch = useCallback(async (customDomain) => {
    const lookupValue = normalizeDomain(customDomain || domain);
    if (!lookupValue || !isValidDomain(lookupValue)) {
      setError('Please enter valid domain');
      return;
    }

    setError('');
    const keyword = getBaseKeyword(lookupValue);
    const timestamp = new Date().toLocaleString();

    setResults({
      domain: lookupValue,
      summary: { checkedAt: timestamp },
      whois: null,
      dns: null,
      ssl: null,
      ip: null,
      status: null,
      social: null,
      analyzer: null,
      availability: [],
    });

    pushHistory({ domain: lookupValue, checkedAt: timestamp });
    await fetchAvailability(keyword);
    setResults((prev) => ({ ...prev, domain: lookupValue, analyzer: true }));
  }, [domain, fetchAvailability]);

  useEffect(() => {
    const onKeyDown = (event) => {
      const tag = event.target?.tagName;
      const editable = event.target?.isContentEditable;
      if (event.key === 'Tab' && !editable && !['INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) {
        event.preventDefault();
        const currentIndex = TABS.indexOf(activeTab);
        const nextIndex = event.shiftKey ? (currentIndex - 1 + TABS.length) % TABS.length : (currentIndex + 1) % TABS.length;
        setActiveTab(TABS[nextIndex]);
      }
      if (event.key === 'Enter' && tag !== 'TEXTAREA' && document.activeElement?.id !== 'bulk-domains') {
        if (bulkMode) {
          handleBulkCheck();
        } else {
          runPrimarySearch();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeTab, bulkMode, domain, bulkDomains, handleBulkCheck, results, runPrimarySearch]);

  const fetchIp = useCallback(async (targetDomain) => {
    setLoading((prev) => ({ ...prev, ip: true }));
    try {
      const data = await fetchJsonWithFallback([
        `https://cors.isomorphic-git.org/http://ip-api.com/json/${encodeURIComponent(targetDomain)}`,
        `https://r.jina.ai/http://ip-api.com/json/${encodeURIComponent(targetDomain)}`,
      ], { cache: 'no-store' });

      if (data.status && String(data.status).toLowerCase() === 'fail') {
        throw new Error(data.message || 'IP lookup failed');
      }

      setResults((prev) => ({ ...prev, ip: data }));
    } catch (errorInstance) {
      setResults((prev) => ({ ...prev, ip: { error: `${errorInstance.message}. IP geolocation may be blocked by browser/CORS.` } }));
    } finally {
      setLoading((prev) => ({ ...prev, ip: false }));
    }
  }, [fetchJsonWithFallback]);

  const fetchSsl = useCallback(async (targetDomain) => {
    setLoading((prev) => ({ ...prev, ssl: true }));
    try {
      const data = await fetchJsonWithFallback([
        `https://crt.sh/?q=${encodeURIComponent(targetDomain)}&output=json`,
        `https://r.jina.ai/http://crt.sh/?q=${encodeURIComponent(targetDomain)}&output=json`,
      ], { cache: 'no-store' });

      const rows = Array.isArray(data) ? data : [];
      const sorted = [...rows]
        .filter((row) => row.not_after || row.entry_timestamp)
        .sort((a, b) => new Date(b.not_after || b.entry_timestamp) - new Date(a.not_after || a.timestamp));

      let httpsActive = false;
      try {
        await fetch(`https://${targetDomain}`, { method: 'HEAD', mode: 'no-cors' });
        httpsActive = true;
      } catch {}

      const latest = sorted[0] || {};
      const coveredNames = Array.from(new Set(
        sorted.flatMap((row) => String(row.name_value || '').split('\n').filter(Boolean)),
      ));

      setResults((prev) => ({
        ...prev,
        ssl: {
          valid: Boolean(latest.not_after),
          httpsActive,
          issuer: latest.issuer_name || 'Unknown issuer',
          expires: latest.not_after || null,
          daysRemaining: daysBetween(latest.not_after),
          covered: coveredNames,
          crtUrl: `https://crt.sh/?q=${encodeURIComponent(targetDomain)}`,
        },
      }));
    } catch (errorInstance) {
      setResults((prev) => ({ ...prev, ssl: { error: errorInstance.message } }));
    } finally {
      setLoading((prev) => ({ ...prev, ssl: false }));
    }
  }, [fetchJsonWithFallback]);

  useEffect(() => {
    if (!normalizedDomain || !isValidDomain(normalizedDomain)) return;
    if (!results.domain || results.domain !== normalizedDomain) return;
    if (activeTab === 'whois' && !results.whois && !loading.whois) {
      fetchWhois(normalizedDomain);
    }
    if (activeTab === 'dns' && !results.dns && !loading.dns) {
      fetchDns(normalizedDomain);
    }
    if (activeTab === 'ssl' && !results.ssl && !loading.ssl) {
      fetchSsl(normalizedDomain);
    }
    if (activeTab === 'ip' && !results.ip && !loading.ip) {
      fetchIp(normalizedDomain);
    }
    if (activeTab === 'status' && !results.status && !loading.status) {
      fetchStatus(normalizedDomain);
    }
    if (activeTab === 'social' && !results.social && !loading.social) {
      fetchSocial(normalizedDomain);
    }
  }, [activeTab, fetchIp, fetchSsl, loading, normalizedDomain, results]);

  const availableCount = (results.availability || []).filter((item) => item.available === true).length;
  const takenCount = (results.availability || []).filter((item) => item.available === false).length;
  const unknownCount = (results.availability || []).filter((item) => item.available === null).length;

  const filteredAvailability = useMemo(() => {
    const items = [...(results.availability || [])];
    const filtered = items.filter((item) => {
      if (availabilityFilter === 'available') return item.available === true;
      if (availabilityFilter === 'taken') return item.available === false;
      return true;
    });

    return filtered.sort((a, b) => {
      if (sortBy === 'status') {
        const order = { true: 0, null: 1, false: 2 };
        return order[String(a.available)] - order[String(b.available)];
      }
      if (sortBy === 'price') {
        const aPrice = Math.min(...Object.values(PRICES[a.tld] || { default: 999999 }));
        const bPrice = Math.min(...Object.values(PRICES[b.tld] || { default: 999999 }));
        return aPrice - bPrice;
      }
      return a.tld.localeCompare(b.tld);
    });
  }, [results.availability, availabilityFilter, sortBy]);

  const analysis = useMemo(() => {
    const target = normalizedDomain || '';
    if (!target) return null;
    const [name, tld = ''] = target.split('.');
    const lengthScore = name.length <= 6 ? 10 : name.length <= 10 ? 8 : name.length <= 15 ? 6 : 3;
    const brandability = Math.min(
      10,
      (name.includes('-') ? 0 : 2)
      + (/\d/.test(name) ? 0 : 2)
      + (/^[a-z]+$/.test(name) ? 3 : 1)
      + (/[aeiou]/.test(name) && !/(.)\1\1/.test(name) ? 2 : 1),
    );
    const seo = Math.min(
      10,
      ((name.includes('tool') || name.includes('site') || name.includes('app')) ? 3 : 1)
      + (tld === 'com' ? 3 : 1)
      + (name.length < 14 ? 2 : 1)
      + (!name.includes('-') ? 2 : 1),
    );
    const memorability = Math.min(
      10,
      (name.length <= 8 ? 3 : 1)
      + (/^[a-z-]+$/.test(name) ? 2 : 0)
      + (!/(.)\1\1/.test(name) ? 2 : 1)
      + ((new Set(name.split(''))).size >= Math.min(name.length, 4) ? 2 : 1),
    );
    const total = lengthScore + brandability + seo + memorability;
    const grade = gradeForScore(total);
    let note = 'Balanced option with decent recall and branding potential.';
    if (grade.startsWith('A')) note = 'Great domain! Short, clear, and easy to remember.';
    if (grade === 'D') note = 'Consider a shorter, cleaner variation for stronger brand recall.';
    return { lengthScore, brandability, seo, memorability, total, grade, note };
  }, [normalizedDomain]);

  async function fetchWhois(targetDomain) {
    setLoading((prev) => ({ ...prev, whois: true }));
    try {
      const response = await fetch(`/api/whois?domain=${encodeURIComponent(targetDomain)}`, { cache: 'no-store' });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'WHOIS lookup failed');
      }
      setWhoisKeyIndex(data.keyIndex || 0);
      setWhoisUsage(Array.isArray(data.usage) ? data.usage : [0, 0, 0]);
      setResults((prev) => ({ ...prev, whois: data.whois }));
    } catch (errorInstance) {
      setResults((prev) => ({ ...prev, whois: { error: errorInstance.message } }));
    } finally {
      setLoading((prev) => ({ ...prev, whois: false }));
    }
  }

  async function fetchDns(targetDomain) {
    setLoading((prev) => ({ ...prev, dns: true }));
    try {
      const records = await Promise.all(RECORD_TYPES.map(async (type) => {
        const response = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(targetDomain)}&type=${type}`, { cache: 'no-store' });
        const data = await response.json();
        return {
          type,
          values: (data.Answer || []).map((entry) => ({ name: entry.name, data: entry.data, ttl: entry.TTL })),
        };
      }));
      setResults((prev) => ({ ...prev, dns: records }));
    } catch (errorInstance) {
      setResults((prev) => ({ ...prev, dns: { error: errorInstance.message } }));
    } finally {
      setLoading((prev) => ({ ...prev, dns: false }));
    }
  }

  async function fetchStatus(targetDomain) {
    setLoading((prev) => ({ ...prev, status: true }));
    const started = performance.now();
    try {
      const response = await fetch(`https://r.jina.ai/http://https://${targetDomain}`, { cache: 'no-store' });
      const ms = Math.round(performance.now() - started);
      setResults((prev) => ({
        ...prev,
        status: {
          online: response.ok,
          responseTime: ms,
          httpStatus: response.status,
          finalUrl: response.url || `https://${targetDomain}`,
          server: response.headers.get('server') || 'Unknown',
        },
      }));
    } catch (errorInstance) {
      setResults((prev) => ({
        ...prev,
        status: {
          online: false,
          responseTime: Math.round(performance.now() - started),
          error: errorInstance.message,
        },
      }));
    } finally {
      setLoading((prev) => ({ ...prev, status: false }));
    }
  }

  async function fetchSocial(targetDomain) {
    setLoading((prev) => ({ ...prev, social: true }));
    const handle = getBaseKeyword(targetDomain).replace(/[^a-z0-9]/g, '');
    try {
      const rows = await Promise.all(SOCIALS.map(async (platform) => {
        const url = platform.url(handle);
        try {
          const response = await fetch(`https://r.jina.ai/http://${url.replace('https://', '')}`, { cache: 'no-store' });
          const status = response.status;
          if (status === 404) return { ...platform, handle, available: true, url };
          if (response.ok) return { ...platform, handle, available: false, url };
          return { ...platform, handle, available: null, url };
        } catch {
          return { ...platform, handle, available: null, url };
        }
      }));
      setResults((prev) => ({ ...prev, social: rows }));
    } catch (errorInstance) {
      setResults((prev) => ({ ...prev, social: { error: errorInstance.message } }));
    } finally {
      setLoading((prev) => ({ ...prev, social: false }));
    }
  }

  function pushHistory(value) {
    setHistory((prev) => [value, ...prev.filter((item) => item.domain !== value.domain)].slice(0, 10));
  }

  function addToWatchlist(entry) {
    setWatchlist((prev) => {
      if (prev.some((item) => item.domain === entry.domain)) return prev;
      return [{ domain: entry.domain, status: entry.status, checkedAt: entry.checkedAt }, ...prev].slice(0, 20);
    });
  }

  async function checkWatchlistNow(targetDomain) {
    const lookup = await checkDomainAvailability(targetDomain);
    setWatchlist((prev) => prev.map((item) => (
      item.domain === targetDomain ? { ...item, status: lookup.label, checkedAt: new Date().toLocaleString() } : item
    )));
  }

  async function refreshWatchlist() {
    setLoading((prev) => ({ ...prev, watchlist: true }));
    await Promise.all(watchlist.map((item) => checkWatchlistNow(item.domain)));
    setLoading((prev) => ({ ...prev, watchlist: false }));
  }

  function exportAvailabilityCsv(rows, filename = 'domain-checker.csv') {
    const csv = ['Domain,Status,TLD', ...rows.map((row) => `${row.domain},${row.label},${row.tld}`)].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    URL.revokeObjectURL(url);
    setExportMessage('CSV exported');
  }

  function exportJson() {
    const payload = JSON.stringify({ domain: normalizedDomain, results, suggestions, bulkResults }, null, 2);
    const blob = new Blob([payload], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'domain-report.json';
    anchor.click();
    URL.revokeObjectURL(url);
    setExportMessage('JSON exported');
  }

  async function copySummary() {
    const summary = [
      `Domain: ${normalizedDomain || 'N/A'}`,
      `Available: ${availableCount}`,
      `Taken: ${takenCount}`,
      `Unknown: ${unknownCount}`,
      results.whois?.registrar ? `Registrar: ${results.whois.registrar}` : null,
      results.ssl?.issuer ? `SSL Issuer: ${results.ssl.issuer}` : null,
    ].filter(Boolean).join('\n');

    await navigator.clipboard.writeText(summary);
    setExportMessage('Summary copied');
  }

  function renderBar(value) {
    return (
      <div className="dc-bar-track">
        <div className="dc-bar-fill" style={{ width: `${Math.min(value * 10, 100)}%` }} />
      </div>
    );
  }

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');

        :root {
          --dc-bg: #0A0A0F;
          --dc-card: #12131B;
          --dc-card-2: #171926;
          --dc-border: rgba(255, 255, 255, 0.08);
          --dc-border-strong: rgba(0, 201, 255, 0.22);
          --dc-cyan: #00C9FF;
          --dc-green: #22c55e;
          --dc-red: #ef4444;
          --dc-orange: #f59e0b;
          --dc-text: #f4f7fb;
          --dc-muted: rgba(244, 247, 251, 0.62);
          --dc-mono: 'JetBrains Mono', monospace;
          --dc-font: 'Inter', sans-serif;
        }

        * { box-sizing: border-box; }
        html, body { background: var(--dc-bg); color: var(--dc-text); font-family: var(--dc-font); }
        body { margin: 0; }
        button, input, textarea, select { font: inherit; }
        a { color: inherit; text-decoration: none; }

        .dc-page {
          min-height: 100vh;
          background:
            radial-gradient(circle at top left, rgba(0, 201, 255, 0.12), transparent 34%),
            radial-gradient(circle at top right, rgba(34, 197, 94, 0.08), transparent 28%),
            linear-gradient(180deg, #0a0a0f 0%, #0c0e15 100%);
          padding: 32px 16px 80px;
        }

        .dc-shell { max-width: 1280px; margin: 0 auto; }
        .dc-hero { text-align: center; margin-bottom: 28px; }
        .dc-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          border-radius: 999px;
          background: rgba(0, 201, 255, 0.08);
          border: 1px solid rgba(0, 201, 255, 0.18);
          color: var(--dc-cyan);
          font-family: var(--dc-mono);
          font-size: 12px;
          margin-bottom: 14px;
        }
        .dc-hero h1 { margin: 0; font-size: clamp(2.2rem, 6vw, 4.4rem); line-height: 0.95; letter-spacing: -0.05em; }
        .dc-hero h1 span { color: var(--dc-cyan); }
        .dc-hero p { margin: 12px auto 0; color: var(--dc-muted); max-width: 680px; font-size: 1rem; line-height: 1.7; }

        .dc-grid {
          display: grid;
          grid-template-columns: minmax(0, 2.1fr) minmax(300px, 0.9fr);
          gap: 18px;
          align-items: start;
        }

        .dc-card {
          background: linear-gradient(180deg, rgba(18, 19, 27, 0.95), rgba(13, 14, 20, 0.98));
          border: 1px solid var(--dc-border);
          border-radius: 24px;
          padding: 20px;
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.32);
        }

        .dc-search-row {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 12px;
          margin-bottom: 14px;
        }

        .dc-input,
        .dc-textarea,
        .dc-select {
          width: 100%;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.03);
          color: var(--dc-text);
          padding: 15px 16px;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .dc-input:focus,
        .dc-textarea:focus,
        .dc-select:focus {
          border-color: rgba(0, 201, 255, 0.4);
          box-shadow: 0 0 0 4px rgba(0, 201, 255, 0.08);
        }

        .dc-input {
          font-size: 1.05rem;
          font-weight: 700;
          font-family: var(--dc-mono);
        }

        .dc-btn {
          border: none;
          cursor: pointer;
          border-radius: 16px;
          padding: 15px 18px;
          font-weight: 700;
          transition: transform 0.18s ease, opacity 0.18s ease, border-color 0.18s ease;
        }
        .dc-btn:hover { transform: translateY(-1px); }
        .dc-btn:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }
        .dc-btn-primary {
          background: linear-gradient(135deg, #4ad8ff, var(--dc-cyan));
          color: #031018;
          min-width: 126px;
        }
        .dc-btn-secondary {
          background: rgba(255, 255, 255, 0.04);
          color: var(--dc-text);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .dc-btn-ghost {
          background: rgba(0, 201, 255, 0.08);
          color: var(--dc-cyan);
          border: 1px solid rgba(0, 201, 255, 0.18);
        }

        .dc-segment {
          display: inline-grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 6px;
          padding: 6px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          margin-bottom: 16px;
        }

        .dc-mini-btn {
          border: none;
          background: transparent;
          color: var(--dc-muted);
          padding: 10px 14px;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 600;
        }
        .dc-mini-btn.active {
          background: rgba(0, 201, 255, 0.12);
          color: var(--dc-cyan);
        }

        .dc-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin: 18px 0;
        }

        .dc-tab {
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.03);
          color: var(--dc-muted);
          border-radius: 999px;
          padding: 10px 14px;
          font-size: 0.92rem;
          cursor: pointer;
        }
        .dc-tab.active {
          background: rgba(0, 201, 255, 0.12);
          border-color: rgba(0, 201, 255, 0.22);
          color: var(--dc-cyan);
        }

        .dc-progress-wrap {
          margin-top: 12px;
          margin-bottom: 18px;
        }
        .dc-progress-bar {
          width: 100%;
          height: 8px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.06);
          overflow: hidden;
        }
        .dc-progress-bar span {
          display: block;
          height: 100%;
          background: linear-gradient(90deg, var(--dc-cyan), var(--dc-green));
          border-radius: 999px;
          transition: width 0.2s ease;
        }
        .dc-progress-meta {
          margin-top: 8px;
          color: var(--dc-muted);
          display: flex;
          justify-content: space-between;
          gap: 10px;
          font-size: 0.9rem;
        }

        .dc-toolbar {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }
        .dc-toolbar-group {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          align-items: center;
        }

        .dc-chip {
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.03);
          color: var(--dc-muted);
          border-radius: 999px;
          padding: 9px 12px;
          cursor: pointer;
          font-size: 0.88rem;
        }
        .dc-chip.active {
          background: rgba(0, 201, 255, 0.1);
          border-color: rgba(0, 201, 255, 0.2);
          color: var(--dc-cyan);
        }

        .dc-stat-grid,
        .dc-side-grid {
          display: grid;
          gap: 12px;
        }
        .dc-stat-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); margin-bottom: 16px; }
        .dc-side-grid { grid-template-columns: 1fr; }

        .dc-stat-card,
        .dc-info-card,
        .dc-result-card,
        .dc-price-card,
        .dc-suggestion-card {
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          padding: 16px;
        }

        .dc-stat-card h3,
        .dc-info-card h3,
        .dc-price-card h3 {
          margin: 0 0 8px;
          font-size: 0.9rem;
          color: var(--dc-muted);
          font-weight: 600;
        }
        .dc-stat-card strong {
          display: block;
          font-size: 1.6rem;
          font-weight: 800;
          letter-spacing: -0.04em;
        }

        .dc-results-grid,
        .dc-suggestion-grid,
        .dc-social-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
        }

        .dc-result-card,
        .dc-suggestion-card {
          display: flex;
          flex-direction: column;
          gap: 10px;
          min-height: 170px;
        }
        .dc-domain {
          font-family: var(--dc-mono);
          font-weight: 700;
          line-height: 1.5;
          word-break: break-word;
        }
        .dc-status {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          width: fit-content;
          border-radius: 999px;
          padding: 8px 12px;
          font-size: 0.8rem;
          font-weight: 700;
        }
        .dc-status.available { background: rgba(34, 197, 94, 0.12); color: var(--dc-green); }
        .dc-status.taken { background: rgba(239, 68, 68, 0.12); color: var(--dc-red); }
        .dc-status.unknown { background: rgba(245, 158, 11, 0.12); color: var(--dc-orange); }

        .dc-price-list {
          display: grid;
          gap: 8px;
          margin-top: 8px;
        }
        .dc-price-row {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          align-items: center;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 8px;
          font-size: 0.92rem;
        }
        .dc-best-price {
          color: var(--dc-green);
          font-weight: 700;
          font-size: 0.82rem;
        }

        .dc-label {
          display: block;
          margin-bottom: 8px;
          color: var(--dc-muted);
          font-size: 0.85rem;
          font-weight: 600;
        }

        .dc-kv {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }
        .dc-kv-item {
          padding: 14px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
        }
        .dc-kv-item span {
          display: block;
          color: var(--dc-muted);
          font-size: 0.82rem;
          margin-bottom: 6px;
        }
        .dc-kv-item strong {
          display: block;
          font-weight: 700;
          line-height: 1.5;
          word-break: break-word;
        }

        .dc-table-wrap {
          overflow: auto;
          border-radius: 18px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          background: rgba(255, 255, 255, 0.02);
        }
        .dc-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 620px;
        }
        .dc-table th,
        .dc-table td {
          padding: 14px 16px;
          text-align: left;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          vertical-align: top;
        }
        .dc-table th {
          color: var(--dc-muted);
          font-weight: 600;
          font-size: 0.84rem;
        }

        .dc-note {
          color: var(--dc-muted);
          font-size: 0.92rem;
          line-height: 1.7;
        }
        .dc-note strong { color: var(--dc-text); }
        .dc-warning-red { color: var(--dc-red); }
        .dc-warning-orange { color: var(--dc-orange); }
        .dc-warning-green { color: var(--dc-green); }

        .dc-export {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 16px;
        }

        .dc-list {
          display: grid;
          gap: 10px;
        }
        .dc-list-row {
          display: flex;
          gap: 12px;
          justify-content: space-between;
          align-items: center;
          padding: 14px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .dc-inline-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          align-items: center;
        }

        .dc-empty {
          border: 1px dashed rgba(255, 255, 255, 0.1);
          border-radius: 18px;
          padding: 28px;
          text-align: center;
          color: var(--dc-muted);
        }

        .dc-section-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 14px;
        }
        .dc-section-title h2 {
          margin: 0;
          font-size: 1.1rem;
          letter-spacing: -0.02em;
        }

        .dc-mono { font-family: var(--dc-mono); }
        .dc-bar-track {
          width: 100%;
          height: 10px;
          border-radius: 999px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.06);
        }
        .dc-bar-fill {
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(90deg, #37d7ff, #22c55e);
        }

        @media (max-width: 1100px) {
          .dc-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 900px) {
          .dc-results-grid,
          .dc-suggestion-grid,
          .dc-social-grid,
          .dc-stat-grid,
          .dc-kv {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (max-width: 640px) {
          .dc-page { padding: 22px 12px 52px; }
          .dc-search-row { grid-template-columns: 1fr; }
          .dc-results-grid,
          .dc-suggestion-grid,
          .dc-social-grid,
          .dc-stat-grid,
          .dc-kv {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <main className="dc-page">
        <div className="dc-shell">
          <section className="dc-hero">
            <div className="dc-badge">🌐 Domain Checker • DNS + WHOIS + SSL + Social</div>
            <h1>Check domain availability <span>instantly</span></h1>
            <p>Fast multi-TLD lookups, WHOIS details behind a secure proxy, DNS records, SSL coverage, IP intel, status checks, social handle scans, exports, history, and watchlist in one place.</p>
          </section>

          <div className="dc-grid">
            <section className="dc-card">
              <div className="dc-segment">
                <button className={`dc-mini-btn ${!bulkMode ? 'active' : ''}`} onClick={() => setBulkMode(false)}>Single</button>
                <button className={`dc-mini-btn ${bulkMode ? 'active' : ''}`} onClick={() => setBulkMode(true)}>Bulk Check</button>
              </div>

              {!bulkMode ? (
                <>
                  <div className="dc-search-row">
                    <input
                      className="dc-input"
                      placeholder="toolsite.com"
                      value={domain}
                      onChange={(event) => setDomain(event.target.value)}
                    />
                    <button className="dc-btn dc-btn-primary" onClick={() => runPrimarySearch()} disabled={loading.availability}>
                      {loading.availability ? 'Checking...' : 'Check'}
                    </button>
                  </div>

                  <div className="dc-tabs">
                    {TABS.map((tab) => (
                      <button key={tab} className={`dc-tab ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
                        {tab === 'availability' ? 'Availability' : tab === 'whois' ? 'WHOIS' : tab === 'dns' ? 'DNS' : tab === 'ssl' ? 'SSL' : tab === 'ip' ? 'IP' : tab === 'status' ? 'Status' : tab === 'social' ? 'Social' : 'Analyzer'}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <label className="dc-label" htmlFor="bulk-domains">Paste up to 20 domains, one per line</label>
                  <textarea
                    id="bulk-domains"
                    className="dc-textarea"
                    rows={7}
                    placeholder={'toolsite.com\ntoolsite.in\ntoolsite.io'}
                    value={bulkDomains}
                    onChange={(event) => setBulkDomains(event.target.value)}
                  />
                  <div className="dc-inline-actions" style={{ marginTop: 12 }}>
                    <button className="dc-btn dc-btn-primary" onClick={handleBulkCheck} disabled={loading.bulk}>Run Bulk Check</button>
                    <button className="dc-btn dc-btn-secondary" onClick={() => exportAvailabilityCsv(bulkResults, 'bulk-domain-check.csv')} disabled={!bulkResults.length}>Export CSV</button>
                  </div>
                </>
              )}

              {error && <div className="dc-note dc-warning-red" style={{ marginTop: 12 }}>{error}</div>}

              {(loading.availability || availabilityProgress.done > 0) && !bulkMode && (
                <div className="dc-progress-wrap">
                  <div className="dc-progress-bar">
                    <span style={{ width: `${availabilityProgress.total ? (availabilityProgress.done / availabilityProgress.total) * 100 : 0}%` }} />
                  </div>
                  <div className="dc-progress-meta">
                    <span>{availabilityProgress.label}</span>
                    <span>{availabilityProgress.done}/{availabilityProgress.total}</span>
                  </div>
                </div>
              )}

              {loading.bulk && (
                <div className="dc-progress-wrap">
                  <div className="dc-progress-bar">
                    <span style={{ width: `${bulkProgress.total ? (bulkProgress.done / bulkProgress.total) * 100 : 0}%` }} />
                  </div>
                  <div className="dc-progress-meta">
                    <span>Checking bulk list...</span>
                    <span>{bulkProgress.done}/{bulkProgress.total}</span>
                  </div>
                </div>
              )}

              {!bulkMode && (
                <>
                  <div className="dc-stat-grid">
                    <div className="dc-stat-card">
                      <h3>Available</h3>
                      <strong style={{ color: 'var(--dc-green)' }}>{availableCount}</strong>
                    </div>
                    <div className="dc-stat-card">
                      <h3>Taken</h3>
                      <strong style={{ color: 'var(--dc-red)' }}>{takenCount}</strong>
                    </div>
                    <div className="dc-stat-card">
                      <h3>Unknown</h3>
                      <strong style={{ color: 'var(--dc-orange)' }}>{unknownCount}</strong>
                    </div>
                  </div>

                  {activeTab === 'availability' && (
                    <>
                      <div className="dc-toolbar">
                        <div className="dc-toolbar-group">
                          {['all', 'available', 'taken'].map((filter) => (
                            <button
                              key={filter}
                              className={`dc-chip ${availabilityFilter === filter ? 'active' : ''}`}
                              onClick={() => setAvailabilityFilter(filter)}
                            >
                              {filter === 'all' ? 'All' : filter === 'available' ? 'Available Only' : 'Taken Only'}
                            </button>
                          ))}
                        </div>

                        <div className="dc-toolbar-group">
                          <select className="dc-select" value={sortBy} onChange={(event) => setSortBy(event.target.value)} style={{ minWidth: 160 }}>
                            <option value="tld">Sort by TLD</option>
                            <option value="status">Sort by Status</option>
                            <option value="price">Sort by Price</option>
                          </select>
                          <button className="dc-btn dc-btn-secondary" onClick={() => setShowAllTlds((prev) => !prev)}>
                            {showAllTlds ? 'Show Top 10' : 'Show All 35'}
                          </button>
                        </div>
                      </div>

                      {filteredAvailability.length ? (
                        <div className="dc-results-grid">
                          {filteredAvailability
                            .filter((item) => showAllTlds || visibleTlds.includes(item.tld))
                            .map((item) => {
                              const pricing = PRICES[item.tld];
                              const best = pricing ? Object.entries(pricing).sort((a, b) => a[1] - b[1])[0] : null;
                              return (
                                <article key={item.domain} className="dc-result-card">
                                  <div className="dc-domain">{item.domain}</div>
                                  <div className={`dc-status ${item.available === true ? 'available' : item.available === false ? 'taken' : 'unknown'}`}>
                                    {item.available === true ? '✅ Available' : item.available === false ? '❌ Taken' : '⚠️ Unknown'}
                                  </div>
                                  <div className="dc-note">{item.available === true ? 'Ready for registration' : item.available === false ? 'Active DNS detected' : 'Resolver could not confirm status'}</div>
                                  {item.available === true && (
                                    <>
                                      <div className="dc-inline-actions">
                                        <a className="dc-btn dc-btn-ghost" href={item.registrarUrl} target="_blank" rel="noreferrer">Register →</a>
                                        <button className="dc-btn dc-btn-secondary" onClick={() => addToWatchlist({ domain: item.domain, status: item.label, checkedAt: new Date().toLocaleString() })}>
                                          Save
                                        </button>
                                      </div>
                                      {pricing && (
                                        <div className="dc-price-list">
                                          {Object.entries(pricing).map(([registrar, price]) => (
                                            <div key={registrar} className="dc-price-row">
                                              <span style={{ textTransform: 'capitalize' }}>{registrar}</span>
                                              <strong>{formatCurrency(price)}</strong>
                                            </div>
                                          ))}
                                          {best && <div className="dc-best-price">Best price: {best[0]} at {formatCurrency(best[1])}</div>}
                                        </div>
                                      )}
                                    </>
                                  )}
                                </article>
                              );
                            })}
                        </div>
                      ) : (
                        <div className="dc-empty">Run a search to see TLD availability across the full extension set.</div>
                      )}
                    </>
                  )}

                  {activeTab === 'whois' && (
                    <div className="dc-info-card">
                      {loading.whois ? (
                        <div className="dc-empty">Fetching WHOIS details...</div>
                      ) : results.whois?.error ? (
                        <div className="dc-empty">{results.whois.error}</div>
                      ) : results.whois ? (
                        <>
                          <div className="dc-section-title">
                            <h2>📋 WHOIS Information</h2>
                            <span className="dc-note">Key {whoisKeyIndex + 1} • usage {whoisUsage.join(' / ')}</span>
                          </div>
                          <div className="dc-kv">
                            <div className="dc-kv-item"><span>Registrar</span><strong>{results.whois.registrar || 'Unknown'}</strong></div>
                            <div className="dc-kv-item"><span>Registered</span><strong>{results.whois.createdDate ? new Date(results.whois.createdDate).toLocaleDateString() : 'Unknown'}</strong></div>
                            <div className="dc-kv-item"><span>Expires</span><strong>{results.whois.expiresDate ? new Date(results.whois.expiresDate).toLocaleDateString() : 'Unknown'}</strong></div>
                            <div className="dc-kv-item"><span>Updated</span><strong>{results.whois.updatedDate ? new Date(results.whois.updatedDate).toLocaleDateString() : 'Unknown'}</strong></div>
                            <div className="dc-kv-item"><span>Domain Age</span><strong>{domainAgeLabel(results.whois.createdDate)}</strong></div>
                            <div className="dc-kv-item"><span>DNSSEC</span><strong>{results.whois.dnssec || 'Unsigned'}</strong></div>
                            <div className="dc-kv-item"><span>Status</span><strong>{(results.whois.status || []).join(', ') || 'Active'}</strong></div>
                            <div className="dc-kv-item"><span>Nameservers</span><strong>{(results.whois.nameServers || []).join(', ') || 'Unknown'}</strong></div>
                          </div>
                          {results.whois.expiresDate && (
                            <p className={`dc-note ${daysBetween(results.whois.expiresDate) < 30 ? 'dc-warning-red' : daysBetween(results.whois.expiresDate) < 90 ? 'dc-warning-orange' : 'dc-warning-green'}`} style={{ marginTop: 14 }}>
                              {daysBetween(results.whois.expiresDate) < 30 ? '⚠️ Expires in less than 30 days' : daysBetween(results.whois.expiresDate) < 90 ? 'Expires within 90 days' : '✅ Expiry looks healthy'}
                            </p>
                          )}
                        </>
                      ) : (
                        <div className="dc-empty">Open WHOIS tab after running a domain search.</div>
                      )}
                    </div>
                  )}

                  {activeTab === 'dns' && (
                    <>
                      {loading.dns ? (
                        <div className="dc-empty">Resolving DNS records...</div>
                      ) : Array.isArray(results.dns) ? (
                        <div className="dc-table-wrap">
                          <table className="dc-table">
                            <thead>
                              <tr>
                                <th>Type</th>
                                <th>Value</th>
                                <th>TTL</th>
                                <th>Copy</th>
                              </tr>
                            </thead>
                            <tbody>
                              {results.dns.flatMap((record) => {
                                if (!record.values.length) {
                                  return (
                                    <tr key={`${record.type}-empty`}>
                                      <td>{record.type}</td>
                                      <td colSpan={3} className="dc-note">No records found</td>
                                    </tr>
                                  );
                                }

                                return record.values.map((value, index) => (
                                  <tr key={`${record.type}-${index}`}>
                                    <td>{record.type}</td>
                                    <td className="dc-mono">{value.data}</td>
                                    <td>{value.ttl || '-'}</td>
                                    <td><button className="dc-btn dc-btn-secondary" onClick={() => navigator.clipboard.writeText(value.data)}>Copy</button></td>
                                  </tr>
                                ));
                              })}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div className="dc-empty">{results.dns?.error || 'DNS data will appear here.'}</div>
                      )}
                    </>
                  )}

                  {activeTab === 'ssl' && (
                    <div className="dc-info-card">
                      {loading.ssl ? (
                        <div className="dc-empty">Checking SSL certificate...</div>
                      ) : results.ssl?.error ? (
                        <div className="dc-empty">{results.ssl.error}</div>
                      ) : results.ssl ? (
                        <>
                          <div className="dc-section-title">
                            <h2>🔒 SSL Certificate</h2>
                            <a className="dc-btn dc-btn-ghost" href={results.ssl.crtUrl} target="_blank" rel="noreferrer">View all certificates →</a>
                          </div>
                          <div className="dc-kv">
                            <div className="dc-kv-item"><span>Status</span><strong>{results.ssl.valid ? 'Valid ✅' : 'Unknown'}</strong></div>
                            <div className="dc-kv-item"><span>HTTPS</span><strong>{results.ssl.httpsActive ? 'Active ✅' : 'Could not verify'}</strong></div>
                            <div className="dc-kv-item"><span>Issuer</span><strong>{results.ssl.issuer}</strong></div>
                            <div className="dc-kv-item"><span>Expires</span><strong>{results.ssl.expires ? new Date(results.ssl.expires).toLocaleDateString() : 'Unknown'}</strong></div>
                            <div className="dc-kv-item"><span>Days remaining</span><strong>{results.ssl.daysRemaining ?? 'Unknown'}</strong></div>
                            <div className="dc-kv-item"><span>Domains covered</span><strong>{results.ssl.covered?.length || 0}</strong></div>
                          </div>
                          {results.ssl.covered?.length ? (
                            <p className="dc-note" style={{ marginTop: 14 }}>
                              Covered domains: {results.ssl.covered.slice(0, 6).join(', ')}{results.ssl.covered.length > 6 ? '…' : ''}
                            </p>
                          ) : null}
                        </>
                      ) : (
                        <div className="dc-empty">SSL details will appear here.</div>
                      )}
                    </div>
                  )}

                  {activeTab === 'ip' && (
                    <div className="dc-info-card">
                      {loading.ip ? (
                        <div className="dc-empty">Looking up IP information...</div>
                      ) : results.ip?.error ? (
                        <div className="dc-empty">{results.ip.error}</div>
                      ) : results.ip ? (
                        <div className="dc-kv">
                          <div className="dc-kv-item"><span>IP</span><strong>{results.ip.query || 'Unknown'}</strong></div>
                          <div className="dc-kv-item"><span>Provider</span><strong>{results.ip.org || results.ip.isp || 'Unknown'}</strong></div>
                          <div className="dc-kv-item"><span>Country</span><strong>{results.ip.country || 'Unknown'}</strong></div>
                          <div className="dc-kv-item"><span>City</span><strong>{results.ip.city || 'Unknown'}</strong></div>
                          <div className="dc-kv-item"><span>ISP</span><strong>{results.ip.as || results.ip.isp || 'Unknown'}</strong></div>
                          <div className="dc-kv-item"><span>Timezone</span><strong>{results.ip.timezone || 'Unknown'}</strong></div>
                          <div className="dc-kv-item"><span>Latitude</span><strong>{results.ip.lat || 'Unknown'}</strong></div>
                          <div className="dc-kv-item"><span>Longitude</span><strong>{results.ip.lon || 'Unknown'}</strong></div>
                        </div>
                      ) : (
                        <div className="dc-empty">IP lookup will appear here.</div>
                      )}
                    </div>
                  )}

                  {activeTab === 'status' && (
                    <div className="dc-info-card">
                      {loading.status ? (
                        <div className="dc-empty">Checking website status...</div>
                      ) : results.status ? (
                        <div className="dc-kv">
                          <div className="dc-kv-item"><span>Status</span><strong style={{ color: results.status.online ? 'var(--dc-green)' : 'var(--dc-red)' }}>{results.status.online ? 'Online ✅' : 'Down ❌'}</strong></div>
                          <div className="dc-kv-item"><span>Response</span><strong>{results.status.responseTime} ms</strong></div>
                          <div className="dc-kv-item"><span>HTTP</span><strong>{results.status.httpStatus || 'Unavailable'}</strong></div>
                          <div className="dc-kv-item"><span>Redirect / Final URL</span><strong>{results.status.finalUrl || 'Unavailable'}</strong></div>
                          <div className="dc-kv-item"><span>Server</span><strong>{results.status.server || 'Unknown'}</strong></div>
                          <div className="dc-kv-item"><span>Health</span><strong>{results.status.online ? (results.status.responseTime > 2000 ? 'Slow ⚠️' : 'Healthy ✅') : 'Offline'}</strong></div>
                        </div>
                      ) : (
                        <div className="dc-empty">Website status will appear here.</div>
                      )}
                    </div>
                  )}

                  {activeTab === 'social' && (
                    <>
                      {loading.social ? (
                        <div className="dc-empty">Checking social handles...</div>
                      ) : Array.isArray(results.social) ? (
                        <div className="dc-social-grid">
                          {results.social.map((platform) => (
                            <article key={platform.id} className="dc-suggestion-card">
                              <div style={{ fontWeight: 700 }}>{platform.icon} {platform.label}</div>
                              <div className="dc-domain">@{platform.handle}</div>
                              <div className={`dc-status ${platform.available === true ? 'available' : platform.available === false ? 'taken' : 'unknown'}`}>
                                {platform.available === true ? 'Available ✅' : platform.available === false ? 'Taken ❌' : 'Unknown ⚠️'}
                              </div>
                              <a className="dc-btn dc-btn-secondary" href={platform.url} target="_blank" rel="noreferrer">Open profile</a>
                            </article>
                          ))}
                        </div>
                      ) : (
                        <div className="dc-empty">{results.social?.error || 'Social scan will appear here.'}</div>
                      )}
                    </>
                  )}

                  {activeTab === 'analyzer' && (
                    <div className="dc-info-card">
                      {analysis ? (
                        <>
                          <div className="dc-section-title">
                            <h2>📊 Domain Analysis: <span className="dc-mono">{normalizedDomain}</span></h2>
                            <strong style={{ color: 'var(--dc-cyan)' }}>Overall Grade: {analysis.grade}</strong>
                          </div>
                          <div className="dc-list">
                            <div className="dc-kv-item"><span>Length</span>{renderBar(analysis.lengthScore)}<strong style={{ marginTop: 8 }}>{analysis.lengthScore}/10</strong></div>
                            <div className="dc-kv-item"><span>Brandability</span>{renderBar(analysis.brandability)}<strong style={{ marginTop: 8 }}>{analysis.brandability}/10</strong></div>
                            <div className="dc-kv-item"><span>SEO Score</span>{renderBar(analysis.seo)}<strong style={{ marginTop: 8 }}>{analysis.seo}/10</strong></div>
                            <div className="dc-kv-item"><span>Memorability</span>{renderBar(analysis.memorability)}<strong style={{ marginTop: 8 }}>{analysis.memorability}/10</strong></div>
                          </div>
                          <p className="dc-note" style={{ marginTop: 16 }}>{analysis.note}</p>
                        </>
                      ) : (
                        <div className="dc-empty">Run a domain search to analyze it.</div>
                      )}
                    </div>
                  )}

                  <div className="dc-export">
                    <button className="dc-btn dc-btn-secondary" onClick={() => exportAvailabilityCsv(results.availability || [])} disabled={!results.availability?.length}>Export CSV</button>
                    <button className="dc-btn dc-btn-secondary" onClick={exportJson} disabled={!results.domain}>Export JSON</button>
                    <button className="dc-btn dc-btn-secondary" onClick={copySummary} disabled={!results.domain}>Copy Summary</button>
                    {exportMessage ? <span className="dc-note">{exportMessage}</span> : null}
                  </div>
                </>
              )}

              {bulkMode && (
                <>
                  {bulkResults.length ? (
                    <>
                      <div className="dc-section-title" style={{ marginTop: 18 }}>
                        <h2>Bulk Results</h2>
                        <span className="dc-note">{bulkResults.filter((row) => row.available === true).length}/{bulkResults.length} domains available</span>
                      </div>
                      <div className="dc-table-wrap">
                        <table className="dc-table">
                          <thead>
                            <tr>
                              <th>Domain</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {bulkResults.map((row) => (
                              <tr key={row.domain}>
                                <td className="dc-mono">{row.domain}</td>
                                <td>{row.available === true ? 'Free ✅' : row.available === false ? 'Taken ❌' : 'Unknown ⚠️'}</td>
                                <td>
                                  {row.available === true ? (
                                    <a className="dc-btn dc-btn-ghost" href={row.registrarUrl} target="_blank" rel="noreferrer">Buy</a>
                                  ) : '-'}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  ) : (
                    <div className="dc-empty" style={{ marginTop: 16 }}>Bulk check results will appear here.</div>
                  )}
                </>
              )}
            </section>

            <aside className="dc-side-grid">
              <div className="dc-card">
                <div className="dc-section-title">
                  <h2>✨ Domain Ideas</h2>
                  <button className="dc-btn dc-btn-ghost" onClick={() => setNameGeneratorInput(domainBase)}>Generate Domain Ideas</button>
                </div>
                <label className="dc-label">Keyword</label>
                <input
                  className="dc-input"
                  placeholder="tool"
                  value={nameGeneratorInput}
                  onChange={(event) => setNameGeneratorInput(event.target.value)}
                />
                <p className="dc-note" style={{ marginTop: 10 }}>Based on <strong>{deferredBase || 'your keyword'}</strong>, only available ideas are highlighted first.</p>
                <div className="dc-suggestion-grid" style={{ gridTemplateColumns: '1fr', marginTop: 14 }}>
                  {suggestions.length ? suggestions
                    .sort((a, b) => Number(b.available === true) - Number(a.available === true))
                    .map((item) => (
                      <article key={item.domain} className="dc-suggestion-card" style={{ minHeight: 'unset' }}>
                        <div className="dc-domain">{item.domain}</div>
                        <div className={`dc-status ${item.available === true ? 'available' : item.available === false ? 'taken' : 'unknown'}`}>
                          {item.available === true ? 'Available ✅' : item.available === false ? 'Taken ❌' : 'Checking...'}
                        </div>
                        {item.available === true ? (
                          <a className="dc-btn dc-btn-ghost" href={`https://www.namecheap.com/domains/registration/results/?domain=${encodeURIComponent(item.domain)}`} target="_blank" rel="noreferrer">Register →</a>
                        ) : null}
                      </article>
                    )) : (
                      <div className="dc-empty">Start typing a domain to generate alternatives, typo variants, prefix/suffix combos, and singular/plural ideas.</div>
                    )}
                </div>
              </div>

              <div className="dc-card">
                <div className="dc-section-title">
                  <h2>🛒 Registrar Pricing</h2>
                  <span className="dc-note">Static monthly reference</span>
                </div>
                {results.availability?.find((item) => item.available === true) ? (
                  <div className="dc-list">
                    {results.availability.filter((item) => item.available === true).slice(0, 3).map((item) => {
                      const pricing = PRICES[item.tld];
                      const best = pricing ? Object.entries(pricing).sort((a, b) => a[1] - b[1])[0] : null;
                      return (
                        <div key={item.domain} className="dc-price-card">
                          <h3>Register {item.domain}</h3>
                          {pricing ? (
                            <div className="dc-price-list">
                              {Object.entries(pricing).map(([registrar, price]) => (
                                <div key={registrar} className="dc-price-row">
                                  <span style={{ textTransform: 'capitalize' }}>{registrar}</span>
                                  <strong>{formatCurrency(price)}</strong>
                                </div>
                              ))}
                              {best && <div className="dc-best-price">Best Price ⭐ {best[0]} at {formatCurrency(best[1])}</div>}
                              <div className="dc-note">Renewal prices may differ.</div>
                            </div>
                          ) : (
                            <div className="dc-note">Pricing not configured for this TLD yet.</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="dc-empty">Available domains from your search will surface pricing here.</div>
                )}
              </div>

              <div className="dc-card">
                <div className="dc-section-title">
                  <h2>⭐ Watchlist</h2>
                  <button className="dc-btn dc-btn-secondary" onClick={refreshWatchlist} disabled={!watchlist.length || loading.watchlist}>
                    {loading.watchlist ? 'Checking...' : 'Check All'}
                  </button>
                </div>
                {watchlist.length ? (
                  <div className="dc-list">
                    {watchlist.map((item) => (
                      <div key={item.domain} className="dc-list-row">
                        <div>
                          <div className="dc-domain">{item.domain}</div>
                          <div className="dc-note">{item.status || 'Not checked yet'} • {item.checkedAt || 'Pending'}</div>
                        </div>
                        <div className="dc-inline-actions">
                          <button className="dc-btn dc-btn-secondary" onClick={() => checkWatchlistNow(item.domain)}>Check Now</button>
                          <button className="dc-btn dc-btn-secondary" onClick={() => setWatchlist((prev) => prev.filter((row) => row.domain !== item.domain))}>Remove</button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="dc-empty">Save available domains here and refresh them later with one click.</div>
                )}
              </div>

              <div className="dc-card">
                <div className="dc-section-title">
                  <h2>🕘 Search History</h2>
                  <button className="dc-btn dc-btn-secondary" onClick={() => setHistory([])} disabled={!history.length}>Clear</button>
                </div>
                {history.length ? (
                  <div className="dc-list">
                    {history.map((item) => (
                      <div key={`${item.domain}-${item.checkedAt}`} className="dc-list-row">
                        <div>
                          <div className="dc-domain">{item.domain}</div>
                          <div className="dc-note">{item.checkedAt}</div>
                        </div>
                        <button className="dc-btn dc-btn-secondary" onClick={() => { setDomain(item.domain); runPrimarySearch(item.domain); }}>Re-check</button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="dc-empty">Your last 10 searches appear here for quick reruns.</div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
