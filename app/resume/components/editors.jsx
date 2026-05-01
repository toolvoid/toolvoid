'use client'

import { useState } from 'react'
import { EntryCard, AddButton, Field, Input, Textarea, Select, Grid2, MonthYearPicker } from './ui'
import { ALL_SKILLS, SKILL_SUGGESTIONS } from '../lib/constants'
import { detectWeakVerbs } from '../lib/utils'

const STRONG_VERBS = ['Led','Built','Launched','Optimized','Reduced','Increased','Engineered','Automated','Shipped','Spearheaded']

// ─── PERSONAL ─────────────────────────────────────────────────────────────────
export function PersonalEditor({ data, store, dark = true }) {
  const { setPersonal, addInterest, removeInterest } = store
  const p = data.personal
  const [ii, setIi] = useState('')

  const cardBg = dark ? 'rgba(255,255,255,0.04)' : '#F9FAFB'
  const cardBorder = dark ? 'rgba(255,255,255,0.08)' : '#E5E7EB'
  const textColor = dark ? '#F0F4FF' : '#111827'
  const mutedColor = dark ? 'rgba(255,255,255,0.4)' : '#6B7280'
  const chipBg = dark ? 'rgba(255,107,107,0.1)' : '#FFF0F0'
  const chipBorder = dark ? 'rgba(255,107,107,0.25)' : '#FECACA'
  const quickBg = dark ? 'rgba(255,255,255,0.04)' : '#F3F4F6'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Photo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px', borderRadius: 16, background: cardBg, border: `1px solid ${cardBorder}` }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', overflow: 'hidden', border: `2px solid ${dark ? 'rgba(255,255,255,0.12)' : '#E5E7EB'}`, flexShrink: 0, background: dark ? 'rgba(255,255,255,0.06)' : '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {p.photo ? <img src={p.photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span style={{ fontSize: 22, opacity: 0.3 }}>👤</span>}
        </div>
        <div>
          <p style={{ fontSize: 13, fontWeight: 700, color: textColor, marginBottom: 6 }}>Profile Photo <span style={{ fontSize: 11, fontWeight: 400, color: mutedColor }}>(optional)</span></p>
          <input type="file" accept="image/*" id="photo-up" style={{ display: 'none' }}
            onChange={e => { const f = e.target.files[0]; if (!f) return; const r = new FileReader(); r.onload = ev => setPersonal('photo', ev.target.result); r.readAsDataURL(f) }} />
          <label htmlFor="photo-up" style={{ cursor: 'pointer', padding: '6px 14px', borderRadius: 10, border: '1px solid rgba(255,107,107,0.3)', background: 'rgba(255,107,107,0.08)', color: '#FF6B6B', fontSize: 12, fontWeight: 600 }}>
            Upload Photo
          </label>
          {p.photo && <button type="button" onClick={() => setPersonal('photo', null)} style={{ marginLeft: 8, fontSize: 11, color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}>Remove</button>}
        </div>
      </div>

      <Grid2>
        <Field label="First Name *" dark={dark}><Input dark={dark} placeholder="Arjun" value={p.firstName} onChange={e => setPersonal('firstName', e.target.value)} /></Field>
        <Field label="Last Name *" dark={dark}><Input dark={dark} placeholder="Mehta" value={p.lastName} onChange={e => setPersonal('lastName', e.target.value)} /></Field>
      </Grid2>

      <Field label="Professional Title" dark={dark}>
        <Input dark={dark} placeholder="Senior Software Engineer" value={p.title} onChange={e => setPersonal('title', e.target.value)} />
      </Field>

      <Grid2>
        <Field label="Email *" dark={dark}><Input dark={dark} type="email" placeholder="you@email.com" value={p.email} onChange={e => setPersonal('email', e.target.value)} /></Field>
        <Field label="Phone" dark={dark}><Input dark={dark} placeholder="+91 98765 43210" value={p.phone} onChange={e => setPersonal('phone', e.target.value)} /></Field>
      </Grid2>

      <Field label="Location" dark={dark}>
        <Input dark={dark} placeholder="Bengaluru, Karnataka" value={p.location} onChange={e => setPersonal('location', e.target.value)} />
      </Field>

      <Grid2>
        <Field label="LinkedIn" dark={dark}><Input dark={dark} placeholder="username" value={p.linkedin} onChange={e => setPersonal('linkedin', e.target.value)} /></Field>
        <Field label="GitHub" dark={dark}><Input dark={dark} placeholder="username" value={p.github} onChange={e => setPersonal('github', e.target.value)} /></Field>
        <Field label="Website" dark={dark}><Input dark={dark} placeholder="mysite.dev" value={p.website} onChange={e => setPersonal('website', e.target.value)} /></Field>
        <Field label="Twitter / X" dark={dark}><Input dark={dark} placeholder="@username" value={p.twitter || ''} onChange={e => setPersonal('twitter', e.target.value)} /></Field>
      </Grid2>

      <Field label="Professional Summary" dark={dark} hint={`${p.summary.length}/500`}>
        <Textarea dark={dark} placeholder="2–3 compelling sentences about your experience and impact…" value={p.summary} onChange={e => setPersonal('summary', e.target.value)} maxLength={500} style={{ height: 96 }} />
      </Field>

      {/* Interests */}
      <Field label="Interests / Hobbies" dark={dark}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, minHeight: 28, marginBottom: 10 }}>
          {data.interests.map((int, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 20, background: chipBg, border: `1px solid ${chipBorder}`, color: '#FF6B6B', fontSize: 12, fontWeight: 600 }}>
              {int}
              <button type="button" onClick={() => removeInterest(i)} style={{ background: 'none', border: 'none', color: '#FF6B6B', cursor: 'pointer', fontSize: 14, lineHeight: 1, padding: 0 }}>×</button>
            </span>
          ))}
        </div>
        <Input dark={dark} placeholder="Type an interest and press Enter" value={ii} onChange={e => setIi(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && ii.trim()) { addInterest(ii.trim()); setIi('') } }} />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
          {['Open Source','Chess','Blogging','Travel','Reading','Music','Coding','Badminton'].map(s => (
            <button key={s} type="button" onClick={() => { if (!data.interests.includes(s)) addInterest(s) }}
              style={{ padding: '5px 11px', borderRadius: 20, background: quickBg, border: `1px solid ${cardBorder}`, color: mutedColor, fontSize: 11, fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s' }}>
              + {s}
            </button>
          ))}
        </div>
      </Field>
    </div>
  )
}

