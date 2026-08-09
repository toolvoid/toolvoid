'use client';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Link from 'next/link';

const MAX_CHARS = 5000;
const CHUNK_LIMIT = 220;

const VOICE_HINTS = [
  'natural',
  'neural',
  'premium',
  'enhanced',
  'google',
  'microsoft',
  'samantha',
  'alex',
  'aria',
  'jenny',
  'guy',
  'serena',
];

const splitIntoChunks = (input) => {
  const normalized = input
    .replace(/\s+/g, ' ')
    .replace(/([,;:])(?=\S)/g, '$1 ')
    .replace(/([.!?])(?=\S)/g, '$1 ')
    .trim();

  if (!normalized) return [];

  const sentences = normalized.match(/[^.!?\n]+[.!?\n]*/g) || [normalized];
  const chunks = [];
  let current = '';

  for (const sentence of sentences) {
    const trimmed = sentence.trim();
    if (!trimmed) continue;

    if (!current) {
      current = trimmed;
      continue;
    }

    if ((current + ' ' + trimmed).length <= CHUNK_LIMIT) {
      current += ` ${trimmed}`;
      continue;
    }

    chunks.push(current);
    current = trimmed;
  }

  if (current) chunks.push(current);
  return chunks;
};

const getPreferredVoice = (voiceList, langFilter = 'all') => {
  const candidates = voiceList.filter((voice) =>
    langFilter === 'all' ? true : voice.lang.toLowerCase().startsWith(langFilter.toLowerCase())
  );

  if (!candidates.length) return null;

  const scored = candidates
    .map((voice) => {
      const name = `${voice.name} ${voice.lang}`.toLowerCase();
      const score = VOICE_HINTS.reduce(
        (total, hint, index) => total + (name.includes(hint) ? VOICE_HINTS.length - index : 0),
        0
      ) + (voice.default ? 4 : 0);

      return { voice, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored[0]?.voice || candidates[0];
};

export default function TextToSpeech() {
  const [text, setText]             = useState('');
  const [voices, setVoices]         = useState([]);
  const [selectedVoice, setSelectedVoice] = useState('');
  const [rate, setRate]             = useState(1);
  const [pitch, setPitch]           = useState(1);
  const [volume, setVolume]         = useState(1);
  const [speaking, setSpeaking]     = useState(false);
  const [paused, setPaused]         = useState(false);
  const [progress, setProgress]     = useState(0);
  const [langFilter, setLangFilter] = useState('all');
  const [downloading, setDownloading] = useState(false);
  const [downloadMsg, setDownloadMsg] = useState('');
  const [activePreset, setActivePreset] = useState('Normal');
  const [currentChunk, setCurrentChunk] = useState(0);
  const [chunkCount, setChunkCount] = useState(0);

  const utterRef = useRef(null);
  const stopRequestedRef = useRef(false);
  const audioUrlRef = useRef('');

  const wordCount = useMemo(() => {
    const words = text.trim().split(/\s+/).filter(Boolean);
    return text.trim() ? words.length : 0;
  }, [text]);

  const estTime = useMemo(() => {
    const words = text.trim().split(/\s+/).filter(Boolean);
    const wpm = 150 * rate;
    return Math.ceil(words.length / wpm);
  }, [text, rate]);

  useEffect(() => {
    const loadVoices = () => {
      const v = window.speechSynthesis?.getVoices() || [];
      setVoices(v);
      if (!v.length) return;

      const currentSelection = v.find((voice) => voice.name === selectedVoice);
      const preferred = currentSelection || getPreferredVoice(v, langFilter) || v[0];
      if (preferred && preferred.name !== selectedVoice) {
        setSelectedVoice(preferred.name);
      }
    };

    loadVoices();
    window.speechSynthesis?.addEventListener('voiceschanged', loadVoices);
    return () => window.speechSynthesis?.removeEventListener('voiceschanged', loadVoices);
  }, [langFilter, selectedVoice]);

  const filteredVoices = useMemo(() => {
    return langFilter === 'all'
      ? voices
      : voices.filter((voice) => voice.lang.startsWith(langFilter));
  }, [langFilter, voices]);

  const selectedVoiceName = useMemo(() => {
    if (!voices.length) return '';
    if (selectedVoice && filteredVoices.some((voice) => voice.name === selectedVoice)) {
      return selectedVoice;
    }
    return getPreferredVoice(voices, langFilter)?.name || voices[0]?.name || '';
  }, [filteredVoices, langFilter, selectedVoice, voices]);

  useEffect(() => () => {
    if (audioUrlRef.current) {
      URL.revokeObjectURL(audioUrlRef.current);
    }
  }, []);

  const stop = useCallback(() => {
    stopRequestedRef.current = true;
    window.speechSynthesis?.cancel();
    setSpeaking(false);
    setPaused(false);
    setProgress(0);
    setCurrentChunk(0);
    setChunkCount(0);
  }, []);

  const playChunk = useCallback(function playChunk(index, chunkList, preferredVoice) {
    if (!window.speechSynthesis || stopRequestedRef.current || index >= chunkList.length) {
      setSpeaking(false);
      setPaused(false);
      setProgress(chunkList.length ? 100 : 0);
      setCurrentChunk(0);
      setChunkCount(0);
      return;
    }

    setCurrentChunk(index + 1);

    const utter = new SpeechSynthesisUtterance(chunkList[index]);
    if (preferredVoice) utter.voice = preferredVoice;
    utter.rate = rate;
    utter.pitch = pitch;
    utter.volume = volume;

    utter.onboundary = (event) => {
      const spokenChars = chunkList
        .slice(0, index)
        .join(' ')
        .length + event.charIndex;

      setProgress(Math.min(100, (spokenChars / Math.max(text.length, 1)) * 100));
    };

    utter.onend = () => {
      if (stopRequestedRef.current) return;
      if (index === chunkList.length - 1) {
        setSpeaking(false);
        setPaused(false);
        setProgress(100);
        setCurrentChunk(chunkList.length);
        setChunkCount(0);
        return;
      }
      playChunk(index + 1, chunkList, preferredVoice);
    };

    utter.onerror = () => {
      setSpeaking(false);
      setPaused(false);
      setDownloadMsg('Speech playback failed in this browser. Try another installed voice.');
    };

    utterRef.current = utter;
    window.speechSynthesis.speak(utter);
  }, [pitch, rate, text.length, volume]);

  const speak = useCallback(() => {
    if (!text.trim() || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const voice = voices.find(v => v.name === selectedVoice);
    const chunkList = splitIntoChunks(text);
    stopRequestedRef.current = false;
    setDownloadMsg('');
    setSpeaking(true);
    setPaused(false);
    setProgress(0);
    setCurrentChunk(chunkList.length ? 1 : 0);
    setChunkCount(chunkList.length);
    playChunk(0, chunkList, voice);
  }, [text, selectedVoice, voices, playChunk]);

  const pauseResume = () => {
    if (!window.speechSynthesis) return;
    if (paused) { window.speechSynthesis.resume(); setPaused(false); }
    else { window.speechSynthesis.pause(); setPaused(true); }
  };

  const langs = [...new Set(voices.map(v => v.lang.split('-')[0]))].sort();

  const slBg = (v, mn, mx) =>
    `linear-gradient(to right,#4D96FF ${((v-mn)/(mx-mn))*100}%,rgba(255,255,255,.09) ${((v-mn)/(mx-mn))*100}%)`;

  const rateLabel = rate <= 0.6 ? 'Very Slow' : rate <= 0.85 ? 'Slow' : rate <= 1.15 ? 'Normal' : rate <= 1.5 ? 'Fast' : 'Very Fast';
  const pitchLabel = pitch <= 0.6 ? 'Very Low' : pitch <= 0.85 ? 'Low' : pitch <= 1.15 ? 'Normal' : pitch <= 1.5 ? 'High' : 'Very High';
  const selectedVoiceMeta = voices.find((voice) => voice.name === selectedVoiceName);
  const qualityLabel = selectedVoiceMeta
    ? VOICE_HINTS.some((hint) => `${selectedVoiceMeta.name} ${selectedVoiceMeta.lang}`.toLowerCase().includes(hint))
      ? 'Enhanced voice'
      : selectedVoiceMeta.default
        ? 'System default'
        : 'Installed voice'
    : 'Voice loading';

  const applyPreset = (preset) => {
    setRate(preset.r);
    setPitch(preset.p);
    if (typeof preset.v === 'number') setVolume(preset.v);
    setActivePreset(preset.l);
  };

  const downloadAudio = async () => {
    if (!text.trim()) {
      setDownloadMsg('Please enter text first.');
      return;
    }

    if (!navigator.mediaDevices?.getDisplayMedia || typeof MediaRecorder === 'undefined') {
      setDownloadMsg('Audio download is supported in Chromium browsers with tab audio sharing.');
      return;
    }

    setDownloading(true);
    setDownloadMsg('Choose "This Tab" and enable "Share tab audio" to record the speech.');

    let stream;
    let recorder;

    try {
      stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
        preferCurrentTab: true,
      });

      const audioTracks = stream.getAudioTracks();
      if (!audioTracks.length) {
        setDownloadMsg('Tab audio was not shared, so no audio file could be recorded.');
        setDownloading(false);
        stream.getTracks().forEach((track) => track.stop());
        return;
      }

      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : 'audio/webm';

      const chunks = [];
      recorder = new MediaRecorder(stream, { mimeType });
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunks.push(event.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: mimeType });
        if (audioUrlRef.current) URL.revokeObjectURL(audioUrlRef.current);
        audioUrlRef.current = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = audioUrlRef.current;
        link.download = `TooL Void-tts-${Date.now()}.webm`;
        link.click();
        setDownloadMsg('Audio downloaded. If the file is silent, re-run and make sure tab audio sharing is enabled.');
        setDownloading(false);
        stream?.getTracks().forEach((track) => track.stop());
      };

      recorder.start();
      stopRequestedRef.current = false;
      speak();

      const waitUntilFinished = () => {
        if (!window.speechSynthesis.speaking && !window.speechSynthesis.pending) {
          recorder.stop();
          return;
        }
        window.setTimeout(waitUntilFinished, 300);
      };

      waitUntilFinished();
    } catch (error) {
      setDownloadMsg('Recording was cancelled or blocked by the browser.');
      stream?.getTracks().forEach((track) => track.stop());
      setDownloading(false);
      recorder?.state === 'recording' && recorder.stop();
    }
  };

  return (
    <>
      <style precedence="default" href="toolsite-tts-styles">{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html,body{background:#050a14;color:#dde8f5;font-family:'Outfit',sans-serif;min-height:100vh;overflow-x:hidden}
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:.2}}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        @keyframes wave1{0%,100%{transform:translateY(0) scaleY(1)}50%{transform:translateY(-12px) scaleY(1.15)}}
        @keyframes wave2{0%,100%{transform:translateY(0) scaleY(1)}50%{transform:translateY(8px) scaleY(.88)}}
        @keyframes wave3{0%,100%{transform:translateY(0) scaleY(1)}25%{transform:translateY(-8px) scaleY(1.1)}75%{transform:translateY(8px) scaleY(.9)}}
        @keyframes pulse{0%,100%{opacity:.35;transform:scale(1)}50%{opacity:.65;transform:scale(1.04)}}
        @keyframes barAnim{0%,100%{height:4px}50%{height:22px}}
        .page{min-height:100vh;background:#050a14;position:relative;overflow:hidden}
        .bg{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden}
        .bg-a{position:absolute;top:-15%;left:-5%;width:55%;height:55%;background:radial-gradient(ellipse,rgba(77,150,255,.15),transparent 65%);border-radius:50%;animation:pulse 10s ease-in-out infinite}
        .bg-b{position:absolute;bottom:-18%;right:-8%;width:50%;height:50%;background:radial-gradient(ellipse,rgba(99,179,255,.1),transparent 65%);border-radius:50%;animation:pulse 14s ease-in-out infinite 3s}
        .bg-c{position:absolute;top:45%;left:45%;width:40%;height:40%;background:radial-gradient(ellipse,rgba(56,189,248,.07),transparent 62%);border-radius:50%;animation:pulse 12s ease-in-out infinite 6s}
        .bg-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(77,150,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(77,150,255,.035) 1px,transparent 1px);background-size:46px 46px}
        .noise{position:absolute;inset:0;opacity:.018;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
        nav{position:sticky;top:0;z-index:100;display:flex;align-items:center;justify-content:space-between;gap:14px;padding:16px 28px;background:rgba(5,10,20,.88);backdrop-filter:blur(22px);border-bottom:1px solid rgba(77,150,255,.1)}
        .logo{font-family:'Outfit',sans-serif;font-size:20px;font-weight:900;text-decoration:none;color:#dde8f5;letter-spacing:-.02em}
        .logo em{color:#4D96FF;font-style:normal}
        .npill{background:rgba(77,150,255,.08);border:1px solid rgba(77,150,255,.22);color:#79b7ff;padding:5px 16px;border-radius:999px;font-size:11px;font-family:'JetBrains Mono',monospace;letter-spacing:.1em;text-transform:uppercase;font-weight:700}
        .bk{color:#8090a8;text-decoration:none;font-size:12px;font-family:'JetBrains Mono',monospace;letter-spacing:.08em;text-transform:uppercase;transition:color .2s}
        .bk:hover{color:#dde8f5}
        .wrap{position:relative;z-index:1;max-width:900px;margin:0 auto;padding:32px 20px 64px}
        .header{text-align:center;margin-bottom:28px;animation:fadeUp .5s both}
        .htag{display:inline-flex;align-items:center;gap:8px;background:rgba(77,150,255,.07);border:1px solid rgba(77,150,255,.18);border-radius:999px;padding:5px 16px;font-family:'JetBrains Mono',monospace;font-size:10px;color:#79b7ff;letter-spacing:.14em;text-transform:uppercase;margin-bottom:14px}
        .hdot{width:5px;height:5px;background:#4D96FF;border-radius:50%;animation:blink 2s infinite}
        .htitle{font-size:clamp(36px,7vw,72px);font-weight:900;line-height:.92;letter-spacing:-.04em;margin-bottom:10px;color:#fff}
        .htitle em{color:#4D96FF;font-style:normal}
        .hsub{font-size:14px;color:#6080a0;max-width:440px;margin:0 auto;line-height:1.8}
        .hsub b{color:#90b8d8}
        .grid{display:grid;grid-template-columns:1fr 320px;gap:14px;align-items:start}
        .card{background:rgba(255,255,255,.03);border:1px solid rgba(77,150,255,.1);border-radius:20px;padding:22px;position:relative;overflow:hidden;animation:fadeUp .45s both}
        .card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(77,150,255,.22),transparent)}
        .lbl{font-size:10px;font-family:'JetBrains Mono',monospace;letter-spacing:.14em;text-transform:uppercase;color:#6080a0;font-weight:700;display:block;margin-bottom:8px}
        .ta{width:100%;background:rgba(255,255,255,.04);border:1.5px solid rgba(77,150,255,.12);border-radius:12px;padding:14px;color:#dde8f5;font-family:'Outfit',sans-serif;font-size:15px;outline:none;transition:all .22s;resize:vertical;line-height:1.7;min-height:200px}
        .ta:focus{border-color:rgba(77,150,255,.42);background:rgba(77,150,255,.04);box-shadow:0 0 0 3px rgba(77,150,255,.08)}
        .ta::placeholder{color:#3a4a60}
        .char-row{display:flex;justify-content:space-between;align-items:center;margin-top:8px;font-family:'JetBrains Mono',monospace;font-size:11px;color:#6080a0}
        .stats-row{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:14px 0}
        .stat{background:rgba(77,150,255,.05);border:1px solid rgba(77,150,255,.1);border-radius:12px;padding:10px;text-align:center}
        .stat-v{font-size:18px;font-weight:800;color:#4D96FF;font-family:'JetBrains Mono',monospace;line-height:1}
        .stat-l{font-size:9px;color:#6080a0;font-family:'JetBrains Mono',monospace;letter-spacing:.1em;text-transform:uppercase;margin-top:4px}
        .prog-wrap{margin:14px 0}
        .prog-track{height:4px;background:rgba(255,255,255,.07);border-radius:999px;overflow:hidden}
        .prog-fill{height:100%;border-radius:999px;background:linear-gradient(90deg,#4D96FF,#79b7ff);transition:width .3s ease}
        .wave-bars{display:flex;align-items:center;gap:3px;height:28px;margin:10px 0;justify-content:center}
        .wbar{width:4px;background:#4D96FF;border-radius:2px;opacity:.6}
        .wbar.a{animation:barAnim .6s ease-in-out infinite}
        .wbar.b{animation:barAnim .6s ease-in-out infinite .1s}
        .wbar.c{animation:barAnim .6s ease-in-out infinite .2s}
        .wbar.d{animation:barAnim .6s ease-in-out infinite .3s}
        .wbar.e{animation:barAnim .6s ease-in-out infinite .4s}
        .controls{display:flex;gap:8px;margin-top:14px;flex-wrap:wrap}
        .btn-play{flex:1;border:none;border-radius:12px;padding:12px 16px;background:linear-gradient(135deg,#79b7ff,#4D96FF);color:#fff;font-size:13px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;font-family:'Outfit',sans-serif;transition:all .22s;position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center;gap:7px;min-width:140px}
        .btn-play::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent);background-size:200%;animation:shimmer 2.2s linear infinite}
        .btn-play:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 10px 28px rgba(77,150,255,.3)}
        .btn-play:disabled{opacity:.35;cursor:not-allowed;transform:none;box-shadow:none}
        .btn-sec{border:1px solid rgba(77,150,255,.22);border-radius:12px;padding:12px 16px;background:rgba(77,150,255,.07);color:#79b7ff;font-size:12px;font-weight:700;cursor:pointer;font-family:'Outfit',sans-serif;transition:all .2s;letter-spacing:.04em}
        .btn-sec:hover{background:rgba(77,150,255,.14);border-color:rgba(77,150,255,.38)}
        .btn-sec:disabled{opacity:.35;cursor:not-allowed}
        .sel,.inp{background:rgba(255,255,255,.04);border:1.5px solid rgba(77,150,255,.12);border-radius:10px;padding:9px 12px;color:#dde8f5;font-family:'Outfit',sans-serif;font-size:14px;outline:none;transition:all .22s;width:100%;margin-bottom:12px}
        .sel:focus,.inp:focus{border-color:rgba(77,150,255,.42);box-shadow:0 0 0 3px rgba(77,150,255,.08)}
        .sel{cursor:pointer}
        .sl-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px}
        .sl-lbl{font-size:12px;color:#a0b8d0;font-weight:600}
        .sl-val{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700;color:#4D96FF;background:rgba(77,150,255,.1);padding:2px 8px;border-radius:6px}
        input[type=range]{-webkit-appearance:none;appearance:none;width:100%;height:4px;border-radius:999px;outline:none;border:none;cursor:pointer;margin-bottom:14px}
        input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:15px;height:15px;border-radius:50%;background:#4D96FF;cursor:pointer;box-shadow:0 0 8px rgba(77,150,255,.5);transition:transform .15s}
        input[type=range]::-webkit-slider-thumb:hover{transform:scale(1.3)}
        .download-info{background:rgba(77,150,255,.06);border:1px solid rgba(77,150,255,.14);border-radius:10px;padding:10px 13px;font-size:12px;color:#8090a8;margin-top:10px;line-height:1.55}
        .presets{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:12px}
        .preset-btn{border:1px solid rgba(77,150,255,.14);border-radius:8px;padding:5px 11px;font-size:11px;cursor:pointer;background:rgba(255,255,255,.02);color:#8090a8;font-family:'JetBrains Mono',monospace;font-weight:700;letter-spacing:.04em;transition:all .2s}
        .preset-btn:hover{color:#79b7ff;border-color:rgba(77,150,255,.28);background:rgba(77,150,255,.06)}
        .preset-btn.active{color:#dff0ff;border-color:rgba(121,183,255,.5);background:rgba(77,150,255,.16)}
        .voice-meta{display:flex;flex-wrap:wrap;gap:8px;margin-top:-2px;margin-bottom:12px}
        .voice-chip{border-radius:999px;padding:5px 10px;font-size:10px;font-family:'JetBrains Mono',monospace;letter-spacing:.08em;text-transform:uppercase;background:rgba(255,255,255,.04);border:1px solid rgba(77,150,255,.12);color:#9cb8d4}
        .chunk-note{font-size:11px;color:#6c89a6;margin-top:8px;font-family:'JetBrains Mono',monospace}
        @media(max-width:760px){
          .grid{grid-template-columns:1fr}
          nav{padding:14px 16px}
          .wrap{padding:20px 14px 50px}
        }
      `}</style>

      <div className="page">
        <div className="bg">
          <div className="bg-a"/><div className="bg-b"/><div className="bg-c"/>
          <div className="bg-grid"/><div className="noise"/>
        </div>
        <nav>
          <Link href="/" className="logo"><em>Tool</em>Site</Link>
          <span className="npill">🔊 Text to Speech</span>
          <Link href="/" className="bk">← All Tools</Link>
        </nav>
        <div className="wrap">
          <div className="header">
            <div className="htag"><span className="hdot"/>Browser · Instant · Free</div>
            <div className="htitle">Text to <em>Voice</em></div>
            <p className="hsub">Convert any text to natural speech instantly. <b>Works offline</b>, no server, 100% private.</p>
          </div>

          <div className="grid">
            {/* Left - Main */}
            <div>
              <div className="card">
                <label className="lbl">Enter Your Text <span style={{color:'#4D96FF'}}>*</span></label>
                <textarea className="ta" value={text} onChange={e => setText(e.target.value.slice(0, MAX_CHARS))}
                  placeholder="Paste or type any text here... Articles, scripts, emails, notes, anything."/>
                <div className="char-row">
                  <span>{wordCount} words</span>
                  <span style={{color: text.length > MAX_CHARS * 0.9 ? '#ef4444' : ''}}>{text.length} / {MAX_CHARS}</span>
                </div>

                <div className="stats-row">
                  <div className="stat"><div className="stat-v">{wordCount}</div><div className="stat-l">Words</div></div>
                  <div className="stat"><div className="stat-v">{text.trim().split(/[.!?]+/).filter(s=>s.trim()).length}</div><div className="stat-l">Sentences</div></div>
                  <div className="stat"><div className="stat-v">{estTime > 0 ? `${estTime}m` : '—'}</div><div className="stat-l">Est. Time</div></div>
                </div>

                {/* Quick presets */}
                <label className="lbl">Quick Presets</label>
                <div className="presets">
                  {[
                    { l: 'Slow & Clear', r: 0.78, p: 0.95, v: 1 },
                    { l: 'Normal', r: 1.0, p: 1.0, v: 1 },
                    { l: 'Fast Narration', r: 1.28, p: 0.96, v: 1 },
                    { l: 'Podcast Voice', r: 0.92, p: 0.88, v: 1 },
                    { l: 'High Energy', r: 1.18, p: 1.14, v: 1 },
                  ].map(p => (
                    <button key={p.l} className={`preset-btn ${activePreset === p.l ? 'active' : ''}`} onClick={() => applyPreset(p)}>
                      {p.l}
                    </button>
                  ))}
                </div>

                {/* Progress */}
                {(speaking || progress > 0) && (
                  <div className="prog-wrap">
                    <div className="prog-track">
                      <div className="prog-fill" style={{width:`${progress}%`}}/>
                    </div>
                    {speaking && chunkCount > 1 && (
                      <div className="chunk-note">Playing section {currentChunk} / {chunkCount} for smoother speech</div>
                    )}
                    {speaking && (
                      <div className="wave-bars">
                        {['a','b','c','d','e'].map(cls => (
                          <div key={cls} className={`wbar ${speaking && !paused ? cls : ''}`}
                            style={{height: speaking && !paused ? undefined : '4px'}}/>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div className="controls">
                  {!speaking ? (
                    <button className="btn-play" onClick={speak} disabled={!text.trim()}>
                      ▶ Speak Now
                    </button>
                  ) : (
                    <>
                      <button className="btn-play" onClick={pauseResume}>
                        {paused ? '▶ Resume' : '⏸ Pause'}
                      </button>
                      <button className="btn-sec" onClick={stop}>⏹ Stop</button>
                    </>
                  )}
                  <button className="btn-sec" onClick={downloadAudio} disabled={!text.trim() || downloading}>
                    ⬇ Save
                  </button>
                </div>

                {downloadMsg && (
                  <div className="download-info">{downloadMsg}</div>
                )}
              </div>
            </div>

            {/* Right - Controls */}
            <div>
              <div className="card" style={{marginBottom:'12px'}}>
                <label className="lbl">Voice & Language</label>
                <select className="sel" value={langFilter} onChange={e => setLangFilter(e.target.value)}>
                  <option value="all">All Languages</option>
                  {langs.map(l => <option key={l} value={l}>{l.toUpperCase()}</option>)}
                </select>
                <label className="lbl" style={{marginBottom:'6px'}}>Select Voice</label>
                <select className="sel" value={selectedVoiceName} onChange={e => setSelectedVoice(e.target.value)}>
                  {filteredVoices.length === 0
                    ? <option value="">Loading voices...</option>
                    : filteredVoices.map(v => (
                      <option key={v.name} value={v.name}>{v.name} ({v.lang})</option>
                    ))}
                </select>
                <div className="voice-meta">
                  <span className="voice-chip">{qualityLabel}</span>
                  {selectedVoiceMeta?.lang && <span className="voice-chip">{selectedVoiceMeta.lang}</span>}
                  {selectedVoiceMeta?.default && <span className="voice-chip">Default</span>}
                </div>
              </div>

              <div className="card">
                <label className="lbl">Speed</label>
                <div className="sl-row">
                  <span className="sl-lbl">Rate</span>
                  <span className="sl-val">{rateLabel} ({rate}x)</span>
                </div>
                <input type="range" min="0.4" max="2" step="0.05" value={rate}
                  onChange={e => setRate(+e.target.value)}
                  style={{background: slBg(rate, 0.4, 2)}}/>

                <div className="sl-row">
                  <span className="sl-lbl">Pitch</span>
                  <span className="sl-val">{pitchLabel} ({pitch})</span>
                </div>
                <input type="range" min="0.4" max="2" step="0.05" value={pitch}
                  onChange={e => setPitch(+e.target.value)}
                  style={{background: slBg(pitch, 0.4, 2)}}/>

                <div className="sl-row">
                  <span className="sl-lbl">Volume</span>
                  <span className="sl-val">{Math.round(volume * 100)}%</span>
                </div>
                <input type="range" min="0" max="1" step="0.05" value={volume}
                  onChange={e => setVolume(+e.target.value)}
                  style={{background: slBg(volume, 0, 1)}}/>

                <div className="download-info">
                  <strong style={{color:'#79b7ff'}}>Download tip:</strong><br/>
                  Save now records the current tab in supported Chromium browsers. When prompted, pick <strong>This Tab</strong> and turn on <strong>Share tab audio</strong> for a downloadable `.webm` voice file.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
