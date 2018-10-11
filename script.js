var doc = document;

var obj = []

const clickEvent = "click";
const focusEvent = "focus";
const blurEvent = "blur";
const keyPressEvent = "keypress";
const keyDownEvent = "keydown";
const changeEvent = "change";
const enterKeyCode = 13;

(function () {


    var myDay = getElementByClassName("my-day-li");
    myDay.addEventListener(clickEvent, openDayWindow, false);

    var lists = getElementByClassName("lists");
    obj.forEach(function (list) {
        lists.insertBefore(createListElement(list), lists.lastChild.previousSibling);
    });

    var tasks = getElementsByClassName("task");
    for (let index = 0; index < tasks.length - 1; index++) {
        tasks[index].addEventListener(clickEvent, openTaskDescriptionWindow, true);
    }

    var listRows = getElementsByClassName("list");
    for (let index = 0; index < listRows.length - 1; index++) {
        listRows[index].addEventListener(clickEvent, function () { displayTasks(); }, false);
    }

    var slider = getElementByClassName("toggle-slider");
    slider.addEventListener(clickEvent, closeTaskDescriptionWindow, false);
    slider.addEventListener(clickEvent, closeTaskDescriptionWindow, false);

    var deleteTaskButton = getElementByClassName("delete-task");
    deleteTaskButton.addEventListener(clickEvent, deleteCurrentTask, false);
    var deleteListButton = getElementByClassName("delete-list-icon");
    deleteListButton.addEventListener(clickEvent, deleteCurrentList, false);

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

    var taskText = getElementByClassName("task-text");
    taskText.addEventListener(blurEvent, renameTask, false);

    var renameInput = getElementByClassName("list-rename-input");
    renameInput.addEventListener(blurEvent, renameList, false);


    var listInput = getElementByClassName("add-list-input");
    listInput.addEventListener(blurEvent, handleNewListInputBlur, false);

    tasks[tasks.length - 1].addEventListener(onclick, addNewTask, false);
    addInput.addEventListener(keyPressEvent, function (event) {
        var key = event.which || event.keyCode;
        if (key === enterKeyCode) {
            addNewTask();
        }
    });
    listInput.addEventListener(keyPressEvent, function (event) {
        var key = event.which || event.keyCode;
        if (key === enterKeyCode) {
            addNewList();
        }
    });

    var importantButtons = getElementsByClassName("important");

    for (let index = 0; index < importantButtons.length; index++) {
        importantButtons[index].addEventListener(clickEvent, function () {
            toggleBetweenClasses(event.target, "fa-star-o", "fa-star");
        }, false);
    }
    var statusButtons = getElementsByClassName("status");

    for (let index = 0; index < statusButtons.length; index++) {
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
        var task = getTaskObjectById(taskId);
        task.isImportant = !task.isImportant;
        toggleBetweenClasses(doc.getElementById("task" + taskId).lastChild, "fa-star-o", "fa-star");
    }, false);

    taskStatus.addEventListener(clickEvent, function () {
        toggleBetweenClasses(event.target, "fa-circle-thin", "fa-check-circle-o");
        var taskDetails = getElementByClassName("task-details");
        var taskId = taskDetails.id.split("-")[1];
        var task = getTaskObjectById(taskId);
        task.isCompleted = !task.isCompleted;
        toggleBetweenClasses(doc.getElementById("task" + taskId).firstChild, "fa-circle-thin", "fa-check-circle-o");
    }, false);

    var addToDayButton = getElementByClassName("add-to-day");
    addToDayButton.addEventListener(clickEvent, addToDay, false);

    var addDueDateButton = getElementByClassName("add-due-date");
    addDueDateButton.addEventListener(clickEvent, displayDueDate, false);
    var dueDateInput = getElementByClassName("due-date-picker");
    dueDateInput.min = currentDate();
    dueDateInput.addEventListener(changeEvent, addDueDate, false);

    var addReminderDateButton = getElementByClassName("add-reminder-date");
    addReminderDateButton.addEventListener(clickEvent, displayReminderDate, false);
    var reminderDateInput = getElementByClassName("reminder-date-picker");
    reminderDateInput.min = currentDate();
    reminderDateInput.addEventListener(changeEvent, addReminderDate, false);

    var addRepeatButton = getElementByClassName("add-repeat");
    addRepeatButton.addEventListener(clickEvent, displayRepeatInput, false);
    var repeatInput = getElementByClassName("repeat-selection");
    repeatInput.min = currentDate();
    repeatInput.addEventListener(changeEvent, addRepeat, false);

    var noteElement = getElementByClassName("note-card");
    noteElement.addEventListener(blurEvent, addNote, false);

    var sortButton = getElementByClassName("sort-button");
    sortButton.addEventListener(clickEvent, sortList, false);

    getElementByClassName("my-day").classList.add("show-day");

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
    const {name , attribute, parentElement} = element;
    const {className, data , id , eventAction,eventSuccessFunction,useCapture} = attribute;
    var elementObj = doc.createElement(name);
    if (attribute) {
        if (className) {
            elementObj.className = className;
        }
        if (data) {
            elementObj.innerText = data;
        }
        if (id) {
            elementObj.id = id;
        }
    }
    elementObj.addEventListener(eventAction, eventSuccessFunction, useCapture);
    if (parentElement != undefined) {
        parentElement.appendChild(element);
    }
    return elementObj;
}






