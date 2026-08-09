'use client'
import Image from 'next/image'
import { TEMPLATES } from '../../lib/constants'

// ─── SHARED ───────────────────────────────────────────────────────────────────
const col = (c) => ({
  pri:   c.primaryColor    || '#1E2D4A',
  sec:   c.secondaryColor  || '#4A90D9',
  acc:   c.accentColor     || '#10B981',
  txt:   c.textColor       || '#111827',
  mut:   c.mutedColor      || '#6B7280',
  brd:   c.borderColor     || '#E5E7EB',
  bg:    c.backgroundColor || '#FFFFFF',
  hFont: c.headingFont     || 'Georgia, serif',
  bFont: c.bodyFont        || 'Arial, sans-serif',
  sp:    c.sectionSpacing==='compact' ? 8 : c.sectionSpacing==='spacious' ? 18 : 12,
})
const filt = {
  exp:  d => d.experience.filter(e => e.company),
  edu:  d => d.education.filter(e => e.institution),
  sk:   d => d.skills.filter(s => s.skills.length),
  proj: d => d.projects.filter(p => p.name),
  cert: d => d.certifications.filter(c => c.name),
  lang: d => d.languages.filter(l => l.language),
  aw:   d => d.awards.filter(a => a.title),
}
// Text wrapping — NO overflow:hidden on text elements (causes clipping)
const S = {
  wrap: { wordBreak:'break-word', overflowWrap:'break-word' },  // text nodes only
  flex: { minWidth: 0 },                                         // flex shrink helper
}
const SAFE = { ...S.wrap }  // safe for any text element
const lines = (desc, bullet, clr) =>
  desc?.split('\n').filter(Boolean).map((line,i) => (
    <p key={i} style={{margin:'2px 0',fontSize:9,paddingLeft:10,position:'relative',lineHeight:1.5,wordBreak:'break-word',overflowWrap:'break-word'}}>
      <span style={{position:'absolute',left:0,color:clr}}>{bullet||'•'}</span>
      {line.replace(/^[•\-▪→◦✓▶◆■›]\s*/,'')}
    </p>
  ))
const SH = ({t,c,s}) => {
  const base={fontFamily:'inherit',fontSize:9.5,fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',color:c.pri,margin:'0 0 6px 0',wordBreak:'break-word'}
  if(s==='underline') return <h2 style={{...base,borderBottom:`2px solid ${c.sec}`,paddingBottom:3}}>{t}</h2>
  if(s==='box') return <h2 style={{...base,background:c.pri,color:'#fff',padding:'3px 8px',borderRadius:2}}>{t}</h2>
  if(s==='badge') return <h2 style={{...base,background:c.sec+'22',color:c.sec,padding:'2px 8px',borderRadius:12,display:'inline-block'}}>{t}</h2>
  if(s==='colored-bar') return <h2 style={{...base,borderLeft:`3px solid ${c.sec}`,paddingLeft:6}}>{t}</h2>
  return <h2 style={base}>{t}</h2>
}
const Dots = ({sk,sty,c}) => {
  const pct=sk.level||0
  if(sty==='bars') return <div style={{width:55,height:3,background:c.brd,borderRadius:2,flexShrink:0}}><div style={{width:`${pct}%`,height:'100%',background:c.sec,borderRadius:2}}/></div>
  if(sty==='percentage') return <span style={{fontSize:8,color:c.mut,flexShrink:0,fontWeight:600}}>{pct}%</span>
  if(sty==='text') { const l=pct>=90?'Expert':pct>=70?'Advanced':pct>=50?'Intermediate':'Beginner'; return <span style={{fontSize:7.5,padding:'1px 5px',background:c.brd,borderRadius:8,color:c.txt,flexShrink:0}}>{l}</span> }
  const f=Math.round(pct/20)
  return <span style={{display:'flex',alignItems:'center',gap:2,flexShrink:0}}>{[1,2,3,4,5].map(i=><span key={i} style={{width:5,height:5,borderRadius:'50%',background:i<=f?c.sec:c.brd,display:'inline-block'}}/>)}</span>
}

// ─── 1. TWO-COL: Classic two-column ──────────────────────────────────────────
function TwoCol({data,c:custom}){
  const C=col(custom), sty=custom.sectionHeaderStyle||'underline', bul=custom.bulletStyle||'•', skSty=custom.skillStyle||'dots'
  const exp=filt.exp(data),edu=filt.edu(data),sk=filt.sk(data),cert=filt.cert(data),lang=filt.lang(data),aw=filt.aw(data),proj=filt.proj(data)
  return(
    <div id="resume-preview" style={{width:794,minHeight:1123,background:C.bg,display:'flex',flexDirection:'column',fontFamily:C.bFont}}>
      <div style={{background:C.pri,padding:'20px 24px',display:'flex',alignItems:'center',gap:12,flexShrink:0}}>
        {custom.showPhoto&&data.personal.photo&&<Image unoptimized src={data.personal.photo} alt="" width={60} height={60} style={{width:60,height:60,objectFit:'cover',flexShrink:0,borderRadius:custom.photoShape==='circle'?'50%':6,border:`2px solid ${C.sec}`}} />}
        <div style={{...S.flex,...SAFE}}>
          <h1 style={{margin:0,fontFamily:C.hFont,fontSize:20,color:'#fff',fontWeight:700,letterSpacing:-.3,...SAFE}}>{data.personal.firstName||'Your'} {data.personal.lastName||'Name'}</h1>
          {data.personal.title&&<p style={{margin:'2px 0 0',color:C.sec,fontSize:11,fontWeight:500,...SAFE}}>{data.personal.title}</p>}
          <div style={{display:'flex',flexWrap:'wrap',gap:'2px 12px',marginTop:5}}>
            {[data.personal.email&&`✉ ${data.personal.email}`,data.personal.phone&&`📱 ${data.personal.phone}`,data.personal.location&&`📍 ${data.personal.location}`,data.personal.linkedin&&`in/${data.personal.linkedin}`,data.personal.github&&`⌥ ${data.personal.github}`].filter(Boolean).map((item,i)=><span key={i} style={{color:'rgba(255,255,255,0.75)',fontSize:8,...SAFE}}>{item}</span>)}
          </div>
        </div>
      </div>
      <div style={{display:'flex',flex:1}}>
        <div style={{width:'62%',padding:'16px 14px 16px 18px',fontSize:9.5,lineHeight:1.5,boxSizing:'border-box',color:C.txt,...S.flex}}>
          {data.personal.summary&&<div style={{marginBottom:C.sp}}><SH t="Professional Summary" c={C} s={sty}/><p style={{margin:0,fontSize:9.5,lineHeight:1.6,...SAFE}}>{data.personal.summary}</p></div>}
          {exp.length>0&&<div style={{marginBottom:C.sp}}><SH t="Work Experience" c={C} s={sty}/>{exp.map((e,i)=><div key={e.id} style={{marginBottom:i<exp.length-1?9:0,...SAFE}}>
            <div style={{display:'flex',justifyContent:'space-between',gap:6}}><div style={{...S.flex,...SAFE}}><p style={{margin:0,fontWeight:700,fontSize:10.5,color:C.pri,...SAFE}}>{e.position}</p><p style={{margin:'1px 0 0',color:C.sec,fontSize:9,fontWeight:500,...SAFE}}>{e.company}{e.location?` · ${e.location}`:''}</p></div><span style={{color:C.mut,fontSize:8,flexShrink:0,marginLeft:4,whiteSpace:'nowrap'}}>{e.startDate}–{e.current?'Now':e.endDate}</span></div>
            {e.description&&<div style={{marginTop:3}}>{lines(e.description,bul,C.sec)}</div>}
            {e.achievements?.length>0&&<div style={{marginTop:2,background:C.acc+'15',borderLeft:`2px solid ${C.acc}`,padding:'2px 5px',borderRadius:'0 3px 3px 0',...SAFE}}>{e.achievements.map((a,ai)=><p key={ai} style={{margin:'1px 0',fontSize:8,...SAFE}}>🏆 {a}</p>)}</div>}
          </div>)}</div>}
          {proj.length>0&&<div style={{marginBottom:C.sp}}><SH t="Projects" c={C} s={sty}/>{proj.map((p,i)=><div key={p.id} style={{marginBottom:i<proj.length-1?7:0,...SAFE}}>
            <div style={{display:'flex',justifyContent:'space-between',gap:6}}><p style={{margin:0,fontWeight:700,fontSize:10,...SAFE}}>{p.name}</p><span style={{color:C.mut,fontSize:8,flexShrink:0,whiteSpace:'nowrap'}}>{p.startDate}</span></div>
            {p.technologies?.length>0&&<div style={{display:'flex',flexWrap:'wrap',gap:2,margin:'2px 0'}}>{p.technologies.map((t,ti)=><span key={ti} style={{background:C.sec+'1A',color:C.sec,fontSize:7.5,padding:'1px 5px',borderRadius:8,fontWeight:500}}>{t}</span>)}</div>}
            {p.description&&<p style={{margin:0,fontSize:9,lineHeight:1.5,...SAFE}}>{p.description}</p>}
          </div>)}</div>}
          {edu.length>0&&<div style={{marginBottom:C.sp}}><SH t="Education" c={C} s={sty}/>{edu.map(e=><div key={e.id} style={{marginBottom:5,...SAFE}}>
            <div style={{display:'flex',justifyContent:'space-between',gap:6}}><div style={{...S.flex,...SAFE}}><p style={{margin:0,fontWeight:700,fontSize:10,...SAFE}}>{e.degree} {e.field?`in ${e.field}`:''}</p><p style={{margin:'1px 0',color:C.sec,fontSize:9,...SAFE}}>{e.institution}{e.location?`, ${e.location}`:''}</p></div><span style={{color:C.mut,fontSize:8,flexShrink:0,whiteSpace:'nowrap'}}>{e.startDate}–{e.current?'Now':e.endDate}</span></div>
            {(e.gpa||e.honors)&&<p style={{margin:'1px 0',fontSize:8,color:C.acc,...SAFE}}>{e.gpa&&`CGPA: ${e.gpa}`}{e.honors&&` · 🏅 ${e.honors}`}</p>}
          </div>)}</div>}
        </div>
        <div style={{width:'38%',background:C.pri+'0A',padding:'16px 12px 16px 10px',fontSize:9.5,lineHeight:1.5,boxSizing:'border-box',borderLeft:`1px solid ${C.brd}`,color:C.txt,...S.flex}}>
          {sk.length>0&&<div style={{marginBottom:C.sp}}><SH t="Skills" c={C} s={sty}/>{sk.map(cat=><div key={cat.id} style={{marginBottom:7,...SAFE}}><p style={{margin:'0 0 3px',fontWeight:600,fontSize:9,color:C.pri,...SAFE}}>{cat.category}</p>{skSty==='tags'?<div style={{display:'flex',flexWrap:'wrap',gap:2}}>{cat.skills.map((s,si)=><span key={si} style={{background:C.sec+'1A',color:C.sec,fontSize:8,padding:'1.5px 6px',borderRadius:8,fontWeight:500,...SAFE}}>{s.name}</span>)}</div>:cat.skills.filter(s=>s.showLevel!==false).map((s,si)=><div key={si} style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:3,gap:6}}><span style={{fontSize:9,...S.flex,...SAFE}}>{s.name}</span><Dots sk={s} sty={skSty} c={C}/></div>)}</div>)}</div>}
          {cert.length>0&&<div style={{marginBottom:C.sp}}><SH t="Certifications" c={C} s={sty}/>{cert.map(ct=><div key={ct.id} style={{marginBottom:5,...SAFE}}><p style={{margin:0,fontWeight:600,fontSize:9,...SAFE}}>{ct.name}</p><p style={{margin:'1px 0',color:C.sec,fontSize:8,...SAFE}}>{ct.issuer}</p><p style={{margin:0,color:C.mut,fontSize:8,...SAFE}}>{ct.date}{ct.expiry?` – ${ct.expiry}`:''}</p></div>)}</div>}
          {lang.length>0&&<div style={{marginBottom:C.sp}}><SH t="Languages" c={C} s={sty}/>{lang.map(l=><div key={l.id} style={{display:'flex',justifyContent:'space-between',marginBottom:3,gap:4}}><span style={{fontSize:9,...S.flex,...SAFE}}>{l.language}</span><span style={{fontSize:8,color:C.mut,background:C.brd,padding:'1px 5px',borderRadius:6,flexShrink:0}}>{l.proficiency}</span></div>)}</div>}
          {aw.length>0&&<div style={{marginBottom:C.sp}}><SH t="Awards" c={C} s={sty}/>{aw.map(a=><div key={a.id} style={{marginBottom:5,...SAFE}}><p style={{margin:0,fontWeight:600,fontSize:9,...SAFE}}>🏆 {a.title}</p><p style={{margin:'1px 0',color:C.sec,fontSize:8,...SAFE}}>{a.issuer} · {a.date}</p>{a.description&&<p style={{margin:0,fontSize:8,...SAFE}}>{a.description}</p>}</div>)}</div>}
          {data.interests?.length>0&&<div><SH t="Interests" c={C} s={sty}/><div style={{display:'flex',flexWrap:'wrap',gap:2}}>{data.interests.map((int,ii)=><span key={ii} style={{background:C.pri+'15',color:C.pri,fontSize:8,padding:'2px 7px',borderRadius:8,fontWeight:500,...SAFE}}>{int}</span>)}</div></div>}
        </div>
      </div>
    </div>
  )
}

