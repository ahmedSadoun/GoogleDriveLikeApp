function onFolderClick(folder) {
  let entry_id = folder.getAttribute("entry-identifier");
  //   window.location.href = `./Entity-Page.html?entry_id=${entry_id}`;
  let searchValue = getUrlPrams().searchValue || "";
  let paramObj = {
    entry_id: entry_id,
  };
  if (searchValue) {
    paramObj.searchValue = searchValue;
  }
  goToPage("Entity-Page.html", paramObj);
}

function onFileClick(file) {
  let entry_id = file.getAttribute("entry-identifier");
  // let searchValue = document.getElementById("searchInput").value;
  let searchValue = getUrlPrams().searchValue || "";
  let paramObj = {
    entry_id: entry_id,
  };
  if (searchValue) {
    paramObj.searchValue = searchValue;
  }

  goToPage("Preview-file.html", paramObj);
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
    form["search-checkbox-id"].checked = advancedSearch["search-checkbox-id"];
    form["Search"].value = advancedSearch.Search;

    if (form["content-type"].value) {
      getPropsAndBuildOptions(form["content-type"].value).then(() => {
        form["properties"].value = advancedSearch.properties;
        // Invoke this function to build the search form based on the prop type.

        buildDynamicSearchForm(form["properties"].value);
        // set the value of the search after its filed has been created

        form["Search"].value = advancedSearch.Search;
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
      return `EXACT(${searchObj.properties}:'${searchObj.Search}')`;
    }
    return `EXACT('${searchObj.Search}')`;
  }
  if (searchObj.properties) {
    return `${searchObj.properties}:'${searchObj.Search}'`;
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
    sessionStorage.setItem("Props", JSON.stringify(props));
    buildSelectOptions(props.entry, "properties", createPropsOptions);
  } else {
    buildSelectOptions([], "properties", createPropsOptions);
  }
}
function getPropMetaData(id) {
  let props = JSON.parse(sessionStorage.getItem("Props"));
  let element;
  for (let i = 0; i < props.entry.properties.length; i++) {
    let element = props.entry.properties[i];
    if (element.id === id) {
      return element;
    }
  }
  if (element) {
    return element;
  }
  return null;
}
function onPropertyChange(event) {
  console.log("event", event);
  let value = event.value;

  buildDynamicSearchForm(value);
}
function buildDynamicSearchForm(value) {
  let propMetaData = getPropMetaData(value);
  let element = ` <label for="Search">Search</label>
  <input
    type="text"
    class="form-control"
    placeholder="Search.."
    id="Search"
    name="Search"
  />`;
  if (propMetaData) {
    let isMultiValued = advancedSearchIsMultiValuedf(propMetaData);
    let elementKey = isMultiValued
      ? propMetaData.dataType + "-list"
      : propMetaData.dataType;
    let resultElement = advancedSearchElementsFactory(propMetaData, elementKey);
    if (resultElement) {
      element = resultElement;
    }
  }

  document.getElementById("dynamic-search-form").innerHTML = element;
}
function advancedSearchElementsFactory(elementProperty, elementKey) {
  let elements = {
    "d:text": ` 
    <label for="Search">${elementProperty.title}</label>
    <input
      type="text"
      class="form-control"
      id="Search"
      name=${elementProperty.id}
            />
        `,

    "d:text-list": ` 
    <label for="Search">${elementProperty.title}</label>
    <select name="Search" class="form-control form-select" id=${
      elementProperty.id
    }>
     ${
       advancedSearchIsMultiValuedf(elementProperty) &&
       buildAdvancedSearchOptions(elementProperty)
     }
    </select>
   `,
    "d:date": ` 
  <label for="Search">${elementProperty.title}</label>
  <input name="Search" type="date" class="form-control" id=${elementProperty.id} />
  `,
    "d:mltext": `
   
          <label for="Search">${elementProperty.title}</label>
          <textarea id="Search" name=${elementProperty.id} class="form-control"></textarea>
        
    `,
    "d:int": ``,
    "d:long": ``,
    "d:float": ``,
    "d:double": ``,
    "d:datetime": ``,
    "d:boolean": ``,
  };
  return elements[elementKey];
}
function advancedSearchIsMultiValuedf(property) {
  if (property.isMultiValued) {
    return true;
  } else if (property.constraints && property.constraints[0]?.type === "LIST") {
    return true;
  }
  return false;
}
function buildAdvancedSearchOptions(list) {
  //   console.log("list", list.constraints[0].parameters.allowedValues);
  list = list.constraints[0].parameters.allowedValues || [];
  //   return;
  let optionsList = "";
  list.forEach((element) => {
    optionsList = optionsList + `<option value=${element}>${element}</option>`;
  });
  return optionsList;
}
function onResetClick(event) {
  // console.log("Reset");
  document.getElementById("advanced-search-form").reset();
}
// Advanced Search Functions Ends
function deleteSelectionButtonClick() {
  deleteSelections().then((res) => {
    if (res && res.length > 0) {
      rerenderAfterNodeDeletion(res);
    }
  });
}

function onCloseUploadFileModalClick() {
  $("#fileInput").val("");
}
function getUrlPrams() {
  let urlString = window.location.href;
  let paramString = urlString.split("?")[1];
  let queryString = new URLSearchParams(paramString);
  let params = {};
  for (let pair of queryString.entries()) {
    params[pair[0]] = pair[1];
  }
  return params;
}

// Create Folder Begins
function onApproveCreateFolderClick() {
  let entry_id = getUrlPrams().entry_id;
  entry_id = removeHashFromString(entry_id);
  let folderName = document
    .getElementById("folder-name-inpur-field")
    .value.trim();
  createNewFolder(entry_id, folderName).then((res) => {
    if (res.entry) {
      document.getElementById("folder-name-inpur-field").value = "";
      rerenderAfterNodeCreation(res);
    }
  });
  // onCloseDialogClick();
}
function onCloseCreateFolderClick() {
  document.getElementById("folder-name-inpur-field").value = "";
}
// Create Folder Ends