function openTaskDescriptionWindow() {

    var desc = getElementByClassName("task-description");
    var todo = getElementByClassName("todo");
    var tasks = getElementsByClassName("task");
    var taskStatus = getElementByClassName("task-status");
    var taskImportant = getElementByClassName("task-important");
    var taskDetails = getElementByClassName("task-details");
    var taskId = getTargetTaskId(event.target);
    var taskElement = doc.getElementById(taskId);
    var tasktext = getElementByClassName("task-text");
    var note = getElementByClassName("note-card");
    var addToDayButton = getElementByClassName("add-to-day-button");
    var dueDatePicker = getElementByClassName("due-date-picker");
    var dueDateText = doc.querySelector(".add-due-date p");
    var reminderDatePicker = getElementByClassName("reminder-date-picker");
    var reminderDateText = doc.querySelector(".add-reminder-date p");
    var createdDateInfo = doc.querySelector(".bottom-settings p");
    var repeatButtonText = doc.querySelector(".add-repeat p");
    var repeatSelector = getElementByClassName("repeat-selection");

    tasktext.value = (taskElement.innerText);
    taskStatus.className = taskElement.firstChild.className + " task-status";
    taskImportant.className = taskElement.lastChild.className + " task-important";
    taskObj = getTaskObjectById(taskId.split("task")[1]);
    note.value = taskObj.note;
    if (!taskObj.addToDayDate) {
        addToDayButton.innerText = "Add To Date";
    } else {
        addToDayButton.innerText = "Added To Date - " + currentDate();
    }
    if (!taskObj.dueDate) {
        dueDateText.innerText = "Add Due Date";
        dueDatePicker.classList.remove("display-inline-block");
    } else {
        dueDateText.innerText = "Due Date - ";
        dueDatePicker.classList.add("display-inline-block");
        dueDatePicker.value = taskObj.dueDate;
    }
    if (!taskObj.reminderDate) {
        reminderDateText.innerText = "Remind Me";
        reminderDatePicker.classList.remove("display-inline-block");
    } else {
        reminderDateText.innerText = "Reminder on - ";
        reminderDatePicker.classList.add("display-inline-block");
        reminderDatePicker.value = taskObj.reminderDate;
    }
    if (!taskObj.repeat) {
        repeatButtonText.innerText = "Repeat";
        repeatSelector.classList.remove("display-inline-block");
    } else {
        repeatButtonText.innerText = "Repeat - ";
        repeatSelector.classList.add("display-inline-block");
        repeatSelector.value = taskObj.repeat;
    }
    createdDateInfo.innerText = taskObj.createdDate === currentDate() ? "Created Today" : "Created on" + taskObj.createdDate;
    desc.classList.add('desc-open');
    todo.classList.add('list-open');
    for (let index = 0; index < tasks.length; index++) {
        tasks[index].classList.remove("active");
    }
    taskElement.classList.add("active");
    taskDetails.id = getCurrentListObject().id + "-" + taskId.split("task")[1];
};