// ─── EXPERIENCE ───────────────────────────────────────────────────────────────
export function ExperienceEditor({ data, store, dark = true }) {
  const { setExp, addExp, removeExp } = store
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {data.experience.map((exp, idx) => (
        <EntryCard key={exp.id} dark={dark}
          title={exp.position || `Role ${idx + 1}`}
          subtitle={exp.company ? `${exp.company}${exp.startDate ? ` · ${exp.startDate} – ${exp.current ? 'Present' : exp.endDate}` : ''}` : undefined}
          onDelete={() => removeExp(exp.id)} canDelete={data.experience.length > 1}>
          <Grid2>
            <Field label="Company" dark={dark}><Input dark={dark} placeholder="Razorpay" value={exp.company} onChange={e => setExp(exp.id, 'company', e.target.value)} /></Field>
            <Field label="Job Title" dark={dark}><Input dark={dark} placeholder="Senior Engineer" value={exp.position} onChange={e => setExp(exp.id, 'position', e.target.value)} /></Field>
          </Grid2>
          <Grid2>
            <Field label="Location" dark={dark}><Input dark={dark} placeholder="Bengaluru" value={exp.location} onChange={e => setExp(exp.id, 'location', e.target.value)} /></Field>
            <Field label="Type" dark={dark}>
              <Select dark={dark} value={exp.type || 'Full-time'} onChange={e => setExp(exp.id, 'type', e.target.value)}>
                {['Full-time','Part-time','Contract','Freelance','Internship'].map(t => <option key={t}>{t}</option>)}
              </Select>
            </Field>
          </Grid2>
          <Grid2>
            <Field label="Start Date" dark={dark}><MonthYearPicker dark={dark} value={exp.startDate} onChange={v => setExp(exp.id, 'startDate', v)} /></Field>
            <div>
              <Field label="End Date" dark={dark}>
                {!exp.current && <MonthYearPicker dark={dark} value={exp.endDate} onChange={v => setExp(exp.id, 'endDate', v)} />}
              </Field>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, cursor: 'pointer' }}>
                <input type="checkbox" checked={exp.current} onChange={e => setExp(exp.id, 'current', e.target.checked)} style={{ accentColor: '#FF6B6B', width: 14, height: 14 }} />
                <span style={{ fontSize: 12, color: dark ? 'rgba(255,255,255,0.45)' : '#6B7280' }}>Currently working here</span>
              </label>
            </div>
          </Grid2>
          <Field label="Responsibilities & Impact" dark={dark}>
            <Textarea dark={dark} placeholder="• Led team of 6 engineers…&#10;• Reduced latency by 62% through Redis caching" value={exp.description} onChange={e => setExp(exp.id, 'description', e.target.value)} style={{ height: 110 }} />
            {detectWeakVerbs(exp.description).length > 0 && (
              <div style={{ marginTop: 8, display: 'flex', alignItems: 'flex-start', gap: 8, padding: '10px 14px', borderRadius: 10, background: 'rgba(255,193,7,0.08)', border: '1px solid rgba(255,193,7,0.2)', fontSize: 12, color: '#F59E0B' }}>
                <span>⚠️</span>
                <span>Weak verbs: <strong>{detectWeakVerbs(exp.description).join(', ')}</strong>. Use: {STRONG_VERBS.slice(0,5).join(', ')}</span>
              </div>
            )}
          </Field>
          <Field label="Key Achievements (one per line)" dark={dark}>
            <Textarea dark={dark} placeholder="Promoted in 15 months&#10;Won Best Engineering Award" value={exp.achievements?.join('\n') || ''} onChange={e => setExp(exp.id, 'achievements', e.target.value.split('\n').filter(Boolean))} style={{ height: 72 }} />
          </Field>
        </EntryCard>
      ))}
      <AddButton label="Add Experience" onClick={addExp} dark={dark} />
    </div>
  )
}

