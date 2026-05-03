'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import GoogleAuthButton from '../../components/GoogleAuthButton';

/* ─── Static Data ────────────────────────────────────────────────────── */
const GENRES = [
  { id:'drama',     label:'Drama',     emoji:'🎭' },
  { id:'action',    label:'Action',    emoji:'🔥' },
  { id:'romance',   label:'Romance',   emoji:'💕' },
  { id:'horror',    label:'Horror',    emoji:'😱' },
  { id:'mystery',   label:'Mystery',   emoji:'🔍' },
  { id:'comedy',    label:'Comedy',    emoji:'😂' },
  { id:'scifi',     label:'Sci-Fi',    emoji:'🚀' },
  { id:'fantasy',   label:'Fantasy',   emoji:'🧙' },
  { id:'thriller',  label:'Thriller',  emoji:'⚡' },
  { id:'crime',     label:'Crime',     emoji:'🕵️' },
  { id:'adventure', label:'Adventure', emoji:'🌊' },
  { id:'historical',label:'Historical',emoji:'📖' },
];

const MOODS = ['Dark & Gritty','Uplifting','Suspenseful','Emotional','Adventurous','Lighthearted','Mysterious','Romantic','Intense'];

const TONES = [
  { id:'cinematic', label:'🎬 Cinematic' },
  { id:'literary',  label:'📚 Literary' },
  { id:'casual',    label:'💬 Casual' },
  { id:'poetic',    label:'🎙️ Poetic' },
  { id:'thriller',  label:'🎯 Thriller Style' },
];

const RANDOM_NAMES = {
  fantasy:   ['Elara','Kael','Zorn','Lyra','Dax','Seraph','Vael','Miryn'],
  thriller:  ['Marcus','Chen','Viktor','Reyes','Harlan','Sable','Croft'],
  romance:   ['Aiden','Sofia','Priya','Ethan','Nadia','Luca','Isla'],
  horror:    ['Abel','Mara','Silas','Vera','Cain','Nora','Ren'],
  scifi:     ['Zyx','Nova','Apex','Lycan','Echo','Vex','Rho','Unit-7'],
  action:    ['Rook','Dante','Kira','Blaze','Stone','Cruz','Nix'],
  mystery:   ['Evelyn','Cross','Wren','Doyle','Slate','Fenn'],
  default:   ['Alex','Jordan','Sam','Quinn','Taylor','Morgan','Riley'],
};

const CHAR_ROLES = ['Hero','Villain','Anti-hero','Sidekick','Love Interest','Mentor','Detective','Survivor'];

const TRAITS = ['Brave','Cunning','Loyal','Mysterious','Funny','Reckless','Kind','Cold','Determined','Broken','Genius','Naive'];

const TIME_PERIODS = ['Ancient','Medieval','Victorian','1900s','Modern','Near Future','Far Future','Alternate Reality'];

const PLACES = [
  { id:'city',       label:'City',          emoji:'🌆' },
  { id:'village',    label:'Village',       emoji:'🏘️' },
  { id:'space',      label:'Space',         emoji:'🌌' },
  { id:'forest',     label:'Forest',        emoji:'🌲' },
  { id:'ocean',      label:'Ocean',         emoji:'🌊' },
  { id:'mountains',  label:'Mountains',     emoji:'🏔️' },
  { id:'abandoned',  label:'Abandoned',     emoji:'🏚️' },
  { id:'castle',     label:'Castle',        emoji:'🏰' },
  { id:'dystopia',   label:'Dystopia',      emoji:'🏙️' },
  { id:'spaceship',  label:'Space Ship',    emoji:'🚀' },
  { id:'apocalypse', label:'Post-Apoc',     emoji:'🌋' },
  { id:'fantasy',    label:'Fantasy World', emoji:'🔮' },
];

const WORLD_TYPES = ['Realistic','Magical','Futuristic','Dystopian','Mythological','Parallel Universe'];

const CONFLICTS = [
  { id:'person',   label:'⚔️ Man vs Man' },
  { id:'nature',   label:'🌊 Man vs Nature' },
  { id:'society',  label:'🏛️ Man vs Society' },
  { id:'self',     label:'💭 Man vs Self' },
  { id:'unknown',  label:'👾 Man vs Unknown' },
  { id:'love',     label:'❤️ Man vs Love' },
];

const PLOT_TWISTS = ['Betrayal','Hidden Identity','Time Travel','Revenge','Sacrifice','Escape','Reunion','Death of Hero','Love Triangle','Big Reveal','Secret Past','Wrong Identity'];

const TITLE_ADJ = ['Broken','Dark','Last','Hidden','Silent','Lost','Eternal','Forgotten','Shattered','Cursed','Hollow','Cold','Burning','Crimson','Fading','Empty'];
const TITLE_NOUNS = {
  action:    ['Storm','Thunder','Shadow','Fire','Blade','Edge','War','Fury'],
  romance:   ['Heart','Promise','Kiss','Fate','Love','Soul','Dream','Vow'],
  thriller:  ['Code','Signal','Ghost','Mark','Wire','Trace','Hour','Game'],
  horror:    ['Dark','Hollow','Grave','Night','Curse','Blood','Void','Scream'],
  scifi:     ['Signal','Protocol','Zero','Nexus','Grid','Core','Void','Flux'],
  fantasy:   ['Crown','Realm','Rune','Blade','Prophecy','Dawn','Kingdom','Spell'],
  mystery:   ['Case','Shadow','Door','Room','Truth','Hour','Letter','Key'],
  default:   ['Story','Journey','Night','Dawn','Road','Voice','Way','Fall'],
};

const LOADING_MSGS = [
  '📖 Building your story...',
  '✍️ Developing characters...',
  '🎬 Setting the scene...',
  '⚡ Adding the plot twist...',
  '🎯 Finishing your story...',
];