// ─── 2. CENTERED: Single column, centered header ──────────────────────────────
function Centered({data,c:custom}){
  const C=col(custom)
  const exp=filt.exp(data),edu=filt.edu(data),sk=filt.sk(data),lang=filt.lang(data),cert=filt.cert(data)
  const sty=custom.sectionHeaderStyle||'underline'
  return(
    <div id="resume-preview" style={{width:794,minHeight:1123,background:C.bg,fontFamily:C.bFont,fontSize:9.5,color:C.txt}}>
      <div style={{textAlign:'center',borderBottom:`3px solid ${C.sec}`,padding:'20px 32px 12px'}}>
        <h1 style={{margin:0,fontFamily:C.hFont,fontSize:24,color:C.pri,letterSpacing:1.5,textTransform:'uppercase',...SAFE}}>{data.personal.firstName||'First'} {data.personal.lastName||'Last'}</h1>
        {data.personal.title&&<p style={{margin:'3px 0',color:C.sec,fontSize:11,letterSpacing:1,...SAFE}}>{data.personal.title}</p>}
        <div style={{display:'flex',justifyContent:'center',gap:14,marginTop:5,flexWrap:'wrap'}}>
          {[data.personal.email&&`✉ ${data.personal.email}`,data.personal.phone&&`📱 ${data.personal.phone}`,data.personal.location&&`📍 ${data.personal.location}`,data.personal.linkedin&&`in/${data.personal.linkedin}`].filter(Boolean).map((item,i)=><span key={i} style={{fontSize:8.5,...SAFE}}>{item}</span>)}
        </div>
      </div>
      <div style={{padding:'16px 32px'}}>
        {data.personal.summary&&<div style={{marginBottom:14,borderLeft:`3px solid ${C.sec}`,paddingLeft:10,...SAFE}}><p style={{margin:0,fontSize:10,lineHeight:1.7,fontStyle:'italic',...SAFE}}>{data.personal.summary}</p></div>}
        {exp.length>0&&<div style={{marginBottom:14}}><SH t="Professional Experience" c={C} s={sty}/>{exp.map(e=><div key={e.id} style={{marginBottom:9,...SAFE}}>
          <div style={{display:'flex',justifyContent:'space-between',gap:8}}><div style={{...S.flex,...SAFE}}><span style={{fontFamily:C.hFont,fontWeight:700,fontSize:11,color:C.pri,...SAFE}}>{e.position}</span><p style={{margin:'1px 0 3px',color:C.sec,fontSize:9.5,fontWeight:600,...SAFE}}>{e.company}{e.location?`, ${e.location}`:''}</p></div><span style={{color:C.mut,fontSize:8,flexShrink:0,whiteSpace:'nowrap'}}>{e.startDate}–{e.current?'Now':e.endDate}</span></div>
          {e.description&&<div>{lines(e.description,'▸',C.sec)}</div>}
        </div>)}</div>}
        <div style={{display:'flex',gap:20}}>
          <div style={{flex:1.4,...S.flex,...SAFE}}>
            {edu.length>0&&<div style={{marginBottom:12}}><SH t="Education" c={C} s={sty}/>{edu.map(e=><div key={e.id} style={{marginBottom:6,...SAFE}}><p style={{margin:0,fontWeight:700,fontSize:10,...SAFE}}>{e.degree} {e.field?`in ${e.field}`:''}</p><p style={{margin:0,color:C.sec,fontSize:9,...SAFE}}>{e.institution}{e.gpa?` · GPA: ${e.gpa}`:''}</p><p style={{margin:0,color:C.mut,fontSize:8,...SAFE}}>{e.startDate}–{e.current?'Now':e.endDate}</p></div>)}</div>}
          </div>
          <div style={{flex:1,...S.flex,...SAFE}}>
            {sk.length>0&&<div><SH t="Core Skills" c={C} s={sty}/>{sk.map(cat=><div key={cat.id} style={{marginBottom:5,...SAFE}}><p style={{margin:'0 0 1px',fontWeight:600,fontSize:9,...SAFE}}>{cat.category}</p><p style={{margin:0,fontSize:8.5,lineHeight:1.7,...SAFE}}>{cat.skills.map(s=>s.name).join(' · ')}</p></div>)}</div>}
            {lang.length>0&&<div style={{marginTop:10}}><SH t="Languages" c={C} s={sty}/><div style={{display:'flex',gap:10,flexWrap:'wrap'}}>{lang.map(l=><span key={l.id} style={{fontSize:9,...SAFE}}>{l.language}: <strong>{l.proficiency}</strong></span>)}</div></div>}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── 3. MINIMAL: Timeline date-left layout ────────────────────────────────────
function Minimal({data,c:custom}){
  const C=col(custom)
  const exp=filt.exp(data),edu=filt.edu(data),sk=filt.sk(data)
  return(
    <div id="resume-preview" style={{width:794,minHeight:1123,background:C.bg,fontFamily:'Helvetica,Arial,sans-serif',color:C.txt,padding:'36px 44px',boxSizing:'border-box'}}>
      <h1 style={{margin:0,fontSize:22,fontWeight:300,letterSpacing:2,textTransform:'uppercase',...SAFE}}>{data.personal.firstName||'First'} {data.personal.lastName||'Last'}</h1>
      {data.personal.title&&<p style={{margin:'3px 0 5px',fontSize:11,letterSpacing:1,color:C.mut,...SAFE}}>{data.personal.title}</p>}
      <div style={{display:'flex',gap:12,fontSize:8.5,color:C.mut,flexWrap:'wrap'}}>{[data.personal.email,data.personal.phone,data.personal.location].filter(Boolean).map((item,i)=><span key={i} style={{...SAFE}}>{item}</span>)}</div>
      <hr style={{border:'none',borderTop:`1px solid ${C.pri}`,margin:'8px 0 12px'}}/>
      {data.personal.summary&&<p style={{margin:'0 0 14px',fontSize:9.5,lineHeight:1.8,color:C.txt+'cc',...SAFE}}>{data.personal.summary}</p>}
      {exp.length>0&&<div style={{marginBottom:14}}><p style={{margin:'0 0 5px',fontSize:8,fontWeight:700,letterSpacing:2,textTransform:'uppercase',color:C.mut}}>Experience</p>{exp.map(e=><div key={e.id} style={{marginBottom:9,display:'flex',gap:12}}>
        <div style={{width:75,flexShrink:0,textAlign:'right'}}><p style={{margin:0,fontSize:8,color:C.mut}}>{e.startDate}</p><p style={{margin:0,fontSize:8,color:C.mut}}>– {e.current?'Now':e.endDate}</p></div>
        <div style={{flex:1,...S.flex,...SAFE}}><p style={{margin:0,fontWeight:600,fontSize:10,...SAFE}}>{e.position}</p><p style={{margin:'1px 0 2px',fontSize:9,color:C.mut,...SAFE}}>{e.company}{e.location?`, ${e.location}`:''}</p>{e.description&&lines(e.description,'—',C.txt)}</div>
      </div>)}</div>}
      {edu.length>0&&<div style={{marginBottom:14}}><p style={{margin:'0 0 5px',fontSize:8,fontWeight:700,letterSpacing:2,textTransform:'uppercase',color:C.mut}}>Education</p>{edu.map(e=><div key={e.id} style={{marginBottom:5,display:'flex',gap:12}}>
        <div style={{width:75,flexShrink:0,textAlign:'right'}}><p style={{margin:0,fontSize:8,color:C.mut}}>{e.startDate}–{e.current?'Now':e.endDate}</p></div>
        <div style={{flex:1,...S.flex,...SAFE}}><p style={{margin:0,fontWeight:600,fontSize:10,...SAFE}}>{e.degree} {e.field?`in ${e.field}`:''}</p><p style={{margin:'1px 0',fontSize:9,color:C.mut,...SAFE}}>{e.institution}{e.gpa?` · ${e.gpa}`:''}</p></div>
      </div>)}</div>}
      {sk.length>0&&<div><p style={{margin:'0 0 5px',fontSize:8,fontWeight:700,letterSpacing:2,textTransform:'uppercase',color:C.mut}}>Skills</p>{sk.map(cat=><div key={cat.id} style={{marginBottom:3,display:'flex',gap:12}}><div style={{width:75,flexShrink:0,textAlign:'right',fontSize:8,color:C.mut,...SAFE}}>{cat.category}</div><div style={{flex:1,fontSize:9,...S.flex,...SAFE}}>{cat.skills.map(s=>s.name).join(', ')}</div></div>)}</div>}
    </div>
  )
}

// ─── 4. DARK: GitHub/developer dark theme ────────────────────────────────────
function Dark({data,c:custom}){
  const C=col(custom)
  const bg=C.pri||'#0D1117',panel='rgba(255,255,255,0.04)',brd='rgba(255,255,255,0.1)'
  const exp=filt.exp(data),edu=filt.edu(data),sk=filt.sk(data),proj=filt.proj(data)
  return(
    <div id="resume-preview" style={{width:794,minHeight:1123,background:bg,fontFamily:`'Courier New',monospace`,color:'#E6EDF3'}}>
      <div style={{background:'rgba(255,255,255,0.03)',borderBottom:`1px solid ${brd}`,padding:'16px 22px',flexShrink:0}}>
        <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:6}}>{['#FF5F57','#FFBD2E','#28CA41'].map((c,i)=><span key={i} style={{width:10,height:10,borderRadius:'50%',background:c,display:'inline-block'}}/>)}<span style={{color:'rgba(255,255,255,0.3)',fontSize:8,marginLeft:6}}>resume.json</span></div>
        <h1 style={{margin:0,fontSize:18,color:C.sec,...SAFE}}><span style={{color:C.acc}}>const</span> <span style={{color:'#FFA657'}}>{data.personal.firstName||'Dev'}</span> = <span style={{color:C.sec}}>&quot;{data.personal.firstName||'Your'} {data.personal.lastName||'Name'}&quot;</span>;</h1>
        {data.personal.title&&<p style={{margin:'2px 0 0',color:'rgba(255,255,255,0.45)',fontSize:9,...SAFE}}>{'// ' + data.personal.title}</p>}
        <div style={{display:'flex',gap:14,marginTop:6,flexWrap:'wrap'}}>{[data.personal.email&&`email: "${data.personal.email}"`,data.personal.github&&`github: "${data.personal.github}"`,data.personal.phone&&`phone: "${data.personal.phone}"`].filter(Boolean).map((item,i)=><span key={i} style={{fontSize:8,color:'rgba(255,255,255,0.4)'}}>{item}</span>)}</div>
      </div>
      <div style={{display:'flex',padding:'14px',gap:12}}>
        <div style={{flex:1.4,...S.flex}}>
          {data.personal.summary&&<div style={{marginBottom:10,background:panel,border:`1px solid ${brd}`,borderRadius:6,padding:9,...SAFE}}><p style={{margin:'0 0 2px',fontSize:8,color:C.acc}}>{'/* ABOUT */'}</p><p style={{margin:0,fontSize:9,lineHeight:1.7,...SAFE}}>{data.personal.summary}</p></div>}
          {exp.length>0&&<div style={{marginBottom:10}}><p style={{margin:'0 0 5px',fontSize:9,color:C.sec,fontWeight:700}}>▶ EXPERIENCE</p>{exp.map(e=><div key={e.id} style={{marginBottom:8,background:panel,border:`1px solid ${brd}`,borderRadius:6,padding:8,...SAFE}}><div style={{display:'flex',justifyContent:'space-between',gap:8}}><span style={{color:C.acc,fontWeight:700,fontSize:10,...S.flex,...SAFE}}>{e.position}</span><span style={{color:'rgba(255,255,255,0.35)',fontSize:8,flexShrink:0,whiteSpace:'nowrap'}}>{e.startDate}→{e.current?'now':e.endDate}</span></div><p style={{margin:'2px 0 3px',color:C.sec,fontSize:9,...SAFE}}>{e.company}</p>{e.description&&lines(e.description,'›',C.acc)}</div>)}</div>}
          {proj.length>0&&<div><p style={{margin:'0 0 5px',fontSize:9,color:C.sec,fontWeight:700}}>▶ PROJECTS</p>{proj.map(p=><div key={p.id} style={{marginBottom:7,background:panel,border:`1px solid ${brd}`,borderRadius:6,padding:8,...SAFE}}><p style={{margin:0,fontWeight:700,color:C.acc,fontSize:10,...SAFE}}>⌥ {p.name}</p>{p.technologies?.length>0&&<div style={{display:'flex',flexWrap:'wrap',gap:2,margin:'2px 0'}}>{p.technologies.map((t,ti)=><span key={ti} style={{background:C.sec+'22',color:C.sec,fontSize:7,padding:'1px 4px',borderRadius:3,border:`1px solid ${C.sec}44`,...SAFE}}>{t}</span>)}</div>}{p.description&&<p style={{margin:'2px 0 0',fontSize:8.5,color:'rgba(255,255,255,0.5)',...SAFE}}>{p.description}</p>}</div>)}</div>}
        </div>
        <div style={{flex:1,...S.flex}}>
          {sk.length>0&&<div style={{marginBottom:10,background:panel,border:`1px solid ${brd}`,borderRadius:6,padding:9,...SAFE}}><p style={{margin:'0 0 5px',fontSize:9,color:C.sec,fontWeight:700}}>▶ SKILLS</p>{sk.map(cat=><div key={cat.id} style={{marginBottom:6,...SAFE}}><p style={{margin:'0 0 3px',fontSize:8,color:C.acc,...SAFE}}>{'// ' + cat.category}</p><div style={{display:'flex',flexWrap:'wrap',gap:2}}>{cat.skills.map((s,si)=><span key={si} style={{background:C.acc+'22',color:C.acc,fontSize:7.5,padding:'1.5px 5px',borderRadius:3,border:`1px solid ${C.acc}44`,...SAFE}}>{s.name}</span>)}</div></div>)}</div>}
          {edu.length>0&&<div style={{background:panel,border:`1px solid ${brd}`,borderRadius:6,padding:9,...SAFE}}><p style={{margin:'0 0 5px',fontSize:9,color:C.sec,fontWeight:700}}>▶ EDUCATION</p>{edu.map(e=><div key={e.id} style={{marginBottom:6,...SAFE}}><p style={{margin:0,color:C.acc,fontSize:9.5,fontWeight:700,...SAFE}}>{e.institution}</p><p style={{margin:'1px 0',fontSize:9,...SAFE}}>{e.degree} {e.field?`in ${e.field}`:''}</p><p style={{margin:0,color:'rgba(255,255,255,0.35)',fontSize:8,...SAFE}}>{e.startDate}–{e.current?'Now':e.endDate}{e.gpa?` · ${e.gpa}`:''}</p></div>)}</div>}
        </div>
      </div>
    </div>
  )
}

// ─── 5. SIDEBAR: Colored gradient left panel ─────────────────────────────────
function Sidebar({data,c:custom}){
  const C=col(custom)
  const exp=filt.exp(data),edu=filt.edu(data),sk=filt.sk(data),lang=filt.lang(data),cert=filt.cert(data)
  return(
    <div id="resume-preview" style={{width:794,minHeight:1123,background:C.bg,display:'flex',fontFamily:'Arial,sans-serif'}}>
      <div style={{width:'32%',minWidth:'32%',maxWidth:'32%',background:`linear-gradient(170deg,${C.pri} 0%,${C.sec} 100%)`,padding:'22px 13px',color:'#fff',boxSizing:'border-box',flexShrink:0}}>
        {custom.showPhoto&&data.personal.photo&&<div style={{textAlign:'center',marginBottom:10}}><Image unoptimized src={data.personal.photo} alt="" width={65} height={65} style={{width:65,height:65,borderRadius:custom.photoShape==='circle'?'50%':8,objectFit:'cover',border:'2px solid rgba(255,255,255,0.5)'}} /></div>}
        <div style={{textAlign:'center',marginBottom:14}}><h1 style={{margin:0,fontSize:14,fontWeight:700,lineHeight:1.3,...SAFE}}>{data.personal.firstName||'Your'}<br/>{data.personal.lastName||'Name'}</h1>{data.personal.title&&<p style={{margin:'3px 0 0',fontSize:8.5,opacity:0.85,...SAFE}}>{data.personal.title}</p>}</div>
        <div style={{marginBottom:10}}><p style={{margin:'0 0 4px',fontSize:7,letterSpacing:2,fontWeight:700,opacity:0.65,textTransform:'uppercase'}}>Contact</p>{[data.personal.email&&`✉ ${data.personal.email}`,data.personal.phone&&`📱 ${data.personal.phone}`,data.personal.location&&`📍 ${data.personal.location}`,data.personal.linkedin&&`in ${data.personal.linkedin}`].filter(Boolean).map((item,i)=><p key={i} style={{margin:'2px 0',fontSize:8,...SAFE}}>{item}</p>)}</div>
        {sk.length>0&&<div style={{marginBottom:10}}><p style={{margin:'0 0 5px',fontSize:7,letterSpacing:2,fontWeight:700,opacity:0.65,textTransform:'uppercase'}}>Skills</p>{sk.map(cat=><div key={cat.id} style={{marginBottom:6,...SAFE}}><p style={{margin:'0 0 2px',fontSize:8.5,fontWeight:700,...SAFE}}>{cat.category}</p>{cat.skills.slice(0,6).map((s,si)=><div key={si} style={{marginBottom:2,...SAFE}}><span style={{fontSize:8,...SAFE}}>{s.name}</span><div style={{height:2,background:'rgba(255,255,255,0.2)',borderRadius:2,marginTop:1}}><div style={{width:`${s.level}%`,height:'100%',background:'rgba(255,255,255,0.8)',borderRadius:2}}/></div></div>)}</div>)}</div>}
        {lang.length>0&&<div style={{marginBottom:10}}><p style={{margin:'0 0 5px',fontSize:7,letterSpacing:2,fontWeight:700,opacity:0.65,textTransform:'uppercase'}}>Languages</p>{lang.map(l=><div key={l.id} style={{display:'flex',justifyContent:'space-between',marginBottom:3,...SAFE}}><span style={{fontSize:8.5,...SAFE}}>{l.language}</span><span style={{fontSize:8,opacity:0.72}}>{l.proficiency}</span></div>)}</div>}
        {cert.length>0&&<div><p style={{margin:'0 0 5px',fontSize:7,letterSpacing:2,fontWeight:700,opacity:0.65,textTransform:'uppercase'}}>Certifications</p>{cert.map(ct=><div key={ct.id} style={{marginBottom:4,...SAFE}}><p style={{margin:0,fontSize:8.5,fontWeight:600,...SAFE}}>{ct.name}</p><p style={{margin:0,fontSize:8,opacity:0.75,...SAFE}}>{ct.issuer}</p></div>)}</div>}
      </div>
      <div style={{flex:1,padding:'16px 14px',color:C.txt,minWidth:0,maxWidth:'68%'}}>
        {data.personal.summary&&<div style={{marginBottom:12,padding:'8px 10px',background:C.pri+'0F',borderRadius:7,borderLeft:`3px solid ${C.pri}`,...SAFE}}><p style={{margin:0,fontSize:9.5,lineHeight:1.7,...SAFE}}>{data.personal.summary}</p></div>}
        {exp.length>0&&<div style={{marginBottom:12}}>
          <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:6}}><div style={{width:6,height:6,background:C.pri,borderRadius:'50%',flexShrink:0}}/><h2 style={{margin:0,fontSize:9,fontWeight:700,color:C.pri,letterSpacing:1,textTransform:'uppercase',...SAFE}}>Experience</h2><div style={{flex:1,height:1,background:C.brd}}/></div>
          {exp.map(e=><div key={e.id} style={{marginBottom:8,paddingLeft:10,borderLeft:`2px solid ${C.brd}`,position:'relative'}}>
            <div style={{position:'absolute',left:-4,top:3,width:7,height:7,borderRadius:'50%',background:C.sec,flexShrink:0}}/>
            <div style={{display:'flex',justifyContent:'space-between',gap:6}}><div style={{...S.flex,...SAFE}}><span style={{fontWeight:700,color:C.pri,fontSize:10,...SAFE}}>{e.position}</span><p style={{margin:'1px 0 3px',color:C.sec,fontSize:9,fontWeight:500,...SAFE}}>{e.company}{e.location?`, ${e.location}`:''}</p></div><span style={{color:C.mut,fontSize:8,flexShrink:0,whiteSpace:'nowrap'}}>{e.startDate}–{e.current?'Now':e.endDate}</span></div>
            {e.description&&lines(e.description,'◆',C.sec)}
          </div>)}
        </div>}
        {edu.length>0&&<div>
          <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:6}}><div style={{width:6,height:6,background:C.pri,borderRadius:'50%',flexShrink:0}}/><h2 style={{margin:0,fontSize:9,fontWeight:700,color:C.pri,letterSpacing:1,textTransform:'uppercase',...SAFE}}>Education</h2><div style={{flex:1,height:1,background:C.brd}}/></div>
          {edu.map(e=><div key={e.id} style={{marginBottom:7,...SAFE}}><p style={{margin:0,fontWeight:700,fontSize:10,...SAFE}}>{e.degree} {e.field?`in ${e.field}`:''}</p><p style={{margin:'1px 0',color:C.sec,fontSize:9,...SAFE}}>{e.institution}</p><p style={{margin:0,color:C.mut,fontSize:8,...SAFE}}>{e.startDate}–{e.current?'Now':e.endDate}{e.gpa?` · ${e.gpa}`:''}</p></div>)}
        </div>}
      </div>
    </div>
  )
}

