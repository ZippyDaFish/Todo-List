import { parse, format, isToday, parseISO, isThisWeek} from 'date-fns';

let tabs = {
    inbox: [],
    today: [],
    weekly: [],
    projects: []
};
let currentTab;

function storeProject(project){
    window.localStorage.setItem(project.projectName, JSON.stringify(project));
    console.log("Stored", project.projectName);
}
function storeTodo(todo){
    window.localStorage.setItem(todo.title, JSON.stringify(todo));
    console.log("Stored", todo.title);
}

function loadStoredProjects(storedProjects){
    storedProjects.forEach(project => {
        contentCreation.createProject(project.projectName);
    });
}
function grabLocalStorage(){
    let values = [];
    let keys = Object.keys(localStorage);
    let i = keys.length;

    while(i--){
        values.push(localStorage.getItem(keys[i]));
    }
    // split values into projects and todos
    let storedProjects = [];
    let storedTodos = [];
    values.forEach(item => {
        item = JSON.parse(item);
        if(item.type == 'p'){
            storedProjects.push(item);
        }
        else if(item.type == 't'){
            storedTodos.push(item);
        }
    });
    console.log("Projects:", storedProjects);
    loadStoredProjects(storedProjects);
    console.log("Todos:", storedTodos);
}

function gatherTodosToday(){
    let dailyTodos = [];
    tabs.inbox.forEach(todo => {
        if(isToday(new Date(todo.date))){
            dailyTodos.push(todo);
        }
    });
    tabs.projects.forEach(project => {
        project.projectTodos.forEach(todo => {
            if(isToday(new Date(todo.date))){
                dailyTodos.push(todo);
            }
        });
    });
    return dailyTodos;
}
function gatherTodosWeekly(){
    let weeklyTodos = [];
    tabs.inbox.forEach(todo => {
        if(isThisWeek(new Date(todo.date))){
            weeklyTodos.push(todo);
        }
    });
    tabs.projects.forEach(project => {
        project.projectTodos.forEach(todo => {
            if(isThisWeek(new Date(todo.date))){
                weeklyTodos.push(todo);
            }
        });
    });
    return weeklyTodos;
}

function isValidDate(month, day, year) {
    const parsed = parse(`${month}/${day}/${year}`, 'P', new Date());
    return parsed;
}

// Creates project objects
function createProjectObject(name, elem){
    return{
        type: 'p',
        projectElement: elem,
        projectName: name,
        projectTodos: []
    };
}
// Creates todo objects
function createTodoObject(title, date, status, elem){
    return{
        type: 't',
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
        storeProject(projectObject);
    };
    const createTodo = (todoTitle, newDate) => {
        //create HTML todo
        const newTodoDiv = document.createElement("div");
        document.getElementById("todo-container").insertBefore(newTodoDiv, document.getElementById("todo-add-div"));
        newTodoDiv.classList.add("todo-container", "flex-container", 'rounded-corners');

        const title = todoTitle; 
        let dueDate = format(newDate, 'MM-dd-yyyy');

        //create element of todo and set content to user input
        const statusElement = document.createElement("input");
        statusElement.type = "checkbox";
        statusElement.classList.add('todo-checkbox');
        const titleElement = document.createElement("p");
        titleElement.innerText = title;
        const dateElement = document.createElement("p");
        dateElement.innerText = dueDate;
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
        const todoObject = createTodoObject(title, dueDate, false, newTodoDiv);
        currentTab.push(todoObject);
        storeTodo(todoObject);
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
        if(currentTab == tabs.today){
            let dailyTodos = gatherTodosToday();
            dailyTodos.forEach(todo => {
                displayTodo(todo, todoContainer);
            });
            return;
        }
        if(currentTab == tabs.weekly){
            let weeklyTodos = gatherTodosWeekly();
            weeklyTodos.forEach(todo => {
                displayTodo(todo, todoContainer);
            });
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
            <input type="text" id="todo-add-input" placeholder="Title">
            <div>
                <input type="text" id="date-add-input0" placeholder="mm">
                <input type="text" id="date-add-input1" placeholder="dd">
                <input type="text" id="date-add-input2" placeholder="yyyy">
            </div>
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
                let userDates = [
                    document.getElementById('date-add-input0').value,
                    document.getElementById('date-add-input1').value,
                    document.getElementById('date-add-input2').value
                ]
                let dueDate = isValidDate(userDates[0], userDates[1], userDates[2]);
                if(todoTitle == ""){
                    alert("Todo Title Cannot be Empty");
                    return;
                }
                if(dueDate == "Invalid Date"){
                    alert("Input a Valid Date");
                    return;
                }
                contentCreation.createTodo(todoTitle, dueDate);
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
                // Cancel if project names are the same
                let isSameName = false;
                tabs.projects.forEach(project => {
                    if(projectName == project.projectName){
                        isSameName = true;
                    }
                });
                if(isSameName){
                    alert("Project Names Cannot be the Same");
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

grabLocalStorage();