/* ─── CSS ────────────────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Sora:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

.sg-root,.sg-root *,.sg-root *::before,.sg-root *::after{box-sizing:border-box;margin:0;padding:0}
.sg-root{
  --purple:#A78BFA;--purple-dim:rgba(167,139,250,0.1);--purple-border:rgba(167,139,250,0.2);
  --amber:#F59E0B;--amber-dim:rgba(245,158,11,0.1);--amber-border:rgba(245,158,11,0.2);
  --pink:#EC4899;--pink-dim:rgba(236,72,153,0.1);
  --green:#22c55e;--green-dim:rgba(34,197,94,0.1);--green-border:rgba(34,197,94,0.2);
  --red:#ef4444;--red-dim:rgba(239,68,68,0.1);
  --card:#0C0C1A;--card2:#101025;
  --border:rgba(255,255,255,0.06);--border2:rgba(255,255,255,0.1);
  --text:#F0F0FA;--muted:rgba(255,255,255,0.5);--dim:rgba(255,255,255,0.25);
  min-height:100vh;background:#07070F;color:#F0F0FA;font-family:'Sora',sans-serif;overflow-x:hidden;
}
.sg-root.light{
  --purple:#8b5cf6;--purple-dim:rgba(139,92,246,0.1);--purple-border:rgba(139,92,246,0.18);
  --amber:#d97706;--amber-dim:rgba(217,119,6,0.08);--amber-border:rgba(217,119,6,0.18);
  --pink:#db2777;--pink-dim:rgba(219,39,119,0.08);
  --green:#059669;--green-dim:rgba(5,150,105,0.08);--green-border:rgba(5,150,105,0.18);
  --red:#dc2626;--red-dim:rgba(220,38,38,0.08);
  --card:#ffffff;--card2:#f5f4fb;
  --border:rgba(15,23,42,0.08);--border2:rgba(15,23,42,0.14);
  --text:#111827;--muted:rgba(17,24,39,0.62);--dim:rgba(17,24,39,0.38);
  background:#f8f7fc;color:#111827;
}
.sg-root ::selection{background:rgba(167,139,250,0.25);color:#A78BFA}
.sg-root ::-webkit-scrollbar{width:5px}
.sg-root ::-webkit-scrollbar-track{background:transparent}
.sg-root ::-webkit-scrollbar-thumb{background:rgba(167,139,250,.2);border-radius:99px}

/* NAV */
.sg-nav{position:sticky;top:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:0 2rem;height:62px;background:rgba(7,7,15,0.82);backdrop-filter:blur(24px) saturate(1.4);border-bottom:1px solid var(--border)}
.sg-root.light .sg-nav{background:rgba(248,247,252,0.84)}
.sg-logo{display:flex;align-items:center;gap:.5rem;font-weight:800;font-size:1.1rem;letter-spacing:-.04em}
.sg-logo-mark{background:linear-gradient(135deg,var(--purple),var(--pink));color:#fff;padding:.1em .4em;border-radius:6px;font-size:.82em}
.sg-logo-link{display:flex;align-items:center;gap:.55rem;color:inherit;text-decoration:none}
.sg-logo-sub{color:var(--muted);font-size:.88rem;font-weight:600}
.sg-nav-right{display:flex;align-items:center;gap:1rem}
.sg-nav-links{display:flex;gap:1.5rem;list-style:none}
.sg-nav-links a{font-size:.875rem;color:var(--muted);font-weight:500;transition:color .18s}
.sg-nav-links a:hover{color:var(--text)}
.sg-nav-cta{padding:.45rem 1.1rem;background:linear-gradient(135deg,var(--purple),var(--pink));color:#fff;border-radius:99px;font-size:.85rem;font-weight:600;transition:all .18s;white-space:nowrap;text-decoration:none}
.sg-nav-cta:hover{opacity:.88;transform:translateY(-1px)}
.sg-remaining{font-family:'JetBrains Mono',monospace;font-size:.72rem;padding:.3rem .75rem;border-radius:99px;border:1px solid}

/* HERO */
.sg-hero{text-align:center;padding:6rem 1.5rem 3.5rem;position:relative;overflow:hidden;min-height:58vh;display:flex;align-items:center;justify-content:center}
.sg-hero-bg{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 70% 50% at 50% 0%,rgba(167,139,250,.1) 0%,transparent 70%)}
.sg-hero-stars{position:absolute;inset:0;pointer-events:none;background-image:linear-gradient(var(--border) 1px,transparent 1px),linear-gradient(90deg,var(--border) 1px,transparent 1px);background-size:58px 58px;mask-image:radial-gradient(ellipse 82% 82% at 50% 50%,black 24%,transparent 100%);opacity:.55}
.sg-hero-glow{position:absolute;top:42%;left:50%;transform:translate(-50%,-50%);width:700px;height:520px;background:radial-gradient(circle,rgba(167,139,250,.13) 0%,transparent 68%);pointer-events:none}
.sg-hero-content{position:relative;z-index:1;max-width:820px}
.sg-badge{display:inline-flex;align-items:center;gap:.5rem;padding:.35rem .9rem;background:var(--purple-dim);border:1px solid var(--purple-border);border-radius:99px;font-family:'JetBrains Mono',monospace;font-size:.74rem;font-weight:500;color:var(--purple);letter-spacing:.05em;margin-bottom:2rem}
.sg-badge::before{content:'';width:6px;height:6px;border-radius:50%;background:currentColor}
.sg-hero h1{position:relative;font-size:clamp(2.4rem,6.3vw,4.7rem);font-weight:800;letter-spacing:-.05em;line-height:1.03;margin-bottom:1rem}
.sg-hero h1 em{font-style:italic;font-family:'Instrument Serif',serif;background:linear-gradient(135deg,var(--purple),var(--pink));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.sg-hero p{position:relative;color:var(--muted);font-size:1rem;max-width:560px;margin:0 auto;line-height:1.72}
.sg-hero-actions{display:flex;align-items:center;justify-content:center;gap:1rem;flex-wrap:wrap;margin-top:2rem}
.sg-hero-stats{display:flex;justify-content:center;gap:2.75rem;flex-wrap:wrap;margin-top:3rem}
.sg-stat{text-align:center}
.sg-stat-num{font-size:1.7rem;font-weight:800;letter-spacing:-.04em;background:linear-gradient(135deg,var(--purple),var(--pink));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.sg-stat-label{font-size:.8rem;color:var(--muted)}

/* MAIN */
.sg-main{max-width:900px;margin:0 auto;padding:1.5rem}

/* STEP INDICATOR */
.sg-steps{display:flex;align-items:center;gap:.25rem;margin-bottom:2rem;overflow-x:auto;scrollbar-width:none}
.sg-steps::-webkit-scrollbar{display:none}
.sg-step-btn{display:flex;align-items:center;gap:.35rem;padding:.4rem .85rem;border-radius:99px;font-size:.78rem;font-weight:600;cursor:pointer;transition:all .18s;border:1px solid transparent;color:var(--dim);background:transparent;white-space:nowrap;font-family:'Sora',sans-serif}
.sg-step-btn.done{color:var(--purple);border-color:var(--purple-border)}
.sg-step-btn.active{background:var(--purple-dim);border-color:var(--purple-border);color:var(--purple)}
.sg-step-dot{width:6px;height:6px;border-radius:50%;background:currentColor;flex-shrink:0}
.sg-step-sep{width:20px;height:1px;background:var(--border);flex-shrink:0}

/* CARD */
.sg-card{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:1.5rem;margin-bottom:1rem}
.sg-card-title{font-weight:700;font-size:.88rem;color:var(--purple);margin-bottom:1.1rem;display:flex;align-items:center;gap:.4rem;letter-spacing:.01em}

/* GENRE GRID */
.sg-genre-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:.5rem}
.sg-genre-btn{display:flex;flex-direction:column;align-items:center;gap:.3rem;padding:.75rem .5rem;border:1px solid var(--border);border-radius:10px;background:var(--card2);color:var(--muted);font-size:.75rem;font-weight:600;cursor:pointer;transition:all .18s;font-family:'Sora',sans-serif}
.sg-genre-btn .emoji{font-size:1.4rem}
.sg-genre-btn:hover{border-color:var(--border2);color:var(--text)}
.sg-genre-btn.active{border-color:var(--purple-border);background:var(--purple-dim);color:var(--purple)}

/* PILL GRID */
.sg-pill-grid{display:flex;flex-wrap:wrap;gap:.4rem}
.sg-pill{padding:.35rem .8rem;border-radius:99px;border:1px solid var(--border);color:var(--muted);font-size:.78rem;font-weight:500;cursor:pointer;transition:all .18s;font-family:'Sora',sans-serif;background:transparent}
.sg-pill:hover{border-color:var(--border2);color:var(--text)}
.sg-pill.active{border-color:var(--purple-border);background:var(--purple-dim);color:var(--purple)}
.sg-pill.amber.active{border-color:var(--amber-border);background:var(--amber-dim);color:var(--amber)}
.sg-pill.pink.active{border-color:rgba(236,72,153,.2);background:var(--pink-dim);color:var(--pink)}

/* INPUTS */
.sg-input{background:rgba(255,255,255,.04);border:1px solid var(--border2);border-radius:10px;padding:.75rem 1rem;color:var(--text);font-family:'Sora',sans-serif;font-size:.9rem;outline:none;transition:border-color .2s;width:100%}
.sg-input:focus{border-color:var(--purple)}
.sg-input::placeholder{color:var(--dim)}
.sg-textarea{resize:vertical;min-height:90px}
.sg-select{background:rgba(255,255,255,.04);border:1px solid var(--border2);border-radius:10px;padding:.7rem 1rem;color:var(--text);font-family:'Sora',sans-serif;font-size:.9rem;outline:none;width:100%;cursor:pointer;appearance:none;transition:border-color .2s}
.sg-select:focus{border-color:var(--purple)}
.sg-select option{background:#0C0C1A}

/* BUTTONS */
.sg-btn-primary{background:linear-gradient(135deg,var(--purple),var(--pink));color:#fff;border:none;border-radius:10px;padding:.85rem 2rem;font-weight:700;font-size:.95rem;cursor:pointer;transition:all .2s;font-family:'Sora',sans-serif;display:inline-flex;align-items:center;gap:.5rem}
.sg-btn-primary:hover{opacity:.88;transform:translateY(-2px);box-shadow:0 6px 25px rgba(167,139,250,.3)}
.sg-btn-primary:disabled{opacity:.4;cursor:not-allowed;transform:none;box-shadow:none}
.sg-btn-ghost{background:transparent;border:1px solid var(--border2);color:var(--muted);border-radius:10px;padding:.7rem 1.25rem;font-weight:500;font-size:.88rem;cursor:pointer;transition:all .18s;font-family:'Sora',sans-serif}
.sg-btn-ghost:hover{border-color:var(--purple-border);color:var(--purple)}
.sg-btn-sm{padding:.3rem .75rem;font-size:.75rem;border-radius:7px}

/* PROMPT PREVIEW */
.sg-preview-box{background:rgba(167,139,250,.04);border:1px solid var(--purple-border);border-radius:10px;padding:1rem;font-family:'JetBrains Mono',monospace;font-size:.78rem;color:var(--muted);line-height:1.7;white-space:pre-wrap;max-height:160px;overflow-y:auto;cursor:text;transition:border-color .2s}
.sg-preview-box:focus{outline:none;border-color:var(--purple)}

/* QUALITY INDICATOR */
.sg-quality{display:flex;align-items:center;gap:.6rem;font-size:.78rem;color:var(--muted);padding:.6rem .9rem;border-radius:8px;background:rgba(255,255,255,.03);border:1px solid var(--border)}
.sg-quality-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}

/* STORY OUTPUT */
.sg-output{background:var(--card);border:1px solid var(--purple-border);border-radius:14px;padding:1.75rem;margin-top:1rem;box-shadow:0 0 40px rgba(167,139,250,.06)}
.sg-story-title{font-family:'Instrument Serif',serif;font-size:clamp(1.5rem,4vw,2.2rem);font-weight:400;font-style:italic;color:var(--text);margin-bottom:.35rem;line-height:1.2}
.sg-story-divider{height:1px;background:linear-gradient(90deg,var(--purple),transparent);margin:1rem 0}
.sg-story-body{font-size:.97rem;line-height:1.85;color:rgba(255,255,255,.85);white-space:pre-wrap}
.sg-story-meta{display:flex;gap:1rem;margin-top:1rem;font-size:.75rem;color:var(--dim);font-family:'JetBrains Mono',monospace}
.sg-story-actions{display:flex;gap:.5rem;flex-wrap:wrap;margin-top:1.25rem}
.sg-action-btn{display:flex;align-items:center;gap:.4rem;padding:.5rem 1rem;border-radius:8px;font-size:.82rem;font-weight:600;cursor:pointer;transition:all .18s;border:1px solid var(--border2);color:var(--muted);background:transparent;font-family:'Sora',sans-serif}
.sg-action-btn:hover{border-color:var(--purple-border);color:var(--purple)}
.sg-action-btn.copied{border-color:var(--green-border);color:var(--green);background:var(--green-dim)}

/* LOADING */
.sg-loading{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:4rem 2rem;gap:1.25rem}
.sg-spinner{width:44px;height:44px;border:2px solid rgba(167,139,250,.2);border-top-color:var(--purple);border-radius:50%;animation:spinIt .8s linear infinite}
@keyframes spinIt{to{transform:rotate(360deg)}}
.sg-loading-msg{font-size:.88rem;color:var(--muted);animation:fadeInUp .4s ease both}
@keyframes fadeInUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}

/* LIMIT MODAL */
.sg-modal-backdrop{position:fixed;inset:0;z-index:200;background:rgba(7,7,15,.85);backdrop-filter:blur(12px);display:flex;align-items:center;justify-content:center;padding:1rem}
.sg-modal{background:var(--card);border:1px solid var(--purple-border);border-radius:16px;padding:2rem;max-width:380px;width:100%;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,.6)}
.sg-modal h2{font-family:'Instrument Serif',serif;font-style:italic;font-size:1.5rem;margin-bottom:.5rem;color:var(--text)}

/* HISTORY */
.sg-hist-item{display:flex;align-items:flex-start;gap:.75rem;padding:.75rem 0;border-bottom:1px solid var(--border);cursor:pointer;transition:all .18s}
.sg-hist-item:hover{color:var(--purple)}
.sg-hist-item:last-child{border-bottom:none}
.sg-hist-preview{font-size:.8rem;color:var(--muted);line-height:1.5;flex:1}

/* TITLE SUGGESTIONS */
.sg-title-chips{display:flex;flex-wrap:wrap;gap:.4rem;margin-top:.65rem}
.sg-title-chip{padding:.3rem .75rem;border-radius:99px;font-size:.78rem;cursor:pointer;border:1px solid var(--purple-border);color:var(--purple);background:var(--purple-dim);transition:all .18s;font-family:'Instrument Serif',serif;font-style:italic}
.sg-title-chip:hover{background:rgba(167,139,250,.2)}

/* COUNTER */
.sg-counter{font-family:'JetBrains Mono',monospace;font-size:.72rem;padding:.3rem .7rem;border-radius:6px;border:1px solid}
.sg-usage-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.6rem}
.sg-usage-stat{padding:.7rem .8rem;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.03);border-radius:12px}
.sg-usage-k{font-family:'JetBrains Mono',monospace;font-size:.62rem;letter-spacing:.08em;text-transform:uppercase;color:var(--dim)}
.sg-usage-v{margin-top:.3rem;font-size:1.05rem;font-weight:700;letter-spacing:-.03em}

