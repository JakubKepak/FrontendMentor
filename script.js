const actionMenu = document.getElementById("action_menu");

document.getElementById("card__share").addEventListener("click", () => {
  if (actionMenu.style.display === "none") {
    actionMenu.style.display = "flex";
  } else {
    actionMenu.style.display = "none";
  }
});
