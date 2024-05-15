// Instantly called function
// used in order to be able to use async and await
let homeRootEntities = [];
window.addEventListener("load", async function () {
  homeRootEntities = await fetchAlfrescoEntries("/alFresco/root");
  // console.log(homeRootEntities);
  callHeaderDrawer();
  buildEntitiesGrid(homeRootEntities, "entitiesContainer");
});
// (();

function onApproveCreateFolderClick() {
  let folderName = document
    .getElementById("folder-name-inpur-field")
    .value.trim();
  createNewFolder("-root-", folderName).then((res) => {
    if (res.entry) {
      document.getElementById("folder-name-inpur-field").value = "";
      rerenderAfterNodeCreation(res);
    }
    // document.getElementById("entitiesContainer").;
  });
  // onCloseDialogClick();
}
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

function checkIfFileExists(fileName) {
  let result = homeRootEntities.some((element) => {
    return element.entry.name.toLowerCase() === fileName.toLowerCase();
  });
  return result;
}

function deleteSelectionButtonClick() {
  deleteSelections().then((res) => {
    rerenderAfterNodeDeletion(res);
  });
}

// function callHeaderDrawer() {
//   let header = headerDrawer();
//   document.getElementById("header").innerHTML = header;
// }
