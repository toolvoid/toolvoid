'use client'

const linuxDownload = 'https://github.com/toolvoid/toolvoid/releases/latest/download/capsule-manager-1.0.0.AppImage'
const windowsDownload = 'https://github.com/toolvoid/toolvoid/releases/latest/download/capsule-manager.Setup.1.0.0.exe'

const steps = [
  {
    n: '01',
    title: 'Get Your Free Gemini API Key',
    text: 'Go to aistudio.google.com → Sign in → Create API Key → Copy it',
    note: 'Free tier resets every day — no credit card needed',
  },
  {
    n: '02',
    title: 'Download & Install Capsule Manager',
    text: 'Download for your OS (Linux or Windows) and install it on your PC',
  },
  {
    n: '03',
    title: 'Paste Your API Key',
    text: 'Open Capsule Manager → Go to Settings → Paste your Gemini API key',
  },
  {
    n: '04',
    title: 'Open Any AI in Your Browser',
    text: 'Launch Chrome, Brave, or Edge → Open Claude, ChatGPT, Gemini, DeepSeek, or Grok',
  },
  {
    n: '05',
    title: 'Start Chatting & Save Capsules',
    text: 'Capsule Manager reads your conversation automatically. When context fills up → Click "Save Capsule" → Select which AI to continue on → Done!',
  },
]

const providers = [
  ['Google Gemini', '✅ Yes', 'gemini-2.0-flash', 'gemini-2.0-pro', '15 RPM free'],
  ['OpenAI', '❌ No', '—', 'gpt-4o-mini', 'Paid only'],
  ['Anthropic Claude', '❌ No', '—', 'claude-haiku-4-5', 'Paid only'],
  ['DeepSeek', '✅ Yes', 'deepseek-chat', 'deepseek-chat', 'Limited free credits'],
  ['Groq', '✅ Yes', 'llama-3.3-70b', 'llama-3.3-70b', '30 RPM free'],
]

