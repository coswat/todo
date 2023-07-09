const input = document.getElementById("inpTodo");
const todoList = document.getElementById("todo-container");
const btn = document.getElementById("btn-todo");
const deleteAll = document.getElementById("rem-all");

btn.addEventListener("click", (e) => {
  addTodo();
});

deleteAll.addEventListener("click", (e) => {
  removeAll();
});

todoList.addEventListener("click", (e) => {
  if (e.target.tagName == "LI") {
    e.target.classList.toggle("completed");
    saveToStorage();
  }
  if (e.target.tagName == "SPAN") {
    removeTask(e);
  }
});

function addTodo() {
  if (input.value == "") {
    alert("Please enter a task to add");
  } else {
    createTask(input.value);
  }
  input.value = "";
}

function createTask(task) {
  // li node creation
  let li = document.createElement("li");
  li.innerText = task;
  li.classList.add("pending");
  // span node creation
  let btn = document.createElement("span");
  btn.innerHTML = "&#x2715;";
  btn.classList.add("delete");
  // appending
  li.appendChild(btn);
  todoList.appendChild(li);
  saveToStorage();
}

function removeTask(node) {
  let parentNode = node.target.parentNode;
  parentNode.remove();
  saveToStorage();
}

function removeAll() {
  let allTask = document.querySelectorAll(".delete");
  if (allTask.length < 1) {
    alert("No task found to delete");
  }
  allTask.forEach((e) => {
    let parentNode = e.parentNode;
    parentNode.remove();
  });
  saveToStorage();
}

function saveToStorage() {
  let contents = todoList.innerHTML;
  localStorage.setItem("data", contents);
}

function showContents() {
  todoList.innerHTML = localStorage.getItem("data");
}

// show the contents from local storage
showContents();
