let inbox = [];
let projects = [];
let todos = [];

// Handles creation of content and links to storage of content
const contentCreation = (() => {
    const createProject = () => {
        //Todo
        console.log("New Project");
    };
    const createTodo = () => {
        //Todo
        //Todo creation can be linked to whatever tab user is currently on
        //Add todo button will no be displayed within Today and This Week tabs
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
    }
    const displayWeekly = () => {
        //Todo
        console.log("Nav to Weekly tab");
    }
    return{displayInbox, displayToday, displayWeekly};
})();

// event listeners for dashboard tabs
document.getElementById('inbox-btn').addEventListener('click', contentDisplay.displayInbox);
document.getElementById('today-btn').addEventListener('click', contentDisplay.displayToday);
document.getElementById('week-btn').addEventListener('click', contentDisplay.displayWeekly);
// event listener for adding a new project and a new todo
document.getElementById('project-add-btn').addEventListener('click', contentCreation.createProject);
document.getElementById('todo-add-btn').addEventListener('click', contentCreation.createTodo);