let usersList = [];
window.addEventListener("load", async function () {
  callHeaderDrawer();
  let users = await fetchUsers();
  if (users) {
    usersList = users.list.entries;
    createTableRows(usersList);
  }
  //   console.log("users", users.list.entries);
});

function onEditClick(id) {
  console.log("the id is ", id);
}
function onDeleteClick(id) {
  console.log("the id is ", id);
}

function createTableRows(users) {
  const tableBody = document.getElementById("userTableBody");

  users.forEach((user, index) => {
    const row = document.createElement("tr");
    // Special condition, due not to delete it by mistake
    if (user.entry.email !== "admin@alfresco.com") {
      row.innerHTML = `
                <th scope="row">${index + 1}</th>
                <td>${user.entry.firstName || ""}</td>
                <td>${user.entry.lastName || ""}</td>
                <td>${user.entry.email || ""}</td>
                <td>
                    <button onclick="onEditClick('${
                      user.entry.id
                    }')" class="btn btn-primary btn-sm edit-btn">Edit</button>
                    <button onclick="onDeleteClick('${
                      user.entry.id
                    }')" class="btn btn-danger btn-sm delete-btn">Delete</button>
                </td>
            `;

      tableBody.appendChild(row);
    }
  });
}

function onCreateNewUserClick() {
  $("#create-new-user-modal-Label").modal("show");
}

function onCloseCreateUserDialogClick() {}
async function onCreateUserDialogSubmitClick() {
  let isFormValid = checkRequiredFieldsFilled("user-details-form");
  if (!isFormValid) {
    alert("Please fill required fields");
    return;
  }
  let userDetails = getUserDetails();
  let res = await createUser(userDetails.entry);
  if (res.entry) {
    usersList.push(userDetails);
    createTableRows(usersList);

    alert("User added Successfully.");
    $("#create-new-user-modal-Label").modal("hide");
  } else {
    alert(res.error.errorKey);
  }
  //   console.log(res);
}

function fillUserDetailsForm(userDetails) {
  let form = document.getElementById("user-details-form");
  form["firstName"].value = userDetails.entry["firstName"];
  form["lastName"].value = userDetails.entry["lastName"];
  form["id"].value = userDetails.entry["id"];
  form["email"].value = userDetails.entry["email"];
  form["password"].value = userDetails.entry["password"];
}
function getUserDetails() {
  let form = document.getElementById("user-details-form");
  let userDetails = { entry: {} };
  userDetails.entry["firstName"] = form["firstName"].value;
  userDetails.entry["lastName"] = form["lastName"].value;
  userDetails.entry["id"] = form["id"].value; // alfresco doesn't auto generate the id, it uses the username as the id
  userDetails.entry["email"] = form["email"].value;
  userDetails.entry["password"] = form["password"].value;
  return userDetails;
}

function checkRequiredFieldsFilled(formId) {
  var form = document.getElementById(formId);

  if (!form) {
    console.error(`Form with ID '${formId}' not found.`);
    return false;
  }
  //   console.log(form);
  var elements = Array.from(form.elements);
  var allFilled = true;

  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    if (element.hasAttribute("required") && !element.value) {
      allFilled = false;

      element.classList.add("required-field-not-filled");
    } else {
      //   console.log(element);

      element.classList.remove("required-field-not-filled");
    }
  }

  return allFilled;
}
