let entry_id = getEntryIdFromUrl().entry_id;
let contentTypeFormFieldsKeysList = [];
fetchFileContentMetaData(entry_id).then((res) => {
  // Accessing the form
  var form = document.getElementById("meta-data-form");
  // Accessing form fields
  // console.log("res, ", res);
  form["name"].value = res.entry.name || "";
  form["title"].value = res.entry.properties["cm:title"] || "";
  form["description"].value = res.entry.properties["cm:description"] || "";
  form["author"].value = res.entry.properties["cm:author"] || "";
  createFormFields(res.entry.nodeType).then((keysList) => {
    contentTypeFormFieldsKeysList = keysList;
    // map the values of these props to its fields
    contentTypeFormFieldsKeysList.forEach((element) => {
      if (["d:date"].includes(element.dataType)) {
        form[element.id].value = res.entry.properties[element.id].split("T")[0];
      } else {
        if (form[element.id]) {
          form[element.id].value = res.entry.properties[element.id] || "";
        }
      }
    });
  });
});
function onSubmitClick() {
  let formId = "meta-data-form";
  var form = document.getElementById(formId);

  // return;
  let newProperties = { properties: {} };
  //   newProperties;

  newProperties.properties["cm:name"] = form["name"].value;
  newProperties.properties["cm:title"] = form["title"].value;
  newProperties.properties["cm:description"] = form["description"].value;
  newProperties.properties["cm:author"] = form["author"].value;
  contentTypeFormFieldsKeysList.forEach((element) => {
    // console.log("sssssssssss", );
    newProperties.properties[element.id] = form[element.id]?.value;
  });
  //   newProperties["cm:mimeType"] = form["mimetype"].value;
  // console.log("Ssssssssssss", newProperties);
  // return;
  let validation = validateRequiredEmptyFields(newProperties, formId);
  if (validation.return) {
    alert(validation.msg);
    return;
  }
  updateFileContentMetaData(entry_id, newProperties).then((res) => {
    if (res.entry) {
      goToPage("Preview-file.html");
    }
  });
}
function validateRequiredEmptyFields(newProperties, formId) {
  if (!newProperties.properties["cm:name"].trim()) {
    setInvalidClassToRequiredEmptyFields(formId);
    return { msg: "Please Enter Required Fields", return: true };
  }
  return { return: false };
}
function setInvalidClassToRequiredEmptyFields(formId) {
  let form = document.querySelectorAll(`#${formId} input`);
  //   let elementsArray = Array.from(form);
  for (let i = 0; i < form.length; i++) {
    // console.log(formId, form[i]);
    if (form[i].hasAttribute("required")) {
      form[i].classList.add("is-invalid");
    }
  }
}
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
function onCancelClick() {
  goToPage("Preview-file.html");
}
function goToPage(page) {
  let entry_id = getEntryIdFromUrl().entry_id;
  window.location.href = `../HTMl/${page}?entry_id=${entry_id}`;
}

// function clickMe() {
//   // Get the select element
//   const selectElement = document.getElementById("tags");
//   //   console.log(selectElement.selectedOptions);
//   // Get the selected options
//   const selectedOptions = Array.from(selectElement.selectedOptions);

//   // Map selected values
//   const selectedValues = selectedOptions.map((option) => option.value);

//   // Log selected values
//   console.log("Selected Values:", selectedValues);
// }

// function setMultipleSelectValues(elementId, valuesToSelect) {
//   // Get a reference to the select element
//   var selectElement = document.getElementById("tags");

//   // Set the values you want to be selected
//   var selectedValues = ["2", "4"];

//   // Loop through each option in the select element
//   for (var i = 0; i < selectElement.options.length; i++) {
//     var option = selectElement.options[i];

//     // Check if the option's value is in the selectedValues array
//     if (selectedValues.indexOf(option.value) !== -1) {
//       // If it is, set the option to be selected
//       option.selected = true;
//     }
//   }
// }