function closeTaskDescriptionWindow() {
    var desc = getElementByClassName("task-description");
    var todo = getElementByClassName("todo");
    var tasks = getElementsByClassName("task");
    desc.classList.remove('desc-open');
    todo.classList.remove('list-open');
    for (let index = 0; index < tasks.length; index++) {
        tasks[index].classList.remove("active");
    }
};



function createTaskElement(task) {
    var mainList = getElementByClassName("tasks");
    var circleIcon, starIcon;
    circleIcon = task.isCompleted ? "fa-check-circle-o" : "fa-circle-thin";
    task.isImportant ? starIcon = "fa-star" : starIcon = "fa-star-o";
    newTask = createNewElement({ name: 'li', attribute: { id: "task" + task.id, className: 'task', eventAction: clickEvent, eventSuccessFunction: openTaskDescriptionWindow, useCapture: false } });
    newTask.innerHTML = "<i class='fa " + circleIcon + " status'></i><div class='todo-text'>" + task.name + "</div><i class='fa " + starIcon + " important'></i>";
    mainList.insertBefore(newTask, mainList.lastChild);
    statusIcon = doc.getElementById(("task" + task.id)).firstChild;
    importantIcon = doc.getElementById(("task" + task.id)).lastChild;
    addListenerToStatusButton(statusIcon);
    addListenerToImportantButton(importantIcon);
    getCurrentListElement().lastChild.innerText = getCurrentListObject().numberOfTasks;
}

function createListElement(list) {
    var addListIcon = getElementByClassName("add-list");
    var lists = getElementByClassName("lists");

    newList = createNewElement({ name: 'li', attribute: { id: "list" + list.id, className: 'list', eventAction: clickEvent, eventSuccessFunction: displayTasks, useCapture: false } });
    newList.innerHTML = "<i class='fa fa-list-ul sidenav-blue m-y-auto m-l-20'></i> <p class='m-l-20 sidenav-blue'>" + list.name + "</p> <div class='m-y-auto m-r-10 sidenav-blue'>0</div>";
    lists.insertBefore(newList, lists.lastChild.previousSibling);
    addListIcon.classList.replace("fa-list-ul", "fa-plus");
}




function addNewTask(event) {
    var plusIcon = getElementByClassName("plus-icon");
    var addInput = getElementByClassName("add-input");

    if (plusIcon.classList.contains("fa-plus")) {
        plusIcon.classList.replace("fa-plus", "fa-circle-thin");
    }
        if (event && event.target.NodeName != 'li') {
            addInput.focus();
    } else {
        let task = { id: ++getCurrentListObject().numberOfTasks, name: !addInput.value.trim()?"Untitled Task ( "+findUntitledTaskCount()  + " )":addInput.value, addToDayDate: false, note: "", createdDate: currentDate(), reminderDate: "" };
        createTaskElement(task);
        getCurrentListObject().tasks.push(task);
        addInput.placeholder = "Add a Task";
        addInput.value = "";
    }
};
function addNewList(event) {
    var sidebar = getElementByClassName("sidebar");
    var listInput = getElementByClassName("add-list-input");
    var addListIcon = getElementByClassName("add-list");

    if (addListIcon.classList.contains("fa-plus")) {
        addListIcon.classList.replace("fa-plus", "fa-list-ul");
    }
    if (sidebar.classList.contains("sidebar-collapse")) {
        toggleClass(sidebar, "sidebar-collapse");
    }
    if (event && event.target.NodeName != 'li') {
        listInput.focus();
    } else {
        var list = { id: obj.length + 1, name: !listInput.value.trim()?"Untitled List ( "+findUntitledListCount() + " )":listInput.value , numberOfTasks: 0, tasks: [] };
        createListElement(list);
        obj.push(list);
        listInput.placeholder = "New List";
        listInput.value = "";
    }
};



