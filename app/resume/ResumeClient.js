'use client'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { ResumeBuilderUI } from './components/ResumBuilderUI'
import { renderTemplate } from './components/templates/index'
import { PersonalEditor, ExperienceEditor, EducationEditor, SkillsEditor, ProjectsEditor, CertsEditor, LanguagesEditor, AwardsEditor, SocialEditor } from './components/editors'
import { useResumeStore } from './hooks/useResumeStore'
import { TEMPLATES, TEMPLATE_CATEGORIES, EDITOR_SECTIONS, SAMPLE_RESUME } from './lib/constants'
import { checkATS, calcProgress } from './lib/utils'
import { ATSModal, KeywordModal } from './components/Modals'
import Customizer from './components/Customizer'

// ─── CSS ─────────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');
.rf-root{--accent:#FF6B6B;--accent2:#FF8E53;--bg:#090910;--bg2:#0e0e1a;--bg3:#13131f;--card:#0f0f1c;--brd:rgba(255,255,255,0.07);--brd2:rgba(255,255,255,0.13);--txt:#e8e8f0;--mut:#6b6b85;--dim:#9494aa;--shadow:0 4px 24px rgba(0,0,0,.5);--shadowLg:0 12px 48px rgba(0,0,0,.7);--r:14px;--rs:8px;--t:.2s cubic-bezier(.4,0,.2,1);--fHead:'Syne',system-ui,sans-serif;--fBody:system-ui,sans-serif;--fMono:'DM Mono',monospace;font-family:var(--fBody);background:var(--bg);color:var(--txt);line-height:1.6}
.rf-root *,.rf-root *::before,.rf-root *::after{box-sizing:border-box;margin:0;padding:0}
.rf-root button{cursor:pointer;border:none;background:none;font-family:inherit;color:inherit}
.rf-root a{color:inherit;text-decoration:none}
.rf-root img,.rf-root svg{display:block;max-width:100%}
.rf-root ::-webkit-scrollbar{width:5px}.rf-root ::-webkit-scrollbar-track{background:var(--bg)}.rf-root ::-webkit-scrollbar-thumb{background:var(--brd2);border-radius:99px}

/* NAV */
.rf-nav{position:sticky;top:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:0 2rem;height:60px;background:rgba(9,9,16,.75);backdrop-filter:blur(20px) saturate(1.5);border-bottom:1px solid var(--brd)}
.rf-logo{font-family:var(--fHead);font-weight:800;font-size:1.2rem;letter-spacing:-.04em;display:flex;align-items:center;gap:.5rem}
.rf-logo-badge{background:linear-gradient(135deg,var(--accent),var(--accent2));color:#fff;padding:.1em .4em;border-radius:6px;font-size:.85em;line-height:1.3}
.rf-nav-links{display:flex;gap:1.5rem;list-style:none}
.rf-nav-links a{font-size:.875rem;color:var(--dim);font-weight:500;transition:color var(--t)}
.rf-nav-links a:hover{color:var(--txt)}
.rf-nav-right{display:flex;align-items:center;gap:.75rem}
.rf-nav-cta{padding:.5rem 1.25rem;background:linear-gradient(135deg,var(--accent),var(--accent2));color:#fff;border-radius:99px;font-size:.85rem;font-weight:700;transition:all var(--t);white-space:nowrap;box-shadow:0 0 20px rgba(255,107,107,.25)}
.rf-nav-cta:hover{transform:translateY(-1px);box-shadow:0 0 30px rgba(255,107,107,.4)}

/* HERO */
.rf-hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:6rem 1.5rem 4rem;position:relative;overflow:hidden}
.rf-hero-grid{position:absolute;inset:0;pointer-events:none;z-index:0;background-image:linear-gradient(var(--brd) 1px,transparent 1px),linear-gradient(90deg,var(--brd) 1px,transparent 1px);background-size:60px 60px;mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,black 30%,transparent 100%)}
.rf-glow{position:absolute;top:50%;left:50%;transform:translate(-50%,-60%);width:700px;height:700px;background:radial-gradient(circle,rgba(255,107,107,.07) 0%,transparent 70%);pointer-events:none;z-index:0}
.rf-glow2{position:absolute;top:60%;left:25%;width:500px;height:500px;background:radial-gradient(circle,rgba(255,142,83,.05) 0%,transparent 70%);pointer-events:none;z-index:0}
.rf-hero-content{position:relative;z-index:1;max-width:820px}
.rf-badge{display:inline-flex;align-items:center;gap:.5rem;padding:.35rem 1rem;background:rgba(255,107,107,.1);border:1px solid rgba(255,107,107,.2);border-radius:99px;font-family:var(--fMono);font-size:.72rem;font-weight:500;color:var(--accent);letter-spacing:.05em;margin-bottom:2rem;animation:rfUp .6s ease both}
.rf-badge::before{content:'';width:6px;height:6px;border-radius:50%;background:var(--accent);animation:rfPulse 2s ease-in-out infinite}
@keyframes rfPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.8)}}
.rf-hero h1{font-family:var(--fHead);font-size:clamp(2.8rem,7vw,5.5rem);font-weight:800;letter-spacing:-.04em;line-height:1.05;margin-bottom:1.5rem;animation:rfUp .7s .1s ease both}
.rf-hero h1 .acc{background:linear-gradient(135deg,var(--accent),var(--accent2));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.rf-hero-sub{font-size:clamp(1rem,2.5vw,1.15rem);color:var(--dim);max-width:560px;margin:0 auto 2.5rem;line-height:1.75;animation:rfUp .7s .2s ease both}
.rf-hero-btns{display:flex;align-items:center;justify-content:center;gap:1rem;flex-wrap:wrap;animation:rfUp .7s .3s ease both}
.rf-btn-primary{padding:.8rem 2rem;background:linear-gradient(135deg,var(--accent),var(--accent2));color:#fff;border-radius:99px;font-weight:700;font-size:.95rem;transition:all .2s;display:inline-flex;align-items:center;gap:.5rem;box-shadow:0 0 30px rgba(255,107,107,.3)}
.rf-btn-primary:hover{transform:translateY(-2px);box-shadow:0 0 50px rgba(255,107,107,.5)}
.rf-btn-ghost{padding:.8rem 1.6rem;border:1px solid var(--brd2);color:var(--dim);border-radius:99px;font-weight:500;font-size:.95rem;transition:all .2s;display:inline-flex;align-items:center;gap:.5rem}
.rf-btn-ghost:hover{border-color:var(--accent);color:var(--accent);transform:translateY(-2px)}
.rf-stats{display:flex;justify-content:center;gap:3rem;margin-top:4rem;animation:rfUp .7s .4s ease both}
.rf-stat{text-align:center}
.rf-stat-n{font-family:var(--fHead);font-size:1.8rem;font-weight:800;color:var(--txt);letter-spacing:-.04em}
.rf-stat-l{font-size:.78rem;color:var(--mut);font-weight:500;margin-top:2px}
@keyframes rfUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}

/* SECTION */
.rf-sec{padding:6rem 1.5rem}
.rf-sec-inner{max-width:1100px;margin:0 auto}
.rf-sec-label{font-family:var(--fMono);font-size:.72rem;font-weight:500;color:var(--accent);letter-spacing:.1em;text-transform:uppercase;margin-bottom:.75rem}
.rf-sec-title{font-family:var(--fHead);font-size:clamp(1.8rem,4vw,2.8rem);font-weight:800;letter-spacing:-.04em;line-height:1.1;margin-bottom:1rem}
.rf-sec-sub{font-size:1.05rem;color:var(--dim);max-width:520px;line-height:1.7}
.rf-bg2{background:var(--bg2);border-top:1px solid var(--brd);border-bottom:1px solid var(--brd)}

/* FEATURES */
.rf-features{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1.25rem;margin-top:3rem}
.rf-feat{background:var(--card);border:1px solid var(--brd);border-radius:var(--r);padding:1.75rem;transition:all var(--t);position:relative;overflow:hidden;cursor:default}
.rf-feat::before{content:'';position:absolute;inset:0;background:rgba(255,107,107,.04);opacity:0;transition:opacity var(--t)}
.rf-feat:hover::before{opacity:1}
.rf-feat:hover{border-color:var(--brd2);transform:translateY(-3px);box-shadow:var(--shadowLg)}
.rf-feat-icon{width:44px;height:44px;background:rgba(255,107,107,.12);border-radius:var(--rs);display:flex;align-items:center;justify-content:center;font-size:1.3rem;margin-bottom:1.1rem}
.rf-feat h3{font-family:var(--fHead);font-size:1.05rem;font-weight:700;margin-bottom:.5rem;letter-spacing:-.02em}
.rf-feat p{font-size:.88rem;color:var(--dim);line-height:1.65}

/* STEPS */
.rf-steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:2rem;margin-top:3rem;position:relative}
.rf-steps::before{content:'';position:absolute;top:2.5rem;left:10%;right:10%;height:1px;background:linear-gradient(90deg,transparent,var(--brd2),transparent)}
.rf-step{text-align:center}
.rf-step-n{font-family:var(--fHead);font-size:2.5rem;font-weight:800;color:var(--accent);opacity:.15;line-height:1;margin-bottom:.75rem}
.rf-step-icon{width:52px;height:52px;background:var(--card);border:1px solid var(--brd2);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.4rem;margin:0 auto 1rem}
.rf-step h3{font-family:var(--fHead);font-size:1rem;font-weight:700;margin-bottom:.4rem}
.rf-step p{font-size:.85rem;color:var(--dim);line-height:1.6}