export default function CapsuleManagerClient() {
  return (
    <main className="cm-page">
      <style precedence="default" href="capsule-manager-page-styles">{`
        .cm-page{min-height:100vh;background:#060609;color:#f8fbff;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;overflow:hidden}
        .cm-wrap{width:min(1120px,calc(100% - 32px));margin:0 auto}
        .cm-hero{position:relative;padding:84px 0 54px;border-bottom:1px solid rgba(255,255,255,.08)}
        .cm-hero::before{content:"";position:absolute;inset:-20% -10% auto auto;width:520px;height:520px;background:radial-gradient(circle,rgba(167,139,250,.22),transparent 64%);pointer-events:none}
        .cm-kicker{display:inline-flex;align-items:center;gap:8px;border:1px solid rgba(167,139,250,.35);background:rgba(167,139,250,.1);color:#c4b5fd;border-radius:999px;padding:8px 12px;font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase}
        .cm-title{position:relative;margin:18px 0 14px;font-size:clamp(42px,8vw,96px);line-height:.92;font-weight:900;letter-spacing:0;color:#fff}
        .cm-title span{color:#a78bfa;text-shadow:0 0 34px rgba(167,139,250,.35)}
        .cm-subtitle{max-width:760px;color:#b7c0d0;font-size:clamp(17px,2.5vw,22px);line-height:1.55}
        .cm-hero-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:30px}
        .cm-btn{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0 20px;border-radius:12px;border:1px solid rgba(255,255,255,.12);text-decoration:none;font-weight:800;color:#f8fbff;background:rgba(255,255,255,.06);transition:transform .18s ease,border-color .18s ease,background .18s ease}
        .cm-btn:hover{transform:translateY(-2px);border-color:rgba(167,139,250,.5);background:rgba(167,139,250,.14)}
        .cm-btn.primary{background:#a78bfa;color:#08080d;border-color:#a78bfa;box-shadow:0 14px 44px rgba(167,139,250,.25)}
        .cm-section{padding:54px 0;border-bottom:1px solid rgba(255,255,255,.08)}
        .cm-section-head{display:flex;justify-content:space-between;align-items:end;gap:20px;margin-bottom:22px}
        .cm-h2{font-size:clamp(28px,4vw,44px);line-height:1;font-weight:900;letter-spacing:0;margin:0}
        .cm-copy{color:#96a1b2;font-size:15px;line-height:1.7;max-width:700px}
        .cm-steps{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px}
        .cm-step{min-height:238px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.045);border-radius:14px;padding:18px;position:relative}
        .cm-step-num{color:#a78bfa;font:800 12px/1 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.14em;margin-bottom:18px}
        .cm-step h3{font-size:17px;line-height:1.25;margin:0 0 10px;color:#fff}
        .cm-step p{margin:0;color:#aeb7c7;font-size:13px;line-height:1.55}
        .cm-note{display:block;margin-top:10px;color:#c4b5fd;font-size:12px;line-height:1.45}
        .cm-download{display:grid;grid-template-columns:1fr 1fr;gap:14px;max-width:760px}
        .cm-download .cm-btn{min-height:58px;font-size:16px;border-radius:14px}
        .cm-requirement{margin-top:14px;color:#8f9bad;font-size:14px}
        .cm-badges{display:flex;flex-wrap:wrap;gap:10px}
        .cm-badge{border:1px solid rgba(167,139,250,.32);background:rgba(167,139,250,.1);color:#ddd6fe;border-radius:999px;padding:10px 14px;font-weight:800}
        .cm-table-wrap{overflow:auto;border:1px solid rgba(255,255,255,.1);border-radius:14px;background:rgba(255,255,255,.045)}
        .cm-table{width:100%;border-collapse:collapse;min-width:760px}
        .cm-table th,.cm-table td{padding:15px 16px;text-align:left;border-bottom:1px solid rgba(255,255,255,.08);font-size:14px}
        .cm-table th{color:#c4b5fd;background:rgba(167,139,250,.08);font-size:12px;text-transform:uppercase;letter-spacing:.08em}
        .cm-table td{color:#d9deea}
        .cm-table tr:last-child td{border-bottom:0}
        .cm-callout{margin-top:16px;color:#d8d1ff;background:rgba(167,139,250,.09);border:1px solid rgba(167,139,250,.24);border-radius:14px;padding:14px 16px;line-height:1.6}
        .cm-privacy{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
        .cm-privacy-card{border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.045);border-radius:14px;padding:18px;color:#d8deeb;line-height:1.55;font-weight:700}
        @media (max-width:980px){.cm-steps{grid-template-columns:repeat(2,minmax(0,1fr))}.cm-privacy{grid-template-columns:1fr}.cm-section-head{display:block}.cm-copy{margin-top:10px}}
        @media (max-width:620px){.cm-wrap{width:min(100% - 24px,1120px)}.cm-hero{padding:58px 0 40px}.cm-section{padding:38px 0}.cm-steps,.cm-download{grid-template-columns:1fr}.cm-step{min-height:auto}.cm-download .cm-btn{width:100%}}
      `}</style>

      <section className="cm-hero">
        <div className="cm-wrap">
          <div className="cm-kicker">New Desktop Tool</div>
          <h1 className="cm-title"><span>Capsule</span> Manager</h1>
          <p className="cm-subtitle">Never lose AI context again. Save your conversation, pick up exactly where you left off.</p>
          <div className="cm-hero-actions">
            <a className="cm-btn primary" href="#download">Download Now</a>
            <a className="cm-btn" href="#setup">API Setup Guide</a>
          </div>
        </div>
      </section>

      <section className="cm-section">
        <div className="cm-wrap">
          <div className="cm-section-head">
            <h2 className="cm-h2">How It Works</h2>
            <p className="cm-copy">Five steps from API key to portable AI context capsules.</p>
          </div>
          <div className="cm-steps">
            {steps.map(step => (
              <article className="cm-step" key={step.n}>
                <div className="cm-step-num">{step.n}</div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                {step.note && <span className="cm-note">{step.note}</span>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cm-section" id="download">
        <div className="cm-wrap">
          <div className="cm-section-head">
            <h2 className="cm-h2">Download Capsule Manager</h2>
            <p className="cm-copy">Install the desktop companion and keep your AI sessions moving.</p>
          </div>
          <div className="cm-download">
            <a className="cm-btn primary" href={linuxDownload}>Download for Linux</a>
            <a className="cm-btn primary" href={windowsDownload}>Download for Windows</a>
          </div>
          <p className="cm-requirement">Requires a Chromium-based browser — Chrome, Brave, or Edge</p>

          <div className="cm-install-guide" style={{marginTop: '30px', color: '#d9deea', fontSize: '15px', lineHeight: '1.7'}}>
            <h3 style={{fontSize: '20px', marginBottom: '12px', color: '#fff'}}>Installation Guide</h3>
            <div>
              <h4 style={{margin: '14px 0 8px', color: '#fff'}}>Linux Installation</h4>
              <p>After downloading the AppImage, make it executable and run:</p>
              <pre style={{background: 'rgba(255,255,255,.06)', padding: '12px 14px', borderRadius: '12px', overflowX: 'auto'}}>chmod +x ~/Downloads/capsule-manager-1.0.0.AppImage</pre>
              <p>Launch it directly from terminal:</p>
              <pre style={{background: 'rgba(255,255,255,.06)', padding: '12px 14px', borderRadius: '12px', overflowX: 'auto'}}>~/Downloads/capsule-manager-1.0.0.AppImage --no-sandbox</pre>
            </div>
            <div>
              <h4 style={{margin: '14px 0 8px', color: '#fff'}}>Windows Installation</h4>
              <p>Double-click the downloaded .exe file and follow the installer steps.</p>
              <p>Capsule Manager will launch automatically after installation.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cm-section">
        <div className="cm-wrap">
          <div className="cm-section-head">
            <h2 className="cm-h2">Supported AI Platforms</h2>
          </div>
          <div className="cm-badges">
            {['Claude', 'ChatGPT', 'Gemini', 'DeepSeek', 'Grok'].map(name => <span className="cm-badge" key={name}>{name}</span>)}
          </div>
        </div>
      </section>

      <section className="cm-section" id="setup">
        <div className="cm-wrap">
          <div className="cm-section-head">
            <div>
              <h2 className="cm-h2">Set Up Your AI API Key (Optional)</h2>
              <p className="cm-copy">For smart AI-generated summaries. Without it, raw capsules still work perfectly.</p>
            </div>
          </div>
          <div className="cm-table-wrap">
            <table className="cm-table">
              <thead>
                <tr>
                  <th>Provider</th>
                  <th>Free Tier</th>
                  <th>Free Model</th>
                  <th>Paid Model</th>
                  <th>Limitations</th>
                </tr>
              </thead>
              <tbody>
                {providers.map(row => (
                  <tr key={row[0]}>
                    {row.map((cell, idx) => <td key={`${row[0]}-${idx}`}>{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="cm-callout">For most users, Gemini free tier (gemini-2.0-flash) is the best starting point — no credit card required.</p>
        </div>
      </section>

      <section className="cm-section">
        <div className="cm-wrap">
          <div className="cm-section-head">
            <h2 className="cm-h2">Your Data Stays on Your Device</h2>
          </div>
          <div className="cm-privacy">
            <div className="cm-privacy-card">🔒 All capsules are encrypted and stored locally on your computer</div>
            <div className="cm-privacy-card">🚫 No data is sent to our servers — ever</div>
            <div className="cm-privacy-card">💻 Capsule Manager runs entirely on your machine</div>
          </div>
        </div>
      </section>
    </main>
  )
}
