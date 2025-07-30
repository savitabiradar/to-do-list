let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `flex justify-between items-center p-3 rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] 
                    ${task.done ? "line-through text-gray-400 bg-white/20 dark:bg-white/10" : "text-black bg-white/80 dark:text-white dark:bg-gray-800"}`;

    li.innerHTML = `
      <span onclick="toggleTask(${index})" class="cursor-pointer font-medium">${task.text}</span>
      <button onclick="deleteTask(${index})" class="text-red-500 hover:text-red-700 text-xl">🗑️</button>
    `;

    taskList.appendChild(li);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (text !== "") {
    tasks.push({ text, done: false });
    input.value = "";
    renderTasks();
  }
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// 🌙 Dark Mode Toggle
const toggleBtn = document.getElementById("toggleTheme");
toggleBtn.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  const currentTheme = document.documentElement.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", currentTheme);
});

// Apply saved theme
if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
}

renderTasks();