// ─── 6. ELEGANT: Gold serif, luxury feel ─────────────────────────────────────
function Elegant({data,c:custom}){
  const C=col(custom)
  const exp=filt.exp(data),edu=filt.edu(data),sk=filt.sk(data)
  return(
    <div id="resume-preview" style={{width:794,minHeight:1123,background:'#FEFCF8',fontFamily:'Georgia,serif',color:C.txt}}>
      <div style={{background:C.pri,padding:'20px 32px'}}>
        <div style={{display:'flex',alignItems:'center',gap:14}}>
          {custom.showPhoto&&data.personal.photo&&<Image unoptimized src={data.personal.photo} alt="" width={58} height={58} style={{width:58,height:58,borderRadius:'50%',objectFit:'cover',border:`2px solid ${C.sec}`,flexShrink:0}} />}
          <div style={{...S.flex,...SAFE}}>
            <h1 style={{margin:0,fontSize:24,color:'#fff',fontWeight:400,...SAFE}}>{data.personal.firstName||'Your'} <span style={{color:C.sec,fontWeight:700}}>{data.personal.lastName||'Name'}</span></h1>
            {data.personal.title&&<p style={{margin:'3px 0 0',color:C.sec,fontSize:11,fontStyle:'italic',...SAFE}}>{data.personal.title}</p>}
            <div style={{display:'flex',gap:12,marginTop:6,flexWrap:'wrap'}}>{[data.personal.email&&`✉ ${data.personal.email}`,data.personal.phone&&`📱 ${data.personal.phone}`,data.personal.location&&`📍 ${data.personal.location}`].filter(Boolean).map((item,i)=><span key={i} style={{fontSize:8,color:'rgba(255,255,255,0.6)',...SAFE}}>{item}</span>)}</div>
          </div>
        </div>
      </div>
      {data.personal.summary&&<div style={{textAlign:'center',fontStyle:'italic',fontSize:10,lineHeight:1.9,color:'#444',borderTop:`1px solid ${C.sec}`,borderBottom:`1px solid ${C.sec}`,padding:'8px 36px',margin:'0',...SAFE}}>&quot;{data.personal.summary}&quot;</div>}
      <div style={{padding:'18px 32px',display:'flex',gap:20}}>
        <div style={{flex:1.5,...S.flex}}>
          {exp.length>0&&<div style={{marginBottom:13}}><h2 style={{margin:'0 0 7px',fontSize:9,fontWeight:700,letterSpacing:3,textTransform:'uppercase',color:C.sec,...SAFE}}>✦ Experience</h2>{exp.map(e=><div key={e.id} style={{marginBottom:9,...SAFE}}><div style={{display:'flex',justifyContent:'space-between',gap:8}}><div style={{...S.flex,...SAFE}}><span style={{fontWeight:700,fontSize:11,color:C.pri,...SAFE}}>{e.position}</span><p style={{margin:'1px 0 3px',color:C.sec,fontSize:9.5,fontStyle:'italic',...SAFE}}>{e.company}{e.location?`, ${e.location}`:''}</p></div><span style={{color:C.mut,fontSize:8.5,fontStyle:'italic',flexShrink:0,whiteSpace:'nowrap'}}>{e.startDate}–{e.current?'Now':e.endDate}</span></div>{e.description&&lines(e.description,'◆',C.sec)}</div>)}</div>}
          {edu.length>0&&<div><h2 style={{margin:'0 0 7px',fontSize:9,fontWeight:700,letterSpacing:3,textTransform:'uppercase',color:C.sec,...SAFE}}>✦ Education</h2>{edu.map(e=><div key={e.id} style={{marginBottom:6,...SAFE}}><p style={{margin:0,fontWeight:700,fontSize:11,...SAFE}}>{e.degree} {e.field?`in ${e.field}`:''}</p><p style={{margin:'1px 0',color:C.sec,fontSize:9.5,fontStyle:'italic',...SAFE}}>{e.institution}</p><p style={{margin:0,color:C.mut,fontSize:8,...SAFE}}>{e.startDate}–{e.current?'Now':e.endDate}{e.gpa?` · CGPA: ${e.gpa}`:''}</p></div>)}</div>}
        </div>
        <div style={{flex:1,...S.flex}}>
          {sk.length>0&&<div style={{background:'#F9F5EE',border:`1px solid #E8E0D0`,borderRadius:8,padding:12,...SAFE}}><h2 style={{margin:'0 0 7px',fontSize:9,fontWeight:700,letterSpacing:3,textTransform:'uppercase',color:C.sec,...SAFE}}>✦ Skills</h2>{sk.map(cat=><div key={cat.id} style={{marginBottom:7,...SAFE}}><p style={{margin:'0 0 3px',fontWeight:700,fontSize:9.5,color:C.pri,...SAFE}}>{cat.category}</p>{cat.skills.map((s,si)=><div key={si} style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:2,gap:4}}><span style={{fontSize:9,...S.flex,...SAFE}}>{s.name}</span><div style={{width:50,height:2,background:'#E8E0D0',borderRadius:2,flexShrink:0}}><div style={{width:`${s.level}%`,height:'100%',background:C.sec,borderRadius:2}}/></div></div>)}</div>)}</div>}
        </div>
      </div>
    </div>
  )
}

// ─── 7. TIMELINE: Vertical career progression ─────────────────────────────────
function Timeline({data,c:custom}){
  const C=col(custom)
  const exp=filt.exp(data),edu=filt.edu(data),sk=filt.sk(data)
  return(
    <div id="resume-preview" style={{width:794,minHeight:1123,background:C.bg,fontFamily:C.bFont,color:C.txt,padding:'28px 36px',boxSizing:'border-box'}}>
      <div style={{borderLeft:`4px solid ${C.sec}`,paddingLeft:14,marginBottom:20,...SAFE}}>
        <h1 style={{margin:0,fontFamily:C.hFont,fontSize:22,fontWeight:700,color:C.pri,...SAFE}}>{data.personal.firstName||'Your'} {data.personal.lastName||'Name'}</h1>
        {data.personal.title&&<p style={{margin:'3px 0 0',color:C.sec,fontSize:11,fontWeight:600,...SAFE}}>{data.personal.title}</p>}
        <div style={{display:'flex',gap:12,marginTop:5,flexWrap:'wrap',fontSize:8.5,color:C.mut}}>{[data.personal.email&&`✉ ${data.personal.email}`,data.personal.phone&&`📱 ${data.personal.phone}`,data.personal.location&&`📍 ${data.personal.location}`,data.personal.linkedin&&`in/${data.personal.linkedin}`].filter(Boolean).map((item,i)=><span key={i} style={{...SAFE}}>{item}</span>)}</div>
      </div>
      {data.personal.summary&&<p style={{margin:'0 0 18px',fontSize:9.5,lineHeight:1.7,color:C.txt+'cc',paddingLeft:18,borderLeft:`2px solid ${C.brd}`,...SAFE}}>{data.personal.summary}</p>}
      {sk.length>0&&<div style={{marginBottom:18}}><p style={{margin:'0 0 7px',fontSize:8,fontWeight:700,letterSpacing:2,textTransform:'uppercase',color:C.sec}}>Skills</p><div style={{display:'flex',flexWrap:'wrap',gap:4}}>{sk.flatMap(cat=>cat.skills).map((s,i)=><span key={i} style={{background:C.sec+'18',color:C.sec,fontSize:8.5,padding:'3px 9px',borderRadius:20,fontWeight:600,border:`1px solid ${C.sec}30`,...SAFE}}>{s.name}</span>)}</div></div>}
      {exp.length>0&&<div style={{marginBottom:18}}>
        <p style={{margin:'0 0 10px',fontSize:8,fontWeight:700,letterSpacing:2,textTransform:'uppercase',color:C.sec}}>Experience</p>
        <div style={{position:'relative',paddingLeft:22}}>
          <div style={{position:'absolute',left:5,top:0,bottom:0,width:2,background:`linear-gradient(to bottom, ${C.sec}, ${C.sec}22)`}}/>
          {exp.map(e=><div key={e.id} style={{position:'relative',marginBottom:12}}>
            <div style={{position:'absolute',left:-22+5-4,top:3,width:9,height:9,borderRadius:'50%',background:C.sec,border:`2px solid ${C.bg}`}}/>
            <div style={{display:'flex',justifyContent:'space-between',gap:8}}>
              <div style={{...S.flex,...SAFE}}><p style={{margin:0,fontWeight:700,fontSize:10.5,color:C.pri,...SAFE}}>{e.position}</p><p style={{margin:'1px 0 0',color:C.sec,fontSize:9.5,fontWeight:500,...SAFE}}>{e.company}{e.location?` · ${e.location}`:''}</p></div>
              <span style={{color:C.mut,fontSize:8,flexShrink:0,background:C.sec+'12',padding:'2px 7px',borderRadius:10,whiteSpace:'nowrap'}}>{e.startDate}–{e.current?'Now':e.endDate}</span>
            </div>
            {e.description&&<div style={{marginTop:3}}>{lines(e.description,'▸',C.sec)}</div>}
          </div>)}
        </div>
      </div>}
      {edu.length>0&&<div><p style={{margin:'0 0 7px',fontSize:8,fontWeight:700,letterSpacing:2,textTransform:'uppercase',color:C.sec}}>Education</p>{edu.map(e=><div key={e.id} style={{marginBottom:6,paddingLeft:22,borderLeft:`2px solid ${C.brd}`,...SAFE}}><p style={{margin:0,fontWeight:700,fontSize:10,...SAFE}}>{e.degree} {e.field?`in ${e.field}`:''}</p><p style={{margin:'1px 0',color:C.sec,fontSize:9,...SAFE}}>{e.institution}</p><p style={{margin:0,color:C.mut,fontSize:8,...SAFE}}>{e.startDate}–{e.current?'Now':e.endDate}{e.gpa?` · ${e.gpa}`:''}</p></div>)}</div>}
    </div>
  )
}

// ─── 8. COMPACT: Dense, maximum info ─────────────────────────────────────────
function Compact({data,c:custom}){
  const C=col(custom)
  const exp=filt.exp(data),edu=filt.edu(data),sk=filt.sk(data),proj=filt.proj(data)
  return(
    <div id="resume-preview" style={{width:794,minHeight:1123,background:C.bg,fontFamily:'Arial,sans-serif',color:C.txt,padding:'20px 26px',boxSizing:'border-box',fontSize:9}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:5,paddingBottom:5,borderBottom:`2px solid ${C.pri}`}}>
        <div style={{...S.flex,...SAFE}}><h1 style={{margin:0,fontSize:17,fontWeight:700,color:C.pri,letterSpacing:-.3,...SAFE}}>{data.personal.firstName||'Your'} {data.personal.lastName||'Name'}</h1>{data.personal.title&&<p style={{margin:'1px 0 0',color:C.sec,fontSize:9.5,fontWeight:600,...SAFE}}>{data.personal.title}</p>}</div>
        <div style={{textAlign:'right',fontSize:8.5,color:C.mut,lineHeight:1.8,flexShrink:0,marginLeft:12}}>{[data.personal.email,data.personal.phone,data.personal.linkedin&&`in/${data.personal.linkedin}`,data.personal.github&&`/${data.personal.github}`].filter(Boolean).map((item,i)=><div key={i} style={{...SAFE}}>{item}</div>)}</div>
      </div>
      {data.personal.summary&&<p style={{margin:'0 0 7px',fontSize:9,lineHeight:1.6,color:C.txt+'ee',...SAFE}}>{data.personal.summary}</p>}
      {sk.length>0&&<div style={{marginBottom:7,...SAFE}}><span style={{fontWeight:700,fontSize:8.5,textTransform:'uppercase',letterSpacing:1,color:C.pri}}>Skills: </span><span style={{...SAFE}}>{sk.flatMap(c=>c.skills).map(s=>s.name).join(' • ')}</span></div>}
      {exp.length>0&&<div style={{marginBottom:7}}><p style={{margin:'0 0 3px',fontWeight:700,fontSize:8.5,textTransform:'uppercase',letterSpacing:1,color:C.pri,borderBottom:`1px solid ${C.brd}`,paddingBottom:2}}>Experience</p>{exp.map(e=><div key={e.id} style={{marginBottom:5}}><div style={{display:'flex',justifyContent:'space-between',gap:8}}><strong style={{fontSize:10,...S.flex,...SAFE}}>{e.position} @ {e.company}</strong><span style={{color:C.mut,fontSize:8,flexShrink:0,whiteSpace:'nowrap'}}>{e.startDate}–{e.current?'Now':e.endDate}</span></div>{e.description&&<div style={{marginTop:1}}>{lines(e.description,'·',C.sec)}</div>}</div>)}</div>}
      {proj.length>0&&<div style={{marginBottom:7}}><p style={{margin:'0 0 3px',fontWeight:700,fontSize:8.5,textTransform:'uppercase',letterSpacing:1,color:C.pri,borderBottom:`1px solid ${C.brd}`,paddingBottom:2}}>Projects</p>{proj.map(p=><div key={p.id} style={{marginBottom:3}}><strong style={{fontSize:9,...SAFE}}>{p.name}</strong>{p.technologies?.length>0&&<span style={{color:C.mut,fontSize:8}}> · {p.technologies.join(', ')}</span>}{p.description&&<span style={{fontSize:8,...SAFE}}> — {p.description}</span>}</div>)}</div>}
      {edu.length>0&&<div><p style={{margin:'0 0 3px',fontWeight:700,fontSize:8.5,textTransform:'uppercase',letterSpacing:1,color:C.pri,borderBottom:`1px solid ${C.brd}`,paddingBottom:2}}>Education</p>{edu.map(e=><div key={e.id} style={{display:'flex',justifyContent:'space-between',gap:8,overflow:'hidden'}}><span style={{fontSize:9,...S.flex,...SAFE}}><strong>{e.degree} {e.field?`in ${e.field}`:''}</strong> — {e.institution}{e.gpa?` · ${e.gpa}`:''}</span><span style={{color:C.mut,fontSize:8,flexShrink:0,whiteSpace:'nowrap'}}>{e.startDate}–{e.current?'Now':e.endDate}</span></div>)}</div>}
    </div>
  )
}

