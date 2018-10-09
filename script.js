var doc = document;

var desc = getElementByClassName("task-description");
var todo = getElementByClassName("todo");
var slider = getElementByClassName("toggle-slider");
var tasktext = getElementByClassName("task-text");
var deleteButton = getElementByClassName("delete-task");
var tasktext = getElementByClassName("task-text");
var plusIcon = getElementByClassName("plus-icon");
var addInput = getElementByClassName("add-input");
var collapseButton = getElementByClassName("toggle-collapse");
var sidebar = getElementByClassName("sidebar");
var addButton = getElementByClassName("add-button");
var listInput = getElementByClassName("add-list-input");
var addListIcon = getElementByClassName("add-list");
var lists = getElementByClassName("lists");
var myDay = getElementByClassName("my-day");
var listHeading = getElementByClassName("heading-left");


var listRows = getElementsByClassName("list");
var tasks = getElementsByClassName("task");
var statusButtons = getElementsByClassName("status");
var importantButtons = getElementsByClassName("important");

var obj = []
var list = {
    name: "Untitled List",
    numberOfTasks: 0,
    active: false,
    tasks: []
}

var task = {
    name: "Untitled Task",
    isChecked: false,
    isImportant: false,
    note: "",
    repeat: "",
    addToDayDate: "",
    reminder: "",
    dueDate: "",
    createdDate: "",
}

function List(name, numberOfTasks) {
    var newListObj = Object.create(list);
    newListObj.name = name;
    newListObj.numberOfTasks = numberOfTasks;
    newListObj.tasks = [];
    newListObj.active = false;
    return newListObj;
}
function Task(name) {
    var newTaskObj = Object.create(task);
    newTaskObj.name = name;
    isImportant = false;
    return newTaskObj;
}

function init() {

    obj.forEach(function (list) {
        lists.insertBefore(createListElement(list), lists.lastChild.previousSibling);
    });

    for (var index = 0; index < tasks.length - 1; index++) {
        tasks[index].addEventListener('click', openTaskDescriptionWindow, true);
    }
    for (var index = 0; index < listRows.length - 1; index++) {
        listRows[index].addEventListener('click', function () { displayTasks(); }, false);
    }
    slider.addEventListener('click', closeTaskDescriptionWindow, false);

    slider.addEventListener('click', closeTaskDescriptionWindow, false);
    deleteButton.addEventListener('click', deleteTask, false);
    plusIcon.addEventListener('click', addNewTask, false);
    addListIcon.addEventListener('click', addNewList, false);
    collapseButton.addEventListener('click', function () {
        toggleClass(sidebar, "sidebar-collapse");
        toggleClass(todo, "todo-full-width");
    }, false);
    addInput.addEventListener('focus', handleNewTaskInputFocus, false);
    addInput.addEventListener('blur', handleNewTaskInputBlur, false);
    tasks[tasks.length - 1].addEventListener("click", addNewTask, false);
    addInput.addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) {
            addNewTask();
        }
    });
    listInput.addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) {
            addNewList();
        }
    });
    for (var index = 0; index < importantButtons.length; index++) {
        importantButtons[index].addEventListener('click', function () {toggleBetweenClasses(event.target, "fa-star-o", "fa-star");}, false);
    }
    for (var index = 0; index < statusButtons.length; index++) {
        statusButtons[index].addEventListener('click', function () {toggleBetweenClasses(event.target, "fa-circle-thin", "fa-check-circle-o");}, false);
    }
}
init();




function NewElement(elementName, classesToAdd, parentElement, eventAction, eventSuccessFunction, useCapture) {
    this.elementName = elementName,
    this.classesToAdd = classesToAdd,
    this.parentElement = parentElement;
    this.eventAction = eventAction;
    this.eventSuccessFunction = eventSuccessFunction;
    this.useCapture = useCapture;
}

function createNewElement(newElement) {
    element = doc.createElement(newElement.elementName);
    for (var index = 0; index < newElement.classesToAdd.length; index++) {
        element.classList.add(newElement.classesToAdd[index]);
    }
    element.addEventListener(newElement.eventAction, newElement.eventSuccessFunction, newElement.useCapture);
    if (newElement.parentElement != undefined) {
        newElement.parentElement.appendChild(element);
    }
    return element;
}

