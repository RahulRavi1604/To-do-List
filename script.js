var tasks = document.getElementsByClassName("task");
for (var i = 0; i < tasks.length - 1; i++) {
    tasks[i].addEventListener('click', open, false);
}
var open = function(evt) {
    var desc = document.getElementsByClassName("task-description")[0];
    var list = document.getElementsByClassName("todo")[0];

    var tasktext = document.getElementsByClassName("task-text")[0];
    tasktext.innerHTML = (evt.target.innerText);

    desc.classList.add('desc-open');
    list.classList.add('list-open');
    for (var i = 0; i < tasks.length; i++) {
        tasks[i].classList.remove("active");
    }
    evt.target.classList.add("active");
    evt.target.parentElement.classList.add("active");
};




var slider = document.getElementsByClassName("toggle-slider")[0];

var close = function(evt) {
    var desc = document.getElementsByClassName("task-description")[0];
    var list = document.getElementsByClassName("todo")[0];
    desc.classList.remove('desc-open');
    list.classList.remove('list-open');
    for (var i = 0; i < tasks.length; i++) {
        tasks[i].classList.remove("active");
    }
};
slider.addEventListener('click', close, false);




var deleteButton = document.getElementsByClassName("delete-task")[0];
var deletefunction = function(evt) {
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].classList.contains("active")) {
            var tasktext = document.getElementsByClassName("task-text")[0];
            if (confirm(tasktext.innerHTML+ " \nwill be deleted forever.\n You wont be able to undo this action.")) {
               tasks[i].remove();
               close();
            }
        }
    }
};
deleteButton.addEventListener('click', deletefunction, false);


var addButton = document.getElementsByClassName("plus-icon")[0];
var addInput = document.getElementsByClassName("add-input")[0];
var add = function(evt) {
    addButton.classList.toggle("fa-circle-thin");
    if (addInput.value.trim() == '') {
        document.getElementsByClassName("add-input")[0].focus();
    } else {
        addTask(addInput.value);
        addInput.value = "Add a Task";
        var tasks = document.getElementsByClassName("task");
for (var i = 0; i < tasks.length - 1; i++) {
    tasks[i].addEventListener('click', open, false);
}
    }
};
addButton.addEventListener('click', add, false);


var addTask = function(taskInput) {
    var list = document.getElementsByClassName("list")[0];

    newTask = document.createElement('li');
    newTask.classList.add("task");
    taskStatus = document.createElement('button');
    taskStatusIcon = document.createElement('i');
    taskStatusIcon.classList.add("fa");
    taskStatusIcon.classList.add("fa-circle-thin");
    taskStatus.appendChild(taskStatusIcon);
    important = document.createElement('button');
    importantIcon = document.createElement('i');
    importantIcon.classList.add("fa");
    importantIcon.classList.add("fa-star-o");
    important.appendChild(importantIcon);
    newDiv = document.createElement('div');
    newText = document.createTextNode(taskInput);
    newDiv.appendChild(newText);
    newTask.appendChild(taskStatus);
    newTask.appendChild(newDiv);
    newTask.appendChild(important);
    list.insertBefore(newTask, list.lastChild.previousSibling);
}