import 'date-fns'

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
    const deleteTodo = (todoObject) => {
        let todoIndex = currentTab.indexOf(todoObject);
        currentTab.splice(todoIndex, 1);
        todoObject.todoElement.remove();
    };
    return{deleteProject, deleteTodo};
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
    const createTodo = (todoTitle) => {
        //create HTML todo
        const newTodoDiv = document.createElement("div");
        document.getElementById("todo-container").insertBefore(newTodoDiv, document.getElementById("todo-add-div"));
        newTodoDiv.classList.add("todo-container", "flex-container", 'rounded-corners');
        // PLACEHOLDER INFO
        const title = todoTitle; 
        const date = "No Date";

        //create element of todo and set content to user input
        const statusElement = document.createElement("input");
        statusElement.type = "checkbox";
        statusElement.classList.add('todo-checkbox');
        const titleElement = document.createElement("p");
        titleElement.innerText = title;
        const dateElement = document.createElement("p");
        dateElement.innerText = date;
        //create delete element
        const delElement = document.createElement("button");
        delElement.innerText = "X";
        delElement.classList.add("button-todo-delete", "rounded-corners");
        delElement.addEventListener('click', function(){contentDeletion.deleteTodo(todoObject)});
        //append elements to the new div
        newTodoDiv.appendChild(statusElement);
        newTodoDiv.appendChild(titleElement);
        newTodoDiv.appendChild(dateElement);
        newTodoDiv.appendChild(delElement);

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
        let todoContainer = document.getElementById("todo-container");
        todoContainer.innerHTML = "";

        currentTab = tab;
        if(currentTab == tabs.today || currentTab == tabs.weekly){
            console.log("Todo add button not displayed");
            return;
        }
        currentTab.forEach(todo => {
            displayTodo(todo, todoContainer);
        });

        let todoAddDiv = document.createElement("div");
        todoAddDiv.setAttribute('id', 'todo-add-div');
        todoAddDiv.classList.add('flex-container', 'rounded-corners');
        todoContainer.appendChild(todoAddDiv);
        displayTodoAdd(false, todoAddDiv);
    };
    const displayTodo = (todo, parent) => {
        parent.appendChild(todo.todoElement);
    };
    const displayTodoAdd = (add) => {
        let addDiv = document.getElementById("todo-add-div");
        const addButton = `
        <button id="todo-add-btn" class="button-todo rounded-corners">+ Add</button>`;
        const confirmationTemplate = `
        <div class="flex-container todo-add-input-wrapper pad-left">
            <input type="text" id="todo-add-input">
            <button id="todo-add-btn-confirm" class="button-main button-dash-secondary rounded-corners">Confirm</button>
            <button id="todo-add-btn-cancel" class="button-main button-dash-secondary rounded-corners">Cancel</button>
        </div>`;
        if(!add){
            addDiv.innerHTML = addButton;
            document.getElementById('todo-add-btn').addEventListener('click', function(){contentDisplay.displayTodoAdd(true)});
        }
        else if(add){
            addDiv.innerHTML = confirmationTemplate;
            document.getElementById('todo-add-btn-confirm').addEventListener('click', function(){
                let todoTitle = document.getElementById('todo-add-input').value;
                if(todoTitle == ""){
                    alert("Todo Title Cannot be Empty");
                    return;
                }
                contentCreation.createTodo(todoTitle);
                contentDisplay.displayTodoAdd(false);
            });
            document.getElementById('todo-add-btn-cancel').addEventListener('click', function(){contentDisplay.displayTodoAdd(false)});
        }
    };
    const displayProjectAdd = (add) => {
        let addDiv = document.getElementById('project-add-div');
        const addButton = `
        <button id="project-add-btn" class="button-main button-dash rounded-corners">+ Add</button>`
        const confirmationTemplate = `
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
                let projectName = document.getElementById('project-add-input').value;
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
    return{displayTab, displayProjectAdd, displayTodoAdd};
})();

// event listeners for dashboard tabs
document.getElementById('inbox-btn').addEventListener('click', function(){contentDisplay.displayTab(tabs.inbox)});
document.getElementById('today-btn').addEventListener('click', function(){contentDisplay.displayTab(tabs.today)});
document.getElementById('week-btn').addEventListener('click', function(){contentDisplay.displayTab(tabs.weekly)});
// event listener for adding a new project
document.getElementById('project-add-btn').addEventListener('click', function(){contentDisplay.displayProjectAdd(true)});

// display inbox tab on load
contentDisplay.displayTab(tabs.inbox);

const newDate = Date('2022-06-12');
console.log(newDate);