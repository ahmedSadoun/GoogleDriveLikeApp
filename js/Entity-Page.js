let columnNumber = 4;
let currentEntities;
let dataUrl = " https://cerise-monkey-tutu.cyclic.app/subEntities";
async function fetchEntities(entity_id) {
  let res = await fetch(`${dataUrl}/${entity_id}`);
  res = await res.json();
  return res;
}
function getEntityIdFromUrl() {
  let urlString = window.location.href;
  let paramString = urlString.split("?")[1];
  let queryString = new URLSearchParams(paramString);
  let params = {};
  for (let pair of queryString.entries()) {
    params[pair[0]] = pair[1];
  }
  return params;
}

function buildColumns(entities, entityIndex) {
  let entitiesColumnString = "";
  let columnCounter = 1;
  for (; entityIndex < entities.length; entityIndex++) {
    let element = entities[entityIndex];
    if (element.entity_type === "FOLDER") {
      entitiesColumnString =
        entitiesColumnString +
        `
          <div class="col mt-2" style="max-width:25%">
            <button
              onclick="onFolderClick(this)"
                folder-identifier=${element.entity_id}
              type="button"
              class="btn btn-outline-dark overflow-x-hidden"
              style="width: 100%;height:100%"
            >
              <div class="d-flex">
                <div
                  class="l-o-c-qd"
                  role="img"
                  aria-label="Shared Google Drive Folder"
                >
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 32 32">
                <linearGradient id="KA3iPnJF2lqt7U2-W-Vona_oiCA327R8ADq_gr1" x1="16" x2="16" y1="4.905" y2="27.01" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#00b5f0"></stop><stop offset="1" stop-color="#008cc7"></stop></linearGradient><path fill="url(#KA3iPnJF2lqt7U2-W-Vona_oiCA327R8ADq_gr1)" d="M26,27H6c-1.105,0-2-0.895-2-2V7c0-1.105,0.895-2,2-2h4.027c0.623,0,1.22,0.247,1.66,0.688	l0.624,0.624C12.753,6.753,13.35,7,13.973,7H26c1.105,0,2,0.895,2,2v16C28,26.105,27.105,27,26,27z"></path><linearGradient id="KA3iPnJF2lqt7U2-W-Vonb_oiCA327R8ADq_gr2" x1="16" x2="16" y1="5" y2="27" gradientUnits="userSpaceOnUse"><stop offset="0" stop-opacity=".02"></stop><stop offset="1" stop-opacity=".15"></stop></linearGradient><path fill="url(#KA3iPnJF2lqt7U2-W-Vonb_oiCA327R8ADq_gr2)" d="M26,7H13.973	c-0.623,0-1.22-0.247-1.66-0.688l-0.625-0.625C11.247,5.247,10.65,5,10.027,5H6C4.895,5,4,5.895,4,7v18c0,1.105,0.895,2,2,2h20	c1.105,0,2-0.895,2-2V9C28,7.895,27.105,7,26,7z M27.75,25c0,0.965-0.785,1.75-1.75,1.75H6c-0.965,0-1.75-0.785-1.75-1.75V7	c0-0.965,0.785-1.75,1.75-1.75h4.027c0.56,0,1.087,0.218,1.484,0.615l0.625,0.625c0.491,0.491,1.143,0.761,1.837,0.761H26	c0.965,0,1.75,0.785,1.75,1.75V25z"></path><linearGradient id="KA3iPnJF2lqt7U2-W-Vonc_oiCA327R8ADq_gr3" x1="16" x2="16" y1="8.922" y2="27.008" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#00dcff"></stop><stop offset=".859" stop-color="#00bfff"></stop><stop offset="1" stop-color="#00a8e0"></stop></linearGradient><path fill="url(#KA3iPnJF2lqt7U2-W-Vonc_oiCA327R8ADq_gr3)" d="M27,27H5c-1.105,0-2-0.895-2-2V11	c0-1.105,0.895-2,2-2h22c1.105,0,2,0.895,2,2v14C29,26.105,28.105,27,27,27z"></path><linearGradient id="KA3iPnJF2lqt7U2-W-Vond_oiCA327R8ADq_gr4" x1="16" x2="16" y1="9" y2="27" gradientUnits="userSpaceOnUse"><stop offset="0" stop-opacity=".02"></stop><stop offset="1" stop-opacity=".15"></stop></linearGradient><path fill="url(#KA3iPnJF2lqt7U2-W-Vond_oiCA327R8ADq_gr4)" d="M27,9H5c-1.105,0-2,0.895-2,2v14	c0,1.105,0.895,2,2,2h22c1.105,0,2-0.895,2-2V11C29,9.895,28.105,9,27,9z M28.75,25c0,0.965-0.785,1.75-1.75,1.75H5	c-0.965,0-1.75-0.785-1.75-1.75V11c0-0.965,0.785-1.75,1.75-1.75h22c0.965,0,1.75,0.785,1.75,1.75V25z"></path>
                </svg>
                </div>
                <div class=" align-content-center">${element.entity_name}</div>
              </div>
            </button>
          </div>
       `;
    } else {
      entitiesColumnString =
        entitiesColumnString +
        `
          <div class="col mt-2 mt-2" style="max-width:25%">
            <button
              onclick="onFileClick(this)"
                file-identifier=${element.entity_id}
              type="button"
              class="btn btn-outline-dark overflow-x-hidden"
              style="width: 100%;height:100%"
            >
              <div class="d-flex">
                <div
                  class="l-o-c-qd"
                  role="img"
                  aria-label="Shared Google Drive Folder"
                >
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
<path fill="#16d6fa" d="M43,47H7V3h25.669L43,13.427V47z M11,43h28V15.073L31.001,7H11V43z"></path><polygon fill="#16d6fa" points="43,19 27,19 27,3 31,3 31,15 43,15"></polygon><rect width="18" height="4" x="16" y="23" fill="#16d6fa"></rect><rect width="18" height="4" x="16" y="31" fill="#16d6fa"></rect><rect width="4" height="4" x="27" y="3" fill="#00a4ff"></rect><rect width="4" height="4" x="39" y="15" fill="#00a4ff"></rect>
</svg>
                </div>
                <div class="align-content-center">${element.entity_name}</div>
              </div>
            </button>
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

function filterEntities(entities, entity_id) {
  let filteredEntities = entities.filter((element) => {
    if (element.entity_id === entity_id) {
      return element;
    }
  });
  return filteredEntities[0];
}

function buildEntitiesGrid(entities) {
  if (!entities || entities.length <= 0) {
    document.getElementById("entitiesContainer").innerHTML = `<div></div>`;
    return;
  }
  let rowsCount = Math.ceil(entities.length / columnNumber);
  let entitiesBodyString = "";
  let entityIndex = 0;
  for (let index = 0; index < rowsCount; index++) {
    entitiesBodyString =
      entitiesBodyString +
      `<div class="row d-flex p-2 mt-2" style="min-width: 500px;height:100px">`;
    let columns = buildColumns(entities, entityIndex);
    entityIndex = columns.entityIndex + 1;
    entitiesBodyString = entitiesBodyString + columns.entitiesColumnString;
    entitiesBodyString = entitiesBodyString + `</div>`;
  }

  document.getElementById("entitiesContainer").innerHTML = entitiesBodyString;
}

async function onPageLoadDrawEntities() {
  let entity_id = getEntityIdFromUrl().entity_id;
  currentEntities = await fetchEntities(entity_id);
  buildEntitiesGrid(currentEntities.sub_entities);
  navigationDrawer(currentEntities.entity_path);
}

function onFolderClick(folder) {
  let entity_id = folder.getAttribute("folder-identifier");

  window.location.href = `./Entity-Page.html?entity_id=${entity_id}`;
}

function navigationDrawer(navigationEntities) {
  let navigationEntitiesBodyString = `<p>
  <a
    href="./Home-Page.html"
    class="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
    >Home</a
  >
</p>`;

  if (!navigationEntities || navigationEntities.length <= 0) {
    document.getElementById("navigation").innerHTML =
      navigationEntitiesBodyString;
    return;
  }

  for (let index = 0; index < navigationEntities.length; index++) {
    let element = navigationEntities[index];

    navigationEntitiesBodyString =
      navigationEntitiesBodyString +
      `<svg
        class="a-s-fa-Ha-pa c-qd"
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        focusable="false"
        fill="currentColor"
      >
        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
      </svg>`;
    // }
    if (element.entity_type === "FOLDER") {
      navigationEntitiesBodyString =
        navigationEntitiesBodyString +
        `
      <p>
        <a
          href="./Entity-Page.html?entity_id=${element.entity_id}"
          class="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
          >${element.entity_name}</a
        >
      </p>`;
    } else {
      navigationEntitiesBodyString =
        navigationEntitiesBodyString +
        `
      <p>
        <a
          href="./Preview-file.html?entity_id=${element.entity_id}"
          class="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
          >${element.entity_name}</a
        >
      </p>`;
    }
  }

  document.getElementById("navigation").innerHTML =
    navigationEntitiesBodyString;
}

function onFileClick(file) {
  let entity_id = file.getAttribute("file-identifier");

  let currentEntity = filterEntities(currentEntities.sub_entities, entity_id);
  sessionStorage.setItem(
    "fileSource",
    JSON.stringify(currentEntity.entity_file_content)
  );

  window.location.href = `../HTMl/Preview-file.html?entity_id=${entity_id}`;
}

onPageLoadDrawEntities();
