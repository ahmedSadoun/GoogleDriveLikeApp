function navigationDrawer(navigationEntities) {
  let navigationEntitiesBodyString = `<p>
    <a
    href="./Home-Page.html"
    class="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
    >Home</a
    >
    </p>`;
  document.getElementById("navigation-bar").innerHTML =
    navigationEntitiesBodyString;
  return;

  if (!navigationEntities || navigationEntities.length <= 0) {
    document.getElementById("navigation-bar").innerHTML =
      navigationEntitiesBodyString;
    return;
  }

  for (let index = 0; index < navigationEntities.length; index++) {
    let element = navigationEntities[index];
    if (element.name === "Company Home") {
      continue; // skip the after code to the next cycle.
    }

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
    if (element.isFolder) {
      navigationEntitiesBodyString =
        navigationEntitiesBodyString +
        `
        <p>
          <a
            href="./Entity-Page.html?entry_id=${element.id}"
            class="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
            >${element.name}</a
          >
        </p>`;
    } else {
      navigationEntitiesBodyString =
        navigationEntitiesBodyString +
        `
        <p>
          <a
            href="./Preview-file.html?entry_id=${element.id}"
            class="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
            >${element.name}</a
          >
        </p>`;
    }
  }
  // The navigation bar id is the same cross all the pages
  document.getElementById("navigation-bar").innerHTML =
    navigationEntitiesBodyString;
}
