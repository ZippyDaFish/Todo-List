console.log("Everything seems to be working");

//temp function to ensure event listeners are working
function logButton(){
    console.log("UwU");
}

// event listeners for dashboard tabs
document.getElementById('inbox-btn').addEventListener('click', logButton);
document.getElementById('today-btn').addEventListener('click', logButton);
document.getElementById('week-btn').addEventListener('click', logButton);
// event listener for adding a new project
document.getElementById('project-add-btn').addEventListener('click', logButton);