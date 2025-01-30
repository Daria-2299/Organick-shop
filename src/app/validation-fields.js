import { getAddress } from "./data-suggest";

/** name-field validation */
export function nameValidation(strValue, fieldName) {
  hideHelper(fieldName);
  const regexp = /^[А-Яа-яёa-zA-Z]*$/;
  let messageError = "";
  if (strValue.length < 2 || strValue.length > 20) {
    messageError =
      "The text must be no shorter than 2 characters. The maximum text length is 20 characters.";
  } else if (strValue.includes(" ")) {
    messageError = "The field must contain one word.";
  } else if (!regexp.test(strValue)) {
    messageError = "The field can only contain letters of the Latin alphabet.";
  } else {
    return true;
  }
  if (messageError) {
    showHelper(messageError, fieldName);
    return false;
  }
}

/** email-field validation */
export function emailValidation(strValue, fieldName = "email") {
  hideHelper(fieldName);
  const regexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let messageError = "";
  if (!strValue.includes("@")) {
    messageError = "The email address must contain the @ symbol.";
  } else if (!regexp.test(strValue)) {
    messageError = "Invalid email address format.";
  } else {
    return true;
  }
  if (messageError) {
    showHelper(messageError, fieldName);
    return false;
  }
}

/** telephone-number-field validation */
export function telephoneNumberValidation(strValue, inputField) {
  hideHelper("telephone");
  const regexp = /^\+[1-9]{1}\d{10,11}$/;
  let messageError = "";
  if (strValue[0] !== "+") {
    messageError = "Enter your phone number with country code.";
    inputField.value = strValue.length >= 3 ? "+" + strValue : strValue;
  } else if (/[а-яА-ЯёЁa-zA-Z]/.test(strValue)) {
    messageError = "The phone number can only contain numbers.";
  } else if (!regexp.test(strValue)) {
    messageError = "Invalid phone number format.";
  } else {
    return true;
  }
  if (messageError) {
    showHelper(messageError, "telephone");
    return false;
  }
}

/** address-field validation*/
export function addressValidation(strValue) {
  hideHelper("address");
  showSuggest(strValue);
  let messageError = "";
  if (!strValue.includes(" ул ")) {
    messageError = "Enter the address including the street.";
  } else if (!strValue.includes(" д ")) {
    messageError = "Enter the address with the house number.";
  } else {
    return true;
  }
  if (messageError) {
    showHelper(messageError, "address");
    return false;
  }
}

/** show address hints */
function showSuggest(strValue) {
  const datalist = document.querySelector("#suggested-addresses");
  const suggestList = Array.from(datalist.children);
  getAddress(strValue).then((suggestedAddresses) => {
    for (let i = 0; i < suggestList.length; i++) {
      suggestList[i].value = suggestedAddresses[i];
    }
  });
}

/** show error messages */
function showHelper(errorMsg, fieldName) {
  const curHelper = document.querySelector(`.helper--${fieldName}`);
  curHelper.textContent = "The field is filled in incorrectly. " + errorMsg;
  curHelper.style.display = "block";
}

/** hide error messages */
export function hideHelper(fieldName) {
  const curHelper = document.querySelector(`.helper--${fieldName}`);
  curHelper.style.display = "none";
}

/** message about required field completion */
export function mandatoryFillingMessage(fieldName) {
  hideHelper(fieldName);
  const curHelper = document.querySelector(`.helper--${fieldName}`);
  curHelper.style.display = "block";
  curHelper.textContent = "Required field.";
}
