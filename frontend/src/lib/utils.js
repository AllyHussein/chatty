export function formatMessageTime(date) {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
export const compressImage = (base64Image) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = base64Image;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Set the maximum dimensions for compression
      const maxWidth = 500;
      const maxHeight = 500;

      let width = img.width;
      let height = img.height;

      // Maintain aspect ratio
      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      // Draw the resized image onto the canvas
      ctx.drawImage(img, 0, 0, width, height);

      // Compress the image to 70% quality
      const compressedBase64Image = canvas.toDataURL("image/jpeg", 0.7); // Adjust quality (0.1 - 1)

      resolve(compressedBase64Image);
    };

    img.onerror = () =>
      reject(new Error("Failed to load image for compression"));
  });
};
