'use client'

import { calcProgress } from '../lib/utils'

export default function Navbar({ data, canUndo, canRedo, onUndo, onRedo, onSample, onExportPDF, onExportJSON, isExporting, savedMsg, onShowATS, onShowKeywords, atsScore }) {
  const progress = calcProgress(data)
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-[60px] items-center border-b border-white/[0.07] bg-[#070d16]/90 px-5 backdrop-blur-xl">
      {/* Logo */}
      <div className="flex items-center gap-3 mr-8">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-blue-500 text-sm font-bold text-white shadow-lg shadow-blue-500/20 flex-shrink-0">
          RF
        </div>
        <div className="hidden sm:block">
          <span className="text-sm font-semibold tracking-tight text-white/85">ResumeForge</span>
          <span className="ml-1.5 text-[10px] text-white/22">Studio</span>
        </div>
      </div>

      {/* Progress */}
      <div className="hidden items-center gap-3 md:flex mr-auto">
        <div className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-1.5">
          <div className="h-1.5 w-28 overflow-hidden rounded-full bg-white/[0.07]">
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: 'linear-gradient(90deg,#3B82F6,#10B981)' }} />
          </div>
          <span className="text-xs font-medium text-white/38">{progress}%</span>
        </div>
        {savedMsg && (
          <span className="flex items-center gap-1 rounded-full border border-emerald-400/22 bg-emerald-400/8 px-2.5 py-1 text-[10.5px] font-medium text-emerald-300/70">
            <span className="text-xs">✓</span> Autosaved
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="ml-auto flex items-center gap-1.5">
        {/* Undo/redo */}
        <button onClick={onUndo} disabled={!canUndo} title="Ctrl+Z" className="hidden h-8 w-8 items-center justify-center rounded-lg text-white/30 transition-all hover:bg-white/[0.05] hover:text-white/65 disabled:opacity-20 sm:flex">↩</button>
        <button onClick={onRedo} disabled={!canRedo} className="hidden h-8 w-8 items-center justify-center rounded-lg text-white/30 transition-all hover:bg-white/[0.05] hover:text-white/65 disabled:opacity-20 sm:flex">↪</button>

        <div className="mx-1 hidden h-4 w-px bg-white/10 sm:block" />

        {/* ATS */}
        <button onClick={onShowATS} className="hidden items-center gap-1.5 rounded-xl border border-purple-400/22 bg-purple-400/8 px-3 py-1.5 text-xs font-medium text-purple-200/70 transition-all hover:bg-purple-400/14 sm:flex">
          🤖 ATS: {atsScore}
        </button>

        {/* Keywords */}
        <button onClick={onShowKeywords} className="hidden items-center gap-1.5 rounded-xl border border-blue-400/22 bg-blue-400/8 px-3 py-1.5 text-xs font-medium text-blue-200/65 transition-all hover:bg-blue-400/14 sm:flex">
          🎯 Keywords
        </button>

        {/* Sample */}
        <button onClick={onSample} className="hidden rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-white/38 transition-all hover:bg-white/[0.06] hover:text-white/65 sm:block">
          Load Sample
        </button>

        <div className="mx-1 hidden h-4 w-px bg-white/10 sm:block" />

        {/* Export options */}
        <button onClick={onExportJSON} className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-2.5 py-1.5 text-xs font-medium text-white/38 transition-all hover:text-white/65">JSON</button>

        {/* Export PDF */}
        <button
          onClick={onExportPDF}
          disabled={isExporting}
          className="flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          style={{ background: 'linear-gradient(135deg,#FF8A65,#4D96FF)' }}
        >
          {isExporting ? '⏳' : '⬇️'} <span className="hidden sm:inline">{isExporting ? 'Exporting…' : 'Export PDF'}</span>
        </button>
      </div>
    </header>
  )
}