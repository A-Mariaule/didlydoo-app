let addButton = document.querySelector(".add__button");
let form = document.querySelector("form");
let closeButton = document.querySelector(".close__button");

addButton.addEventListener("click",()=> {
    form.style.cssText = "display:flex";
}
);

closeButton.addEventListener("click",()=> {
    form.style.cssText = "display:none";
}
);