// ─── 9. CARDS: Each section as a floating card ───────────────────────────────
function Cards({data,c:custom}){
  const C=col(custom)
  const exp=filt.exp(data),edu=filt.edu(data),sk=filt.sk(data)
  const card={background:C.bg==='#FFFFFF'?'#F8FAFC':'rgba(255,255,255,0.04)',border:`1px solid ${C.brd}`,borderRadius:10,padding:'12px 14px',marginBottom:9,...SAFE}
  return(
    <div id="resume-preview" style={{width:794,minHeight:1123,background:C.bg==='#FFFFFF'?'#EEF2F7':C.bg,fontFamily:C.bFont,color:C.txt,padding:'20px',boxSizing:'border-box'}}>
      <div style={{...card,background:`linear-gradient(135deg,${C.pri},${C.sec})`,color:'#fff'}}>
        <h1 style={{margin:0,fontFamily:C.hFont,fontSize:20,fontWeight:700,color:'#fff',...SAFE}}>{data.personal.firstName||'Your'} {data.personal.lastName||'Name'}</h1>
        {data.personal.title&&<p style={{margin:'2px 0 0',color:'rgba(255,255,255,0.85)',fontSize:10.5,fontWeight:500,...SAFE}}>{data.personal.title}</p>}
        <div style={{display:'flex',gap:12,marginTop:6,flexWrap:'wrap'}}>{[data.personal.email&&`✉ ${data.personal.email}`,data.personal.phone&&`📱 ${data.personal.phone}`,data.personal.location&&`📍 ${data.personal.location}`].filter(Boolean).map((item,i)=><span key={i} style={{color:'rgba(255,255,255,0.8)',fontSize:8,...SAFE}}>{item}</span>)}</div>
      </div>
      {data.personal.summary&&<div style={{...card,borderLeft:`3px solid ${C.sec}`}}><p style={{margin:0,fontSize:9.5,lineHeight:1.6,...SAFE}}>{data.personal.summary}</p></div>}
      {sk.length>0&&<div style={card}><p style={{margin:'0 0 7px',fontFamily:C.hFont,fontWeight:700,fontSize:9,color:C.sec,textTransform:'uppercase',letterSpacing:1}}>Skills</p>{sk.map(cat=><div key={cat.id} style={{marginBottom:5,...SAFE}}><p style={{margin:'0 0 3px',fontSize:8.5,fontWeight:600,color:C.pri,...SAFE}}>{cat.category}</p><div style={{display:'flex',flexWrap:'wrap',gap:3}}>{cat.skills.map((s,si)=><span key={si} style={{background:C.sec+'18',color:C.sec,fontSize:8,padding:'2px 7px',borderRadius:20,fontWeight:600,...SAFE}}>{s.name}</span>)}</div></div>)}</div>}
      {exp.length>0&&<div style={card}><p style={{margin:'0 0 8px',fontFamily:C.hFont,fontWeight:700,fontSize:9,color:C.sec,textTransform:'uppercase',letterSpacing:1}}>Experience</p>{exp.map((e,i)=><div key={e.id} style={{marginBottom:i<exp.length-1?8:0,padding:'7px 9px',background:C.bg==='#FFFFFF'?'#fff':'rgba(255,255,255,0.03)',borderRadius:7,border:`1px solid ${C.brd}`,...SAFE}}><div style={{display:'flex',justifyContent:'space-between',gap:8}}><div style={{...S.flex,...SAFE}}><strong style={{fontSize:10,color:C.pri,...SAFE}}>{e.position}</strong><p style={{margin:'1px 0 3px',color:C.sec,fontSize:9,fontWeight:500,...SAFE}}>{e.company}</p></div><span style={{color:C.mut,fontSize:8,flexShrink:0,whiteSpace:'nowrap'}}>{e.startDate}–{e.current?'Now':e.endDate}</span></div>{e.description&&<div>{lines(e.description,'•',C.sec)}</div>}</div>)}</div>}
      {edu.length>0&&<div style={card}><p style={{margin:'0 0 7px',fontFamily:C.hFont,fontWeight:700,fontSize:9,color:C.sec,textTransform:'uppercase',letterSpacing:1}}>Education</p>{edu.map(e=><div key={e.id} style={{marginBottom:5,...SAFE}}><strong style={{fontSize:10,color:C.pri,...SAFE}}>{e.degree} {e.field?`in ${e.field}`:''}</strong><p style={{margin:'1px 0',color:C.sec,fontSize:9,...SAFE}}>{e.institution}</p><p style={{margin:0,color:C.mut,fontSize:8,...SAFE}}>{e.startDate}–{e.current?'Now':e.endDate}{e.gpa?` · ${e.gpa}`:''}</p></div>)}</div>}
    </div>
  )
}

