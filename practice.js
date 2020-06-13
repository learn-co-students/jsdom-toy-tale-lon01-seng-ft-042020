  // -------------------------- Patch REQUEST - Update a specific toy
  // function likeToy(){
  //   const likeButtons = document.querySelectorAll(".like-btn");
  //   for (const button of likeButtons ){
    //Find a specific toys' like button & add a click event
    // button.addEventListener("click", function(e){
    //   // -------------------------- Patch REQUEST - Update a specific toy
    //   //Define the configuration Object
    //  let configObj = {
    //     method: "PATCH",
    //     headers: {
    //      "Content-Type": "application/json",
    //      "Accept": "application/json"
    //     },
    //     body: JSON.stringify({
    //        //Data being sent to the server
    //        "likes": toy.likes+=1
        
    //     })
    //  }
    //  console.log(`Event: ${button.id}`)
//     return fetch(`http://localhost:3000/toys/:${button.id}`, configObj)
//      .then(function(resp){return resp.json() })
//      //Update the DOM with the data that was sent to the server
//      .then(function(jsObject) {
//       // makeDivCard(jsObject)
//       console.log(`jsObject: ${jsObject}`)
//      })
//     })
//   }
// // }

// const likeButtons = document.querySelectorAll(".like-btn");
//     for (const button of likeButtons ){
//     //Find a specific toys' like button & add a click event
//     // debugger
//     button.addEventListener("click", function(e){
//       console.log(`Event: ${button.id}`)
//     })