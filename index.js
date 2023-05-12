const formElement = document.querySelector(".form");

const inputElement = document.querySelector(".input");

const ulElement = document.querySelector(".list");

let list = JSON.parse(localStorage.getItem("list"));
if (list) {
  list.forEach((task) => {
    toDoList(task);
  });
}

formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  toDoList();
});

function toDoList(task) {
  let newTask = inputElement.value;
  if (task) {
    newTask = task.name;
  }

  const listElement = document.createElement("li");
  if (task && task.checked) {
    listElement.classList.add("checked");
  }
  listElement.innerText = newTask;
  ulElement.appendChild(listElement);
  inputElement.value = "";
  const checkBtnEl = document.createElement("div");
  checkBtnEl.innerHTML = `
  <i class="fas fa-check-square">
  `;
  listElement.appendChild(checkBtnEl);
  const trashBtnEl = document.createElement("div");
  trashBtnEl.innerHTML = `
  <i class="fas fa-trash"></i>
  `;
  listElement.appendChild(trashBtnEl);

  checkBtnEl.addEventListener("click", () => {
    listElement.classList.toggle("checked");
    updateLocalStorage();
  });

  trashBtnEl.addEventListener("click", () => {
    listElement.remove();
    updateLocalStorage();
  });
  updateLocalStorage();
}

function updateLocalStorage() {
  const listElements = document.querySelectorAll("li");
  list = [];
  listElements.forEach((listElement) => {
    list.push({
      name: listElement.innerText,
      checked: listElement.classList.contains("checked"),
    });
  });
  localStorage.setItem("list", JSON.stringify(list));
}
