/**
 * Utilitar pentru comprimarea și conversia imaginilor în format Base64.
 * Folosit ca fallback automat când cota Firebase Storage (Spark Plan) este depășită.
 */
export const compressImageToBase64 = (file, maxWidth = 800, quality = 0.7) => {
  return new Promise((resolve) => {
    if (!file || !(file instanceof Blob)) {
      resolve('');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const dataUrl = event.target.result;
      const img = new Image();
      img.src = dataUrl;

      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          let { width, height } = img;

          if (width > maxWidth || height > maxWidth) {
            if (width > height) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            } else {
              width = Math.round((width * maxWidth) / height);
              height = maxWidth;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const compressed = canvas.toDataURL('image/jpeg', quality);
            resolve(compressed);
            return;
          }
        } catch (canvasErr) {
          console.warn('Eroare la comprimare canvas, se folosește dataURL original:', canvasErr);
        }
        resolve(dataUrl);
      };

      img.onerror = () => {
        resolve(dataUrl);
      };
    };

    reader.onerror = () => {
      resolve('');
    };
  });
};
