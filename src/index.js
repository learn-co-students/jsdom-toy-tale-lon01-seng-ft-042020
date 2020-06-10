

TOYS_URL = ('http://localhost:3000/toys')
const divCollet = document.querySelector('#toy-collection')


function getToys() {
  return fetch(TOYS_URL)
  .then(function(response){
    return response.json()
  })
}

function postToy(toy_data) {
  fetch('TOYS_URL', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": toy_data.name.value,
      "image": toy_data.image.value,
      "likes": 0
    })
  })
  .then(function(response) {
    response.json
  })
  .then(function (obj_toy){
    let new_toy = renderToys(obj_toy)
    divCollet.append(new_toy)
  })
}

function likes(e) {
  e.preventDefault();
  let plusOne = parseInt(e.target.previousElementSibling.innerText) + 1

  fetch(`http://localhost:3000/toys/${e.target.id}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": plusOne
    })
  })
  .then(function(response){
    response.json()
  })
  .then(function(like_obj){
    e.target.previousElementSibling.innerText = `${plusOne} likes`;
  })
}

document.addEventListener("DOMContentLoaded", function() {
  const toyFormContainer = document.querySelector(".container");
  const addBtn = document.querySelector("#new-toy-btn") 
  let addToy = false;
  addBtn.addEventListener("click", function() {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener('submit', function(e) {
        e.preventDefault()
        postToy(e.target)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function renderToys(toy) {
  const divCollet = document.querySelector('#toy-collection')
  const h2 = document.createElement('h2')
  h2.innerText = toy.name

  const img = document.createElement('img')
  img.setAttribute('src', toy.image)
  img.setAttribute('class', 'toy-avatar')

  const p = document.createElement('p')
  p.innerText = `${toy.likes} likes`

  const btn = document.createElement('button')
  btn.setAttribute('class', 'like-btn')
  btn.setAttribute('id', toy.id)
  btn.innerText = 'like'
  btn.addEventListener('click', function(e) {
    console.log(e.target.dataset);
    likes(e)
  })

  const divCard = document.createElement('div')
  divCard.setAttribute('class', 'card')
  divCard.append(h2, img, p, btn)
  divCollet.append(divCard)
}

getToys().then(function(toys) {
    for(let toy of toys) {
    renderToys(toy)
  }
})
