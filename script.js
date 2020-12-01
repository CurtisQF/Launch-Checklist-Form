// Write your JavaScript code here!

window.addEventListener("load", function () {
   let form = document.getElementById("launchForm");
   form.addEventListener("submit", function(event) {
      let pilotName = document.getElementById("pilotName");
      let copilotName = document.getElementById("copilotName");
      let fuelLevel = document.getElementById("fuelLevel");
      let cargoMass = document.getElementById("cargoMass");
      let launchStatus = document.getElementById("launchStatus");

      // Check all fields have input
      if (pilotName.value === "" || copilotName.value === "" || fuelLevel.value === "" || cargoMass.value === "") {
         alert("All fields are required!");
         event.preventDefault();   

      // Check pilot and copilot inputs are NOT numbers
      } else if (!isNaN(pilotName.value) || !isNaN(copilotName.value) ) {
         alert("Make sure to enter valid names!");
         event.preventDefault();   

      // Check fuel level and cargo mass inputs are safe
      } else if (fuelLevel.value < 10000 || cargoMass.value > 10000) {
         event.preventDefault();
        
         // Show OL
         document.getElementById("faultyItems").style.visibility = "visible";

         // Show pilot and co-pilot names
         document.getElementById("pilotStatus").innerHTML = `Pilot ${pilotName.value} ready for launch`;
         document.getElementById("copilotStatus").innerHTML = `Co-pilot ${copilotName.value} ready for launch`;

         // Change "ready" text and make red
         launchStatus.innerHTML = `Shuttle Not Ready for Launch`;
         launchStatus.style.color = "red";
         
         // Check fuel level; show if too low or safe
         if (fuelLevel.value < 10000) {
            fuelStatus.innerHTML = "Fuel level too low for launch"
         } else {
            fuelStatus.innerHTML = "Fuel level high enough for launch";
         };

         // Check cargo mass; show if too high or safe
         let cargoStatus = document.getElementById("cargoStatus")
         if (cargoMass.value > 10000) {
            cargoStatus.innerHTML = "Cargo mass too high for launch";
         } else {
            cargoStatus.innerHTML = "Cargo mass low enough for launch";
         };  
      
      // Change status to ready if it passes
      } else {
         launchStatus.innerHTML = `Shuttle is Ready for Launch`;
         launchStatus.style.color = "green";
         document.getElementById("faultyItems").style.visibility = "hidden";
         event.preventDefault();
      };
   });

   // Fetch JSON data
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
      response.json().then(function(json) {
         
         // Get random destination
         let index = Math.floor(Math.random()*6);
         
         // Insert JSON data into page
         document.getElementById("missionTarget").innerHTML = `
            <h2>Mission Destination</h2>
            <ol>
               <li>Name: ${json[index].name}</li>
               <li>Diameter: ${json[index].diameter}</li>
               <li>Star: ${json[index].star}</li>
               <li>Distance from Earth: ${json[index].distance}</li>
               <li>Number of Moons: ${json[index].moons}</li>
            </ol>
            <img src="${json[index].image}">`
      })   

   });

});


/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
