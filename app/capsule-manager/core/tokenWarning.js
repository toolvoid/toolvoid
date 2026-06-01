const CONTEXT_WINDOW_TOKENS = 100000

const WARNING_THRESHOLDS = [
  { percent: 100, text: '🚨 [CONTEXT FULL] — Auto-generate capsule now.' },
  { percent: 90, text: '🔴 [90% Context Used] — Critical! Generate capsule and start a new chat.' },
  { percent: 80, text: '🟠 [80% Context Used] — Filling up. Generate a capsule now.' },
  { percent: 50, text: '⚠️ [50% Context Used] — Halfway through. Consider saving a capsule soon.' }
]

function estimateTokens(text = '') {
  const normalized = String(text).trim()
  if (!normalized) return 0

  const wordCount = normalized.split(/\s+/).filter(Boolean).length
  const charEstimate = Math.ceil(normalized.length / 4)
  const wordEstimate = Math.ceil(wordCount * 1.35)

  return Math.max(charEstimate, wordEstimate)
}

function getContextWarning(usedTokens = 0, contextWindow = CONTEXT_WINDOW_TOKENS) {
  if (!contextWindow || contextWindow <= 0) return ''

  const percentUsed = Math.floor((usedTokens / contextWindow) * 100)
  const threshold = WARNING_THRESHOLDS.find(item => percentUsed >= item.percent)
  return threshold ? threshold.text : ''
}

function buildTokenWarningPromptBlock(rawText = '', contextWindow = CONTEXT_WINDOW_TOKENS) {
  const usedTokens = estimateTokens(rawText)
  const currentWarning = getContextWarning(usedTokens, contextWindow)

  return `Token Warning System:
Estimate total tokens used in this conversation (all messages combined).
Assume context window = ${contextWindow.toLocaleString('en-US')} tokens.

Append this warning at the END of every response at these thresholds:

50%  → ⚠️ [50% Context Used] — Halfway through. Consider saving a capsule soon.
80%  → 🟠 [80% Context Used] — Filling up. Generate a capsule now.
90%  → 🔴 [90% Context Used] — Critical! Generate capsule and start a new chat.
100% → 🚨 [CONTEXT FULL] — Auto-generate capsule now.${currentWarning ? `\n\nCurrent estimated usage: ${usedTokens.toLocaleString('en-US')} / ${contextWindow.toLocaleString('en-US')} tokens.\n${currentWarning}` : ''}`
}

module.exports = {
  CONTEXT_WINDOW_TOKENS,
  estimateTokens,
  getContextWarning,
  buildTokenWarningPromptBlock
}
