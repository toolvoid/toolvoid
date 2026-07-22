# Implementation Plan

## Overview
Convert the existing "Story Generator" tool into a "Script Generator" that produces structured timed scripts with segments (narration + visual), while keeping the same URL slugs, quota key, and existing UI fields.

## Context & Scope
The Story Generator currently lives at `/story` (redirects to `/story-generator`) with `app/story/StoryClient.js` as the frontend and `app/api/generate-story/route.js` as the backend. The conversion must:
- Change all user-facing text from "Story" to "Script" (titles, H1s, meta, labels, badges, loading messages, error alerts, history entries)
- Add new input fields (duration, pace, topic, custom instructions) alongside existing fields
- Expand genre list with 8 new genres
- Replace the story-prose output with a timestamped segment list (start_time, end_time, narration, visual)
- Add a "Download SRT" button using a new `lib/convertToSRT.js` utility
- Change the backend prompt to request JSON array of segments
- Parse JSON response (with retry fallback) instead of the current extractTitle logic
- Keep URL slugs (`/story`, `/story-generator`) unchanged
- Keep quota key (`story-generator`) unchanged
- Keep auth, quota, RPM, concurrency logic unchanged

## Types

### Segment Type (returned by API + used in frontend)
```typescript
interface ScriptSegment {
  start_time: number;   // seconds from start
  end_time: number;     // seconds from start
  narration: string;    // spoken narration for this segment
  visual: string;       // visual description for this segment
}
```

### API Response Shape
```typescript
interface ScriptResponse {
  segments: ScriptSegment[];     // the parsed segments array
  title: string;                 // auto-generated script title
  model: string;                 // AI model used
  quota: QuotaInfo;              // { used, remaining, limit, reset }
  total_duration_seconds?: number;
  total_words?: number;
}
```

### New Frontend State Types
```typescript
type DurationOption = '15' | '30' | '45' | '60' | '300' | '600'; // seconds
type PaceOption = 'slow' | 'normal' | 'fast';
```

## Files

### New Files
1. **`lib/convertToSRT.js`** — Utility that takes `ScriptSegment[]` and returns a valid SRT-format string. Handles empty array, missing fields, and ensures proper HH:MM:SS,mmm formatting.

### Modified Files
1. **`app/story/StoryClient.js`** — Major changes:
   - Rename all user-facing "Story" text to "Script"
   - Rename HTML IDs (`#sg-output`, `#sg-builder`, `#sg-history` stay but all label text changes)
   - Add new state: `duration`, `pace`, `topic`, `customInstructions`
   - Add new genre options: Gaming, Comedy, True Crime/Mystery, Motivational, Tech/Educational, Action/Thriller, Documentary-style, Anime
   - Add duration selector (15s/30s/45s/1min/5min/10min as pill buttons)
   - Add pace selector (Slow/Normal/Fast as pill buttons)
   - Add Topic text input
   - Add Custom Instructions textarea
   - Modify `buildPrompt()` → `buildScriptPrompt()` to compute target words from duration×pace and build a JSON-requesting prompt
   - Modify `handleGenerate()` to send `{ prompt, duration, pace, topic, customInstructions, ...existing fields }`
   - Replace story output rendering with a list of segment cards (start_time → end_time, narration, visual)
   - Add "Download SRT" action button calling `convertToSRT(segments)`
   - Update loading messages, history items, export formats
   - Update the hero badge, H1, description text
   - Update the step labels/descriptions to reflect script-focus

2. **`app/api/generate-story/route.js`** — Moderate changes:
   - New system prompt that instructs AI to return ONLY valid JSON array of segments
   - Compute `words_per_second` from pace: Slow=2.0, Normal=2.5, Fast=3.5
   - `target_words = parseInt(duration) * words_per_second`
   - Build prompt with duration, target_words, topic, custom instructions merged with existing fields
   - Replace `extractTitle()` with `JSON.parse()` of response
   - Add retry logic: if JSON.parse fails, retry once with stricter "only JSON, no markdown fences" instruction
   - If retry fails, fall through to next provider (existing retry pattern)
   - Request body now accepts: `{ prompt, duration, pace, topic, customInstructions, ...existing }`
   - Keep quota, RPM, auth, concurrency, key rotation logic untouched

