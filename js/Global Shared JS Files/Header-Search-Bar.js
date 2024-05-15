function headerDrawer() {
  let header = `
    <!-- HEADER START -->
    <div bis_skin_checked="1" style="width:100%">
    <div
      class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"
      bis_skin_checked="1"
    >
      <div class="justify-content-center d-flex" style="width: 100%">
        <div class="d-inline-flex mx-5">
          <p>
            <a
              href="./Home-Page.html"
              class="link-secondary my-4 link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
              >Home</a
            >
          </p>
        </div>
        <input
          style="width: 80%"
          type="search"
          class="form-control"
          placeholder="Search..."
          aria-label="Search"
        />
        <button type="button" class="btn btn-dark mx-1" onClick="onSearchButtonClick()" style="width: 20%">
          Search
        </button>
      </div>
    </div>
  </div>

    <!-- HEADER END -->
    `;
  return header;
}

function callHeaderDrawer() {
  let header = headerDrawer();
  var headerElement = document.getElementById("header");
  if (headerElement) {
    // console.log("ss header");
    headerElement.innerHTML = header;
  } else {
    console.warn("Element with ID 'header' does not exist.");
  }
}

// callHeaderDrawer();
