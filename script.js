let taskList = document.getElementById("taskList");

// Load tasks on start
window.onload = function () {
  loadTasks();
};

function addTask() {
  let input = document.getElementById("taskInput");
  let taskText = input.value;

  if (taskText === "") return;

  let tasks = getTasks();

  tasks.push({
    text: taskText,
    completed: false
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));

  input.value = "";
  loadTasks();
}

function loadTasks() {
  taskList.innerHTML = "";

  let tasks = getTasks();

  tasks.forEach((task, index) => {
    let li = document.createElement("li");

    let span = document.createElement("span");
    span.textContent = task.text;

    if (task.completed) {
      span.classList.add("completed");
    }

    // ✅ COMPLETE BUTTON
    let completeBtn = document.createElement("button");
    completeBtn.textContent = task.completed ? "Undo" : "Complete";
    // 🔥 ADD THIS HERE
    if (task.completed) {
    completeBtn.style.background = "#f59e0b"; // orange
    } else {
    completeBtn.style.background = "#22c55e"; // green
    }

    completeBtn.onclick = function () {
      toggleComplete(index);
    };

    // ❌ DELETE BUTTON
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";

    deleteBtn.onclick = function () {
      deleteTask(index);
    };

    li.appendChild(span);
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });
}

function toggleComplete(index) {
  let tasks = getTasks();
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

function deleteTask(index) {
  let tasks = getTasks();
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

function getTasks() {
  let tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
}