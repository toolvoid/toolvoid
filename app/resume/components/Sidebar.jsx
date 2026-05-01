'use client'

import { EDITOR_SECTIONS } from '../lib/constants'
import { calcProgress, checkATS } from '../lib/utils'

const GROUPS = ['Core', 'Work', 'Extra']

export default function Sidebar({ activeSection, onSelect, data, template, templateName }) {
  const progress = calcProgress(data)
  const ats = checkATS(data)
  const filled = {}
  EDITOR_SECTIONS.forEach(s => {
    if (s.id === 'personal') filled[s.id] = !!(data.personal.firstName || data.personal.email)
    else if (s.id === 'experience') filled[s.id] = data.experience.some(e => e.company)
    else if (s.id === 'education') filled[s.id] = data.education.some(e => e.institution)
    else if (s.id === 'skills') filled[s.id] = data.skills.some(s => s.skills.length)
    else if (s.id === 'projects') filled[s.id] = data.projects.some(p => p.name)
    else if (s.id === 'certifications') filled[s.id] = data.certifications.some(c => c.name)
    else if (s.id === 'languages') filled[s.id] = data.languages.some(l => l.language)
    else if (s.id === 'awards') filled[s.id] = data.awards.some(a => a.title)
    else if (s.id === 'social') filled[s.id] = Object.values(data.social || {}).some(v => v)
  })

  return (
    <aside className="flex w-[272px] flex-shrink-0 flex-col border-r border-white/[0.07] bg-[#090f18]">
      {/* Stats */}
      <div className="border-b border-white/[0.07] p-4">
        <div className="grid grid-cols-2 gap-2">
          {/* Progress */}
          <div className="rounded-[18px] border border-white/[0.07] bg-white/[0.03] p-3.5">
            <p className="mb-1 text-[9.5px] font-semibold uppercase tracking-[0.18em] text-white/28">Profile</p>
            <div className="flex items-end gap-1">
              <span className="text-2xl font-bold leading-none text-white">{progress}</span>
              <span className="mb-0.5 text-xs text-white/28">%</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: 'linear-gradient(90deg,#3B82F6,#10B981)' }} />
            </div>
          </div>
          {/* ATS */}
          <div className="rounded-[18px] border border-white/[0.07] bg-white/[0.03] p-3.5">
            <p className="mb-1 text-[9.5px] font-semibold uppercase tracking-[0.18em] text-white/28">ATS Score</p>
            <div className="flex items-end gap-1">
              <span className={`text-2xl font-bold leading-none ${ats.score >= 80 ? 'text-emerald-400' : ats.score >= 60 ? 'text-amber-400' : 'text-red-400'}`}>{ats.score}</span>
              <span className="mb-0.5 text-xs text-white/28">/ 100</span>
            </div>
            <p className="mt-1.5 text-[9.5px] text-white/25">{ats.score >= 80 ? 'Excellent' : ats.score >= 60 ? 'Good' : 'Needs work'}</p>
          </div>
        </div>
      </div>

      {/* Active template badge */}
      <div className="border-b border-white/[0.07] px-4 py-3">
        <div className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2.5">
          <div className="h-2 w-2 flex-shrink-0 rounded-full" style={{ background: '#3B82F6' }} />
          <span className="truncate text-xs font-medium text-white/55">{templateName}</span>
        </div>
      </div>

      {/* Section nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-3">
        {GROUPS.map(group => {
          const sections = EDITOR_SECTIONS.filter(s => s.group === group)
          return (
            <div key={group} className="mb-4">
              <p className="mb-1 px-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/18">{group}</p>
              {sections.map(sec => {
                const isActive = activeSection === sec.id
                const isDone = filled[sec.id]
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => onSelect(sec.id)}
                    className={`mb-0.5 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-500/20 to-blue-400/10 border border-blue-400/22 text-white'
                        : 'text-white/40 hover:bg-white/[0.035] hover:text-white/72 border border-transparent'
                    }`}
                  >
                    <span className="flex-shrink-0 text-base leading-none">{sec.icon}</span>
                    <span className="flex-1 text-sm font-medium">{sec.label}</span>
                    {isDone && (
                      <span className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${isActive ? 'bg-blue-400' : 'bg-emerald-400/60'}`} />
                    )}
                  </button>
                )
              })}
            </div>
          )
        })}
      </nav>

      {/* Footer hint */}
      <div className="border-t border-white/[0.07] px-4 py-3">
        <p className="text-[10px] leading-relaxed text-white/18">Fill content → then switch to Design tab to pick template &amp; style.</p>
      </div>
    </aside>
  )
}