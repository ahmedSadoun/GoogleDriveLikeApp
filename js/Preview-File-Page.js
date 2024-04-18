function previewFile() {
  let fileSource = JSON.parse(sessionStorage.getItem("fileSource"));
  document.getElementById(
    "previewFile"
  ).innerHTML = ` <embed id="filePreviewer" src=${fileSource}  width="800px" height="1000px" />`;
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
editNavigationList();
previewFile();
