var formElement = document.querySelector(".form");
var inputElement = document.querySelector(".input");
var ulElement = document.querySelector(".list");

var list = [];

var savedList = localStorage.getItem("list");
if (savedList) {
  list = JSON.parse(savedList);
  renderList();
}

formElement.addEventListener("submit", function(event) {
  event.preventDefault();
  addTask();
});

function addTask() {
  var newTask = inputElement.value.trim(); 

  if (newTask !== "") {
    list.push({ name: newTask, checked: false }); 
    renderList(); 
    inputElement.value = ""; 
    saveList(); 
  }
}


function renderList() {
  ulElement.innerHTML = ""; 

  list.forEach(function(task, index) {
    var listElement = document.createElement("li");
    listElement.innerText = task.name;

    if (task.checked) {
      listElement.classList.add("checked");
    }

    var checkBtnEl = document.createElement("div");
    checkBtnEl.innerHTML = "<i class='fas fa-check-square'></i>";
    listElement.appendChild(checkBtnEl);

    var trashBtnEl = document.createElement("div");
    trashBtnEl.innerHTML = "<i class='fas fa-trash'></i>";
    listElement.appendChild(trashBtnEl);


    checkBtnEl.addEventListener("click", function() {
      toggleTask(index);
    });


    trashBtnEl.addEventListener("click", function() {
      deleteTask(index);
    });

    ulElement.appendChild(listElement);
  });
}


function toggleTask(index) {
  list[index].checked = !list[index].checked; 
  renderList(); 
  saveList();
}


function deleteTask(index) {
  list.splice(index, 1); 
  renderList();
  saveList(); 
}


function saveList() {
  localStorage.setItem("list", JSON.stringify(list));
}
