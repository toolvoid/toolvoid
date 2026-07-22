'use client';
import { useState } from 'react';
import { Download } from 'lucide-react';
import { buildSiteMakerZip } from '../../lib/siteMakerExport';

export default function ExportButton({ name, sections }) { const [busy, setBusy] = useState(false); const exportSite = async () => { setBusy(true); try { const blob = await buildSiteMakerZip(name, sections); const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'site'}-export.zip`; link.click(); URL.revokeObjectURL(url); } finally { setBusy(false); } }; return <button className="sm-export" onClick={exportSite} disabled={busy}><Download size={14} />{busy ? 'Building…' : 'Export ZIP'}</button>; }