/* TEMPLATE SHOWCASE */
.rf-tmpl-scroll{display:flex;gap:1rem;overflow-x:auto;padding:1.5rem 0;margin-top:2rem;scrollbar-width:none}
.rf-tmpl-scroll::-webkit-scrollbar{display:none}
.rf-tmpl-thumb{flex-shrink:0;width:160px;border-radius:10px;overflow:hidden;border:1.5px solid var(--brd);background:var(--card);transition:all var(--t);cursor:pointer}
.rf-tmpl-thumb:hover{border-color:rgba(255,107,107,.5);transform:translateY(-3px);box-shadow:0 8px 24px rgba(255,107,107,.15)}
.rf-tmpl-thumb-preview{height:120px;overflow:hidden;position:relative}
.rf-tmpl-thumb-label{padding:8px 10px}
.rf-tmpl-thumb-label p{font-size:.75rem;font-weight:700;color:var(--txt)}
.rf-tmpl-thumb-label span{font-size:.68rem;color:var(--mut)}

/* FAQ */
.rf-faq-list{max-width:680px;margin:3rem auto 0;display:flex;flex-direction:column;gap:.75rem}
.rf-faq-item{background:var(--card);border:1px solid var(--brd);border-radius:var(--rs);overflow:hidden;transition:border-color var(--t)}
.rf-faq-item.open{border-color:var(--brd2)}
.rf-faq-q{display:flex;align-items:center;justify-content:space-between;padding:1.1rem 1.25rem;cursor:pointer;font-weight:600;font-size:.95rem;transition:color var(--t);gap:1rem}
.rf-faq-q:hover{color:var(--accent)}
.rf-faq-arrow{font-size:1rem;color:var(--mut);flex-shrink:0;transition:transform .25s ease}
.rf-faq-item.open .rf-faq-arrow{transform:rotate(180deg);color:var(--accent)}
.rf-faq-a{max-height:0;overflow:hidden;transition:max-height .3s ease,padding .3s ease;font-size:.9rem;color:var(--dim);line-height:1.7}
.rf-faq-item.open .rf-faq-a{max-height:300px;padding:0 1.25rem 1.1rem}

/* FOOTER */
.rf-footer{border-top:1px solid var(--brd);padding:3rem 1.5rem;text-align:center}
.rf-footer-logo{font-family:var(--fHead);font-size:1.5rem;font-weight:800;letter-spacing:-.04em;margin-bottom:.75rem;display:inline-flex;align-items:center;gap:.5rem}
.rf-footer-logo span{background:linear-gradient(135deg,var(--accent),var(--accent2));color:#fff;padding:.05em .35em;border-radius:5px}
.rf-footer-links{display:flex;justify-content:center;flex-wrap:wrap;gap:2rem;margin:1.5rem 0;list-style:none}
.rf-footer-links a{font-size:.85rem;color:var(--mut);transition:color var(--t)}
.rf-footer-links a:hover{color:var(--accent)}
.rf-footer-copy{font-size:.8rem;color:var(--mut);font-family:var(--fMono)}

/* Animated floating background */
.rf-animated-bg{position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden}
.rf-orb{position:absolute;border-radius:50%;filter:blur(80px);opacity:.18;animation:rfOrbit linear infinite}
@keyframes rfOrbit{0%{transform:translate(0,0) scale(1)}25%{transform:translate(40px,-60px) scale(1.1)}50%{transform:translate(-30px,-40px) scale(.9)}75%{transform:translate(-50px,30px) scale(1.05)}100%{transform:translate(0,0) scale(1)}}
.rf-hero>.rf-hero-grid,.rf-hero>.rf-glow,.rf-hero>.rf-glow2{z-index:1}
.rf-hero>.rf-hero-content{z-index:2}

.rf-cases-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.25rem;margin-top:3rem}
.rf-case-card{background:var(--card);border:1px solid var(--brd);border-radius:var(--r);padding:1.5rem;transition:all var(--t);cursor:default}
.rf-case-card:hover{border-color:var(--brd2);transform:translateY(-2px)}

