(()=>{const t=()=>{console.log("New Project")},e=()=>{console.log("New Todo")},d={displayInbox:()=>{console.log("Nav to Inbox tab")},displayToday:()=>{console.log("Nav to Today tab")},displayWeekly:()=>{console.log("Nav to Weekly tab")},displayProject:t=>{console.log("Nav to "+t)},displayProjectAdd:e=>{addDiv=document.getElementById("project-add-div"),addButton='\n        <button id="project-add-btn" class="button-dash rounded-corners">+ Add</button>',confirmationTemplate='\n        <input type="text" id="project-add-input">\n        <div>\n            <button id="project-add-btn-confirm" class="button-dash-secondary rounded-corners">Confirm</button>\n            <button id="project-add-btn-cancel" class="button-dash-secondary rounded-corners">Cancel</button>\n        </div>',e?e&&(addDiv.innerHTML=confirmationTemplate,document.getElementById("project-add-btn-confirm").addEventListener("click",t)):(addDiv.innerHTML=addButton,document.getElementById("project-add-btn").addEventListener("click",(function(){d.displayProjectAdd(!1)})))}};document.getElementById("inbox-btn").addEventListener("click",d.displayInbox),document.getElementById("today-btn").addEventListener("click",d.displayToday),document.getElementById("week-btn").addEventListener("click",d.displayWeekly),document.getElementById("0-project-btn").addEventListener("click",(function(){d.displayProject(0)})),document.getElementById("project-add-btn").addEventListener("click",(function(){d.displayProjectAdd(!1)})),document.getElementById("todo-add-btn").addEventListener("click",e)})();