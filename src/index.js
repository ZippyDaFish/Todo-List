let tabs = {
    inbox: [],
    today: [],
    weekly: [],
    projects: []
};
let currentTab;

// Creates project objects
function createProjectObject(name, elem){
    return{
        projectElement: elem,
        projectName: name,
        projectTodos: []
    };
}
// Creates todo objects
function createTodoObject(title, date, status, elem){
    return{
        todoElement: elem,
        title: title,
        date: date,
        status: status
    };
}

// Handles deletion of content on page and in storage
const contentDeletion = (() => {
    const deleteProject = (projectObject) => {
        contentDisplay.displayTab(tabs.inbox);
        let projectIndex = tabs.projects.indexOf(projectObject);
        // del project in storage
        tabs.projects.splice(projectIndex, 1);
        // del project in HTML
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
        newProject.addEventListener('click', function(){contentDisplay.displayTab(tabs.projects[tabs.projects.indexOf(projectObject)].projectTodos)});
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
        //create HTML todo
        const newTodoDiv = document.createElement("div");
        document.getElementById("todo-container").insertBefore(newTodoDiv, document.getElementById("todo-add-btn"));
        newTodoDiv.classList.add("todo-container", "flex-container");
        // PLACEHOLDER INFO
        const title = "New Todo"; 
        const date = "4/2/20";

        //create element of todo and set content to user input
        const statusElement = document.createElement("input");
        statusElement.type = "checkbox";
        statusElement.classList.add('todo-checkbox');
        const titleElement = document.createElement("p");
        titleElement.innerText = title;
        const dateElement = document.createElement("p");
        dateElement.innerText = date;
        //append elements to the new div
        newTodoDiv.appendChild(statusElement);
        newTodoDiv.appendChild(titleElement);
        newTodoDiv.appendChild(dateElement);

        //create js todo
        const todoObject = createTodoObject(title, date, false, newTodoDiv);
        currentTab.push(todoObject);
    };
    return{createProject, createTodo};
})();

// Handles displaying content onto the webpage
const contentDisplay = (() => {
    const displayTab = (tab) => {
        // clear tab
        todoContainer = document.getElementById("todo-container");
        todoContainer.innerHTML = "";

        currentTab = tab;
        if(currentTab == tabs.today || currentTab == tabs.weekly){
            console.log("Todo add button not displayed");
            return;
        }
        currentTab.forEach(todo => {
            displayTodo(todo, todoContainer);
        });

        // create and append todo add button to todo container
        todoAddBtn = document.createElement("button");
        todoAddBtn.setAttribute('id','todo-add-btn');
        todoAddBtn.classList.add('todo-container', 'button-todo');
        todoAddBtn.innerText = "+ Add";
        todoAddBtn.addEventListener('click', contentCreation.createTodo);
        todoContainer.appendChild(todoAddBtn);
    };
    const displayTodo = (todo, parent) => {
        parent.appendChild(todo.todoElement);
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
    return{displayTab, displayProjectAdd};
})();

// event listeners for dashboard tabs
document.getElementById('inbox-btn').addEventListener('click', function(){contentDisplay.displayTab(tabs.inbox)});
document.getElementById('today-btn').addEventListener('click', function(){contentDisplay.displayTab(tabs.today)});
document.getElementById('week-btn').addEventListener('click', function(){contentDisplay.displayTab(tabs.weekly)});
// event listener for adding a new project
document.getElementById('project-add-btn').addEventListener('click', function(){contentDisplay.displayProjectAdd(true)});

// display inbox tab on load
contentDisplay.displayTab(tabs.inbox);