async function fetchAndGenerateThumbnail(entry_id, maxWidth, maxHeight) {
  try {
    // Fetch the file content
    const response = await fetchFileContent(entry_id);
    if (!response.ok) {
      throw new Error("Failed to fetch file content");
    }

    // Check the Content-Type of the response
    const contentType = response.headers.get("Content-Type");

    // Handle images
    if (contentType.startsWith("image")) {
      return generateImageThumbnail(response, maxWidth, maxHeight);
    }

    // Handle PDFs
    if (contentType === "application/pdf") {
      return generatePdfThumbnail(response, maxWidth, maxHeight);
    }

    // Handle videos (for demonstration purposes, extract thumbnail from first frame)
    if (contentType.startsWith("video")) {
      return generateVideoThumbnail(response, maxWidth, maxHeight);
    }

    // For other file types, generate a placeholder thumbnail or handle as needed
    console.warn("Unsupported file type. Generating placeholder thumbnail.");
    return null;
  } catch (error) {
    console.error(
      "Error fetching file content and generating thumbnail:",
      error
    );
    return null;
  }
}

// Function to generate thumbnail for images
async function generateImageThumbnail(response, maxWidth, maxHeight) {
  try {
    // Read the image content as a blob
    const blob = await response.blob();

    // Create an image element
    const img = new Image();

    // Load image from blob URL
    img.src = URL.createObjectURL(blob);

    // Create a canvas to draw thumbnail
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Wait for image to load
    await new Promise((resolve) => {
      img.onload = resolve;
    });

    // Calculate thumbnail dimensions while maintaining aspect ratio
    let width = img.width;
    let height = img.height;
    const aspectRatio = width / height;
    if (width > maxWidth) {
      width = maxWidth;
      height = width / aspectRatio;
    }
    if (height > maxHeight) {
      height = maxHeight;
      width = height * aspectRatio;
    }

    // Set canvas dimensions
    canvas.width = width;
    canvas.height = height;

    // Draw image on canvas
    ctx.drawImage(img, 0, 0, width, height);

    // Get data URL of the thumbnail
    const thumbnailUrl = canvas.toDataURL("image/jpeg");

    // Return thumbnail URL
    return thumbnailUrl;
  } catch (error) {
    console.error("Error generating image thumbnail:", error);
    return null;
  }
}

// Function to generate thumbnail for PDFs using PDF.js
async function generatePdfThumbnail(response, maxWidth, maxHeight) {
  try {
    // Read the PDF content as an ArrayBuffer
    const arrayBuffer = await response.arrayBuffer();

    // Load PDF using PDF.js
    const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;

    // Get the first page of the PDF
    const page = await pdf.getPage(1);

    // Get the viewport of the page at 1:1 scale
    const viewport = page.getViewport({ scale: 1 });

    // Calculate thumbnail dimensions while maintaining aspect ratio
    let width = viewport.width;
    let height = viewport.height;
    const aspectRatio = width / height;
    if (width > maxWidth) {
      width = maxWidth;
      height = width / aspectRatio;
    }
    if (height > maxHeight) {
      height = maxHeight;
      width = height * aspectRatio;
    }

    // Create a canvas to draw thumbnail
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;

    // Render the page on the canvas
    await page.render({
      canvasContext: ctx,
      viewport: page.getViewport({ scale: width / viewport.width }),
    }).promise;

    // Get data URL of the thumbnail
    const thumbnailUrl = canvas.toDataURL("image/jpeg");

    // Return thumbnail URL
    return thumbnailUrl;
  } catch (error) {
    console.error("Error generating PDF thumbnail:", error);
    return null;
  }
}

// Function to generate thumbnail for videos (extract thumbnail from first frame)
async function generateVideoThumbnail(response, maxWidth, maxHeight) {
  try {
    // Read video content as blob
    const blob = await response.blob();

    // Create video element
    const video = document.createElement("video");
    video.src = URL.createObjectURL(blob);

    // Load video metadata (including duration)
    await new Promise((resolve) => {
      video.onloadedmetadata = resolve;
    });

    // Create canvas to draw thumbnail
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Set canvas dimensions
    canvas.width = maxWidth;
    canvas.height = maxHeight;

    // Draw video frame on canvas (first frame)
    ctx.drawImage(video, 0, 0, maxWidth, maxHeight);

    // Get data URL of the thumbnail
    const thumbnailUrl = canvas.toDataURL("image/jpeg");

    // Return thumbnail URL
    return thumbnailUrl;
  } catch (error) {
    console.error("Error generating video thumbnail:", error);
    return null;
  }
}
