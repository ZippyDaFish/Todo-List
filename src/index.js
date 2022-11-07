console.log("Everything seems to be working");

function logButton(){
    console.log("UwU");
}

document.getElementById('inbox-btn').addEventListener('click', logButton);
document.getElementById('today-btn').addEventListener('click', logButton);
document.getElementById('week-btn').addEventListener('click', logButton);

document.getElementById('project-add-btn').addEventListener('click', logButton);