3. **`app/story/page.js`** — Update metadata:
   - Change `title` to "AI Script Generator Free Online — ToolVoid"
   - Change `description` to script-focused
   - Change `keywords` to script-related
   - Change `openGraph` title/description

4. **`app/page.js`** — Update tool card:
   - Change name from "Story Generator" to "Script Generator"
   - Update description from "Generate cinematic stories & scripts with AI" to "Generate timed AI video scripts with narration & visuals"

5. **`app/about/page.js`** — Update tool name reference

6. **`app/tools/story-generator/page.js`** — Update guide page:
   - Change title from "Story Generator Guide" to "Script Generator Guide"
   - Update items, tips, and limit text

7. **`app/layout.js`** — Update metadata description:
   - Change "AI story generator" to "AI script generator"

8. **`lib/mailer.js`** — Update email template text:
   - Change "Story Generator" to "Script Generator"

9. **`lib/seoConfig.js`** — Update SEO entry for story/script

10. **`app/privacy/page.js`** — Update privacy page mention

### Unmodified Files
- `app/story-generator/page.js` — Same re-export, no changes needed
- `lib/storyKeys.js` — No changes
- `lib/quotaStore.js` — Keep using `'story-generator'` key
- `lib/rpmLimiter.js` — Keep using `'story-generator'` key
- `lib/concurrentStore.js` — No changes
- `app/sitemap.js` — No changes (slug same)

## Functions

### `convertToSRT(segments: ScriptSegment[]): string` (NEW — in lib/convertToSRT.js)
- **Purpose**: Convert an array of script segments into a valid SRT subtitle string
- **Parameters**: `segments` — array of `{ start_time, end_time, narration, visual }`
- **Returns**: SRT-formatted string
- **Logic**:
  1. Validate input: if not array or empty, return empty string
  2. Map each segment to a subtitle block: sequential number, timestamp line (`HH:MM:SS,mmm --> HH:MM:SS,mmm`), narration text, blank line
  3. Helper `formatSRTTime(seconds: number)` converts fractional seconds to `HH:MM:SS,mmm`
  4. Handle missing `narration` field gracefully (use empty string)
  5. Handle missing `start_time` / `end_time` with `00:00:00,000` fallback

### `buildScriptPrompt(existingState)` (replaces `buildPrompt()` in StoryClient.js)
- **Purpose**: Build the AI prompt incorporating duration, pace, topic, custom instructions alongside all existing fields
- **Parameters**: Component state with fields: genre, mood, tone, charName, charAge, charGender, charRole, traits, period, place, world, conflict, twist, starter, length, pov, language, duration, pace, topic, customInstructions
- **Returns**: Multi-line prompt string
- **Logic**:
  1. Compute `words_per_second` from pace: Slow=2.0, Normal=2.5, Fast=3.5
  2. Compute `target_words = parseInt(duration) * words_per_second`
  3. Build prompt with all existing fields (genre, char, setting, plot, etc.)
  4. Add `topic` as core subject of the script
  5. Add instructions: script must be exactly `duration` seconds, ~`target_words` words
  6. Add "Strong opening hook, genre-appropriate tone" instruction
  7. If `customInstructions` provided: append as override with note "The following user instructions should override any genre/mood defaults if they conflict:"
  8. End with "Return ONLY valid JSON array of segments, no markdown fences: [{start_time, end_time, narration, visual}]"

### Updated `POST /api/generate-story` handler (route.js)
- **Purpose**: Accept new fields, compute words-per-second, request JSON segments from AI
- **I/O Changes**:
  - Accept: `{ prompt, duration, pace, topic, customInstructions, ...rest }`
  - Replace SYSTEM_PROMPT with script-focused version
  - Replace `extractTitle()` with `safeParseSegments(text)` that:
    - Strips markdown fences if present
    - `JSON.parse()` the response
    - Validates it's an array of objects with start_time/end_time/narration
    - On failure: retry once with stricter instruction
    - On second failure: throw error (caught by existing provider retry)
  - Return `{ segments, title, model, quota }`

