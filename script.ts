var doc = document;

var obj = []
class List {
     id : number;
     name : string;
     numberOfTasks : number;
     tasks : Task[];
     active: boolean;
     constructor(id, name,numberOfTasks,tasks,active) {
        this.id = id;
        this.name = name;
        this.numberOfTasks = numberOfTasks;
        this.tasks = tasks;
        this.active = active;
     }
}
class Task {
     id: number;
     name:string;
     addToDay: boolean;
     note: string;
     createdDate:string;
     dueDate:string;
     reminderDate:string;
     isChecked:boolean;
     isImportant:boolean;
     repeat :string;
     constructor(id, name, addToDay, note, createdDate, dueDate, reminderDate ,isChecked, isImportant, repeat) {
        this.id =  id;
        this.name = name;
        this.addToDay = addToDay;
        this.note =  note;
        this.createdDate = createdDate;
        this.dueDate = dueDate;
        this.reminderDate = reminderDate;
        this.isChecked = isChecked;
        this.isImportant = isImportant;
        this.repeat  = repeat;
     }
}

const clickEvent = 'click';
const focusEvent = 'focus';
const blurEvent = 'blur';
const keyPressEvent = 'keypress';
const keyDownEvent = 'keydown';
const keyUpEvent = 'keyup';
const changeEvent = 'change';
const enterKeyCode = 13;

