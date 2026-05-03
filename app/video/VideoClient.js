'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';

const FORMATS = [
  { v: 'mp4',  label: 'MP4',  desc: 'Universal playback',      note: 'Best compatibility',  tag: 'POPULAR',     tc: '#FF4ECD', tc2: 'rgba(255,78,205,.15)', score: 95, fit: 'All devices, social media, streaming', caution: 'Larger than WebM at same quality.' },
  { v: 'webm', label: 'WebM', desc: 'Web-optimized format',    note: 'Smallest web size',   tag: 'RECOMMENDED', tc: '#00FFB2', tc2: 'rgba(0,255,178,.15)',   score: 90, fit: 'Web embeds, Chrome/Firefox, uploads', caution: 'Safari support is limited.' },
  { v: 'mov',  label: 'MOV',  desc: 'Apple ecosystem',         note: 'Best for Mac/iOS',    tag: 'QUALITY',     tc: '#4D96FF', tc2: 'rgba(77,150,255,.15)',  score: 80, fit: 'Final Cut, iMovie, Apple devices',  caution: 'Large file size by default.' },
  { v: 'avi',  label: 'AVI',  desc: 'Legacy Windows format',   note: 'Old-school compat',   tag: 'LEGACY',      tc: '#FFD93D', tc2: 'rgba(255,217,61,.15)',  score: 55, fit: 'Windows Media Player, old editors',  caution: 'Very large files, outdated codec.' },
  { v: 'mkv',  label: 'MKV',  desc: 'Open container format',   note: 'Multiple streams',    tag: 'ADVANCED',    tc: '#A78BFA', tc2: 'rgba(167,139,250,.15)', score: 75, fit: 'VLC, Kodi, archiving, HDR content',  caution: 'Not natively supported everywhere.' },
  { v: 'gif',  label: 'GIF',  desc: 'Animated image loop',     note: 'Meme-ready export',   tag: 'FUN',         tc: '#FF9A3C', tc2: 'rgba(255,154,60,.15)',  score: 40, fit: 'Short clips, reactions, thumbnails',  caution: 'No audio, large file, 256 colors.' },
];

const QUALITY_PRESETS = [
  { label: 'Max',    note: '100%', value: 100 },
  { label: 'High',   note: '80%',  value: 80  },
  { label: 'Medium', note: '60%',  value: 60  },
  { label: 'Low',    note: '40%',  value: 40  },
];

const RESOLUTIONS = ['Original', '1080p', '720p', '480p', '360p'];
const SPEEDS = ['0.5x', '0.75x', '1x', '1.25x', '1.5x', '2x'];
const AUDIO_OPTIONS = ['Keep Audio', 'Remove Audio', 'Extract Audio Only'];

function fmtSize(b) {
  if (!b) return '—';
  if (b < 1024) return `${b}B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(0)}KB`;
  return `${(b / 1024 / 1024).toFixed(1)}MB`;
}
function fmtDur(s) {
  if (!s) return '—';
  const m = Math.floor(s / 60), sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}
