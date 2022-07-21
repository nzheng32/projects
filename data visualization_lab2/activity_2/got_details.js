// DOM #main div element
var main = document.getElementById('main');
characters = [{
     "name": "Bran Stark",
     "status": "Alive",
     "current_location": "Fleeing White Walkers",
     "power_ranking": 7,
     "house": "stark",
     "probability_of_survival": 98
},
{
     "name": "Arya Stark",
     "status": "Alive",
     "current_location": "Back in Westeros",
     "power_ranking": 8,
     "house": "stark",
     "probability_of_survival": 99
},
{
     "name": "Sansa Stark",
     "status": "Alive",
     "current_location": "Winterfell",
     "power_ranking": 10,
     "house": "stark",
     "probability_of_survival": 83
},
{
     "name": "Robb Stark",
     "status": "Dead - Red Wedding S3E9",
     "current_location": "-",
     "power_ranking": -1,
     "house": "stark",
     "probability_of_survival": 0
}]
// Implementation of the function
function halfSurvival(character) {
    return character["probability_of_survival"]/2;
}
for (i =0; i < characters.length; i++) {
    if ( characters[i]["name"] == "Arya Stark"){
        continue;
    }
    characters[i]["probability_of_survival"] = halfSurvival(characters[i]);
}

function debufChaeacters(characters) {
    for (i = 0; i < characters.length; ++i) {
        console.log(characters[i].name, "probability_of_survival:" + characters[i].probability_of_survival);
    }
}
debufChaeacters(characters);
// document is the DOM, select the #main div
var main = document.getElementById("main");

// Create a new DOM element
var header = document.createElement("h3");
// Append the newly created <h3> element to #main
main.appendChild(header);
// Set the textContent to:
header.textContent = "My Favorite GoT Characters";

characters.forEach(myFunction)

function myFunction(item, index, arr) {
    // Create a new <div> element
    var div1 = document.createElement("div");
    // Append the newly created <div> element to #main
    main.appendChild(div1);

    // Create a new <h5> element
    var name1 = document.createElement("h5");
    // Append the newly created <h5> element to your new div
    div1.appendChild(name1);
    // Set the textContent to the first characters name
    name1.textContent = item["name"];

    // Create a new <p> element
    var survival1= document.createElement("p");
    // Append the newly created <p> element to your new div
    div1.appendChild(survival1);
    // Set the textContent to the first characters survival prob.
    survival1.textContent = "house: " +item["house"];


    // Create a new <p> element
    var survival1= document.createElement("p");
    // Append the newly created <p> element to your new div
    div1.appendChild(survival1);
    // Set the textContent to the first characters survival prob.
    survival1.textContent = "Survival %: " +item["probability_of_survival"] +"%";

    // Create a new <p> element
    var survival1= document.createElement("p");
    // Append the newly created <p> element to your new div
    div1.appendChild(survival1);
    // Set the textContent to the first characters survival prob.
    survival1.textContent = "status: " +item["status"];


}


// **** Your JavaScript code goes here ****
