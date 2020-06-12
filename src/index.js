let addToy = false;

// API
const BASE_URL = "http://localhost:3000"
const TOYS_URL = `${BASE_URL}/toys`



// GLOBAL VARIABLES
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
const toyCollection = document.querySelector("#toy-collection")
const form = document.querySelector(".add-toy-form")

document.addEventListener("DOMContentLoaded", () => {
  
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  
  // when page loads make a GET request to fetch ALL toy objects
  // With the response data, make a <div class="card"> for each toy
  // and add it to the toy-collection div
  const getToys = url => {
    return fetch (url)
    .then(response => response.json())  
  }
  
  getToys(TOYS_URL)
  .then(toys => renderToys(toys))
  
  
  
  const renderToys = toys => {
    toys.forEach(toy => renderToy(toy))
    // render toys
  }
  
  const renderToy = toy => {
    
    const div  = document.createElement("div")
    div.classList.add("card")
    
    const h2 = document.createElement("h2")
    h2.innerText = toy.name
    
    const img = document.createElement("img")
    // debugger
    img.src = toy.image
    img.classList.add("toy-avatar")
    
    const p = document.createElement("p")
    p.innerText = `${toy.likes} Likes`
    
    const likeButton = document.createElement("button")
    likeButton.classList.add("like-btn")
    likeButton.innerText = "Like <3"
    
    div.append(h2, img, p, likeButton)
    toyCollection.appendChild(div)

    // add an addEventListener with a post request sent to the TOYS_URL
    // new toy will be added to toyCollection
    likeButton.addEventListener("click", (e) => {
      // debugger
      fetch(`${TOYS_URL}/${toy.id}`, {
        method: "PATCH", 
        headers: {
          "Content-Type": "application/json",
           Accept: "application/json"
        },
        
        body: JSON.stringify({
        "likes": toy.likes++
      } )})
      // debugger
         .then(resp => resp.json())
         .then(() =>
           { const p = document.querySelector("div#toy-collection p")
           p.innerText = `${toy.likes} Likes` 
          } )
       
  })
}

    form.addEventListener("submit", (e)=> {
      fetch(`${TOYS_URL}`,{
      method: "POST", 
        headers: {
          "Content-Type": "application/json",
           Accept: "application/json"
        },
        body: JSON.stringify({
          "name": e.target[0].value,
          "image": e.target[1].value,
          "likes": 0
      })})
  // why don't we need extra then(s). How did it add the code to the DOM
  // without the .then statement instructing it to?
          
    
  
  
  
    
})

      
   

    



})