// ─── 10. ACCENT BORDER: Colored left strip ────────────────────────────────────
function AccentBorder({data,c:custom}){
  const C=col(custom)
  const exp=filt.exp(data),edu=filt.edu(data),sk=filt.sk(data)
  return(
    <div id="resume-preview" style={{width:794,minHeight:1123,background:C.bg,fontFamily:C.bFont,color:C.txt,display:'flex'}}>
      <div style={{width:8,background:`linear-gradient(to bottom,${C.sec},${C.acc})`,flexShrink:0}}/>
      <div style={{flex:1,padding:'26px 28px'}}>
        <div style={{marginBottom:18,...SAFE}}>
          <h1 style={{margin:0,fontFamily:C.hFont,fontSize:22,fontWeight:700,color:C.pri,letterSpacing:-.5,...SAFE}}>{data.personal.firstName||'Your'} {data.personal.lastName||'Name'}</h1>
          {data.personal.title&&<p style={{margin:'3px 0 6px',color:C.sec,fontSize:11.5,fontWeight:600,letterSpacing:.3,...SAFE}}>{data.personal.title}</p>}
          <div style={{display:'flex',gap:14,flexWrap:'wrap',fontSize:8.5,color:C.mut}}>{[data.personal.email&&`✉ ${data.personal.email}`,data.personal.phone&&`📱 ${data.personal.phone}`,data.personal.location&&`📍 ${data.personal.location}`,data.personal.linkedin&&`in/${data.personal.linkedin}`].filter(Boolean).map((item,i)=><span key={i} style={{...SAFE}}>{item}</span>)}</div>
        </div>
        {data.personal.summary&&<div style={{marginBottom:14,paddingLeft:10,borderLeft:`2px solid ${C.sec}50`,...SAFE}}><p style={{margin:0,fontSize:9.5,lineHeight:1.7,fontStyle:'italic',color:C.txt+'cc',...SAFE}}>{data.personal.summary}</p></div>}
        {exp.length>0&&<div style={{marginBottom:13}}><h2 style={{margin:'0 0 7px',fontSize:8.5,fontWeight:700,letterSpacing:2,textTransform:'uppercase',color:C.sec,borderBottom:`1px solid ${C.brd}`,paddingBottom:4,...SAFE}}>Experience</h2>{exp.map(e=><div key={e.id} style={{marginBottom:9,...SAFE}}><div style={{display:'flex',justifyContent:'space-between',gap:8}}><div style={{...S.flex,...SAFE}}><strong style={{fontSize:10.5,color:C.pri,...SAFE}}>{e.position}</strong><p style={{margin:'1px 0 3px',color:C.sec,fontSize:9.5,fontWeight:500,...SAFE}}>{e.company}{e.location?` · ${e.location}`:''}</p></div><span style={{color:C.mut,fontSize:8,flexShrink:0,whiteSpace:'nowrap'}}>{e.startDate}–{e.current?'Now':e.endDate}</span></div>{e.description&&lines(e.description,'▸',C.sec)}</div>)}</div>}
        <div style={{display:'flex',gap:18}}>
          <div style={{flex:1.3,...S.flex}}>
            {edu.length>0&&<div><h2 style={{margin:'0 0 7px',fontSize:8.5,fontWeight:700,letterSpacing:2,textTransform:'uppercase',color:C.sec,borderBottom:`1px solid ${C.brd}`,paddingBottom:4,...SAFE}}>Education</h2>{edu.map(e=><div key={e.id} style={{marginBottom:6,...SAFE}}><strong style={{fontSize:10,...SAFE}}>{e.degree} {e.field?`in ${e.field}`:''}</strong><p style={{margin:'1px 0',color:C.sec,fontSize:9,...SAFE}}>{e.institution}</p><p style={{margin:0,color:C.mut,fontSize:8,...SAFE}}>{e.startDate}–{e.current?'Now':e.endDate}{e.gpa?` · ${e.gpa}`:''}</p></div>)}</div>}
          </div>
          <div style={{flex:1,...S.flex}}>
            {sk.length>0&&<div><h2 style={{margin:'0 0 7px',fontSize:8.5,fontWeight:700,letterSpacing:2,textTransform:'uppercase',color:C.sec,borderBottom:`1px solid ${C.brd}`,paddingBottom:4,...SAFE}}>Skills</h2>{sk.map(cat=><div key={cat.id} style={{marginBottom:5,...SAFE}}><p style={{margin:'0 0 2px',fontWeight:700,fontSize:9,color:C.pri,...SAFE}}>{cat.category}</p><p style={{margin:0,fontSize:9,lineHeight:1.7,...SAFE}}>{cat.skills.map(s=>s.name).join(' · ')}</p></div>)}</div>}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── 11. HERO HEADER: Full-width gradient hero ───────────────────────────────
function HeroHeader({data,c:custom}){
  const C=col(custom)
  const exp=filt.exp(data),edu=filt.edu(data),sk=filt.sk(data),proj=filt.proj(data)
  return(
    <div id="resume-preview" style={{width:794,minHeight:1123,background:C.bg,fontFamily:C.bFont,color:C.txt}}>
      <div style={{background:`linear-gradient(135deg,${C.pri} 0%,${C.sec} 100%)`,padding:'30px 34px 22px',position:'relative'}}>
        <div style={{position:'absolute',right:-30,top:-30,width:180,height:180,borderRadius:'50%',background:'rgba(255,255,255,0.05)'}}/>
        <div style={{position:'absolute',right:50,bottom:-50,width:250,height:250,borderRadius:'50%',background:'rgba(255,255,255,0.04)'}}/>
        <div style={{position:'relative',...SAFE}}>
          {custom.showPhoto&&data.personal.photo&&<Image unoptimized src={data.personal.photo} alt="" width={66} height={66} style={{width:66,height:66,borderRadius:custom.photoShape==='circle'?'50%':8,objectFit:'cover',border:'2px solid rgba(255,255,255,0.35)',float:'right',marginLeft:12}} />}
          <h1 style={{margin:0,fontFamily:C.hFont,fontSize:26,fontWeight:800,color:'#fff',letterSpacing:-1,...SAFE}}>{data.personal.firstName||'Your'} {data.personal.lastName||'Name'}</h1>
          {data.personal.title&&<p style={{margin:'5px 0 10px',color:'rgba(255,255,255,0.8)',fontSize:12,fontWeight:500,...SAFE}}>{data.personal.title}</p>}
          <div style={{display:'flex',gap:14,flexWrap:'wrap'}}>{[data.personal.email&&`✉ ${data.personal.email}`,data.personal.phone&&`📱 ${data.personal.phone}`,data.personal.location&&`📍 ${data.personal.location}`,data.personal.linkedin&&`in/${data.personal.linkedin}`,data.personal.github&&`⌥ ${data.personal.github}`].filter(Boolean).map((item,i)=><span key={i} style={{color:'rgba(255,255,255,0.72)',fontSize:8,...SAFE}}>{item}</span>)}</div>
        </div>
      </div>
      {data.personal.summary&&<div style={{background:C.acc+'15',borderBottom:`1px solid ${C.acc}20`,padding:'10px 34px',...SAFE}}><p style={{margin:0,fontSize:9.5,lineHeight:1.6,...SAFE}}>{data.personal.summary}</p></div>}
      <div style={{padding:'18px 34px'}}>
        {proj.length>0&&<div style={{marginBottom:14}}><h2 style={{margin:'0 0 9px',fontSize:9,fontWeight:700,letterSpacing:2,textTransform:'uppercase',color:C.sec,borderBottom:`2px solid ${C.sec}`,paddingBottom:4,...SAFE}}>Projects</h2>{proj.map((p,i)=><div key={p.id} style={{marginBottom:7,...SAFE}}><div style={{display:'flex',justifyContent:'space-between',gap:8}}><p style={{margin:0,fontWeight:700,fontSize:10,...SAFE}}>{p.name}</p><span style={{color:C.mut,fontSize:8,flexShrink:0,whiteSpace:'nowrap'}}>{p.startDate}</span></div>{p.technologies?.length>0&&<div style={{display:'flex',flexWrap:'wrap',gap:2,margin:'2px 0'}}>{p.technologies.map((t,ti)=><span key={ti} style={{background:C.sec+'18',color:C.sec,fontSize:7.5,padding:'1px 5px',borderRadius:8,fontWeight:600,...SAFE}}>{t}</span>)}</div>}{p.description&&<p style={{margin:0,fontSize:9,color:C.txt+'cc',...SAFE}}>{p.description}</p>}</div>)}</div>}
        {sk.length>0&&<div style={{marginBottom:14}}><h2 style={{margin:'0 0 9px',fontSize:9,fontWeight:700,letterSpacing:2,textTransform:'uppercase',color:C.sec,borderBottom:`2px solid ${C.sec}`,paddingBottom:4,...SAFE}}>Skills</h2><div style={{display:'flex',flexWrap:'wrap',gap:4}}>{sk.flatMap(cat=>cat.skills).map((s,i)=><span key={i} style={{background:C.sec+'15',color:C.sec,fontSize:9,padding:'3px 10px',borderRadius:20,fontWeight:600,border:`1px solid ${C.sec}25`,...SAFE}}>{s.name}</span>)}</div></div>}
        {exp.length>0&&<div style={{marginBottom:14}}><h2 style={{margin:'0 0 9px',fontSize:9,fontWeight:700,letterSpacing:2,textTransform:'uppercase',color:C.sec,borderBottom:`2px solid ${C.sec}`,paddingBottom:4,...SAFE}}>Experience</h2>{exp.map(e=><div key={e.id} style={{marginBottom:9,...SAFE}}><div style={{display:'flex',justifyContent:'space-between',gap:8}}><div style={{...S.flex,...SAFE}}><strong style={{fontSize:10.5,color:C.pri,...SAFE}}>{e.position}</strong><p style={{margin:'1px 0 3px',color:C.sec,fontSize:9.5,...SAFE}}>{e.company}</p></div><span style={{color:C.mut,fontSize:8,flexShrink:0,whiteSpace:'nowrap'}}>{e.startDate}–{e.current?'Now':e.endDate}</span></div>{e.description&&lines(e.description,'•',C.sec)}</div>)}</div>}
        {edu.length>0&&<div><h2 style={{margin:'0 0 7px',fontSize:9,fontWeight:700,letterSpacing:2,textTransform:'uppercase',color:C.sec,borderBottom:`2px solid ${C.sec}`,paddingBottom:4,...SAFE}}>Education</h2>{edu.map(e=><div key={e.id} style={{marginBottom:5,...SAFE}}><strong style={{fontSize:10,...SAFE}}>{e.degree} {e.field?`in ${e.field}`:''}</strong><p style={{margin:'1px 0',color:C.sec,fontSize:9,...SAFE}}>{e.institution}</p><p style={{margin:0,color:C.mut,fontSize:8,...SAFE}}>{e.startDate}–{e.current?'Now':e.endDate}{e.gpa?` · ${e.gpa}`:''}</p></div>)}</div>}
      </div>
    </div>
  )
}

// ─── 12. SKILL FIRST: Skills featured at top ─────────────────────────────────
function SkillFirst({data,c:custom}){
  const C=col(custom)
  const exp=filt.exp(data),edu=filt.edu(data),sk=filt.sk(data),proj=filt.proj(data)
  return(
    <div id="resume-preview" style={{width:794,minHeight:1123,background:C.bg,fontFamily:C.bFont,color:C.txt,padding:'26px 34px',boxSizing:'border-box'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:18,paddingBottom:12,borderBottom:`2px solid ${C.pri}`}}>
        <div style={{...S.flex,...SAFE}}><h1 style={{margin:0,fontFamily:C.hFont,fontSize:21,fontWeight:700,color:C.pri,...SAFE}}>{data.personal.firstName||'Your'} {data.personal.lastName||'Name'}</h1>{data.personal.title&&<p style={{margin:'2px 0 0',color:C.sec,fontSize:10.5,fontWeight:600,...SAFE}}>{data.personal.title}</p>}</div>
        <div style={{textAlign:'right',fontSize:8.5,color:C.mut,lineHeight:1.9,flexShrink:0,marginLeft:16}}>{[data.personal.email,data.personal.phone,data.personal.location].filter(Boolean).map((item,i)=><div key={i} style={{...SAFE}}>{item}</div>)}</div>
      </div>
      {sk.length>0&&<div style={{marginBottom:16,background:C.pri+'08',border:`1px solid ${C.pri}18`,borderRadius:10,padding:'12px 14px',...SAFE}}>
        <p style={{margin:'0 0 9px',fontWeight:700,fontSize:9,textTransform:'uppercase',letterSpacing:1.5,color:C.sec}}>Core Skills</p>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
          {sk.map(cat=><div key={cat.id} style={{...SAFE}}><p style={{margin:'0 0 4px',fontWeight:700,fontSize:9,color:C.pri,...SAFE}}>{cat.category}</p><div style={{display:'flex',flexWrap:'wrap',gap:3}}>{cat.skills.map((s,si)=><span key={si} style={{background:C.sec+'18',color:C.sec,fontSize:8,padding:'2px 7px',borderRadius:10,fontWeight:600,border:`1px solid ${C.sec}25`,...SAFE}}>{s.name}</span>)}</div></div>)}
        </div>
      </div>}
      {proj.length>0&&<div style={{marginBottom:14}}><p style={{margin:'0 0 7px',fontWeight:700,fontSize:8.5,textTransform:'uppercase',letterSpacing:2,color:C.sec,borderBottom:`1px solid ${C.brd}`,paddingBottom:4}}>Projects</p>{proj.map(p=><div key={p.id} style={{marginBottom:7,...SAFE}}><div style={{display:'flex',justifyContent:'space-between',gap:8}}><strong style={{fontSize:10,...S.flex,...SAFE}}>{p.name}</strong>{p.technologies?.length>0&&<div style={{display:'flex',flexWrap:'wrap',gap:2,justifyContent:'flex-end'}}>{p.technologies.slice(0,3).map((t,ti)=><span key={ti} style={{background:C.acc+'18',color:C.acc,fontSize:7.5,padding:'1px 5px',borderRadius:8,fontWeight:600,...SAFE}}>{t}</span>)}</div>}</div><p style={{margin:'2px 0 0',fontSize:9,...SAFE}}>{p.description}</p></div>)}</div>}
      {exp.length>0&&<div style={{marginBottom:14}}><p style={{margin:'0 0 7px',fontWeight:700,fontSize:8.5,textTransform:'uppercase',letterSpacing:2,color:C.sec,borderBottom:`1px solid ${C.brd}`,paddingBottom:4}}>Experience</p>{exp.map(e=><div key={e.id} style={{marginBottom:9,...SAFE}}><div style={{display:'flex',justifyContent:'space-between',gap:8}}><div style={{...S.flex,...SAFE}}><strong style={{fontSize:10.5,color:C.pri,...SAFE}}>{e.position}</strong><p style={{margin:'1px 0 3px',color:C.sec,fontSize:9,...SAFE}}>{e.company}</p></div><span style={{color:C.mut,fontSize:8,flexShrink:0,whiteSpace:'nowrap'}}>{e.startDate}–{e.current?'Now':e.endDate}</span></div>{e.description&&lines(e.description,'•',C.sec)}</div>)}</div>}
      {edu.length>0&&<div><p style={{margin:'0 0 7px',fontWeight:700,fontSize:8.5,textTransform:'uppercase',letterSpacing:2,color:C.sec,borderBottom:`1px solid ${C.brd}`,paddingBottom:4}}>Education</p>{edu.map(e=><div key={e.id} style={{display:'flex',justifyContent:'space-between',gap:8}}><div style={{...S.flex,...SAFE}}><strong style={{fontSize:10,...SAFE}}>{e.degree} {e.field?`in ${e.field}`:''}</strong><p style={{margin:0,color:C.sec,fontSize:9,...SAFE}}>{e.institution}</p></div><span style={{color:C.mut,fontSize:8,flexShrink:0,whiteSpace:'nowrap'}}>{e.startDate}–{e.current?'Now':e.endDate}</span></div>)}</div>}
    </div>
  )
}

// ─── 13. MAGAZINE: Editorial bold headings ───────────────────────────────────
function Magazine({data,c:custom}){
  const C=col(custom)
  const exp=filt.exp(data),edu=filt.edu(data),sk=filt.sk(data),proj=filt.proj(data)
  return(
    <div id="resume-preview" style={{width:794,minHeight:1123,background:C.bg,fontFamily:C.bFont,color:C.txt}}>
      <div style={{padding:'24px 34px 16px',borderBottom:`5px solid ${C.pri}`,overflow:'hidden'}}>
        <h1 style={{margin:0,fontFamily:C.hFont,fontSize:34,fontWeight:900,color:C.pri,letterSpacing:-2,textTransform:'uppercase',lineHeight:1,...SAFE}}>{data.personal.firstName||'YOUR'} {data.personal.lastName||'NAME'}</h1>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:6}}>
          {data.personal.title&&<p style={{margin:0,fontSize:12,color:C.sec,fontWeight:700,letterSpacing:1.5,textTransform:'uppercase',...SAFE}}>{data.personal.title}</p>}
          <div style={{display:'flex',gap:14,fontSize:8.5,color:C.mut,flexShrink:0,marginLeft:16}}>{[data.personal.email,data.personal.phone,data.personal.location].filter(Boolean).map((item,i)=><span key={i} style={{...SAFE}}>{item}</span>)}</div>
        </div>
      </div>
      <div style={{display:'flex'}}>
        <div style={{flex:1.85,padding:'18px 22px 18px 34px',borderRight:`2px solid ${C.brd}`,...S.flex}}>
          {data.personal.summary&&<div style={{marginBottom:16,...SAFE}}><p style={{margin:0,fontSize:10.5,lineHeight:1.8,fontStyle:'italic',borderLeft:`4px solid ${C.sec}`,paddingLeft:11,...SAFE}}>{data.personal.summary}</p></div>}
          {exp.length>0&&<div style={{marginBottom:16}}>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:9}}><h2 style={{margin:0,fontFamily:C.hFont,fontSize:15,fontWeight:900,textTransform:'uppercase',color:C.pri,letterSpacing:-.5,...SAFE}}>Experience</h2><div style={{flex:1,height:2,background:C.pri}}/></div>
            {exp.map(e=><div key={e.id} style={{marginBottom:11,...SAFE}}><div style={{display:'flex',justifyContent:'space-between',gap:8}}><div style={{...S.flex,...SAFE}}><strong style={{fontSize:11.5,color:C.pri,...SAFE}}>{e.position}</strong><span style={{color:C.sec,fontSize:10,fontWeight:700,marginLeft:8}}> @ {e.company}</span></div><span style={{color:C.mut,fontSize:8.5,background:C.pri+'12',padding:'2px 8px',borderRadius:99,flexShrink:0,whiteSpace:'nowrap'}}>{e.startDate}–{e.current?'Now':e.endDate}</span></div>{e.description&&<div style={{marginTop:3}}>{lines(e.description,'■',C.sec)}</div>}</div>)}
          </div>}
          {proj.length>0&&<div>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:9}}><h2 style={{margin:0,fontFamily:C.hFont,fontSize:15,fontWeight:900,textTransform:'uppercase',color:C.pri,letterSpacing:-.5,...SAFE}}>Projects</h2><div style={{flex:1,height:2,background:C.pri}}/></div>
            {proj.map(p=><div key={p.id} style={{marginBottom:9,...SAFE}}><strong style={{fontSize:11.5,color:C.pri,...SAFE}}>{p.name}</strong>{p.technologies?.length>0&&<span style={{color:C.mut,fontSize:9,marginLeft:8,...SAFE}}>{p.technologies.join(' · ')}</span>}<p style={{margin:'3px 0 0',fontSize:9.5,lineHeight:1.6,...SAFE}}>{p.description}</p></div>)}
          </div>}
        </div>
        <div style={{flex:1,padding:'18px 16px 18px 14px',...S.flex}}>
          {edu.length>0&&<div style={{marginBottom:13}}>
            <h2 style={{margin:'0 0 7px',fontFamily:C.hFont,fontSize:11,fontWeight:900,textTransform:'uppercase',color:C.pri,borderBottom:`2px solid ${C.pri}`,paddingBottom:4,...SAFE}}>Education</h2>
            {edu.map(e=><div key={e.id} style={{marginBottom:7,...SAFE}}><strong style={{fontSize:10,...SAFE}}>{e.degree} {e.field?`in ${e.field}`:''}</strong><p style={{margin:'1px 0',color:C.sec,fontSize:9,...SAFE}}>{e.institution}</p><p style={{margin:0,color:C.mut,fontSize:8,...SAFE}}>{e.startDate}–{e.current?'Now':e.endDate}{e.gpa?` · ${e.gpa}`:''}</p></div>)}
          </div>}
          {sk.length>0&&<div>
            <h2 style={{margin:'0 0 7px',fontFamily:C.hFont,fontSize:11,fontWeight:900,textTransform:'uppercase',color:C.pri,borderBottom:`2px solid ${C.pri}`,paddingBottom:4,...SAFE}}>Skills</h2>
            {sk.map(cat=><div key={cat.id} style={{marginBottom:7,...SAFE}}><p style={{margin:'0 0 4px',fontWeight:700,fontSize:9,color:C.sec,...SAFE}}>{cat.category}</p><div style={{display:'flex',flexWrap:'wrap',gap:3}}>{cat.skills.map((s,si)=><span key={si} style={{background:C.pri+'12',color:C.pri,fontSize:8,padding:'2px 6px',borderRadius:4,fontWeight:700,textTransform:'uppercase',letterSpacing:.3,...SAFE}}>{s.name}</span>)}</div></div>)}
          </div>}
        </div>
      </div>
    </div>
  )
}

// ─── 14. TABLE FORMAT: Structured rows ────────────────────────────────────────
function TableFormat({data,c:custom}){
  const C=col(custom)
  const exp=filt.exp(data),edu=filt.edu(data),sk=filt.sk(data)
  const row={display:'grid',gridTemplateColumns:'110px 1fr',borderBottom:`1px solid ${C.brd}`,padding:'7px 0',gap:10,overflow:'hidden'}
  const lbl={fontSize:8.5,fontWeight:700,color:C.sec,textTransform:'uppercase',letterSpacing:1,...SAFE}
  return(
    <div id="resume-preview" style={{width:794,minHeight:1123,background:C.bg,fontFamily:'Helvetica,Arial,sans-serif',color:C.txt,padding:'28px 36px',boxSizing:'border-box'}}>
      <div style={{marginBottom:22,...SAFE}}>
        <h1 style={{margin:0,fontFamily:C.hFont,fontSize:24,fontWeight:700,color:C.pri,letterSpacing:-.5,...SAFE}}>{data.personal.firstName||'Your'} {data.personal.lastName||'Name'}</h1>
        {data.personal.title&&<p style={{margin:'2px 0 0',color:C.sec,fontSize:11.5,fontWeight:600,...SAFE}}>{data.personal.title}</p>}
      </div>
      <div style={{border:`1px solid ${C.brd}`,borderRadius:7,overflow:'hidden',marginBottom:18}}>
        <div style={{background:C.pri,padding:'5px 12px'}}><span style={{fontSize:7.5,fontWeight:700,color:'rgba(255,255,255,0.7)',textTransform:'uppercase',letterSpacing:2}}>Contact Information</span></div>
        <div style={{padding:'7px 12px',display:'flex',gap:20,flexWrap:'wrap'}}>
          {[['Email',data.personal.email],['Phone',data.personal.phone],['Location',data.personal.location],['LinkedIn',data.personal.linkedin&&`in/${data.personal.linkedin}`],['GitHub',data.personal.github&&`/${data.personal.github}`]].filter(([,v])=>v).map(([k,v])=><div key={k} style={{...SAFE}}><span style={{fontSize:8,color:C.mut,display:'block',marginBottom:1}}>{k}</span><span style={{fontSize:9.5,color:C.txt,fontWeight:600,...SAFE}}>{v}</span></div>)}
        </div>
      </div>
      {data.personal.summary&&<div style={row}><span style={lbl}>Profile</span><p style={{margin:0,fontSize:9.5,lineHeight:1.7,...SAFE}}>{data.personal.summary}</p></div>}
      {exp.length>0&&exp.map((e,i)=><div key={e.id} style={{...row,borderTop:i===0?`2px solid ${C.pri}`:'none',marginTop:i===0?8:0}}>
        <div style={lbl}>{i===0?'Experience':''}<span style={{display:'block',fontWeight:400,color:C.mut,fontSize:8,marginTop:2,...SAFE}}>{e.startDate}–{e.current?'Now':e.endDate}</span></div>
        <div style={{...S.flex,...SAFE}}><strong style={{fontSize:10.5,color:C.pri,...SAFE}}>{e.position}</strong><span style={{color:C.sec,fontSize:9.5,marginLeft:8,...SAFE}}>{e.company}</span>{e.description&&<div style={{marginTop:3}}>{lines(e.description,'•',C.sec)}</div>}</div>
      </div>)}
      {edu.length>0&&edu.map((e,i)=><div key={e.id} style={{...row,borderTop:i===0?`2px solid ${C.pri}`:'none',marginTop:i===0?8:0}}>
        <div style={lbl}>{i===0?'Education':''}<span style={{display:'block',fontWeight:400,color:C.mut,fontSize:8,marginTop:2,...SAFE}}>{e.startDate}–{e.current?'Now':e.endDate}</span></div>
        <div style={{...S.flex,...SAFE}}><strong style={{fontSize:10.5,color:C.pri,...SAFE}}>{e.degree} {e.field?`in ${e.field}`:''}</strong><p style={{margin:0,color:C.sec,fontSize:9.5,...SAFE}}>{e.institution}{e.gpa?` · GPA: ${e.gpa}`:''}</p></div>
      </div>)}
      {sk.length>0&&<div style={{...row,borderTop:`2px solid ${C.pri}`,marginTop:8}}><span style={lbl}>Skills</span><div style={{display:'flex',flexWrap:'wrap',gap:4,paddingTop:1,...SAFE}}>{sk.flatMap(cat=>cat.skills).map((s,i)=><span key={i} style={{background:C.sec+'18',color:C.sec,fontSize:8.5,padding:'2px 8px',borderRadius:4,fontWeight:600,border:`1px solid ${C.sec}25`,...SAFE}}>{s.name}</span>)}</div></div>}
    </div>
  )
}

