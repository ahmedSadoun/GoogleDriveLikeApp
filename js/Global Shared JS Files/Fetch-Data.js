let dataUrl = "http://localhost:3000";
let rootEntities = [];
async function fetchAlfrescoEntries(route) {
  let res = await $.ajax({
    url: dataUrl + route || "/",
    type: "GET",
    dataType: "json",
    // beforeSend: function (xhr) {
    //   xhr.setRequestHeader("Authorization", "Basic " + btoa("admin:admin"));
    // },
  });
  return res.list.entries;
}
async function fetchEntryNavigation(entry_id) {
  let res = await $.ajax({
    url: dataUrl + "/alFresco/entryNavigation/" + entry_id,
    type: "GET",
    dataType: "json",
    // beforeSend: function (xhr) {
    //   xhr.setRequestHeader("Authorization", "Basic " + btoa("admin:admin"));
    // },
  });
  return res;
}
async function fetchEntryMetaData(entry_id) {
  let res = await $.ajax({
    url: dataUrl + "/alFresco/nodeMetaData/" + entry_id,
    type: "GET",
    dataType: "json",
    // beforeSend: function (xhr) {
    //   xhr.setRequestHeader("Authorization", "Basic " + btoa("admin:admin"));
    // },
  });
  return res;
}
async function fetchFileContent(entry_id) {
  try {
    let res = await fetch(
      dataUrl + "/alFresco/nodeContent/" + entry_id

      // dataType: "arrayBuffer",
    );
    return res;
  } catch (error) {
    console.error("Error fetching file:", error);
  }
}

// Function to fetch image and generate thumbnail
async function fetchAndGenerateThumbnail(entry_id, maxWidth, maxHeight) {
  try {
    // Fetch the image
    const response = await fetchFileContent(entry_id);
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
    console.error("Error fetching image and generating thumbnail:", error);
    return null;
  }
}

async function createNewFolder(entry_id, folderName) {
  try {
    let data = {
      folderName: folderName,
      entry_id: entry_id,
    };
    console.log(data);
    let res = await $.ajax({
      url: dataUrl + "/alFresco/createFolder",
      type: "POST",
      data: JSON.stringify(data), // Convert data object to JSON string
      contentType: "application/json", // Set the content type to application/json
    });
    return res;
  } catch (error) {
    console.error("Error creating folder:", error);
    return null; // Handle the error by returning null or any other appropriate value
  }
}

// createNewFolder("7555e8f5-ac1d-46a7-a52d-78096fdef8e8", "eeeeeeee");