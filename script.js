const toggleHideAnswer = (element) => {
  if (element.getAttribute("hidden") == null) {
    element.setAttribute("hidden", true);
  } else {
    element.removeAttribute("hidden");
  }
};

document.querySelectorAll(".faq_container__arrow_image").forEach((item) => {
  item.addEventListener("click", () =>
    toggleHideAnswer(item.parentElement.parentElement.nextElementSibling)
  );
});