function deleteCurrentTask() {
    var tasks = getElementsByClassName("task");
    let tasktext = getElementByClassName("task-text");
    if (confirm(tasktext.value + " \nwill be deleted forever.\n You wont be able to undo this action.")) {
        getCurrentListObject().tasks.splice(getCurrentTaskOBject().id - 1, 1);
        getCurrentTaskElement().remove();
        closeTaskDescriptionWindow();
    }
    getCurrentListElement().lastChild.innerText = --getCurrentListObject().numberOfTasks;
};
function deleteCurrentList() {
    var list = getCurrentListObject();
    if (confirm(list.name + " \nwill be deleted forever.\n You wont be able to undo this action.")) {
        obj.splice(list.id, 1);
        doc.getElementById("list" + list.id).remove();
        closeTaskDescriptionWindow();
        openDayWindow();
    };
};


function renameList() {
    var renameInput = getElementByClassName("list-rename-input");
    getCurrentListObject().name = renameInput.value;
    doc.getElementById("list" + getCurrentListObject().id).querySelector("p").innerText = renameInput.value;
}
function renameTask() {
    var taskText = getElementByClassName("task-text");
    getCurrentTaskElement().querySelector("div").innerText = taskText.value;
    getCurrentTaskOBject().name = taskText.value;
}

function handleNewTaskInputBlur() {
    var addButton = getElementByClassName("add-button");
    addButton.classList.remove("active");
    if (getElementByClassName("add-input").value != ""){addNewTask()};
    var plusIcon = getElementByClassName("plus-icon");
    plusIcon.classList.replace("fa-circle-thin", "fa-plus");
}
function handleNewListInputBlur() {
    var addListIcon = getElementByClassName("add-list");
    if (getElementByClassName("add-list-input").value != ""){addNewList()};
    addListIcon.classList.replace("fa-list-ul", "fa-plus");
}
function handleNewTaskInputFocus() {
    var addButton = getElementByClassName("add-button");
    addButton.classList.add("active");
}







function displayTasks() {
    closeTaskDescriptionWindow();
    var id = getTargetListId(event.target);
    var lists = getElementsByClassName("list");
    var mainList = doc.getElementsByClassName("tasks")[0];
    while (mainList.childNodes.length > 1) {
        mainList.removeChild(mainList.firstChild);
    }
    openTasksWindow();
    for (let index = 0; index < lists.length; index++) {
        lists[index].classList.remove("active");
    }
    doc.getElementById(id).classList.add("active");
    obj.forEach(function (list) { list.active = false; });
    obj[id.split("list")[1] - 1].active = true;
    var listHeading = getElementByClassName("list-rename-input");
    listHeading.value = getCurrentListObject().name;
    getCurrentListObject().tasks.forEach(function (task) {
        createTaskElement(task);
    })
}
function displayLists() {
    var lists = getElementByClassName("lists");
    obj.forEach(function (list) {
        list.insertBefore(createListElement(list, false), lists.lastChild.previousSibling);
    });
}




function getTargetTaskId(eventTargetNode) {
    if (eventTargetNode.classList.contains("task")) {
        return eventTargetNode.id;
    } else {
        return eventTargetNode.parentNode.id;
    }
}
function getTargetListId(eventTargetNode) {
    if (eventTargetNode.classList.contains("list")) {
        return eventTargetNode.id;
    } else {
        return eventTargetNode.parentNode.id;
    }
}
function getCurrentListObject() {
    for (let index = 0; index < obj.length; index++) {
        if (obj[index].active) {
            return obj[index];
        }
    }
}
function getCurrentListElement() {
    return doc.querySelector(".lists .active");
}
function getCurrentTaskElement() {
    return doc.querySelector(".tasks .active");
}
function getCurrentTaskOBject() {
    return getCurrentListObject().tasks[getCurrentTaskElement().id.split("task")[1] - 1];
}

