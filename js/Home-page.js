// Instantly called function
// used in order to be able to use async and await
let homeRootEntities = [];
(async function () {
  homeRootEntities = await fetchAlfrescoEntries("/alFresco/root");
  console.log(homeRootEntities);
  buildEntitiesGrid(homeRootEntities, "entitiesContainer");
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
  let folderName = document
    .getElementById("folder-name-inpur-field")
    .value.trim();
  createNewFolder("-root-", folderName).then((res) => {
    homeRootEntities.push(res);
    // console.log(res);
    document.getElementById("folder-name-inpur-field").value = "";

    buildEntitiesGrid(homeRootEntities, "entitiesContainer");
    // document.getElementById("entitiesContainer").;
  });
  // onCloseDialogClick();
}
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
