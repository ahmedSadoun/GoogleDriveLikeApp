window.addEventListener("load", async function () {
  let entry_id = getUrlPrams().entry_id;
  callHeaderDrawer();
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
});

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

async function previewFile(fileMetaData) {
  let entry_id = getUrlPrams().entry_id;
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

function download(blobURL, metadata) {
  const fileLink = document.createElement("a");
  fileLink.href = blobURL;
  fileLink.download = metadata.name; // Customize the filename
  fileLink.textContent = "Download File";
  // Append the link to the DOM
  document.getElementById("actions-list").appendChild(fileLink);
}

function onPropertiesClick() {
  let entry_id = getUrlPrams().entry_id;
  // console.log("SDfsadfadfasdf ", entry_id);
  window.location.href = `../HTMl/Meta-Data-Form.html?entry_id=${entry_id}`;
}

function onChangeContentTypeClick() {
  $("#exampleModalToggle").modal("show");
  fetchTypes().then((res) => {
    // console.log("SDfsafsa", $("#exampleModalToggle"));
    $("#exampleModalToggle").modal("show");
    buildSelectOptions(res, "content-type-select-id", createOptions);
  });
  // $("#xmodal").show();
}

// modal or dialog submit button

function onSubmitContentTypeClick() {
  // console.log("Submit Button");
  let entry_id = getUrlPrams().entry_id;
  let contentType = document.getElementById("content-type-select-id").value;
  let body = {
    nodeType: contentType,
  };
  updateFileContentMetaData(entry_id, body).then((res) => {
    if (res.statusCode && res.statusCode == 400) {
      alert("Error Happened.");
      return;
    }
    alert("Content Type Updated Successfully.");
  });
  $("#exampleModalToggle").hide();
}
// modal or dialog close button
function onCloseContentTypeClick() {
  console.log("Close Button");

  $("#exampleModalToggle").hide();
}

function callHeaderDrawer() {
  let header = headerDrawer();
  document.getElementById("header").innerHTML = header;
}
