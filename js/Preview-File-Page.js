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
  console.log("ssssssss", navigationEntities);
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

async function previewFile() {
  let entity_id = getEntityIdFromUrl().entity_id;
  let fileSource = await fetchEntities(entity_id);
  navigationDrawer(fileSource.entity_path);
  document.getElementById(
    "previewFile"
  ).innerHTML = ` <embed id="filePreviewer" src=${fileSource.entity_file_content}  width="800px" height="1000px" />`;
}
previewFile();
