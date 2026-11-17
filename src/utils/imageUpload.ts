export interface ImageCompressOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
}

const MAX_DATA_URL_LENGTH = 310000;

const isPdfFile = (file: File): boolean =>
  file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');

const isImageFile = (file: File): boolean => file.type.startsWith('image/');

const compressCanvasToJpeg = (
  sourceCanvas: HTMLCanvasElement,
  initialQuality: number
): string => {
  const qualitySteps = [initialQuality, 0.72, 0.58, 0.45].filter(
    (q, idx, arr) => q > 0 && arr.indexOf(q) === idx
  );

  for (const q of qualitySteps) {
    const candidate = sourceCanvas.toDataURL('image/jpeg', q);
    if (candidate.length <= MAX_DATA_URL_LENGTH) {
      return candidate;
    }
  }

  // Fallback: scale down slightly if dense document/photo still exceeds Firestore limit
  let currentCanvas = sourceCanvas;
  for (let attempt = 0; attempt < 2; attempt++) {
    const scaled = document.createElement('canvas');
    scaled.width = Math.max(1, Math.round(currentCanvas.width * 0.78));
    scaled.height = Math.max(1, Math.round(currentCanvas.height * 0.78));
    const ctx = scaled.getContext('2d');
    if (!ctx) break;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, scaled.width, scaled.height);
    ctx.drawImage(currentCanvas, 0, 0, scaled.width, scaled.height);
    currentCanvas = scaled;

    for (const q of [0.68, 0.52]) {
      const candidate = currentCanvas.toDataURL('image/jpeg', q);
      if (candidate.length <= MAX_DATA_URL_LENGTH) {
        return candidate;
      }
    }
  }

  return currentCanvas.toDataURL('image/jpeg', 0.45);
};

const processPdfFile = async (
  file: File,
  options: Required<ImageCompressOptions>
): Promise<string> => {
  const [pdfjsLib, workerMod] = await Promise.all([
    import('pdfjs-dist/legacy/build/pdf.mjs'),
    import('pdfjs-dist/legacy/build/pdf.worker.min.mjs?url'),
  ]);
  pdfjsLib.GlobalWorkerOptions.workerSrc = workerMod.default;

  const { maxWidth, maxHeight, quality } = options;
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  let pdf: Awaited<typeof loadingTask.promise> | null = null;

  try {
    pdf = await loadingTask.promise;
    const page = await pdf.getPage(1);
    const baseViewport = page.getViewport({ scale: 1 });
    const targetScale = Math.min(
      2.5,
      Math.max(maxWidth / baseViewport.width, maxHeight / baseViewport.height, 1.5)
    );
    const renderViewport = page.getViewport({ scale: targetScale });

    const renderCanvas = document.createElement('canvas');
    renderCanvas.width = Math.max(1, Math.round(renderViewport.width));
    renderCanvas.height = Math.max(1, Math.round(renderViewport.height));

    const renderCtx = renderCanvas.getContext('2d');
    if (renderCtx) {
      renderCtx.fillStyle = '#ffffff';
      renderCtx.fillRect(0, 0, renderCanvas.width, renderCanvas.height);
    }

    await page.render({
      canvas: renderCanvas,
      viewport: renderViewport,
      background: '#ffffff',
    }).promise;

    const fitRatio = Math.min(
      maxWidth / renderCanvas.width,
      maxHeight / renderCanvas.height,
      1
    );

    if (fitRatio < 1) {
      const outputCanvas = document.createElement('canvas');
      outputCanvas.width = Math.max(1, Math.round(renderCanvas.width * fitRatio));
      outputCanvas.height = Math.max(1, Math.round(renderCanvas.height * fitRatio));
      const outCtx = outputCanvas.getContext('2d');
      if (outCtx) {
        outCtx.fillStyle = '#ffffff';
        outCtx.fillRect(0, 0, outputCanvas.width, outputCanvas.height);
        outCtx.drawImage(renderCanvas, 0, 0, outputCanvas.width, outputCanvas.height);
        return compressCanvasToJpeg(outputCanvas, quality);
      }
    }

    return compressCanvasToJpeg(renderCanvas, quality);
  } finally {
    if (pdf) {
      await pdf.cleanup();
    }
    await loadingTask.destroy();
  }
};

/**
 * Reads an image or PDF File selected by the user (rendering page 1 for PDFs),
 * resizes it on an offscreen canvas so it stays within Firestore limits,
 * and resolves with a compressed JPEG data URL.
 */
export const processImageFile = async (
  file: File,
  options: ImageCompressOptions = {}
): Promise<string> => {
  const resolvedOptions: Required<ImageCompressOptions> = {
    maxWidth: options.maxWidth ?? 720,
    maxHeight: options.maxHeight ?? 720,
    quality: options.quality ?? 0.72,
  };

  if (isPdfFile(file)) {
    try {
      return await processPdfFile(file, resolvedOptions);
    } catch {
      throw new Error('PDF 첫 페이지를 이미지로 변환할 수 없습니다. 암호가 걸려 있거나 손상된 파일인지 확인해 주세요.');
    }
  }

  if (!isImageFile(file)) {
    throw new Error('이미지(JPG, PNG, WEBP) 또는 PDF 파일만 업로드할 수 있습니다.');
  }

  const { maxWidth, maxHeight, quality } = resolvedOptions;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('이미지 파일을 읽는 중 오류가 발생했습니다.'));
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const img = new Image();
      img.onerror = () => reject(new Error('올바른 이미지 형식이 아닙니다.'));
      img.onload = () => {
        let { width, height } = img;
        const ratio = Math.min(maxWidth / width, maxHeight / height, 1);
        width = Math.max(1, Math.round(width * ratio));
        height = Math.max(1, Math.round(height * ratio));

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(dataUrl);
          return;
        }

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        resolve(compressCanvasToJpeg(canvas, quality));
      };
      img.src = dataUrl;
    };

    reader.readAsDataURL(file);
  });
};
