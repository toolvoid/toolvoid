'use client'

import React, { useState, useCallback, useMemo } from 'react'
import { ChevronRight, Download, Settings2, ZoomIn, ZoomOut, Loader, Sparkles } from 'lucide-react'

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * RESUME BUILDER UI - World-Class Frontend with Split-Screen Design
 * ═══════════════════════════════════════════════════════════════════════════
 */

// Sample Resume Data
const SAMPLE_RESUME = {
  personal: {
    firstName: 'Sarah',
    lastName: 'Anderson',
    title: 'Senior Product Designer',
    email: 'sarah.anderson@example.com',
    phone: '+1 (415) 555-0123',
    location: 'San Francisco, CA',
    summary: 'Creative and results-driven Product Designer with 8+ years of experience designing user-centered digital products. Specialized in design systems, user research, and cross-functional collaboration with proven track record of increasing user engagement by 45%.',
    photo: null,
    linkedin: 'linkedin.com/in/sarahanderson',
    github: 'github.com/sarahanderson',
    website: 'sarahanderson.design'
  },
  experience: [
    {
      id: 1,
      company: 'TechVision Inc.',
      position: 'Senior Product Designer',
      startDate: '2022-03',
      endDate: '',
      current: true,
      description: '• Led complete redesign of core platform, increasing user engagement by 45%\n• Established design system with 200+ reusable components\n• Mentored team of 4 junior designers and conducted design reviews\n• Conducted user research with 100+ customers quarterly'
    },
    {
      id: 2,
      company: 'Creative Studios',
      position: 'Product Designer',
      startDate: '2019-06',
      endDate: '2022-02',
      current: false,
      description: '• Designed mobile app used by 500k+ active users\n• Improved onboarding completion rate from 32% to 68%\n• Collaborated with engineering on accessibility improvements\n• Presented design work at 3 industry conferences'
    }
  ],
  education: [
    {
      id: 1,
      school: 'California Institute of the Arts',
      degree: 'BFA',
      field: 'Graphic Design',
      graduationYear: '2016'
    },
    {
      id: 2,
      school: 'Stanford University',
      degree: 'Certificate',
      field: 'Product Management',
      graduationYear: '2019'
    }
  ],
  skills: [
    {
      id: 1,
      category: 'Design Tools',
      items: ['Figma', 'Adobe XD', 'Sketch', 'Framer', 'Webflow', 'Protopie']
    },
    {
      id: 2,
      category: 'Core Skills',
      items: ['User Research', 'Interaction Design', 'Design Systems', 'Prototyping', 'Leadership', 'Accessibility']
    },
    {
      id: 3,
      category: 'Technical',
      items: ['HTML/CSS', 'JavaScript', 'React Basics', 'Git', 'UI Animations']
    }
  ],
  projects: [],
  certifications: []
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN BUILDER COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function ResumeBuilderUI({ initialData = null, onDownloadPDF = null }) {
  const [isDark, setIsDark] = useState(true)
  const [activeTab, setActiveTab] = useState('personal')
  const [zoomLevel, setZoomLevel] = useState(100)
  const [isDownloading, setIsDownloading] = useState(false)
  const [showSampleData, setShowSampleData] = useState(!initialData)
  const [resumeData, setResumeData] = useState(
    initialData || SAMPLE_RESUME
  )

  // Calculate completion percentage
  const calculateProgress = useCallback(() => {
    let total = 0
    let filled = 0

    // Personal info (40% weight)
    total += 40
    const personalFilled =
      (resumeData.personal.firstName ? 1 : 0) +
      (resumeData.personal.lastName ? 1 : 0) +
      (resumeData.personal.email ? 1 : 0) +
      (resumeData.personal.title ? 1 : 0)
    filled += (personalFilled / 4) * 40

    // Experience (25% weight)
    total += 25
    filled += Math.min(resumeData.experience.length * 8, 25)

    // Education (15% weight)
    total += 15
    filled += Math.min(resumeData.education.length * 7.5, 15)

    // Skills (15% weight)
    total += 15
    filled += Math.min(resumeData.skills.length * 3, 15)

    return Math.round(filled / total * 100)
  }, [resumeData])

  const progress = calculateProgress()

  // Handle form updates
  const updateField = (section, field, value) => {
    setResumeData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  const addItem = (section) => {
    setResumeData(prev => ({
      ...prev,
      [section]: [
        ...prev[section],
        section === 'experience'
          ? { id: Date.now(), company: '', position: '', startDate: '', endDate: '', current: false, description: '' }
          : section === 'education'
          ? { id: Date.now(), school: '', degree: '', field: '', graduationYear: '' }
          : section === 'skills'
          ? { id: Date.now(), category: '', items: [] }
          : { id: Date.now(), title: '', description: '' }
      ]
    }))
  }

  const removeItem = (section, id) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== id)
    }))
  }

  const handleDownloadPDF = async () => {
    if (!onDownloadPDF) return
    setIsDownloading(true)
    try {
      await onDownloadPDF(resumeData)
    } catch (error) {
      console.error('PDF download failed:', error)
    } finally {
      setIsDownloading(false)
    }
  }

  const tabColor = isDark ? 'text-slate-300' : 'text-slate-700'
  const activeBgColor = isDark ? 'bg-slate-800 border-blue-500' : 'bg-slate-100 border-blue-500'
  const inputBgColor = isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-300'
  const textColor = isDark ? 'text-slate-50' : 'text-slate-950'

  return (
    <div className={`min-h-screen flex ${isDark ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' : 'bg-gradient-to-br from-slate-50 via-white to-slate-100'}`}>
      {/* ─── LEFT SIDEBAR & EDITOR ─────────────────────────────────────────*/}
      <div className={`w-full md:w-1/2 lg:w-[45%] ${isDark ? 'bg-slate-900' : 'bg-white'} border-r ${isDark ? 'border-slate-800' : 'border-slate-200'} overflow-y-auto flex flex-col shadow-2xl`}>
        {/* Header */}
        <div className={`sticky top-0 z-40 ${isDark ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800/50 border-slate-800' : 'bg-gradient-to-b from-white via-white to-slate-50 border-slate-200'} border-b backdrop-blur-md p-6`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h1 className={`text-3xl font-black bg-gradient-to-r ${isDark ? 'from-blue-400 to-purple-500' : 'from-blue-600 to-purple-600'} bg-clip-text text-transparent`}>
                  Resume
                </h1>
                <div className={`px-3 py-1 rounded-full text-xs font-bold ${isDark ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-700'}`}>
                  BUILDER
                </div>
              </div>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'} font-medium`}>
                ✨ Create a stunning professional resume
              </p>
            </div>
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-3 rounded-xl transition-all hover:scale-110 ${isDark ? 'bg-gradient-to-br from-amber-500/20 to-orange-500/20 text-amber-400 hover:from-amber-500/30 hover:to-orange-500/30' : 'bg-gradient-to-br from-amber-100 to-orange-100 text-amber-600 hover:from-amber-200 hover:to-orange-200'} shadow-lg`}
              title={isDark ? 'Light mode' : 'Dark mode'}
            >
              {isDark ? '☀️' : '🌙'}
            </button>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className={`text-xs font-bold tracking-wide uppercase ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                📊 Profile Completion
              </span>
              <span className={`text-sm font-black px-3 py-1 rounded-full ${progress === 100 ? `${isDark ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-100 text-emerald-700'}` : `${isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'}`}`}>
                {progress}%
              </span>
            </div>
            <div className={`h-3 rounded-full ${isDark ? 'bg-slate-800/50' : 'bg-slate-200/50'} overflow-hidden backdrop-blur-sm border ${isDark ? 'border-slate-700' : 'border-slate-300'}`}>
              <div
                className={`h-full bg-gradient-to-r ${progress === 100 ? 'from-emerald-400 via-teal-500 to-emerald-600' : 'from-blue-400 via-blue-500 to-purple-600'} transition-all duration-500 shadow-lg`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Sample Data Toggle */}
          <button
            onClick={() => {
              setShowSampleData(!showSampleData)
              setResumeData(showSampleData ? {
                personal: { firstName: '', lastName: '', title: '', email: '', phone: '', location: '', summary: '', photo: null, linkedin: '', github: '', website: '' },
                experience: [], education: [], skills: [], projects: [], certifications: []
              } : SAMPLE_RESUME)
            }}
            className={`w-full mt-4 px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              showSampleData
                ? isDark
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/50'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'
                : isDark
                ? 'bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700/50'
                : 'bg-slate-100 border border-slate-300 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            {showSampleData ? 'Clear Sample Data' : 'Load Sample Data'}
          </button>
        </div>

        {/* Tabs Navigation */}
        <div className={`flex gap-2 p-4 ${isDark ? 'bg-gradient-to-b from-slate-800/50 to-transparent border-slate-800' : 'bg-gradient-to-b from-slate-100 to-transparent border-slate-200'} border-b overflow-x-auto backdrop-blur-sm`}>
          {[
            { id: 'personal', label: 'Personal', icon: '👤' },
            { id: 'experience', label: 'Experience', icon: '💼' },
            { id: 'education', label: 'Education', icon: '🎓' },
            { id: 'skills', label: 'Skills', icon: '⭐' },
            { id: 'projects', label: 'Projects', icon: '🚀' },
            { id: 'certifications', label: 'Certs', icon: '🏆' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl font-semibold text-sm whitespace-nowrap transition-all duration-300 flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? isDark
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30 scale-105'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : isDark
                  ? 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-slate-200'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Form Content */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {activeTab === 'personal' && (
            <PersonalEditor
              data={resumeData.personal}
              onUpdate={(field, value) => updateField('personal', field, value)}
              isDark={isDark}
            />
          )}
          {activeTab === 'experience' && (
            <ExperienceEditor
              items={resumeData.experience}
              onUpdate={(id, field, value) => {
                setResumeData(prev => ({
                  ...prev,
                  experience: prev.experience.map(exp =>
                    exp.id === id ? { ...exp, [field]: value } : exp
                  )
                }))
              }}
              onAdd={() => addItem('experience')}
              onRemove={(id) => removeItem('experience', id)}
              isDark={isDark}
            />
          )}
          {activeTab === 'education' && (
            <EducationEditor
              items={resumeData.education}
              onUpdate={(id, field, value) => {
                setResumeData(prev => ({
                  ...prev,
                  education: prev.education.map(edu =>
                    edu.id === id ? { ...edu, [field]: value } : edu
                  )
                }))
              }}
              onAdd={() => addItem('education')}
              onRemove={(id) => removeItem('education', id)}
              isDark={isDark}
            />
          )}
          {activeTab === 'skills' && (
            <SkillsEditor
              items={resumeData.skills}
              onUpdate={(id, field, value) => {
                setResumeData(prev => ({
                  ...prev,
                  skills: prev.skills.map(skill =>
                    skill.id === id ? { ...skill, [field]: value } : skill
                  )
                }))
              }}
              onAdd={() => addItem('skills')}
              onRemove={(id) => removeItem('skills', id)}
              isDark={isDark}
            />
          )}
        </div>

        {/* Footer with Download Button */}
        <div className={`sticky bottom-0 border-t ${isDark ? 'border-slate-800 bg-gradient-to-t from-slate-900 to-slate-900/50 backdrop-blur-md' : 'border-slate-200 bg-gradient-to-t from-white to-white/50 backdrop-blur-md'} p-6 flex gap-3 shadow-2xl`}>
          <button
            onClick={handleDownloadPDF}
            disabled={isDownloading || progress < 50}
            className={`flex-1 py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 text-base ${
              isDownloading || progress < 50
                ? isDark
                  ? 'bg-slate-800/50 text-slate-500 cursor-not-allowed'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : isDark
                ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white hover:shadow-xl hover:shadow-blue-500/50 active:scale-95 hover:translate-y-[-2px]'
                : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white hover:shadow-xl active:scale-95 hover:translate-y-[-2px]'
            }`}
          >
            {isDownloading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                Download PDF
              </>
            )}
          </button>
          <button
            className={`px-4 py-4 rounded-xl font-bold transition-all duration-300 ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-slate-100'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900'
            }`}
            title="Settings"
          >
            <Settings2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ─── RIGHT SIDE: A4 PREVIEW ────────────────────────────────────────*/}
      <div className={`hidden md:flex md:w-1/2 lg:w-[55%] flex-col items-center justify-center ${isDark ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' : 'bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100'} p-8 relative overflow-hidden`}>
        {/* Background Decoration */}
        {isDark && (
          <>
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-600/10 to-pink-600/10 rounded-full blur-3xl pointer-events-none" />
          </>
        )}
        
        {/* Preview Controls */}
        <div className={`relative z-10 flex gap-3 mb-8 ${isDark ? 'bg-gradient-to-r from-slate-800/80 to-slate-800/40' : 'bg-gradient-to-r from-white/80 to-slate-50/80'} p-4 rounded-2xl backdrop-blur-xl border ${isDark ? 'border-slate-700' : 'border-slate-200'} shadow-2xl`}>
          <button
            onClick={() => setZoomLevel(Math.max(50, zoomLevel - 10))}
            className={`p-3 rounded-xl transition-all hover:scale-110 ${isDark ? 'bg-slate-700/50 hover:bg-slate-600 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}
            title="Zoom out"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          <div className={`px-6 py-2 rounded-xl text-sm font-bold min-w-[80px] text-center ${isDark ? 'bg-slate-700/50 text-slate-200' : 'bg-slate-100 text-slate-800'}`}>
            {zoomLevel}%
          </div>
          <button
            onClick={() => setZoomLevel(Math.min(200, zoomLevel + 10))}
            className={`p-3 rounded-xl transition-all hover:scale-110 ${isDark ? 'bg-slate-700/50 hover:bg-slate-600 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}
            title="Zoom in"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
        </div>

        {/* A4 Preview Container */}
        <div className={`relative z-10 ${isDark ? 'bg-white' : 'bg-white'} rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-300`} style={{ width: `${210 * (zoomLevel / 100)}mm` }}>
          {/* Paper Shadow Effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/50 to-slate-50/50 shadow-inner pointer-events-none" />
          
          <div
            style={{
              width: '210mm',
              minHeight: '297mm',
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: 'top center',
              padding: '20mm'
            }}
            className={`bg-white text-slate-950 font-serif overflow-hidden`}
          >
            <ResumePreview data={resumeData} isDark={false} />
          </div>
        </div>
        
        {/* Footer Text */}
        <p className={`relative z-10 mt-6 text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          📄 A4 Paper Format - Print Ready
        </p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// FORM EDITORS
// ─────────────────────────────────────────────────────────────────────────────

function PersonalEditor({ data, onUpdate, isDark }) {
  const inputClass = `w-full px-4 py-3 rounded-xl border-2 transition-all font-medium ${
    isDark
      ? 'bg-slate-800/50 border-slate-700 text-slate-50 placeholder-slate-500 focus:border-blue-500 focus:bg-slate-800 focus:shadow-lg focus:shadow-blue-500/20'
      : 'bg-slate-50 border-slate-300 text-slate-950 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:shadow-lg focus:shadow-blue-500/10'
  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`

  return (
    <div className="space-y-6">
      <div>
        <h2 className={`text-2xl font-black mb-6 flex items-center gap-2 ${isDark ? 'text-slate-50' : 'text-slate-950'}`}>
          <span className="text-3xl">👤</span>
          Personal Information
        </h2>

        {/* Profile Photo */}
        <div className={`mb-8 p-6 rounded-2xl border-2 ${isDark ? 'bg-gradient-to-br from-slate-800/50 to-slate-800/30 border-slate-700 hover:border-blue-500/50' : 'bg-gradient-to-br from-slate-50 to-slate-100 border-slate-300 hover:border-blue-500/50'} transition-all`}>
          <div className="flex items-center gap-6">
            <div className={`w-24 h-24 rounded-2xl flex items-center justify-center text-5xl flex-shrink-0 ${isDark ? 'bg-gradient-to-br from-slate-700 to-slate-800 border-2 border-slate-600' : 'bg-gradient-to-br from-slate-200 to-slate-300 border-2 border-slate-300'} shadow-lg`}>
              {data.photo ? <img src={data.photo} alt="Profile" className="w-full h-full object-cover rounded-xl" /> : '📷'}
            </div>
            <div>
              <label className={`inline-block px-6 py-3 rounded-xl cursor-pointer font-bold text-sm transition-all transform hover:scale-105 active:scale-95 ${isDark ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-lg hover:shadow-blue-500/50' : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-lg'}`}>
                📤 Upload Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      const reader = new FileReader()
                      reader.onload = (event) => onUpdate('photo', event.target.result)
                      reader.readAsDataURL(file)
                    }
                  }}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Name */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className={`text-sm font-bold mb-2 block tracking-wide uppercase ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              🔤 First Name *
            </label>
            <input
              type="text"
              placeholder="Sarah"
              value={data.firstName}
              onChange={(e) => onUpdate('firstName', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={`text-sm font-bold mb-2 block tracking-wide uppercase ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              🔤 Last Name *
            </label>
            <input
              type="text"
              placeholder="Anderson"
              value={data.lastName}
              onChange={(e) => onUpdate('lastName', e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        {/* Title */}
        <div className="mb-4">
          <label className={`text-sm font-bold mb-2 block tracking-wide uppercase ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            💼 Professional Title
          </label>
          <input
            type="text"
            placeholder="Senior Product Designer"
            value={data.title}
            onChange={(e) => onUpdate('title', e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className={`text-sm font-bold mb-2 block tracking-wide uppercase ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              ✉️ Email *
            </label>
            <input
              type="email"
              placeholder="sarah.anderson@example.com"
              value={data.email}
              onChange={(e) => onUpdate('email', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={`text-sm font-bold mb-2 block tracking-wide uppercase ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              ☎️ Phone
            </label>
            <input
              type="tel"
              placeholder="+1 (415) 555-0123"
              value={data.phone}
              onChange={(e) => onUpdate('phone', e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className={`text-sm font-bold mb-2 block tracking-wide uppercase ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            📍 Location
          </label>
          <input
            type="text"
            placeholder="San Francisco, CA"
            value={data.location}
            onChange={(e) => onUpdate('location', e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Social Links */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className={`text-sm font-bold mb-2 block tracking-wide uppercase ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              💼 LinkedIn
            </label>
            <input
              type="text"
              placeholder="linkedin.com/in/sarah"
              value={data.linkedin}
              onChange={(e) => onUpdate('linkedin', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={`text-sm font-bold mb-2 block tracking-wide uppercase ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              💻 GitHub
            </label>
            <input
              type="text"
              placeholder="github.com/sarah"
              value={data.github}
              onChange={(e) => onUpdate('github', e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        {/* Professional Summary */}
        <div>
          <label className={`text-sm font-bold mb-2 block tracking-wide uppercase ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            ✍️ Professional Summary
          </label>
          <textarea
            placeholder="Write 2-3 compelling sentences about your experience and career goals..."
            value={data.summary}
            onChange={(e) => onUpdate('summary', e.target.value)}
            maxLength={500}
            className={`${inputClass} resize-none h-24`}
          />
          <p className={`text-xs mt-2 font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {data.summary.length}/500 characters
          </p>
        </div>
      </div>

      {/* Empty State Message */}
      {!data.firstName && !data.lastName && (
        <div className={`p-4 rounded-xl border-l-4 ${isDark ? 'bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500 text-amber-200' : 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-300 text-amber-800'}`}>
          <p className="text-sm font-semibold">🚀 Get started by filling in your basic information!</p>
        </div>
      )}
    </div>
  )
}

function ExperienceEditor({ items, onUpdate, onAdd, onRemove, isDark }) {
  const inputClass = `w-full px-4 py-3 rounded-xl border-2 transition-all font-medium ${
    isDark
      ? 'bg-slate-800/50 border-slate-700 text-slate-50 placeholder-slate-500 focus:border-purple-500 focus:bg-slate-800 focus:shadow-lg focus:shadow-purple-500/20'
      : 'bg-slate-50 border-slate-300 text-slate-950 placeholder-slate-400 focus:border-purple-500 focus:bg-white focus:shadow-lg focus:shadow-purple-500/10'
  } focus:outline-none focus:ring-2 focus:ring-purple-500/20`

  return (
    <div className="space-y-6">
      <h2 className={`text-2xl font-black mb-6 flex items-center gap-2 ${isDark ? 'text-slate-50' : 'text-slate-950'}`}>
        <span className="text-3xl">💼</span>
        Work Experience
      </h2>

      {items.length === 0 ? (
        <div className={`p-8 rounded-2xl border-2 border-dashed text-center ${isDark ? 'bg-gradient-to-br from-slate-800/50 to-slate-800/30 border-slate-700 text-slate-400 hover:border-purple-500/50' : 'bg-gradient-to-br from-slate-50 to-slate-100 border-slate-300 text-slate-600 hover:border-purple-500/50'} transition-all`}>
          <p className="mb-4 text-lg font-semibold">📋 Add your work experience</p>
          <p className="text-sm mb-6 opacity-75">Highlight your achievements and responsibilities</p>
          <button
            onClick={onAdd}
            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all transform hover:scale-105 active:scale-95 ${isDark ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:shadow-lg hover:shadow-purple-500/50' : 'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:shadow-lg'}`}
          >
            ➕ Add Experience
          </button>
        </div>
      ) : (
        <>
          {items.map((exp, idx) => (
            <div key={exp.id} className={`p-6 rounded-2xl border-2 transition-all ${isDark ? 'bg-gradient-to-br from-slate-800/50 to-slate-800/30 border-slate-700 hover:border-purple-500/50' : 'bg-gradient-to-br from-slate-50 to-slate-100 border-slate-300 hover:border-purple-500/50'}`}>
              <div className="flex justify-between items-start mb-4">
                <h3 className={`text-base font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  💼 Experience #{idx + 1}
                </h3>
                {items.length > 1 && (
                  <button
                    onClick={() => onRemove(exp.id)}
                    className={`text-xs font-bold px-3 py-1 rounded-lg transition-all transform hover:scale-110 active:scale-95 ${isDark ? 'bg-red-600/30 text-red-300 hover:bg-red-600/50' : 'bg-red-200 text-red-800 hover:bg-red-300'}`}
                  >
                    🗑️ Remove
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className={`text-xs font-bold mb-1 block tracking-wide uppercase ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Company</label>
                  <input
                    type="text"
                    placeholder="TechVision Inc."
                    value={exp.company}
                    onChange={(e) => onUpdate(exp.id, 'company', e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={`text-xs font-bold mb-1 block tracking-wide uppercase ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Job Title</label>
                  <input
                    type="text"
                    placeholder="Senior Designer"
                    value={exp.position}
                    onChange={(e) => onUpdate(exp.id, 'position', e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className={`text-xs font-bold mb-1 block tracking-wide uppercase ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Start Date</label>
                  <input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => onUpdate(exp.id, 'startDate', e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={`text-xs font-bold mb-1 block tracking-wide uppercase ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>End Date</label>
                  <input
                    type="month"
                    value={exp.current ? '' : exp.endDate}
                    disabled={exp.current}
                    onChange={(e) => onUpdate(exp.id, 'endDate', e.target.value)}
                    className={`${inputClass} disabled:opacity-50`}
                  />
                </div>
              </div>

              <label className={`flex items-center gap-2 mb-4 text-sm cursor-pointer font-semibold px-4 py-2 rounded-lg transition-all ${isDark ? 'bg-slate-700/30 text-slate-300 hover:bg-slate-700/50' : 'bg-slate-200/30 text-slate-700 hover:bg-slate-200/50'}`}>
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={(e) => onUpdate(exp.id, 'current', e.target.checked)}
                  className="w-4 h-4 accent-purple-600"
                />
                ⏰ Currently working here
              </label>

              <div>
                <label className={`text-xs font-bold mb-2 block tracking-wide uppercase ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>📝 Responsibilities & Achievements</label>
                <textarea
                  placeholder="• Led team of engineers to deliver project on time&#10;• Increased user engagement by 45%&#10;• Mentored 3 junior developers"
                  value={exp.description}
                  onChange={(e) => onUpdate(exp.id, 'description', e.target.value)}
                  className={`${inputClass} resize-none h-28`}
                />
              </div>
            </div>
          ))}

          <button
            onClick={onAdd}
            className={`w-full py-4 px-6 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all transform hover:scale-105 active:scale-95 ${
              isDark
                ? 'bg-gradient-to-r from-purple-600/20 to-purple-700/20 text-purple-300 border-2 border-purple-600/50 hover:from-purple-600/30 hover:to-purple-700/30 hover:border-purple-500'
                : 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border-2 border-purple-300 hover:from-purple-200 hover:to-purple-300 hover:border-purple-400'
            }`}
          >
            <span className="text-xl">➕</span> Add Experience
          </button>
        </>
      )}
    </div>
  )
}

function EducationEditor({ items, onUpdate, onAdd, onRemove, isDark }) {
  const inputClass = `w-full px-4 py-3 rounded-xl border-2 transition-all font-medium ${
    isDark
      ? 'bg-slate-800/50 border-slate-700 text-slate-50 placeholder-slate-500 focus:border-emerald-500 focus:bg-slate-800 focus:shadow-lg focus:shadow-emerald-500/20'
      : 'bg-slate-50 border-slate-300 text-slate-950 placeholder-slate-400 focus:border-emerald-500 focus:bg-white focus:shadow-lg focus:shadow-emerald-500/10'
  } focus:outline-none focus:ring-2 focus:ring-emerald-500/20`

  return (
    <div className="space-y-6">
      <h2 className={`text-2xl font-black mb-6 flex items-center gap-2 ${isDark ? 'text-slate-50' : 'text-slate-950'}`}>
        <span className="text-3xl">🎓</span>
        Education
      </h2>

      {items.length === 0 ? (
        <div className={`p-8 rounded-2xl border-2 border-dashed text-center ${isDark ? 'bg-gradient-to-br from-slate-800/50 to-slate-800/30 border-slate-700 text-slate-400 hover:border-emerald-500/50' : 'bg-gradient-to-br from-slate-50 to-slate-100 border-slate-300 text-slate-600 hover:border-emerald-500/50'} transition-all`}>
          <p className="mb-4 text-lg font-semibold">🏫 Add your educational background</p>
          <p className="text-sm mb-6 opacity-75">Include degrees, certifications, and training</p>
          <button
            onClick={onAdd}
            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all transform hover:scale-105 active:scale-95 ${isDark ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white hover:shadow-lg hover:shadow-emerald-500/50' : 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white hover:shadow-lg'}`}
          >
            ➕ Add Education
          </button>
        </div>
      ) : (
        <>
          {items.map((edu, idx) => (
            <div key={edu.id} className={`p-6 rounded-2xl border-2 transition-all ${isDark ? 'bg-gradient-to-br from-slate-800/50 to-slate-800/30 border-slate-700 hover:border-emerald-500/50' : 'bg-gradient-to-br from-slate-50 to-slate-100 border-slate-300 hover:border-emerald-500/50'}`}>
              <div className="flex justify-between items-start mb-4">
                <h3 className={`text-base font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  🎓 Education #{idx + 1}
                </h3>
                {items.length > 1 && (
                  <button
                    onClick={() => onRemove(edu.id)}
                    className={`text-xs font-bold px-3 py-1 rounded-lg transition-all transform hover:scale-110 active:scale-95 ${isDark ? 'bg-red-600/30 text-red-300 hover:bg-red-600/50' : 'bg-red-200 text-red-800 hover:bg-red-300'}`}
                  >
                    🗑️ Remove
                  </button>
                )}
              </div>

              <div className="mb-4">
                <label className={`text-xs font-bold mb-1 block tracking-wide uppercase ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>School/University</label>
                <input
                  type="text"
                  placeholder="California Institute of the Arts"
                  value={edu.school}
                  onChange={(e) => onUpdate(edu.id, 'school', e.target.value)}
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className={`text-xs font-bold mb-1 block tracking-wide uppercase ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Degree</label>
                  <input
                    type="text"
                    placeholder="BFA"
                    value={edu.degree}
                    onChange={(e) => onUpdate(edu.id, 'degree', e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={`text-xs font-bold mb-1 block tracking-wide uppercase ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Field of Study</label>
                  <input
                    type="text"
                    placeholder="Graphic Design"
                    value={edu.field}
                    onChange={(e) => onUpdate(edu.id, 'field', e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={`text-xs font-bold mb-1 block tracking-wide uppercase ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Graduation Year</label>
                <input
                  type="number"
                  placeholder="2016"
                  value={edu.graduationYear}
                  onChange={(e) => onUpdate(edu.id, 'graduationYear', e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          ))}

          <button
            onClick={onAdd}
            className={`w-full py-4 px-6 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all transform hover:scale-105 active:scale-95 ${
              isDark
                ? 'bg-gradient-to-r from-emerald-600/20 to-emerald-700/20 text-emerald-300 border-2 border-emerald-600/50 hover:from-emerald-600/30 hover:to-emerald-700/30 hover:border-emerald-500'
                : 'bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800 border-2 border-emerald-300 hover:from-emerald-200 hover:to-emerald-300 hover:border-emerald-400'
            }`}
          >
            <span className="text-xl">➕</span> Add Education
          </button>
        </>
      )}
    </div>
  )
}

function SkillsEditor({ items, onUpdate, onAdd, onRemove, isDark }) {
  const inputClass = `w-full px-4 py-3 rounded-xl border-2 transition-all font-medium ${
    isDark
      ? 'bg-slate-800/50 border-slate-700 text-slate-50 placeholder-slate-500 focus:border-amber-500 focus:bg-slate-800 focus:shadow-lg focus:shadow-amber-500/20'
      : 'bg-slate-50 border-slate-300 text-slate-950 placeholder-slate-400 focus:border-amber-500 focus:bg-white focus:shadow-lg focus:shadow-amber-500/10'
  } focus:outline-none focus:ring-2 focus:ring-amber-500/20`

  return (
    <div className="space-y-6">
      <h2 className={`text-2xl font-black mb-6 flex items-center gap-2 ${isDark ? 'text-slate-50' : 'text-slate-950'}`}>
        <span className="text-3xl">⭐</span>
        Skills & Expertise
      </h2>

      {items.length === 0 ? (
        <div className={`p-8 rounded-2xl border-2 border-dashed text-center ${isDark ? 'bg-gradient-to-br from-slate-800/50 to-slate-800/30 border-slate-700 text-slate-400 hover:border-amber-500/50' : 'bg-gradient-to-br from-slate-50 to-slate-100 border-slate-300 text-slate-600 hover:border-amber-500/50'} transition-all`}>
          <p className="mb-4">No skills added yet</p>
          <button
            onClick={onAdd}
            className={`px-4 py-2 rounded-lg font-medium text-sm ${isDark ? 'bg-blue-600/20 text-blue-400 hover:bg-blue-600/30' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'} transition-colors`}
          >
            + Add Skill Category
          </button>
        </div>
      ) : (
        <>
          {items.map((skill, idx) => (
            <div key={skill.id} className={`p-4 rounded-lg border ${isDark ? 'bg-slate-800/30 border-slate-700' : 'bg-slate-50 border-slate-300'}`}>
              <div className="flex justify-between items-start mb-4">
                <h3 className={`text-sm font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Skill {idx + 1}
                </h3>
                {items.length > 1 && (
                  <button
                    onClick={() => onRemove(skill.id)}
                    className={`text-xs font-medium px-3 py-1 rounded-lg ${isDark ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30' : 'bg-red-100 text-red-700 hover:bg-red-200'}`}
                  >
                    Remove
                  </button>
                )}
              </div>

              <input
                type="text"
                placeholder="Category (e.g., Languages)"
                value={skill.category}
                onChange={(e) => onUpdate(skill.id, 'category', e.target.value)}
                className={`${inputClass} mb-4`}
              />

              <textarea
                placeholder="Comma-separated skills (e.g., JavaScript, React, Node.js)"
                value={Array.isArray(skill.items) ? skill.items.join(', ') : ''}
                onChange={(e) => onUpdate(skill.id, 'items', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                className={`${inputClass} resize-none`}
                rows="3"
              />
            </div>
          ))}

          <button
            onClick={onAdd}
            className={`w-full py-3 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-colors ${
              isDark
                ? 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700'
                : 'bg-slate-100 text-slate-700 border border-slate-300 hover:bg-slate-200'
            }`}
          >
            <span className="text-lg">+</span> Add Skill Category
          </button>
        </>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// A4 RESUME PREVIEW
// ─────────────────────────────────────────────────────────────────────────────

function ResumePreview({ data, isDark }) {
  const textClass = 'text-slate-950'
  const headingClass = 'text-slate-950 font-bold'
  const mutedClass = 'text-slate-600'

  return (
    <div className="space-y-4">
      {/* Header */}
      {(data.personal.firstName || data.personal.lastName) && (
        <div className="border-b-2 border-slate-300 pb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className={`${headingClass} text-2xl`}>
                {data.personal.firstName} {data.personal.lastName}
              </h1>
              {data.personal.title && (
                <p className={`text-sm font-semibold ${mutedClass}`}>
                  {data.personal.title}
                </p>
              )}
            </div>
            {data.personal.photo && (
              <img src={data.personal.photo} alt="" className="w-16 h-16 rounded object-cover ml-4" />
            )}
          </div>

          {/* Contact Info */}
          <div className={`text-xs mt-2 flex flex-wrap gap-3 ${mutedClass}`}>
            {data.personal.email && <span>{data.personal.email}</span>}
            {data.personal.phone && <span>•</span>}
            {data.personal.phone && <span>{data.personal.phone}</span>}
            {data.personal.location && <span>•</span>}
            {data.personal.location && <span>{data.personal.location}</span>}
          </div>
        </div>
      )}

      {/* Summary */}
      {data.personal.summary && (
        <div>
          <p className={`text-xs leading-relaxed ${textClass}`}>
            {data.personal.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div>
          <h2 className={`${headingClass} text-sm uppercase tracking-wider mb-2 border-b border-slate-300 pb-1`}>
            Experience
          </h2>
          <div className="space-y-3">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between">
                  <h3 className={`${headingClass} text-xs`}>{exp.position}</h3>
                  {exp.startDate && (
                    <span className={`text-xs ${mutedClass}`}>
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  )}
                </div>
                {exp.company && (
                  <p className={`text-xs ${mutedClass}`}>{exp.company}</p>
                )}
                {exp.description && (
                  <p className={`text-xs mt-1 leading-relaxed ${textClass}`}>
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div>
          <h2 className={`${headingClass} text-sm uppercase tracking-wider mb-2 border-b border-slate-300 pb-1`}>
            Education
          </h2>
          <div className="space-y-2">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between">
                  <h3 className={`${headingClass} text-xs`}>{edu.degree}</h3>
                  {edu.graduationYear && (
                    <span className={`text-xs ${mutedClass}`}>{edu.graduationYear}</span>
                  )}
                </div>
                {edu.school && (
                  <p className={`text-xs ${mutedClass}`}>{edu.school}</p>
                )}
                {edu.field && (
                  <p className={`text-xs ${textClass}`}>{edu.field}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div>
          <h2 className={`${headingClass} text-sm uppercase tracking-wider mb-2 border-b border-slate-300 pb-1`}>
            Skills
          </h2>
          <div className="space-y-1">
            {data.skills.map((skillGroup) => (
              <div key={skillGroup.id}>
                {skillGroup.category && (
                  <span className={`${headingClass} text-xs`}>{skillGroup.category}:</span>
                )}
                {Array.isArray(skillGroup.items) && skillGroup.items.length > 0 && (
                  <p className={`text-xs ${textClass}`}>
                    {skillGroup.items.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!data.personal.firstName && !data.experience.length && !data.education.length && (
        <div className={`p-8 text-center ${isDark ? 'bg-slate-50' : 'bg-slate-100'} rounded-lg`}>
          <p className={`${mutedClass} text-sm`}>
            Your resume preview will appear here as you fill in your information
          </p>
        </div>
      )}
    </div>
  )
}

export default ResumeBuilderUI
