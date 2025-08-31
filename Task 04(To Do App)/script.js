// constants declared for input button and task list area
const taskInput = document.querySelector("#newtask input");
const taskSection = document.querySelector(".tasks");

// listener for the Enter key used to add a new task
taskInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    createTask();
  }
});

// the onclick event for the 'Add' button
document.querySelector("#push").onclick = function () {
  createTask();
};

// the function that creates a task
function createTask() {
  if (taskInput.value.trim().length === 0) {
    alert("The task field is blank. Enter a task name and try again.");
  } else {
    taskSection.innerHTML += `
      <div class="task">
        <label>
          <input onclick="updateTask(this)" type="checkbox" class="check-task">
          <p>${taskInput.value}</p>
        </label>
        <div class="delete">
          <i class="uil uil-trash"></i>
        </div>
      </div>`;

    taskInput.value = "";

    // Add delete functionality
    const current_tasks = document.querySelectorAll(".delete");
    current_tasks.forEach((btn) => {
      btn.onclick = function () {
        this.parentNode.remove();
      };
    });

    // Handle overflow class
    taskSection.offsetHeight >= 300
      ? taskSection.classList.add("overflow")
      : taskSection.classList.remove("overflow");
  }
}

// function to update task (check/uncheck)
function updateTask(task) {
  const taskText = task.nextElementSibling;
  if (task.checked) {
    taskText.classList.add("checked");
  } else {
    taskText.classList.remove("checked");
  }
}
 