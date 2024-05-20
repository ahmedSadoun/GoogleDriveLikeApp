// Instantly called function
// used in order to be able to use async and await
let homeRootEntities = [];

window.addEventListener("load", async function () {
  homeRootEntities = await fetchAlfrescoEntries("/alFresco/root");
  callHeaderDrawer();
  buildEntitiesGrid(homeRootEntities, "entitiesContainer");
});

function rerenderAfterNodeCreation(res) {
  homeRootEntities.push(res);
  // console.log(res);

  buildEntitiesGrid(homeRootEntities, "entitiesContainer");
}
// On delete functions
function removeSelectedEntries(selectionsIdsList) {
  // Iterate through the homeRootEntities list
  for (let i = 0; i < homeRootEntities.length; i++) {
    // Get the id of the current item
    let itemId = homeRootEntities[i].entry.id;

    // Check if the id exists in the selectionsIdsList
    let existsInSelections = selectionsIdsList.some((id) => id === itemId);

    // If the id exists in the selectionsIdsList, remove the item from homeRootEntities
    if (existsInSelections) {
      homeRootEntities.splice(i, 1); // Remove the item from homeRootEntities
      i--; // Adjust the loop counter since we removed an item
    }
  }

  // Return the modified homeRootEntities list
  return homeRootEntities;
}
function rerenderAfterNodeDeletion(selectionIds) {
  let afterDeletionHomeRootEntities = removeSelectedEntries(selectionIds);
  // console.log("aaaaaaaaaaaaa", afterDeletionHomeRootEntities);
  buildEntitiesGrid(afterDeletionHomeRootEntities, "entitiesContainer");
}
function onUploadButtonClick() {
  // onCloseDialogClick();
  $("#upload-file-modal").modal("show");
}
function onUploadFileSubmitClick() {
  startUploadingFile();
}
function startUploadingFile() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];
  if (!file) {
    alert("Please select a file.");
    return;
  }
  // console.log("file is ", file.name);
  let isFileExists = checkIfFileExists(homeRootEntities, file.name);
  // console.log("isFileExists", isFileExists);
  if (isFileExists) {
    alert("The file you'r trying to upload is already existed");
    return;
  }
  UploadFile("-root-", file).then((res) => {
    // console.log(res);
    // document.getElementById("folder-name-inpur-field").value = "";

    if (res.entry) {
      $("#fileInput").val("");
      rerenderAfterNodeCreation(res);
    }
  });
}
function checkIfFileExists(entriesList, fileName) {
  let result = entriesList.some((element) => {
    return element.entry.name.toLowerCase() === fileName.toLowerCase();
  });
  return result;
}

function onCloseUploadFileModalClick() {
  $("#fileInput").val("");
}

// function callHeaderDrawer() {
//   let header = headerDrawer();
//   document.getElementById("header").innerHTML = header;
// }
// function translateButton() {
//   if (localStorage.getItem("locale") === "En") {
//     localStorage.setItem("locale", "Ar");
//     window.location.href = `../HTMl/Home-page.html`;
//   } else {
//     localStorage.setItem("locale", "En");
//   }
// }

// function enTranslationSource(key) {
//   if (!key) {
//     return;
//   }
//   let enTranslationObj = {
//     search_placeHolder: "Search...",
//     search_button: "Search",
//   };
//   return enTranslationObj[key];
// }
// function arTranslationSource(key) {
//   if (!key) {
//     return;
//   }
//   let arTranslationObj = {
//     search_placeHolder: "بحث...",
//     search_button: "بحث",
//   };
//   return arTranslationObj[key];
// }

// function translationPage() {
//   let locale = localStorage.getItem("locale");
//   let elementList = document.querySelectorAll("[translation_key]");
//   for (let index = 0; index < elementList.length; index++) {
//     const element = elementList[index];
//     if (locale === "Ar") {
//       let translation_key = element.getAttribute("translation_key");
//       let arTranslation = arTranslationSource(translation_key);
//     }
//   }
// }
