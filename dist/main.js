(()=>{let t=[];const e=e=>{const n={projectName:e};t.push(n);const o=document.createElement("button");o.classList.add("button-main","button-dash","rounded-corners"),o.innerText=e,document.getElementById("projects-container").insertBefore(o,document.getElementById("project-add-div")),o.addEventListener("click",(function(){d.displayProject(n)}))},n=()=>{console.log("New Todo")},d=(()=>{let t="Inbox";return{currentTab:t,displayInbox:()=>{console.log("Current tab:",t)},displayToday:()=>{t="Today",console.log("Current tab:",t)},displayWeekly:()=>{t="Weekly",console.log("Current tab:",t)},displayProject:e=>{t=e.projectName,console.log("Current tab:",t)},displayProjectAdd:t=>{addDiv=document.getElementById("project-add-div"),addButton='\n        <button id="project-add-btn" class="button-main button-dash rounded-corners">+ Add</button>',confirmationTemplate='\n        <input type="text" id="project-add-input">\n        <div>\n            <button id="project-add-btn-confirm" class="button-main button-dash-secondary rounded-corners">Confirm</button>\n            <button id="project-add-btn-cancel" class="button-main button-dash-secondary rounded-corners">Cancel</button>\n        </div>',t?t&&(addDiv.innerHTML=confirmationTemplate,document.getElementById("project-add-btn-confirm").addEventListener("click",(function(){projectName=document.getElementById("project-add-input").value,""!=projectName?(e(projectName),d.displayProjectAdd(!1)):alert("Project Name Cannot be Empty")})),document.getElementById("project-add-btn-cancel").addEventListener("click",(function(){d.displayProjectAdd(!1)}))):(addDiv.innerHTML=addButton,document.getElementById("project-add-btn").addEventListener("click",(function(){d.displayProjectAdd(!0)})))}}})();document.getElementById("inbox-btn").addEventListener("click",d.displayInbox),document.getElementById("today-btn").addEventListener("click",d.displayToday),document.getElementById("week-btn").addEventListener("click",d.displayWeekly),document.getElementById("project-add-btn").addEventListener("click",(function(){d.displayProjectAdd(!0)})),document.getElementById("todo-add-btn").addEventListener("click",n)})();