(function () {


    var myDay = getElementByClassName("my-day-li");
    myDay.addEventListener(clickEvent, openDayWindow, false);

    var tasks = getElementsByClassName("task");
    for (let index = 0; index < tasks.length - 1; index++) {
        tasks[index].addEventListener(clickEvent, openTaskDescriptionWindow, true);
    }

    var listRows = getElementsByClassName("list");
    for (let index = 0; index < listRows.length - 1; index++) {
        listRows[index].addEventListener(clickEvent, displayTasks, false);
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
    collapseButton.addEventListener(clickEvent, function toggleSidebar() {
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

    tasks[tasks.length - 1].addEventListener(clickEvent, addNewTask, false);
    addInput.addEventListener(keyPressEvent, function addTask(event: KeyboardEvent) {
        var key = event.which || event.keyCode;
        if (key === enterKeyCode) {
            addNewTask(event);
        }
    });
    listInput.addEventListener(keyPressEvent, function addList(event: KeyboardEvent) {
        var key = event.which || event.keyCode;
        if (key === enterKeyCode) {
            addNewList(event);
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
    taskImportant.addEventListener(clickEvent, function (event) {
        toggleBetweenClasses(event.target, "fa-star-o", "fa-star");
        var taskDetails = getElementByClassName("task-details");
        var taskId = taskDetails.id.split("-")[1];
        var task = getTaskObjectById(taskId);
        task.isImportant = !task.isImportant;
        toggleBetweenClasses(doc.getElementById("task" + taskId).lastChild, "fa-star-o", "fa-star");
    }, false);

    taskStatus.addEventListener(clickEvent, function (event) {
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
    var dueDateInput = <HTMLInputElement> getElementByClassName("due-date-picker");
    dueDateInput.min = currentDate();
    dueDateInput.addEventListener(changeEvent, addDueDate, false);

    var addReminderDateButton = getElementByClassName("add-reminder-date");
    addReminderDateButton.addEventListener(clickEvent, displayReminderDate, false);
    var reminderDateInput = <HTMLInputElement> getElementByClassName("reminder-date-picker");
    reminderDateInput.min = currentDate();
    reminderDateInput.addEventListener(changeEvent, addReminderDate, false);

    var addRepeatButton = getElementByClassName("add-repeat");
    addRepeatButton.addEventListener(clickEvent, displayRepeatInput, false);
    var repeatInput = <HTMLInputElement> getElementByClassName("repeat-selection");
    repeatInput.min = currentDate();
    repeatInput.addEventListener(changeEvent, addRepeat, false);

    var noteElement = <HTMLInputElement>getElementByClassName("note-card");
    noteElement.addEventListener(blurEvent, addNote, false);
    noteElement.addEventListener(keyUpEvent,
        function () {
            var letterCount = <HTMLDivElement> getElementByClassName("letter-count");
            letterCount.innerText = (noteElement.maxLength - noteElement.value.length) + " characters remaining";
        }, false);


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
};
function toggleBetweenClasses(element, firstClass, secondClass) {
    if (element.classList.contains(firstClass)) {
        element.classList.replace(firstClass, secondClass);
    } else {
        element.classList.replace(secondClass, firstClass);
    }
};
function getElementByClassName(className) {
    return doc.getElementsByClassName(className)[0];
};
function getElementsByClassName(className) {
    return doc.getElementsByClassName(className);
};



function createNewElement(element) {
    const { name, attribute, parentElement } = element;
    const { className, data, id, eventAction, eventSuccessFunction, useCapture } = attribute;
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
};






function openTaskDescriptionWindow(event) {

    var desc = <HTMLElement> getElementByClassName("task-description");
    var todo = <HTMLElement> getElementByClassName("todo");
    var tasks = <HTMLCollection> getElementsByClassName("task");
    var taskStatus = <HTMLElement> getElementByClassName("task-status");
    var taskImportant = <HTMLElement> getElementByClassName("task-important");
    var taskDetails = <HTMLElement> getElementByClassName("task-details");
    var taskId = getTargetTaskId(event.target);
    var taskElement = <HTMLElement> doc.getElementById(taskId);
    var tasktext = <HTMLInputElement> getElementByClassName("task-text");
    var noteInput = <HTMLInputElement>getElementByClassName("note-card");
    var addToDayButton =<HTMLElement> getElementByClassName("add-to-day-button");
    var dueDatePicker =<HTMLInputElement> getElementByClassName("due-date-picker");
    var dueDateText = <HTMLElement>doc.querySelector(".add-due-date p");
    var reminderDatePicker = <HTMLInputElement>getElementByClassName("reminder-date-picker");
    var reminderDateText = <HTMLElement>doc.querySelector(".add-reminder-date p");
    var createdDateInfo = <HTMLElement>doc.querySelector(".bottom-settings p");
    var repeatButtonText =<HTMLElement> doc.querySelector(".add-repeat p");
    var repeatSelector =<HTMLInputElement> getElementByClassName("repeat-selection");
    var letterCount = <HTMLInputElement> getElementByClassName("letter-count");

    tasktext.value = (taskElement.innerText);
    taskStatus.className = taskStatus.className + " task-status";
    taskImportant.className = taskImportant.className + " task-important";
    var taskObj = <Task> getTaskObjectById(taskId.split("task")[1]);
    noteInput.value = taskObj.note;
    if (!taskObj.addToDay) {
        addToDayButton.innerText = "Add To Day";
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
    createdDateInfo.innerText =
        taskObj.createdDate === currentDate() ? "Created Today" : "Created on" + taskObj.createdDate;
    desc.classList.add('desc-open');
    todo.classList.add('list-open');
    for (let index = 0; index < tasks.length; index++) {
        tasks[index].classList.remove("active");
    }
    taskElement.classList.add("active");
    taskDetails.id = getCurrentListObject().id + "-" + taskId.split("task")[1];
    letterCount.innerText = (noteInput.maxLength - noteInput.value.length) + " characters remaining";
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
    var newTask = createNewElement({
        name: 'li', attribute: {
            id: "task" + task.id, className: 'task',
            eventAction: clickEvent, eventSuccessFunction: openTaskDescriptionWindow, useCapture: false
        }
    });
    newTask.innerHTML = "<i class='fa " + circleIcon + " status'></i><div class='todo-text'>" + task.name +
        "</div><i class='fa " + starIcon + " important'></i>";
    mainList.insertBefore(newTask, mainList.lastChild);
    var statusIcon = <HTMLElement>doc.getElementById(("task" + task.id)).firstChild;
    var importantIcon = <HTMLElement>doc.getElementById(("task" + task.id)).lastChild;
    addListenerToStatusButton(statusIcon);
    addListenerToImportantButton(importantIcon);
    var numberOfTasksDiv = <HTMLDivElement>getCurrentListElement().lastChild;
    numberOfTasksDiv.innerText = getCurrentListObject().numberOfTasks;
};

function createListElement(list) {
    var addListIcon = getElementByClassName("add-list");
    var lists = getElementByClassName("lists");

    var newList = createNewElement({
        name: 'li', attribute: {
            id: "list" + list.id, className: 'list',
            eventAction: clickEvent, eventSuccessFunction: displayTasks, useCapture: false
        }
    });
    newList.innerHTML = "<i class='fa fa-list-ul sidenav-blue m-y-auto m-l-20'></i> <p class='m-l-20 sidenav-blue'>" +
        list.name + "</p> <div class='m-y-auto m-r-10 sidenav-blue'>0</div>";
    lists.insertBefore(newList, lists.lastChild.previousSibling);
    addListIcon.classList.replace("fa-list-ul", "fa-plus");
};




function addNewTask(event) {
    var plusIcon = getElementByClassName("plus-icon");
    var addInput = <HTMLInputElement> getElementByClassName("add-input");
    var currentListObj = getCurrentListObject();
    var tasks = currentListObj.tasks;
    if (plusIcon.classList.contains("fa-plus")) {
        plusIcon.classList.replace("fa-plus", "fa-circle-thin");
    }
    if (event && event.target.NodeName != 'li') {
        addInput.focus();
    } else {
        let task = new Task(currentListObj.numberOfTasks == 0 ? 1 : tasks[currentListObj.tasks.length - 1].id + 1,
            !addInput.value.trim() ? "Untitled Task (" + findUntitledTaskCount() + ")" : addInput.value,
             false, "",currentDate(), "","",false,false,"None"
            );
        createTaskElement(task);
        tasks.push(task);
        ++currentListObj.numberOfTasks;
        addInput.placeholder = "Add a Task";
        addInput.value = "";
    }
};
function addNewList(event) {
    var sidebar = getElementByClassName("sidebar");
    var listInput = <HTMLInputElement> getElementByClassName("add-list-input");
    var addListIcon = getElementByClassName("add-list");

    if (addListIcon.classList.contains("fa-plus")) {
        addListIcon.classList.replace("fa-plus", "fa-list-ul");
    }
    if (sidebar.classList.contains("sidebar-collapse")) {
        toggleClass(sidebar, "sidebar-collapse");
    }
    if (event && event.target.NodeName != 'li') {//TODO: Handle event target //QuickFix
        listInput.focus();
    } else {
        var list = new List(obj.length == 0 ? 1 : obj[obj.length - 1].id + 1,
             !listInput.value.trim() ? "Untitled List" : listInput.value, 0 , [],false);
        createListElement(list);
        obj.push(list);
        listInput.placeholder = "New List";
        listInput.value = "";
    }
};



function deleteCurrentTask() {
    var numberOfTasksDiv = <HTMLDivElement> getCurrentListElement().lastChild;
    let tasktext = <HTMLInputElement>getElementByClassName("task-text");
    if (confirm(tasktext.value + " \nwill be deleted forever.\n You wont be able to undo this action.")) {
        getCurrentListObject().tasks.splice(getCurrentTaskOBject().id - 1, 1);
        getCurrentTaskElement().remove();
        closeTaskDescriptionWindow();
    }
    numberOfTasksDiv.innerText = String(--getCurrentListObject().numberOfTasks);
};
function deleteCurrentList() {
    var list = getCurrentListObject();
    if (confirm(list.name + " \nwill be deleted forever.\n You wont be able to undo this action.")) {
        obj.splice(list.id - 1, 1);
        doc.getElementById("list" + list.id).remove();
        closeTaskDescriptionWindow();
        openDayWindow();
    };
};


function renameList() {
    var renameInput = <HTMLInputElement> getElementByClassName("list-rename-input");
    getCurrentListObject().name = renameInput.value;
    doc.getElementById("list" + getCurrentListObject().id).querySelector("p").innerText = renameInput.value;
};
function renameTask() {
    var taskText = <HTMLInputElement> getElementByClassName("task-text");
    taskText.value = taskText.value ? taskText.value : "Untitled Task";
    getCurrentTaskElement().querySelector("div").innerText = taskText.value ? taskText.value : "Untitled Task";
    getCurrentTaskOBject().name = taskText.value;
};

function handleNewTaskInputBlur() {
    var addButton = getElementByClassName("add-button");
    var addTaskInputElement =  <HTMLInputElement> getElementByClassName("add-input");
    addButton.classList.remove("active");
    if (addTaskInputElement.value != "") { addNewTask(event) };
    var plusIcon = getElementByClassName("plus-icon");
    plusIcon.classList.replace("fa-circle-thin", "fa-plus");
};
function handleNewListInputBlur() {
    var addListIcon = getElementByClassName("add-list");
    var addListInputElement =  <HTMLInputElement> getElementByClassName("add-list-input");
    if (addListInputElement.value != "") { addNewList(event) };
    addListIcon.classList.replace("fa-list-ul", "fa-plus");
};
function handleNewTaskInputFocus() {
    var addButton = getElementByClassName("add-button");
    addButton.classList.add("active");
};







function displayTasks(event) {
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
    getListObjectById(id.split("list")[1]).active = true;
    var listHeading = <HTMLInputElement>getElementByClassName("list-rename-input");
    listHeading.value = getCurrentListObject().name;
    getCurrentListObject().tasks.forEach(function (task) {
        createTaskElement(task);
    })
};
function displayLists() {
    var lists = getElementByClassName("lists");
    obj.forEach(function (list) {
        list.insertBefore(createListElement(list), lists.lastChild.previousSibling);
    });
};




function getTargetTaskId(eventTargetNode) : string {
    if (eventTargetNode.classList.contains("task")) {
        return eventTargetNode.id;
    } else {
        return eventTargetNode.parentNode.id;
    }
};
function getTargetListId(eventTargetNode) {
    if (eventTargetNode.classList.contains("list")) {
        return eventTargetNode.id;
    } else {
        return eventTargetNode.parentNode.id;
    }
};
function getCurrentListObject() {
    for (let index = 0; index < obj.length; index++) {
        if (obj[index].active) {
            return obj[index];
        }
    }
};
function getCurrentListElement() {
    return doc.querySelector(".lists .active");
};
function getCurrentTaskElement() {
    return doc.querySelector(".tasks .active");
};
function getCurrentTaskOBject() {
    var tasks = getCurrentListObject().tasks;
    for (let index = 0; index < tasks.length; index++) {
        if (tasks[index].id == getCurrentTaskElement().id.split("task")[1]) {
            return tasks[index];
        }
    };
};

function addListenerToImportantButton(element) {
    element.addEventListener(clickEvent, function () {
        toggleBetweenClasses(element, "fa-star-o", "fa-star");
        var elementId = (element.parentElement.id);
        var id = elementId.split("task")[1];
        var selectedTask = getTaskObjectById(id);
        selectedTask.isImportant = !selectedTask.isImportant;
        openTaskDescriptionWindow(event);
    }, false);
};
function addListenerToStatusButton(element) {
    element.addEventListener(clickEvent, function () {
        toggleBetweenClasses(element, "fa-circle-thin", "fa-check-circle-o");
        var elementId = (element.parentElement.id);
        var id = elementId.split("task")[1];
        var selectedTask = getTaskObjectById(id);
        selectedTask.isCompleted = !selectedTask.isCompleted;
        openTaskDescriptionWindow(event);
    }, false);
};




function openTasksWindow() {
    var myDay = getElementByClassName("my-day");
    var todo = getElementByClassName("todo");
    todo.classList.add("show-todo");
    myDay.classList.remove("show-day");
    doc.querySelectorAll(".sidebar ul li").forEach(function (listItem) { listItem.classList.remove("active") });
};
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
    obj.forEach(function (list) {
        list.tasks.forEach(function (task) {
            if (task.addToDay) {
                createTaskElement(task);
            }
        })
    });
};



function getTaskObjectById(id) {
    var currentList = getCurrentListObject();
    for (let index = 0; index < currentList.tasks.length; index++) {
        if (currentList.tasks[index].id == id) {
            return currentList.tasks[index];
        }
    }
};
function getListObjectById(id) {
    for (let index = 0; index < obj.length; index++) {
        if (obj[index].id == id) {
            return obj[index];
        }
    }
};
function addToDay() {
    var currentTask = getCurrentTaskOBject();
    var addToDayDiv = <HTMLDivElement>getElementByClassName("add-to-day-button");
    if (!currentTask.addToDay) {
        addToDayDiv.innerText = "Added To My Day - " + currentDate();
        currentTask.addToDay = true;
    } else {
        addToDayDiv.innerText = "Add To Day";
        currentTask.addToDay = false;
    }
};

function addNote() {
    var currentTask = getCurrentTaskOBject();
    var noteInput = <HTMLInputElement> getElementByClassName("note-card")
    currentTask.note = noteInput.value;
};


function displayDueDate() {
    var dueDateInput = getElementByClassName("due-date-picker");
    dueDateInput.classList.add("display-inline-block");
};

function addDueDate() {
    var addDueDateInput = <HTMLInputElement> getElementByClassName("due-date-picker");
    getCurrentTaskOBject().dueDate = addDueDateInput.value;
};

function displayReminderDate() {
    var dueDateInput = getElementByClassName("reminder-date-picker");
    dueDateInput.classList.add("display-inline-block");
};

function addReminderDate() {
    var addReminderDateInput = <HTMLInputElement> getElementByClassName("reminder-date-picker");
    getCurrentTaskOBject().reminderDate = addReminderDateInput.value;
};

function displayRepeatInput() {
    var repeatInput = getElementByClassName("repeat-selection");
    repeatInput.classList.add("display-inline-block");
};

function addRepeat() {
    var addRepeatInput = <HTMLInputElement> getElementByClassName("repeat-selection");
    getCurrentTaskOBject().repeat = addRepeatInput.value;
};

function currentDate() {
    let today = new Date();
    return today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
};

function findUntitledTaskCount() {
    var count = 1;
    var tasks = getCurrentListObject().tasks;
    for (let index = 0; index < tasks.length; index++) {
        if (count == tasks[index].name.substring(
            tasks[index].name.lastIndexOf("(") + 1,
            tasks[index].name.lastIndexOf(")"))) {
            count++;
        } else {
            break;
        }
    }
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
};