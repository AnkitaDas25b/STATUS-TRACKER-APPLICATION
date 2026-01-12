let projects;

// load projects
if (localStorage.getItem("projects")) {//gets saved strings
  projects = JSON.parse(localStorage.getItem("projects"));//converts str to js obj.
} else {
  projects = [];
}

function save() {
  const data = JSON.stringify(projects);//converted into str and stored in data
  localStorage.setItem("projects", data);//setitem(key,value):adds a key-val pair to storage
  render();
}

function addProject() {
  const newProject = {
    name: "New Project",
    tasks: []
  };

  projects.push(newProject);
  save();
}

function deleteProject(index) {
  projects.splice(index, 1);
  save();
}

function addTask(projectIndex) {
  projects[projectIndex].tasks.push({
    title: "New Task",
    status: "To do",
  });
  save();
}

function deleteTask(projectIndex, taskIndex) {
  projects[projectIndex].tasks.splice(taskIndex, 1);
  save();
}

function render() {
  const projectsDiv = document.getElementById("projects");
  projectsDiv.innerHTML = "";

  projects.forEach((project, pIndex) => {//arr.forEach
    const projectDiv = document.createElement("div");
    projectDiv.className = "project";

    projectDiv.innerHTML = `
      <div class="project-header">
        <input value="${project.name}" 
          onchange="projects[${pIndex}].name = this.value; 
           save();" />
        <div>
          <button id="addn" onclick="addTask(${pIndex})">+ Task</button>
          <button id="del" onclick="deleteProject(${pIndex})">Delete</button>
        </div>
      </div>
      <div class="tasks"></div>
    `;

    const tasksDiv = projectDiv.querySelector(".tasks");

    project.tasks.forEach((task, tIndex) => {
      const taskDiv = document.createElement("div");
      taskDiv.className = "task";

      taskDiv.innerHTML = `
        <input value="${task.title}" 
          onchange="projects[${pIndex}].tasks[${tIndex}].title = this.value; 
          save();" />
        <div>
          <select onchange="projects[${pIndex}].tasks[${tIndex}].status = this.value; save();">
            <option value="To do" ${task.status === "To do" ? "selected" : ""}>To do</option>
            <option value="In progress" ${task.status === "In progress" ? "selected" : ""}>In progress</option>
            <option value="Done" ${task.status === "Done" ? "selected" : ""}>Done</option>
          </select>

          <button onclick="deleteTask(${pIndex}, ${tIndex})">✕</button>
        </div>
      `;

      tasksDiv.appendChild(taskDiv);//adds task to project
    });

    projectsDiv.appendChild(projectDiv);//adds project to screen
  });
}

render();//shows everything when page loads
