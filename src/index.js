let addToy = false;
const url = "http://localhost:3000/toys"

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollectionDiv = document.querySelector("#toy-collection");
  const createToyForm = document.querySelector('form');

  getAllToys(toyCollectionDiv);

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  createToyForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = e.target[0].value
    const image = e.target[1].value
    const formData = {
      name: name ,
      image: image
    };
    const configObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body:JSON.stringify(formData)
    };
  
    return fetch(url, configObject)
      .then(function (response) {
        return response.json();
      })
      .then(function (json){
        // console.log(json);
        makeToyCard()
      })
      .catch(function(error){
        alert("Yikes");
        console.log(error.message);
      });
  })


});

function getAllToys(toyCollection) {
  return fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(function (json){
    for (const toy in json) {
      makeEachToy(toy,json, toyCollection);
    };
  });

}

function makeEachToy (toy, json, toyCollection) {
  makeToyCard(toy, json, toyCollection);

}

function makeToyCard(toy, json, toyCollection) {
  const toyDOMDiv = document.createElement('div'); 
  var att = document.createAttribute("class");   
  att.value = "card";                           
  toyDOMDiv.setAttributeNode(att);          
  toyDOMDiv.innerHTML = `
    <h2> ${json[toy].name}</h2>
    <img src= ${json[toy].image} class= "toy-avatar"/>
    <p> ${json[toy].likes} likes</p>
    <button class="like-btn">Like <3</button>
  `;
  const likeButton = toyDOMDiv.childNodes[7]

  likeButton.addEventListener("click", function(e) {
    e.preventDefault();
    console.log(e.target)
  
    const formData = {
      likes: "changed" 
    };
    const configObject = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body:JSON.stringify(formData)
    };
  
    return fetch(url, configObject)
      .then(function (response) {
        return response.json();
        // console.log(response);
        
      })
      .then(function (json){
        console.log(json);
        console.log("This empty Object is because something is stopping the patch request from working");
        
      })
      .catch(function(error){
        alert("Yikes");
        console.log(error.message);
      });
  })

  toyCollection.appendChild(toyDOMDiv);
}
