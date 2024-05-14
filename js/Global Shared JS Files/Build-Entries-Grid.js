let columnNumber = 4;
let supportedThumNailMediaType = ["application/pdf", "image/png"];
const mimeThumbnail = {
  "image/jpeg": "imgpreview",
  "image/png": "imgpreview",
  "image/gif": "imgpreview",
  "image/bmp": "imgpreview",
  "image/tiff": "imgpreview",
  "application/msword": "imgpreview",
  "application/vnd.ms-excel": "imgpreview",
  "application/vnd.ms-powerpoint": "imgpreview",
  "application/pdf": "imgpreview",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "doclib",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "doclib",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation":
    "doclib",
  "audio/mpeg": "avm",
  "audio/x-wav": "avm",
  "video/mp4": "avm",
  "video/quicktime": "avm",
  "video/x-msvideo": "avm",
  "text/plain": "imgpreview",
  "text/html": "imgpreview",
};

function getAllFileTags() {
  // Select all elements whose IDs start with "file_"
  const fileTags = document.querySelectorAll('[id^="file_"]');

  // Convert NodeList to array for easier manipulation if needed
  const fileTagsArray = Array.from(fileTags);

  return fileTagsArray;
}
function extractEntryId(id) {
  // Check if the ID starts with "file_"
  if (id.startsWith("file_")) {
    // Extract the text after "file_"
    return id.substring("file_".length);
  } else {
    // If the ID doesn't start with "file_", return null or handle it as needed
    return null;
  }
}
async function generateThumNail() {
  let tags = getAllFileTags();
  const maxWidth = 100;
  const maxHeight = 100;
  tags.forEach((element) => {
    let elementId = element.getAttribute("id");
    let mimeType = element.getAttribute("mimeType");
    let entry_id = extractEntryId(elementId);
    // console.log("entry_id", entry_id);
    if (entry_id) {
      let thumbnailType = mimeThumbnail[mimeType];
      if (thumbnailType) {
        fetchFileContentThumbNail(entry_id, thumbnailType).then(
          (thumbnailURL) => {
            element.setAttribute("src", thumbnailURL);
          }
        );
      }
    } else {
      console.log("Entry Id is null ya gama3a");
    }
  });

  // setEntryThumbNail(imageID, thumbnailUrl);
}

