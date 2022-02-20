import { getRecommendations } from './mindService.js';

// gets current date to display
const date = new Date().toDateString();


document.getElementById("current-date").innerHTML = date;

//initilizes array of data to be passed to the backend
var data = [];

//deals with the task items that the user inputs
var addItemButton = document.getElementById("add-task");
var taskBox = document.getElementById("task-container");
var input = document.getElementById("input-field");
var nextButton = document.getElementById("next-button");
var changeButton = document.getElementById("change-button");
var toReflectButton = document.getElementById("next-reflect-button");
var topicText = document.getElementById("question-master");

const user = sessionStorage.getItem('user');
let usernameLine = document.getElementById('username')

usernameLine.innerText = "Welcome, " + user + "!";

addItemButton.addEventListener("click", function() {
    var newEntry = document.createElement("p");
    newEntry.classList.add("task-styles");
    newEntry.innerText = input.value;
    taskBox.append(newEntry);
    
    data.push(input.value);
    input.value = "";

    newEntry.addEventListener("click", function() {
        taskBox.removeChild(newEntry);

        console.log(newEntry.innerText);

        for (var i=0; i < data.length; i++) {
            if (data[i] == newEntry.innerText) {
                data.splice(i, 1);
            }
        }

    })

    console.log(data);
});

nextButton.addEventListener("click", function () {
    var add_Page = document.getElementById("add-page-display");
    var addTask = document.getElementById("add-task-block");
    var change_Display = document.getElementById("change-page-display");
    console.log("clicked");

    recommendations = getRecommendations(data)
    .then((r) => {
        
    })

    add_Page.style.display = "none"; 
    addTask.style.display = "none";
    change_Display.style.display = "block";
    topicText.innerText = "Your day plan";
    
});

changeButton.addEventListener("click", function () {
    var add_Page = document.getElementById("add-page-display");
    var addTask = document.getElementById("add-task-block");
    var changeDisplay = document.getElementById("change-page-display");
    topicText.innerText = "What's the plan today?";
    
    add_Page.style.display = "block"; 
    addTask.style.display = "block";
    changeDisplay.style.display = "none";


}); 

toReflectButton.addEventListener("click", function () {
    var submit_Page = document.getElementById("reflection-page-display");
    var changeDisplay = document.getElementById("change-page-display");

    submit_Page.style.display = "block"; 
    changeDisplay.style.display = "none";
    topicText.innerText = "How'd it go today?";
});