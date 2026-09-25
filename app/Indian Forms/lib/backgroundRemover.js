const MEDIAPIPE_SCRIPT = "https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/selfie_segmentation.js";
let segmentationLoader;

function loadSegmentationLibrary() {
  if (window.SelfieSegmentation) return Promise.resolve();
  if (segmentationLoader) return segmentationLoader;

  segmentationLoader = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = MEDIAPIPE_SCRIPT;
    script.async = true;
    script.onload = resolve;
    script.onerror = () => reject(new Error("Could not load the background-removal model. Check your internet connection and try again."));
    document.head.appendChild(script);
  });
  return segmentationLoader;
}

function makeCanvas(width, height) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

// MediaPipe Selfie Segmentation runs fully in the browser. Its mask retains
// the subject while the output canvas supplies a solid white background.
export async function removeBackground(imageEl) {
  await loadSegmentationLibrary();
  const width = imageEl.naturalWidth || imageEl.width;
  const height = imageEl.naturalHeight || imageEl.height;

  return new Promise((resolve, reject) => {
    const segmenter = new window.SelfieSegmentation({
      locateFile: (file) => "https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/" + file,
    });
    segmenter.setOptions({ modelSelection: 1 });
    segmenter.onResults((results) => {
      try {
        const output = makeCanvas(width, height);
        const outputContext = output.getContext("2d");
        const foreground = makeCanvas(width, height);
        const foregroundContext = foreground.getContext("2d");

        foregroundContext.drawImage(results.image, 0, 0, width, height);
        foregroundContext.globalCompositeOperation = "destination-in";
        foregroundContext.drawImage(results.segmentationMask, 0, 0, width, height);
        outputContext.fillStyle = "#ffffff";
        outputContext.fillRect(0, 0, width, height);
        outputContext.drawImage(foreground, 0, 0);
        segmenter.close();
        resolve(output);
      } catch (error) {
        segmenter.close();
        reject(error);
      }
    });
    segmenter.send({ image: imageEl }).catch((error) => {
      segmenter.close();
      reject(new Error(error.message || "Could not remove the background from this image."));
    });
  });
}

export async function replaceBackgroundIfNeeded(imageEl, requiresWhiteBg) {
  return requiresWhiteBg ? removeBackground(imageEl) : imageEl;
}