// ─── 15. ULTRA CLEAN: Max whitespace, hairline dividers ──────────────────────
function UltraClean({data,c:custom}){
  const C=col(custom)
  const exp=filt.exp(data),edu=filt.edu(data),sk=filt.sk(data)
  return(
    <div id="resume-preview" style={{width:794,minHeight:1123,background:'#FAFAFA',fontFamily:'Helvetica Neue,Arial,sans-serif',color:'#1A1A1A',padding:'48px 56px',boxSizing:'border-box'}}>
      <div style={{marginBottom:32,...SAFE}}>
        <h1 style={{margin:0,fontSize:28,fontWeight:300,letterSpacing:-1,color:'#0A0A0A',...SAFE}}>{data.personal.firstName||'Your'} {data.personal.lastName||'Name'}</h1>
        {data.personal.title&&<p style={{margin:'5px 0 0',fontSize:11.5,color:C.sec,fontWeight:400,letterSpacing:.5,...SAFE}}>{data.personal.title}</p>}
        <p style={{margin:'6px 0 0',fontSize:8.5,color:'#999',letterSpacing:.3,...SAFE}}>{[data.personal.email,data.personal.phone,data.personal.location,data.personal.linkedin&&`linkedin.com/in/${data.personal.linkedin}`].filter(Boolean).join('  ·  ')}</p>
      </div>
      <div style={{height:1,background:'#DCDCDC',margin:'0 0 14px'}}/>
      {data.personal.summary&&<><p style={{margin:'0 0 14px',fontSize:10,lineHeight:1.9,color:'#444',maxWidth:500,...SAFE}}>{data.personal.summary}</p><div style={{height:1,background:'#DCDCDC',margin:'0 0 14px'}}/></>}
      {exp.length>0&&<><div style={{marginBottom:12}}>{exp.map(e=><div key={e.id} style={{marginBottom:14}}><div style={{display:'flex',justifyContent:'space-between',gap:8}}><span style={{fontSize:11,fontWeight:600,color:'#111',...S.flex,...SAFE}}>{e.position}</span><span style={{fontSize:8.5,color:'#999',flexShrink:0,whiteSpace:'nowrap'}}>{e.startDate}–{e.current?'Now':e.endDate}</span></div><p style={{margin:'2px 0 5px',fontSize:10,color:C.sec,fontWeight:500,...SAFE}}>{e.company}{e.location?', '+e.location:''}</p>{e.description&&<div style={{fontSize:9.5,color:'#555',lineHeight:1.7,...SAFE}}>{lines(e.description,'',C.sec)}</div>}</div>)}</div><div style={{height:1,background:'#DCDCDC',margin:'0 0 14px'}}/></>}
      <div style={{display:'flex',gap:36}}>
        {edu.length>0&&<div style={{flex:1,...S.flex}}><p style={{margin:'0 0 9px',fontSize:8,fontWeight:700,letterSpacing:2,textTransform:'uppercase',color:'#BBB'}}>Education</p>{edu.map(e=><div key={e.id} style={{marginBottom:7,...SAFE}}><p style={{margin:0,fontSize:10.5,fontWeight:600,color:'#111',...SAFE}}>{e.institution}</p><p style={{margin:'1px 0',fontSize:9.5,color:'#555',...SAFE}}>{e.degree} {e.field?`in ${e.field}`:''}</p><p style={{margin:0,fontSize:8.5,color:'#999',...SAFE}}>{e.startDate}–{e.current?'Now':e.endDate}{e.gpa?` · ${e.gpa}`:''}</p></div>)}</div>}
        {sk.length>0&&<div style={{flex:1.3,...S.flex}}><p style={{margin:'0 0 9px',fontSize:8,fontWeight:700,letterSpacing:2,textTransform:'uppercase',color:'#BBB'}}>Skills</p>{sk.map(cat=><div key={cat.id} style={{marginBottom:5,...SAFE}}><p style={{margin:'0 0 2px',fontSize:9,color:'#777',fontWeight:600,...SAFE}}>{cat.category}</p><p style={{margin:0,fontSize:9.5,color:'#444',lineHeight:1.7,...SAFE}}>{cat.skills.map(s=>s.name).join(', ')}</p></div>)}</div>}
      </div>
    </div>
  )
}

// ─── 16. MONO DEV: Courier/code-doc style ─────────────────────────────────────
function MonoDev({data,c:custom}){
  const C=col(custom)
  const exp=filt.exp(data),edu=filt.edu(data),sk=filt.sk(data),proj=filt.proj(data)
  const mono="'Courier New',Courier,monospace"
  return(
    <div id="resume-preview" style={{width:794,minHeight:1123,background:'#FFFEF9',fontFamily:mono,color:'#1a1a1a',padding:'28px 38px',boxSizing:'border-box'}}>
      <div style={{marginBottom:16,borderBottom:`2px solid #1a1a1a`,paddingBottom:9,...SAFE}}>
        <h1 style={{margin:0,fontSize:20,fontWeight:700,fontFamily:mono,letterSpacing:-.5,...SAFE}}>{data.personal.firstName||'Your'} {data.personal.lastName||'Name'}</h1>
        {data.personal.title&&<p style={{margin:'2px 0 0',color:C.sec,fontSize:9.5,fontWeight:600,...SAFE}}>{'// ' + data.personal.title}</p>}
        <p style={{margin:'4px 0 0',fontSize:8,color:'#666',...SAFE}}>{[data.personal.email&&`email: ${data.personal.email}`,data.personal.phone&&`phone: ${data.personal.phone}`,data.personal.github&&`github: /${data.personal.github}`,data.personal.linkedin&&`linkedin: /${data.personal.linkedin}`].filter(Boolean).join('  |  ')}</p>
      </div>
      {data.personal.summary&&<div style={{marginBottom:13,...SAFE}}><p style={{margin:'0 0 2px',fontWeight:700,color:C.sec,fontSize:9}}>{'/* ABOUT */'}</p><p style={{margin:0,lineHeight:1.7,color:'#333',paddingLeft:8,fontSize:9,...SAFE}}>{data.personal.summary}</p></div>}
      {sk.length>0&&<div style={{marginBottom:13,...SAFE}}><p style={{margin:'0 0 3px',fontWeight:700,color:C.sec,fontSize:9}}>{'/* SKILLS */'}</p>{sk.map(cat=><p key={cat.id} style={{margin:'1px 0',paddingLeft:8,fontSize:9,...SAFE}}><span style={{color:C.sec,fontWeight:700}}>{cat.category}:</span> {cat.skills.map(s=>s.name).join(', ')}</p>)}</div>}
      {exp.length>0&&<div style={{marginBottom:13}}><p style={{margin:'0 0 5px',fontWeight:700,color:C.sec,fontSize:9}}>{'/* EXPERIENCE */'}</p>{exp.map(e=><div key={e.id} style={{marginBottom:9,paddingLeft:8,...SAFE}}><p style={{margin:'0 0 1px',fontSize:9,...SAFE}}><strong>{e.position}</strong> @ {e.company} <span style={{color:'#999',fontSize:8}}>({e.startDate}→{e.current?'present':e.endDate})</span></p>{e.description&&<div style={{paddingLeft:8,marginTop:2}}>{lines(e.description,'>',C.sec)}</div>}</div>)}</div>}
      {proj.length>0&&<div style={{marginBottom:13}}><p style={{margin:'0 0 5px',fontWeight:700,color:C.sec,fontSize:9}}>{'/* PROJECTS */'}</p>{proj.map(p=><div key={p.id} style={{marginBottom:6,paddingLeft:8,...SAFE}}><p style={{margin:'0 0 1px',fontSize:9,...SAFE}}><strong>{p.name}</strong>{p.technologies?.length>0&&<span style={{color:'#999',fontSize:8}}> [{p.technologies.join(', ')}]</span>}</p><p style={{margin:0,color:'#555',paddingLeft:8,fontSize:9,...SAFE}}>{p.description}</p></div>)}</div>}
      {edu.length>0&&<div><p style={{margin:'0 0 5px',fontWeight:700,color:C.sec,fontSize:9}}>{'/* EDUCATION */'}</p>{edu.map(e=><p key={e.id} style={{margin:'1px 0',paddingLeft:8,fontSize:9,...SAFE}}>{e.degree} {e.field?`in ${e.field}`:''} — {e.institution} ({e.startDate}–{e.current?'now':e.endDate}){e.gpa?` | gpa: ${e.gpa}`:''}</p>)}</div>}
    </div>
  )
}

// ─── 17. SPLIT EQUAL: True 50/50 two columns ─────────────────────────────────
function SplitEqual({data,c:custom}){
  const C=col(custom)
  const exp=filt.exp(data),edu=filt.edu(data),sk=filt.sk(data),proj=filt.proj(data),lang=filt.lang(data),cert=filt.cert(data)
  return(
    <div id="resume-preview" style={{width:794,minHeight:1123,background:C.bg,fontFamily:C.bFont,color:C.txt,display:'flex',flexDirection:'column'}}>
      <div style={{background:`linear-gradient(135deg,${C.pri},${C.sec})`,padding:'18px 26px',display:'flex',alignItems:'center',justifyContent:'space-between',flexShrink:0}}>
        <div style={{...S.flex,...SAFE}}>
          {custom.showPhoto&&data.personal.photo&&<Image unoptimized src={data.personal.photo} alt="" width={50} height={50} style={{width:50,height:50,borderRadius:'50%',objectFit:'cover',border:'2px solid rgba(255,255,255,0.5)',float:'left',marginRight:10}} />}
          <h1 style={{margin:0,fontFamily:C.hFont,fontSize:20,fontWeight:700,color:'#fff',...SAFE}}>{data.personal.firstName||'Your'} {data.personal.lastName||'Name'}</h1>
          {data.personal.title&&<p style={{margin:'2px 0 0',color:'rgba(255,255,255,0.8)',fontSize:10,...SAFE}}>{data.personal.title}</p>}
        </div>
        <div style={{textAlign:'right',fontSize:8.5,color:'rgba(255,255,255,0.72)',lineHeight:1.9,flexShrink:0,marginLeft:16}}>{[data.personal.email,data.personal.phone,data.personal.location].filter(Boolean).map((item,i)=><div key={i} style={{...SAFE}}>{item}</div>)}</div>
      </div>
      <div style={{display:'flex',flex:1}}>
        <div style={{width:'50%',padding:'16px 14px 16px 18px',boxSizing:'border-box',borderRight:`1px solid ${C.brd}`,...S.flex}}>
          {data.personal.summary&&<div style={{marginBottom:12,padding:'9px 11px',background:C.sec+'12',borderRadius:7,...SAFE}}><p style={{margin:0,fontSize:9.5,lineHeight:1.7,...SAFE}}>{data.personal.summary}</p></div>}
          {exp.length>0&&<div style={{marginBottom:12}}><h2 style={{margin:'0 0 7px',fontSize:8.5,fontWeight:700,letterSpacing:2,textTransform:'uppercase',color:C.sec,borderBottom:`1px solid ${C.brd}`,paddingBottom:4,...SAFE}}>Experience</h2>{exp.map(e=><div key={e.id} style={{marginBottom:9,...SAFE}}><div style={{display:'flex',justifyContent:'space-between',gap:6}}><div style={{...S.flex,...SAFE}}><strong style={{fontSize:10,color:C.pri,...SAFE}}>{e.position}</strong><p style={{margin:'1px 0 3px',color:C.sec,fontSize:9,...SAFE}}>{e.company}</p></div><span style={{color:C.mut,fontSize:8,flexShrink:0,whiteSpace:'nowrap'}}>{e.startDate}–{e.current?'Now':e.endDate}</span></div>{e.description&&lines(e.description,'•',C.sec)}</div>)}</div>}
          {edu.length>0&&<div><h2 style={{margin:'0 0 7px',fontSize:8.5,fontWeight:700,letterSpacing:2,textTransform:'uppercase',color:C.sec,borderBottom:`1px solid ${C.brd}`,paddingBottom:4,...SAFE}}>Education</h2>{edu.map(e=><div key={e.id} style={{marginBottom:5,...SAFE}}><strong style={{fontSize:10,color:C.pri,...SAFE}}>{e.degree} {e.field?`in ${e.field}`:''}</strong><p style={{margin:'1px 0',color:C.sec,fontSize:9,...SAFE}}>{e.institution}</p><p style={{margin:0,color:C.mut,fontSize:8,...SAFE}}>{e.startDate}–{e.current?'Now':e.endDate}{e.gpa?` · ${e.gpa}`:''}</p></div>)}</div>}
        </div>
        <div style={{width:'50%',padding:'16px 18px 16px 14px',boxSizing:'border-box',...S.flex}}>
          {sk.length>0&&<div style={{marginBottom:12}}><h2 style={{margin:'0 0 7px',fontSize:8.5,fontWeight:700,letterSpacing:2,textTransform:'uppercase',color:C.sec,borderBottom:`1px solid ${C.brd}`,paddingBottom:4,...SAFE}}>Skills</h2>{sk.map(cat=><div key={cat.id} style={{marginBottom:7,...SAFE}}><p style={{margin:'0 0 4px',fontWeight:700,fontSize:9,color:C.pri,...SAFE}}>{cat.category}</p><div style={{display:'flex',flexWrap:'wrap',gap:3}}>{cat.skills.map((s,si)=><span key={si} style={{background:C.sec+'18',color:C.sec,fontSize:8,padding:'2px 7px',borderRadius:10,fontWeight:600,...SAFE}}>{s.name}</span>)}</div></div>)}</div>}
          {proj.length>0&&<div style={{marginBottom:12}}><h2 style={{margin:'0 0 7px',fontSize:8.5,fontWeight:700,letterSpacing:2,textTransform:'uppercase',color:C.sec,borderBottom:`1px solid ${C.brd}`,paddingBottom:4,...SAFE}}>Projects</h2>{proj.map(p=><div key={p.id} style={{marginBottom:6,...SAFE}}><strong style={{fontSize:10,color:C.pri,...SAFE}}>{p.name}</strong>{p.technologies?.length>0&&<div style={{display:'flex',flexWrap:'wrap',gap:2,margin:'2px 0'}}>{p.technologies.map((t,ti)=><span key={ti} style={{background:C.acc+'18',color:C.acc,fontSize:7.5,padding:'1px 5px',borderRadius:8,fontWeight:600,...SAFE}}>{t}</span>)}</div>}<p style={{margin:0,fontSize:8.5,color:C.txt+'bb',...SAFE}}>{p.description}</p></div>)}</div>}
          {lang.length>0&&<div style={{marginBottom:10}}><h2 style={{margin:'0 0 7px',fontSize:8.5,fontWeight:700,letterSpacing:2,textTransform:'uppercase',color:C.sec,borderBottom:`1px solid ${C.brd}`,paddingBottom:4,...SAFE}}>Languages</h2>{lang.map(l=><div key={l.id} style={{display:'flex',justifyContent:'space-between',marginBottom:3,gap:4}}><span style={{fontSize:9,...S.flex,...SAFE}}>{l.language}</span><span style={{fontSize:8.5,color:C.mut,background:C.brd,padding:'1px 5px',borderRadius:6,flexShrink:0}}>{l.proficiency}</span></div>)}</div>}
          {cert.length>0&&<div><h2 style={{margin:'0 0 7px',fontSize:8.5,fontWeight:700,letterSpacing:2,textTransform:'uppercase',color:C.sec,borderBottom:`1px solid ${C.brd}`,paddingBottom:4,...SAFE}}>Certifications</h2>{cert.map(ct=><div key={ct.id} style={{marginBottom:4,...SAFE}}><strong style={{fontSize:9.5,color:C.pri,...SAFE}}>{ct.name}</strong><p style={{margin:'1px 0',color:C.sec,fontSize:8.5,...SAFE}}>{ct.issuer}{ct.date?` · ${ct.date}`:''}</p></div>)}</div>}
        </div>
      </div>
    </div>
  )
}

