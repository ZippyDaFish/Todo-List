let projects = [];
let todos = [];

const contentCreation = (() => {
    const createProject = () => {
        //Todo
        console.log("New Project");
    };
    const createTodo = () => {
        //Todo
        console.log("New Todo");
    };
    return{createProject, createTodo};
})();

const contentDisplay = (() => {
    const displayInbox = () => {
        //Todo
    };
    return{displayInbox};
})();

// event listeners for dashboard tabs
document.getElementById('inbox-btn').addEventListener('click', console.log("Meep"));
document.getElementById('today-btn').addEventListener('click', console.log("Meep"));
document.getElementById('week-btn').addEventListener('click', console.log("Meep"));
// event listener for adding a new project and a new todo
document.getElementById('project-add-btn').addEventListener('click', contentCreation.createProject);
document.getElementById('todo-add-btn').addEventListener('click', contentCreation.createTodo);