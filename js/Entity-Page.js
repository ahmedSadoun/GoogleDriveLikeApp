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
let currentEntities = [];

(async function () {
  let entry_id = getEntryIdFromUrl().entry_id;
  entry_id = removeHashFromString(entry_id);
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
})();

function onFolderClick(folder) {
  let entry_id = folder.getAttribute("entry-identifier");

  window.location.href = `./Entity-Page.html?entry_id=${entry_id}`;
}

function onFileClick(file) {
  let entry_id = file.getAttribute("entry-identifier");
  window.location.href = `../HTMl/Preview-file.html?entry_id=${entry_id}`;
}

function onApproveCreateFolderClick() {
  let entry_id = getEntryIdFromUrl().entry_id;
  entry_id = removeHashFromString(entry_id);
  let folderName = document
    .getElementById("folder-name-inpur-field")
    .value.trim();
  createNewFolder(entry_id, folderName).then((res) => {
    currentEntities.push(res);
    console.log(res);
    document.getElementById("folder-name-inpur-field").value = "";

    buildEntitiesGrid(currentEntities, "entitiesContainer");
    // document.getElementById("entitiesContainer").;
  });
  // onCloseDialogClick();
}
// function onCloseDialogClick() {
//   let myModal = new bootstrap.Modal(document.getElementById("modal"));
//   myModal.hide();
//   // console.log("Ssssssssss");
// }

function removeHashFromString(inputString) {
  // Use replace method with a regular expression to remove '#' characters
  return inputString.replace(/#/g, "");
}
