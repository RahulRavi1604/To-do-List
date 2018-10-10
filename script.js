var doc = document;

var obj = []
var list = {
    id: 0,
    name: "Untitled List",
    numberOfTasks: 0,
    active: false,
    tasks: []
}

var task = {
    id: 0,
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

function List(id, name, numberOfTasks) {
    var newListObj = Object.create(list);
    newListObj.id = id;
    newListObj.name = name;
    newListObj.numberOfTasks = numberOfTasks;
    newListObj.tasks = [];
    newListObj.active = false;
    return newListObj;
}
function Task(id, name) {
    var newTaskObj = Object.create(task);
    newTaskObj.id = id;
    newTaskObj.name = name;
    isImportant = false;
    isChecked = false;
    addToDayDate = "Add To Date";
    note = "";
    return newTaskObj;
}

var clickEvent = "click";
var focusEvent = "focus";
var blurEvent = "blur";
var keyPressEvent = "keypress";
var keyDownEvent = "keydown";





(function() {


    var myDay = getElementByClassName("my-day-li");
    myDay.addEventListener(clickEvent, openDayWindow, false);

    var lists = getElementByClassName("lists");
    obj.forEach(function (list) {
        lists.insertBefore(createListElement(list), lists.lastChild.previousSibling);
    });

    var tasks = getElementsByClassName("task");
    for (var index = 0; index < tasks.length - 1; index++) {
        tasks[index].addEventListener(clickEvent, openTaskDescriptionWindow, true);
    }

    var listRows = getElementsByClassName("list");
    for (var index = 0; index < listRows.length - 1; index++) {
        listRows[index].addEventListener(clickEvent, function () { displayTasks(); }, false);
    }

    var slider = getElementByClassName("toggle-slider");
    slider.addEventListener(clickEvent, closeTaskDescriptionWindow, false);
    slider.addEventListener(clickEvent, closeTaskDescriptionWindow, false);

    var deleteTaskButton = getElementByClassName("delete-task");
    deleteTaskButton.addEventListener(clickEvent, deleteTask, false);
    var deleteListButton = getElementByClassName("delete-list-icon");
    deleteListButton.addEventListener(clickEvent, deleteList, false);

    var plusIcon = getElementByClassName("plus-icon");
    var addListIcon = getElementByClassName("add-list");

    plusIcon.addEventListener(clickEvent, addNewTask, false);
    var addTaskDiv = getElementByClassName("add-task-li");
    addTaskDiv.addEventListener(clickEvent, addNewTask, false);
    addListIcon.addEventListener(clickEvent, addNewList, false);

    var collapseButton = getElementByClassName("toggle-collapse");
    collapseButton.addEventListener(clickEvent, function () {
        toggleClass(getElementByClassName("sidebar"), "sidebar-collapse");
        toggleClass(getElementByClassName("todo"), "todo-full-width");
    }, false);

    var addInput = getElementByClassName("add-input");
    addInput.addEventListener(focusEvent, handleNewTaskInputFocus, false);
    addInput.addEventListener(blurEvent, handleNewTaskInputBlur, false);

    var renameInput = getElementByClassName("list-rename-input");
    renameInput.addEventListener(blurEvent, handleListRenameInputBlur, false);


    var listInput = getElementByClassName("add-list-input");
    listInput.addEventListener(blurEvent, handleNewListInputBlur, false);

    tasks[tasks.length - 1].addEventListener(onclick, addNewTask, false);
    addInput.addEventListener(keyPressEvent, function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) {
            addNewTask();
        }
    });
    listInput.addEventListener(keyPressEvent, function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) {
            addNewList();
        }
    });

    var importantButtons = getElementsByClassName("important");

    for (var index = 0; index < importantButtons.length; index++) {
        importantButtons[index].addEventListener(clickEvent, function () {
            toggleBetweenClasses(event.target, "fa-star-o", "fa-star");
        }, false);
    }
    var statusButtons = getElementsByClassName("status");

    for (var index = 0; index < statusButtons.length; index++) {
        statusButtons[index].addEventListener(clickEvent, function () {
            toggleBetweenClasses(event.target, "fa-circle-thin", "fa-check-circle-o");
        }, false);
    }

    var taskStatus = getElementByClassName("task-status");
    var taskImportant = getElementByClassName("task-important");
    taskImportant.addEventListener(clickEvent, function () {
        toggleBetweenClasses(event.target, "fa-star-o", "fa-star");
        var taskDetails = getElementByClassName("task-details");
        var taskId = taskDetails.id.split("-")[1];
        var task = obtainTaskObjectById(taskId);
        task.isImportant = !task.isImportant;
        toggleBetweenClasses(doc.getElementById("task" + taskId).lastChild, "fa-star-o", "fa-star");
    }, false);

    taskStatus.addEventListener(clickEvent, function () {
        toggleBetweenClasses(event.target, "fa-circle-thin", "fa-check-circle-o");
        var taskDetails = getElementByClassName("task-details");
        var taskId = taskDetails.id.split("-")[1];
        var task = obtainTaskObjectById(taskId);
        task.isChecked = !task.isChecked;
        toggleBetweenClasses(doc.getElementById("task" + taskId).firstChild, "fa-circle-thin", "fa-check-circle-o");
    }, false);

    var addToDayButton = getElementByClassName("add-to-day");
    addToDayButton.addEventListener(clickEvent, addToDay, false);
    var noteElement = getElementByClassName("note-card");
    noteElement.addEventListener(blurEvent, addNote, false);

})();



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