function createTaskElement(task, isCreatedByUser) {
    var mainList = doc.getElementsByClassName("tasks")[0];

    newTask = createNewElement(new NewElement('li', ['task'], undefined, 'click', openTaskDescriptionWindow, false));
    newTask.innerHTML = "<button><i class='fa fa-circle-thin status'></i></button><div class='todo-text'>"+task.name+"</div> <button><i class='fa fa-star-o important'></i></button> ";
    mainList.insertBefore(newTask, mainList.lastChild.previousSibling);
    tasks[tasks.length - 2 ].querySelector("i.status").addEventListener('click', function () {toggleBetweenClasses(event.target, "fa-circle-thin", "fa-check-circle-o");}, false);
    tasks[tasks.length - 2 ].querySelector("i.important").addEventListener('click',
        function () {toggleBetweenClasses(event.target, "fa-star-o", "fa-star");findCurrentlist().tasks[findTargetListIndex(event.target.parentNode)+1].isImportant = true;}, false);
    if (isCreatedByUser) {
        findCurrentlist().tasks.push(task);
    }
}

function createListElement(list, isCreatedByUser) {
    newList = createNewElement(new NewElement('li', ["list"], undefined, 'click', displayTasks, false));
    newList.innerHTML = "<i class='fa fa-list-ul sidenav-blue m-y-auto m-l-20'></i> <p class='m-l-20 sidenav-blue'>" + list.name + "</p> <div class='m-y-auto m-r-10 sidenav-blue'></div>";
    lists.insertBefore(newList, lists.lastChild.previousSibling);
    addListIcon.classList.replace("fa-list-ul", "fa-plus");
    if (isCreatedByUser) {
        obj.push(list);
    }
}




function toggleClass(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className);
    } else {
        element.classList.add(className);
    }
}
function toggleBetweenClasses(element, firstClass, secondClass) {
    if (element.classList.contains(firstClass)) {
        element.classList.replace(firstClass, secondClass);
    } else {
        element.classList.replace(secondClass, firstClass);
    }
}
function getElementByClassName(className) {
    return doc.getElementsByClassName(className)[0];
}
function getElementsByClassName(className) {
    return doc.getElementsByClassName(className);
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
function closeTaskDescriptionWindow() {
    var desc = doc.getElementsByClassName("task-description")[0];
    desc.classList.remove('desc-open');
    todo.classList.remove('list-open');
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
                addInput.focus();
            }
        }
    } else {
        createTaskElement(new Task(addInput.value), true);
        addInput.placeholder = "Add a Task";
        addInput.value = "";
    }
};
function addNewList(evt) {
    if (addListIcon.classList.contains("fa-plus")) {
        addListIcon.classList.replace("fa-plus", "fa-list-ul");
    }
    if (sidebar.classList.contains("sidebar-collapse")) {
        toggleClass(sidebar, "sidebar-collapse");
    }
    if (listInput.value.trim() === '' || listInput.value === "New List") {
        if (evt != undefined) {
            if (evt.target.NodeName != 'li') {
                listInput.focus();
            }
        }
    } else {
        createListElement(List(listInput.value, 0), true);
        listInput.placeholder = "New List";
        listInput.value = "";
    }
};



function deleteTask() {
    for (var index = 0; index < tasks.length; index++) {
        if (tasks[index].classList.contains("active")) {
            if (confirm(tasktext.innerHTML + " \nwill be deleted forever.\n You wont be able to undo this action.")) {
                findCurrentlist().tasks.splice(index, 1);
                tasks[index].remove();
                closeTaskDescriptionWindow();
            }
        }
    }
};


function handleNewTaskInputBlur() {
    addButton.style.display = "none";
    addNewTask();
    plusIcon.classList.replace("fa-circle-thin", "fa-plus");
}
function handleNewTaskInputFocus() {
    addButton.style.display = "block";
}







function displayTasks() {
    closeTaskDescriptionWindow();
    obj.forEach(list => {
        list.active = false;
    });
    var index = findTargetListIndex(event.target);
    var mainList = doc.getElementsByClassName("tasks")[0];
    while (mainList.childNodes.length > 2) {
        mainList.removeChild(mainList.firstChild);
    }
    myDay.style.display = "none";
    todo.style.display = "inline-block";
    obj[index].active = true;
    listHeading.innerText = obj[index].name;
    obj[index].tasks.forEach(function (task) {
        createTaskElement(task, false);
    })
}
function displayLists() {
    obj.forEach(function (list) {
        list.insertBefore(createListElement(list, false), lists.lastChild.previousSibling);
    });
}





function findTargetListIndex(eventTargetNode) {
    var target;
    if (eventTargetNode.classList.contains("list")) {
        target = eventTargetNode;
    } else {
        target = eventTargetNode.parentNode;
    }
    var children = target.parentNode.childNodes;
    for (index = 0; index < children.length; index++) {
        if (target == children[index]) {
            return index - 1;
        }
    }
}
function findCurrentlist() {
    var currentList;
    obj.forEach(list => {
        if (list.active) {
           currentList = list;
        }
    });
    return currentList;
}