### Updated `handleGenerate()` in StoryClient.js
- **Purpose**: Send new fields and parse segments response
- **Changes**:
  - Send `{ prompt, duration, pace, topic, customInstructions, length, isPremium }`
  - On success: set `segments` state array instead of `story` string
  - Generate title from response or from genre
  - Compute total duration from segments

### Frontend Output Rendering (replaces story display)
- **Purpose**: Display segments as timestamped cards
- **JSX Changes**:
  - Replace single `sg-story-body` prose div with a list of segment cards
  - Each card shows: time range badge (00:05 → 00:12), narration text, visual description
  - Keep the same card styling (sg-output, sg-story-title, sg-story-divider, sg-story-meta, sg-story-actions)
  - Add "Download SRT" button alongside copy/download

## Changes

### Step 1: Backend Prompt & Parsing (route.js)
1. Modify `SYSTEM_PROMPT` constant to instruct the AI to return JSON array of segments
2. Add duration/pace/topic extraction from request body
3. Compute `words_per_second` and `target_words`
4. Modify prompt construction to include target duration and word count
5. Replace `extractTitle()` with `safeParseSegments()` — JSON parse with retry
6. Update response shape to `{ segments, title, model, quota }`

### Step 2: Create SRT Utility (lib/convertToSRT.js)
1. Create new file with `convertToSRT(segments)` export
2. Implement `formatSRTTime(seconds)` helper
3. Handle edge cases: empty array, null segments, missing fields

### Step 3: Frontend — Rename & Metadata (StoryClient.js, story/page.js)
1. Change all "Story" → "Script" in text labels, titles, H1, badge, description
2. Update `story/page.js` metadata
3. Update page.js, about/page.js, layout.js, mailer.js, seoConfig.js, privacy/page.js, tools/story-generator/page.js

### Step 4: Frontend — New Input Fields (StoryClient.js)
1. Add state: `duration` (default '60'), `pace` (default 'normal'), `topic`, `customInstructions`
2. Add new genres to GENRES array
3. Add Duration selector UI (pill buttons: 15s, 30s, 45s, 1min, 5min, 10min)
4. Add Pace selector UI (pill buttons: Slow, Normal, Fast)
5. Add Topic input (short text)
6. Add Custom Instructions textarea (optional)

### Step 5: Frontend — Updated Prompt & Generate (StoryClient.js)
1. Replace `buildPrompt` with `buildScriptPrompt` that computes target words
2. Modify `handleGenerate` to send new fields
3. Set segments in state on success instead of story string

### Step 6: Frontend — Output Display (StoryClient.js)
1. Replace story prose with segment cards list
2. Add time range display for each segment
3. Add "Download SRT" button
4. Keep copy/download/regenerate/new buttons

### Step 7: Update References in Other Files
1. `app/page.js` — Update tool card name + description
2. `app/about/page.js` — Update tool mention
3. `app/tools/story-generator/page.js` — Update guide
4. `app/layout.js` — Update meta description
5. `lib/mailer.js` — Update email text
6. `lib/seoConfig.js` — Update SEO entry
7. `app/privacy/page.js` — Update mention

## Tests

### Unit Tests (manual verification via browser)
1. **Backend endpoint test**: Send POST to `/api/generate-story` with new fields, verify response contains `segments` array with correct shape
2. **JSON parse error handling**: Send bad prompt, verify retry logic and graceful fallback
3. **SRT conversion**: Test `convertToSRT()` with sample segments, verify output format matches SRT spec
4. **Frontend render**: Generate a script, verify all segments display with correct timestamps
5. **Download SRT**: Click download, verify .srt file contents
6. **Edge cases**: Empty segments, very short duration (15s), very long (10min), missing fields
7. **Existing behavior preserved**: Auth check, quota limit, RPM limit, login modal all work same as before
8. **Mobile layout**: Ensure new fields render properly on mobile viewport

### Verification Steps
- Open `/story-generator` in browser — should show "Script Generator" not "Story Generator"
- Fill all fields, generate — should get segments back, not prose
- Download SRT — file should be valid SRT format
- Copy button — should copy segments formatted as text
- Existing quota check should still work with same limits
