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

async function previewFile(fileMetaData) {
  let entry_id = getEntryIdFromUrl().entry_id;
  let response = await fetchFileContent(entry_id);
  const blob = await response.blob();
  let fileViewer = {};
  fileViewer.src = URL.createObjectURL(blob);
  fileViewer.type = response.headers.get("Content-Type");
  // console.log(fileViewer.src);
  document.getElementById(
    "previewFile"
  ).innerHTML = ` <embed id="filePreviewer" src="${fileViewer.src}#toolbar=0"   type="${fileViewer.type}" width="800" height="800" />`;
  download(fileViewer.src, fileMetaData);
}

(async function () {
  let entry_id = getEntryIdFromUrl().entry_id;
  let x = await Promise.all(
    [
      async () => {
        let fileMetaData = await fetchEntryMetaData(entry_id);

        previewFile(fileMetaData.entry);
        // download(fileUrl, fileMetaData.entry);
      },
      async () => {
        let navigationList = await fetchEntryNavigation(entry_id);
        navigationDrawer(navigationList);
      },
    ].map((sequence) => sequence())
  );
})();

function download(blobURL, metadata) {
  const fileLink = document.createElement("a");
  fileLink.href = blobURL;
  fileLink.download = metadata.name; // Customize the filename
  fileLink.textContent = "Download File";
  // Append the link to the DOM
  document.getElementById("actions-list").appendChild(fileLink);
}

function onPropertiesClick() {
  let entry_id = getEntryIdFromUrl().entry_id;
  // console.log("SDfsadfadfasdf ", entry_id);
  window.location.href = `../HTMl/Meta-Data-Form.html?entry_id=${entry_id}`;
}

function onChangeContentTypeClick() {
  console.log("SDfsafsa", $("#xmodal"));
  $("#xmodal").show();
}
// modal or dialog submit button

function onSubmitContentTypeClick() {
  $("#xmodal").hide();
}
// modal or dialog close button
function onCloseContentTypeClick() {
  $("#xmodal").hide();
}