/* ── MODERN TOGGLE SWITCH ── */
.rf-switch { display: flex; align-items: center; justify-content: space-between; padding: 12px 14px; background: rgba(255,255,255,0.03); border: 1px solid var(--brd); border-radius: 12px; cursor: pointer; transition: all .2s; }
.rf-switch:hover { background: rgba(255,255,255,0.05); border-color: var(--brd2); }
.rf-switch-label { display: flex; align-items: center; gap: 10px; font-size: 13px; font-weight: 600; color: var(--txt); }
.rf-switch-box { position: relative; width: 38px; height: 22px; background: rgba(255,255,255,0.1); border-radius: 20px; transition: all 0.3s; }
.rf-switch-box::after { content: ''; position: absolute; top: 3px; left: 3px; width: 16px; height: 16px; background: #fff; border-radius: 50%; transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55); box-shadow: 0 2px 5px rgba(0,0,0,0.2); }
/* Active State */
.rf-switch.active { border-color: rgba(255,107,107,0.3); background: rgba(255,107,107,0.04); }
.rf-switch.active .rf-switch-box { background: var(--accent); }
.rf-switch.active .rf-switch-box::after { transform: translateX(16px); }

/* Simple Toggle Button Fallback */
.rf-toggle-btn { padding: 6px 12px; border-radius: 8px; font-size: 11px; font-weight: 700; border: 1px solid var(--brd); background: var(--sub); color: var(--mut); transition: all .2s; }
.rf-toggle-btn.active { background: rgba(78,205,196,0.1); border-color: #4ECDC4; color: #4ECDC4; }

@media(max-width:640px){.rf-nav-links{display:none}.rf-stats{gap:1.5rem}.rf-steps::before{display:none}}
`

// ─── LANDING PAGE ─────────────────────────────────────────────────────────────
function LandingPage({ onStart }) {
  const FEATURES = [
    { icon:'📄', title:'50+ Premium Templates', desc:'Professional, creative, minimal, tech, elegant — every category covered. Real templates that actually look great.' },
    { icon:'🤖', title:'ATS Score Checker', desc:'Instantly see how well your resume will score with Applicant Tracking Systems. Real-time feedback as you type.' },
    { icon:'🎯', title:'Keyword Optimizer', desc:'Paste any job description, extract required keywords, and see exactly which ones your resume is missing.' },
    { icon:'⬇️', title:'PDF & JSON Export', desc:'Export your resume as a high-quality PDF ready for job applications, or save as JSON to continue later.' },
    { icon:'🎨', title:'Full Customizer', desc:'Colors, fonts, spacing, section headers, skill styles — every visual detail is yours to control.' },
    { icon:'🔒', title:'100% Private', desc:'Everything runs in your browser. Your data never leaves your device. No account required. Zero tracking.' },
  ]
  const STEPS = [
    { n:'01', icon:'👤', title:'Fill Your Details', desc:'Work through 9 sections — personal info, experience, skills, projects and more.' },
    { n:'02', icon:'🎨', title:'Pick a Template', desc:'Choose from 50+ templates and customize colors, fonts, and layout to match your style.' },
    { n:'03', icon:'🤖', title:'Check ATS Score', desc:'Get instant feedback on how well your resume reads to automated screening systems.' },
    { n:'04', icon:'⬇️', title:'Export & Apply', desc:'Download as PDF instantly. No watermarks, no sign-up, no charge — completely free.' },
  ]
  const FAQS = [
    { q:'Is ResumeForge free?', a:'Yes — completely free. No account, no hidden fees, no watermarks. Export unlimited PDFs at no cost.' },
    { q:'Does it store my data anywhere?', a:'Never. Everything runs entirely in your browser. Your resume data never reaches any server. It\'s stored only in your browser\'s localStorage — private and offline-capable.' },
    { q:'What makes these templates ATS-friendly?', a:'ATS systems prefer clean HTML structures, standard section headings, no tables or columns, and proper contact info. Our templates are built with these constraints in mind.' },
    { q:'Can I save and come back later?', a:'Yes. Your progress is automatically saved to your browser\'s localStorage every time you make a change. Just revisit the same browser to continue.' },
    { q:'What export formats are available?', a:'Currently PDF and JSON. PDF is print-ready and job-application-ready. JSON lets you save and restore your resume data across browsers.' },
    { q:'How does the ATS score work?', a:'We check for completeness of key fields (email, phone, summary, experience, skills, education, LinkedIn) and weight them by importance to automated screening systems.' },
  ]

  const [openFaq, setOpenFaq] = useState(null);

  // Mini template thumbnails for showcase
  const showcaseTemplates = Object.entries(TEMPLATES).slice(0, 12)

  return (
    <div id="rf-landing" className="rf-root">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* NAV */}
      <nav className="rf-nav">
        <div className="rf-logo">
          <span className="rf-logo-badge">RF</span>
          ResumeForge
        </div>
        <div className="rf-nav-right">
          <ul className="rf-nav-links">
            {[['Features','rf-features'],['How It Works','rf-how'],['Templates','rf-templates'],['ATS Checker','rf-ats'],['FAQ','rf-faq']].map(([lbl,id]) => (
              <li key={id}><a href={`#${id}`} onClick={e=>{e.preventDefault();document.getElementById(id)?.scrollIntoView({behavior:'smooth'})}}>{lbl}</a></li>
            ))}
          </ul>
          <button className="rf-nav-cta" onClick={onStart}>
            Start Building →
          </button>
        </div>
      </nav>

      {/* HERO */}
      {/* Animated floating orbs — fixed background */}
      <div className="rf-animated-bg" aria-hidden="true">
        <div className="rf-orb" style={{ width:500, height:500, background:'#FF6B6B', top:'10%', left:'5%', animationDuration:'18s' }}/>
        <div className="rf-orb" style={{ width:350, height:350, background:'#FF8E53', top:'60%', right:'8%', animationDuration:'24s', animationDelay:'-8s' }}/>
        <div className="rf-orb" style={{ width:280, height:280, background:'#4ECDC4', bottom:'15%', left:'35%', animationDuration:'20s', animationDelay:'-4s' }}/>
        <div className="rf-orb" style={{ width:200, height:200, background:'#A78BFA', top:'35%', right:'30%', animationDuration:'15s', animationDelay:'-12s' }}/>
      </div>
      <section className="rf-hero">
        <div className="rf-hero-grid" aria-hidden="true" />
        <div className="rf-glow" aria-hidden="true" />
        <div className="rf-glow2" aria-hidden="true" />
        <div className="rf-hero-content">
          <div className="rf-badge">⚡ Free Resume Builder — No Sign-Up Required</div>
          <h1>
            Build Resumes That<br />
            <span className="acc">Get You Hired.</span>
          </h1>
          <p className="rf-hero-sub">
            50+ ATS-optimized templates, real-time preview, keyword optimizer, and PDF export — all free, all in your browser, all in under 5 minutes.
          </p>
          <div className="rf-hero-btns">
            <button className="rf-btn-primary" onClick={onStart}>
              <span>Start Building Free</span>
              <span aria-hidden="true">⚡</span>
            </button>
            <button className="rf-btn-ghost" onClick={() => document.getElementById('rf-templates')?.scrollIntoView({ behavior:'smooth' })}>
              <span>Browse Templates</span>
              <span aria-hidden="true">↓</span>
            </button>
          </div>
          <div className="rf-stats">
            {[['50+','Templates'],['9','Sections'],['ATS','Checker'],['PDF','Export']].map(([n,l]) => (
              <div className="rf-stat" key={l}>
                <div className="rf-stat-n">{n}</div>
                <div className="rf-stat-l">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="rf-sec rf-bg2" id="rf-features">
        <div className="rf-sec-inner">
          <div className="rf-sec-label">✦ Why ResumeForge</div>
          <h2 className="rf-sec-title">Everything You Need to Land the Job</h2>
          <p className="rf-sec-sub">Built for developers, designers, MBAs, and everyone in between.</p>
          <div className="rf-features">
            {FEATURES.map((f, i) => (
              <article className="rf-feat" key={i}>
                <div className="rf-feat-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="rf-sec" id="rf-how">
        <div className="rf-sec-inner">
          <div className="rf-sec-label">◎ Process</div>
          <h2 className="rf-sec-title">Ready in 5 Minutes</h2>
          <p className="rf-sec-sub">Four simple steps from blank page to job-ready PDF.</p>
          <div className="rf-steps">
            {STEPS.map((s, i) => (
              <div className="rf-step" key={i}>
                <div className="rf-step-n">{s.n}</div>
                <div className="rf-step-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEMPLATE SHOWCASE */}
      <section className="rf-sec rf-bg2" id="rf-templates">
        <div className="rf-sec-inner">
          <div className="rf-sec-label">🎨 50+ Templates</div>
          <h2 className="rf-sec-title">A Template for Every Role</h2>
          <p className="rf-sec-sub">Professional, creative, minimal, tech, elegant, India-specific — pick your style.</p>
          <div className="rf-tmpl-scroll">
            {showcaseTemplates.map(([key, tmpl]) => (
              <div className="rf-tmpl-thumb" key={key} onClick={onStart}>
                <div className="rf-tmpl-thumb-preview" style={{ background: '#fff', position: 'relative', height: 140 }}>
                  <div style={{ transform: 'scale(0.25)', transformOrigin: 'top left', width: 794, pointerEvents: 'none', position: 'absolute', top: 0, left: 0 }}>
                    {renderTemplate(key, SAMPLE_RESUME, { sectionSpacing: 'compact' })}
                  </div>
                </div>
                <div className="rf-tmpl-thumb-label">
                  <p>{tmpl.name}</p>
                  <span>{tmpl.cat}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button className="rf-btn-primary" onClick={onStart} style={{ display: 'inline-flex' }}>
              <span>See All 50 Templates →</span>
            </button>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="rf-sec rf-bg2" id="rf-usecases">
        <div className="rf-sec-inner">
          <div className="rf-sec-label">◻ Who It&apos;s For</div>
          <h2 className="rf-sec-title">Built for Every Professional</h2>
          <p className="rf-sec-sub">Whether you&apos;re a fresh grad or a seasoned executive, there&apos;s a template for you.</p>
          <div className="rf-features" style={{ marginTop: '2.5rem' }}>
            {[
              { icon:'👨‍💻', tag:'Developers', color:'#4ECDC4', title:'Tech & Engineering', desc:'GitHub-style, terminal, dark mode, skill-first templates. Show your stack, projects, and open source contributions.' },
              { icon:'🎨', tag:'Design', color:'#A78BFA', title:'Designers & Creatives', desc:'Portfolio-first layouts, sidebar templates, and visual-heavy formats. Let your work speak loud.' },
              { icon:'📊', tag:'Business', color:'#F59E0B', title:'MBA & Management', desc:'Executive summary formats, KPI-focused layouts, and consulting-style templates trusted by B-school grads.' },
              { icon:'🎓', tag:'Students', color:'#34D399', title:'Fresh Graduates', desc:'Education-first, campus, and intern templates. Maximize limited experience with strong formatting.' },
              { icon:'🇮🇳', tag:'India', color:'#FF6B6B', title:'India Job Market', desc:'Naukri-style, Delhi formal, Mumbai pro, and Bengaluru tech templates optimized for Indian job portals.' },
              { icon:'🚀', tag:'Startups', color:'#60A5FA', title:'Startup & Product Roles', desc:'Modern, clean layouts that highlight product thinking, metrics, and fast career growth.' },
            ].map((u, i) => (
              <article className="rf-feat" key={i}>
                <div className="rf-feat-icon" style={{ background: `${u.color}18` }}>{u.icon}</div>
                <div style={{ display:'inline-block', padding:'2px 8px', borderRadius:99, fontSize:'0.7rem', fontWeight:700, background:`${u.color}15`, color:u.color, marginBottom:'0.6rem', letterSpacing:'0.05em' }}>{u.tag}</div>
                <h3>{u.title}</h3>
                <p>{u.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HOW ATS WORKS */}
      <section className="rf-sec" id="rf-ats">
        <div className="rf-sec-inner" style={{ display:'flex', gap:'4rem', alignItems:'center', flexWrap:'wrap' }}>
          <div style={{ flex: '1 1 320px' }}>
            <div className="rf-sec-label">🤖 ATS Intelligence</div>
            <h2 className="rf-sec-title">Beat the Bots Before They Read Your Resume</h2>
            <p className="rf-sec-sub">Over 75% of resumes are rejected by ATS before a human ever sees them. ResumeForge&apos;s real-time ATS checker tells you exactly how to fix it.</p>
            <div style={{ marginTop:'2rem', display:'flex', flexDirection:'column', gap:'1rem' }}>
              {[
                { icon:'📧', text:'Checks for email, phone, location, LinkedIn' },
                { icon:'📝', text:'Scores your professional summary quality' },
                { icon:'💼', text:'Verifies work experience is properly listed' },
                { icon:'⚡', text:'Validates skills section completeness' },
                { icon:'🎓', text:'Checks education formatting' },
              ].map((item,i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
                  <span style={{ fontSize:'1.2rem' }}>{item.icon}</span>
                  <span style={{ color:'#9494aa', fontSize:'0.9rem' }}>{item.text}</span>
                </div>
              ))}
            </div>
            <button className="rf-btn-primary" onClick={onStart} style={{ marginTop:'2rem', display:'inline-flex' }}>Check My ATS Score →</button>
          </div>
          <div style={{ flex:'1 1 300px' }}>
            <div style={{ background:'#0e0e1a', border:'1px solid rgba(255,107,107,0.2)', borderRadius:16, padding:'1.5rem', fontFamily:"'DM Mono',monospace" }}>
              <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:'1.2rem' }}>
                {['#FF5F57','#FFBD2E','#28CA41'].map((c,i)=><span key={i} style={{width:10,height:10,borderRadius:'50%',background:c,display:'inline-block'}}/>)}
                <span style={{ color:'rgba(255,255,255,0.3)', fontSize:'0.75rem', marginLeft:8 }}>ats_checker.js</span>
              </div>
              {[
                { label:'✅ Email address', score:'+12', color:'#4ECDC4' },
                { label:'✅ Phone number', score:'+10', color:'#4ECDC4' },
                { label:'✅ Professional summary', score:'+15', color:'#4ECDC4' },
                { label:'✅ Work experience listed', score:'+20', color:'#4ECDC4' },
                { label:'⚠️ LinkedIn profile missing', score:'+0', color:'#F59E0B' },
                { label:'✅ Skills section filled', score:'+13', color:'#4ECDC4' },
                { label:'✅ PDF format (ATS-safe)', score:'+10', color:'#4ECDC4' },
              ].map((item,i) => (
                <div key={i} style={{ display:'flex', justifyContent:'space-between', marginBottom:'0.6rem', fontSize:'0.8rem' }}>
                  <span style={{ color: item.color }}>{item.label}</span>
                  <span style={{ color: item.color, fontWeight:700 }}>{item.score}</span>
                </div>
              ))}
              <div style={{ borderTop:'1px solid rgba(255,255,255,0.1)', marginTop:'1rem', paddingTop:'1rem', display:'flex', justifyContent:'space-between' }}>
                <span style={{ color:'rgba(255,255,255,0.5)', fontSize:'0.85rem' }}>Total ATS Score</span>
                <span style={{ color:'#FF6B6B', fontSize:'1.1rem', fontWeight:800 }}>80/100</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="rf-sec rf-bg2" id="rf-faq">
        <div className="rf-sec-inner">
          <div style={{ textAlign: 'center' }}>
            <div className="rf-sec-label">❓ FAQ</div>
            <h2 className="rf-sec-title">Common Questions</h2>
            <p className="rf-sec-sub" style={{ margin:'0 auto' }}>Everything you need to know about ResumeForge.</p>
          </div>
          <div className="rf-faq-list">
            {FAQS.map((f, i) => (
              <div className={`rf-faq-item ${openFaq === i ? 'open' : ''}`} key={i}>
                <div 
                  className="rf-faq-q" 
                  role="button" 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  tabIndex={0}
                >
                  {f.q}
                  <span className="rf-faq-arrow" aria-hidden="true">⌄</span>
                </div>
                <div className="rf-faq-a">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRIVACY SECTION */}
      <section className="rf-sec" id="rf-privacy">
        <div className="rf-sec-inner" style={{ display:'flex', gap:'3rem', alignItems:'center', flexWrap:'wrap' }}>
          <div style={{ flex:'1 1 200px', textAlign:'center' }}>
            <div style={{ fontSize:'4rem', marginBottom:'1rem' }}>🔒</div>
            <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:'1.3rem', fontWeight:800, marginBottom:'0.5rem' }}>Zero Data Stored</h3>
            <p style={{ color:'#9494aa', fontSize:'0.9rem', lineHeight:1.6 }}>No servers. No databases. Nothing leaves your browser.</p>
          </div>
          <div style={{ flex:'1 1 200px', textAlign:'center' }}>
            <div style={{ fontSize:'4rem', marginBottom:'1rem' }}>🚫</div>
            <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:'1.3rem', fontWeight:800, marginBottom:'0.5rem' }}>No Sign-Up Ever</h3>
            <p style={{ color:'#9494aa', fontSize:'0.9rem', lineHeight:1.6 }}>No account, no email, no verification. Just open and build.</p>
          </div>
          <div style={{ flex:'1 1 200px', textAlign:'center' }}>
            <div style={{ fontSize:'4rem', marginBottom:'1rem' }}>💾</div>
            <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:'1.3rem', fontWeight:800, marginBottom:'0.5rem' }}>Auto-Saves Locally</h3>
            <p style={{ color:'#9494aa', fontSize:'0.9rem', lineHeight:1.6 }}>Your progress is saved to localStorage. Come back anytime.</p>
          </div>
          <div style={{ flex:'1 1 200px', textAlign:'center' }}>
            <div style={{ fontSize:'4rem', marginBottom:'1rem' }}>🌐</div>
            <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:'1.3rem', fontWeight:800, marginBottom:'0.5rem' }}>Works Offline</h3>
            <p style={{ color:'#9494aa', fontSize:'0.9rem', lineHeight:1.6 }}>Once loaded, build your resume without internet. Export anytime.</p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ background: 'linear-gradient(135deg, rgba(255,107,107,.1), rgba(255,142,83,.06))', borderTop: '1px solid rgba(255,107,107,.18)', padding: '5rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'0.35rem 1rem', background:'rgba(255,107,107,0.1)', border:'1px solid rgba(255,107,107,0.25)', borderRadius:99, fontSize:'0.72rem', fontWeight:600, color:'#FF6B6B', letterSpacing:'0.05em', marginBottom:'1.5rem', fontFamily:"'DM Mono',monospace" }}>
            <span style={{width:6,height:6,borderRadius:'50%',background:'#FF6B6B',display:'inline-block'}}/>
            Free · No Login · Ready in 5 Minutes
          </div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 800, letterSpacing: '-.04em', marginBottom: '1rem', lineHeight:1.1 }}>
            Your next job starts with<br/>a great resume.
          </h2>
          <p style={{ color: '#9494aa', fontSize: '1.05rem', marginBottom: '2.5rem', lineHeight: 1.75 }}>
            50+ templates, ATS checker, keyword optimizer, PDF export.<br/>All free. All private. No catch.
          </p>
          <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap' }}>
            <button className="rf-btn-primary" onClick={onStart} style={{ fontSize: '1rem', padding: '0.9rem 2.2rem' }}>
              Build My Resume Free ⚡
            </button>
            <a href="#rf-templates" className="rf-btn-ghost">Browse Templates →</a>
          </div>
        </div>
      </section>

      <footer className="rf-footer">
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="rf-footer-logo"><span>RF</span> ResumeForge</div>
          <p style={{ color: '#6b6b85', fontSize: '.85rem', margin: '.5rem 0 1.5rem' }}>Build resumes that get you hired. Free forever.</p>
          <ul className="rf-footer-links">
          {[['Features','rf-features'],['How It Works','rf-how'],['Templates','rf-templates'],['ATS Checker','rf-ats'],['FAQ','rf-faq']].map(lbl => <li key={lbl[0]}><a href={`#${lbl[1]}`} onClick={e=>{e.preventDefault();document.getElementById(lbl[1])?.scrollIntoView({behavior:'smooth'})}}>{lbl[0]}</a></li>)}
        </ul>
          <p className="rf-footer-copy">100% client-side · No server · No tracking · No ads · Made with ❤️</p>
        </div>
      </footer>
    </div>
  )
}

// ─── EDITOR SECTION RENDERER ──────────────────────────────────────────────────
function renderEditor(id, data, store, dark) {
  const p = { data, store, dark }
  switch (id) {
    case 'personal':       return <PersonalEditor {...p} />
    case 'experience':     return <ExperienceEditor {...p} />
    case 'education':      return <EducationEditor {...p} />
    case 'skills':         return <SkillsEditor {...p} />
    case 'projects':       return <ProjectsEditor {...p} />
    case 'certifications': return <CertsEditor {...p} />
    case 'languages':      return <LanguagesEditor {...p} />
    case 'awards':         return <AwardsEditor {...p} />
    case 'social':         return <SocialEditor {...p} />
    default: return null
  }
}

// ─── BUILDER ─────────────────────────────────────────────────────────────────
function Builder({ onBack }) {
  const store = useResumeStore()
  const { resumeData, data, setData, custom, setCustom, template, setTemplate, hydrated, savedMsg, canUndo, canRedo, undo, redo, clearData } = store
  const [secIdx, setSecIdx]         = useState(0)
  const [mode, setMode]             = useState('edit')
  const [custTab, setCustTab]       = useState('templates')
  const [tmplFilter, setTmplFilter] = useState('All')
  const [zoom, setZoom]             = useState(0.68)
  const [isExporting, setIsExporting] = useState(false)
  const [showATS, setShowATS]       = useState(false)
  const [showKeyword, setShowKeyword] = useState(false)
  const dark = true
  // Fix: Memoize heavy calculations to prevent lag while typing
  const ats = useMemo(() => checkATS(data), [data])
  const progress = useMemo(() => calcProgress(data), [data])

  // Helper to reorder items (can be passed to editors)
  const moveItem = useCallback((section, index, direction) => {
    const newItems = [...data[section]]
    const targetIndex = index + direction
    if (targetIndex < 0 || targetIndex >= newItems.length) return
    [newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]]
    setData({ ...data, [section]: newItems })
  }, [data, setData])

  const sec      = EDITOR_SECTIONS[secIdx]
  const T = dark ? {
    bg:'#0B0B0C', surf:'#111113', card:'#18181B',
    brd:'rgba(255,255,255,0.08)', brd2:'rgba(255,255,255,0.14)',
    txt:'#F0F4FF', mut:'rgba(255,255,255,0.75)', sub:'rgba(255,255,255,0.06)',
  } : {
    bg:'#F4F6FA', surf:'#FFFFFF', card:'#FFFFFF',
    brd:'rgba(0,0,0,0.09)', brd2:'rgba(0,0,0,0.15)',
    txt:'#111827', mut:'#6B7280', sub:'rgba(0,0,0,0.04)',
  }

  // Ctrl+scroll zoom — prevent browser zoom, use our zoom instead
  useEffect(() => {
    const preventBrowserZoom = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault()
        const delta = e.deltaY > 0 ? -0.05 : 0.05
        setZoom(z => Math.max(0.3, Math.min(1.4, +(z + delta).toFixed(2))))
      }
    }
    // Must be on document with passive:false to override browser behavior
    document.addEventListener('wheel', preventBrowserZoom, { passive: false })
    return () => document.removeEventListener('wheel', preventBrowserZoom)
  }, [])

  useEffect(() => {
    const h = (e) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key==='z'&&!e.shiftKey) { e.preventDefault(); undo() }
        if (e.key==='y'||(e.key==='z'&&e.shiftKey)) { e.preventDefault(); redo() }
        // Ctrl +/- for zoom
        if (e.key==='=' || e.key==='+') { e.preventDefault(); setZoom(z => Math.min(1.4, +(z+0.1).toFixed(2))) }
        if (e.key==='-') { e.preventDefault(); setZoom(z => Math.max(0.3, +(z-0.1).toFixed(2))) }
      }
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [undo, redo])

  const exportPDF = async () => {
    setIsExporting(true)
    let wrapper
    try {
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([import('html2canvas'), import('jspdf')])
      const el = document.getElementById('resume-preview')
      if (!el) return

      // Create off-screen container at FULL scale (no zoom transform)
      wrapper = document.createElement('div')
      wrapper.style.cssText = [
        'position:absolute',
        'top:0',
        'position:fixed',
        'top:0', 
        'left:-9999px',
        'width:794px',
        'min-height:1123px',
        'background:#ffffff',
        'z-index:-1000',
        'overflow:visible',
        'transform:none !important',
      ].join(';')

      // Deep-clone the resume element
      const clone = el.cloneNode(true)
      // Strip any inline transforms that might be on this element
      clone.style.transform = 'none'
      clone.style.width = '794px'
      clone.style.overflow = 'visible'
      wrapper.appendChild(clone)
      document.body.appendChild(wrapper)

      // Wait for layout + web fonts
      await new Promise(r => setTimeout(r, 200))

      const canvas = await html2canvas(wrapper, {
        scale: 2.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: 794,
        height: wrapper.scrollHeight || 1123,
        scrollX: 0,
        scrollY: 0,
        windowWidth: 794,
        windowHeight: wrapper.scrollHeight || 1123,
        x: 0,
        y: 0,
        ignoreElements: el => el.classList?.contains('rf-animated-bg'),
      })

      wrapper.remove()
      wrapper = null

      const pdf = new jsPDF({ orientation:'portrait', unit:'mm', format:'a4' })
      const pdfW = 210
      const pdfH = 297
      const imgH = pdfW * (canvas.height / canvas.width)

      if (imgH <= pdfH) {
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, pdfW, imgH)
      } else {
        // Slice into A4 pages
        const pxPerPage = Math.floor(canvas.width * (pdfH / pdfW))
        let y = 0
        while (y < canvas.height) {
          if (y > 0) pdf.addPage()
          const h = Math.min(pxPerPage, canvas.height - y)
          const pg = document.createElement('canvas')
          pg.width = canvas.width
          pg.height = h
          pg.getContext('2d').drawImage(canvas, 0, y, canvas.width, h, 0, 0, canvas.width, h)
          pdf.addImage(pg.toDataURL('image/png'), 'PNG', 0, 0, pdfW, h * pdfW / canvas.width)
          y += pxPerPage
        }
      }
      pdf.save(`${data.personal.firstName||'Resume'}_${data.personal.lastName||'CV'}.pdf`)
    } catch (err) {
      console.error('PDF export error:', err)
      alert('Export failed. Please try again.')
    } finally {
      wrapper?.remove()
      setIsExporting(false)
    }
  }

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(resumeData,null,2)],{type:'application/json'})
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'resume_data.json'; a.click()
  }

  const clearResumeData = () => {
    if (!window.confirm('Clear all resume data saved in this browser?')) return
    clearData()
  }

  const addKwSkill = useCallback(name => {
    setData(d => ({ ...d, skills: d.skills.map((c,i) => i===0 ? {...c,skills:[...c.skills,{name,level:70}]} : c) }))
  }, [setData])

  const isFilled = (id) => {
    if (id==='personal') return data.personal.firstName||data.personal.email
    if (id==='experience') return data.experience.some(e=>e.company)
    if (id==='education') return data.education.some(e=>e.institution)
    if (id==='skills') return data.skills.some(s=>s.skills.length)
    if (id==='projects') return data.projects.some(p=>p.name)
    if (id==='certifications') return data.certifications.some(c=>c.name)
    if (id==='languages') return data.languages.some(l=>l.language)
    if (id==='awards') return data.awards.some(a=>a.title)
    if (id==='social') return Object.values(data.social||{}).some(v=>v)
    return false
  }

  if (!hydrated) return (
    <div style={{height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#0B0B0C'}}>
      <div style={{textAlign:'center'}}>
        <div style={{width:48,height:48,borderRadius:16,background:'linear-gradient(135deg,#FF6B6B,#FF8E53)',margin:'0 auto 12px',animation:'pulse 1.5s ease-in-out infinite'}}/>
        <p style={{color:'rgba(255,255,255,0.3)',fontSize:14}}>Loading ResumeForge…</p>
      </div>
    </div>
  )

  const filteredTemplates = Object.entries(TEMPLATES).filter(([,t]) => tmplFilter === 'All' || t.cat === tmplFilter)

  return (
    <div style={{height:'100vh',display:'flex',flexDirection:'column',overflow:'hidden',background:T.bg,fontFamily:'system-ui,sans-serif',color:T.txt}}>

      {/* ── TOP NAVBAR ─────────────────────────────────────────────────────── */}
      <header style={{height:54,flexShrink:0,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 16px',background:dark?'#101012':'#FFFFFF',borderBottom:`1px solid ${T.brd}`,zIndex:50}}>
        {/* Left: Logo + back */}
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <button onClick={onBack} style={{width:30,height:30,borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',background:T.sub,border:`1px solid ${T.brd}`,color:T.mut,fontSize:14,cursor:'pointer'}} title="Back to home">←</button>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <div style={{width:30,height:30,borderRadius:10,background:'linear-gradient(135deg,#FF6B6B,#FF8E53)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:800,color:'#fff',boxShadow:'0 3px 12px rgba(255,107,107,0.35)'}}>RF</div>
            <span style={{fontSize:13,fontWeight:700,color:T.txt}}>ResumeForge</span>
            {savedMsg && <span style={{fontSize:10,color:'#4ECDC4',fontWeight:600}}>✓ saved</span>}
          </div>
        </div>

        {/* Center: Edit / Customize toggle */}
        <div style={{display:'flex',alignItems:'center',gap:3,padding:4,borderRadius:14,background:T.sub,border:`1px solid ${T.brd}`}}>
          {[['edit','✏️','Edit'],['customize','🎨','Customize']].map(([m,icon,label]) => (
            <button key={m} onClick={() => setMode(m)}
              style={{display:'flex',alignItems:'center',gap:6,padding:'6px 18px',borderRadius:10,fontSize:13,fontWeight:700,transition:'all .15s',
                background: mode===m ? 'linear-gradient(135deg,#FF6B6B,#FF8E53)' : 'none',
                color: mode===m ? '#fff' : T.mut,
                boxShadow: mode===m ? '0 2px 10px rgba(255,107,107,0.35)' : 'none',
              }}>
              {icon} {label}
            </button>
          ))}
        </div>

        {/* Right: actions */}
        <div style={{display:'flex',alignItems:'center',gap:6}}>
          {[['↩',undo,!canUndo,'Ctrl+Z'],['↪',redo,!canRedo,'Ctrl+Y']].map(([icon,fn,dis,title]) => (
            <button key={icon} onClick={fn} disabled={dis} title={title}
              style={{width:30,height:30,borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',background:T.sub,border:`1px solid ${T.brd}`,color:T.mut,fontSize:13,cursor:'pointer',opacity:dis?.3:1}}>
              {icon}
            </button>
          ))}
          <button onClick={() => setShowATS(true)} style={{display:'flex',alignItems:'center',gap:5,padding:'5px 10px',borderRadius:8,background:'rgba(255,107,107,0.1)',border:'1px solid rgba(255,107,107,0.25)',color:'#FF6B6B',fontSize:11,fontWeight:700,cursor:'pointer'}}>
            🤖 ATS {ats.score}
          </button>
          <button onClick={() => setShowKeyword(true)} style={{display:'flex',alignItems:'center',gap:5,padding:'5px 10px',borderRadius:8,background:'rgba(78,205,196,0.1)',border:'1px solid rgba(78,205,196,0.25)',color:'#4ECDC4',fontSize:11,fontWeight:700,cursor:'pointer'}}>
            🎯 Keywords
          </button>
          <button onClick={exportJSON} style={{padding:'5px 10px',borderRadius:8,background:T.sub,border:`1px solid ${T.brd}`,color:T.mut,fontSize:11,fontWeight:600,cursor:'pointer'}}>JSON</button>
          <button onClick={clearResumeData} style={{padding:'5px 10px',borderRadius:8,background:'rgba(239,68,68,0.1)',border:'1px solid rgba(239,68,68,0.25)',color:'#ef4444',fontSize:11,fontWeight:700,cursor:'pointer'}}>Clear Data</button>
          <button onClick={exportPDF} disabled={isExporting}
            style={{display:'flex',alignItems:'center',gap:6,padding:'7px 16px',borderRadius:10,background:'linear-gradient(135deg,#FF6B6B,#FF8E53)',color:'#fff',fontSize:13,fontWeight:700,cursor:'pointer',boxShadow:'0 3px 14px rgba(255,107,107,0.4)',transition:'all .15s',opacity:isExporting?.6:1}}>
            {isExporting?'⏳':'⬇️'} <span>{isExporting?'Exporting…':'Export PDF'}</span>
          </button>
        </div>
      </header>

      {/* ── MAIN SHELL ──────────────────────────────────────────────────────── */}
      <div style={{display:'flex',flex:1,overflow:'hidden'}}>

        {/* ══ LEFT PANEL 50% — EDITOR ═════════════════════════════════════════ */}
        <div style={{width:'50%',flexShrink:0,display:'flex',flexDirection:'column',borderRight:`1px solid ${T.brd}`,background:T.surf}}>

          {/* ── EDIT MODE ─────────────────────────────────────────────────── */}
          {mode === 'edit' && (
            <>
              {/* Score bar */}
              <div style={{flexShrink:0,padding:'12px 16px 10px',borderBottom:`1px solid ${T.brd}`}}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:6}}>
                  <div style={{display:'flex',alignItems:'center',gap:8}}>
                    <div style={{minWidth:40,height:26,borderRadius:13,display:'flex',alignItems:'center',justifyContent:'center',padding:'0 8px',fontSize:11,fontWeight:800,color:'#fff',background:progress>=60?'linear-gradient(135deg,#22c55e,#16a34a)':'linear-gradient(135deg,#FF6B6B,#FF8E53)'}}>
                      {progress}%
                    </div>
                    <span style={{fontSize:13,fontWeight:700,color:T.mut}}>Resume score</span>
                  </div>
                  <button onClick={() => setShowATS(true)} style={{fontSize:11,fontWeight:700,color:'#FF6B6B',background:'none',border:'none',cursor:'pointer'}}>
                    ATS: {ats.score}/100 →
                  </button>
                </div>
                <div style={{height:3,borderRadius:99,background:T.sub,overflow:'hidden'}}>
                  <div style={{height:'100%',borderRadius:99,transition:'width .6s',width:`${progress}%`,background:progress>=60?'linear-gradient(90deg,#22c55e,#16a34a)':'linear-gradient(90deg,#FF6B6B,#FF8E53)'}}/>
                </div>
              </div>

              {/* Section pills */}
              <div style={{flexShrink:0,padding:'8px 12px',borderBottom:`1px solid ${T.brd}`}}>
                <div style={{display:'flex',gap:5,overflowX:'auto',paddingBottom:2}} className="hide-scrollbar">
                  {EDITOR_SECTIONS.map((s,i) => {
                    const filled = isFilled(s.id)
                    const active = i === secIdx
                    return (
                      <button key={s.id} onClick={() => setSecIdx(i)}
                        style={{flexShrink:0,display:'flex',alignItems:'center',gap:5,padding:'5px 11px',borderRadius:20,fontSize:11,fontWeight:700,whiteSpace:'nowrap',transition:'all .15s',cursor:'pointer',
                          background: active ? `${s.color}20` : filled ? 'rgba(78,205,196,0.08)' : T.sub,
                          color: active ? s.color : filled ? '#4ECDC4' : T.mut,
                          border: active ? `1.5px solid ${s.color}50` : filled ? '1px solid rgba(78,205,196,0.25)' : `1px solid ${T.brd}`,
                          boxShadow: active ? `0 2px 8px ${s.color}25` : 'none',
                        }}>
                        {filled && !active ? <span style={{fontSize:9}}>✓</span> : <span style={{fontSize:13}}>{s.icon}</span>}
                        {s.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Section heading */}
              <div style={{flexShrink:0,padding:'14px 20px 12px',borderBottom:`1px solid ${T.brd}`,display:'flex',alignItems:'center',gap:12}}>
                <div style={{width:38,height:38,borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,background:`${sec.color}18`,border:`1.5px solid ${sec.color}30`,flexShrink:0}}>
                  {sec.icon}
                </div>
                <div>
                  <h2 style={{margin:0,fontSize:16,fontWeight:700,color:T.txt}}>{sec.label}</h2>
                  <p style={{margin:0,fontSize:11,color:T.mut}}>Section {secIdx+1} of {EDITOR_SECTIONS.length}</p>
                </div>
                {isFilled(sec.id) && (
                  <span style={{marginLeft:'auto',padding:'3px 10px',borderRadius:20,fontSize:10,fontWeight:700,color:'#4ECDC4',background:'rgba(78,205,196,0.1)',border:'1px solid rgba(78,205,196,0.25)'}}>✓ Filled</span>
                )}
              </div>

              {/* Form */}
              <div style={{flex:1,overflowY:'auto',padding:'20px',scrollbarWidth:'thin'}}>
                {renderEditor(sec.id, data, store, dark)}
              </div>

              {/* Bottom nav */}
              <div style={{flexShrink:0,padding:'12px 16px',borderTop:`1px solid ${T.brd}`,background:dark?'#101012':'#FAFAFA',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <button onClick={() => setSecIdx(i => Math.max(0,i-1))} disabled={secIdx===0}
                  style={{padding:'8px 18px',borderRadius:10,border:`1px solid ${T.brd}`,background:T.sub,color:T.mut,fontSize:13,fontWeight:600,cursor:'pointer',opacity:secIdx===0?.3:1,transition:'all .15s'}}>
                  ← Back
                </button>

                {/* Step dots — small! */}
                <div style={{display:'flex',alignItems:'center',gap:4}}>
                  {EDITOR_SECTIONS.map((s,i) => (
                    <button key={i} onClick={() => setSecIdx(i)}
                      style={{borderRadius:99,cursor:'pointer',border:'none',transition:'all .2s',
                        width: i===secIdx ? 14 : 4,
                        height: 4,
                        background: i===secIdx ? '#FF6B6B' : isFilled(s.id) ? '#4ECDC4' : T.brd,
                      }}/>
                  ))}
                </div>

                {secIdx === EDITOR_SECTIONS.length-1 ? (
                  <button onClick={exportPDF} disabled={isExporting}
                    style={{padding:'8px 18px',borderRadius:10,background:'linear-gradient(135deg,#FF6B6B,#FF8E53)',color:'#fff',fontSize:13,fontWeight:700,cursor:'pointer',boxShadow:'0 3px 12px rgba(255,107,107,0.35)',opacity:isExporting?.6:1}}>
                    {isExporting?'⏳ Exporting…':'⬇️ Export PDF'}
                  </button>
                ) : (
                  <button onClick={() => setSecIdx(i => i+1)}
                    style={{padding:'8px 18px',borderRadius:10,background:'linear-gradient(135deg,#FF6B6B,#FF8E53)',color:'#fff',fontSize:13,fontWeight:700,cursor:'pointer',boxShadow:'0 3px 12px rgba(255,107,107,0.35)',transition:'all .15s'}}>
                    Next: {EDITOR_SECTIONS[secIdx+1]?.label} →
                  </button>
                )}
              </div>
            </>
          )}

          {/* ── CUSTOMIZE MODE ────────────────────────────────────────────── */}
          {mode === 'customize' && (
            <>
              <div style={{flexShrink:0,borderBottom:`1px solid ${T.brd}`}}>
                <div style={{display:'flex',padding:'0 4px'}}>
                  {[['templates','🎨 Templates'],['style','⚙️ Style']].map(([t,label]) => (
                    <button key={t} onClick={() => setCustTab(t)}
                      style={{padding:'14px 20px',fontSize:13,fontWeight:700,transition:'all .15s',borderBottom:'2px solid',cursor:'pointer',
                        borderColor: custTab===t ? '#FF6B6B' : 'transparent',
                        color: custTab===t ? '#FF6B6B' : T.mut,
                        background: 'none',
                      }}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {custTab === 'templates' && (
                <div style={{flex:1,overflow:'hidden',display:'flex',flexDirection:'column'}}>
                  {/* Category filter */}
                  <div style={{flexShrink:0,padding:'10px 14px',borderBottom:`1px solid ${T.brd}`,display:'flex',gap:5,overflowX:'auto'}}>
                    {['All',...TEMPLATE_CATEGORIES].map(cat => (
                      <button key={cat} onClick={() => setTmplFilter(cat)}
                        style={{flexShrink:0,padding:'4px 12px',borderRadius:20,fontSize:11,fontWeight:700,cursor:'pointer',transition:'all .15s',
                          background: tmplFilter===cat ? '#FF6B6B' : T.sub,
                          color: tmplFilter===cat ? '#fff' : T.mut,
                          border: `1px solid ${tmplFilter===cat ? '#FF6B6B' : T.brd}`,
                        }}>
                        {cat}
                      </button>
                    ))}
                  </div>
                  {/* Template grid */}
                  <div style={{flex:1,overflowY:'auto',padding:'12px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                    {filteredTemplates.map(([key,tmpl]) => (
                      <button key={key} onClick={() => setTemplate(key)}
                        style={{borderRadius:14,overflow:'hidden',textAlign:'left',transition:'all .15s',cursor:'pointer',
                          border: template===key ? '2px solid #FF6B6B' : `1.5px solid ${T.brd}`,
                          background: T.card,
                          boxShadow: template===key ? '0 4px 20px rgba(255,107,107,0.2)' : 'none',
                          transform: template===key ? 'scale(1.02)' : 'scale(1)',
                        }}>
                        <div style={{height:120,overflow:'hidden',background:dark?'#18181B':'#F4F6FA',position:'relative'}}>
                          <div style={{transform:'scale(0.26)',transformOrigin:'top left',width:794,pointerEvents:'none',position:'absolute',top:0,left:0}}>
                            {renderTemplate(key, SAMPLE_RESUME, {sectionSpacing:'compact'})}
                          </div>
                          {template===key && (
                            <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(255,107,107,0.12)'}}>
                              <div style={{width:28,height:28,borderRadius:'50%',background:'#FF6B6B',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:14,fontWeight:700}}>✓</div>
                            </div>
                          )}
                        </div>
                        <div style={{padding:'7px 10px',background:template===key?'rgba(255,107,107,0.08)':T.card,borderTop:template===key?'1px solid rgba(255,107,107,0.2)':`1px solid ${T.brd}`}}>
                          <p style={{margin:0,fontSize:11,fontWeight:700,color:template===key?'#FF6B6B':T.txt,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{tmpl.name}</p>
                          <span style={{fontSize:9,color:T.mut}}>{tmpl.cat}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {custTab === 'style' && (
                <div style={{flex:1,overflowY:'auto',padding:'16px'}}>
                  <Customizer custom={custom} setCustom={setCustom} />
                </div>
              )}

              <div style={{flexShrink:0,padding:'12px',borderTop:`1px solid ${T.brd}`,background:dark?'#101012':'#FAFAFA'}}>
                <button onClick={() => setMode('edit')}
                  style={{width:'100%',padding:'11px',borderRadius:12,background:'linear-gradient(135deg,#FF6B6B,#FF8E53)',color:'#fff',fontSize:13,fontWeight:700,cursor:'pointer',boxShadow:'0 3px 14px rgba(255,107,107,0.3)'}}>
                  ✓ Done — Back to Editor
                </button>
              </div>
            </>
          )}
        </div>

        {/* ══ RIGHT PANEL 50% — PREVIEW ════════════════════════════════════════ */}
        <div style={{flex:1,display:'flex',flexDirection:'column',overflow:'hidden'}}>
          {/* Preview toolbar */}
          <div style={{flexShrink:0,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'8px 14px',background:T.surf,borderBottom:`1px solid ${T.brd}`}}>
            <div style={{display:'flex',alignItems:'center',gap:6}}>
              <span style={{fontSize:12,fontWeight:800,textTransform:'uppercase',letterSpacing:'.12em',color:T.mut,marginRight:4}}>Zoom</span>
              {[0.4,0.55,0.7,0.85].map(z => (
                <button key={z} onClick={() => setZoom(z)}
                  style={{padding:'4px 8px',borderRadius:7,fontSize:11,fontWeight:600,cursor:'pointer',transition:'all .15s',
                    background: Math.abs(zoom-z)<.01 ? '#FF6B6B' : T.sub,
                    color: Math.abs(zoom-z)<.01 ? '#fff' : T.mut,
                    border: `1px solid ${Math.abs(zoom-z)<.01 ? '#FF6B6B' : T.brd}`,
                    boxShadow: Math.abs(zoom-z)<.01 ? '0 2px 8px rgba(255,107,107,0.3)' : 'none',
                  }}>
                  {Math.round(z*100)}%
                </button>
              ))}
            </div>
            <div style={{display:'flex',alignItems:'center',gap:10}}>
              <span style={{fontSize:10,color:T.mut}}>Ctrl+Scroll to zoom</span>
              <div style={{display:'flex',alignItems:'center',gap:5}}>
                <div style={{width:6,height:6,borderRadius:'50%',background:TEMPLATES[template]?.color||'#FF6B6B'}}/>
                <span style={{fontSize:11,fontWeight:600,color:T.mut}}>{TEMPLATES[template]?.name}</span>
              </div>
            </div>
          </div>

          {/* Canvas — scroll to zoom, dotted bg */}
          <div
            style={{flex:1,overflow:'auto',display:'flex',alignItems:'flex-start',justifyContent:'center',padding:'40px 24px',
              background: dark?'#0B0B0C':'#E4E8F0',
              backgroundImage:`radial-gradient(circle, ${dark?'rgba(255,255,255,0.035)':'rgba(0,0,0,0.07)'} 1px, transparent 1px)`,
              backgroundSize:'22px 22px',
            }}>
            <div style={{transform:`scale(${zoom})`,transformOrigin:'top center',transition:'transform .2s ease'}}>
              <div style={{boxShadow:'0 6px 40px rgba(0,0,0,0.22)',borderRadius:3}}>
                {renderTemplate(template, data, custom)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODALS */}
      {showATS && <ATSModal atsResult={ats} onClose={() => setShowATS(false)} />}
      {showKeyword && <KeywordModal resumeData={data} onAddSkill={addKwSkill} onClose={() => setShowKeyword(false)} />}

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { scrollbar-width: none; }
      `}</style>
    </div>
  )
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function ResumePage() {
  const [started, setStarted] = useState(false)
  if (!started) return (
    <div style={{ position:'fixed', inset:0, overflowY:'auto', overflowX:'hidden', zIndex:9999, background:'#090910' }}>
      <LandingPage onStart={() => setStarted(true)} />
    </div>
  )
  return <Builder onBack={() => setStarted(false)} />
}
