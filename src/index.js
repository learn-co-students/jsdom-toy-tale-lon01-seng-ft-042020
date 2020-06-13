let addToy = false;


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
  getRequest();
  postRequest();
  // likeToy();
})

  // ------------------------------- GET REQUEST - Read all toys
  function getRequest(){
    //make a 'GET' request to fetch all the toy objects
    return fetch(" http://localhost:3000/toys")
    .then(function(resp){return resp.json() })
     //Iterate over jsObject
    .then(function(jsObject) { 
      for (const element of jsObject){
      makeDivCard(element)
      }
     })
  }

 // ------------------------------- Make the <div> card
   //make a <div class="card"> for each toy and add it to the toy-collection div
  function makeDivCard(element){
    //Find the div with the id "#toy-collection"
   const toyCollectionDiv = document.querySelector("#toy-collection");
    //Create a div
    const divCard = document.createElement("div");
    //Set the class attribute of div
    divCard.setAttribute("class", "card")

    //h2 tag with the toy's name
    const toyNameHeader = document.createElement("h2");
    toyNameHeader.innerHTML = element.name

    //img tag with the src of the toy's image attribute
    // and the class name "toy-avatar"
    const toyImage = document.createElement("img");
    toyImage.setAttribute("src", element.image)
    toyImage.setAttribute("class", "toy-avatar")

    //p tag with how many likes that toy has
    let toyLikes = document.createElement("p");
    toyLikes.innerHTML = `${element.likes} Likes`
   
    function increaseToyLikes(toyLikes) {
      toyLikes.innerHTML = `${element.likes+=1} Likes`
    }

    //button tag with a class "like-btn"
    const likeButton = document.createElement("button");
    likeButton.setAttribute("class", "like-btn")
    likeButton.innerHTML = "Like <3"
  
    //----------------- like button -----------------------------
    likeButton.addEventListener("click", function(e){

     //Define the configuration Object
     let configObj = {
      method: "PATCH",
      headers: {
       "Content-Type": "application/json",
       "Accept": "application/json"
      },
      body: JSON.stringify({
         //Data being sent to the server   
      "likes": element.likes+=1
      })
    }
    
    return fetch(`http://localhost:3000/toys/${element.id}`, configObj)
     .then(function(resp){return resp.json() })
     //Update the DOM with the data that was sent to the server
     .then(function(jsObject) {
      // makeDivCard(jsObject)
      const likes = e.target.previousSibling;
      likes.innerHTML = `${element.likes} Likes`
     })
    })
    // debugger
 //----------------- like button -----------------------------
  
    //Append the h2, img, p & button elements to the div card
    divCard.append(toyNameHeader, toyImage, toyLikes, likeButton)

    //Append the divCard to the DOM via a pre-existing DOM node
    toyCollectionDiv.appendChild(divCard)
  }

  // ------------------------------- POST REQUEST - Create a new toy
  function postRequest(){
    //Add a submit event listener on the form 
    const addToyForm = document.querySelector(".add-toy-form");
    addToyForm.addEventListener("submit", function(event){
      event.preventDefault()

     //Define the configuration Object
    let configObj = {
      method: "POST",
      headers: {
       "Content-Type": "application/json",
       "Accept": "application/json"
      },
      body: JSON.stringify({
         //Data being sent to the server
         "name": event.target[0].value,
         "image": event.target[1].value,
         "likes": 0
      })
    }

    return fetch("http://localhost:3000/toys", configObj)
     .then(function(resp){return resp.json() })
     //Update the DOM with the data that was sent to the server
     .then(function(jsObject) {
      makeDivCard(jsObject)
     })
  })
  }