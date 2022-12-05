let tabs = {
    inbox: [],
    today: [],
    weekly: [],
    projects: []
};

let currentTab = "";

const todoTemplate = `
    <div class="todo-container flex-container rounded-corners">
        <input type="checkbox">
        <p class="text-mid">Title</p>
        <p class="text-mid">Description...</p>
        <p class="text-mid">Date</p>
    </div>
    `;

// Creates project objects
function createProjectObject(name, elem){
    return{
        projectElement: elem,
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

// Handles deletion of content on page and in storage
const contentDeletion = (() => {
    const deleteProject = (projectObject) => {
        let projectIndex = tabs.projects.indexOf(projectObject);
        console.log(projectIndex);
        tabs.projects.splice(projectIndex, 1);
        console.log(tabs.projects);
        projectObject.projectElement.remove();
    };
    return{deleteProject};
})();

// Handles creation of content and links to storage of content
const contentCreation = (() => {
    const createProject = (projectName) => {
        //create HTML project
        const newProjectDiv = document.createElement("div");
        document.getElementById('projects-container').insertBefore(newProjectDiv, document.getElementById('project-add-div'));
        newProjectDiv.classList.add("project-container", "flex-container");
        //create project button
        const newProject = document.createElement("button");
        newProject.classList.add("button-main", "rounded-corners", "button-project");
        newProject.innerText = projectName;
        newProject.addEventListener('click', function(){contentDisplay.displayTab(projectObject)});
        newProjectDiv.appendChild(newProject);
        //create project del button
        const newProjectDel = document.createElement("button");
        newProjectDel.classList.add("button-main", "rounded-corners", "button-project-delete");
        newProjectDel.innerText = "X";
        newProjectDel.addEventListener('click', function(){contentDeletion.deleteProject(projectObject)});
        newProjectDiv.appendChild(newProjectDel);
        //create js project
        const projectObject = createProjectObject(projectName, newProjectDiv);
        tabs.projects.push(projectObject);
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
    const displayTab = (tab) => {
        //Todo
        currentTab = tab;
        console.log(currentTab);
        if(currentTab == tabs.today || currentTab == tabs.weekly){
            console.log("Todo add button not displayed");
        }
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
document.getElementById('inbox-btn').addEventListener('click', function(){contentDisplay.displayTab(tabs.inbox)});
document.getElementById('today-btn').addEventListener('click', function(){contentDisplay.displayTab(tabs.today)});
document.getElementById('week-btn').addEventListener('click', function(){contentDisplay.displayTab(tabs.weekly)});
// event listener for adding a new project and a new todo
document.getElementById('project-add-btn').addEventListener('click', function(){contentDisplay.displayProjectAdd(true)});
document.getElementById('todo-add-btn').addEventListener('click', contentCreation.createTodo);