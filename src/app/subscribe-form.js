import { emailValidation, mandatoryFillingMessage } from "./validation-fields";
import { Subscription } from "./database";

const subscribeForm = document.forms.subscribeForm;

subscribeForm.addEventListener("submit", validationSubscribeForm);
const emailInput = subscribeForm[0];

emailInput.addEventListener("input", changeInputData);
emailInput.addEventListener("focus", focusStyle);
emailInput.addEventListener("blur", blurStyle);

/** validation subscribe form */
function validationSubscribeForm(evt) {
  evt.preventDefault();
  const emailValue = emailInput.value.trim();
  if (!emailValue) {
    mandatoryFillingMessage("email-subscribe");
    return;
  }
  const resultValidation = emailValidation(emailValue, "email-subscribe");
  if (resultValidation) {
    subscribeForm.reset();
    Subscription.addNewEmail(emailValue);
    successfulSubscription();
  }
}

/** processing input fields (subscribe form)*/
function changeInputData(evt) {
  const curField = evt.target;
  let curValue = curField.value.trim();
  emailValidation(curValue, "email-subscribe");
}

/** successful subscription*/
function successfulSubscription() {
  subscribeForm.style.display = "none";
  const message = document.querySelector(".newsletter__successful-message");
  message.style.display = "flex";
}

/** focus style for input field (subscribe form) */
function focusStyle(evt) {
  evt.target.style.border = "2px solid #274c5b";
  evt.target.style.color = "#274c5b";
  if (evt.target.name === "telephone" && evt.target.value.length === 0) {
    evt.target.value = "+";
  }
}

/** blur style for input field (subscribe form) */
function blurStyle(evt) {
  if (evt.target.value.length === 0 && evt.target.name !== "comment") {
    mandatoryFillingMessage(evt.target.name);
  }
  evt.target.style.border = "none";
}
