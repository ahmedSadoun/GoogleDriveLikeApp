let columnNumber = 4;
let dataUrl = " http://localhost:3000";
let rootEntities = [];
// async function fetchEntities() {
//   let res = await fetch(dataUrl);
//   res = await res.json();
//   return res;
// }
async function fetchRootEntities() {
  let res = await $.ajax({
    url: dataUrl + "/alFresco/root",
    type: "GET",
    dataType: "json",
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", "Basic " + btoa("admin:admin"));
    },
  });
  return res.list.entries;
}

(async function () {
  rootEntities = await fetchRootEntities();

  buildEntitiesGrid(rootEntities, "entitiesContainer");
})();

function onFolderClick(folder) {
  let entity_id = folder.getAttribute("entry-identifier");
  // let currentEntity = filterEntities(rootEntities, entity_id);

  // addToCacheObj(currentEntity);
  window.location.href = `./Entity-Page.html?entity_id=${entity_id}`;
}

function addToCacheObj(currentEntity) {
  let cacheObj = {};
  cacheObj[`entity_${currentEntity.entity_id}_sub_entities`] =
    currentEntity.entity_folder_sub_folders;
  sessionStorage.setItem("currentEntities", JSON.stringify(cacheObj));
}

function onFileClick(file) {
  let entity_id = file.getAttribute("entry-identifier");
  let currentEntity = filterEntities(rootEntities, entity_id);
  sessionStorage.setItem(
    "fileSource",
    JSON.stringify(currentEntity.entity_file_content)
  );

  window.location.href = `../HTMl/Preview-file.html?entity_id=${entity_id}`;
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
