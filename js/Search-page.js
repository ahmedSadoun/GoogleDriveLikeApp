// Instantly called function
// used in order to be able to use async and await
let searchEntries = [];
window.addEventListener("load", async function () {
  callHeaderDrawer();

  let searchValue = getUrlPrams().searchValue;
  // setSearchField(searchValue);
  if (searchValue.trim()) {
    searchEntries = (await searchNodes(searchValue)) || [];
    setSearchResultCount(searchEntries.length);

    if (searchEntries.length <= 0) {
      ifNoNodesExisted();
    } else {
      buildEntitiesGrid(searchEntries, "entitiesContainer");
    }
  }
  // console.log(searchEntries);
});
// set search field to its value from url.
function setSearchResultCount(resultCount) {
  let element = document.getElementById("results-meta-data-id");
  element.innerHTML = `<span> ${resultCount}-results found</span>`;
}
function ifNoNodesExisted() {
  let container = document.getElementById("entitiesContainer");
  container.innerHTML = `<h1>No entries found!</h1>`;
}
// (();

// On delete functions
function removeSelectedEntries(selectionsIdsList) {
  // Iterate through the searchEntries list
  for (let i = 0; i < searchEntries.length; i++) {
    // Get the id of the current item
    let itemId = searchEntries[i].entry.id;

    // Check if the id exists in the selectionsIdsList
    let existsInSelections = selectionsIdsList.some((id) => id === itemId);

    // If the id exists in the selectionsIdsList, remove the item from searchEntries
    if (existsInSelections) {
      searchEntries.splice(i, 1); // Remove the item from searchEntries
      i--; // Adjust the loop counter since we removed an item
    }
  }

  // Return the modified searchEntries list
  return searchEntries;
}
function rerenderAfterNodeDeletion(selectionIds) {
  let afterDeletionsearchEntries = removeSelectedEntries(selectionIds);
  // console.log("aaaaaaaaaaaaa", afterDeletionsearchEntries);
  buildEntitiesGrid(afterDeletionsearchEntries, "entitiesContainer");
}

function checkIfFileExists(fileName) {
  let result = searchEntries.some((element) => {
    return element.entry.name.toLowerCase() === fileName.toLowerCase();
  });
  return result;
}

// function deleteSelectionButtonClick() {
//   deleteSelections().then((res) => {
//     if (res && res.length > 0) {
//       rerenderAfterNodeDeletion(res);
//     }
//   });
// }
// function callHeaderDrawer() {
//   let header = headerDrawer();
//   document.getElementById("header").innerHTML = header;
// }
