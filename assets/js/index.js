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
      //tableau
      let table=document.createElement("table")
      table.className="card__table"
      card.appendChild(table)
      let table_header=document.createElement("tr")
      table.appendChild(table_header)
      let name_header=document.createElement("th")
      name_header.textContent="Name"
      table_header.appendChild(name_header)
      for(let item of elem.dates){
        let date=document.createElement("th")
        date.textContent=item.date
        table_header.appendChild(date)
      }
      for(let item of elem.dates[0].attendees){
            let ligne=document.createElement("tr")
            table.appendChild(ligne)
            let invite=document.createElement("th")
            invite.textContent=item.name
            ligne.appendChild(invite)
            for(let item of elem.dates){
                let vide=document.createElement("th")
                vide.textContent=" "
                ligne.appendChild(vide)                  
              }
      }
      //bouton
      let add_name=document.createElement("button")
      add_name.className="add_name"
      add_name.textContent="Add your name"
      card.appendChild(add_name)
      let delete_card=document.createElement("button")
      delete_card.className="delete_card"
      delete_card.textContent="Delete"
      card.appendChild(delete_card)

    }
  })
