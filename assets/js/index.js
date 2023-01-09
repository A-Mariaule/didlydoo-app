//GET
var main = document.querySelector("main");
function Get() {
  fetch("http://localhost:3000/api/events/")
    .then((response) => response.json())
    .then((json) => {
      for (let elem of json) {
        //creation de la carte
        let card = document.createElement("div");
        card.className = "card";
        main.appendChild(card);
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
        let add_name = document.createElement("button");
        add_name.className = "add__name";
        add_name.textContent = "Add your name";
        card__bottom.appendChild(add_name);
        let delete_card = document.createElement("button");
        delete_card.className = "delete";
        delete_card.textContent = "delete";
        card__bottom.appendChild(delete_card);
      }
      delete_event();
      button_Name();
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

//delete
function delete_event() {
  let delete_button = document.getElementsByClassName("delete");
  for (let elem of delete_button) {
    elem.addEventListener("click", delete_card);
  }
}

function delete_card(e) {
  name_event =
    e.target.parentElement.parentElement.firstElementChild.textContent;
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
  resultat = prompt("Indique un nom");
  name_event =
    e.target.parentElement.parentElement.firstElementChild.textContent;
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