function buildColumns(entities, entityIndex) {
  let entitiesColumnString = "";
  let marginclass = ``;
  let columnCounter = 1;
  for (; entityIndex < entities.length; entityIndex++) {
    let element = entities[entityIndex].entry;
    if (entityIndex !== 0) {
      marginclass = " mt-2";
    }
    if (element.isFolder) {
      entitiesColumnString =
        entitiesColumnString +
        `
        <div class="col mt-2 col-md-3 overflow-hidden">
        <div class="card hover-effect" style="max-height:210px;min-height:210px ">
          <input type="checkbox" entry-identifier="${element.id}" id="todoCheckbox" class="card-checkbox" style="width:20px;height:20px;max-height:20px;min-height:20px">
          <button onclick="onFolderClick(this)" entry-identifier="${element.id}" type="button" class="btn border-0" style="width: 100%;height:100%;max-width: 90%;">
            <div class="card-body d-flex flex-column justify-content-between">
              <div class="d-flex justify-content-center">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 32 32">
              <linearGradient id="KA3iPnJF2lqt7U2-W-Vona_oiCA327R8ADq_gr1" x1="16" x2="16" y1="4.905" y2="27.01" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#00b5f0"></stop><stop offset="1" stop-color="#008cc7"></stop></linearGradient><path fill="url(#KA3iPnJF2lqt7U2-W-Vona_oiCA327R8ADq_gr1)" d="M26,27H6c-1.105,0-2-0.895-2-2V7c0-1.105,0.895-2,2-2h4.027c0.623,0,1.22,0.247,1.66,0.688	l0.624,0.624C12.753,6.753,13.35,7,13.973,7H26c1.105,0,2,0.895,2,2v16C28,26.105,27.105,27,26,27z"></path><linearGradient id="KA3iPnJF2lqt7U2-W-Vonb_oiCA327R8ADq_gr2" x1="16" x2="16" y1="5" y2="27" gradientUnits="userSpaceOnUse"><stop offset="0" stop-opacity=".02"></stop><stop offset="1" stop-opacity=".15"></stop></linearGradient><path fill="url(#KA3iPnJF2lqt7U2-W-Vonb_oiCA327R8ADq_gr2)" d="M26,7H13.973	c-0.623,0-1.22-0.247-1.66-0.688l-0.625-0.625C11.247,5.247,10.65,5,10.027,5H6C4.895,5,4,5.895,4,7v18c0,1.105,0.895,2,2,2h20	c1.105,0,2-0.895,2-2V9C28,7.895,27.105,7,26,7z M27.75,25c0,0.965-0.785,1.75-1.75,1.75H6c-0.965,0-1.75-0.785-1.75-1.75V7	c0-0.965,0.785-1.75,1.75-1.75h4.027c0.56,0,1.087,0.218,1.484,0.615l0.625,0.625c0.491,0.491,1.143,0.761,1.837,0.761H26	c0.965,0,1.75,0.785,1.75,1.75V25z"></path><linearGradient id="KA3iPnJF2lqt7U2-W-Vonc_oiCA327R8ADq_gr3" x1="16" x2="16" y1="8.922" y2="27.008" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#00dcff"></stop><stop offset=".859" stop-color="#00bfff"></stop><stop offset="1" stop-color="#00a8e0"></stop></linearGradient><path fill="url(#KA3iPnJF2lqt7U2-W-Vonc_oiCA327R8ADq_gr3)" d="M27,27H5c-1.105,0-2-0.895-2-2V11	c0-1.105,0.895-2,2-2h22c1.105,0,2,0.895,2,2v14C29,26.105,28.105,27,27,27z"></path><linearGradient id="KA3iPnJF2lqt7U2-W-Vond_oiCA327R8ADq_gr4" x1="16" x2="16" y1="9" y2="27" gradientUnits="userSpaceOnUse"><stop offset="0" stop-opacity=".02"></stop><stop offset="1" stop-opacity=".15"></stop></linearGradient><path fill="url(#KA3iPnJF2lqt7U2-W-Vond_oiCA327R8ADq_gr4)" d="M27,9H5c-1.105,0-2,0.895-2,2v14	c0,1.105,0.895,2,2,2h22c1.105,0,2-0.895,2-2V11C29,9.895,28.105,9,27,9z M28.75,25c0,0.965-0.785,1.75-1.75,1.75H5	c-0.965,0-1.75-0.785-1.75-1.75V11c0-0.965,0.785-1.75,1.75-1.75h22c0.965,0,1.75,0.785,1.75,1.75V25z"></path>
              </svg>
              </div>
              <div class="text-center mt-2">${element.name}</div>
            </div>
          </button>
        </div>
      </div>
      
         `;
    } else {
      entitiesColumnString =
        entitiesColumnString +
        `
        <div class="col mt-2 col-md-3 overflow-hidden" style="max-width: 25%;">
        <div class="card hover-effect " style="max-height:210px;min-height:210px ">
          <input type="checkbox" entry-identifier="${element.id}" id="todoCheckbox" class="card-checkbox" style="width:20px;height:20px; max-height:20px;min-height:20px ">
          <button onclick="onFileClick(this)" entry-identifier="${element.id}" type="button" class="btn border-0" style="width: 100%;height:100%;max-width: 90%;">
            <div class="card-body d-flex flex-column justify-content-between">
              <div class="d-flex justify-content-center">
                <img id="file_${element.id}" mimeType="${element.content.mimeType}" src="../Assets/pngwing.com.png" alt="${element.name}" style="max-width: 100px; max-height: 100px;">
              </div>
              <div class="text-center mt-2">${element.name}</div>
            </div>
          </button>
        </div>
      </div>
      
         `;
    }

    if (columnCounter == columnNumber) {
      break;
    }
    columnCounter++;
  }

  return {
    entitiesColumnString: entitiesColumnString,
    entityIndex: entityIndex,
  };
}
function buildEntitiesGrid(entities, containerId) {
  if (!entities || entities.length <= 0) {
    document.getElementById(containerId).innerHTML = "";
    return;
  }
  let rowsCount = Math.ceil(entities.length / columnNumber);
  let entitiesBodyString = "";
  let entityIndex = 0;
  for (let index = 0; index < rowsCount; index++) {
    let marginclass = index !== 0 ? "mt-5" : "";

    entitiesBodyString =
      entitiesBodyString +
      `<div class="row d-flex overflow-hidden" style="min-width: 500px; max-height:220px;min-height:200px ">`;
    let columns = buildColumns(entities, entityIndex);
    entityIndex = columns.entityIndex + 1;
    entitiesBodyString = entitiesBodyString + columns.entitiesColumnString;
    entitiesBodyString = entitiesBodyString + `</div>`;
    entitiesBodyString = entitiesBodyString + `<br />`;
    // console.log(index, entitiesBodyString);
  }
  document.getElementById(containerId).innerHTML =
    entitiesBodyString + `<br />` + `<br />`;
  // console.log("rrrrrrrrrrrrrrrrrrrr");
  generateThumNail();
}
