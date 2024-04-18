import { print } from "./x.mjs";
print();
let columnNumber = 4;
let dataUrl = "https://c5b3762fa879446cbabfc42b27b4ca6b.api.mockbin.io/";
let rootEntities = [];
async function fetchEntities() {
  let res = await fetch(dataUrl);
  res = await res.json();
  return res;
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
              style="width: 100%"
            >
              <div class="d-flex">
                <div
                  class="l-o-c-qd"
                  role="img"
                  aria-label="Shared Google Drive Folder"
                >
                  <svg
                    focusable="false"
                    viewBox="0 0 24 24"
                    height="24px"
                    width="24px"
                    fill="#5f6368"
                    class="a-s-fa-Ha-pa"
                  >
                    <g>
                      <path
                        d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-5 3c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm4 8h-8v-1c0-1.33 2.67-2 4-2s4 .67 4 2v1z"
                      ></path>
                      <path d="M0 0h24v24H0z" fill="none"></path>
                    </g>
                  </svg>
                </div>
                <div class="d-flex">${element.entity_name}</div>
              </div>
            </button>
          </div>
       `;
    } else {
      entitiesColumnString =
        entitiesColumnString +
        `
          <div class="col mt-2" style="max-width:25%">
            <button
              onclick="onFileClick(this)"
                file-identifier=${element.entity_id}
              type="button"
              class="btn btn-outline-dark overflow-x-hidden"
              style="width: 100%"
            >
              <div class="d-flex">
                <div
                  class="l-o-c-qd"
                  role="img"
                  aria-label="Shared Google Drive Folder"
                >
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 50 50">
                <path d="M 7 2 L 7 48 L 43 48 L 43 14.59375 L 42.71875 14.28125 L 30.71875 2.28125 L 30.40625 2 Z M 9 4 L 29 4 L 29 16 L 41 16 L 41 46 L 9 46 Z M 31 5.4375 L 39.5625 14 L 31 14 Z"></path>
                </svg>
                </div>
                <div class="d-flex">${element.entity_name}</div>
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
function buildEntitiesGrid(entities) {
  if (!entities || entities.length <= 0) {
    return;
  }
  let rowsCount = Math.ceil(entities.length / columnNumber);
  let entitiesBodyString = "";
  let entityIndex = 0;
  for (let index = 0; index < rowsCount; index++) {
    entitiesBodyString =
      entitiesBodyString +
      `<div class="row d-flex p-2" style="min-width: 500px">`;
    let columns = buildColumns(entities, entityIndex);
    entityIndex = columns.entityIndex + 1;
    entitiesBodyString = entitiesBodyString + columns.entitiesColumnString;
    entitiesBodyString = entitiesBodyString + `</div>`;
    // console.log(index, entitiesBodyString);
  }
  document.getElementById("entitiesContainer").innerHTML = entitiesBodyString;
}

(async function () {
  rootEntities = await fetchEntities();

  buildEntitiesGrid(rootEntities);
})();

function filterEntities(entities, entity_id) {
  let filteredEntities = entities.filter((element) => {
    if (element.entity_id === entity_id) {
      return element;
    }
  });
  return filteredEntities[0];
}

function onFolderClick(folder) {
  let entity_id = folder.getAttribute("folder-identifier");
  let currentEntity = filterEntities(rootEntities, entity_id);

  addToNavigationList(currentEntity);
  addToCacheObj(currentEntity);
  window.location.href = `./Entity-Page.html?entity_id=${entity_id}`;
}

function addToNavigationList(currentEntity) {
  let navigationItem = {};
  navigationItem.entity_id = currentEntity.entity_id;
  navigationItem.entity_name = currentEntity.entity_name;
  navigationItem.entity_type = currentEntity.entity_type;
  sessionStorage.setItem("navigationList", JSON.stringify([navigationItem]));
}
function addToCacheObj(currentEntity) {
  let cacheObj = {};
  cacheObj[`entity_${currentEntity.entity_id}_sub_entities`] =
    currentEntity.entity_folder_sub_folders;
  sessionStorage.setItem("currentEntities", JSON.stringify(cacheObj));
}
function onFileClick(file) {
  let entity_id = file.getAttribute("file-identifier");
  let currentEntity = filterEntities(rootEntities, entity_id);
  sessionStorage.setItem(
    "fileSource",
    JSON.stringify(currentEntity.entity_file_content)
  );
  addToNavigationList(currentEntity);
  window.location.href = `../HTMl/Preview-file.html?entity_id=${entity_id}`;
}
