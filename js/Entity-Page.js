let columnNumber = 4;
let currentEntities = JSON.parse(sessionStorage.getItem("currentEntities"));
// let dataUrl = "https://8d8602d1a6964b7fb25cd5e79656ea1a.api.mockbin.io/";

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
      `<div class="row d-flex p-2" style="min-width: 500px">`;
    let columns = buildColumns(entities, entityIndex);
    entityIndex = columns.entityIndex + 1;
    entitiesBodyString = entitiesBodyString + columns.entitiesColumnString;
    entitiesBodyString = entitiesBodyString + `</div>`;
  }

  document.getElementById("entitiesContainer").innerHTML = entitiesBodyString;
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

async function onPageLoadDrawEntities() {
  let entity_id = getEntityIdFromUrl().entity_id;
  buildEntitiesGrid(currentEntities[`entity_${entity_id}_sub_entities`]);
}

function addToNavigationList(currentEntity) {
  let navigationList = JSON.parse(sessionStorage.getItem("navigationList"));
  let navigationItem = {};
  navigationItem.entity_id = currentEntity.entity_id;
  navigationItem.entity_name = currentEntity.entity_name;
  navigationItem.entity_type = currentEntity.entity_type;
  navigationList.push(navigationItem);
  sessionStorage.setItem("navigationList", JSON.stringify(navigationList));
}
function addToCacheObj(currentEntity) {
  let cacheObj = currentEntities;
  cacheObj[`entity_${currentEntity.entity_id}_sub_entities`] =
    currentEntity.entity_folder_sub_folders;
  sessionStorage.setItem("currentEntities", JSON.stringify(cacheObj));
}

function onFolderClick(folder) {
  let entity_id = folder.getAttribute("folder-identifier");
  let parent_entity_id = getEntityIdFromUrl().entity_id;

  let filteredEntity = filterEntities(
    currentEntities[`entity_${parent_entity_id}_sub_entities`],
    entity_id
  );
  addToNavigationList(filteredEntity);
  addToCacheObj(filteredEntity);

  window.location.href = `./Entity-Page.html?entity_id=${entity_id}`;

  // buildEntitiesGrid(currentEntities);
}

function navigationDrawer() {
  let navigationEntities = JSON.parse(sessionStorage.getItem("navigationList"));

  let navigationEntitiesBodyString = `<p>
  <a
    href="./Home-Page.html"
    class="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
    >Home</a
  >
</p>`;

  for (let index = 0; index < navigationEntities.length; index++) {
    let element = navigationEntities[index];
    console.log(element);
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
function editNavigationList() {
  let parent_entity_id = getEntityIdFromUrl().entity_id;
  let navigationEntities = JSON.parse(sessionStorage.getItem("navigationList"));
  for (var i = 0; i < navigationEntities.length; i++) {
    if (navigationEntities[i].entity_id == parent_entity_id) {
      navigationEntities.splice(i + 1, navigationEntities.length - 1); // At the current index, remove one element
    }
  }
  sessionStorage.setItem("navigationList", JSON.stringify(navigationEntities));
  navigationDrawer();
}
function onFileClick(file) {
  let entity_id = file.getAttribute("file-identifier");
  let parent_entity_id = getEntityIdFromUrl().entity_id;

  let currentEntity = filterEntities(
    currentEntities[`entity_${parent_entity_id}_sub_entities`],
    entity_id
  );
  sessionStorage.setItem(
    "fileSource",
    JSON.stringify(currentEntity.entity_file_content)
  );
  addToNavigationList(currentEntity);

  window.location.href = `../HTMl/Preview-file.html?entity_id=${entity_id}`;
}

onPageLoadDrawEntities();
editNavigationList();
