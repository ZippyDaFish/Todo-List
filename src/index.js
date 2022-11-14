let inbox = [];
let projects = [];
let todos = [];

// Handles creation of content and links to storage of content
const contentCreation = (() => {
    const createProject = (projectName) => {
        console.log("New Project: " + projectName);
        const newProject = document.createElement("button");
        newProject.classList.add("button-dash", "rounded-corners");
        newProject.innerText = projectName;
        document.getElementById('projects-container').insertBefore(newProject, document.getElementById('project-add-div'));
    };
    const createTodo = () => {
        //Todo
        //Todo creation can be linked to whatever tab user is currently on
        //Add todo button will not be displayed within Today and This Week tabs
        console.log("New Todo");
    };
    return{createProject, createTodo};
})();

// Handles displaying content onto the webpage
const contentDisplay = (() => {
    const displayInbox = () => {
        //Todo
        console.log("Nav to Inbox tab");
    };
    const displayToday = () => {
        //Todo
        console.log("Nav to Today tab");
    };
    const displayWeekly = () => {
        //Todo
        console.log("Nav to Weekly tab");
    };
    const displayProject = (project) => {
        //Todo
        //Navs to given project and displays all Todos within
        console.log("Nav to " + project);
    };
    const displayProjectAdd = (add) => {
        addDiv = document.getElementById('project-add-div');
        addButton = `
        <button id="project-add-btn" class="button-dash rounded-corners">+ Add</button>`
        confirmationTemplate = `
        <input type="text" id="project-add-input">
        <div>
            <button id="project-add-btn-confirm" class="button-dash-secondary rounded-corners">Confirm</button>
            <button id="project-add-btn-cancel" class="button-dash-secondary rounded-corners">Cancel</button>
        </div>`
        if(!add){
            addDiv.innerHTML = addButton;
            document.getElementById('project-add-btn').addEventListener('click', function(){contentDisplay.displayProjectAdd(true)});
        }
        else if(add){
            addDiv.innerHTML = confirmationTemplate;
            document.getElementById('project-add-btn-confirm').addEventListener('click', function(){
                projectName = document.getElementById('project-add-input').value;
                if(projectName == ""){
                    alert("Project Name Cannot be Empty");
                    return;
                }
                contentCreation.createProject(projectName);
                contentDisplay.displayProjectAdd(false);
            });
            document.getElementById('project-add-btn-cancel').addEventListener('click', function(){contentDisplay.displayProjectAdd(false)});
        }
    };
    return{displayInbox, displayToday, displayWeekly, displayProject, displayProjectAdd};
})();

// event listeners for dashboard tabs
document.getElementById('inbox-btn').addEventListener('click', contentDisplay.displayInbox);
document.getElementById('today-btn').addEventListener('click', contentDisplay.displayToday);
document.getElementById('week-btn').addEventListener('click', contentDisplay.displayWeekly);
document.getElementById('0-project-btn').addEventListener('click', function(){ contentDisplay.displayProject(0)});
// event listener for adding a new project and a new todo
document.getElementById('project-add-btn').addEventListener('click', function(){contentDisplay.displayProjectAdd(true)});
document.getElementById('todo-add-btn').addEventListener('click', contentCreation.createTodo);