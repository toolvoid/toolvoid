'use client'
import { useState } from 'react'
import { extractKeywordsFromJD, compareKeywords } from '../lib/utils'

// ─── ATS CHECKER MODAL ────────────────────────────────────────────────────────
export function ATSModal({ atsResult, onClose }) {
  const { score, tips } = atsResult
  const grade = score >= 90 ? { label:'Excellent', color:'#10B981', bg:'rgba(16,185,129,0.1)', border:'rgba(16,185,129,0.2)', msg:'Your resume will parse perfectly in virtually all ATS systems.' }
    : score >= 75 ? { label:'Good', color:'#3B82F6', bg:'rgba(59,130,246,0.1)', border:'rgba(59,130,246,0.2)', msg:'Strong resume — a few tweaks will push you to excellent.' }
    : score >= 55 ? { label:'Fair', color:'#F59E0B', bg:'rgba(245,158,11,0.1)', border:'rgba(245,158,11,0.2)', msg:'Some important fields are missing. Fill them in to improve.' }
    : { label:'Weak', color:'#EF4444', bg:'rgba(239,68,68,0.1)', border:'rgba(239,68,68,0.2)', msg:'Several critical fields are missing — add them to get past ATS screening.' }

  const passes = tips.filter(t => t.status === 'pass')
  const warns  = tips.filter(t => t.status === 'warn')
  const fails  = tips.filter(t => t.status === 'fail')

  return (
    <div style={{ position:'fixed', inset:0, zIndex:999, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(0,0,0,0.7)', backdropFilter:'blur(8px)', padding:16 }}
      onClick={onClose}>
      <div style={{ width:'100%', maxWidth:480, borderRadius:24, overflow:'hidden', background:'#0D1321', border:'1px solid rgba(255,255,255,0.1)', boxShadow:'0 24px 80px rgba(0,0,0,0.8)' }}
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'18px 22px 14px', borderBottom:'1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:32, height:32, borderRadius:10, background:'rgba(255,107,107,0.15)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16 }}>🤖</div>
            <div>
              <h3 style={{ margin:0, fontSize:14, fontWeight:700, color:'#F0F4FF' }}>ATS Compatibility Score</h3>
              <p style={{ margin:0, fontSize:11, color:'rgba(255,255,255,0.35)' }}>Applicant Tracking System analysis</p>
            </div>
          </div>
          <button onClick={onClose} style={{ width:28, height:28, borderRadius:8, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.45)', fontSize:14, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>✕</button>
        </div>

        <div style={{ padding:'20px 22px' }}>
          {/* Score hero */}
          <div style={{ display:'flex', alignItems:'center', gap:18, padding:'16px 18px', borderRadius:16, background:grade.bg, border:`1px solid ${grade.border}`, marginBottom:18 }}>
            {/* Score ring */}
            <div style={{ position:'relative', width:72, height:72, flexShrink:0 }}>
              <svg width="72" height="72" style={{ transform:'rotate(-90deg)' }}>
                <circle cx="36" cy="36" r="30" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6"/>
                <circle cx="36" cy="36" r="30" fill="none" stroke={grade.color} strokeWidth="6"
                  strokeDasharray={`${2 * Math.PI * 30}`}
                  strokeDashoffset={`${2 * Math.PI * 30 * (1 - score/100)}`}
                  strokeLinecap="round" style={{ transition:'stroke-dashoffset 1s ease' }}/>
              </svg>
              <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
                <span style={{ fontSize:18, fontWeight:800, color:grade.color, lineHeight:1 }}>{score}</span>
                <span style={{ fontSize:8, color:'rgba(255,255,255,0.4)', fontWeight:600 }}>/100</span>
              </div>
            </div>
            <div>
              <div style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'3px 10px', borderRadius:99, background:`${grade.color}20`, border:`1px solid ${grade.color}40`, marginBottom:5 }}>
                <div style={{ width:6, height:6, borderRadius:'50%', background:grade.color }}/>
                <span style={{ fontSize:11, fontWeight:700, color:grade.color }}>{grade.label}</span>
              </div>
              <p style={{ margin:0, fontSize:12, color:'rgba(255,255,255,0.65)', lineHeight:1.5 }}>{grade.msg}</p>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ marginBottom:18 }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
              <span style={{ fontSize:10, fontWeight:600, color:'rgba(255,255,255,0.4)', textTransform:'uppercase', letterSpacing:'0.08em' }}>Score Breakdown</span>
              <span style={{ fontSize:10, fontWeight:700, color:grade.color }}>{score}%</span>
            </div>
            <div style={{ height:6, borderRadius:99, background:'rgba(255,255,255,0.06)', overflow:'hidden' }}>
              <div style={{ height:'100%', borderRadius:99, background:`linear-gradient(90deg,${grade.color}aa,${grade.color})`, width:`${score}%`, transition:'width 1s ease' }}/>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', marginTop:4 }}>
              {[0,25,50,75,100].map(n => <span key={n} style={{ fontSize:9, color:'rgba(255,255,255,0.2)' }}>{n}</span>)}
            </div>
          </div>

          {/* Checks */}
          <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
            {tips.map((tip, i) => {
              const isPass = tip.status === 'pass'
              const isWarn = tip.status === 'warn'
              const clr = isPass ? '#10B981' : isWarn ? '#F59E0B' : '#EF4444'
              const bg = isPass ? 'rgba(16,185,129,0.07)' : isWarn ? 'rgba(245,158,11,0.07)' : 'rgba(239,68,68,0.07)'
              const icon = isPass ? '✓' : isWarn ? '!' : '✗'
              return (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:10, padding:'9px 12px', borderRadius:10, background:bg, border:`1px solid ${clr}18` }}>
                  <div style={{ width:20, height:20, borderRadius:6, background:`${clr}20`, border:`1px solid ${clr}35`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:800, color:clr, flexShrink:0 }}>{icon}</div>
                  <span style={{ fontSize:12, color:isPass ? 'rgba(255,255,255,0.75)' : isWarn ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.55)' }}>{tip.msg}</span>
                  {isPass && <span style={{ marginLeft:'auto', fontSize:9, fontWeight:700, color:clr, background:`${clr}15`, padding:'1px 6px', borderRadius:99 }}>+pts</span>}
                </div>
              )
            })}
          </div>

          {/* Stats row */}
          <div style={{ display:'flex', gap:8, marginTop:14 }}>
            {[
              { label:'Passed', count:passes.length, color:'#10B981' },
              { label:'Warnings', count:warns.length, color:'#F59E0B' },
              { label:'Missing', count:fails.length, color:'#EF4444' },
            ].map(s => (
              <div key={s.label} style={{ flex:1, textAlign:'center', padding:'10px 6px', borderRadius:12, background:`${s.color}0D`, border:`1px solid ${s.color}20` }}>
                <div style={{ fontSize:18, fontWeight:800, color:s.color }}>{s.count}</div>
                <div style={{ fontSize:9, color:'rgba(255,255,255,0.4)', fontWeight:600, marginTop:2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── KEYWORD OPTIMIZER MODAL ──────────────────────────────────────────────────
export function KeywordModal({ resumeData, onAddSkill, onClose }) {
  const [jd, setJd] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const analyze = () => {
    if (!jd.trim()) return
    setLoading(true)
    setTimeout(() => {
      const keywords = extractKeywordsFromJD(jd)
      const { present, missing, score } = compareKeywords(resumeData, keywords)
      setResult({ present, missing, score, total: keywords.length })
      setLoading(false)
    }, 400)
  }

  return (
    <div style={{ position:'fixed', inset:0, zIndex:999, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(0,0,0,0.7)', backdropFilter:'blur(8px)', padding:16 }}
      onClick={onClose}>
      <div style={{ width:'100%', maxWidth:520, maxHeight:'85vh', borderRadius:24, overflow:'hidden', background:'#0D1321', border:'1px solid rgba(255,255,255,0.1)', boxShadow:'0 24px 80px rgba(0,0,0,0.8)', display:'flex', flexDirection:'column' }}
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'18px 22px', borderBottom:'1px solid rgba(255,255,255,0.07)', flexShrink:0 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:32, height:32, borderRadius:10, background:'rgba(78,205,196,0.15)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16 }}>🎯</div>
            <div>
              <h3 style={{ margin:0, fontSize:14, fontWeight:700, color:'#F0F4FF' }}>Keyword Optimizer</h3>
              <p style={{ margin:0, fontSize:11, color:'rgba(255,255,255,0.35)' }}>Paste a job description to find missing keywords</p>
            </div>
          </div>
          <button onClick={onClose} style={{ width:28, height:28, borderRadius:8, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.45)', fontSize:14, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>✕</button>
        </div>

        <div style={{ flex:1, overflowY:'auto', padding:'18px 22px', display:'flex', flexDirection:'column', gap:14 }}>
          <div>
            <p style={{ margin:'0 0 8px', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:'rgba(255,255,255,0.4)' }}>Job Description</p>
            <textarea value={jd} onChange={e => setJd(e.target.value)}
              placeholder="Paste the full job description here…"
              style={{ width:'100%', height:110, borderRadius:12, border:'1px solid rgba(255,255,255,0.1)', background:'rgba(255,255,255,0.05)', padding:'10px 14px', fontSize:12, color:'#F0F4FF', outline:'none', resize:'none', lineHeight:1.6, boxSizing:'border-box' }}/>
          </div>

          <button onClick={analyze} disabled={!jd.trim() || loading}
            style={{ padding:'11px', borderRadius:12, background:'linear-gradient(135deg,#4ECDC4,#45B7D1)', color:'#fff', fontSize:13, fontWeight:700, cursor:'pointer', opacity:(!jd.trim()||loading)?.5:1, border:'none' }}>
            {loading ? '⏳ Analyzing…' : '🔍 Analyze Keywords'}
          </button>

          {result && (
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {/* Score */}
              <div style={{ display:'flex', alignItems:'center', gap:14, padding:'14px 16px', borderRadius:14, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ textAlign:'center' }}>
                  <div style={{ fontSize:24, fontWeight:800, color: result.score>=70?'#10B981':result.score>=40?'#F59E0B':'#EF4444' }}>{result.score}%</div>
                  <div style={{ fontSize:9, color:'rgba(255,255,255,0.35)', fontWeight:600 }}>MATCH</div>
                </div>
                <div>
                  <p style={{ margin:'0 0 3px', fontSize:13, fontWeight:700, color:'#F0F4FF' }}>Keyword Match Score</p>
                  <p style={{ margin:0, fontSize:11, color:'rgba(255,255,255,0.45)' }}>{result.present.length} of {result.total} keywords found in your resume</p>
                </div>
              </div>

              {result.present.length > 0 && (
                <div>
                  <p style={{ margin:'0 0 8px', fontSize:11, fontWeight:700, color:'#10B981' }}>✅ Already in your resume ({result.present.length})</p>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
                    {result.present.map((k,i) => <span key={i} style={{ padding:'3px 9px', borderRadius:20, background:'rgba(16,185,129,0.1)', border:'1px solid rgba(16,185,129,0.25)', color:'#6EE7B7', fontSize:11, fontWeight:600 }}>{k}</span>)}
                  </div>
                </div>
              )}

              {result.missing.length > 0 && (
                <div>
                  <p style={{ margin:'0 0 8px', fontSize:11, fontWeight:700, color:'#FF6B6B' }}>❌ Missing keywords — click to add to Skills</p>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
                    {result.missing.slice(0,16).map((k,i) => (
                      <button key={i} onClick={() => onAddSkill(k)}
                        style={{ padding:'4px 10px', borderRadius:20, background:'rgba(255,107,107,0.1)', border:'1px solid rgba(255,107,107,0.3)', color:'#FCA5A5', fontSize:11, fontWeight:600, cursor:'pointer', transition:'all .15s' }}
                        onMouseEnter={e => { e.currentTarget.style.background='rgba(255,107,107,0.22)'; e.currentTarget.style.transform='scale(1.05)' }}
                        onMouseLeave={e => { e.currentTarget.style.background='rgba(255,107,107,0.1)'; e.currentTarget.style.transform='scale(1)' }}>
                        + {k}
                      </button>
                    ))}
                  </div>
                  <p style={{ margin:'8px 0 0', fontSize:10, color:'rgba(255,255,255,0.3)' }}>Clicking a keyword adds it to your first skill category automatically.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}