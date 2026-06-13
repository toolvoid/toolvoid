'use client'

import { useCallback, useMemo, useState } from 'react'
import {
  RESUME_STORAGE_KEY,
  createEducationItem,
  createExperienceItem,
  createResumeData,
  createSkillCategory,
  editorDataFromResumeData,
  normalizeResumeData,
  templateCustomFromResumeData,
} from '../lib/resumeSchema'
import { genId } from '../lib/utils'
import { useLocalStorage } from './useLocalStorage'

const pathToSegments = (path) => {
  if (Array.isArray(path)) return path
  return String(path)
    .replace(/\[(\d+)\]/g, '.$1')
    .split('.')
    .filter(Boolean)
    .map(part => (/^\d+$/.test(part) ? Number(part) : part))
}

const updateNested = (source, path, value) => {
  const segments = pathToSegments(path)
  if (!segments.length) return typeof value === 'function' ? value(source) : value

  const clone = Array.isArray(source) ? [...source] : { ...source }
  let cursor = clone

  segments.forEach((segment, index) => {
    const isLast = index === segments.length - 1
    if (isLast) {
      cursor[segment] = typeof value === 'function' ? value(cursor[segment]) : value
      return
    }

    const nextSegment = segments[index + 1]
    const current = cursor[segment]
    cursor[segment] = Array.isArray(current)
      ? [...current]
      : current && typeof current === 'object'
        ? { ...current }
        : typeof nextSegment === 'number'
          ? []
          : {}
    cursor = cursor[segment]
  })

  return clone
}

const mergeName = (personalInfo, field, value) => {
  const parts = (personalInfo.name || '').trim().split(/\s+/).filter(Boolean)
  const first = field === 'firstName' ? value : parts[0] || ''
  const last = field === 'lastName' ? value : parts.slice(1).join(' ')
  return [first, last].filter(Boolean).join(' ')
}

