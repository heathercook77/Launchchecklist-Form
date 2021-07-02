// Write your JavaScript code here!

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
window.addEventListener('load', () =>{

   fetch('https://handlers.education.launchcode.org/static/planets.json').then(
      (response) => {
        response.json().then((json) => {
           //making div the area where "missionTarget" is displayed on the index.html
           const div = document.getElementById("missionTarget");
           //*Bonus Mission* creating a variable that will randomly get a number from 0 to the json.length
           let i = Math.round(Math.random()*json.length);
           //after getting the random number selecting that as the particular object we use in the json array
           let list = json[i];
            // This block of code shows how to format the HTML once you fetch some planetary JSON!
            //changing the innnerHTML for the div variable I created early 
            div.innerHTML = `
               <h2>Mission Destination</h2>
               <ol>
                  <li>Name: ${list.name}</li>
                  <li>Diameter: ${list.diameter}</li>
                  <li>Star: ${list.star}</li>
                  <li>Distance from Earth: ${list.distance}</li>
                  <li>Number of Moons: ${list.moons}</li>
               </ol>
               <img src="${list.image}">
               `
   })
})

   //creating a variable for the form
   let form = document.querySelector("form");
   //adding an event listener for when the user hits the submit button
   form.addEventListener('submit', (event) =>{
      event.preventDefault();
      //creating a variable for the pilot tag that the user inputs
      let pilotsName = document.querySelector("input[name=pilotName]");
      let pilot = pilotsName.value;
      //test variable to make sure that the pilot variable is a string and not a number
      let pTest = Number(pilot);

      //creating a variable for the copilot tag that the user inputs
      let coPilotsName = document.querySelector("input[name=copilotName]");
      let coPilot = coPilotsName.value;
      //test variable to make sure that the copilot variable is a string and not a number
      let coPTest = Number(coPilot);

      //creating a variable for the fuel level tag that the user inputs
      let fuelLevel = document.querySelector("input[name=fuelLevel]");
      let fuelValue = fuelLevel.value;
      //test variable to make sure that the  fuel variable is a number
      let fuelTest = Number(fuelValue);

      //creating a variable for the cargo mass tag that the user inputs
      let cargoMass = document.querySelector("input[name=cargoMass]");
      let cargoValue = cargoMass.value;
      //test variable to make sure that the cargo variable is a number
      let cargoTest = Number(cargoValue);

      //if statement testing to make sure that all of the fields have been filled out
      if(pilot === '' || coPilot === '' || fuelValue === '' || cargoValue === '') {
         //alert to notify the user that they have not used filled out all of the required fields
         alert("All fields are required!")
      //if statement testing to make sure that all of the required fields have the proper input type
      } else if (isNaN(pTest) === false || isNaN(coPilot) === false || isNaN(fuelTest) || isNaN(cargoTest)) {
         //alerting user that the input types are invalid
         alert("Make sure all of your inputs are valid. Please correct input type.")
      } else {
         //updating the innerHTML of to include pilot and copilot's name
         pilotStatus.innerHTML = `${pilot} is ready for launch!`
         copilotStatus.innerHTML = `${coPilot} is ready for launch!`
         //if statement testing to see if fuelValue and cargoValue inputs are at the required level
         if(fuelValue < 10000 && cargoValue < 10000) {
            //updating styles and innerHTML to reflect that the fuel and cargoValues are not ready for launch
            faultyItems.style.visibility = 'visible';
            fuelStatus.innerHTML = `${fuelValue} liters is not sufficient for takeoff. 10,000 liters needed.`;
            launchStatus.innerHTML = `Shuttle not ready for launch`;
            launchStatus.style.color = 'red';
            cargoMass.innerHTML = `${cargoValue} kg weighs too much for takeoff. Make sure cargo weighs less than 10,000 kg.`
            //if statement testing if the fuelLevel is ready for launch
         } else if (fuelValue < 10000) {
            //updating styles and innerHTML to reflect that the fuel level is not ready for launch, but cargoMass is. 
            faultyItems.style.visibility = 'visible';
            fuelStatus.innerHTML = `${fuelValue} liters is not sufficient for takeoff. 10,000 liters needed.`;
            launchStatus.innerHTML = `Shuttle not ready for launch`;
            launchStatus.style.color = 'red';
            cargoValue.innerHTML = `Cargo mass is to high for launch`
            //if statement testing if the cargo value is ready for launch
         } else if (cargoValue > 10000) {
            //updating styles and innerHTML to reflect that the cargoMass is not ready for launch, but fuel level is. 
            faultyItems.style.visibility = 'visible';
            launchStatus.innerHTML = `Shuttle not ready for launch`;
            launchStatus.style.color = 'red';
            cargoMass.innerHTML = `${cargoValue} Ready to launch, cargo weighs less than 10,000 kg.`;
            fuelStatus.innerHTML = `Fuel level high enough for launch`;
            //if both fuel level and cargo mass are at the required level then updating the rest of the styles and innerHTML for the ol in faultyItems
         } else {
            faultyItems.style.visibility = 'visible';
            launchStatus.innerHTML = `Shuttle is ready for launch.`;
            launchStatus.style.color = `green`;
            fuelStatus.innerHTML = `Fuel level high enough for launch`;
            cargoValue.innerHTML = `Cargo mass is to high for launch`
         }
      }


   })
});