//variable
var main = document.querySelector("main");

fetch("http://localhost:3000/api/events/")
  .then((response) => response.json())
  .then((json) => {
    console.log(json);
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
      //liste invité
      const fetchName = (name) => fetch("http://localhost:3000/api/attendees/");
      fetchName(elem.name)
        .then((response) => response.json())
        .then((attendees) => {
          console.log(attendees);
        });
    }
  });