// ─── 18. RIGHT HEAVY: Narrow skills left, dominant experience right ───────────
function RightHeavy({data,c:custom}){
  const C=col(custom)
  const exp=filt.exp(data),edu=filt.edu(data),sk=filt.sk(data),cert=filt.cert(data),lang=filt.lang(data)
  return(
    <div id="resume-preview" style={{width:794,minHeight:1123,background:C.bg,fontFamily:C.bFont,color:C.txt,display:'flex',flexDirection:'column'}}>
      <div style={{background:C.pri,padding:'12px 26px',display:'flex',justifyContent:'space-between',alignItems:'center',flexShrink:0}}>
        <div style={{...S.flex,...SAFE}}><h1 style={{margin:0,fontFamily:C.hFont,fontSize:18,fontWeight:700,color:'#fff',letterSpacing:-.3,...SAFE}}>{data.personal.firstName||'Your'} {data.personal.lastName||'Name'}</h1>{data.personal.title&&<p style={{margin:'1px 0 0',color:C.sec,fontSize:9.5,fontWeight:500,...SAFE}}>{data.personal.title}</p>}</div>
        <div style={{display:'flex',gap:14,flexWrap:'wrap',justifyContent:'flex-end',flexShrink:0,marginLeft:16}}>{[data.personal.email&&`✉ ${data.personal.email}`,data.personal.phone&&`📱 ${data.personal.phone}`,data.personal.location&&`📍 ${data.personal.location}`].filter(Boolean).map((item,i)=><span key={i} style={{color:'rgba(255,255,255,0.65)',fontSize:8,...SAFE}}>{item}</span>)}</div>
      </div>
      <div style={{display:'flex',flex:1}}>
        <div style={{width:'30%',background:C.pri+'0A',padding:'14px 11px',borderRight:`1px solid ${C.brd}`,boxSizing:'border-box',flexShrink:0}}>
          {sk.length>0&&<div style={{marginBottom:13,...SAFE}}><p style={{margin:'0 0 6px',fontSize:7.5,fontWeight:700,letterSpacing:2,textTransform:'uppercase',color:C.sec}}>Skills</p>{sk.map(cat=><div key={cat.id} style={{marginBottom:7,...SAFE}}><p style={{margin:'0 0 3px',fontWeight:700,fontSize:9,color:C.pri,...SAFE}}>{cat.category}</p>{cat.skills.slice(0,6).map((s,si)=><div key={si} style={{marginBottom:2.5,...SAFE}}><div style={{display:'flex',justifyContent:'space-between',marginBottom:1}}><span style={{fontSize:8,...S.flex,...SAFE}}>{s.name}</span><span style={{fontSize:7,color:C.mut,flexShrink:0}}>{s.level}%</span></div><div style={{height:2.5,background:C.brd,borderRadius:2}}><div style={{width:`${s.level}%`,height:'100%',background:C.sec,borderRadius:2}}/></div></div>)}</div>)}</div>}
          {lang.length>0&&<div style={{marginBottom:13,...SAFE}}><p style={{margin:'0 0 6px',fontSize:7.5,fontWeight:700,letterSpacing:2,textTransform:'uppercase',color:C.sec}}>Languages</p>{lang.map(l=><div key={l.id} style={{display:'flex',justifyContent:'space-between',marginBottom:3,gap:3}}><span style={{fontSize:9,...S.flex,...SAFE}}>{l.language}</span><span style={{fontSize:8,color:C.mut,flexShrink:0}}>{l.proficiency}</span></div>)}</div>}
          {cert.length>0&&<div style={{...SAFE}}><p style={{margin:'0 0 6px',fontSize:7.5,fontWeight:700,letterSpacing:2,textTransform:'uppercase',color:C.sec}}>Certs</p>{cert.map(ct=><div key={ct.id} style={{marginBottom:4,...SAFE}}><p style={{margin:0,fontWeight:700,fontSize:8.5,...SAFE}}>{ct.name}</p><p style={{margin:0,fontSize:8,color:C.mut,...SAFE}}>{ct.issuer}</p></div>)}</div>}
        </div>
        <div style={{flex:1,padding:'16px 18px',boxSizing:'border-box',...S.flex}}>
          {data.personal.summary&&<p style={{margin:'0 0 12px',fontSize:9.5,lineHeight:1.7,color:C.txt+'cc',padding:'9px 11px',background:C.sec+'10',borderRadius:7,borderLeft:`3px solid ${C.sec}`,...SAFE}}>{data.personal.summary}</p>}
          {exp.length>0&&<div style={{marginBottom:13}}><h2 style={{margin:'0 0 7px',fontSize:8.5,fontWeight:700,letterSpacing:2,textTransform:'uppercase',color:C.sec,display:'flex',alignItems:'center',gap:7}}>Experience <div style={{flex:1,height:1,background:C.brd}}/></h2>{exp.map(e=><div key={e.id} style={{marginBottom:9,paddingBottom:9,borderBottom:`1px solid ${C.brd}`}}>
            <div style={{display:'flex',justifyContent:'space-between',gap:8}}><div style={{...S.flex,...SAFE}}><strong style={{fontSize:10.5,color:C.pri,...SAFE}}>{e.position}</strong><span style={{color:C.sec,fontSize:9.5,marginLeft:7,fontWeight:500,...SAFE}}>{e.company}{e.location?`, ${e.location}`:''}</span></div><span style={{color:C.mut,fontSize:8,flexShrink:0,whiteSpace:'nowrap'}}>{e.startDate}–{e.current?'Now':e.endDate}</span></div>
            {e.description&&<div style={{marginTop:3}}>{lines(e.description,'›',C.sec)}</div>}
          </div>)}</div>}
          {edu.length>0&&<div><h2 style={{margin:'0 0 7px',fontSize:8.5,fontWeight:700,letterSpacing:2,textTransform:'uppercase',color:C.sec,display:'flex',alignItems:'center',gap:7}}>Education <div style={{flex:1,height:1,background:C.brd}}/></h2>{edu.map(e=><div key={e.id} style={{marginBottom:5,display:'flex',justifyContent:'space-between',gap:8}}><div style={{...S.flex,...SAFE}}><strong style={{fontSize:10.5,color:C.pri,...SAFE}}>{e.degree} {e.field?`in ${e.field}`:''}</strong><p style={{margin:0,color:C.sec,fontSize:9,...SAFE}}>{e.institution}{e.gpa?` · ${e.gpa}`:''}</p></div><span style={{color:C.mut,fontSize:8,flexShrink:0,whiteSpace:'nowrap'}}>{e.startDate}–{e.current?'Now':e.endDate}</span></div>)}</div>}
        </div>
      </div>
    </div>
  )
}

// ─── RENDER ────────────────────────────────────────────────────────────────────
export function renderTemplate(templateId, data, custom) {
  const tmpl = TEMPLATES[templateId]
  const DEFAULTS = { primaryColor:'#1E2D4A', secondaryColor:'#4A90D9', accentColor:'#10B981' }
  const userChanged = (k) => custom[k] && custom[k] !== DEFAULTS[k]
  const c = {
    ...custom,
    primaryColor:   userChanged('primaryColor')   ? custom.primaryColor   : (tmpl?.ov?.primary   || custom.primaryColor),
    secondaryColor: userChanged('secondaryColor') ? custom.secondaryColor : (tmpl?.ov?.secondary || custom.secondaryColor),
    accentColor:    userChanged('accentColor')    ? custom.accentColor    : (tmpl?.ov?.accent    || custom.accentColor),
  }
  const props = { data, c }
  const base = tmpl?.base || 'two-col'
  switch (base) {
    case 'two-col':       return <TwoCol {...props} />
    case 'centered':      return <Centered {...props} />
    case 'minimal':       return <Minimal {...props} />
    case 'dark':          return <Dark {...props} />
    case 'sidebar':       return <Sidebar {...props} />
    case 'elegant':       return <Elegant {...props} />
    case 'timeline':      return <Timeline {...props} />
    case 'compact':       return <Compact {...props} />
    case 'cards':         return <Cards {...props} />
    case 'accent-border': return <AccentBorder {...props} />
    case 'hero-header':   return <HeroHeader {...props} />
    case 'skill-first':   return <SkillFirst {...props} />
    case 'magazine':      return <Magazine {...props} />
    case 'table-format':  return <TableFormat {...props} />
    case 'ultra-clean':   return <UltraClean {...props} />
    case 'mono-dev':      return <MonoDev {...props} />
    case 'split-equal':   return <SplitEqual {...props} />
    case 'right-heavy':   return <RightHeavy {...props} />
    case 'terminal-cli':  return <Terminal {...props} />
    case 'github-readme': return <GithubReadme {...props} />
    case 'matrix-grid':   return <Matrix {...props} />
    default:              return <TwoCol {...props} />
  }
}

export { TwoCol, Centered, Minimal, Dark, Sidebar, Elegant, Timeline, Compact, Cards, AccentBorder, HeroHeader, SkillFirst, Magazine, TableFormat, UltraClean, MonoDev, SplitEqual, RightHeavy, Terminal, GithubReadme, Matrix }