function createNewElement(element) {
    var elementObj = doc.createElement(element.name);
    if (element.attribute) {
        if (element.attribute.class) {
            elementObj.className = element.attribute.class;
        }
        if (element.attribute.data) {
            elementObj.innerText = element.attribute.data;
        }
        if (element.attribute.id) {
            elementObj.id = element.attribute.id;
        }
    }
    elementObj.addEventListener(element.attribute.eventAction, element.attribute.eventSuccessFunction, element.attribute.useCapture);
    if (element.attribute.parentElement != undefined) {
        element.attribute.parentElement.appendChild(element);
    }
    if (element.style) {
        if (element.style.cursor) {
            elementObj.style.cursor = element.style.cursor;
        }
    }
    return elementObj;
}






function openTaskDescriptionWindow(evt) {
    var desc = getElementByClassName("task-description");
    var todo = getElementByClassName("todo");
    var tasks = getElementsByClassName("task");
    var taskStatus = getElementByClassName("task-status");
    var taskImportant = getElementByClassName("task-important");
    var taskDetails = getElementByClassName("task-details");
    var taskId = findTargetTaskId(event.target);
    var taskElement = doc.getElementById(taskId);
    var tasktext = getElementByClassName("task-text");
    var note = getElementByClassName("note-card");
    var addToDayButton = getElementByClassName("add-to-day-button");
    tasktext.innerHTML = (taskElement.innerText);
    taskStatus.className = taskElement.firstChild.className + " task-status";
    taskImportant.className = taskElement.lastChild.className + " task-important";
    taskObj = obtainTaskObjectById(taskId.split("task")[1]);
    note.value = taskObj.note;
    if (taskObj.addToDayDate != "") {
        addToDayButton.innerText =  "Added To Date\n" + taskObj.addToDayDate;
    } else {
        addToDayButton.innerText =  "Add To Date";
    }
    desc.classList.add('desc-open');
    todo.classList.add('list-open');
    for (var index = 0; index < tasks.length; index++) {
        tasks[index].classList.remove("active");
    }
    taskElement.classList.add("active");
    taskDetails.id = findCurrentlist().id + "-" + taskId.split("task")[1];
};
function closeTaskDescriptionWindow() {
    var desc = getElementByClassName("task-description");
    var todo = getElementByClassName("todo");
    var tasks = getElementsByClassName("task");
    desc.classList.remove('desc-open');
    todo.classList.remove('list-open');
    for (var index = 0; index < tasks.length; index++) {
        tasks[index].classList.remove("active");
    }
};



