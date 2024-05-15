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
  goToPage("Search-Page.html");
}
