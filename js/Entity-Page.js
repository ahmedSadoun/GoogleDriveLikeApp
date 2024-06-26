let currentEntities = [];
window.addEventListener("load", async function () {
  let entry_id = getUrlPrams().entry_id;
  entry_id = removeHashFromString(entry_id);
  callHeaderDrawer();
  let x = await Promise.all(
    [
      async () => {
        currentEntities = await fetchAlfrescoEntries(
          "/alFresco/subEntries/" + entry_id
        );
        // console.log(currentEntities);

        buildEntitiesGrid(currentEntities, "entitiesContainer");
      },
      async () => {
        let navigationList = await fetchEntryNavigation(entry_id);
        navigationDrawer(navigationList);
      },
    ].map((sequence) => sequence())
  );
});

function removeHashFromString(inputString) {
  // Use replace method with a regular expression to remove '#' characters
  return inputString.replace(/#/g, "");
}

function rerenderAfterNodeCreation(res) {
  currentEntities.push(res);
  // console.log(res);

  buildEntitiesGrid(currentEntities, "entitiesContainer");
}

function checkIfFileExists(fileName) {
  let result = currentEntities.some((element) => {
    return element.entry.name.toLowerCase() === fileName.toLowerCase();
  });
  return result;
}

function removeSelectedEntries(selectionsIdsList) {
  // Iterate through the currentEntities list
  for (let i = 0; i < currentEntities.length; i++) {
    // Get the id of the current item
    let itemId = currentEntities[i].entry.id;

    // Check if the id exists in the selectionsIdsList
    let existsInSelections = selectionsIdsList.some((id) => id === itemId);

    // If the id exists in the selectionsIdsList, remove the item from currentEntities
    if (existsInSelections) {
      currentEntities.splice(i, 1); // Remove the item from currentEntities
      i--; // Adjust the loop counter since we removed an item
    }
  }

  // Return the modified currentEntities list
  return currentEntities;
}
function rerenderAfterNodeDeletion(selectionIds) {
  let afterDeletionCurrentEntities = removeSelectedEntries(selectionIds);
  // console.log("aaaaaaaaaaaaa", afterDeletionCurrentEntities);
  buildEntitiesGrid(afterDeletionCurrentEntities, "entitiesContainer");
}

// function deleteSelectionButtonClick() {
//   // selects and delete all of the checked entries.
//   deleteSelections().then((res) => {
//     rerenderAfterNodeDeletion(res);
//   });
// }

function onCloseCreateFolderClick() {
  document.getElementById("folder-name-inpur-field").value = "";
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
  let entry_id = getUrlPrams().entry_id;
  entry_id = removeHashFromString(entry_id);
  const file = fileInput.files[0];

  if (!file) {
    alert("Please select a file.");
    return;
  }

  // console.log("file is ", file.name);
  let isFileExists = checkIfFileExists(file.name);
  // console.log("isFileExists", isFileExists);
  if (isFileExists) {
    alert("The file you'r trying to upload is already existed");
    return;
  }
  UploadFile(entry_id, file).then((res) => {
    // console.log(res);
    // document.getElementById("folder-name-inpur-field").value = "";

    if (res.entry) {
      $("#fileInput").val("");
      rerenderAfterNodeCreation(res);
    }
  });
}
function callHeaderDrawer() {
  let header = headerDrawer();
  document.getElementById("header").innerHTML = header;
}
