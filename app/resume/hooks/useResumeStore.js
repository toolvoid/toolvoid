import { useState, useCallback, useEffect } from 'react'
import { BLANK_RESUME, BLANK_CUSTOMIZATION } from '../lib/constants'
import { genId } from '../lib/utils'

const LS_DATA = 'rf2_data'
const LS_CUSTOM = 'rf2_custom'
const LS_TMPL = 'rf2_template'

export function useResumeStore() {
  const [data, setDataRaw] = useState(BLANK_RESUME)
  const [custom, setCustom] = useState(BLANK_CUSTOMIZATION)
  const [template, setTemplate] = useState('modern-pro')
  const [hydrated, setHydrated] = useState(false)
  const [savedMsg, setSavedMsg] = useState(false)
  const [undoStack, setUndoStack] = useState([])
  const [redoStack, setRedoStack] = useState([])

  // Load from localStorage
  useEffect(() => {
    try {
      const d = localStorage.getItem(LS_DATA)
      if (d) setDataRaw(JSON.parse(d))
      const cu = localStorage.getItem(LS_CUSTOM)
      if (cu) setCustom(JSON.parse(cu))
      const ct = localStorage.getItem(LS_TMPL)
      if (ct) setTemplate(ct)
    } catch (_) {}
    setHydrated(true)
  }, [])

  // Auto-save
  useEffect(() => {
    if (!hydrated) return
    const t = setTimeout(() => {
      try {
        localStorage.setItem(LS_DATA, JSON.stringify(data))
        localStorage.setItem(LS_CUSTOM, JSON.stringify(custom))
        localStorage.setItem(LS_TMPL, template)
        setSavedMsg(true)
        setTimeout(() => setSavedMsg(false), 2200)
      } catch (_) {}
    }, 1200)
    return () => clearTimeout(t)
  }, [data, custom, template, hydrated])

  // ── MUTATION with undo tracking ──────────────────────────────────────────
  const setData = useCallback((updater) => {
    setUndoStack(prev => [...prev.slice(-30), data])
    setRedoStack([])
    setDataRaw(prev => typeof updater === 'function' ? updater(prev) : updater)
  }, [data])

  const undo = useCallback(() => {
    if (!undoStack.length) return
    setRedoStack(r => [...r, data])
    setDataRaw(undoStack[undoStack.length - 1])
    setUndoStack(u => u.slice(0, -1))
  }, [undoStack, data])

  const redo = useCallback(() => {
    if (!redoStack.length) return
    setUndoStack(u => [...u, data])
    setDataRaw(redoStack[redoStack.length - 1])
    setRedoStack(r => r.slice(0, -1))
  }, [redoStack, data])

  // ── PERSONAL ─────────────────────────────────────────────────────────────
  const setPersonal = useCallback((field, value) =>
    setData(d => ({ ...d, personal: { ...d.personal, [field]: value } })), [setData])

  const addInterest = useCallback((interest) =>
    setData(d => ({ ...d, interests: [...d.interests, interest] })), [setData])

  const removeInterest = useCallback((index) =>
    setData(d => ({ ...d, interests: d.interests.filter((_, i) => i !== index) })), [setData])

  // ── EXPERIENCE ────────────────────────────────────────────────────────────
  const setExp = useCallback((id, field, value) =>
    setData(d => ({ ...d, experience: d.experience.map(e => e.id === id ? { ...e, [field]: value } : e) })), [setData])

  const addExp = useCallback(() =>
    setData(d => ({ ...d, experience: [...d.experience, { id: genId(), company:'', position:'', location:'', startDate:'', endDate:'', current:false, type:'Full-time', description:'', achievements:[] }] })), [setData])

  const removeExp = useCallback((id) =>
    setData(d => ({ ...d, experience: d.experience.filter(e => e.id !== id) })), [setData])

  // ── EDUCATION ─────────────────────────────────────────────────────────────
  const setEdu = useCallback((id, field, value) =>
    setData(d => ({ ...d, education: d.education.map(e => e.id === id ? { ...e, [field]: value } : e) })), [setData])

  const addEdu = useCallback(() =>
    setData(d => ({ ...d, education: [...d.education, { id: genId(), institution:'', degree:'', field:'', location:'', startDate:'', endDate:'', current:false, gpa:'', coursework:'', honors:'', activities:'' }] })), [setData])

  const removeEdu = useCallback((id) =>
    setData(d => ({ ...d, education: d.education.filter(e => e.id !== id) })), [setData])

  // ── SKILLS ────────────────────────────────────────────────────────────────
  const addSkillCategory = useCallback(() =>
    setData(d => ({ ...d, skills: [...d.skills, { id: genId(), category: 'New Category', skills: [] }] })), [setData])

  const removeSkillCategory = useCallback((catId) =>
    setData(d => ({ ...d, skills: d.skills.filter(s => s.id !== catId) })), [setData])

  const setSkillCatName = useCallback((catId, name) =>
    setData(d => ({ ...d, skills: d.skills.map(s => s.id === catId ? { ...s, category: name } : s) })), [setData])

  const addSkill = useCallback((catId, name, level = 70) =>
    setData(d => ({ ...d, skills: d.skills.map(s => s.id === catId ? { ...s, skills: [...s.skills, { name, level }] } : s) })), [setData])

  const removeSkill = useCallback((catId, si) =>
    setData(d => ({ ...d, skills: d.skills.map(s => s.id === catId ? { ...s, skills: s.skills.filter((_, i) => i !== si) } : s) })), [setData])

  const updateSkill = useCallback((catId, si, field, val) =>
    setData(d => ({ ...d, skills: d.skills.map(s => s.id === catId ? { ...s, skills: s.skills.map((sk, i) => i === si ? { ...sk, [field]: val } : sk) } : s) })), [setData])

  // ── PROJECTS ──────────────────────────────────────────────────────────────
  const setProj = useCallback((id, field, value) =>
    setData(d => ({ ...d, projects: d.projects.map(p => p.id === id ? { ...p, [field]: value } : p) })), [setData])

  const addProj = useCallback(() =>
    setData(d => ({ ...d, projects: [...d.projects, { id: genId(), name:'', description:'', technologies:[], link:'', github:'', startDate:'', endDate:'', highlights:[] }] })), [setData])

  const removeProj = useCallback((id) =>
    setData(d => ({ ...d, projects: d.projects.filter(p => p.id !== id) })), [setData])

  // ── CERTS ─────────────────────────────────────────────────────────────────
  const setCert = useCallback((id, field, value) =>
    setData(d => ({ ...d, certifications: d.certifications.map(c => c.id === id ? { ...c, [field]: value } : c) })), [setData])

  const addCert = useCallback(() =>
    setData(d => ({ ...d, certifications: [...d.certifications, { id: genId(), name:'', issuer:'', date:'', expiry:'', credentialId:'' }] })), [setData])

  const removeCert = useCallback((id) =>
    setData(d => ({ ...d, certifications: d.certifications.filter(c => c.id !== id) })), [setData])

  // ── LANGUAGES ─────────────────────────────────────────────────────────────
  const setLang = useCallback((id, field, value) =>
    setData(d => ({ ...d, languages: d.languages.map(l => l.id === id ? { ...l, [field]: value } : l) })), [setData])

  const addLang = useCallback(() =>
    setData(d => ({ ...d, languages: [...d.languages, { id: genId(), language:'', proficiency:'Intermediate' }] })), [setData])

  const removeLang = useCallback((id) =>
    setData(d => ({ ...d, languages: d.languages.filter(l => l.id !== id) })), [setData])

  // ── AWARDS ────────────────────────────────────────────────────────────────
  const setAward = useCallback((id, field, value) =>
    setData(d => ({ ...d, awards: d.awards.map(a => a.id === id ? { ...a, [field]: value } : a) })), [setData])

  const addAward = useCallback(() =>
    setData(d => ({ ...d, awards: [...d.awards, { id: genId(), title:'', issuer:'', date:'', description:'' }] })), [setData])

  const removeAward = useCallback((id) =>
    setData(d => ({ ...d, awards: d.awards.filter(a => a.id !== id) })), [setData])

  // ── SOCIAL ────────────────────────────────────────────────────────────────
  const setSocial = useCallback((field, value) =>
    setData(d => ({ ...d, social: { ...d.social, [field]: value } })), [setData])

  return {
    data, setData, custom, setCustom, template, setTemplate,
    hydrated, savedMsg,
    canUndo: undoStack.length > 0, canRedo: redoStack.length > 0,
    undo, redo,
    // Mutations
    setPersonal, addInterest, removeInterest,
    setExp, addExp, removeExp,
    setEdu, addEdu, removeEdu,
    addSkillCategory, removeSkillCategory, setSkillCatName,
    addSkill, removeSkill, updateSkill,
    setProj, addProj, removeProj,
    setCert, addCert, removeCert,
    setLang, addLang, removeLang,
    setAward, addAward, removeAward,
    setSocial,
  }
}