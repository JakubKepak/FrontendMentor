const navigation = document.querySelectorAll(".container__picture__navigation");
const johnProfile = document.querySelector(".container--john");
const tanyaProfile = document.querySelector(".container--tanya");

const toggleProfiles = () => {
  johnProfile.classList.toggle("hide");
  tanyaProfile.classList.toggle("hide");
};

navigation.forEach((item) => {
  return item.addEventListener("click", () => {
    toggleProfiles();
  });
});
