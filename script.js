const highlightQuestion = (element) => {
  element.classList.toggle("faq_container__question--open");
};

const rotateArrow = (element) => {
  element.classList.toggle("faq_container__arrow_image--open");
};

const toggleHideAnswer = (element) => {
  console.log(element);
  if (element.classList.contains("faq_container__answer--closed")) {
    element.classList.remove("faq_container__answer--closed");
  } else {
    element.classList.add("faq_container__answer--closed");
  }
};

document.querySelectorAll(".faq_container__question").forEach((item) => {
  item.addEventListener("click", () => {
    highlightQuestion(item);
    toggleHideAnswer(item.nextElementSibling);
    rotateArrow(item.children[1].children[0]);
  });
});
