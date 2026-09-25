function toBlob(canvas, mimeType, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Your browser could not encode this image."));
    }, mimeType, quality);
  });
}

function mimeForFormat(format) {
  return format === "png" ? "image/png" : "image/jpeg";
}

export function resizeToDimensions(imageEl, targetWidth, targetHeight) {
  const sourceWidth = imageEl.naturalWidth || imageEl.width;
  const sourceHeight = imageEl.naturalHeight || imageEl.height;
  const targetRatio = targetWidth / targetHeight;
  const sourceRatio = sourceWidth / sourceHeight;

  let cropWidth = sourceWidth;
  let cropHeight = sourceHeight;
  let sourceX = 0;
  let sourceY = 0;

  if (sourceRatio > targetRatio) {
    cropWidth = sourceHeight * targetRatio;
    sourceX = (sourceWidth - cropWidth) / 2;
  } else {
    cropHeight = sourceWidth / targetRatio;
    sourceY = (sourceHeight - cropHeight) / 2;
  }

  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const context = canvas.getContext("2d");
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(imageEl, sourceX, sourceY, cropWidth, cropHeight, 0, 0, targetWidth, targetHeight);
  return canvas;
}

export async function compressToRange(canvas, minKB, maxKB, format = "jpeg") {
  const mimeType = mimeForFormat(format);
  const minBytes = minKB * 1024;
  const maxBytes = maxKB * 1024;
  let low = 0.05;
  let high = 1;
  let best = null;

  for (let iteration = 0; iteration < 8; iteration += 1) {
    const quality = format === "png" ? undefined : (low + high) / 2;
    const blob = await toBlob(canvas, mimeType, quality);
    const distance = blob.size < minBytes ? minBytes - blob.size : blob.size > maxBytes ? blob.size - maxBytes : 0;

    if (!best || distance < best.distance) best = { blob, quality, distance };
    if (distance === 0) {
      return { blob, sizeKB: blob.size / 1024, quality, inRange: true };
    }

    // JPEG byte size rises with quality. PNG ignores quality, so one attempt is enough.
    if (format === "png") break;
    if (blob.size > maxBytes) high = quality;
    else low = quality;
  }

  return { blob: best.blob, sizeKB: best.blob.size / 1024, quality: best.quality, inRange: false };
}

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Please upload a valid image file."));
    };
    image.src = url;
  });
}

export async function processImageForSpec(file, spec, options = {}) {
  const image = await loadImage(file);
  const removeBackground = options.removeBackground ?? spec.requiresWhiteBg;
  const source = await replaceBackgroundIfNeeded(image, removeBackground);
  const canvas = resizeToDimensions(source, spec.width, spec.height);
  return compressToRange(canvas, spec.minKB, spec.maxKB, spec.format);
}
import { replaceBackgroundIfNeeded } from "./backgroundRemover";
