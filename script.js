const input = document.getElementById("textVal");
const btn = document.getElementById("btn");
const tables = document.getElementsByClassName("tasksSection");
let tasks = [];

if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  display();
}

btn.addEventListener("click", function (e) {
  e.preventDefault();
  const taskName = input.value.trim();
  if (taskName === "") return;
  tasks.push({ name: taskName, status: "progress" });
  saveToLocalStorage();
  display();
  input.value = "";
});

function display() {
  for (let i = 0; i < tables.length; i++) {
    tables[i].innerHTML = "";
  }

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.name;
    li.setAttribute("draggable", "true");
    li.setAttribute("id", index);
    const section = document.querySelector(`.tasksSection[data-type="${task.status}"]`);
    if (section) {
      section.appendChild(li);
    }
    li.addEventListener("dragstart", dragStFunc);
  });
}

for (let i = 0; i < tables.length; i++) {
  tables[i].addEventListener("drop", dropFunc);
  tables[i].addEventListener("dragover", dragOvFunc);
}

function dragStFunc(e) {
  e.dataTransfer.setData("text", e.target.id);
}

function dragOvFunc(e) {
  e.preventDefault();
}

function dropFunc(e) {
  e.preventDefault();
  const draggedId = e.dataTransfer.getData("text");
  const draggedElement = document.getElementById(draggedId);
  const index = parseInt(draggedId, 10);
  const newStatus = this.dataset.type;
  if (tasks[index]) {
    tasks[index].status = newStatus;
  }
  saveToLocalStorage();
  display();
}

function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
