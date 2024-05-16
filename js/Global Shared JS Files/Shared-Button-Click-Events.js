function onFolderClick(folder) {
  let entry_id = folder.getAttribute("entry-identifier");
  //   window.location.href = `./Entity-Page.html?entry_id=${entry_id}`;
  goToPage("Entity-Page.html", { entry_id: entry_id });
}

function onFileClick(file) {
  let entry_id = file.getAttribute("entry-identifier");
  goToPage("Preview-file.html", { entry_id: entry_id });
  //   window.location.href = `../HTMl/Preview-file.html?entry_id=${entry_id}`;
}

function onSearchButtonClick() {
  let searchValue = document.getElementById("searchInput").value;
  if (searchValue.trim()) {
    goToPage("Search-Page.html", { searchValue: searchValue });
  } else {
    alert("Enter what you want to look for.");
  }
}
// Advanced Search Functions Begins
async function onAdvancedSearchButtonClick() {
  $("#advanced-search-id").modal("show");
  let types = await fetchTypes();
  buildSelectOptions(types, "content-type", createOptions);
  fillAdvancedSearchForm();
}
function createOptions(payload) {
  const entries = payload.list.entries;
  const selectOptions = entries.map((entry) => {
    const id = entry.entry.id;
    const title = entry.entry.title;
    return `<option value="${id}">${title}</option>`;
  });
  selectOptions.unshift('<option value="">Select Type</option>');
  return selectOptions.join("");
}
function buildSelectOptions(optionsList, id, createOptionsCallBack) {
  let options = createOptionsCallBack(optionsList);
  const selectElement = document.getElementById(id);
  selectElement.innerHTML = options;
}
function createPropsOptions(payload) {
  const props = payload.properties;
  const typePrefix = payload.model.namespacePrefix;
  const selectOptions = props.map((prop) => {
    const id = prop.id;
    const title = prop.title;
    if (id.includes(typePrefix)) {
      return `<option value="${id}">${title}</option>`;
    }
  });
  selectOptions.unshift('<option value="">Select Property</option>');
  return selectOptions.join("");
}
function fillAdvancedSearchForm() {
  let form = document.getElementById("advanced-search-form");
  let advancedSearch = JSON.parse(sessionStorage.getItem("advancedSearchObj"));
  if (advancedSearch) {
    form["content-type"].value = advancedSearch["content-type"];
    form["Search"].value = advancedSearch.Search;
    form["search-checkbox-id"].checked = advancedSearch["search-checkbox-id"];
    if (form["content-type"].value) {
      getPropsAndBuildOptions(form["content-type"].value).then(() => {
        form["properties"].value = advancedSearch.properties;
      });
    }
  }
}
function onCloseAdvancedSearchClick() {
  $("#advanced-search-id").modal("hide");
}
function onAdvancedSearchSubmitClick() {
  let form = document.getElementById("advanced-search-form");
  let advancedSearchObj = {
    "content-type": form["content-type"].value,
    properties: form["properties"].value,
    Search: form["Search"].value,
    "search-checkbox-id": form["search-checkbox-id"].checked,
  };
  sessionStorage.setItem(
    "advancedSearchObj",
    JSON.stringify(advancedSearchObj)
  );
  if (advancedSearchObj.Search) {
    let searchValue = buildSearchValue(advancedSearchObj);
    goToPage("Search-Page.html", { searchValue: searchValue });
    $("#advanced-search-id").modal("hide");
  } else {
    alert("Enter what you want to look for.");
  }
}
function buildSearchValue(searchObj) {
  if (searchObj["search-checkbox-id"]) {
    // "=name:ahmed.saadoun"
    if (searchObj.properties) {
      return `=${searchObj.properties}:${searchObj.Search}`;
    }
    return `=${searchObj.Search}`;
  }
  if (searchObj.properties) {
    return `${searchObj.properties}:${searchObj.Search}`;
  }
  return `${searchObj.Search}`;
}
async function onContentTypeSelectChange(event) {
  const selectedValue = event.value;
  getPropsAndBuildOptions(selectedValue);
  // console.log("Selected value:", selectedValue, createPropsOptions);
}
async function getPropsAndBuildOptions(value) {
  if (value) {
    let props = await fetchTypeProperties(value);
    buildSelectOptions(props.entry, "properties", createPropsOptions);
  } else {
    buildSelectOptions([], "properties", createPropsOptions);
  }
}
// Advanced Search Functions Ends

function getEntryIdFromUrl() {
  let urlString = window.location.href;
  let paramString = urlString.split("?")[1];
  let queryString = new URLSearchParams(paramString);
  let params = {};
  for (let pair of queryString.entries()) {
    params[pair[0]] = pair[1];
  }
  return params;
}