export function useResumeStore() {
  const initialResumeData = useMemo(() => createResumeData(), [])
  const [resumeData, setResumeDataRaw, storage] = useLocalStorage(
    RESUME_STORAGE_KEY,
    initialResumeData,
    { deserialize: value => normalizeResumeData(JSON.parse(value)) }
  )
  const [savedMsg, setSavedMsg] = useState(false)
  const [undoStack, setUndoStack] = useState([])
  const [redoStack, setRedoStack] = useState([])

  const setResumeData = useCallback((updater, { track = true } = {}) => {
    setResumeDataRaw(prev => {
      const normalizedPrev = normalizeResumeData(prev)
      const next = normalizeResumeData(typeof updater === 'function' ? updater(normalizedPrev) : updater)
      if (track) {
        setUndoStack(stack => [...stack.slice(-30), normalizedPrev])
        setRedoStack([])
      }
      setSavedMsg(true)
      window.setTimeout(() => setSavedMsg(false), 1800)
      return next
    })
  }, [setResumeDataRaw])

  const handleChange = useCallback((path, value) => {
    setResumeData(current => updateNested(current, path, value))
  }, [setResumeData])

  const addItem = useCallback((section) => {
    const createItem = section === 'experience'
      ? createExperienceItem
      : section === 'education'
        ? createEducationItem
        : null
    if (!createItem) return
    setResumeData(current => ({ ...current, [section]: [...current[section], createItem()] }))
  }, [setResumeData])

  const removeItem = useCallback((section, idOrIndex) => {
    if (!['experience', 'education'].includes(section)) return
    setResumeData(current => {
      const nextItems = current[section].filter((item, index) => item.id !== idOrIndex && index !== idOrIndex)
      return {
        ...current,
        [section]: nextItems.length ? nextItems : [section === 'experience' ? createExperienceItem() : createEducationItem()],
      }
    })
  }, [setResumeData])

  const clearData = useCallback(() => {
    const blank = createResumeData()
    storage.clear(blank)
    setUndoStack([])
    setRedoStack([])
    setSavedMsg(false)
  }, [storage])

  const undo = useCallback(() => {
    if (!undoStack.length) return
    setRedoStack(stack => [...stack, resumeData])
    setResumeDataRaw(undoStack[undoStack.length - 1])
    setUndoStack(stack => stack.slice(0, -1))
  }, [resumeData, setResumeDataRaw, undoStack])

  const redo = useCallback(() => {
    if (!redoStack.length) return
    setUndoStack(stack => [...stack, resumeData])
    setResumeDataRaw(redoStack[redoStack.length - 1])
    setRedoStack(stack => stack.slice(0, -1))
  }, [redoStack, resumeData, setResumeDataRaw])

  const data = useMemo(() => editorDataFromResumeData(resumeData), [resumeData])
  const custom = useMemo(() => templateCustomFromResumeData(resumeData), [resumeData])
  const template = resumeData.themeSettings.template || 'modern-pro'

  const setData = useCallback((updater) => {
    setResumeData(current => {
      const legacy = editorDataFromResumeData(current)
      const nextLegacy = typeof updater === 'function' ? updater(legacy) : updater
      return {
        ...current,
        skills: nextLegacy.skills || current.skills,
        projects: nextLegacy.projects || current.projects,
        certifications: nextLegacy.certifications || current.certifications,
        languages: nextLegacy.languages || current.languages,
        awards: nextLegacy.awards || current.awards,
        interests: nextLegacy.interests || current.interests,
        social: nextLegacy.social || current.social,
      }
    })
  }, [setResumeData])

  const setCustom = useCallback((updater) => {
    setResumeData(current => {
      const currentCustom = templateCustomFromResumeData(current)
      const nextCustom = typeof updater === 'function' ? updater(currentCustom) : updater
      return {
        ...current,
        themeSettings: {
          ...current.themeSettings,
          ...nextCustom,
          fontFamily: nextCustom.bodyFont || nextCustom.fontFamily || current.themeSettings.fontFamily,
          primaryColor: nextCustom.primaryColor || current.themeSettings.primaryColor,
        },
      }
    })
  }, [setResumeData])

  const setTemplate = useCallback((nextTemplate) => {
    handleChange('themeSettings.template', nextTemplate)
  }, [handleChange])

  const setPersonal = useCallback((field, value) => {
    setResumeData(current => {
      const personalInfo = { ...current.personalInfo }
      if (field === 'firstName' || field === 'lastName') personalInfo.name = mergeName(personalInfo, field, value)
      else if (field === 'linkedin') personalInfo.linkedIn = value
      else personalInfo[field] = value
      return { ...current, personalInfo }
    })
  }, [setResumeData])

  const addInterest = useCallback((interest) =>
    setResumeData(current => ({ ...current, interests: [...current.interests, interest] })), [setResumeData])

  const removeInterest = useCallback((index) =>
    setResumeData(current => ({ ...current, interests: current.interests.filter((_, i) => i !== index) })), [setResumeData])

  const setExp = useCallback((id, field, value) => {
    const canonicalField = field === 'position' ? 'role' : field
    setResumeData(current => ({
      ...current,
      experience: current.experience.map(item => item.id === id ? { ...item, [canonicalField]: value } : item),
    }))
  }, [setResumeData])

  const addExp = useCallback(() => addItem('experience'), [addItem])
  const removeExp = useCallback((id) => removeItem('experience', id), [removeItem])

  const setEdu = useCallback((id, field, value) => {
    const canonicalField = field === 'institution' ? 'school' : field
    setResumeData(current => ({
      ...current,
      education: current.education.map(item => {
        if (item.id !== id) return item
        const next = { ...item, [canonicalField]: value }
        if (field === 'endDate') next.year = value
        return next
      }),
    }))
  }, [setResumeData])

  const addEdu = useCallback(() => addItem('education'), [addItem])
  const removeEdu = useCallback((id) => removeItem('education', id), [removeItem])

  const addSkillCategory = useCallback(() => {
    setResumeData(current => ({
      ...current,
      skills: [...current.skills, createSkillCategory()],
    }))
  }, [setResumeData])

  const removeSkillCategory = useCallback((categoryId) => {
    setResumeData(current => {
      const skills = current.skills.filter(category => category.id !== categoryId)
      return { ...current, skills: skills.length ? skills : [createSkillCategory()] }
    })
  }, [setResumeData])

  const setSkillCatName = useCallback((categoryId, category) => {
    setResumeData(current => ({
      ...current,
      skills: current.skills.map(item => item.id === categoryId ? { ...item, category } : item),
    }))
  }, [setResumeData])

  const addSkill = useCallback((categoryId, name, level = 70) => {
    setResumeData(current => ({
      ...current,
      skills: current.skills.map(category => {
        if (category.id !== categoryId) return category
        if (name && category.skills.some(skill => skill.name === name)) return category
        return {
          ...category,
          skills: [...category.skills, { name, level, showLevel: true }],
        }
      }),
    }))
  }, [setResumeData])

  const removeSkill = useCallback((categoryId, index) => {
    setResumeData(current => ({
      ...current,
      skills: current.skills.map(category => category.id === categoryId
        ? { ...category, skills: category.skills.filter((_, skillIndex) => skillIndex !== index) }
        : category),
    }))
  }, [setResumeData])

  const updateSkill = useCallback((categoryId, index, field, value) => {
    setResumeData(current => ({
      ...current,
      skills: current.skills.map(category => category.id === categoryId
        ? {
            ...category,
            skills: category.skills.map((skill, skillIndex) =>
              skillIndex === index ? { ...skill, [field]: value } : skill
            ),
          }
        : category),
    }))
  }, [setResumeData])

  const updateCollection = useCallback((section, id, field, value) => {
    setResumeData(current => ({
      ...current,
      [section]: (current[section] || []).map(item => item.id === id ? { ...item, [field]: value } : item),
    }))
  }, [setResumeData])

  const addCollectionItem = useCallback((section, item) => {
    setResumeData(current => ({ ...current, [section]: [...(current[section] || []), { id: genId(), ...item }] }))
  }, [setResumeData])

  const removeCollectionItem = useCallback((section, id) => {
    setResumeData(current => ({ ...current, [section]: (current[section] || []).filter(item => item.id !== id) }))
  }, [setResumeData])

  return {
    resumeData,
    setResumeData,
    handleChange,
    addItem,
    removeItem,
    clearData,
    data,
    setData,
    custom,
    setCustom,
    template,
    setTemplate,
    hydrated: storage.hydrated,
    savedMsg: savedMsg || storage.saved,
    canUndo: undoStack.length > 0,
    canRedo: redoStack.length > 0,
    undo,
    redo,
    setPersonal,
    addInterest,
    removeInterest,
    setExp,
    addExp,
    removeExp,
    setEdu,
    addEdu,
    removeEdu,
    addSkillCategory,
    removeSkillCategory,
    setSkillCatName,
    addSkill,
    removeSkill,
    updateSkill,
    setProj: (id, field, value) => updateCollection('projects', id, field, value),
    addProj: () => addCollectionItem('projects', { name: '', description: '', technologies: [], link: '', github: '', startDate: '', endDate: '', highlights: [] }),
    removeProj: (id) => removeCollectionItem('projects', id),
    setCert: (id, field, value) => updateCollection('certifications', id, field, value),
    addCert: () => addCollectionItem('certifications', { name: '', issuer: '', date: '', expiry: '', credentialId: '' }),
    removeCert: (id) => removeCollectionItem('certifications', id),
    setLang: (id, field, value) => updateCollection('languages', id, field, value),
    addLang: () => addCollectionItem('languages', { language: '', proficiency: 'Intermediate' }),
    removeLang: (id) => removeCollectionItem('languages', id),
    setAward: (id, field, value) => updateCollection('awards', id, field, value),
    addAward: () => addCollectionItem('awards', { title: '', issuer: '', date: '', description: '' }),
    removeAward: (id) => removeCollectionItem('awards', id),
    setSocial: (field, value) => handleChange(['social', field], value),
  }
}
