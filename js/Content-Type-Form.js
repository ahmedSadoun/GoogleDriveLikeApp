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
    <select name=${elementProperty.id} class="form-control" id=${
      elementProperty.id
    }>
     ${elementProperty.isMultiValued && buildSelectOptions(elementProperty)}
    </select>
    </div>`,
    "d:date": ` <div class="form-group">
  <label for=${elementProperty.id}>${elementProperty.title}</label>
  <input name=${elementProperty.id} type="date" class="form-control" id=${elementProperty.id} />
  </div>`,
    "d:mltext": ``,
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

async function createFormFields(type_id) {
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
      let elementKey = property.isMultiValued
        ? property.dataType + "-list"
        : property.dataType;
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