/* RESPONSIVE */
@media(max-width:640px){
  .sg-hero h1{font-size:1.9rem}
  .sg-card{padding:1.1rem}
  .sg-genre-grid{grid-template-columns:repeat(4,1fr)}
  .sg-hide-sm{display:none!important}
  .sg-nav{padding:0 1rem}
  .sg-nav-links{display:none}
  .sg-hero{padding:5.5rem 1rem 3rem}
  .sg-hero-stats{gap:1.25rem}
  .sg-usage-grid{grid-template-columns:1fr}
}
`;

/* ─── Component ───────────────────────────────────────────────────────── */
export default function StoryGenerator() {
  const isLight = false;
  // Genre & Mood
  const [genre,     setGenre]     = useState('');
  const [mood,      setMood]      = useState('');
  const [tone,      setTone]      = useState('');
  // Character
  const [charName,  setCharName]  = useState('');
  const [charAge,   setCharAge]   = useState('');
  const [charGender,setCharGender]= useState('');
  const [charRole,  setCharRole]  = useState('');
  const [traits,    setTraits]    = useState([]);
  // Setting
  const [period,    setPeriod]    = useState('');
  const [place,     setPlace]     = useState('');
  const [world,     setWorld]     = useState('');
  // Plot
  const [conflict,  setConflict]  = useState('');
  const [twist,     setTwist]     = useState('');
  const [starter,   setStarter]   = useState('');
  // Settings
  const [length,    setLength]    = useState('medium');
  const [pov,       setPov]       = useState('third');
  const [language,  setLanguage]  = useState('english');
  // Output
  const [story,     setStory]     = useState('');
  const [title,     setTitle]     = useState('');
  const [loading,   setLoading]   = useState(false);
  const [loadMsg,   setLoadMsg]   = useState(0);
  const [remaining, setRemaining] = useState(null);
  const [storyLimitState, setStoryLimitState] = useState(3);
  const [quotaUsed, setQuotaUsed] = useState(0);
  const [isPremium, setIsPremium] = useState(false);
  const [showLimit, setShowLimit] = useState(false);
  const [activeStep,setActiveStep]= useState(1);
  const [copied,    setCopied]    = useState(false);
  const [titleSugs, setTitleSugs] = useState([]);
  const [storyHistory, setStoryHistory] = useState([]);
  const [promptText, setPromptText] = useState('');
  const [apiModel,  setApiModel]  = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [resetText, setResetText] = useState('Loading…');

  /* Load from localStorage */
  useEffect(() => {
    try {
      const hist = localStorage.getItem('sg_history');
      if (hist) setStoryHistory(JSON.parse(hist));
    } catch {}
  }, []);

  useEffect(() => {
    let active = true;

    async function refreshQuota() {
      try {
        const res = await fetch('/api/ai-quota?tool=story-generator', { cache: 'no-store' });
        const data = await res.json();

        if (!active) return;

        if (!res.ok) {
          setIsLoggedIn(false);
          setRemaining(0);
          setStoryLimitState(3);
          setResetText(data.error || 'Connect your account to start');
          return;
        }

        setIsLoggedIn(true);
        setRemaining(data.quota?.remaining ?? 0);
        setStoryLimitState(data.quota?.limit ?? 3);
        setQuotaUsed(data.quota?.used ?? 0);
        setResetText(data.quota?.reset || '12:00 AM PT');
      } catch {
        if (!active) return;
        setIsLoggedIn(false);
        setRemaining(0);
        setStoryLimitState(3);
        setResetText('Could not load quota');
      }
    }

    refreshQuota();
    return () => { active = false; };
  }, []);

  /* Build prompt */
  const buildPrompt = useCallback(() => {
    const parts = [];
    if (genre)  parts.push(`Write a ${tone || 'cinematic'} ${genre} story.`);
    if (charName || charRole) {
      const charLine = [charName, charAge && `${charAge} years old`, charGender, charRole].filter(Boolean).join(', ');
      const traitLine = traits.length ? `. Personality: ${traits.join(', ')}` : '';
      parts.push(`Main character: ${charLine}${traitLine}.`);
    }
    if (period || place) parts.push(`Setting: ${[period, place].filter(Boolean).join(', ')} in a ${world || 'realistic'} world.`);
    if (conflict) parts.push(`Core conflict: ${conflict}.`);
    if (twist)    parts.push(`Plot twist to include: ${twist}.`);
    if (starter)  parts.push(`Begin the story with: "${starter}"`);
    const words = { short: '300', medium: '600', long: '1000' }[length];
    const povMap = { first: 'first-person (I/Me)', third: 'third-person (He/She)', second: 'second-person (You)' };
    parts.push(`Write in ${povMap[pov]} POV. Mood: ${mood || 'engaging'}. Language: ${language}. Approx ${words} words. End with a satisfying conclusion.`);
    return parts.join('\n');
  }, [genre, tone, mood, charName, charAge, charGender, charRole, traits, period, place, world, conflict, twist, starter, length, pov, language]);

  /* Update prompt preview */
  useEffect(() => {
    setPromptText(buildPrompt());
  }, [buildPrompt]);

  /* Quality score */
  const qualityScore = useMemo(() => {
    const fields = [genre, mood, tone, charName, charRole, period, place, conflict, twist].filter(Boolean).length;
    if (fields <= 2) return { label: 'Basic story', color: '#6b7280', pct: 33 };
    if (fields <= 5) return { label: 'Good story', color: '#F59E0B', pct: 66 };
    return { label: 'Great story! ⭐', color: '#22c55e', pct: 100 };
  }, [genre, mood, tone, charName, charRole, period, place, conflict, twist]);

  /* Random name */
  const randomName = () => {
    const pool = RANDOM_NAMES[genre] || RANDOM_NAMES.default;
    setCharName(pool[Math.floor(Math.random() * pool.length)]);
  };

  /* Title suggestions */
  const suggestTitles = () => {
    const pool = TITLE_NOUNS[genre] || TITLE_NOUNS.default;
    const titles = Array.from({ length: 5 }, () => {
      const adj = TITLE_ADJ[Math.floor(Math.random() * TITLE_ADJ.length)];
      const noun = pool[Math.floor(Math.random() * pool.length)];
      return `The ${adj} ${noun}`;
    });
    setTitleSugs(titles);
  };

  /* Trait toggle */
  const toggleTrait = (t) => {
    setTraits(prev => prev.includes(t) ? prev.filter(x => x !== t) : prev.length < 3 ? [...prev, t] : prev);
  };

  /* Generate story */
  const handleGenerate = async () => {
    if (!genre) { alert('Please select a genre first ⚠️'); return; }
    if (!isLoggedIn) { alert('Connect your account to use Story Generator'); return; }
    if (remaining !== null && remaining <= 0) { setShowLimit(true); return; }

    setLoading(true);
    setStory('');
    setTitle('');
    setApiModel('');

    // Cycle loading messages
    let msgIdx = 0;
    setLoadMsg(0);
    const msgInterval = setInterval(() => {
      msgIdx = (msgIdx + 1) % LOADING_MSGS.length;
      setLoadMsg(msgIdx);
    }, 1800);

    try {
      const res = await fetch('/api/generate-story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptText || buildPrompt(),
          length,
          isPremium,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          setIsLoggedIn(false);
          throw new Error(data.error || 'Connect your account to use this tool');
        }
        if (res.status === 429) { setShowLimit(true); return; }
        if (res.status === 503) { alert('Server is busy right now. Please try again in a moment.'); return; }
        throw new Error(data.error || 'Generation failed');
      }

      const storyText = data.story || '';
      const storyTitle = data.title || `${genre.charAt(0).toUpperCase() + genre.slice(1)} Story`;

      setStory(storyText);
      setTitle(storyTitle);
      setApiModel(data.model || '');
      if (data.quota) {
        setRemaining(data.quota.remaining);
        setStoryLimitState(data.quota.limit);
        setQuotaUsed(data.quota.used);
        setResetText(data.quota.reset || '12:00 AM PT');
      }

      // Save to history
      const entry = { title: storyTitle, preview: storyText.slice(0, 100), full: storyText, date: new Date().toLocaleString() };
      const hist = [entry, ...storyHistory].slice(0, 5);
      setStoryHistory(hist);
      localStorage.setItem('sg_history', JSON.stringify(hist));

    } catch (err) {
      alert(`Error: ${err.message}`);
    } finally {
      clearInterval(msgInterval);
      setLoading(false);
    }
  };

  /* Copy story */
  const copyStory = async () => {
    await navigator.clipboard.writeText(`${title}\n\n${story}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /* Download */
  const downloadStory = () => {
    const blob = new Blob([`${title}\n\n${story}`], { type: 'text/plain' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
    a.download = `${title.replace(/\s+/g, '-').toLowerCase()}.txt`; a.click();
  };

  /* Word count */
  const wordCount = story ? story.split(/\s+/).filter(Boolean).length : 0;
  const readTime = Math.ceil(wordCount / 200);
  const storyLimit = storyLimitState;
  const storyUsed = quotaUsed;

  const filledSteps = [
    genre || mood || tone,
    charName || charRole,
    period || place,
    conflict || twist || starter,
    length && pov && language,
  ];

  /* ─── RENDER ──────────────────────────────────────────────────────── */
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className={`sg-root${isLight ? ' light' : ''}`}>

      {/* LIMIT MODAL */}
      {showLimit && (
        <div className="sg-modal-backdrop" onClick={() => setShowLimit(false)}>
          <div className="sg-modal" onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: '2rem', marginBottom: '.5rem' }}>🔒</div>
            <h2>Daily Limit Reached</h2>
            <p style={{ color: 'var(--muted)', fontSize: '.88rem', margin: '.75rem 0 1.5rem', lineHeight: 1.6 }}>
              You have used all {storyLimit} free uses for today.<br />
              Come back tomorrow for more!
            </p>
            <button className="sg-btn-ghost" style={{ width: '100%' }} onClick={() => setShowLimit(false)}>Got it</button>
          </div>
        </div>
      )}

      <button
        onClick={() => window.history.back()}
        style={{ position: 'fixed', top: '1rem', left: '1rem', zIndex: 100, display: 'flex', alignItems: 'center', gap: '.4rem', padding: '.45rem 1rem', borderRadius: '99px', border: '1px solid var(--border2)', background: 'rgba(7,7,15,0.8)', backdropFilter: 'blur(12px)', color: 'var(--muted)', fontSize: '.82rem', fontWeight: 600, cursor: 'pointer', transition: 'all .18s' }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
      >
        ← Back
      </button>
      <div style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 100, maxWidth: 'calc(100vw - 7.5rem)', display: 'flex', justifyContent: 'flex-end' }}><GoogleAuthButton compact /></div>

      {/* HERO */}
      <div className="sg-hero">
        <div className="sg-hero-bg" />
        <div className="sg-hero-stars" />
        <div className="sg-hero-glow" />
        <div className="sg-hero-content">
          <div className="sg-badge">AI Story Lab · Genre Control · Instant Drafts</div>
          <h1>Cinematic Stories<br /><em>in Seconds</em></h1>
          <p>Shape the genre, characters, setting, and twist, then generate a polished story draft with a much cleaner builder flow like your other premium tools.</p>
          <div className="sg-hero-actions">
            <a href="#sg-builder" className="sg-btn-primary">Open Builder →</a>
            <a href="#sg-history" className="sg-btn-ghost">Recent Stories</a>
          </div>
          <div className="sg-hero-stats">
            <div className="sg-stat"><div className="sg-stat-num">12</div><div className="sg-stat-label">Genres</div></div>
            <div className="sg-stat"><div className="sg-stat-num">5</div><div className="sg-stat-label">Story Steps</div></div>
            <div className="sg-stat"><div className="sg-stat-num">AI</div><div className="sg-stat-label">Draft Engine</div></div>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="sg-main" id="sg-builder">

        {/* STEP INDICATOR */}
        <div className="sg-steps">
          {['Genre & Mood','Characters','Setting','Plot','Settings'].map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '.25rem' }}>
              <button className={`sg-step-btn ${activeStep === i + 1 ? 'active' : filledSteps[i] ? 'done' : ''}`}
                onClick={() => setActiveStep(i + 1)}>
                <span className="sg-step-dot" />
                Step {i + 1}: {s}
                {filledSteps[i] && activeStep !== i + 1 && <span>✓</span>}
              </button>
              {i < 4 && <div className="sg-step-sep" />}
            </div>
          ))}
        </div>

        {/* STEP 1 — GENRE & MOOD */}
        {activeStep === 1 && (
          <div className="sg-card">
            <div className="sg-card-title">🎭 Step 1 — Genre & Mood</div>

            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '.75rem', color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: '.6rem' }}>GENRE</div>
              <div className="sg-genre-grid">
                {GENRES.map(g => (
                  <button key={g.id} className={`sg-genre-btn ${genre === g.id ? 'active' : ''}`} onClick={() => setGenre(g.id)}>
                    <span className="emoji">{g.emoji}</span>
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '.75rem', color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: '.6rem' }}>MOOD</div>
              <div className="sg-pill-grid">
                {MOODS.map(m => (
                  <button key={m} className={`sg-pill ${mood === m ? 'active' : ''}`} onClick={() => setMood(m)}>{m}</button>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '.75rem', color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: '.6rem' }}>TONE</div>
              <div className="sg-pill-grid">
                {TONES.map(t => (
                  <button key={t.id} className={`sg-pill amber ${tone === t.id ? 'active' : ''}`} onClick={() => setTone(t.id)}>{t.label}</button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.25rem' }}>
              <button className="sg-btn-primary" onClick={() => setActiveStep(2)}>Next: Characters →</button>
            </div>
          </div>
        )}

        {/* STEP 2 — CHARACTERS */}
        {activeStep === 2 && (
          <div className="sg-card">
            <div className="sg-card-title">👤 Step 2 — Character Builder</div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '.65rem', marginBottom: '1rem' }}>
              <input className="sg-input" placeholder="Character name..." value={charName} onChange={e => setCharName(e.target.value)} />
              <button className="sg-btn-ghost sg-btn-sm" onClick={randomName}>🎲 Random</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.65rem', marginBottom: '1rem' }}>
              <input className="sg-input" type="number" placeholder="Age (10-80)" min={10} max={80} value={charAge} onChange={e => setCharAge(e.target.value)} />
              <select className="sg-select" value={charGender} onChange={e => setCharGender(e.target.value)}>
                <option value="">Gender...</option>
                <option>Male</option>
                <option>Female</option>
                <option>Non-binary</option>
                <option>Not specified</option>
              </select>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '.75rem', color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: '.5rem' }}>CHARACTER ROLE</div>
              <div className="sg-pill-grid">
                {CHAR_ROLES.map(r => (
                  <button key={r} className={`sg-pill pink ${charRole === r ? 'active' : ''}`} onClick={() => setCharRole(r)}>{r}</button>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '.75rem', color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: '.5rem' }}>
                PERSONALITY TRAITS <span style={{ color: 'var(--purple)' }}>({traits.length}/3)</span>
              </div>
              <div className="sg-pill-grid">
                {TRAITS.map(t => (
                  <button key={t} className={`sg-pill ${traits.includes(t) ? 'active' : ''}`} onClick={() => toggleTrait(t)}>{t}</button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.25rem' }}>
              <button className="sg-btn-ghost" onClick={() => setActiveStep(1)}>← Back</button>
              <button className="sg-btn-primary" onClick={() => setActiveStep(3)}>Next: Setting →</button>
            </div>
          </div>
        )}

        {/* STEP 3 — SETTING */}
        {activeStep === 3 && (
          <div className="sg-card">
            <div className="sg-card-title">🌍 Step 3 — Set the Scene</div>

            <div style={{ marginBottom: '1.1rem' }}>
              <div style={{ fontSize: '.75rem', color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: '.5rem' }}>TIME PERIOD</div>
              <div className="sg-pill-grid">
                {TIME_PERIODS.map(p => (
                  <button key={p} className={`sg-pill amber ${period === p ? 'active' : ''}`} onClick={() => setPeriod(p)}>{p}</button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '1.1rem' }}>
              <div style={{ fontSize: '.75rem', color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: '.5rem' }}>PLACE</div>
              <div className="sg-pill-grid">
                {PLACES.map(p => (
                  <button key={p.id} className={`sg-pill ${place === p.id ? 'active' : ''}`} onClick={() => setPlace(p.id)}>
                    {p.emoji} {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '.75rem', color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: '.5rem' }}>WORLD TYPE</div>
              <div className="sg-pill-grid">
                {WORLD_TYPES.map(w => (
                  <button key={w} className={`sg-pill pink ${world === w ? 'active' : ''}`} onClick={() => setWorld(w)}>{w}</button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.25rem' }}>
              <button className="sg-btn-ghost" onClick={() => setActiveStep(2)}>← Back</button>
              <button className="sg-btn-primary" onClick={() => setActiveStep(4)}>Next: Plot →</button>
            </div>
          </div>
        )}

        {/* STEP 4 — PLOT */}
        {activeStep === 4 && (
          <div className="sg-card">
            <div className="sg-card-title">⚔️ Step 4 — Plot & Conflict</div>

            <div style={{ marginBottom: '1.1rem' }}>
              <div style={{ fontSize: '.75rem', color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: '.5rem' }}>CONFLICT TYPE</div>
              <div className="sg-pill-grid">
                {CONFLICTS.map(c => (
                  <button key={c.id} className={`sg-pill amber ${conflict === c.id ? 'active' : ''}`} onClick={() => setConflict(c.id)}>{c.label}</button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '1.1rem' }}>
              <div style={{ fontSize: '.75rem', color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: '.5rem' }}>PLOT TWIST (optional)</div>
              <div className="sg-pill-grid">
                {PLOT_TWISTS.map(t => (
                  <button key={t} className={`sg-pill pink ${twist === t ? 'active' : ''}`} onClick={() => setTwist(prev => prev === t ? '' : t)}>{t}</button>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '.75rem', color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: '.5rem' }}>STORY STARTER (optional)</div>
              <textarea className="sg-input sg-textarea"
                placeholder={`Start my story with this line...\ne.g. "The last train had already left when..."`}
                value={starter} onChange={e => setStarter(e.target.value)} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.25rem' }}>
              <button className="sg-btn-ghost" onClick={() => setActiveStep(3)}>← Back</button>
              <button className="sg-btn-primary" onClick={() => setActiveStep(5)}>Next: Settings →</button>
            </div>
          </div>
        )}

        {/* STEP 5 — SETTINGS */}
        {activeStep === 5 && (
          <div className="sg-card">
            <div className="sg-card-title">⚙️ Step 5 — Story Settings</div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '.75rem', marginBottom: '1.1rem' }}>
              <div>
                <div style={{ fontSize: '.72rem', color: 'var(--dim)', marginBottom: '.4rem' }}>LENGTH</div>
                {[['short','Short ~300w'],['medium','Medium ~600w'],['long','Long ~1000w']].map(([v, l]) => (
                  <button key={v} className={`sg-pill ${length === v ? 'active' : ''}`} style={{ width: '100%', justifyContent: 'center', marginBottom: '.35rem', display: 'flex' }} onClick={() => setLength(v)}>{l}</button>
                ))}
              </div>
              <div>
                <div style={{ fontSize: '.72rem', color: 'var(--dim)', marginBottom: '.4rem' }}>POV</div>
                {[['first','First Person (I)'],['third','Third Person (He/She)'],['second','Second Person (You)']].map(([v, l]) => (
                  <button key={v} className={`sg-pill amber ${pov === v ? 'active' : ''}`} style={{ width: '100%', justifyContent: 'center', marginBottom: '.35rem', display: 'flex' }} onClick={() => setPov(v)}>{l}</button>
                ))}
              </div>
              <div>
                <div style={{ fontSize: '.72rem', color: 'var(--dim)', marginBottom: '.4rem' }}>LANGUAGE</div>
                {[['english','🇬🇧 English'],['hindi','🇮🇳 Hindi'],['hinglish','🔀 Hinglish']].map(([v, l]) => (
                  <button key={v} className={`sg-pill pink ${language === v ? 'active' : ''}`} style={{ width: '100%', justifyContent: 'center', marginBottom: '.35rem', display: 'flex' }} onClick={() => setLanguage(v)}>{l}</button>
                ))}
              </div>
            </div>

            <button className="sg-btn-ghost sg-btn-sm" onClick={suggestTitles} style={{ marginBottom: titleSugs.length ? '.5rem' : '0' }}>
              🎲 Suggest Story Titles
            </button>
            {titleSugs.length > 0 && (
              <div className="sg-title-chips">
                {titleSugs.map(t => <span key={t} className="sg-title-chip" onClick={() => setTitle(t)}>{t}</span>)}
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '1.25rem' }}>
              <button className="sg-btn-ghost" onClick={() => setActiveStep(4)}>← Back</button>
            </div>
          </div>
        )}

        {/* PROMPT PREVIEW + GENERATE */}
        <div className="sg-card">
          <div className="sg-card-title">📝 Prompt Preview</div>
          <div className="sg-quality" style={{ marginBottom: '1rem' }}>
            <span className="sg-quality-dot" style={{ background: qualityScore.color }} />
            <span>{qualityScore.label}</span>
            <div style={{ flex: 1, height: 4, background: 'rgba(255,255,255,.08)', borderRadius: 99, overflow: 'hidden', marginLeft: '.5rem' }}>
              <div style={{ height: '100%', width: `${qualityScore.pct}%`, background: qualityScore.color, borderRadius: 99, transition: 'width .4s' }} />
            </div>
          </div>
          <div
            className="sg-preview-box"
            contentEditable
            suppressContentEditableWarning
            onInput={e => setPromptText(e.currentTarget.textContent || '')}
          >
            {promptText || 'Fill in the steps above to build your prompt...'}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', flexWrap: 'wrap', gap: '.65rem' }}>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: '.72rem', color: remaining > 1 ? 'var(--green)' : remaining === 1 ? 'var(--amber)' : 'var(--red)' }}>
              {isLoggedIn ? (remaining === null ? 'Loading quota...' : remaining > 0 ? `${remaining} ${remaining === 1 ? 'story' : 'stories'} remaining today` : `🔴 Daily limit reached · resets ${resetText}`) : '🔐 Connect your account to start'}
            </div>
            <div style={{ display: 'flex', gap: '.5rem' }}>
              <button className="sg-btn-ghost sg-btn-sm" onClick={() => {
                setGenre(''); setMood(''); setTone(''); setCharName(''); setCharAge(''); setCharGender(''); setCharRole('');
                setTraits([]); setPeriod(''); setPlace(''); setWorld(''); setConflict(''); setTwist(''); setStarter('');
                setStory(''); setTitle(''); setActiveStep(1);
              }}>↺ Reset</button>
              <button className="sg-btn-primary" onClick={handleGenerate} disabled={loading}>
                {loading ? '⏳ Generating...' : `✨ Generate Story`}
              </button>
            </div>
          </div>
          <div className="sg-usage-grid" style={{ marginTop: '1rem' }}>
            <div className="sg-usage-stat">
              <div className="sg-usage-k">Used Today</div>
              <div className="sg-usage-v">{storyUsed}</div>
            </div>
            <div className="sg-usage-stat">
              <div className="sg-usage-k">Remaining</div>
              <div className="sg-usage-v" style={{ color: remaining > 0 ? 'var(--green)' : 'var(--red)' }}>{remaining === null ? '...' : remaining}</div>
            </div>
            <div className="sg-usage-stat">
              <div className="sg-usage-k">Total Daily</div>
              <div className="sg-usage-v" style={{ color: 'var(--amber)' }}>{storyLimit}</div>
            </div>
          </div>
          {apiModel && <div style={{ marginTop: '.5rem', fontFamily: 'JetBrains Mono', fontSize: '.65rem', color: 'var(--dim)' }}>Powered by {apiModel}</div>}
        </div>

        {/* LOADING */}
        {loading && (
          <div className="sg-output">
            <div className="sg-loading">
              <div className="sg-spinner" />
              <div className="sg-loading-msg" key={loadMsg}>{LOADING_MSGS[loadMsg]}</div>
            </div>
          </div>
        )}

        {/* OUTPUT */}
        {story && !loading && (
          <div className="sg-output" id="sg-output">
            <div className="sg-story-title">{title}</div>
            <div className="sg-story-divider" />
            <div className="sg-story-body">{story}</div>
            <div className="sg-story-meta">
              <span>{wordCount} words</span>
              <span>·</span>
              <span>~{readTime} min read</span>
            </div>
            <div className="sg-story-actions">
              <button className={`sg-action-btn ${copied ? 'copied' : ''}`} onClick={copyStory}>
                {copied ? '✓ Copied!' : '📋 Copy Story'}
              </button>
              <button className="sg-action-btn" onClick={downloadStory}>⬇️ Download .txt</button>
              <button className="sg-action-btn" onClick={handleGenerate}>🔄 Regenerate</button>
              <button className="sg-action-btn" onClick={() => { setStory(''); setTitle(''); setActiveStep(1); }}>✨ New Story</button>
            </div>
          </div>
        )}

        {/* HISTORY */}
        {storyHistory.length > 0 && (
          <div className="sg-card" style={{ marginTop: '1.5rem' }}>
            <div className="sg-card-title" id="sg-history">📚 Recent Stories</div>
            {storyHistory.map((h, i) => (
              <div key={i} className="sg-hist-item" onClick={() => { setTitle(h.title); setStory(h.full); }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontSize: '.95rem', marginBottom: '.2rem' }}>{h.title}</div>
                  <div className="sg-hist-preview">{h.preview}...</div>
                  <div style={{ fontSize: '.68rem', color: 'var(--dim)', marginTop: '.25rem', fontFamily: 'JetBrains Mono' }}>{h.date}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ height: '3rem' }} />
      </div>
      </div>
    </>
  );
}
