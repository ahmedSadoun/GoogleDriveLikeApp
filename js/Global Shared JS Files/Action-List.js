function buildActionList() {}

async function UploadFile(entry_id, file) {
  try {
    const formData = new FormData();
    formData.append("filedata", file);
    // console.log(formData);
    // return;
    let res = await createUploadFile(entry_id, formData);
    console.log(res);
    return res;
  } catch (error) {
    console.error("Error uploading file:", error);
    alert("Error uploading file. Please try again.");
  }
  // onCloseDialogClick();
}
async function deleteSelections() {
  try {
    let promisesList = [];
    let entryIdsList = [];
    let selections = getAllCheckedCheckboxes();
    if (selections && selections.length <= 0) {
      alert("Select which files to delete.");
      return [];
    }
    selections.forEach((element) => {
      let entry_id = element.getAttribute("entry-identifier");
      entryIdsList.push(entry_id);
      promisesList.push(deleteNode.bind(null, entry_id));
    });
    const runInParallelResult = await Promise.all(
      promisesList.map((sequence) => sequence())
    );
    // if done return selections ids to delete it from the grid
    alert("File deleted successfully.");
    return entryIdsList;
  } catch (error) {
    console.error("Error deleting file:", error);
    alert("Error uploading file. Please try again.");
  }
  // onCloseDialogClick();
}

function getAllCheckedCheckboxes() {
  // Select all checkboxes
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');

  // Array to store checked checkboxes
  var checkedCheckboxes = [];

  // Loop through each checkbox
  checkboxes.forEach(function (checkbox) {
    // Check if the checkbox is checked
    if (checkbox.checked) {
      // If checked, push it to the checkedCheckboxes array
      checkedCheckboxes.push(checkbox);
    }
  });

  // Return the array of checked checkboxes
  return checkedCheckboxes;
}