function createTaskElement(task, isCreatedByUser) {
    var mainList = getElementByClassName("tasks");
    var circleIcon, starIcon;
    circleIcon = task.isChecked ? "fa-check-circle-o" : "fa-circle-thin";
    task.isImportant ? starIcon = "fa-star" : starIcon = "fa-star-o";
    newTask = createNewElement({ name: 'li', attribute: { id: "task" + task.id, class: 'task', eventAction: clickEvent, eventSuccessFunction: openTaskDescriptionWindow, useCapture: false } });
    newTask.innerHTML = "<i class='fa " + circleIcon + " status'></i><div class='todo-text'>" + task.name + "</div><i class='fa " + starIcon + " important'></i>";
    mainList.insertBefore(newTask, mainList.lastChild);
    statusIcon = doc.getElementById(("task" + task.id)).firstChild;
    importantIcon = doc.getElementById(("task" + task.id)).lastChild;
    addListenerToStatusButton(statusIcon);
    addListenerToImportantButton(importantIcon);
    doc.getElementById("list" + findCurrentlist().id).lastChild.innerText = findCurrentlist().numberOfTasks;
}

function createListElement(list) {
    var addListIcon = getElementByClassName("add-list");
    var lists = getElementByClassName("lists");

    newList = createNewElement({ name: 'li', attribute: { id: "list" + list.id, class: 'list', eventAction: clickEvent, eventSuccessFunction: displayTasks, useCapture: false } });
    newList.innerHTML = "<i class='fa fa-list-ul sidenav-blue m-y-auto m-l-20'></i> <p class='m-l-20 sidenav-blue'>" + list.name + "</p> <div class='m-y-auto m-r-10 sidenav-blue'>0</div>";
    lists.insertBefore(newList, lists.lastChild.previousSibling);
    addListIcon.classList.replace("fa-list-ul", "fa-plus");
}




function addNewTask(evt) {
    var plusIcon = getElementByClassName("plus-icon");
    var addInput = getElementByClassName("add-input");

    if (plusIcon.classList.contains("fa-plus")) {
        plusIcon.classList.replace("fa-plus", "fa-circle-thin");
    }
    if (addInput.value.trim() === '' || addInput.value === "Add a Task") {
        if (evt && evt.target.NodeName != 'li') {
            addInput.focus();
        }
    } else {
        var task = {id:++findCurrentlist().numberOfTasks,name: addInput.value};
        createTaskElement(task);
        findCurrentlist().tasks.push(task);
        addInput.placeholder = "Add a Task";
        addInput.value = "";
    }
};
function addNewList(evt) {
    var sidebar = getElementByClassName("sidebar");
    var listInput = getElementByClassName("add-list-input");
    var addListIcon = getElementByClassName("add-list");

    if (addListIcon.classList.contains("fa-plus")) {
        addListIcon.classList.replace("fa-plus", "fa-list-ul");
    }
    if (sidebar.classList.contains("sidebar-collapse")) {
        toggleClass(sidebar, "sidebar-collapse");
    }
    if (listInput.value.trim() === '') {
        if (evt != undefined) {
            if (evt.target.NodeName != 'li') {
                listInput.focus();
            }
        }
    } else {
        var list ={id:obj.length + 1, name:listInput.value, numberOfTasks:0};
        createListElement(list);
        obj.push(list);
        listInput.placeholder = "New List";
        listInput.value = "";
    }
};



function deleteTask() {
    var tasks = getElementsByClassName("task");

    for (var index = 0; index < tasks.length; index++) {
        if (tasks[index].classList.contains("active")) {
            var tasktext = getElementByClassName("task-text");
            if (confirm(tasktext.innerHTML + " \nwill be deleted forever.\n You wont be able to undo this action.")) {
                findCurrentlist().tasks.splice(index, 1);
                tasks[index].remove();
                closeTaskDescriptionWindow();
            }
        }
    }
};
function deleteList() {
    var list = findCurrentlist();
    if (confirm(list.name + " \nwill be deleted forever.\n You wont be able to undo this action.")) {
        obj.splice(list.id, 1);
        doc.getElementById("list" + list.id).remove();
        closeTaskDescriptionWindow();
        openDayWindow();
    };
}


function handleListRenameInputBlur() {
    var renameInput = getElementByClassName("list-rename-input");
    findCurrentlist().name = renameInput.value;
    doc.getElementById("list" + findCurrentlist().id).querySelector("p").innerText = renameInput.value;
}
function handleNewTaskInputBlur() {
    var addButton = getElementByClassName("add-button");
    addButton.classList.remove("active");
    addNewTask();
    var plusIcon = getElementByClassName("plus-icon");
    plusIcon.classList.replace("fa-circle-thin", "fa-plus");
}
function handleNewListInputBlur() {
    var addListIcon = getElementByClassName("add-list");
    addNewList();
    addListIcon.classList.replace("fa-list-ul", "fa-plus");
}
function handleNewTaskInputFocus() {
    var addButton = getElementByClassName("add-button");
    addButton.classList.add("active");
}