// ─── EDUCATION ────────────────────────────────────────────────────────────────
export function EducationEditor({ data, store, dark = true }) {
  const { setEdu, addEdu, removeEdu } = store
  const DEGREES = ['B.Tech','B.E.','B.Sc','B.Com','B.A.','MBA','M.Tech','M.Sc','MCA','PhD','Diploma','12th','10th','Other']
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {data.education.map((edu, idx) => (
        <EntryCard key={edu.id} dark={dark}
          title={edu.institution || `Degree ${idx + 1}`}
          subtitle={edu.degree ? `${edu.degree}${edu.field ? ` in ${edu.field}` : ''}` : undefined}
          onDelete={() => removeEdu(edu.id)} canDelete={data.education.length > 1}>
          <Field label="Institution" dark={dark}><Input dark={dark} placeholder="BITS Pilani" value={edu.institution} onChange={e => setEdu(edu.id, 'institution', e.target.value)} /></Field>
          <Grid2>
            <Field label="Degree" dark={dark}>
              <Select dark={dark} value={edu.degree} onChange={e => setEdu(edu.id, 'degree', e.target.value)}>
                <option value="">Select…</option>
                {DEGREES.map(d => <option key={d}>{d}</option>)}
              </Select>
            </Field>
            <Field label="Field of Study" dark={dark}><Input dark={dark} placeholder="Computer Science" value={edu.field} onChange={e => setEdu(edu.id, 'field', e.target.value)} /></Field>
          </Grid2>
          <Grid2>
            <Field label="Location" dark={dark}><Input dark={dark} placeholder="Pilani, Rajasthan" value={edu.location} onChange={e => setEdu(edu.id, 'location', e.target.value)} /></Field>
            <Field label="GPA / CGPA / %" dark={dark}><Input dark={dark} placeholder="8.4 / 85%" value={edu.gpa} onChange={e => setEdu(edu.id, 'gpa', e.target.value)} /></Field>
          </Grid2>
          <Grid2>
            <Field label="Start Date" dark={dark}><MonthYearPicker dark={dark} value={edu.startDate} onChange={v => setEdu(edu.id, 'startDate', v)} /></Field>
            <div>
              <Field label="End Date" dark={dark}>
                {!edu.current && <MonthYearPicker dark={dark} value={edu.endDate} onChange={v => setEdu(edu.id, 'endDate', v)} />}
              </Field>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, cursor: 'pointer' }}>
                <input type="checkbox" checked={edu.current} onChange={e => setEdu(edu.id, 'current', e.target.checked)} style={{ accentColor: '#FF6B6B', width: 14, height: 14 }} />
                <span style={{ fontSize: 12, color: dark ? 'rgba(255,255,255,0.45)' : '#6B7280' }}>Currently enrolled</span>
              </label>
            </div>
          </Grid2>
          <Field label="Honors / Awards" dark={dark}><Input dark={dark} placeholder="Merit Scholarship, Dean's List" value={edu.honors} onChange={e => setEdu(edu.id, 'honors', e.target.value)} /></Field>
          <Field label="Relevant Coursework" dark={dark}><Input dark={dark} placeholder="Algorithms, OS, Distributed Systems…" value={edu.coursework} onChange={e => setEdu(edu.id, 'coursework', e.target.value)} /></Field>
        </EntryCard>
      ))}
      <AddButton label="Add Education" onClick={addEdu} dark={dark} />
    </div>
  )
}

