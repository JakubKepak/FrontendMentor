const form = document.getElementById("form");
const emailInput = document.getElementById("email-input");
const errorMessage = document.getElementById("error-message");

const showError = (element) => {
  element.classList.add("error");
  errorMessage.classList.remove("hide");
};

form.addEventListener("submit", (event) => {
  if (!emailInput.validity.valid) {
    showError(emailInput);
    event.preventDefault();
  }
});
