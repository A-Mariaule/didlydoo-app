let addButton = document.querySelector(".add__button");
let editButton = document.querySelector(".edit");
let addForm = document.querySelector(".add__form");
let editForm = document.querySelector(".edit__form");
let form = document.querySelector("form");
let closeButtonAdd = document.querySelector(".close__button__add");
let closeButtonEdit = document.querySelector(".close__button__edit");

addButton.addEventListener("click", () => {
  addForm.style.cssText = "display:flex";
});

editButton.addEventListener("click", () => {
  editForm.style.cssText = "display:flex";
});

closeButtonAdd.addEventListener("click", () => {
  addForm.style.cssText = "display:none";
  console.log("test");
});

closeButtonEdit.addEventListener("click", () => {
  editForm.style.cssText = "display:none";
  console.log("test");
});