function displayTasks() {
    closeTaskDescriptionWindow();
    var id = findTargetListId(event.target);
    var lists = getElementsByClassName("list");
    var mainList = doc.getElementsByClassName("tasks")[0];
    while (mainList.childNodes.length > 1) {
        mainList.removeChild(mainList.firstChild);
    }
    openTasksWindow();
    for (var index = 0; index < lists.length ; index++) {
        lists[index].classList.remove("active");
    }
    doc.getElementById(id).classList.add("active");
    obj[id.split("list")[1]].active = true;
    var listHeading = getElementByClassName("list-rename-input");
    listHeading.value = findCurrentlist().name;
    findCurrentlist().tasks.forEach(function (task) {
        createTaskElement(task, false);
    })
}
function displayLists() {
    var lists = getElementByClassName("lists");
    obj.forEach(function (list) {
        list.insertBefore(createListElement(list, false), lists.lastChild.previousSibling);
    });
}




function findTargetTaskId(eventTargetNode) {
    if (eventTargetNode.classList.contains("task")) {
        return eventTargetNode.id;
    } else {
        return eventTargetNode.parentNode.id;
    }
}
function findTargetListId(eventTargetNode) {
    if (eventTargetNode.classList.contains("list")) {
        return eventTargetNode.id;
    } else {
        return eventTargetNode.parentNode.id;
    }
}
function findCurrentlist() {
    for (var index = 0; index < obj.length; index++) {
        if (obj[index].active) {
            return obj[index];
        }
    }
}

function addListenerToImportantButton(element) {
    element.addEventListener(clickEvent, function () {
        toggleBetweenClasses(element, "fa-star-o", "fa-star");
        var elementId = (element.parentElement.id);
        var id = elementId.split("task")[1];
        var selectedTask = obtainTaskObjectById(id);
        selectedTask.isImportant = !selectedTask.isImportant;
        openTaskDescriptionWindow();
    }, false);
}
function addListenerToStatusButton(element) {
    element.addEventListener(clickEvent, function () {
        toggleBetweenClasses(element, "fa-circle-thin", "fa-check-circle-o");
        var elementId = (element.parentElement.id);
        var id = elementId.split("task")[1];
        var selectedTask = obtainTaskObjectById(id);
        selectedTask.isChecked = !selectedTask.isChecked;
        openTaskDescriptionWindow();
    }, false);
}

function openTasksWindow() {
    var myDay = getElementByClassName("my-day");
    myDay.style.display = "none";
    var todo = getElementByClassName("todo");
    todo.style.display = "inline-block";
    doc.querySelectorAll(".sidebar ul li").forEach(function(listItem){listItem.classList.remove("active")});
}
function openDayWindow() {
    closeTaskDescriptionWindow();
    var listRows = getElementsByClassName("list");
    for (var index = 0; index < listRows.length ; index++) {
        listRows[index].classList.remove("active");
    }
    var myDay = getElementByClassName("my-day");
    getElementByClassName("my-day-li").classList.add("active");
    myDay.style.display = "inline-block";
    var todo = getElementByClassName("todo");
    todo.style.display = "none";
}

function obtainTaskObjectById(id) {
    var currentList  = findCurrentlist();
    for (var index = 0 ; index < currentList.tasks.length ; index++) {
        if (currentList.tasks[index].id == id) {
            return currentList.tasks[index];
        }
    }
}

function addToDay() {
    var currentDate = new Date();
    var day = currentDate.getDate()
    var month = currentDate.getMonth() + 1
    var year = currentDate.getFullYear()
    getElementByClassName("add-to-day-button").innerText = "Added To My Day\n" + day+"/"+month+"/"+year+"/";
    findCurrentlist().tasks[doc.querySelector(".tasks .active").id.split("task")[1]-1].addToDayDate =  day+"/"+month+"/"+year+"/";
}

function addNote() {
    findCurrentlist().tasks[doc.querySelector(".tasks .active").id.split("task")[1]-1].note = getElementByClassName("note-card").value;
}