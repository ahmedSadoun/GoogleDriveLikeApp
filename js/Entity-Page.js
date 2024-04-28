let columnNumber = 4;
let currentEntities;
let dataUrl = " http://localhost:3000";
async function fetchEntities(entity_id) {
  let res = await fetch(`${dataUrl}/${entity_id}`);
  res = await res.json();
  return res;
}
async function fetchSubEntitiesById(entry_id) {
  let res = await $.ajax({
    url: dataUrl + "/alFresco/subEntries/" + entry_id,
    type: "GET",
    dataType: "json",
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", "Basic " + btoa("admin:admin"));
    },
  });
  return res.list.entries;
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
  currentEntities = await fetchSubEntitiesById(entity_id);
  buildEntitiesGrid(currentEntities, "entitiesContainer");
  // navigationDrawer(currentEntities.entity_path);
}

function onFolderClick(folder) {
  let entity_id = folder.getAttribute("entry-identifier");

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
  let entity_id = file.getAttribute("entry-identifier");

  // let currentEntity = filterEntities(currentEntities.sub_entities, entity_id);
  // sessionStorage.setItem(
  //   "fileSource",
  //   JSON.stringify(currentEntity.entity_file_content)
  // );

  window.location.href = `../HTMl/Preview-file.html?entity_id=${entity_id}`;
}

onPageLoadDrawEntities();
