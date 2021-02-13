const form = document.getElementById("text__email");
const emailInput = document.getElementById("email-input");
const errorPicture = document.getElementById("text__email__warning-image");
const errorMessage = document.getElementById("text__email__warning-message");

const showError = () => {
  errorPicture.style.display = "block";
  errorMessage.style.display = "block";
};

form.addEventListener("submit", (event) => {
  if (!emailInput.validity.valid) {
    showError();
    event.preventDefault();
  }
});