// ─── SKILLS ───────────────────────────────────────────────────────────────────
export function SkillsEditor({ data, store, dark = true }) {
  const { addSkillCategory, removeSkillCategory, setSkillCatName, addSkill, removeSkill, updateSkill } = store
  const [search, setSearch] = useState('')
  const suggestions = search.length > 1 ? ALL_SKILLS.filter(s => s.toLowerCase().includes(search.toLowerCase())).slice(0, 8) : []

  const cardBg = dark ? 'rgba(255,255,255,0.04)' : '#F9FAFB'
  const cardBorder = dark ? 'rgba(255,255,255,0.08)' : '#E5E7EB'
  const textColor = dark ? '#F0F4FF' : '#111827'
  const mutedColor = dark ? 'rgba(255,255,255,0.38)' : '#9CA3AF'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Search */}
      <div style={{ position: 'relative' }}>
        <Input dark={dark} placeholder="🔍 Search skills to add (React, Python, AWS…)" value={search} onChange={e => setSearch(e.target.value)} />
        {suggestions.length > 0 && (
          <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 20, marginTop: 4, borderRadius: 14, border: `1px solid ${cardBorder}`, background: dark ? '#1A2235' : '#FFFFFF', boxShadow: '0 8px 32px rgba(0,0,0,0.25)', overflow: 'hidden' }}>
            {suggestions.map(s => (
              <button key={s} type="button"
                onClick={() => { if (data.skills[0]) addSkill(data.skills[0].id, s); setSearch('') }}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '11px 16px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: textColor, textAlign: 'left', transition: 'background 0.1s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,107,107,0.07)'}
                onMouseLeave={e => e.currentTarget.style.background = 'none'}>
                <span style={{ color: '#FF6B6B', fontWeight: 700 }}>+</span> {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {data.skills.map(cat => (
        <div key={cat.id} style={{ borderRadius: 16, border: `1px solid ${cardBorder}`, overflow: 'hidden' }}>
          {/* Category header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: cardBg }}>
            <input value={cat.category} onChange={e => setSkillCatName(cat.id, e.target.value)}
              style={{ flex: 1, background: 'none', border: 'none', fontSize: 13, fontWeight: 700, color: textColor, outline: 'none' }}
              placeholder="Category name" />
            {data.skills.length > 1 && (
              <button type="button" onClick={() => removeSkillCategory(cat.id)}
                style={{ padding: '4px 10px', borderRadius: 8, fontSize: 11, fontWeight: 600, color: '#FF6B6B', background: 'rgba(255,107,107,0.08)', border: '1px solid rgba(255,107,107,0.18)', cursor: 'pointer' }}>
                Remove
              </button>
            )}
          </div>

          {/* Skills list */}
          <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10, borderTop: `1px solid ${cardBorder}` }}>
            {cat.skills.map((sk, si) => (
              <div key={si} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {/* Name */}
                <input value={sk.name} onChange={e => updateSkill(cat.id, si, 'name', e.target.value)}
                  placeholder="Skill name"
                  style={{ flex: 1, background: 'none', borderWidth: '0 0 1px 0', borderStyle: 'solid', borderColor: dark ? 'rgba(255,255,255,0.1)' : '#E5E7EB', paddingBottom: 6, fontSize: 13, color: textColor, outline: 'none', transition: 'border-color 0.15s' }}
                  onFocus={e => e.target.style.borderBottomColor = '#FF6B6B'}
                  onBlur={e => e.target.style.borderBottomColor = dark ? 'rgba(255,255,255,0.1)' : '#E5E7EB'} />

                {/* Show percentage toggle */}
                <button type="button" onClick={() => updateSkill(cat.id, si, 'showLevel', sk.showLevel === false ? true : false)}
                  title={sk.showLevel === false ? 'Show level' : 'Hide level'}
                  style={{ width: 28, height: 28, borderRadius: 8, border: `1px solid ${sk.showLevel === false ? cardBorder : 'rgba(255,107,107,0.3)'}`, background: sk.showLevel === false ? cardBg : 'rgba(255,107,107,0.08)', color: sk.showLevel === false ? mutedColor : '#FF6B6B', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.15s' }}>
                  %
                </button>

                {/* Slider + value — only show when level is enabled */}
                {sk.showLevel !== false && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                    <span style={{ fontSize: 11, color: mutedColor, width: 26, textAlign: 'right' }}>{sk.level}%</span>
                    <input type="range" min="10" max="100" value={sk.level}
                      onChange={e => updateSkill(cat.id, si, 'level', +e.target.value)}
                      style={{ width: 70, accentColor: '#FF6B6B' }} />
                  </div>
                )}

                {/* Delete */}
                <button type="button" onClick={() => removeSkill(cat.id, si)}
                  style={{ width: 24, height: 24, borderRadius: 6, background: 'none', border: 'none', color: mutedColor, cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'color 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#FF6B6B'}
                  onMouseLeave={e => e.currentTarget.style.color = mutedColor}>×</button>
              </div>
            ))}

            <button type="button" onClick={() => addSkill(cat.id, '', 70)}
              style={{ alignSelf: 'flex-start', padding: '6px 14px', borderRadius: 10, background: 'rgba(255,107,107,0.07)', border: '1px solid rgba(255,107,107,0.2)', color: '#FF6B6B', fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s' }}>
              + Add skill
            </button>

            {/* Quick picks */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, paddingTop: 8, borderTop: `1px solid ${cardBorder}` }}>
              {Object.values(SKILL_SUGGESTIONS).flat().filter(s => !cat.skills.find(sk => sk.name === s)).slice(0, 8).map(s => (
                <button key={s} type="button" onClick={() => addSkill(cat.id, s)}
                  style={{ padding: '4px 10px', borderRadius: 10, background: cardBg, border: `1px solid ${cardBorder}`, color: mutedColor, fontSize: 11, fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,107,107,0.07)'; e.currentTarget.style.color = '#FF6B6B'; e.currentTarget.style.borderColor = 'rgba(255,107,107,0.3)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = cardBg; e.currentTarget.style.color = mutedColor; e.currentTarget.style.borderColor = cardBorder }}>
                  +{s}
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}
      <AddButton label="Add Skill Category" onClick={addSkillCategory} dark={dark} />
    </div>
  )
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
export function ProjectsEditor({ data, store, dark = true }) {
  const { setProj, addProj, removeProj } = store
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {data.projects.map((proj, idx) => (
        <EntryCard key={proj.id} dark={dark}
          title={proj.name || `Project ${idx + 1}`}
          subtitle={proj.technologies?.length ? proj.technologies.join(', ') : undefined}
          onDelete={() => removeProj(proj.id)} canDelete={data.projects.length > 1}>
          <Field label="Project Name" dark={dark}><Input dark={dark} placeholder="Quicklit — AI Summarizer" value={proj.name} onChange={e => setProj(proj.id, 'name', e.target.value)} /></Field>
          <Field label="Description" dark={dark}><Textarea dark={dark} placeholder="What it does and your role in building it…" value={proj.description} onChange={e => setProj(proj.id, 'description', e.target.value)} style={{ height: 72 }} /></Field>
          <Field label="Technologies (comma-separated)" dark={dark}><Input dark={dark} placeholder="Next.js, OpenAI API, PostgreSQL, Stripe" value={proj.technologies?.join(', ') || ''} onChange={e => setProj(proj.id, 'technologies', e.target.value.split(',').map(t => t.trim()).filter(Boolean))} /></Field>
          <Grid2>
            <Field label="Live URL" dark={dark}><Input dark={dark} placeholder="project.vercel.app" value={proj.link} onChange={e => setProj(proj.id, 'link', e.target.value)} /></Field>
            <Field label="GitHub URL" dark={dark}><Input dark={dark} placeholder="github.com/user/repo" value={proj.github} onChange={e => setProj(proj.id, 'github', e.target.value)} /></Field>
          </Grid2>
          <Grid2>
            <Field label="Start Date" dark={dark}><MonthYearPicker dark={dark} value={proj.startDate} onChange={v => setProj(proj.id, 'startDate', v)} /></Field>
            <Field label="End Date" dark={dark}><MonthYearPicker dark={dark} value={proj.endDate} onChange={v => setProj(proj.id, 'endDate', v)} /></Field>
          </Grid2>
          <Field label="Highlights (one per line)" dark={dark}><Textarea dark={dark} placeholder="1,800+ active users&#10;$420 MRR bootstrapped" value={proj.highlights?.join('\n') || ''} onChange={e => setProj(proj.id, 'highlights', e.target.value.split('\n').filter(Boolean))} style={{ height: 72 }} /></Field>
        </EntryCard>
      ))}
      <AddButton label="Add Project" onClick={addProj} dark={dark} />
    </div>
  )
}

// ─── CERTIFICATIONS ───────────────────────────────────────────────────────────
export function CertsEditor({ data, store, dark = true }) {
  const { setCert, addCert, removeCert } = store
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {data.certifications.map((cert, idx) => (
        <EntryCard key={cert.id} dark={dark} title={cert.name || `Certificate ${idx + 1}`} subtitle={cert.issuer || undefined} onDelete={() => removeCert(cert.id)} canDelete={data.certifications.length > 1}>
          <Field label="Certificate Name" dark={dark}><Input dark={dark} placeholder="AWS Solutions Architect – Associate" value={cert.name} onChange={e => setCert(cert.id, 'name', e.target.value)} /></Field>
          <Grid2>
            <Field label="Issuer" dark={dark}><Input dark={dark} placeholder="Amazon Web Services" value={cert.issuer} onChange={e => setCert(cert.id, 'issuer', e.target.value)} /></Field>
            <Field label="Issue Date" dark={dark}><MonthYearPicker dark={dark} value={cert.date} onChange={v => setCert(cert.id, 'date', v)} /></Field>
          </Grid2>
          <Grid2>
            <Field label="Expiry Date" dark={dark}><MonthYearPicker dark={dark} value={cert.expiry} onChange={v => setCert(cert.id, 'expiry', v)} /></Field>
            <Field label="Credential ID" dark={dark}><Input dark={dark} placeholder="AWS-SAA-03482" value={cert.credentialId} onChange={e => setCert(cert.id, 'credentialId', e.target.value)} /></Field>
          </Grid2>
        </EntryCard>
      ))}
      <AddButton label="Add Certification" onClick={addCert} dark={dark} />
    </div>
  )
}

// ─── LANGUAGES ────────────────────────────────────────────────────────────────
export function LanguagesEditor({ data, store, dark = true }) {
  const { setLang, addLang, removeLang } = store
  const PROFS = ['Native','Fluent','Advanced','Intermediate','Basic']
  const cardBorder = dark ? 'rgba(255,255,255,0.08)' : '#E5E7EB'
  const mutedColor = dark ? 'rgba(255,255,255,0.38)' : '#6B7280'
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {data.languages.map(lang => (
        <div key={lang.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ flex: 1 }}>
            <Input dark={dark} placeholder="English" value={lang.language} onChange={e => setLang(lang.id, 'language', e.target.value)} />
          </div>
          <div style={{ flexShrink: 0 }}>
            <Select dark={dark} style={{ width: 140 }} value={lang.proficiency} onChange={e => setLang(lang.id, 'proficiency', e.target.value)}>
              {PROFS.map(p => <option key={p}>{p}</option>)}
            </Select>
          </div>
          {data.languages.length > 1 && (
            <button type="button" onClick={() => removeLang(lang.id)}
              style={{ width: 28, height: 28, borderRadius: 8, background: 'none', border: `1px solid ${cardBorder}`, color: mutedColor, cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#FF6B6B'; e.currentTarget.style.color = '#FF6B6B' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = cardBorder; e.currentTarget.style.color = mutedColor }}>×</button>
          )}
        </div>
      ))}
      <AddButton label="Add Language" onClick={addLang} dark={dark} />
    </div>
  )
}

// ─── AWARDS ───────────────────────────────────────────────────────────────────
export function AwardsEditor({ data, store, dark = true }) {
  const { setAward, addAward, removeAward } = store
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {data.awards.map((aw, idx) => (
        <EntryCard key={aw.id} dark={dark} title={aw.title || `Award ${idx + 1}`} subtitle={aw.issuer || undefined} onDelete={() => removeAward(aw.id)} canDelete={data.awards.length > 1}>
          <Field label="Award Title" dark={dark}><Input dark={dark} placeholder="Best Engineering Project – Hackathon" value={aw.title} onChange={e => setAward(aw.id, 'title', e.target.value)} /></Field>
          <Grid2>
            <Field label="Issuer" dark={dark}><Input dark={dark} placeholder="Swiggy" value={aw.issuer} onChange={e => setAward(aw.id, 'issuer', e.target.value)} /></Field>
            <Field label="Date" dark={dark}><MonthYearPicker dark={dark} value={aw.date} onChange={v => setAward(aw.id, 'date', v)} /></Field>
          </Grid2>
          <Field label="Description" dark={dark}><Input dark={dark} placeholder="Brief context or achievement…" value={aw.description} onChange={e => setAward(aw.id, 'description', e.target.value)} /></Field>
        </EntryCard>
      ))}
      <AddButton label="Add Award" onClick={addAward} dark={dark} />
    </div>
  )
}

// ─── SOCIAL ───────────────────────────────────────────────────────────────────
export function SocialEditor({ data, store, dark = true }) {
  const { setSocial } = store
  const FIELDS = [
    ['stackoverflow','Stack Overflow','Username'],
    ['medium','Medium / Dev.to','@username'],
    ['behance','Behance','Username'],
    ['dribbble','Dribbble','Username'],
    ['youtube','YouTube','Channel URL'],
    ['instagram','Instagram','@username'],
  ]
  return (
    <Grid2>
      {FIELDS.map(([key, label, ph]) => (
        <Field key={key} label={label} dark={dark}>
          <Input dark={dark} placeholder={ph} value={data.social?.[key] || ''} onChange={e => setSocial(key, e.target.value)} />
        </Field>
      ))}
    </Grid2>
  )
}