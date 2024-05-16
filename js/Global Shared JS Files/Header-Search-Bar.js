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
         id="searchInput"
          style="width: 80%"
          type="search"
          class="form-control"
          placeholder="Search..."
          aria-label="Search"
        />
        <button type="button" class="btn btn-dark mx-1" onClick="onSearchButtonClick()" style="width: 20%">
          Search
        </button>
        <button type="button" class="btn btn-secondary mx-1" onClick="onAdvancedSearchButtonClick()" style="width: 20%">
          Advanced Search
        </button>
      </div>
    </div>
  </div>

    <!-- HEADER END -->

    <!-- Advanced Search Begins -->
    <div
      class="modal fade"
      id="advanced-search-id"
      aria-hidden="true"
      aria-labelledby="upload-file-modalLabel"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="upload-file-modalLabel">
              Advanced Search
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="container">
              <form id="advanced-search-form">
                <div class="form-group">
                  <label for="content-type">Content Type</label>
                  <select
                    onchange="onContentTypeSelectChange(this)"
                    class="form-control form-select"
                    id="content-type"
                    name="content-type"
                  ></select>
                </div>

                <div class="form-group mt-1">
                  <label for="properties">Properties</label>
                  <select
                    class="form-control form-select"
                    id="properties"
                    name="properties"
                  ></select>
                </div>
                <div class="form-group">
                  <label for="Search">Search</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search.."
                    id="Search"
                    name="Search"
                  />
                </div>
                <div class="form-check mt-1">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="search-checkbox-id"
                    name="search-checkbox-id"
                  />
                  <label class="form-check-label" for="search-checkbox-id"
                    >Exact Match</label
                  >
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              data-bs-target="#upload-file-modal"
              onclick="onCloseAdvancedSearchClick()"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              onclick="onAdvancedSearchSubmitClick()"
              class="btn btn-primary"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
    <!--Advanced Search Ends -->
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
