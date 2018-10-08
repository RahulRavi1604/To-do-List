
    var tasks = getElementsByClassName("task");
    var desc = getElementByClassName("task-description");
    var todo = getElementByClassName("todo");
    var slider = getElementByClassName("toggle-slider");
    var list = getElementByClassName("todo");
    var tasktext = getElementByClassName("task-text");
    var deleteButton = getElementByClassName("delete-task");
    var tasktext = getElementByClassName("task-text");
    var plusIcon = getElementByClassName("plus-icon");
    var addInput = getElementByClassName("add-input");
    var collapseButton = getElementByClassName("toggle-collapse");
    var sidebar = getElementByClassName("sidebar");
    var todo = getElementByClassName("todo");
    var addButton = getElementByClassName("add-button");
    var statusButtons = getElementsByClassName("status");
    var importantButtons = getElementsByClassName("important");
    
(function () {

    function init() {

        for (var index = 0; index < tasks.length - 1; index++) {
            tasks[index].addEventListener('click', openTaskDescriptionWindow, true);
        }
        slider.addEventListener('click', closeTaskDescriptionWindow, false);
        deleteButton.addEventListener('click', deleteTask, false);
        plusIcon.addEventListener('click', addNewTask, false);
        collapseButton.addEventListener('click',  function() {
            toggleClass(sidebar, "sidebar-collapse");
            toggleClass(todo, "todo-full-width");
       }, false);
        addInput.addEventListener('focus', inputFocus, false);
        addInput.addEventListener('blur', inputBlur, false);
        tasks[tasks.length - 1].addEventListener("click", addNewTask, false);
        addInput.addEventListener('keypress', function (e) {
            var key = e.which || e.keyCode;
            if (key === 13) {
                add();
            }
        });
        for (var index = 0; index < importantButtons.length; index++) {
            importantButtons[index].addEventListener('click', toggleImportant, false);
        }
        for (var index = 0; index < statusButtons.length; index++) {
            statusButtons[index].addEventListener('click',  function() {
                toggleBetweenClasses(event.target, "fa-circle-thin", "fa-check-circle-o");
           }, false);
        }
    }
    init();
}());

function toggleClass(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className);
    } else {
        element.classList.add(className);
    }
}
function createNewElement(newElement) {
    element = document.createElement(newElement.elementName);
    for (var index = 0; index < newElement.classesToAdd.length; index++) {
        element.classList.add(newElement.classesToAdd[index]);
    }
    if (newElement.parentElement == undefined) {
        return element;
    } else {
        newElement.parentElement.appendChild(element)
        return newElement.parentElement;
    }
}
function getElementByClassName(className) {
    return document.getElementsByClassName(className)[0];
}
function getElementsByClassName(className) {
    return document.getElementsByClassName(className);
}
function createTaskElement(taskInput) {
    var list = document.getElementsByClassName("list")[0];

    function newElement(elementName, classesToAdd, parentNode) {
        this.elementName = elementName,
        this.classesToAdd = classesToAdd,
        this.parentNode = parentNode;
    }

    newTask = createNewElement(new newElement('li',['task']));
    taskStatus = createNewElement(new newElement('button',[], newTask));
    taskStatusIcon = createNewElement(new newElement('i', ['fa', 'fa-circle-thin', "status"], taskStatus));
    taskStatusIcon.addEventListener('click', toggleBetweenClasses(event.target, "fa-circle-thin", "fa-check-circle-o"), false);
    important = createNewElement(new newElement('button',[],newTask));
    importantIcon = createNewElement(new newElement('i', ['fa', 'fa-star-o', "important"], important));
    importantIcon.addEventListener('click', toggleImportant, false);
    newDiv = createNewElement(new newElement('div', ["todo-text"], newTask));
    newText = document.createTextNode(taskInput);
    newDiv.appendChild(newText);

    
    list.insertBefore(newTask, list.lastChild.previousSibling);
    newTask.addEventListener('click', openTaskDescriptionWindow, false);
    var currentListTaskCount = document.querySelector(".sidebar .active div");
    currentListTaskCount.innerHTML = document.getElementsByClassName("task").length - 1;
}



function openTaskDescriptionWindow(evt) {
    if (evt.target.tagName != "BUTTON" && evt.target.tagName != "I") {
        desc.classList.add('desc-open');
        todo.classList.add('list-open');
        tasktext.innerHTML = (evt.target.innerText);
        for (var index = 0; index < tasks.length; index++) {
            tasks[index].classList.remove("active");
        }
    }
    if (evt.target.classList.contains("task")) {
        evt.target.classList.add("active");
    } else if (evt.target.tagName == "DIV") {
        evt.target.parentElement.classList.add("active");
    }
};
function closeTaskDescriptionWindow(evt) {
    var desc = document.getElementsByClassName("task-description")[0];
    desc.classList.remove('desc-open');
    list.classList.remove('list-open');
    for (var index = 0; index < tasks.length; index++) {
        tasks[index].classList.remove("active");
    }
};
function addNewTask(evt) {
    if (plusIcon.classList.contains("fa-plus")) {
        plusIcon.classList.replace("fa-plus", "fa-circle-thin");
    }
    if (addInput.value.trim() === '' || addInput.value === "Add a Task") {
        if (evt != undefined) {
            if (evt.target.NodeName != 'li') {
                document.getElementsByClassName("add-input")[0].focus();
            }
        }
    } else {
        createTaskElement(addInput.value);
        addInput.placeholder = "Add a Task";
        addInput.value = "";
    }
};
function deleteTask(evt) {
    for (var index = 0; index < tasks.length; index++) {
        if (tasks[index].classList.contains("active")) {
            if (confirm(tasktext.innerHTML + " \nwill be deleted forever.\n You wont be able to undo this action.")) {
                tasks[index].style.height = "0%";
                tasks[index].remove();
            }
        }
    }
};


function toggleBetweenClasses(element, firstClass, secondClass) {
    if (element.classList.contains(firstClass)) {
        element.classList.replace(firstClass, secondClass);
    } else {
        element.classList.replace(secondClass, firstClass);
    }
}


function toggleImportant(event) {
    if (event.target.classList.contains("fa-star-o")) {
        event.target.classList.replace("fa-star-o", "fa-star");
    } else {
        event.target.classList.replace("fa-star", "fa-star-o");
    }
}
function inputBlur() {
    addButton.style.display = "none";
    addNewTask();
    plusIcon.classList.replace("fa-circle-thin", "fa-plus");
}
function inputFocus() {
    addButton.style.display = "block";
}


var currentListTaskCount = document.querySelector(".sidebar .active div");
currentListTaskCount.innerHTML = document.getElementsByClassName("task").length - 1;

