/**
 * Converts an array of script segments into a valid SRT subtitle string.
 *
 * @param {Array} segments - Array of { start_time, end_time, narration, visual }
 * @returns {string} SRT-formatted subtitle string
 */
export function convertToSRT(segments) {
  if (!segments || !Array.isArray(segments) || segments.length === 0) {
    return '';
  }

  return segments
    .map((seg, i) => {
      const start = formatSRTTime(seg.start_time ?? 0);
      const end = formatSRTTime(seg.end_time ?? 0);
      const text = (seg.narration || '').trim() || '...';
      return `${i + 1}\n${start} --> ${end}\n${text}\n`;
    })
    .join('\n');
}

/**
 * Converts a number of seconds to SRT timestamp format HH:MM:SS,mmm.
 * @param {number} seconds
 * @returns {string}
 */
function formatSRTTime(seconds) {
  if (typeof seconds !== 'number' || isNaN(seconds)) {
    return '00:00:00,000';
  }

  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  const millis = Math.floor((seconds % 1) * 1000);

  return `${pad(hrs)}:${pad(mins)}:${pad(secs)},${pad3(millis)}`;
}

function pad(n) {
  return String(n).padStart(2, '0');
}

function pad3(n) {
  return String(n).padStart(3, '0');
}
