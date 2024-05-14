function elementsFactory(elementProperty, elementKey) {
  let elements = {
    "d:text": ` <div class="form-group">
    <label for=${elementProperty.id}>${elementProperty.title}</label>
    <input
      type="text"
      class="form-control"
      id=${elementProperty.id}
      name=${elementProperty.id}
            />
        </div>`,

    "d:text-list": ` <div class="form-group">
    <label for=${elementProperty.id}>${elementProperty.title}</label>
    <select name=${elementProperty.id} class="form-control form-select" id=${
      elementProperty.id
    }>
     ${isMultiValuedf(elementProperty) && buildSelectOptions(elementProperty)}
    </select>
    </div>`,
    "d:date": ` <div class="form-group">
  <label for=${elementProperty.id}>${elementProperty.title}</label>
  <input name=${elementProperty.id} type="date" class="form-control" id=${elementProperty.id} />
  </div>`,
    "d:mltext": `
    <div class="form-group">
          <label for=${elementProperty.id}>${elementProperty.title}</label>
          <textarea id=${elementProperty.id} name=${elementProperty.id} class="form-control"></textarea>
        </div>
    `,
    "d:int": ``,
    "d:long": ``,
    "d:float": ``,
    "d:double": ``,
    "d:datetime": ``,
    "d:boolean": ``,
  };
  return elements[elementKey];
}

function buildSelectOptions(list) {
  //   console.log("list", list.constraints[0].parameters.allowedValues);
  list = list.constraints[0].parameters.allowedValues || [];
  //   return;
  let optionsList = "";
  list.forEach((element) => {
    optionsList = optionsList + `<option value=${element}>${element}</option>`;
  });
  return optionsList;
}
function isMultiValuedf(property) {
  if (property.isMultiValued) {
    return true;
  } else if (property.constraints && property.constraints[0]?.type === "LIST") {
    return true;
  }
  return false;
}
async function createFormFields(type_id) {
  if (type_id === "cm:content") {
    return [];
  }
  let res = await fetchTypeProperties(type_id);
  //   console.log("Ssssssssss", res.entry.properties);
  //   return;
  const formContainer = document.getElementById("form-container");
  //   console.log(inputData.properties);
  let form = "";
  let formFieldsKeysList = [];
  let modelPrefix = res.entry.model.namespacePrefix;
  res.entry.properties.forEach((property) => {
    if (property.id.includes(modelPrefix)) {
      let isMultiValued = isMultiValuedf(property);
      let elementKey = isMultiValued
        ? property.dataType + "-list"
        : property.dataType;
      console.log("element Key ", elementKey);
      let element = elementsFactory(property, elementKey);
      formFieldsKeysList.push({ id: property.id, dataType: property.dataType });
      form = form + element;
    }

    // console.log(element);
  });
  formContainer.innerHTML = form;
  // to be used later. where we want to grab the data. from the main page;
  return formFieldsKeysList;
}
// createFormFields("HR:BirthCertificate");
// Call the function to create the form
