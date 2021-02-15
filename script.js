const form = document.getElementById("form");
const inputFirstName = document.getElementById("form__first-name");
const inputLastName = document.getElementById("form__last-name");
const inputEmail = document.getElementById("form__email");
const inputPassword = document.getElementById("form__password");

const showError = (element) => {
  element.nextElementSibling.classList.remove("hide");
  element.parentElement.nextElementSibling.classList.remove("hide");
  element.classList.add("error");
};

form.addEventListener("submit", (event) => {
  if (!inputFirstName.validity.valid) {
    showError(inputFirstName);
    event.preventDefault();
  }
  if (!inputLastName.validity.valid) {
    showError(inputLastName);
    event.preventDefault();
  }
  if (!inputEmail.validity.valid) {
    showError(inputEmail);
    event.preventDefault();
  }
  if (!inputPassword.validity.valid) {
    showError(inputPassword);
    event.preventDefault();
  }
});
