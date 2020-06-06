let addToy = false;
const divList = document.querySelector('#toy-collection')

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

// --------------------------------------------------------
// Fetch Andy's toys 
// --------------------------------------------------------

// make a GET request to the server
const getToys = () => {
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(toys => renderToys(toys))
}
// method to render toys 
const renderToys = (toys) => {
  toys.forEach(toy => {
    renderToy(toy)
  });
}

const renderToy = toy => {
  const toyCard = document.createElement('div');
    toyCard.className = "card";

    const header = document.createElement('h2');
    header.innerText = toy.name;

    const img = document.createElement('img');
    img.src = toy.image;
    img.className = "toy-avatar";

    const p = document.createElement('p');
    p.innerText = toy.likes;

    const button = document.createElement('button');
    button.innerText = "Like";
    button.className = "like-button";
    button.addEventListener("click", e => {
        addLike(toy)
        .then(updatedToy => {
          p.innerText = updatedToy.likes
          toy.likes = updatedToy.likes
        })
    })

    toyCard.append(header, img, p, button);
    const divList = document.querySelector('#toy-collection');
    divList.append(toyCard);
}

const addLike = (toy) => {
  const configObject = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      "likes": toy.likes + 1
    })    
  };

  return fetch(`http://localhost:3000/toys/${toy.id}`, configObject)
  .then(resp => resp.json())
}

// select the form 
const toyForm = document.querySelector('.add-toy-form') 
// create an event listeneer for the form 

toyForm.addEventListener("submit", e => {
  e.preventDefault()
  const object = {
  name: toyForm.name.value,
  image: toyForm.image.value,
  likes: 0
  };
  
  const configObject = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(object)
  };
  
  fetch('http://localhost:3000/toys', configObject)
  .then(resp => resp.json())
  .then(toys => renderToy(toys))

  toyForm.reset()
})
// create object to be posted 
getToys()

});