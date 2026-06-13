'use client'

import { genId } from './utils'

export const RESUME_STORAGE_KEY = 'resume_builder_resume_data_v1'

export const createSkillCategory = () => ({
  id: genId(),
  category: 'Skills',
  skills: [],
})

export const createExperienceItem = () => ({
  id: genId(),
  company: '',
  role: '',
  startDate: '',
  endDate: '',
  description: '',
  location: '',
  current: false,
  type: 'Full-time',
  achievements: [],
})

export const createEducationItem = () => ({
  id: genId(),
  school: '',
  degree: '',
  year: '',
  field: '',
  location: '',
  startDate: '',
  endDate: '',
  current: false,
  gpa: '',
  coursework: '',
  honors: '',
  activities: '',
})

export const resumeSchema = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    linkedIn: '',
    website: '',
    title: '',
    location: '',
    github: '',
    twitter: '',
    summary: '',
    photo: null,
  },
  experience: [createExperienceItem()],
  education: [createEducationItem()],
  skills: [createSkillCategory()],
  themeSettings: {
    fontFamily: 'Arial',
    primaryColor: '#1E2D4A',
    fontSize: 10,
    secondaryColor: '#4A90D9',
    accentColor: '#10B981',
    backgroundColor: '#FFFFFF',
    textColor: '#111827',
    mutedColor: '#6B7280',
    borderColor: '#E5E7EB',
    headingFont: 'Georgia',
    sectionSpacing: 'normal',
    showPhoto: true,
    photoShape: 'circle',
    skillStyle: 'dots',
    bulletStyle: '•',
    sectionHeaderStyle: 'underline',
    template: 'modern-pro',
  },
  projects: [],
  certifications: [],
  languages: [],
  awards: [],
  interests: [],
  social: {
    stackoverflow: '',
    medium: '',
    behance: '',
    dribbble: '',
    youtube: '',
    instagram: '',
  },
}

export const createResumeData = () => ({
  ...resumeSchema,
  personalInfo: { ...resumeSchema.personalInfo },
  experience: [createExperienceItem()],
  education: [createEducationItem()],
  skills: [createSkillCategory()],
  themeSettings: { ...resumeSchema.themeSettings },
  projects: [],
  certifications: [],
  languages: [],
  awards: [],
  interests: [],
  social: { ...resumeSchema.social },
})

export function normalizeResumeData(value) {
  const base = createResumeData()
  if (!value || typeof value !== 'object') return base

  return {
    ...base,
    ...value,
    personalInfo: { ...base.personalInfo, ...(value.personalInfo || {}) },
    experience: Array.isArray(value.experience) && value.experience.length
      ? value.experience.map(item => ({ ...createExperienceItem(), ...item, id: item.id || genId() }))
      : base.experience,
    education: Array.isArray(value.education) && value.education.length
      ? value.education.map(item => ({ ...createEducationItem(), ...item, id: item.id || genId() }))
      : base.education,
    skills: Array.isArray(value.skills) && value.skills.length
      ? typeof value.skills[0] === 'string'
        ? [{
            id: genId(),
            category: 'Skills',
            skills: value.skills.filter(Boolean).map(name => ({
              name,
              level: 70,
              showLevel: true,
            })),
          }]
        : value.skills.map(category => ({
            id: category.id || genId(),
            category: category.category || 'Skills',
            skills: Array.isArray(category.skills)
              ? category.skills.map(skill => typeof skill === 'string'
                ? { name: skill, level: 70, showLevel: true }
                : {
                    name: skill.name || '',
                    level: Number.isFinite(skill.level) ? skill.level : 70,
                    showLevel: skill.showLevel !== false,
                  })
              : [],
          }))
      : base.skills,
    themeSettings: { ...base.themeSettings, ...(value.themeSettings || {}) },
    interests: Array.isArray(value.interests) ? value.interests : base.interests,
    social: { ...base.social, ...(value.social || {}) },
  }
}

export function editorDataFromResumeData(resumeData) {
  const nameParts = (resumeData.personalInfo.name || '').trim().split(/\s+/).filter(Boolean)
  const firstName = nameParts[0] || ''
  const lastName = nameParts.slice(1).join(' ')

  return {
    personal: {
      firstName,
      lastName,
      title: resumeData.personalInfo.title || '',
      email: resumeData.personalInfo.email || '',
      phone: resumeData.personalInfo.phone || '',
      location: resumeData.personalInfo.location || '',
      website: resumeData.personalInfo.website || '',
      linkedin: resumeData.personalInfo.linkedIn || '',
      github: resumeData.personalInfo.github || '',
      twitter: resumeData.personalInfo.twitter || '',
      summary: resumeData.personalInfo.summary || '',
      photo: resumeData.personalInfo.photo || null,
    },
    experience: resumeData.experience.map(item => ({
      id: item.id,
      company: item.company || '',
      position: item.role || '',
      location: item.location || '',
      startDate: item.startDate || '',
      endDate: item.endDate || '',
      current: Boolean(item.current),
      type: item.type || 'Full-time',
      description: item.description || '',
      achievements: Array.isArray(item.achievements) ? item.achievements : [],
    })),
    education: resumeData.education.map(item => ({
      id: item.id,
      institution: item.school || '',
      degree: item.degree || '',
      field: item.field || '',
      location: item.location || '',
      startDate: item.startDate || '',
      endDate: item.endDate || item.year || '',
      current: Boolean(item.current),
      gpa: item.gpa || '',
      coursework: item.coursework || '',
      honors: item.honors || '',
      activities: item.activities || '',
    })),
    skills: resumeData.skills.map(category => ({
      id: category.id,
      category: category.category || 'Skills',
      skills: category.skills.map(skill => ({
        name: skill.name || '',
        level: Number.isFinite(skill.level) ? skill.level : 70,
        showLevel: skill.showLevel !== false,
      })),
    })),
    projects: resumeData.projects || [],
    certifications: resumeData.certifications || [],
    languages: resumeData.languages || [],
    awards: resumeData.awards || [],
    interests: resumeData.interests || [],
    social: resumeData.social || {},
  }
}

export function templateCustomFromResumeData(resumeData) {
  const theme = resumeData.themeSettings
  return {
    primaryColor: theme.primaryColor,
    secondaryColor: theme.secondaryColor,
    accentColor: theme.accentColor,
    backgroundColor: theme.backgroundColor,
    textColor: theme.textColor,
    mutedColor: theme.mutedColor,
    borderColor: theme.borderColor,
    headingFont: theme.headingFont,
    bodyFont: theme.fontFamily,
    fontSize: theme.fontSize,
    sectionSpacing: theme.sectionSpacing,
    showPhoto: theme.showPhoto,
    photoShape: theme.photoShape,
    skillStyle: theme.skillStyle,
    bulletStyle: theme.bulletStyle,
    sectionHeaderStyle: theme.sectionHeaderStyle,
  }
}
