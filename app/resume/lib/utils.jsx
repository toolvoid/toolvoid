import { SKILL_SUGGESTIONS } from './constants'

export const genId = () => Math.random().toString(36).slice(2, 9)

export const calcProgress = (data) => {
  let score = 0, max = 0
  const a = (v, w = 1) => { max += w; if (v) score += w }
  a(data.personal.firstName); a(data.personal.lastName)
  a(data.personal.email); a(data.personal.phone)
  a(data.personal.title); a(data.personal.summary, 2)
  a(data.experience.some(e => e.company), 3)
  a(data.education.some(e => e.institution), 2)
  a(data.skills.some(s => s.skills.length > 0), 2)
  a(data.projects.some(p => p.name), 1)
  a(data.certifications.some(c => c.name), 1)
  return Math.round((score / max) * 100)
}

export const checkATS = (data) => {
  let score = 0
  const tips = []
  const c = (cond, pts, msg, level = 'pass') => {
    if (cond) { score += pts; tips.push({ status: 'pass', msg }) }
    else tips.push({ status: level, msg })
  }
  c(data.personal.email,       12, 'Email address present')
  c(data.personal.phone,       10, 'Phone number present')
  c(data.personal.summary,     15, 'Professional summary added')
  c(data.experience.some(e => e.company), 20, 'Work experience listed')
  c(data.skills.some(s => s.skills.length), 13, 'Skills section filled')
  c(data.education.some(e => e.institution), 10, 'Education details added')
  c(data.personal.linkedin,     8, 'LinkedIn profile linked', 'warn')
  score += 10 // PDF bonus
  tips.push({ status: 'pass', msg: 'PDF export (ATS-friendly format)' })
  return { score: Math.min(score, 100), tips }
}

export const extractKeywordsFromJD = (jd) => {
  const allSkills = Object.values(SKILL_SUGGESTIONS).flat()
  const lower = jd.toLowerCase()
  const found = allSkills.filter(s => lower.includes(s.toLowerCase()))
  const quals = ['agile','scrum','leadership','communication','problem solving',
    'bachelor','master','phd','years of experience'].filter(q => lower.includes(q))
  return [...new Set([...found, ...quals])]
}

export const compareKeywords = (resumeData, keywords) => {
  const resumeText = JSON.stringify(resumeData).toLowerCase()
  const present = keywords.filter(k => resumeText.includes(k.toLowerCase()))
  const missing = keywords.filter(k => !resumeText.includes(k.toLowerCase()))
  const score = keywords.length ? Math.round((present.length / keywords.length) * 100) : 0
  return { present, missing, score }
}

export const detectWeakVerbs = (text) => {
  if (!text) return []
  const WEAK = ['managed','responsible','worked','helped','did','made','handled',
    'assisted','involved','participated','supported','coordinated']
  return WEAK.filter(v => text.toLowerCase().split(/\s+/).some(w => w.startsWith(v)))
}