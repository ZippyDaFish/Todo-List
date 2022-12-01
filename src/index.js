let todos = [];
let tabs = {
    inbox: [],
    today: [],
    weekly: [],
    projects: []
};

const todoTemplate = `
    <div class="todo-container flex-container rounded-corners">
    <input type="checkbox">
    <p class="text-mid">Title</p>
    <p class="text-mid">Description...</p>
    <p class="text-mid">Date</p>
    </div>
    `;

// Creates project objects
function createProjectObject(name){
    return{
        projectName: name,
        projectTodos: []
    };
}
function createTodoObject(title, date, status){
    return{
        title: title,
        date: date,
        status: status
    };
}

// Handles creation of content and links to storage of content
const contentCreation = (() => {
    const createProject = (projectName) => {
        //create js project
        const projectObject = createProjectObject(projectName);
        tabs.projects.push(projectObject);
        //create HTML project
        const newProject = document.createElement("button");
        newProject.classList.add("button-main", "button-dash", "rounded-corners");
        newProject.innerText = projectName;
        document.getElementById('projects-container').insertBefore(newProject, document.getElementById('project-add-div'));
        newProject.addEventListener('click', function(){contentDisplay.displayProject(projectObject)});
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
    let currentTab = tabs.inbox;
    const displayTab = (tab) => {
        //Todo
        currentTab = tabs.tab;
        console.log("Current tab:", currentTab);
    };
    const displayProject = (project) => {
        //Todo
        //Navs to given project and displays all Todos within
        currentTab = tabs.projects;
        console.log("Current tab:", currentTab);
    };
    const displayProjectAdd = (add) => {
        addDiv = document.getElementById('project-add-div');
        addButton = `
        <button id="project-add-btn" class="button-main button-dash rounded-corners">+ Add</button>`
        confirmationTemplate = `
        <input type="text" id="project-add-input">
        <div>
            <button id="project-add-btn-confirm" class="button-main button-dash-secondary rounded-corners">Confirm</button>
            <button id="project-add-btn-cancel" class="button-main button-dash-secondary rounded-corners">Cancel</button>
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
    return{currentTab, displayTab, displayProject, displayProjectAdd};
})();

// event listeners for dashboard tabs
document.getElementById('inbox-btn').addEventListener('click', contentDisplay.displayTab(tabs.inbox));
document.getElementById('today-btn').addEventListener('click', contentDisplay.displayTab(tabs.today));
document.getElementById('week-btn').addEventListener('click', contentDisplay.displayTab(tabs.weekly));
// event listener for adding a new project and a new todo
document.getElementById('project-add-btn').addEventListener('click', function(){contentDisplay.displayProjectAdd(true)});
document.getElementById('todo-add-btn').addEventListener('click', contentCreation.createTodo);