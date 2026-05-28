

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const filterButtons = document.querySelectorAll(".filter");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";


// SAVE TASKS
function saveTasks(){
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


// ADD TASK
addTaskBtn.addEventListener("click", () => {

  const text = taskInput.value.trim();

  if(text === ""){
    alert("Task cannot be empty");
    return;
  }

  tasks.push({
    id: Date.now(),
    text: text,
    completed: false
  });

  taskInput.value = "";

  saveTasks();
  renderTasks();

});


// RENDER TASKS
function renderTasks(){

  taskList.innerHTML = "";

  let filteredTasks = tasks;

  if(currentFilter === "active"){
    filteredTasks = tasks.filter(task => !task.completed);
  }

  if(currentFilter === "completed"){
    filteredTasks = tasks.filter(task => task.completed);
  }

  filteredTasks.forEach(task => {

    const taskDiv = document.createElement("div");

    taskDiv.classList.add("task");

    taskDiv.innerHTML = `
    
      <div class="left">
      
        <input type="checkbox" ${task.completed ? "checked" : ""}>

        <span class="${task.completed ? "completed" : ""}">
          ${task.text}
        </span>

      </div>

      <div class="actions">

        <button class="edit-btn">Edit</button>

        <button class="delete-btn">Delete</button>

      </div>
    
    `;

    
    // COMPLETE TASK
    const checkbox = taskDiv.querySelector("input");

    checkbox.addEventListener("change", () => {

      task.completed = checkbox.checked;

      saveTasks();
      renderTasks();

    });


    // DELETE TASK
    const deleteBtn = taskDiv.querySelector(".delete-btn");

    deleteBtn.addEventListener("click", () => {

      tasks = tasks.filter(t => t.id !== task.id);

      saveTasks();
      renderTasks();

    });


    // EDIT TASK
    const editBtn = taskDiv.querySelector(".edit-btn");

    editBtn.addEventListener("click", () => {

      const newText = prompt("Edit Task", task.text);

      if(newText !== null && newText.trim() !== ""){

        task.text = newText.trim();

        saveTasks();
        renderTasks();

      }

    });

    taskList.appendChild(taskDiv);

  });

  updateCount();

}


// FILTERS
filterButtons.forEach(button => {

  button.addEventListener("click", () => {

    filterButtons.forEach(btn => btn.classList.remove("active"));

    button.classList.add("active");

    currentFilter = button.dataset.filter;

    renderTasks();

  });

});


// UPDATE COUNT
function updateCount(){

  const activeTasks = tasks.filter(task => !task.completed).length;

  taskCount.innerText = `${activeTasks} active task(s) remaining`;

}


// INITIAL LOAD
renderTasks();