function addListenerToImportantButton(element) {
    element.addEventListener(clickEvent, function () {
        toggleBetweenClasses(element, "fa-star-o", "fa-star");
        var elementId = (element.parentElement.id);
        var id = elementId.split("task")[1];
        var selectedTask = getTaskObjectById(id);
        selectedTask.isImportant = !selectedTask.isImportant;
        openTaskDescriptionWindow();
    }, false);
}
function addListenerToStatusButton(element) {
    element.addEventListener(clickEvent, function () {
        toggleBetweenClasses(element, "fa-circle-thin", "fa-check-circle-o");
        var elementId = (element.parentElement.id);
        var id = elementId.split("task")[1];
        var selectedTask = getTaskObjectById(id);
        selectedTask.isCompleted = !selectedTask.isCompleted;
        openTaskDescriptionWindow();
    }, false);
}




function openTasksWindow() {
    var myDay = getElementByClassName("my-day");
    var todo = getElementByClassName("todo");
    todo.classList.add("show-todo");
    myDay.classList.remove("show-day");
    doc.querySelectorAll(".sidebar ul li").forEach(function (listItem) { listItem.classList.remove("active") });
}
function openDayWindow() {
    closeTaskDescriptionWindow();
    var listRows = getElementsByClassName("list");
    for (let index = 0; index < listRows.length; index++) {
        listRows[index].classList.remove("active");
    }
    var myDay = getElementByClassName("my-day");
    var todo = getElementByClassName("todo");
    getElementByClassName("my-day-li").classList.add("active");
    todo.classList.remove("show-todo");
    myDay.classList.add("show-day");
    obj.forEach(function(list) { list.tasks.forEach(function (task) {
        if (task.addToDay) {
           createTaskElement(task);
        }
    }) });
}



function getTaskObjectById(id) {
    var currentList = getCurrentListObject();
    for (let index = 0; index < currentList.tasks.length; index++) {
        if (currentList.tasks[index].id == id) {
            return currentList.tasks[index];
        }
    }
}
function addToDay() {
    var currentTask = getCurrentTaskOBject();
    if (!currentTask.addToDayDate) {
        getElementByClassName("add-to-day-button").innerText = "Added To My Day - " + currentDate();
        currentTask.addToDayDate = true;
    } else {
        getElementByClassName("add-to-day-button").innerText = "Add To Day";
        currentTask.addToDayDate = false;
    }
}

function addNote() {
    var currentTask = getCurrentTaskOBject();
    currentTask.note = getElementByClassName("note-card").value;
}


function displayDueDate() {
    var dueDateInput = getElementByClassName("due-date-picker");
    dueDateInput.classList.add("display-inline-block");
}

function addDueDate() {
    getCurrentTaskOBject().dueDate = getElementByClassName("due-date-picker").value;
}

function displayReminderDate() {
    var dueDateInput = getElementByClassName("reminder-date-picker");
    dueDateInput.classList.add("display-inline-block");
}

function addReminderDate() {
    getCurrentTaskOBject().reminderDate = getElementByClassName("reminder-date-picker").value;
}

function displayRepeatInput() {
    var repeatInput = getElementByClassName("repeat-selection");
    repeatInput.classList.add("display-inline-block");
}

function addRepeat() {
    getCurrentTaskOBject().repeat = getElementByClassName("repeat-selection").value;
}

function currentDate() {
    let today = new Date()
    return today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
}

function findUntitledTaskCount() {
    var count = 1;
    getCurrentListObject().tasks.forEach(function (task) {
        if (task.name.includes("Untitled Task")) {
            count++;
        }  
    });
    return count;
}
function findUntitledListCount() {
    var count = 1;
    obj.forEach(function (list) {
        if (list.name.includes("Untitled List")) {
            count++;
        }  
    });
    return count;
}

function sortList() {
    var list, index, isSorted, tasks, isUnordered;
    list = getElementByClassName("tasks");
    isSorted = true;
    while (isSorted) {
        isSorted = false;
        tasks = list.getElementsByTagName("LI");
        for (index = 0; index < (tasks.length - 2); index++) {
            isUnordered = false;
            if (tasks[index].innerHTML.toLowerCase() > tasks[index + 1].innerHTML.toLowerCase()) {
                isUnordered = true;
                break;
            }
        }
        if (isUnordered) {
            tasks[index].parentNode.insertBefore(tasks[index + 1], tasks[index]);
            isSorted = true;
        }
    }
}