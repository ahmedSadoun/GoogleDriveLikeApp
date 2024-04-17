let columnNumber = 4;
let dataUrl = "https://8d8602d1a6964b7fb25cd5e79656ea1a.api.mockbin.io/";
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
  let currentEntities = filterEntities(rootEntities, entity_id);
  let cacheObj = {};
  cacheObj[`entity_${entity_id}_sub_entities`] =
    currentEntities.entity_folder_sub_folders;

  sessionStorage.setItem("currentEntities", JSON.stringify(cacheObj));

  window.location.href = `./Entity-Page.html?entity_id=${entity_id}`;
}
