///////// Variables/////////
let addToy = false;
const url = "http://localhost:3000/toys/"
const toyDiv = document.querySelector("#toy-collection")
const headers = {"Content-Type": "application/json",Accept: "application/json"}
const toyForm = document.querySelector(".add-toy-form")

/////////API calls////////

//Get
function get(url){
 return fetch(url).then(resp => resp.json())
}

//Post
function post(newToy){
  return fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(newToy)
  }).then(resp => resp.json())
}
//patch
function patch(toy, likes){
  return fetch(url + toy.id, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify({
      likes: likes
    })
  }).then(resp => resp.json())
}

/////////Event Listener//////
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

toyForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const newToy = {
    name: event.target[0].value,
    image: event.target[1].value,
    likes: 0
  }

  post(newToy).then(toy => createCard(toy));
  toyForm.reset();
})

//////// Functions///////////
function createCard(toy){
  let div = document.createElement("div")
  div.classList.add("card")

  let h2 = document.createElement("h2")
  h2.innerText = toy.name

  let img = document.createElement("img")
  img.classList.add("toy-avatar")
  img.src = toy.image

  let p = document.createElement("p")
  p.innerText = `${toy.likes} Likes`

  let button = document.createElement("button")
  button.classList.add("like-btn")

  button.innerText = "Like <3"
  button.addEventListener('click', (event) => {
    let likes = parseInt(event.target.previousSibling.innerText)
    ++likes
    patch(toy, likes).then((event.target.previousSibling.innerText = `${likes} Likes`))
    //event.target.parentElement.querySelector("#puto").innerText = "Hola"
  })

  div.append(h2, img, p, button);
  toyDiv.append(div)
}
/////////////////////////////

get(url).then(toys => toys.forEach(toy => createCard(toy)))






