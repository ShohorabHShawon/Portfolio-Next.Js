const WORDS_PER_MINUTE = 230;

export function countWords(text) {
  return String(text || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

// Medium-style image weighting: 12s for the first image, one second less for
// each following image, never dropping below 3s.
function imageReadingSeconds(imageCount) {
  let seconds = 0;
  for (let index = 0; index < imageCount; index += 1) {
    seconds += Math.max(3, 12 - index);
  }
  return seconds;
}

export function estimateReadingTime(text, imageCount = 0) {
  const wordSeconds = (countWords(text) / WORDS_PER_MINUTE) * 60;
  const totalSeconds = wordSeconds + imageReadingSeconds(Number(imageCount) || 0);

  return Math.max(1, Math.ceil(totalSeconds / 60));
}

// Full plain text of a Portable Text body (all blocks, including headings,
// quotes and list items), used for reading-time estimates.
export function portableTextToPlainText(blocks) {
  if (!Array.isArray(blocks)) return '';

  return blocks
    .filter((block) => block?._type === 'block' && Array.isArray(block.children))
    .map((block) => block.children.map((child) => child?.text || '').join(''))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function countPortableTextImages(blocks) {
  if (!Array.isArray(blocks)) return 0;
  return blocks.filter((block) => block?._type === 'image').length;
}
