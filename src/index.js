let addToy = false;
const divCollect = document.querySelector('#toy-collection')

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
})
document.addEventListener('DOMContentLoaded', () => {
  getToys()
});

// --------------------------------------------------------
// Fetch Andy's toys 
// --------------------------------------------------------

// make a GET request to the server
const getToys = () => {
  return fetch('http://localhost:3000/toys')
.then(resp => resp.json())
};

function renderToys(toy) {
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
  btn.innerText = "like"

  const divCard = document.createElement('div')
  divCard.setAttribute('class', 'card')
  divCard.append(h2);
  divCard.append(img);
  divCard.append(p);
  divCard.append(btn);
  const divCollect = document.querySelector('#toy-collection');
  divCollect.append(divCard);
}

getToys().then(toys => {
  toys.forEach(toy => {
    //function to render toys goes here or something
    renderToys(toy)
  })
})

