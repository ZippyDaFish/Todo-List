(()=>{let t,e={inbox:[],today:[],weekly:[],projects:[]};const n=t=>{c.displayTab(e.inbox);let n=e.projects.indexOf(t);e.projects.splice(n,1),t.projectElement.remove()},d=t=>{const d=document.createElement("div");document.getElementById("projects-container").insertBefore(d,document.getElementById("project-add-div")),d.classList.add("project-container","flex-container");const o=document.createElement("button");o.classList.add("button-main","rounded-corners","button-project"),o.innerText=t,o.addEventListener("click",(function(){c.displayTab(e.projects[e.projects.indexOf(i)].projectTodos)})),d.appendChild(o);const a=document.createElement("button");a.classList.add("button-main","rounded-corners","button-project-delete"),a.innerText="X",a.addEventListener("click",(function(){n(i)})),d.appendChild(a);const i={projectElement:d,projectName:t,projectTodos:[]};e.projects.push(i)},o=()=>{const e=document.createElement("div");document.getElementById("todo-container").insertBefore(e,document.getElementById("todo-add-btn")),e.classList.add("todo-container","flex-container");const n="New Todo",d="4/2/20",o=document.createElement("input");o.type="checkbox";const c=document.createElement("p");c.innerText=n;const a=document.createElement("p");a.innerText=d,e.appendChild(o),e.appendChild(c),e.appendChild(a);const i={todoElement:e,title:"New Todo",date:"4/2/20",status:!1};t.push(i)},c={displayTab:n=>{todoContainer=document.getElementById("todo-container"),todoContainer.innerHTML="",t=n,t!=e.today&&t!=e.weekly?(t.forEach((t=>{((t,e)=>{e.appendChild(t.todoElement)})(t,todoContainer)})),todoAddBtn=document.createElement("button"),todoAddBtn.setAttribute("id","todo-add-btn"),todoAddBtn.classList.add("todo-container","button-todo"),todoAddBtn.innerText="+ Add",todoAddBtn.addEventListener("click",o),todoContainer.appendChild(todoAddBtn)):console.log("Todo add button not displayed")},displayProjectAdd:t=>{addDiv=document.getElementById("project-add-div"),addButton='\n        <button id="project-add-btn" class="button-main button-dash rounded-corners">+ Add</button>',confirmationTemplate='\n        <input type="text" id="project-add-input">\n        <div>\n            <button id="project-add-btn-confirm" class="button-main button-dash-secondary rounded-corners">Confirm</button>\n            <button id="project-add-btn-cancel" class="button-main button-dash-secondary rounded-corners">Cancel</button>\n        </div>',t?t&&(addDiv.innerHTML=confirmationTemplate,document.getElementById("project-add-btn-confirm").addEventListener("click",(function(){projectName=document.getElementById("project-add-input").value,""!=projectName?(d(projectName),c.displayProjectAdd(!1)):alert("Project Name Cannot be Empty")})),document.getElementById("project-add-btn-cancel").addEventListener("click",(function(){c.displayProjectAdd(!1)}))):(addDiv.innerHTML=addButton,document.getElementById("project-add-btn").addEventListener("click",(function(){c.displayProjectAdd(!0)})))}};document.getElementById("inbox-btn").addEventListener("click",(function(){c.displayTab(e.inbox)})),document.getElementById("today-btn").addEventListener("click",(function(){c.displayTab(e.today)})),document.getElementById("week-btn").addEventListener("click",(function(){c.displayTab(e.weekly)})),document.getElementById("project-add-btn").addEventListener("click",(function(){c.displayProjectAdd(!0)})),c.displayTab(e.inbox)})();