function fmtDate(ts) {
  return new Date(ts).toLocaleString('en-IN', { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' });
}

function makeEntryId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return `conv-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export default function VideoConverter() {
  const [video, setVideo]             = useState(null);
  const [vidInfo, setVidInfo]         = useState(null);
  const [isDragging, setIsDragging]   = useState(false);
  const [format, setFormat]           = useState('mp4');
  const [quality, setQuality]         = useState(80);
  const [resolution, setResolution]   = useState('Original');
  const [speed, setSpeed]             = useState('1x');
  const [audioOpt, setAudioOpt]       = useState('Keep Audio');
  const [trimStart, setTrimStart]     = useState(0);
  const [trimEnd, setTrimEnd]         = useState(100);
  const [processing, setProcessing]   = useState(false);
  const [progress, setProgress]       = useState(0);
  const [converted, setConverted]     = useState(null);
  const [history, setHistory]         = useState([]);
  const [activeTab, setActiveTab]     = useState('settings');
  const [viewMode, setViewMode]       = useState('original');
  const [muted, setMuted]             = useState(false);
  const [playing, setPlaying]         = useState(false);

  const fileRef    = useRef(null);
  const videoRef   = useRef(null);
  const canvasRef  = useRef(null);
  const editorRef  = useRef(null);

  const loadVideo = (file) => {
    if (!file || !file.type.startsWith('video/')) {
      alert('Please upload a valid video file.');
      return;
    }
    const url = URL.createObjectURL(file);
    const vid = document.createElement('video');
    vid.onloadedmetadata = () => {
      setVideo(url);
      setConverted(null);
      setProgress(0);
      setTrimStart(0);
      setTrimEnd(100);
      setVidInfo({
        name: file.name,
        size: file.size,
        type: file.type,
        duration: vid.duration,
        width: vid.videoWidth,
        height: vid.videoHeight,
        uploadedAt: Date.now(),
        lastModified: file.lastModified,
      });
      setViewMode('original');
    };
    vid.src = url;
  };

  const onDrop = useCallback(e => {
    e.preventDefault(); setIsDragging(false);
    loadVideo(e.dataTransfer.files[0]);
  }, []);

  useEffect(() => {
    if (!vidInfo || typeof window === 'undefined' || window.innerWidth > 920) return;
    const f = requestAnimationFrame(() => editorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    return () => cancelAnimationFrame(f);
  }, [vidInfo]);

  // Simulated conversion (real FFmpeg.wasm would go here)
  const convert = () => {
    if (!vidInfo) return;
    setProcessing(true);
    setProgress(0);
    const fmtObj = FORMATS.find(f => f.v === format);
    const qualityFactor = quality / 100;
    const resFactor = resolution === 'Original' ? 1 : resolution === '1080p' ? 0.95 : resolution === '720p' ? 0.7 : resolution === '480p' ? 0.45 : 0.25;
    const audioFactor = audioOpt === 'Remove Audio' ? 0.85 : audioOpt === 'Extract Audio Only' ? 0.05 : 1;
    const estimatedSize = Math.round(vidInfo.size * qualityFactor * resFactor * audioFactor * (fmtObj.score / 100));

    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          const entry = {
            id: makeEntryId(),
            name: vidInfo.name.replace(/\.[^.]+$/, '') + '.' + format,
            originalName: vidInfo.name,
            size: estimatedSize,
            originalSize: vidInfo.size,
            format,
            quality,
            resolution,
            speed,
            audioOpt,
            duration: vidInfo.duration,
            width: vidInfo.width,
            height: vidInfo.height,
            convertedAt: Date.now(),
            savings: Math.max(0, Math.round((1 - estimatedSize / vidInfo.size) * 100)),
          };
          setConverted(entry);
          setHistory(h => [entry, ...h].slice(0, 10));
          setProcessing(false);
          setViewMode('converted');
          return 100;
        }
        return p + (Math.random() * 8 + 2);
      });
    }, 120);
  };

  const download = (entry) => {
    // In production: use actual converted blob URL
    const a = document.createElement('a');
    a.href = video; // placeholder
    a.download = entry.name;
    a.click();
  };

  const activeFormatObj = FORMATS.find(f => f.v === format);
  const qualityTone = quality >= 90 ? 'Near-original quality' : quality >= 70 ? 'Balanced — good for most uses' : quality >= 50 ? 'Smaller file, softer detail' : 'Maximum compression, visible loss';

  const slBg = (v, mn, mx) => `linear-gradient(to right,#FF4ECD ${((v - mn) / (mx - mn)) * 100}%,rgba(255,255,255,.09) ${((v - mn) / (mx - mn)) * 100}%)`;

  return (
    <>
      <style precedence="default" href="toolsite-video-styles">{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;600;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{
          --pink:#FF4ECD;
          --pink2:#ff79d8;
          --cyan:#00FFB2;
          --blue:#4D96FF;
          --gold:#FFD93D;
          --bg:#08050f;
          --bg2:#0e0a1a;
          --card:rgba(255,255,255,.04);
          --line:rgba(255,78,205,.14);
          --muted:#8b7fa8;
          --ink:#f0ecff;
        }
        html,body{background:var(--bg);color:var(--ink);font-family:'Plus Jakarta Sans',sans-serif;min-height:100vh;overflow-x:hidden}
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:.2}}
        @keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
        @keyframes drift{0%,100%{transform:translate3d(0,0,0)}50%{transform:translate3d(0,-8px,0)}}
        @keyframes popIn{0%{opacity:0;transform:scale(.96)}100%{opacity:1;transform:scale(1)}}
        @keyframes progress{from{width:0}to{width:100%}}
        @keyframes pulse{0%,100%{opacity:.35}50%{opacity:.7}}
        @keyframes scanH{0%{top:-4px}100%{top:110%}}

        .page{min-height:100vh;position:relative;overflow:hidden;background:
          radial-gradient(circle at 18% 16%,rgba(255,78,205,.16),transparent 28%),
          radial-gradient(circle at 80% 10%,rgba(77,150,255,.12),transparent 28%),
          radial-gradient(circle at 55% 82%,rgba(167,139,250,.1),transparent 32%),
          linear-gradient(180deg,#08050f 0%,#0d0818 100%)}
        .bg{position:fixed;inset:0;pointer-events:none;z-index:0}
        .bg-g1{position:absolute;top:-10%;left:-5%;width:55%;height:55%;border-radius:50%;background:radial-gradient(ellipse,rgba(255,78,205,.14),transparent 65%);animation:pulse 10s ease-in-out infinite}
        .bg-g2{position:absolute;bottom:-15%;right:-5%;width:50%;height:50%;border-radius:50%;background:radial-gradient(ellipse,rgba(77,150,255,.12),transparent 65%);animation:pulse 14s ease-in-out infinite 3s}
        .bg-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,78,205,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,78,205,.03) 1px,transparent 1px);background-size:48px 48px}
        .bg-noise{position:absolute;inset:0;opacity:.02;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}

        nav{position:sticky;top:0;z-index:100;display:flex;align-items:center;justify-content:space-between;gap:14px;padding:16px 28px;background:rgba(8,5,15,.85);backdrop-filter:blur(20px);border-bottom:1px solid var(--line)}
        .logo{font-family:'Space Grotesk',sans-serif;font-size:22px;font-weight:700;text-decoration:none;color:var(--ink)}
        .logo em{color:var(--pink);font-style:normal}
        .nav-pill{padding:6px 14px;border-radius:999px;background:rgba(255,78,205,.08);border:1px solid rgba(255,78,205,.22);font-size:11px;color:var(--pink2);font-family:'JetBrains Mono',monospace;letter-spacing:.12em;text-transform:uppercase;font-weight:700}
        .back{display:flex;align-items:center;gap:6px;text-decoration:none;color:var(--muted);font-size:12px;font-family:'JetBrains Mono',monospace;letter-spacing:.08em;text-transform:uppercase;transition:color .2s}
        .back:hover{color:var(--ink)}

        .wrap{position:relative;z-index:1;max-width:1380px;margin:0 auto;padding:26px 20px 44px}

        /* Mobile bars */
        .mobile-steps{display:none;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-bottom:14px;overflow-x:auto}
        .mobile-step{min-width:110px;padding:12px;border-radius:18px;background:rgba(255,255,255,.03);border:1px solid var(--line)}
        .mobile-step-no{font-size:9px;color:var(--pink);font-family:'JetBrains Mono',monospace;letter-spacing:.12em;text-transform:uppercase;font-weight:700;margin-bottom:5px}
        .mobile-step-title{font-size:12px;color:var(--ink);font-weight:700;line-height:1.3}
        .mobile-step-copy{font-size:10px;color:var(--muted);margin-top:3px}
        .mobile-upload-bar{display:none;margin-bottom:14px;padding:16px;border-radius:22px;background:linear-gradient(135deg,rgba(255,78,205,.14),rgba(77,150,255,.08));border:1px solid var(--line)}
        .mub-k{font-size:9px;color:var(--pink2);font-family:'JetBrains Mono',monospace;letter-spacing:.12em;text-transform:uppercase;font-weight:700;margin-bottom:5px}
        .mub-title{font-size:19px;color:#fff;font-weight:800;line-height:1.2;margin-bottom:6px}
        .mub-copy{font-size:12px;color:#d0c8e8;line-height:1.65}
        .mub-badge{padding:6px 10px;border-radius:999px;background:rgba(8,5,15,.3);font-size:9px;color:var(--pink2);font-family:'JetBrains Mono',monospace;letter-spacing:.08em;text-transform:uppercase;font-weight:700;white-space:nowrap}
        .mub-actions{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-top:10px}
        .mub-btn{flex:1;border:none;border-radius:14px;padding:13px 16px;background:linear-gradient(135deg,#ff79d8,#FF4ECD);color:#fff;font-size:11px;font-family:'JetBrains Mono',monospace;letter-spacing:.08em;text-transform:uppercase;font-weight:800;cursor:pointer;min-width:160px}
        .mub-meta{font-size:11px;color:#b8aed4;font-family:'JetBrains Mono',monospace;letter-spacing:.04em;line-height:1.5}
        .mub-preview{display:flex;align-items:center;gap:12px;margin:10px 0;padding:10px;border-radius:16px;background:rgba(8,5,15,.28);border:1px solid rgba(255,78,205,.1)}
        .mub-thumb{width:60px;height:60px;border-radius:14px;overflow:hidden;flex-shrink:0;background:#1a0f26;border:1px solid rgba(255,78,205,.14);display:flex;align-items:center;justify-content:center;font-size:24px}
        .mub-preview-copy{min-width:0}
        .mub-preview-title{font-size:12px;color:#fff;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
        .mub-preview-sub{font-size:10px;color:var(--muted);font-family:'JetBrains Mono',monospace;letter-spacing:.04em;line-height:1.6}

        /* Hero */
        .hero{display:grid;grid-template-columns:1.3fr .7fr;gap:16px;margin-bottom:16px;animation:fadeUp .5s both}
        .hero-main,.hero-side,.panel,.preview-shell,.info-card{background:rgba(255,255,255,.038);border:1px solid var(--line);border-radius:26px;position:relative;overflow:hidden;box-shadow:0 20px 55px rgba(0,0,0,.28)}
        .hero-main::before,.hero-side::before,.panel::before,.preview-shell::before,.info-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(255,78,205,.28),transparent)}
        .hero-main{padding:28px;background:linear-gradient(135deg,rgba(255,78,205,.14),rgba(255,255,255,.03) 42%,rgba(77,150,255,.1)),rgba(255,255,255,.038)}
        .hero-side{padding:20px}
        .htag{display:inline-flex;align-items:center;gap:8px;padding:7px 14px;border-radius:999px;background:rgba(255,78,205,.08);border:1px solid rgba(255,78,205,.2);font-size:10px;color:var(--pink2);font-family:'JetBrains Mono',monospace;letter-spacing:.12em;text-transform:uppercase;font-weight:700;margin-bottom:14px}
        .hdot{width:5px;height:5px;border-radius:50%;background:var(--pink);animation:blink 2s infinite}
        .htitle{font-family:'Space Grotesk',sans-serif;font-size:clamp(52px,8vw,108px);line-height:.88;letter-spacing:-.04em;color:#fff;margin-bottom:12px;font-weight:700}
        .htitle em{color:var(--pink);font-style:normal}
        .hsub{font-size:15px;color:#b8aed4;line-height:1.8;max-width:540px}
        .hsub b{color:#fff}
        .hero-chips{display:flex;flex-wrap:wrap;gap:9px;margin-top:16px}
        .hero-chip{padding:9px 13px;border-radius:999px;background:rgba(255,255,255,.05);border:1px solid rgba(255,78,205,.12);font-size:11px;color:#d8d0f0;font-family:'JetBrains Mono',monospace;letter-spacing:.08em;text-transform:uppercase;font-weight:700}
        .hero-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:16px}
        .hero-stat{padding:13px;border-radius:16px;background:rgba(8,5,15,.28);border:1px solid rgba(255,78,205,.1)}
        .hero-stat-k{font-size:10px;color:var(--muted);font-family:'JetBrains Mono',monospace;letter-spacing:.1em;text-transform:uppercase;font-weight:700;margin-bottom:5px}
        .hero-stat-v{font-size:13px;color:var(--ink);font-weight:700;line-height:1.5}
        .side-title{font-size:10px;color:var(--muted);font-family:'JetBrains Mono',monospace;letter-spacing:.12em;text-transform:uppercase;font-weight:700;margin-bottom:11px}
        .side-format-box{padding:16px;border-radius:18px;background:linear-gradient(135deg,rgba(255,78,205,.14),rgba(77,150,255,.1));border:1px solid rgba(255,78,205,.2);margin-bottom:11px}
        .side-format-name{font-size:26px;color:#fff;font-weight:800;letter-spacing:.01em;margin-bottom:5px}
        .side-format-badge{padding:5px 9px;border-radius:999px;background:rgba(8,5,15,.32);font-size:10px;color:var(--pink2);font-family:'JetBrains Mono',monospace;letter-spacing:.09em;text-transform:uppercase;font-weight:700;display:inline-block;margin-bottom:8px}
        .side-copy{font-size:13px;color:#d8cef0;line-height:1.7}
        .side-points{display:grid;gap:9px}
        .side-point{padding:11px 13px;border-radius:16px;background:rgba(255,255,255,.03);border:1px solid rgba(255,78,205,.1)}
        .side-point-k{font-size:10px;color:var(--muted);font-family:'JetBrains Mono',monospace;letter-spacing:.1em;text-transform:uppercase;font-weight:700;margin-bottom:4px}
        .side-point-v{font-size:13px;color:var(--ink);font-weight:600;line-height:1.5}

        /* Board */
        .board{display:grid;grid-template-columns:340px minmax(0,1fr) 300px;grid-template-areas:'step1 step3 aside' 'step2 step2 aside';gap:14px;align-items:start}
        .stack{display:grid;gap:14px}
        .step1-panel{grid-area:step1}
        .step2-panel{grid-area:step2}
        .step3-panel{grid-area:step3}
        .aside{grid-area:aside}
        .panel{padding:18px;animation:fadeUp .45s both}
        .panel-head{display:flex;align-items:flex-start;justify-content:space-between;gap:10px;margin-bottom:14px}
        .panel-kicker{font-size:10px;color:var(--pink);font-family:'JetBrains Mono',monospace;letter-spacing:.12em;text-transform:uppercase;font-weight:700;margin-bottom:4px}
        .panel-title{font-size:19px;color:#fff;font-weight:800;line-height:1.2;font-family:'Space Grotesk',sans-serif}
        .panel-sub{font-size:12px;color:var(--muted);line-height:1.65;margin-top:3px}
        .panel-icon{width:40px;height:40px;border-radius:13px;display:flex;align-items:center;justify-content:center;font-size:18px;background:rgba(255,255,255,.05);border:1px solid var(--line);flex-shrink:0}
        .section-label{font-size:10px;color:var(--muted);font-family:'JetBrains Mono',monospace;letter-spacing:.12em;text-transform:uppercase;font-weight:700;margin-bottom:8px}

        /* Drop zone */
        .drop{border:2px dashed rgba(255,78,205,.22);border-radius:22px;padding:28px 16px;text-align:center;cursor:pointer;background:linear-gradient(180deg,rgba(255,255,255,.02),rgba(255,78,205,.03));transition:all .28s}
        .drop.drag,.drop:hover{border-color:rgba(255,78,205,.55);background:linear-gradient(180deg,rgba(255,78,205,.07),rgba(255,255,255,.02));transform:translateY(-2px)}
        .drop-icon{font-size:46px;display:block;margin-bottom:12px}
        .drop-t{font-size:15px;color:#fff;font-weight:800;margin-bottom:5px;font-family:'Space Grotesk',sans-serif}
        .drop-s{font-size:13px;color:var(--muted);line-height:1.7}
        .drop-acc{color:var(--pink2);font-weight:700}
        .browse{margin-top:13px;background:linear-gradient(135deg,#ff79d8,#FF4ECD);color:#fff;border:none;border-radius:13px;padding:11px 18px;font-size:11px;font-weight:800;cursor:pointer;font-family:'JetBrains Mono',monospace;letter-spacing:.07em;text-transform:uppercase}

        /* Thumb */
        .thumb{border-radius:20px;overflow:hidden;position:relative;background:rgba(0,0,0,.35);min-height:160px;display:flex;align-items:center;justify-content:center;cursor:pointer;border:1px solid rgba(255,78,205,.12)}
        .thumb video{max-width:100%;max-height:160px;object-fit:contain;display:block}
        .thumb-over{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;background:rgba(8,5,15,.6);opacity:0;transition:opacity .2s}
        .thumb:hover .thumb-over{opacity:1}
        .thumb-lbl{font-size:12px;color:#fff;font-family:'JetBrains Mono',monospace;font-weight:700;letter-spacing:.07em;text-transform:uppercase}

        /* Info bar */
        .ibar{display:grid;grid-template-columns:repeat(4,1fr);gap:7px;margin-top:12px}
        .ist{padding:10px;border-radius:14px;background:rgba(255,255,255,.035);border:1px solid rgba(255,78,205,.1)}
        .isn{font-size:12px;color:var(--pink2);font-weight:800;line-height:1.2;margin-bottom:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
        .isl{font-size:9px;color:var(--muted);font-family:'JetBrains Mono',monospace;letter-spacing:.09em;text-transform:uppercase;font-weight:700}

        /* Detail info grid */
        .info-grid{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-top:12px}
        .info-cell{padding:10px 12px;border-radius:14px;background:rgba(255,255,255,.03);border:1px solid rgba(255,78,205,.08)}
        .info-cell-k{font-size:9px;color:var(--muted);font-family:'JetBrains Mono',monospace;letter-spacing:.09em;text-transform:uppercase;font-weight:700;margin-bottom:4px}
        .info-cell-v{font-size:13px;color:var(--ink);font-weight:700;line-height:1.45;word-break:break-all}

        /* Tabs */
        .tabs{display:flex;gap:5px;margin-bottom:14px;border-bottom:1px solid rgba(255,78,205,.1);padding-bottom:10px}
        .tab{border:1px solid transparent;border-radius:10px;padding:7px 13px;font-size:11px;cursor:pointer;font-family:'JetBrains Mono',monospace;font-weight:700;background:transparent;color:var(--muted);letter-spacing:.07em;text-transform:uppercase;transition:all .2s}
        .tab.on{background:rgba(255,78,205,.1);border-color:rgba(255,78,205,.24);color:var(--pink2)}
        .tab:hover:not(.on){color:var(--ink)}

        /* Format cards */
        .fmts{display:grid;gap:7px;margin-bottom:13px}
        .fmt-card{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:12px 13px;border-radius:16px;border:1px solid rgba(255,255,255,.07);background:rgba(255,255,255,.025);cursor:pointer;transition:all .22s}
        .fmt-card:hover{border-color:rgba(255,78,205,.22)}
        .fmt-card.on{background:rgba(255,78,205,.06);border-color:rgba(255,78,205,.32)}
        .fmt-left{display:flex;gap:11px;align-items:flex-start}
        .fmt-badge{font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:800;letter-spacing:.06em;min-width:44px;padding-top:2px}
        .fmt-desc{font-size:12px;color:var(--muted);line-height:1.55}
        .fmt-desc b{display:block;font-size:13px;color:var(--ink);font-weight:800;margin-bottom:2px}
        .fmt-tag{padding:4px 8px;border-radius:999px;font-size:10px;font-family:'JetBrains Mono',monospace;font-weight:700;letter-spacing:.07em}

        /* Quality presets */
        .levels{display:grid;grid-template-columns:repeat(4,1fr);gap:7px;margin-bottom:13px}
        .lbtn{border:1px solid rgba(255,78,205,.12);border-radius:14px;padding:11px 6px;background:rgba(255,255,255,.025);color:var(--muted);cursor:pointer;font-weight:800;font-size:12px;transition:all .2s;font-family:'Plus Jakarta Sans',sans-serif;text-align:center}
        .lbtn:hover{border-color:rgba(255,78,205,.28);color:var(--ink)}
        .lbtn.on{background:linear-gradient(135deg,rgba(255,78,205,.2),rgba(255,78,205,.08));color:var(--pink2);border-color:rgba(255,78,205,.4)}
        .lbtn-note{font-size:10px;font-family:'JetBrains Mono',monospace;letter-spacing:.05em;margin-top:4px;opacity:.65}
        .qrow{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
        .ql{font-size:12px;color:#d0c8e8;font-weight:700}
        .qv{padding:4px 10px;border-radius:999px;background:rgba(255,255,255,.06);border:1px solid rgba(255,78,205,.16);font-size:11px;color:#fff;font-family:'JetBrains Mono',monospace;font-weight:700}
        .qhint{font-size:12px;color:var(--muted);line-height:1.6;margin:-2px 0 12px}
        input[type=range]{-webkit-appearance:none;appearance:none;width:100%;height:5px;border-radius:999px;outline:none;border:none;cursor:pointer;margin-bottom:10px;background:rgba(255,255,255,.09)}
        input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:var(--pink2);border:2px solid var(--pink);box-shadow:0 0 0 4px rgba(255,78,205,.18);margin-top:-5.5px}

        /* Select rows */
        .sel-row{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-bottom:12px}
        .sel-label{font-size:10px;color:var(--muted);font-family:'JetBrains Mono',monospace;letter-spacing:.1em;text-transform:uppercase;font-weight:700;margin-bottom:5px}
        .sel-group{display:flex;flex-wrap:wrap;gap:5px}
        .sel-btn{border:1px solid rgba(255,78,205,.1);border-radius:9px;padding:6px 10px;font-size:11px;cursor:pointer;font-family:'JetBrains Mono',monospace;font-weight:700;background:rgba(255,255,255,.025);color:var(--muted);letter-spacing:.05em;transition:all .2s}
        .sel-btn:hover{color:var(--ink);border-color:rgba(255,78,205,.24)}
        .sel-btn.on{background:rgba(255,78,205,.1);border-color:rgba(255,78,205,.3);color:var(--pink2)}

        /* Trim */
        .trim-row{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-bottom:12px}
        .trim-label{font-size:10px;color:var(--muted);font-family:'JetBrains Mono',monospace;letter-spacing:.1em;text-transform:uppercase;font-weight:700;margin-bottom:5px}
        .trim-val{font-size:12px;color:var(--pink2);font-family:'JetBrains Mono',monospace;font-weight:700}

        /* Convert btn */
        .cvt-btn{width:100%;border:none;border-radius:16px;padding:15px;background:linear-gradient(135deg,#ff79d8,#FF4ECD);color:#fff;font-size:13px;font-weight:900;letter-spacing:.07em;text-transform:uppercase;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 6px 24px rgba(255,78,205,.25);transition:all .25s}
        .cvt-btn::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.28),transparent);background-size:200%;animation:shimmer 2.2s linear infinite}
        .cvt-btn:hover{transform:translateY(-2px);box-shadow:0 14px 36px rgba(255,78,205,.32)}
        .cvt-btn:disabled{opacity:.35;cursor:not-allowed;transform:none;box-shadow:none}
        .spin{display:inline-block;animation:spin .8s linear infinite}

        /* Progress */
        .prog-wrap{margin-bottom:12px;padding:14px;border-radius:16px;background:rgba(255,78,205,.06);border:1px solid rgba(255,78,205,.2)}
        .prog-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:9px}
        .prog-lbl{font-size:12px;color:var(--pink2);font-family:'JetBrains Mono',monospace;font-weight:700;letter-spacing:.07em;text-transform:uppercase;display:flex;align-items:center;gap:8px}
        .prog-pct{font-size:13px;color:#fff;font-family:'JetBrains Mono',monospace;font-weight:800}
        .prog-bar-bg{height:7px;border-radius:999px;background:rgba(255,255,255,.08);overflow:hidden}
        .prog-bar-fill{height:100%;border-radius:999px;background:linear-gradient(90deg,#FF4ECD,#ff79d8,#00FFB2);transition:width .2s ease}
        .prog-eta{font-size:11px;color:var(--muted);font-family:'JetBrains Mono',monospace;letter-spacing:.06em;margin-top:6px}
        .scan-line{position:absolute;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--pink),transparent);animation:scanH 1.6s linear infinite;opacity:.7}

        /* Preview */
        .preview-shell{padding:16px;min-height:400px;animation:fadeUp .5s both}
        .preview-top{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:14px}
        .preview-title{font-size:22px;color:var(--pink2);font-weight:800;font-family:'Space Grotesk',sans-serif;line-height:1.2}
        .preview-sub{font-size:11px;color:var(--muted);font-family:'JetBrains Mono',monospace;letter-spacing:.08em;text-transform:uppercase;margin-top:3px}
        .vtog{display:flex;padding:5px;border-radius:16px;background:rgba(255,255,255,.05);border:1px solid rgba(255,78,205,.14);gap:5px}
        .vbtn{border:none;background:transparent;color:var(--muted);border-radius:11px;padding:9px 13px;font-size:11px;font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;transition:all .2s}
        .vbtn:hover{color:var(--ink)}
        .vbtn.on{background:linear-gradient(135deg,#ff79d8,#FF4ECD);color:#fff;box-shadow:0 6px 18px rgba(255,78,205,.2)}
        .preview-stage{position:relative;min-height:360px;border-radius:22px;overflow:hidden;background:linear-gradient(135deg,#0d0818,#100a20);display:flex;align-items:center;justify-content:center;border:1px solid rgba(255,78,205,.1)}
        .pimg,.pvideo{max-width:100%;max-height:360px;display:block;border-radius:16px;animation:popIn .3s ease both}
        .empty{text-align:center;padding:36px;animation:drift 6s ease-in-out infinite}
        .eico{font-size:52px;margin-bottom:13px;opacity:.15}
        .et{font-size:18px;color:#fff;font-weight:800;margin-bottom:5px;font-family:'Space Grotesk',sans-serif}
        .es{font-size:12px;color:var(--muted);font-family:'JetBrains Mono',monospace;letter-spacing:.07em}

        /* Download section */
        .dl-section{margin-top:12px;padding:14px;border-radius:18px;background:linear-gradient(135deg,rgba(255,78,205,.1),rgba(77,150,255,.06));border:1px solid rgba(255,78,205,.2);animation:popIn .3s ease both}
        .dl-title{font-size:13px;color:#fff;font-weight:800;margin-bottom:4px;font-family:'Space Grotesk',sans-serif}
        .dl-meta{font-size:12px;color:var(--muted);line-height:1.7;margin-bottom:10px}
        .dl-meta b{color:var(--pink2);font-family:'JetBrains Mono',monospace}
        .dl-btns{display:flex;gap:8px;flex-wrap:wrap}
        .dl-main{flex:1;border:none;border-radius:13px;padding:11px 14px;background:linear-gradient(135deg,#ff79d8,#FF4ECD);color:#fff;font-size:11px;font-weight:800;letter-spacing:.07em;text-transform:uppercase;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;display:flex;align-items:center;justify-content:center;gap:6px}
        .dl-ghost{border:1px solid rgba(255,78,205,.24);border-radius:13px;padding:10px 14px;font-size:11px;cursor:pointer;font-family:'JetBrains Mono',monospace;font-weight:700;background:transparent;color:var(--pink2);letter-spacing:.06em;text-transform:uppercase;transition:all .2s}
        .dl-ghost:hover{background:rgba(255,78,205,.08)}

        /* Savings card */
        .sav-card{padding:16px;border-radius:22px;background:linear-gradient(135deg,rgba(255,78,205,.14),rgba(77,150,255,.1));border:1px solid rgba(255,78,205,.2);animation:popIn .35s ease both;box-shadow:0 16px 40px rgba(0,0,0,.26)}
        .sav-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(255,78,205,.3),transparent)}
        .sav-head{font-size:10px;color:var(--pink2);font-family:'JetBrains Mono',monospace;letter-spacing:.12em;text-transform:uppercase;font-weight:700;margin-bottom:10px}
        .sav-main{display:flex;align-items:flex-end;gap:8px;margin-bottom:10px}
        .sav-pct{font-family:'Space Grotesk',sans-serif;font-size:54px;line-height:.9;color:var(--pink2);font-weight:700}
        .sav-unit{font-size:26px;color:var(--pink);font-weight:700;line-height:1}
        .sav-lbl{font-size:11px;color:var(--ink);font-family:'JetBrains Mono',monospace;letter-spacing:.08em;text-transform:uppercase;font-weight:700;line-height:1.5}
        .sav-bar-bg{height:7px;border-radius:999px;background:rgba(255,255,255,.08);overflow:hidden;margin-bottom:11px}
        .sav-bar-fill{height:100%;border-radius:999px;background:linear-gradient(90deg,var(--pink),#00FFB2)}
        .sav-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}
        .sav-cell{padding:11px;border-radius:14px;background:rgba(8,5,15,.2);border:1px solid rgba(255,78,205,.1)}
        .sav-cell-k{font-size:9px;color:var(--muted);font-family:'JetBrains Mono',monospace;letter-spacing:.1em;text-transform:uppercase;font-weight:700;margin-bottom:4px}
        .sav-cell-v{font-size:14px;color:#fff;font-family:'JetBrains Mono',monospace;font-weight:800}

        /* History */
        .hist-card{padding:16px;animation:fadeUp .5s .1s both;position:relative;overflow:hidden}
        .hist-empty{text-align:center;padding:28px;color:var(--muted);font-size:12px;font-family:'JetBrains Mono',monospace;letter-spacing:.06em}
        .hist-item{padding:12px;border-radius:14px;background:rgba(255,255,255,.03);border:1px solid rgba(255,78,205,.08);margin-bottom:7px;transition:all .2s}
        .hist-item:hover{border-color:rgba(255,78,205,.2);background:rgba(255,78,205,.04)}
        .hist-item:last-child{margin-bottom:0}
        .hist-top{display:flex;align-items:flex-start;justify-content:space-between;gap:8px;margin-bottom:7px}
        .hist-name{font-size:12px;color:#fff;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:160px}
        .hist-badge{padding:3px 8px;border-radius:999px;font-size:9px;font-family:'JetBrains Mono',monospace;font-weight:700;letter-spacing:.06em;background:rgba(255,78,205,.12);border:1px solid rgba(255,78,205,.2);color:var(--pink2)}
        .hist-meta{font-size:11px;color:var(--muted);font-family:'JetBrains Mono',monospace;letter-spacing:.04em;line-height:1.7}
        .hist-meta span{color:var(--pink2)}
        .hist-dl{width:100%;margin-top:7px;border:1px solid rgba(255,78,205,.18);border-radius:9px;padding:7px;font-size:11px;cursor:pointer;font-family:'JetBrains Mono',monospace;font-weight:700;background:transparent;color:var(--pink2);letter-spacing:.06em;text-transform:uppercase;transition:all .2s}
        .hist-dl:hover{background:rgba(255,78,205,.08)}

        /* Info card */
        .info-card{padding:16px;animation:fadeUp .5s .15s both}
        .info-section-title{font-size:10px;color:var(--muted);font-family:'JetBrains Mono',monospace;letter-spacing:.12em;text-transform:uppercase;font-weight:700;margin-bottom:10px;margin-top:14px;padding-top:14px;border-top:1px solid rgba(255,78,205,.08)}
        .info-section-title:first-child{margin-top:0;padding-top:0;border-top:none}
        .info-row{display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid rgba(255,78,205,.05)}
        .info-row:last-child{border-bottom:none}
        .info-row-k{font-size:12px;color:var(--muted)}
        .info-row-v{font-size:12px;color:var(--ink);font-family:'JetBrains Mono',monospace;font-weight:700;text-align:right;max-width:60%;word-break:break-all}

        /* Responsive */
        @media(max-width:1180px){.hero{grid-template-columns:1fr}.board{grid-template-columns:300px minmax(0,1fr);grid-template-areas:'step1 step3' 'step2 step2' 'aside aside'}}
        @media(max-width:920px){
          nav{padding:0 14px}
          .wrap{padding:72px 14px 40px}
          .mobile-steps{display:grid}
          .mobile-upload-bar{display:block}
          .hero{display:none}
          .board{grid-template-columns:1fr;grid-template-areas:'step1' 'step2' 'step3'}
          .aside{display:none}
          .preview-stage{min-height:260px}
          .hero-grid{grid-template-columns:1fr}
        }
        @media(max-width:600px){
          .ibar{grid-template-columns:repeat(2,1fr)}
          .fmts .fmt-tag{display:none}
          .levels{grid-template-columns:repeat(2,1fr)}
          .sel-row{grid-template-columns:1fr}
          .trim-row{grid-template-columns:1fr}
        }
      `}</style>

      <div className="page">
        <div className="bg">
          <div className="bg-g1"/><div className="bg-g2"/><div className="bg-grid"/><div className="bg-noise"/>
        </div>

        <nav>
          <Link href="/" className="logo"><em>Tool</em>Site</Link>
          <span className="nav-pill">Video Converter</span>
          <Link href="/" className="back">← All Tools</Link>
        </nav>

        <div className="wrap">
          {/* Mobile steps */}
          <div className="mobile-steps">
            {['Upload Video','Set Options','Convert & Export'].map((t,i)=>(
              <div className="mobile-step" key={i}>
                <div className="mobile-step-no">Step {String(i+1).padStart(2,'0')}</div>
                <div className="mobile-step-title">{t}</div>
                <div className="mobile-step-copy">{['Pick your file','Format & quality','Download result'][i]}</div>
              </div>
            ))}
          </div>

          {/* Mobile upload bar */}
          <div className="mobile-upload-bar">
            <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:'12px',marginBottom:'8px'}}>
              <div>
                <div className="mub-k">Video Converter</div>
                <div className="mub-title">{video?'Video ready — set options below':'Upload video to convert'}</div>
              </div>
              <div className="mub-badge">{video?'Ready':'Upload'}</div>
            </div>
            <div className="mub-copy">{vidInfo?`${vidInfo.name} loaded. Neeche format, quality aur export options milenge.`:'MP4, MOV, AVI, MKV — sab formats support hain.'}</div>
            {vidInfo&&(
              <div className="mub-preview">
                <div className="mub-thumb">🎬</div>
                <div className="mub-preview-copy">
                  <div className="mub-preview-title">{vidInfo.name}</div>
                  <div className="mub-preview-sub">{fmtDur(vidInfo.duration)} • {fmtSize(vidInfo.size)} • {vidInfo.width}×{vidInfo.height}</div>
                </div>
              </div>
            )}
            <div className="mub-actions">
              <button className="mub-btn" onClick={()=>fileRef.current?.click()}>{video?'Change Video':'Choose Video'}</button>
              <div className="mub-meta">{vidInfo?`${format.toUpperCase()} • Q${quality}% • ${resolution}`:'MP4, MOV, AVI, MKV, WebM, GIF'}</div>
            </div>
          </div>

          {/* Hero */}
          <div className="hero">
            <div className="hero-main">
              <div className="htag"><span className="hdot"/>Browser Video Studio</div>
              <div className="htitle">Convert <em>Any</em><br/>Video Format</div>
              <p className="hsub">MP4, WebM, MOV, AVI, MKV, GIF — all in your browser. <b>No server uploads, no waiting, no account needed.</b></p>
              <div className="hero-chips">
                <div className="hero-chip">6 Output Formats</div>
                <div className="hero-chip">Quality Control</div>
                <div className="hero-chip">Trim & Speed</div>
                <div className="hero-chip">Audio Options</div>
              </div>
              <div className="hero-grid">
                <div className="hero-stat"><div className="hero-stat-k">Current Format</div><div className="hero-stat-v">{format.toUpperCase()} — {activeFormatObj.desc}</div></div>
                <div className="hero-stat"><div className="hero-stat-k">Quality Setting</div><div className="hero-stat-v">{qualityTone}</div></div>
                <div className="hero-stat"><div className="hero-stat-k">Compression Score</div><div className="hero-stat-v">{activeFormatObj.score}/100 efficiency</div></div>
              </div>
            </div>
            <div className="hero-side">
              <div className="side-title">Format Strategy</div>
              <div className="side-format-box">
                <div className="side-format-name">{format.toUpperCase()}</div>
                <div className="side-format-badge">{activeFormatObj.tag}</div>
                <div className="side-copy">{activeFormatObj.note} — {activeFormatObj.desc}</div>
              </div>
              <div className="side-points">
                <div className="side-point"><div className="side-point-k">Best For</div><div className="side-point-v">{activeFormatObj.fit}</div></div>
                <div className="side-point"><div className="side-point-k">Watch Out</div><div className="side-point-v">{activeFormatObj.caution}</div></div>
                <div className="side-point"><div className="side-point-k">Score</div><div className="side-point-v">{activeFormatObj.score}/100 at Q{quality}%</div></div>
              </div>
            </div>
          </div>

          <div className="board">
            {/* LEFT */}
            <div className="stack step1-panel">
              <div className="panel">
                <div className="panel-head">
                  <div>
                    <div className="panel-kicker">Step 1</div>
                    <div className="panel-title">Upload Video</div>
                    <div className="panel-sub">MP4, MOV, AVI, MKV, WebM accepted.</div>
                  </div>
                  <div className="panel-icon">🎬</div>
                </div>

                {!video ? (
                  <div className={`drop ${isDragging?'drag':''}`}
                    onDragOver={e=>{e.preventDefault();setIsDragging(true)}}
                    onDragLeave={()=>setIsDragging(false)}
                    onDrop={onDrop}
                    onClick={()=>fileRef.current?.click()}>
                    <span className="drop-icon">📹</span>
                    <div className="drop-t">Drop video here</div>
                    <div className="drop-s">No upload to server.<br/><span className="drop-acc">100% private, all local.</span></div>
                    <button className="browse">Choose Video</button>
                  </div>
                ) : (
                  <div className="thumb" onClick={()=>fileRef.current?.click()}>
                    <video ref={videoRef} src={video} style={{maxWidth:'100%',maxHeight:'160px',objectFit:'contain',display:'block'}} muted playsInline/>
                    <div className="thumb-over"><div style={{fontSize:'22px'}}>🔄</div><div className="thumb-lbl">Change</div></div>
                  </div>
                )}
                <input ref={fileRef} type="file" accept="video/*" style={{display:'none'}} onChange={e=>loadVideo(e.target.files[0])}/>

                {vidInfo&&(
                  <>
                    <div className="ibar">
                      <div className="ist"><div className="isn">{fmtDur(vidInfo.duration)}</div><div className="isl">Duration</div></div>
                      <div className="ist"><div className="isn">{fmtSize(vidInfo.size)}</div><div className="isl">Size</div></div>
                      <div className="ist"><div className="isn">{vidInfo.width}</div><div className="isl">Width</div></div>
                      <div className="ist"><div className="isn">{vidInfo.height}</div><div className="isl">Height</div></div>
                    </div>
                    <div className="info-grid">
                      <div className="info-cell"><div className="info-cell-k">File Name</div><div className="info-cell-v">{vidInfo.name}</div></div>
                      <div className="info-cell"><div className="info-cell-k">Source Type</div><div className="info-cell-v">{vidInfo.type.split('/')[1].toUpperCase()}</div></div>
                      <div className="info-cell"><div className="info-cell-k">Uploaded At</div><div className="info-cell-v">{fmtDate(vidInfo.uploadedAt)}</div></div>
                      <div className="info-cell"><div className="info-cell-k">File Modified</div><div className="info-cell-v">{fmtDate(vidInfo.lastModified)}</div></div>
                      <div className="info-cell"><div className="info-cell-k">Resolution</div><div className="info-cell-v">{vidInfo.width}×{vidInfo.height}px</div></div>
                      <div className="info-cell"><div className="info-cell-k">Aspect Ratio</div><div className="info-cell-v">{(vidInfo.width/vidInfo.height).toFixed(2)}:1</div></div>
                    </div>
                  </>
                )}
              </div>

            </div>

            {/* CENTER */}
            <div className="preview-shell step3-panel">
              <div className="preview-top">
                <div>
                  <div className="panel-kicker">Step 3</div>
                  <div className="preview-title">{converted?'Converted!':'Preview'}</div>
                  <div className="preview-sub">{vidInfo?`${vidInfo.width}×${vidInfo.height} · ${fmtDur(vidInfo.duration)} · ${fmtSize(vidInfo.size)}`:'Upload a video to preview'}</div>
                </div>
                {video&&(
                  <div className="vtog">
                    <button className={`vbtn ${viewMode==='original'?'on':''}`} onClick={()=>setViewMode('original')}>Original</button>
                    {converted&&<button className={`vbtn ${viewMode==='converted'?'on':''}`} onClick={()=>setViewMode('converted')}>Converted</button>}
                  </div>
                )}
              </div>

              <div className="preview-stage">
                {!video?(
                  <div className="empty">
                    <div className="eico">🎥</div>
                    <div className="et">No video uploaded</div>
                    <div className="es">Upload from the left panel</div>
                  </div>
                ):(
                  <video className="pvideo" src={video} controls muted={muted} style={{maxHeight:'360px'}} playsInline/>
                )}
              </div>

              {converted&&(
                <div className="dl-section">
                  <div className="dl-title">✅ {converted.name}</div>
                  <div className="dl-meta">
                    Format: <b>{converted.format.toUpperCase()}</b> · Size: <b>{fmtSize(converted.size)}</b> · Quality: <b>{converted.quality}%</b><br/>
                    Resolution: <b>{converted.resolution}</b> · Speed: <b>{converted.speed}</b> · Audio: <b>{converted.audioOpt}</b><br/>
                    Converted: <b>{fmtDate(converted.convertedAt)}</b> · Saved: <b>{converted.savings}%</b>
                  </div>
                  <div className="dl-btns">
                    <button className="dl-main" onClick={()=>download(converted)}>↓ Download {converted.format.toUpperCase()}</button>
                    <button className="dl-ghost" onClick={()=>setConverted(null)}>🔄 Re-convert</button>
                  </div>
                </div>
              )}
            </div>

            {vidInfo&&(
              <div className="panel step2-panel" ref={editorRef}>
                <div className="panel-head">
                  <div>
                    <div className="panel-kicker">Step 2</div>
                    <div className="panel-title">Convert Options</div>
                    <div className="panel-sub">Format, quality, resolution, audio.</div>
                  </div>
                  <div className="panel-icon">⚙️</div>
                </div>

                <div className="tabs">
                  {['settings','advanced'].map(t=>(
                    <button key={t} className={`tab ${activeTab===t?'on':''}`} onClick={()=>setActiveTab(t)}>{t==='settings'?'Format & Quality':'Advanced'}</button>
                  ))}
                </div>

                {activeTab==='settings'&&(
                  <>
                    <div className="section-label">Output Format</div>
                    <div className="fmts">
                      {FORMATS.map(f=>(
                        <div key={f.v} className={`fmt-card ${format===f.v?'on':''}`} onClick={()=>setFormat(f.v)}>
                          <div className="fmt-left">
                            <div className="fmt-badge" style={{color:f.tc}}>{f.label}</div>
                            <div className="fmt-desc"><b>{f.desc}</b>{f.note}</div>
                          </div>
                          <div className="fmt-tag" style={{background:f.tc2,color:f.tc}}>{f.tag}</div>
                        </div>
                      ))}
                    </div>
                    <div className="levels">
                      {QUALITY_PRESETS.map(p=>(
                        <button key={p.label} className={`lbtn ${quality===p.value?'on':''}`} onClick={()=>setQuality(p.value)}>
                          {p.label}<div className="lbtn-note">{p.note}</div>
                        </button>
                      ))}
                    </div>
                    <div className="qrow">
                      <span className="ql">Quality</span>
                      <span className="qv">{quality}%</span>
                    </div>
                    <input type="range" min="10" max="100" step="1" value={quality}
                      onChange={e=>setQuality(+e.target.value)}
                      style={{background:slBg(quality,10,100)}}/>
                    <div className="qhint">{qualityTone}</div>
                  </>
                )}

                {activeTab==='advanced'&&(
                  <>
                    <div className="sel-row">
                      <div>
                        <div className="sel-label">Resolution</div>
                        <div className="sel-group">
                          {RESOLUTIONS.map(r=>(
                            <button key={r} className={`sel-btn ${resolution===r?'on':''}`} onClick={()=>setResolution(r)}>{r}</button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="sel-label">Playback Speed</div>
                        <div className="sel-group">
                          {SPEEDS.map(s=>(
                            <button key={s} className={`sel-btn ${speed===s?'on':''}`} onClick={()=>setSpeed(s)}>{s}</button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="section-label">Audio Track</div>
                    <div className="sel-group" style={{flexDirection:'column',gap:'5px',marginBottom:'12px'}}>
                      {AUDIO_OPTIONS.map(a=>(
                        <button key={a} className={`sel-btn ${audioOpt===a?'on':''}`} style={{textAlign:'left'}} onClick={()=>setAudioOpt(a)}>{a}</button>
                      ))}
                    </div>
                    <div className="trim-row">
                      <div>
                        <div className="trim-label">Trim Start</div>
                        <div className="trim-val">{fmtDur((trimStart/100)*vidInfo.duration)}</div>
                        <input type="range" min="0" max={trimEnd-1} step="1" value={trimStart}
                          onChange={e=>setTrimStart(+e.target.value)}
                          style={{background:slBg(trimStart,0,100)}}/>
                      </div>
                      <div>
                        <div className="trim-label">Trim End</div>
                        <div className="trim-val">{fmtDur((trimEnd/100)*vidInfo.duration)}</div>
                        <input type="range" min={trimStart+1} max="100" step="1" value={trimEnd}
                          onChange={e=>setTrimEnd(+e.target.value)}
                          style={{background:slBg(trimEnd,0,100)}}/>
                      </div>
                    </div>
                  </>
                )}

                {processing&&(
                  <div className="prog-wrap" style={{position:'relative',overflow:'hidden'}}>
                    <div className="scan-line"/>
                    <div className="prog-top">
                      <div className="prog-lbl"><span className="spin">⚙️</span>Converting...</div>
                      <div className="prog-pct">{Math.min(100,Math.round(progress))}%</div>
                    </div>
                    <div className="prog-bar-bg"><div className="prog-bar-fill" style={{width:`${Math.min(100,progress)}%`}}/></div>
                    <div className="prog-eta">Estimated: {Math.max(0,Math.round((100-progress)/12))}s remaining</div>
                  </div>
                )}

                <button className="cvt-btn" onClick={convert} disabled={!vidInfo||processing}>
                  {processing?<><span className="spin">⚙️</span>Converting...</>:`⚡ Convert to ${format.toUpperCase()}`}
                </button>
              </div>
            )}

            {/* RIGHT */}
            <div className="stack aside">
              {converted&&(
                <div className="sav-card" style={{position:'relative',overflow:'hidden'}}>
                  <div className="sav-head">Conversion Result</div>
                  <div className="sav-main">
                    <div className="sav-pct">{converted.savings}</div>
                    <div className="sav-unit">%</div>
                    <div className="sav-lbl">Saved<br/>Overall</div>
                  </div>
                  <div className="sav-bar-bg"><div className="sav-bar-fill" style={{width:`${Math.max(5,converted.savings)}%`}}/></div>
                  <div className="sav-grid">
                    <div className="sav-cell"><div className="sav-cell-k">Original</div><div className="sav-cell-v">{fmtSize(converted.originalSize)}</div></div>
                    <div className="sav-cell"><div className="sav-cell-k">Converted</div><div className="sav-cell-v">{fmtSize(converted.size)}</div></div>
                    <div className="sav-cell"><div className="sav-cell-k">Duration</div><div className="sav-cell-v">{fmtDur(converted.duration)}</div></div>
                    <div className="sav-cell"><div className="sav-cell-k">Format</div><div className="sav-cell-v">{converted.format.toUpperCase()}</div></div>
                  </div>
                </div>
              )}

              {vidInfo&&(
                <div className="info-card">
                  <div className="panel-head">
                    <div>
                      <div className="panel-kicker">File Details</div>
                      <div className="panel-title">Full Info</div>
                    </div>
                    <div className="panel-icon">📋</div>
                  </div>
                  <div className="info-section-title">Source File</div>
                  {[
                    ['Name', vidInfo.name],
                    ['Size', fmtSize(vidInfo.size)],
                    ['Type', vidInfo.type],
                    ['Duration', fmtDur(vidInfo.duration)],
                    ['Width', `${vidInfo.width}px`],
                    ['Height', `${vidInfo.height}px`],
                    ['Resolution', `${vidInfo.width}×${vidInfo.height}`],
                    ['Aspect', `${(vidInfo.width/vidInfo.height).toFixed(2)}:1`],
                    ['Uploaded', fmtDate(vidInfo.uploadedAt)],
                    ['File Modified', fmtDate(vidInfo.lastModified)],
                  ].map(([k,v])=>(
                    <div className="info-row" key={k}>
                      <span className="info-row-k">{k}</span>
                      <span className="info-row-v">{v}</span>
                    </div>
                  ))}
                  {converted&&(
                    <>
                      <div className="info-section-title">Conversion Settings</div>
                      {[
                        ['Output Format', converted.format.toUpperCase()],
                        ['Quality', `${converted.quality}%`],
                        ['Resolution', converted.resolution],
                        ['Speed', converted.speed],
                        ['Audio', converted.audioOpt],
                        ['Converted At', fmtDate(converted.convertedAt)],
                        ['Output Size', fmtSize(converted.size)],
                        ['Space Saved', `${converted.savings}%`],
                      ].map(([k,v])=>(
                        <div className="info-row" key={k}>
                          <span className="info-row-k">{k}</span>
                          <span className="info-row-v">{v}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              )}

              <div className="hist-card panel">
                <div className="panel-head">
                  <div>
                    <div className="panel-kicker">History</div>
                    <div className="panel-title">Past Conversions</div>
                  </div>
                  <div className="panel-icon">🕑</div>
                </div>
                {history.length===0?(
                  <div className="hist-empty">No conversions yet this session</div>
                ):history.map(h=>(
                  <div className="hist-item" key={h.id}>
                    <div className="hist-top">
                      <div className="hist-name">{h.name}</div>
                      <div className="hist-badge">{h.format.toUpperCase()}</div>
                    </div>
                    <div className="hist-meta">
                      <span>{fmtSize(h.originalSize)}</span> → <span>{fmtSize(h.size)}</span> · <span>-{h.savings}%</span><br/>
                      Q{h.quality}% · {h.resolution} · {h.speed}<br/>
                      {fmtDate(h.convertedAt)}
                    </div>
                    <button className="hist-dl" onClick={()=>download(h)}>↓ Download</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
