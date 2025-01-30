import {
  nameValidation,
  addressValidation,
  emailValidation,
  telephoneNumberValidation,
  hideHelper,
} from "./validation-fields";

const orderForm = document.forms.formOrder;

//form fields
const inputs = Array.from(orderForm.elements[0].elements);
const deliveryTypes = orderForm.elements["delivery-type"];
const payTypes = orderForm.elements["pay-type"];
// is valid field, field value
const [validField, inputValues] = initializationInputsInformation();

inputs.forEach((input) => {
  input.addEventListener("input", changeInputData);
  input.addEventListener("focus", focusStyle);
  input.addEventListener("blur", blurStyle);
});

[...payTypes, ...deliveryTypes].forEach((element) =>
  element.addEventListener("change", getOptionsValue)
);

orderForm.addEventListener("submit", validationForm);

/** processing input fields (order form)*/
function changeInputData(evt) {
  const curField = evt.target;
  let curValue = curField.value.trim();
  const fieldName = curField.name;
  if (fieldName === "comment") {
    inputValues["comment"] = curValue;
    return;
  }

  let result = false;
  switch (fieldName) {
    case "surname":
    case "username":
    case "patronymic":
      result = nameValidation(curValue, fieldName);
      curValue = upperCaseFirst(curValue);
      break;
    case "email":
      result = emailValidation(curValue);
      break;
    case "telephone":
      result = telephoneNumberValidation(curValue, curField);
      break;
    case "address":
      result = addressValidation(curValue);
      break;
    case "agreement":
      result = true;
      hideHelper("agreement");
      break;
    default:
      break;
  }

  validField[fieldName] = result;
  inputValues[fieldName] = result ? curValue : "";
}

/** validation order form */
function validationForm(evt) {
  evt.preventDefault();
  for (let key in inputValues) {
    if (!inputValues[key] && key !== "comment") {
      mandatoryFillingMessage(key);
    }
  }
  let resultValidation = true;
  for (let key in validField) {
    resultValidation = resultValidation && validField[key];
  }
  if (resultValidation) {
    console.log("Форма заполнена");
    // save data in localStorage
    window.localStorage.setItem(
      "orderDataOrganickShop",
      JSON.stringify(inputValues)
    );
    orderForm.reset();
    document.location = "./order-confirmation-page.html";
  }
}

/** get the value of a field with radio buttons */
function getOptionsValue(evt) {
  inputValues[evt.target.name] = evt.target.value;
  validField[evt.target.name] = true;
  hideHelper(evt.target.name);
}

/** message about required field completion */
function mandatoryFillingMessage(fieldName) {
  hideHelper(fieldName);
  const curHelper = document.querySelector(`.helper--${fieldName}`);
  curHelper.style.display = "block";
  if (["pay-type", "delivery-type", "agreement"].includes(fieldName)) {
    return;
  }
  curHelper.textContent = "Required field.";
}

/** focus style for input field (order form) */
function focusStyle(evt) {
  evt.target.style.borderBottom = "2px solid #514a7e";
  evt.target.style.color = "#514a7e";
  evt.target.style.fontSize = "20px";
  if (evt.target.name === "telephone" && evt.target.value.length === 0) {
    evt.target.value = "+";
  }
}

/** blur style for input field (order form) */
function blurStyle(evt) {
  if (evt.target.value.length === 0 && evt.target.name !== "comment") {
    mandatoryFillingMessage(evt.target.name);
  }
  evt.target.style.borderBottom = "0.5px solid #7d7d7d";
}

/** initialization of data for validation and form fields */
function initializationInputsInformation() {
  const validInfo = {},
    inputValues = {};
  inputs.forEach((item) => {
    inputValues[item.name] = "";
    if (item.name !== "comment") {
      validInfo[item.name] = false;
    }
  });
  validInfo["delivery-type"] = false;
  validInfo["pay-type"] = false;
  inputValues["delivery-type"] = "";
  inputValues["pay-type"] = "";
  return [validInfo, inputValues];
}

/** capitalize the first letter of a line */
function upperCaseFirst(str) {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}
