const confirmationButton = document.querySelector(".confirmation__button");
confirmationButton.addEventListener("click", function () {
  document.location = "./order-successful-page.html";
});

fillConfirmationInfo();

/** fill fields of the confirmation message */
function fillConfirmationInfo() {
  const dataOrder = JSON.parse(
    window.localStorage.getItem("orderDataOrganickShop")
  );

  for (let key in dataOrder) {
    if (["comment", "agreement"].includes(key)) {
      continue;
    }
    const valueField = document.querySelector(`.confirmation__value--${key}`);
    valueField.textContent = dataOrder[key];
  }
}
