/////Variables////
  const toysDiv = document.querySelector('#toy-collection');
  const newToyForm = document.querySelector('.add-toy-form');

let addToy = false;




////API CALLS - Fetch/////  

const url ="http://localhost:3000/toys/"

function get(url){
  return fetch(url).then((resp) => resp.json())
};

function post(newToy){
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(newToy)
  }).then(resp => resp.json())
}

function patch(juguete, upLikes){
  return fetch(url + juguete.id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      likes: upLikes
    })
  }).then(resp => resp.json());
}

//////eventlistener/////
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


newToyForm.addEventListener('submit', (event) =>{
 event.preventDefault()
 const newJugueteObject = {
   name : event.target.name.value,
   image : event.target[1].value,
   likes : 0
 }  
post(newJugueteObject).then(newToy => creaCartas(newToy));
newToyForm.reset();
});



////funtions/////

function creaCartas(juguete){
  let div = document.createElement("div");
  div.classList.add('card');

  let h2 = document.createElement("h2");
  h2.innerText = juguete.name;

  let img = document.createElement("img")
  img.classList.add('toy-avatar')
  img.src = juguete.image;

  let p = document.createElement("p")
  p.innerText = `${juguete.likes} Likes `;

  let button = document.createElement("button")
  button.classList.add('like-btn')
  button.innerText = "Like <3"

  button.addEventListener('click', (event) =>{
   let likes = parseInt(event.target.previousSibling.innerText);
   ++likes
   patch(juguete ,likes).then(
     (event.target.previousSibling.innerText = `${likes} Likes`)
   )
  })


  div.append(h2, img, p, button);
  toysDiv.append(div);
}








/////RUNNER//////
get(url).then(juguetes => juguetes.forEach(juguete => creaCartas(juguete)));