// ─── 19. TERMINAL: True CLI-style, $ prompts, command output ─────────────────
function Terminal({data,c:custom}){
  const C=col(custom)
  const exp=filt.exp(data),edu=filt.edu(data),sk=filt.sk(data),proj=filt.proj(data)
  const bg='#0A0A0A', green='#22C55E', dim='rgba(34,197,94,0.55)', mut='rgba(255,255,255,0.35)'
  return(
    <div id="resume-preview" style={{width:794,minHeight:1123,background:bg,fontFamily:"'Courier New',monospace",color:green}}>
      {/* Terminal title bar */}
      <div style={{background:'#1C1C1C',borderBottom:'1px solid #333',padding:'8px 14px',display:'flex',alignItems:'center',gap:6,flexShrink:0}}>
        {['#FF5F57','#FFBD2E','#28CA41'].map((c,i)=><span key={i} style={{width:10,height:10,borderRadius:'50%',background:c,display:'inline-block'}}/>)}
        <span style={{marginLeft:8,fontSize:8.5,color:'rgba(255,255,255,0.4)'}}>~/{(data.personal.lastName||'user').toLowerCase()}/resume.sh</span>
      </div>
      <div style={{padding:'14px 18px',fontSize:9}}>
        {/* whoami */}
        <div style={{marginBottom:12,...SAFE}}>
          <p style={{margin:'0 0 2px',color:dim}}><span style={{color:green}}>$ </span>whoami</p>
          <p style={{margin:'0 0 1px',color:'#fff',fontSize:11,fontWeight:700,...SAFE}}>{data.personal.firstName||'dev'} {data.personal.lastName||'user'}</p>
          {data.personal.title&&<p style={{margin:'0 0 1px',color:green,...SAFE}}># {data.personal.title}</p>}
          <p style={{margin:0,color:mut,fontSize:8.5,...SAFE}}>{[data.personal.email&&`email=${data.personal.email}`,data.personal.phone&&`phone=${data.personal.phone}`,data.personal.github&&`github=/${data.personal.github}`,data.personal.location&&`location="${data.personal.location}"`].filter(Boolean).join('  ')}</p>
        </div>
        {/* Summary */}
        {data.personal.summary&&<div style={{marginBottom:12,...SAFE}}>
          <p style={{margin:'0 0 2px',color:dim}}><span style={{color:green}}>$ </span>cat about.txt</p>
          <p style={{margin:0,color:'rgba(255,255,255,0.75)',lineHeight:1.7,fontSize:9,...SAFE}}>{data.personal.summary}</p>
        </div>}
        {/* Skills */}
        {sk.length>0&&<div style={{marginBottom:12,...SAFE}}>
          <p style={{margin:'0 0 4px',color:dim}}><span style={{color:green}}>$ </span>cat skills.json</p>
          <div style={{background:'#111',border:'1px solid #2a2a2a',borderRadius:4,padding:'8px 10px',...SAFE}}>
            {sk.map(cat=><div key={cat.id} style={{marginBottom:5,...SAFE}}>
              <span style={{color:green,fontWeight:700,fontSize:9}}>{cat.category.toLowerCase().replace(' ','_')}</span><span style={{color:'rgba(255,255,255,0.4)'}}>: [</span>
              <span style={{color:'#E5C07B',fontSize:8.5,...SAFE}}>{cat.skills.map(s=>`"${s.name}"`).join(', ')}</span>
              <span style={{color:'rgba(255,255,255,0.4)'}}>]</span>
            </div>)}
          </div>
        </div>}
        {/* Experience */}
        {exp.length>0&&<div style={{marginBottom:12}}>
          <p style={{margin:'0 0 4px',color:dim}}><span style={{color:green}}>$ </span>ls -la ./experience/</p>
          {exp.map(e=><div key={e.id} style={{marginBottom:8,padding:'7px 9px',background:'#111',border:'1px solid #2a2a2a',borderRadius:4,...SAFE}}>
            <div style={{display:'flex',justifyContent:'space-between',gap:8}}>
              <span style={{color:'#E5C07B',fontWeight:700,fontSize:10,...S.flex,...SAFE}}>{e.position}</span>
              <span style={{color:mut,fontSize:8,flexShrink:0,whiteSpace:'nowrap'}}>[{e.startDate}..{e.current?'now':e.endDate}]</span>
            </div>
            <p style={{margin:'1px 0 3px',color:green,fontSize:9,...SAFE}}>@ {e.company}{e.location?` (${e.location})`:''}</p>
            {e.description&&e.description.split('\n').filter(Boolean).slice(0,3).map((line,li)=><p key={li} style={{margin:'1px 0',color:'rgba(255,255,255,0.6)',fontSize:8.5,paddingLeft:10,...SAFE}}><span style={{color:green}}>›</span> {line.replace(/^[•\-▪→◦✓▶◆■›]\s*/,'')}</p>)}
          </div>)}
        </div>}
        {/* Projects */}
        {proj.length>0&&<div style={{marginBottom:12}}>
          <p style={{margin:'0 0 4px',color:dim}}><span style={{color:green}}>$ </span>ls ./projects/</p>
          {proj.map(p=><div key={p.id} style={{display:'flex',gap:10,marginBottom:5,...SAFE}}>
            <span style={{color:green,flexShrink:0}}>→</span>
            <div style={{...S.flex,...SAFE}}><span style={{color:'#61AFEF',fontWeight:700,...SAFE}}>{p.name}</span>{p.technologies?.length>0&&<span style={{color:mut,fontSize:8}}> [{p.technologies.join(', ')}]</span>}{p.description&&<p style={{margin:'1px 0 0',color:'rgba(255,255,255,0.5)',fontSize:8,...SAFE}}>{p.description}</p>}</div>
          </div>)}
        </div>}
        {/* Education */}
        {edu.length>0&&<div>
          <p style={{margin:'0 0 4px',color:dim}}><span style={{color:green}}>$ </span>cat education.txt</p>
          {edu.map(e=><p key={e.id} style={{margin:'1px 0',color:'rgba(255,255,255,0.65)',fontSize:9,...SAFE}}><span style={{color:green}}>»</span> {e.degree} {e.field?`in ${e.field}`:''} — {e.institution} ({e.startDate}–{e.current?'now':e.endDate}){e.gpa?` | GPA: ${e.gpa}`:''}</p>)}
        </div>}
        {/* Cursor */}
        <p style={{margin:'12px 0 0',color:dim,fontSize:9}}><span style={{color:green}}>$ </span><span style={{background:green,color:bg,padding:'0 3px'}}>▌</span></p>
      </div>
    </div>
  )
}

// ─── 20. GITHUB README: Light markdown-style ─────────────────────────────────
function GithubReadme({data,c:custom}){
  const C=col(custom)
  const exp=filt.exp(data),edu=filt.edu(data),sk=filt.sk(data),proj=filt.proj(data),lang=filt.lang(data)
  const blue='#0969DA', gray='#57606A', brd='#D1D9E0', bg='#FFFFFF', sec='#F6F8FA'
  return(
    <div id="resume-preview" style={{width:794,minHeight:1123,background:bg,fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",color:'#1F2328'}}>
      {/* Repo header bar */}
      <div style={{background:'#F6F8FA',borderBottom:`1px solid ${brd}`,padding:'10px 20px',display:'flex',alignItems:'center',gap:10,flexShrink:0}}>
        <div style={{width:14,height:14,background:'#0969DA',borderRadius:2,flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center'}}><span style={{color:'#fff',fontSize:9,fontWeight:700}}>R</span></div>
        <span style={{color:blue,fontWeight:600,fontSize:11,...SAFE}}>{(data.personal.firstName||'dev').toLowerCase()}</span>
        <span style={{color:gray,fontSize:11}}>/</span>
        <span style={{color:blue,fontWeight:700,fontSize:11,...SAFE}}>resume</span>
        <span style={{marginLeft:8,background:'rgba(9,105,218,0.1)',color:blue,border:`1px solid rgba(9,105,218,0.3)`,borderRadius:99,padding:'1px 7px',fontSize:9,fontWeight:600}}>Public</span>
        <span style={{marginLeft:'auto',color:gray,fontSize:9,...SAFE}}>⭐ Star</span>
      </div>
      {/* README content */}
      <div style={{padding:'20px 28px',maxWidth:780,...SAFE}}>
        {/* H1 name */}
        <div style={{borderBottom:`1px solid ${brd}`,paddingBottom:10,marginBottom:14,...SAFE}}>
          <h1 style={{margin:'0 0 5px',fontSize:24,fontWeight:700,color:'#1F2328',borderBottom:'none',letterSpacing:-.5,...SAFE}}>{data.personal.firstName||'Your'} {data.personal.lastName||'Name'}</h1>
          {data.personal.title&&<p style={{margin:'0 0 6px',fontSize:14,color:gray,...SAFE}}>{data.personal.title}</p>}
          <div style={{display:'flex',gap:16,flexWrap:'wrap',fontSize:9,color:gray}}>
            {[data.personal.email&&`📧 ${data.personal.email}`,data.personal.phone&&`📱 ${data.personal.phone}`,data.personal.location&&`📍 ${data.personal.location}`,data.personal.linkedin&&`🔗 linkedin.com/in/${data.personal.linkedin}`,data.personal.github&&`⌥ github.com/${data.personal.github}`].filter(Boolean).map((item,i)=><span key={i} style={{...SAFE}}>{item}</span>)}
          </div>
        </div>
        {/* Summary blockquote */}
        {data.personal.summary&&<div style={{borderLeft:`4px solid #D1D9E0`,paddingLeft:14,marginBottom:14,color:gray,...SAFE}}><p style={{margin:0,fontSize:10.5,lineHeight:1.7,fontStyle:'italic',...SAFE}}>{data.personal.summary}</p></div>}
        {/* Skills as badges */}
        {sk.length>0&&<div style={{marginBottom:14,...SAFE}}>
          <h2 style={{margin:'0 0 7px',fontSize:14,fontWeight:700,color:'#1F2328',borderBottom:`1px solid ${brd}`,paddingBottom:4,...SAFE}}>🛠 Skills</h2>
          {sk.map(cat=><div key={cat.id} style={{marginBottom:6,...SAFE}}><span style={{fontSize:9,fontWeight:700,color:gray,marginRight:6,...SAFE}}>{cat.category}:</span>{cat.skills.map((s,si)=><span key={si} style={{display:'inline-block',background:'#DDF4FF',color:'#0969DA',fontSize:8.5,padding:'2px 8px',borderRadius:99,margin:'1px 3px',fontWeight:600,border:'1px solid #B6E3FF',...SAFE}}>{s.name}</span>)}</div>)}
        </div>}
        <div style={{display:'flex',gap:20}}>
          <div style={{flex:1.6,...S.flex}}>
            {exp.length>0&&<div style={{marginBottom:14}}>
              <h2 style={{margin:'0 0 8px',fontSize:14,fontWeight:700,color:'#1F2328',borderBottom:`1px solid ${brd}`,paddingBottom:4,...SAFE}}>💼 Experience</h2>
              {exp.map(e=><div key={e.id} style={{marginBottom:10,padding:'9px 11px',background:sec,border:`1px solid ${brd}`,borderRadius:7,...SAFE}}>
                <div style={{display:'flex',justifyContent:'space-between',gap:8}}>
                  <div style={{...S.flex,...SAFE}}><strong style={{fontSize:11,color:'#1F2328',...SAFE}}>{e.position}</strong><p style={{margin:'1px 0 4px',color:blue,fontSize:9.5,fontWeight:600,...SAFE}}>{e.company}{e.location?` · ${e.location}`:''}</p></div>
                  <span style={{color:gray,fontSize:8.5,flexShrink:0,background:bg,border:`1px solid ${brd}`,padding:'1px 7px',borderRadius:99,whiteSpace:'nowrap'}}>{e.startDate}–{e.current?'Present':e.endDate}</span>
                </div>
                {e.description&&e.description.split('\n').filter(Boolean).slice(0,3).map((line,li)=><p key={li} style={{margin:'1px 0',fontSize:9,color:'#57606A',paddingLeft:10,position:'relative',...SAFE}}><span style={{position:'absolute',left:0,color:blue}}>•</span>{line.replace(/^[•\-▪→◦✓▶◆■›]\s*/,'')}</p>)}
              </div>)}
            </div>}
            {proj.length>0&&<div>
              <h2 style={{margin:'0 0 8px',fontSize:14,fontWeight:700,color:'#1F2328',borderBottom:`1px solid ${brd}`,paddingBottom:4,...SAFE}}>🚀 Projects</h2>
              {proj.map(p=><div key={p.id} style={{marginBottom:8,padding:'9px 11px',background:sec,border:`1px solid ${brd}`,borderRadius:7,...SAFE}}>
                <strong style={{fontSize:10.5,color:blue,...SAFE}}>⌥ {p.name}</strong>
                {p.technologies?.length>0&&<div style={{display:'flex',flexWrap:'wrap',gap:2,margin:'3px 0'}}>{p.technologies.map((t,ti)=><span key={ti} style={{background:'#DAFBE1',color:'#1A7F37',fontSize:7.5,padding:'1px 6px',borderRadius:99,fontWeight:600,border:'1px solid #ACEEBB',...SAFE}}>{t}</span>)}</div>}
                {p.description&&<p style={{margin:'2px 0 0',fontSize:9,color:gray,...SAFE}}>{p.description}</p>}
              </div>)}
            </div>}
          </div>
          <div style={{flex:1,...S.flex}}>
            {edu.length>0&&<div style={{marginBottom:12}}>
              <h2 style={{margin:'0 0 8px',fontSize:14,fontWeight:700,color:'#1F2328',borderBottom:`1px solid ${brd}`,paddingBottom:4,...SAFE}}>🎓 Education</h2>
              {edu.map(e=><div key={e.id} style={{marginBottom:8,padding:'8px 10px',background:sec,border:`1px solid ${brd}`,borderRadius:7,...SAFE}}><strong style={{fontSize:10.5,color:'#1F2328',...SAFE}}>{e.institution}</strong><p style={{margin:'1px 0',fontSize:9.5,color:blue,...SAFE}}>{e.degree} {e.field?`in ${e.field}`:''}</p><p style={{margin:0,fontSize:8.5,color:gray,...SAFE}}>{e.startDate}–{e.current?'Present':e.endDate}{e.gpa?` · ${e.gpa}`:''}</p></div>)}
            </div>}
            {lang.length>0&&<div>
              <h2 style={{margin:'0 0 8px',fontSize:14,fontWeight:700,color:'#1F2328',borderBottom:`1px solid ${brd}`,paddingBottom:4,...SAFE}}>🌐 Languages</h2>
              {lang.map(l=><div key={l.id} style={{display:'flex',justifyContent:'space-between',marginBottom:4,fontSize:9,gap:4}}><span style={{...S.flex,...SAFE}}>{l.language}</span><span style={{background:sec,color:gray,padding:'1px 6px',borderRadius:99,fontSize:8,border:`1px solid ${brd}`,flexShrink:0}}>{l.proficiency}</span></div>)}
            </div>}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── 21. MATRIX: Green cell rain, true matrix aesthetic ───────────────────────
function Matrix({data,c:custom}){
  const C=col(custom)
  const exp=filt.exp(data),edu=filt.edu(data),sk=filt.sk(data),proj=filt.proj(data)
  const bg='#000D00', g1='#00FF41', g2='#00CC33', g3='rgba(0,255,65,0.45)', brd='rgba(0,255,65,0.2)', panel='rgba(0,255,65,0.05)'
  return(
    <div id="resume-preview" style={{width:794,minHeight:1123,background:bg,fontFamily:"'Courier New',Courier,monospace",color:g1}}>
      {/* Matrix header with scanline effect */}
      <div style={{background:'rgba(0,255,65,0.08)',borderBottom:`1px solid ${brd}`,padding:'14px 20px'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
          <h1 style={{margin:0,fontSize:20,fontWeight:700,color:g1,letterSpacing:2,textTransform:'uppercase',...SAFE}}>{data.personal.firstName||'NEO'} {data.personal.lastName||'USER'}</h1>
          <span style={{color:g3,fontSize:8.5,fontFamily:'inherit'}}>MATRIX_v2.1</span>
        </div>
        {data.personal.title&&<p style={{margin:'0 0 6px',color:g2,fontSize:10,letterSpacing:1,...SAFE}}>█ {data.personal.title} █</p>}
        <div style={{display:'flex',gap:18,flexWrap:'wrap',fontSize:8.5,color:g3}}>{[data.personal.email,data.personal.phone,data.personal.github&&`/${data.personal.github}`,data.personal.location].filter(Boolean).map((item,i)=><span key={i} style={{...SAFE}}>[{item}]</span>)}</div>
      </div>
      <div style={{display:'flex',padding:'12px',gap:12}}>
        <div style={{flex:1.5,...S.flex}}>
          {data.personal.summary&&<div style={{marginBottom:10,border:`1px solid ${brd}`,borderRadius:4,padding:'8px 10px',background:panel,...SAFE}}>
            <p style={{margin:'0 0 2px',fontSize:8,color:g3}}>{'// PROFILE.EXE'}</p>
            <p style={{margin:0,fontSize:9,lineHeight:1.7,color:'rgba(0,255,65,0.8)',...SAFE}}>{data.personal.summary}</p>
          </div>}
          {exp.length>0&&<div style={{marginBottom:10}}>
            <p style={{margin:'0 0 5px',fontSize:9,color:g1,fontWeight:700,letterSpacing:2}}>■ WORK_HISTORY.LOG</p>
            {exp.map(e=><div key={e.id} style={{marginBottom:7,border:`1px solid ${brd}`,borderRadius:3,padding:'7px 9px',background:panel,...SAFE}}>
              <div style={{display:'flex',justifyContent:'space-between',gap:6}}>
                <div style={{...S.flex,...SAFE}}><span style={{color:g1,fontWeight:700,fontSize:10,...SAFE}}>{e.position}</span><span style={{color:g2,fontSize:9,...SAFE}}> ↳ {e.company}</span></div>
                <span style={{color:g3,fontSize:8,flexShrink:0,whiteSpace:'nowrap'}}>{e.startDate}~{e.current?'NOW':e.endDate}</span>
              </div>
              {e.description&&e.description.split('\n').filter(Boolean).slice(0,3).map((line,li)=><p key={li} style={{margin:'2px 0',fontSize:8.5,color:'rgba(0,255,65,0.7)',paddingLeft:8,...SAFE}}><span style={{color:g2}}>▷</span> {line.replace(/^[•\-▪→◦✓▶◆■›]\s*/,'')}</p>)}
            </div>)}
          </div>}
          {proj.length>0&&<div>
            <p style={{margin:'0 0 5px',fontSize:9,color:g1,fontWeight:700,letterSpacing:2}}>■ PROJECTS.DAT</p>
            {proj.map(p=><div key={p.id} style={{marginBottom:6,border:`1px solid ${brd}`,borderRadius:3,padding:'6px 9px',background:panel,...SAFE}}>
              <span style={{color:g1,fontWeight:700,fontSize:10,...SAFE}}>&#9656; {p.name}</span>
              {p.technologies?.length>0&&<div style={{display:'flex',flexWrap:'wrap',gap:2,margin:'2px 0'}}>{p.technologies.map((t,ti)=><span key={ti} style={{background:'rgba(0,255,65,0.1)',color:g2,fontSize:7.5,padding:'1px 5px',borderRadius:2,border:`1px solid ${brd}`,...SAFE}}>{t}</span>)}</div>}
              {p.description&&<p style={{margin:'2px 0 0',fontSize:8.5,color:'rgba(0,255,65,0.6)',...SAFE}}>{p.description}</p>}
            </div>)}
          </div>}
        </div>
        <div style={{flex:1,...S.flex}}>
          {sk.length>0&&<div style={{marginBottom:10,border:`1px solid ${brd}`,borderRadius:3,padding:'9px',background:panel,...SAFE}}>
            <p style={{margin:'0 0 5px',fontSize:9,color:g1,fontWeight:700,letterSpacing:2}}>■ SKILLS.SYS</p>
            {sk.map(cat=><div key={cat.id} style={{marginBottom:7,...SAFE}}>
              <p style={{margin:'0 0 3px',fontSize:8.5,color:g2,fontWeight:700,...SAFE}}>{'// ' + cat.category}</p>
              <div style={{display:'flex',flexWrap:'wrap',gap:2}}>{cat.skills.map((s,si)=><span key={si} style={{background:'rgba(0,255,65,0.08)',color:g1,fontSize:8,padding:'2px 5px',borderRadius:2,border:`1px solid rgba(0,255,65,0.15)`,...SAFE}}>{s.name}</span>)}</div>
            </div>)}
          </div>}
          {edu.length>0&&<div style={{border:`1px solid ${brd}`,borderRadius:3,padding:'9px',background:panel,...SAFE}}>
            <p style={{margin:'0 0 5px',fontSize:9,color:g1,fontWeight:700,letterSpacing:2}}>■ EDUCATION.DB</p>
            {edu.map(e=><div key={e.id} style={{marginBottom:6,...SAFE}}>
              <p style={{margin:0,color:g1,fontWeight:700,fontSize:10,...SAFE}}>{e.institution}</p>
              <p style={{margin:'1px 0',fontSize:9,color:g2,...SAFE}}>{e.degree} {e.field?`in ${e.field}`:''}</p>
              <p style={{margin:0,fontSize:8.5,color:g3,...SAFE}}>{e.startDate}~{e.current?'PRESENT':e.endDate}{e.gpa?` // GPA: ${e.gpa}`:''}</p>
            </div>)}
          </div>}
        </div>
      </div>
    </div>
  )
}