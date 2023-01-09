var main = document.querySelector("main");
let card_container = document.querySelector(".card__container");
card_container.className = "card__container";
main.appendChild(card_container);
//get
function Get() {
  fetch("http://localhost:3000/api/events/")
    .then((response) => response.json())
    .then((json) => {
      for (let elem of json) {
        //creation de la carte
        let card = document.createElement("div");
        card.className = "card";
        card_container.appendChild(card);
        //nom de l'event
        let title = document.createElement("h2");
        title.className = "card__title";
        card.appendChild(title);
        title.textContent = elem.name;
        //organisateur
        let organizer = document.createElement("p");
        organizer.className = "card__organizer";
        card.appendChild(organizer);
        organizer.textContent = elem.author;
        //description
        let description = document.createElement("p");
        description.className = "card__description";
        card.appendChild(description);
        description.textContent = elem.description;
        //tableau
        let table = document.createElement("table");
        table.className = "card__table";
        card.appendChild(table);
        let table_header = document.createElement("tr");
        table.appendChild(table_header);
        let name_header = document.createElement("th");
        name_header.textContent = "Name";
        table_header.appendChild(name_header);
        for (let item of elem.dates) {
          let date = document.createElement("th");
          date.textContent = item.date;
          table_header.appendChild(date);
        }
        for (let item of elem.dates[0].attendees) {
          let ligne = document.createElement("tr");
          table.appendChild(ligne);
          let invite = document.createElement("th");
          invite.textContent = item.name;
          ligne.appendChild(invite);
          for (let i of elem.dates) {
            let available = document.createElement("td");
            available.className = "" + i.date + "";
            let new_name = item.name.split(" ").join("_");
            available.classList.add("" + new_name + "");
            available.addEventListener("click", change);
            for (let j of i.attendees) {
              if (j.name == item.name && j.available) {
                available.textContent = "v";
              } else if (j.name == item.name && j.available == false) {
                available.textContent = "x";
              }
            }
            ligne.appendChild(available);
          }
        }
        //bouton
        let card__bottom = document.createElement("div");
        card__bottom.className = "card__bottom";
        card.appendChild(card__bottom);
        let div2 = document.createElement("div");
        card__bottom.appendChild(div2);
        let add_name = document.createElement("button");
        add_name.className = "add__name";
        add_name.textContent = "Add your name";
        div2.appendChild(add_name);
        let input = document.createElement("button");
        input.textContent = "Date";
        input.className = "add__date";
        div2.appendChild(input);
        let div3 = document.createElement("div");
        card__bottom.appendChild(div3);
        let edit = document.createElement("img");
        edit.className = "edit";
        edit.src = "../assets/image/edit.png";
        div3.appendChild(edit);

        let div = document.createElement("div");
        card__bottom.appendChild(div);
        let delete_card = document.createElement("img");
        delete_card.className = "delete";
        delete_card.src = "../assets/image/trash.png";
        div.appendChild(delete_card);
      }
      delete_event();
      button_Name();
      button_Date();
      edit_event();
    });
}

Get();

//récupération des inputs
function input() {
  let input_name = document.getElementsByClassName("form__name")[0];
  let name = input_name.value;
  let input_event = document.querySelector(".form__event");
  let event = input_event.value;
  let input_description = document.querySelector(".form__description");
  let description = input_description.value;
  let input_date = document.querySelector(".form__date");
  let date = input_date.value;
  data = { name: event, dates: [date], author: name, description: description };
  return data;
}

//creation event
function Post() {
  data = input();
  let options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch("http://localhost:3000/api/events/", options);
}

//bouton add event
create = document.querySelector(".form__create");
create.addEventListener("click", Post);

//edit
function edit_event() {
  let edit_button = document.getElementsByClassName("edit");
  let editForm = document.querySelector(".edit__form");
  for (let elem of edit_button) {
    elem.addEventListener("click", () => {
      editForm.style.cssText = "display:flex";
    });
  }
}

//delete
function delete_event() {
  let delete_button = document.getElementsByClassName("delete");
  for (let elem of delete_button) {
    elem.addEventListener("click", delete_card);
  }
}

function delete_card(e) {
  name_event =
    e.target.parentElement.parentElement.parentElement.firstElementChild
      .textContent;
  fetch("http://localhost:3000/api/events/")
    .then((response) => response.json())
    .then((json) => {
      for (let elem of json) {
        if (elem.name == name_event) {
          id = elem.id;
          fetch("http://localhost:3000/api/events/" + id + "/", {
            method: "Delete",
          });
        }
      }
    });
}

//addName
function button_Name() {
  let button_addName = document.getElementsByClassName("add__name");
  for (let elem of button_addName) {
    elem.addEventListener("click", AddName);
  }
}

function AddName(e) {
  resultat = prompt("Add your name");
  name_event =
    e.target.parentElement.parentElement.parentElement.firstElementChild
      .textContent;
  fetch("http://localhost:3000/api/events/")
    .then((response) => response.json())
    .then((json) => {
      for (let elem of json) {
        if (elem.name == name_event) {
          id = elem.id;
          let data = {
            name: resultat,
            dates: [{ date: "2000-01-01", available: true }],
          };
          let options = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          };
          fetch("http://localhost:3000/api/events/" + id + "/attend", options);
        }
      }
    });
}

//add date

function button_Date() {
  let button_adddate = document.getElementsByClassName("add__date");
  for (let elem of button_adddate) {
    elem.addEventListener("click", addDate);
  }
}

function addDate(e) {
  let resultat = prompt("Enter a date (yyyy-mm-dd)");
  let resultat_form = [resultat];
  name_event =
    e.target.parentElement.parentElement.parentElement.firstElementChild
      .textContent;
  fetch("http://localhost:3000/api/events/")
    .then((response) => response.json())
    .then((json) => {
      for (let elem of json) {
        if (elem.name == name_event) {
          id = elem.id;
          let data = { dates: resultat_form };
          let options = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          };
          fetch(
            "http://localhost:3000/api/events/" + id + "/add_dates",
            options
          );
        }
      }
    });
}

//change disponibilité
function change(e) {
  if (e.target.textContent == "" || e.target.textContent == "x") {
    e.target.textContent = "v";
    available_invite = true;
  } else if (e.target.textContent == "v") {
    e.target.textContent = "x";
    available_invite = false;
  }
  name_invite = e.target.classList[1].split("_").join(" ");
  date_invite = e.target.classList[0];
  name_event =
    e.target.parentElement.parentElement.parentElement.firstElementChild
      .textContent;
  fetch("http://localhost:3000/api/events/")
    .then((response) => response.json())
    .then((json) => {
      for (let elem of json) {
        if (elem.name == name_event) {
          id = elem.id;
          console.log(elem);
          let data = {
            name: name_invite,
            dates: [{ date: date_invite, available: available_invite }],
          };
          let options = {
            method: "PATCH",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          };
          fetch("http://localhost:3000/api/events/" + id + "/attend", options);
        }
      }
    });
}
