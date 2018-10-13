var doc = document;
var obj = [];
var List = /** @class */ (function () {
    function List(id, name, numberOfTasks, tasks, active) {
        this.id = id;
        this.name = name;
        "";
        this.numberOfTasks = numberOfTasks;
        this.tasks = tasks;
        this.active = active;
    }
    List.prototype.getId = function () {
        return this.id;
    };
    List.prototype.setId = function (id) {
        this.id = id;
    };
    List.prototype.getName = function () {
        return this.name;
    };
    List.prototype.setName = function (name) {
        this.name = name;
    };
    List.prototype.getNumberOfTasks = function () {
        return this.numberOfTasks;
    };
    List.prototype.setNumberOfTasks = function (numberOfTasks) {
        this.numberOfTasks = numberOfTasks;
    };
    List.prototype.getTasks = function () {
        return this.tasks;
    };
    List.prototype.setTasks = function (tasks) {
        this.tasks = tasks;
    };
    List.prototype.isActive = function () {
        return this.active;
    };
    List.prototype.setActive = function (active) {
        this.active = active;
    };
    return List;
}());
var Task = /** @class */ (function () {
    function Task(id, name, addedToDay, note, createdDate, dueDate, reminderDate, completed, important, repeat) {
        this.id = id;
        this.name = name;
        this.addedToDay = addedToDay;
        this.note = note;
        this.createdDate = createdDate;
        this.dueDate = dueDate;
        this.reminderDate = reminderDate;
        this.completed = completed;
        this.important = important;
        this.repeat = repeat;
    }
    Task.prototype.getId = function () {
        return this.id;
    };
    Task.prototype.setId = function () {
        return this.id;
    };
    Task.prototype.getName = function () {
        return this.name;
    };
    Task.prototype.setName = function (name) {
        this.name = name;
    };
    Task.prototype.isAddedToDay = function () {
        return this.addedToDay;
    };
    Task.prototype.setAddedToDay = function (addedToDay) {
        this.addedToDay = addedToDay;
    };
    Task.prototype.getNote = function () {
        return this.note;
    };
    Task.prototype.setNote = function (note) {
        this.note = note;
    };
    Task.prototype.getCreatedDate = function () {
        return this.createdDate;
    };
    Task.prototype.setCreatedDate = function (createdDate) {
        this.createdDate = createdDate;
    };
    Task.prototype.getDueDate = function () {
        return this.dueDate;
    };
    Task.prototype.setDueDate = function (dueDate) {
        this.dueDate = dueDate;
    };
    Task.prototype.getReminderDate = function () {
        return this.reminderDate;
    };
    Task.prototype.setReminderDate = function (reminderDate) {
        this.reminderDate = reminderDate;
    };
    Task.prototype.isCompleted = function () {
        return this.completed;
    };
    Task.prototype.setCompleted = function (completed) {
        this.completed = completed;
    };
    Task.prototype.isImportant = function () {
        return this.important;
    };
    Task.prototype.setImportant = function (important) {
        this.important = important;
    };
    Task.prototype.getRepeat = function () {
        return this.repeat;
    };
    Task.prototype.setRepeat = function (repeat) {
        this.repeat = repeat;
    };
    return Task;
}());
var clickEvent = 'click';
var focusEvent = 'focus';
var blurEvent = 'blur';
var keyPressEvent = 'keypress';
var keyDownEvent = 'keydown';
var keyUpEvent = 'keyup';
var changeEvent = 'change';
var enterKeyCode = 13;
(function () {
    var myDay = getElementByClassName('my-day-li');
    myDay.addEventListener(clickEvent, openDayWindow, false);
    var slider = getElementByClassName('toggle-slider');
    slider.addEventListener(clickEvent, closeTaskDescriptionWindow, false);
    slider.addEventListener(clickEvent, closeTaskDescriptionWindow, false);
    var deleteTaskButton = getElementByClassName('delete-task');
    deleteTaskButton.addEventListener(clickEvent, deleteCurrentTask, false);
    var deleteListButton = getElementByClassName('delete-list-icon');
    deleteListButton.addEventListener(clickEvent, deleteCurrentList, false);
    var plusIcon = getElementByClassName('plus-icon');
    var addListIcon = getElementByClassName('add-list');
    plusIcon.addEventListener(clickEvent, function () { addNewTask(event); handleNewTaskInputFocus(); }, false);
    addListIcon.addEventListener(clickEvent, addNewList, false);
    var collapseButton = getElementByClassName('toggle-collapse');
    collapseButton.addEventListener(clickEvent, function toggleSidebar() {
        toggleClass(getElementByClassName('sidebar'), 'sidebar-collapse');
        toggleClass(getElementByClassName('todo'), 'todo-full-width');
    }, false);
    var addInput = getElementByClassName('add-input');
    addInput.addEventListener(focusEvent, handleNewTaskInputFocus, false);
    addInput.addEventListener(blurEvent, handleNewTaskInputBlur, false);
    addInput.addEventListener(keyPressEvent, function addTask(event) {
        var key = event.keyCode;
        if (key === enterKeyCode) {
            addNewTask(event);
            handleNewTaskInputFocus();
        }
    });
    var taskText = getElementByClassName('task-text');
    taskText.addEventListener(blurEvent, renameTask, false);
    var renameInput = getElementByClassName('list-rename-input');
    renameInput.addEventListener(blurEvent, renameList, false);
    var listInput = getElementByClassName('add-list-input');
    listInput.addEventListener(blurEvent, handleNewListInputBlur, false);
    listInput.addEventListener(keyPressEvent, function addList(event) {
        var key = event.keyCode;
        if (key === enterKeyCode) {
            addNewList();
        }
    });
    var importantButtons = getElementsByClassName('important');
    for (var index = 0; index < importantButtons.length; index++) {
        importantButtons[index].addEventListener(clickEvent, function () {
            toggleBetweenClasses(event.target, 'fa-star-o', 'fa-star');
        }, false);
    }
    var statusButtons = getElementsByClassName('status');
    for (var index = 0; index < statusButtons.length; index++) {
        statusButtons[index].addEventListener(clickEvent, function () {
            toggleBetweenClasses(event.target, 'fa-circle-thin', 'fa-check-circle-o');
        }, false);
    }
    var taskStatus = getElementByClassName('task-status');
    var taskImportant = getElementByClassName('task-important');
    taskImportant.addEventListener(clickEvent, function (event) {
        toggleBetweenClasses(event.target, 'fa-star-o', 'fa-star');
        var taskDetails = getElementByClassName('task-details');
        var taskId = taskDetails.id.split('-')[1];
        var task = getTaskObjectById(parseInt(taskId));
        task.setImportant(!task.isImportant());
        toggleBetweenClasses(doc.getElementById('task' + taskId).lastChild, 'fa-star-o', 'fa-star');
    }, false);
    taskStatus.addEventListener(clickEvent, function (event) {
        toggleBetweenClasses(event.target, 'fa-circle-thin', 'fa-check-circle-o');
        var taskDetails = getElementByClassName('task-details');
        var taskId = taskDetails.id.split('-')[1];
        var task = getTaskObjectById(parseInt(taskId));
        task.setCompleted(!task.isCompleted());
        toggleBetweenClasses(doc.getElementById('task' + taskId).firstChild, 'fa-circle-thin', 'fa-check-circle-o');
    }, false);
    var addToDayButton = getElementByClassName('add-to-day');
    addToDayButton.addEventListener(clickEvent, addToDay, false);
    var addDueDateButton = getElementByClassName('add-due-date');
    addDueDateButton.addEventListener(clickEvent, displayDueDate, false);
    var dueDateInput = getElementByClassName('due-date-picker');
    dueDateInput.min = moment(currentDate()).format("YYYY-MM-DD");
    dueDateInput.addEventListener(changeEvent, addDueDate, false);
    var addReminderDateButton = getElementByClassName('add-reminder-date');
    addReminderDateButton.addEventListener(clickEvent, displayReminderDate, false);
    var reminderDateInput = getElementByClassName('reminder-date-picker');
    reminderDateInput.min = moment(currentDate()).format("YYYY-MM-DD");
    reminderDateInput.addEventListener(changeEvent, addReminderDate, false);
    var addRepeatButton = getElementByClassName('add-repeat');
    addRepeatButton.addEventListener(clickEvent, displayRepeatInput, false);
    var repeatInput = getElementByClassName('repeat-selection');
    repeatInput.min = moment(currentDate()).format("YYYY-MM-DD");
    repeatInput.addEventListener(changeEvent, addRepeat, false);
    var noteElement = getElementByClassName('note-card');
    noteElement.addEventListener(blurEvent, addNote, false);
    noteElement.addEventListener(keyUpEvent, function () {
        var letterCount = getElementByClassName('letter-count');
        letterCount.innerText = (noteElement.maxLength - noteElement.value.length) + ' characters remaining';
    }, false);
    var sortButton = getElementByClassName('sort-button');
    sortButton.addEventListener(clickEvent, sortList, false);
    getElementByClassName('my-day').classList.add('show-day');
})();
function toggleClass(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className);
    }
    else {
        element.classList.add(className);
    }
}
function toggleBetweenClasses(element, firstClass, secondClass) {
    if (element.classList.contains(firstClass)) {
        element.classList.replace(firstClass, secondClass);
    }
    else {
        element.classList.replace(secondClass, firstClass);
    }
}
;
function getElementByClassName(className) {
    return doc.getElementsByClassName(className)[0];
}
;
function getElementsByClassName(className) {
    return doc.getElementsByClassName(className);
}
;
function createNewElement(element) {
    var name = element.name, attribute = element.attribute, parentElement = element.parentElement;
    var className = attribute.className, data = attribute.data, id = attribute.id, eventAction = attribute.eventAction, eventSuccessFunction = attribute.eventSuccessFunction, useCapture = attribute.useCapture;
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
;
function createTaskElement(task, event) {
    var mainList = getElementByClassName('tasks');
    var circleIcon, starIcon;
    circleIcon = task.isCompleted() ? 'fa-check-circle-o' : 'fa-circle-thin';
    starIcon = task.isImportant() ? 'fa-star' : 'fa-star-o';
    var newTask = createNewElement({
        name: 'li', attribute: {
            id: 'task' + task.getId(), className: 'task',
            eventAction: clickEvent, eventSuccessFunction: openTaskDescriptionWindow, useCapture: false
        }
    });
    newTask.innerHTML = '<i class="fa ' + circleIcon + ' status"></i><div class="todo-text">' + task.getName() +
        '</div><i class="fa ' + starIcon + ' important"></i>';
    mainList.insertBefore(newTask, mainList.lastChild);
    var statusIcon = doc.getElementById(('task' + task.getId())).firstChild;
    var importantIcon = doc.getElementById(('task' + task.getId())).lastChild;
    addListenerToStatusButton(statusIcon, event);
    addListenerToImportantButton(importantIcon, event);
    var numberOfTasksDiv = getCurrentListElement().lastChild;
    numberOfTasksDiv.innerText = String(getCurrentListObject().getNumberOfTasks());
}
;
function createListElement(list) {
    var addListIcon = getElementByClassName('add-list');
    var lists = getElementByClassName('lists');
    var newList = createNewElement({
        name: 'li', attribute: {
            id: 'list' + list.getId(), className: 'list',
            eventAction: clickEvent, eventSuccessFunction: displayTasks, useCapture: false
        }
    });
    newList.innerHTML = '<i class="fa fa-list-ul sidenav-blue m-y-auto m-l-20"></i> <p class="m-l-20 sidenav-blue">' +
        list.getName() + '</p> <div class="m-y-auto m-r-10 sidenav-blue">0</div>';
    lists.insertBefore(newList, lists.lastChild.previousSibling);
    addListIcon.classList.replace('fa-list-ul', 'fa-plus');
}
;
function addNewTask(event) {
    var plusIcon = getElementByClassName('plus-icon');
    var addInput = getElementByClassName('add-input');
    var currentListObj = getCurrentListObject();
    var tasks = currentListObj.getTasks();
    if (plusIcon.classList.contains('fa-plus')) {
        plusIcon.classList.replace('fa-plus', 'fa-circle-thin');
    }
    var task = new Task(currentListObj.getNumberOfTasks() == 0 ? 1 : tasks[currentListObj.getTasks().length - 1].getId() + 1, !addInput.value.trim() ? 'Untitled Task (' + findUntitledTaskCount() + ')' : addInput.value, false, '', moment(new Date()).format("YYYY-MM-DD"), '', '', false, false, '');
    currentListObj.setNumberOfTasks(currentListObj.getNumberOfTasks() + 1);
    createTaskElement(task, event);
    tasks.push(task);
    addInput.placeholder = 'Add a Task';
    addInput.value = '';
}
;
function addNewList() {
    var sidebar = getElementByClassName('sidebar');
    var listInput = getElementByClassName('add-list-input');
    var addListIcon = getElementByClassName('add-list');
    if (addListIcon.classList.contains('fa-plus')) {
        addListIcon.classList.replace('fa-plus', 'fa-list-ul');
    }
    if (sidebar.classList.contains('sidebar-collapse')) {
        toggleClass(sidebar, 'sidebar-collapse');
    }
    var list = new List(obj.length == 0 ? 1 : obj[obj.length - 1].getId() + 1, !listInput.value.trim() ? 'Untitled List' : listInput.value, 0, [], false);
    createListElement(list);
    obj.push(list);
    listInput.placeholder = 'New List';
    listInput.value = '';
}
;
function deleteCurrentTask() {
    var numberOfTasksDiv = getCurrentListElement().lastChild;
    var tasktext = getElementByClassName('task-text');
    if (confirm(tasktext.innerText + ' \nwill be deleted forever.\n You wont be able to undo this action.')) {
        getCurrentListObject().getTasks().splice(getCurrentTaskOBject().getId() - 1, 1);
        getCurrentTaskElement().remove();
        closeTaskDescriptionWindow();
    }
    getCurrentListObject().setNumberOfTasks(getCurrentListObject().getNumberOfTasks() - 1);
    numberOfTasksDiv.innerText = String(getCurrentListObject().getNumberOfTasks());
}
;
function deleteCurrentList() {
    var list = getCurrentListObject();
    if (confirm(list.getName() + ' \nwill be deleted forever.\n You wont be able to undo this action.')) {
        obj.splice(list.getId() - 1, 1);
        doc.getElementById('list' + list.getId()).remove();
        closeTaskDescriptionWindow();
        openDayWindow();
    }
    ;
}
;
function renameList() {
    var renameInput = getElementByClassName('list-rename-input');
    getCurrentListObject().setName(renameInput.value);
    doc.getElementById('list' + getCurrentListObject().getId()).querySelector('p').innerText = renameInput.value;
}
;
function renameTask() {
    var taskText = getElementByClassName('task-text');
    taskText.value = taskText.value ? taskText.value : 'Untitled Task';
    getCurrentTaskElement().querySelector('div').innerText = taskText.value ? taskText.value : 'Untitled Task';
    getCurrentTaskOBject().setName(taskText.value);
}
;
function openTaskDescriptionWindow(event) {
    var desc = getElementByClassName('task-description');
    var todo = getElementByClassName('todo');
    var tasks = getElementsByClassName('task');
    var taskStatus = getElementByClassName('task-status');
    var taskImportant = getElementByClassName('task-important');
    var taskDetails = getElementByClassName('task-details');
    var taskId = getTargetTaskId(event.target);
    var taskElement = doc.getElementById(taskId);
    var tasktext = getElementByClassName('task-text');
    tasktext.value = (taskElement.innerText);
    var currentTaskStatusIcon = taskElement.firstChild;
    var currentTaskImportantIcon = taskElement.lastChild;
    taskStatus.className = currentTaskStatusIcon.className + ' task-status';
    taskImportant.className = currentTaskImportantIcon.className + ' task-important';
    var taskObj = getTaskObjectById(parseInt(taskId.split('task')[1]));
    updateAddToDay(taskObj);
    updateDueDate(taskObj);
    updateReminderDate(taskObj);
    updateRepeatSelection(taskObj);
    updateCreatedDate(taskObj);
    updateNote(taskObj);
    desc.classList.add('desc-open');
    todo.classList.add('list-open');
    for (var index = 0; index < tasks.length; index++) {
        tasks[index].classList.remove('active');
    }
    taskElement.classList.add('active');
    taskDetails.id = getCurrentListObject().getId() + '-' + taskId.split('task')[1];
}
;
function closeTaskDescriptionWindow() {
    var desc = getElementByClassName('task-description');
    var todo = getElementByClassName('todo');
    var tasks = getElementsByClassName('task');
    desc.classList.remove('desc-open');
    todo.classList.remove('list-open');
    for (var index = 0; index < tasks.length; index++) {
        tasks[index].classList.remove('active');
    }
}
;
function handleNewTaskInputBlur() {
    var addButton = getElementByClassName('add-button');
    var addTaskInputElement = getElementByClassName('add-input');
    addButton.classList.remove('active');
    if (addTaskInputElement.value != '') {
        addNewTask(event);
    }
    ;
    var plusIcon = getElementByClassName('plus-icon');
    plusIcon.classList.replace('fa-circle-thin', 'fa-plus');
}
;
function handleNewListInputBlur() {
    var addListIcon = getElementByClassName('add-list');
    var addListInputElement = getElementByClassName('add-list-input');
    if (addListInputElement.value != '') {
        addNewList();
    }
    ;
    addListIcon.classList.replace('fa-list-ul', 'fa-plus');
}
;
function handleNewTaskInputFocus() {
    var addButton = getElementByClassName('add-button');
    addButton.classList.add('active');
    var plusIcon = getElementByClassName('plus-icon');
    toggleBetweenClasses(plusIcon, 'fa-plus', 'fa-circle-thin');
}
;
function displayTasks(event) {
    closeTaskDescriptionWindow();
    var id = getTargetListId(event.target);
    var lists = getElementsByClassName('list');
    var mainList = doc.getElementsByClassName('tasks')[0];
    while (mainList.childNodes.length > 1) {
        mainList.removeChild(mainList.firstChild);
    }
    openTasksWindow();
    for (var index = 0; index < lists.length; index++) {
        lists[index].classList.remove('active');
    }
    doc.getElementById(id).classList.add('active');
    obj.forEach(function (list) { list.setActive(false); });
    getListObjectById(parseInt(id.split('list')[1])).setActive(true);
    var listHeading = getElementByClassName('list-rename-input');
    listHeading.value = getCurrentListObject().getName();
    getCurrentListObject().getTasks().forEach(function (task) {
        createTaskElement(task, event);
    });
}
;
function displayLists() {
    var lists = getElementByClassName('lists');
    obj.forEach(function (list) {
        createListElement(list);
    });
}
;
function getTargetTaskId(eventTargetNode) {
    if (eventTargetNode.classList.contains('task')) {
        return eventTargetNode.id;
    }
    else {
        return eventTargetNode.parentNode.id;
    }
}
;
function getTargetListId(eventTargetNode) {
    if (eventTargetNode.classList.contains('list')) {
        return eventTargetNode.id;
    }
    else {
        return eventTargetNode.parentNode.id;
    }
}
;
function getCurrentListObject() {
    for (var index = 0; index < obj.length; index++) {
        if (obj[index].isActive()) {
            return obj[index];
        }
    }
}
;
function getCurrentListElement() {
    return doc.querySelector('.lists .active');
}
;
function getCurrentTaskElement() {
    return doc.querySelector('.tasks .active');
}
;
function getCurrentTaskOBject() {
    var tasks = getCurrentListObject().getTasks();
    for (var index = 0; index < tasks.length; index++) {
        if (String(tasks[index].getId()) == getCurrentTaskElement().id.split('task')[1]) {
            return tasks[index];
        }
    }
    ;
}
;
function addListenerToImportantButton(element, event) {
    element.addEventListener(clickEvent, function () {
        toggleBetweenClasses(element, 'fa-star-o', 'fa-star');
        var elementId = (element.parentElement.id);
        var id = elementId.split('task')[1];
        var selectedTask = getTaskObjectById(id);
        selectedTask.setImportant(!selectedTask.isImportant());
        openTaskDescriptionWindow(event);
    }, false);
}
;
function addListenerToStatusButton(element, event) {
    element.addEventListener(clickEvent, function () {
        toggleBetweenClasses(element, 'fa-circle-thin', 'fa-check-circle-o');
        var elementId = (element.parentElement.id);
        var id = elementId.split('task')[1];
        var selectedTask = getTaskObjectById(parseInt(id));
        selectedTask.setCompleted(!selectedTask.isCompleted());
        openTaskDescriptionWindow(event);
    }, false);
}
;
function openTasksWindow() {
    var myDay = getElementByClassName('my-day');
    var todo = getElementByClassName('todo');
    todo.classList.add('show-todo');
    myDay.classList.remove('show-day');
    doc.querySelectorAll('.sidebar ul li').forEach(function (listItem) { listItem.classList.remove('active'); });
}
;
function openDayWindow() {
    closeTaskDescriptionWindow();
    var listRows = getElementsByClassName('list');
    for (var index = 0; index < listRows.length; index++) {
        listRows[index].classList.remove('active');
    }
    var myDay = getElementByClassName('my-day');
    var todo = getElementByClassName('todo');
    getElementByClassName('my-day-li').classList.add('active');
    todo.classList.remove('show-todo');
    myDay.classList.add('show-day');
}
;
function getTaskObjectById(id) {
    var currentList = getCurrentListObject();
    for (var index = 0; index < currentList.getTasks().length; index++) {
        if (currentList.getTasks()[index].getId() == id) {
            return currentList.getTasks()[index];
        }
    }
}
;
function getListObjectById(id) {
    for (var index = 0; index < obj.length; index++) {
        if (obj[index].getId() == id) {
            return obj[index];
        }
    }
}
;
function addToDay() {
    var currentTask = getCurrentTaskOBject();
    var addToDayDiv = getElementByClassName('add-to-day-button');
    if (!currentTask.isAddedToDay()) {
        addToDayDiv.innerText = 'Added To My Day - ' + moment(new Date()).format("YYYY-MM-DD");
        currentTask.setAddedToDay(true);
    }
    else {
        addToDayDiv.innerText = 'Add To Day';
        currentTask.setAddedToDay(false);
    }
}
;
function addNote() {
    var currentTask = getCurrentTaskOBject();
    var noteInput = getElementByClassName('note-card');
    currentTask.setNote(noteInput.value);
}
;
function displayDueDate() {
    var dueDateInput = getElementByClassName('due-date-picker');
    dueDateInput.classList.add('display-inline-block');
}
;
function displayReminderDate() {
    var dueDateInput = getElementByClassName('reminder-date-picker');
    dueDateInput.classList.add('display-inline-block');
}
;
function displayRepeatInput() {
    var repeatInput = getElementByClassName('repeat-selection');
    repeatInput.classList.add('display-inline-block');
}
;
function addDueDate() {
    var addDueDateInput = getElementByClassName('due-date-picker');
    getCurrentTaskOBject().setDueDate(moment(addDueDateInput.value, "YYYY-MM-DD", true).format());
}
;
function addReminderDate() {
    var addReminderDateInput = getElementByClassName('reminder-date-picker');
    getCurrentTaskOBject().setReminderDate(moment(addReminderDateInput.value, "YYYY-MM-DD", true).format());
}
;
function addRepeat() {
    var addRepeatInput = getElementByClassName('repeat-selection');
    getCurrentTaskOBject().setRepeat(addRepeatInput.value);
}
;
function findUntitledTaskCount() {
    var count = 1;
    var tasks = getCurrentListObject().getTasks();
    for (var index = 0; index < tasks.length; index++) {
        if (String(count) == tasks[index].getName().substring(tasks[index].getName().lastIndexOf('(') + 1, tasks[index].getName().lastIndexOf(')'))) {
            count++;
        }
        else {
            continue;
        }
    }
    return count;
}
function sortList() {
    var list, index, isSorted, tasks, isUnordered;
    list = getElementByClassName('tasks');
    isSorted = true;
    while (isSorted) {
        isSorted = false;
        tasks = list.getElementsByTagName('LI');
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
;
function updateAddToDay(taskObj) {
    var addToDayButton = getElementByClassName('add-to-day-button');
    if (!taskObj.isAddedToDay()) {
        addToDayButton.innerText = 'Add To Day';
    }
    else {
        addToDayButton.innerText = 'Added To Date - ' + moment(new Date()).format("YYYY-MM-DD");
    }
}
function updateDueDate(taskObj) {
    var dueDatePicker = getElementByClassName('due-date-picker');
    var dueDateText = doc.querySelector('.add-due-date p');
    if (!taskObj.getDueDate()) {
        dueDateText.innerText = 'Add Due Date';
        dueDatePicker.classList.remove('display-inline-block');
    }
    else {
        dueDateText.innerText = 'Due Date - ';
        dueDatePicker.classList.add('display-inline-block');
    }
    dueDatePicker.value = moment(taskObj.getDueDate()).format("YYYY-MM-DD");
}
function updateReminderDate(taskObj) {
    var reminderDatePicker = getElementByClassName('reminder-date-picker');
    var reminderDateText = doc.querySelector('.add-reminder-date p');
    if (!taskObj.getReminderDate()) {
        reminderDateText.innerText = 'Remind Me';
        reminderDatePicker.classList.remove('display-inline-block');
    }
    else {
        reminderDateText.innerText = 'Reminder on - ';
        reminderDatePicker.classList.add('display-inline-block');
    }
    reminderDatePicker.value = moment(taskObj.getReminderDate()).format("YYYY-MM-DD");
}
function updateRepeatSelection(taskObj) {
    var repeatButtonText = doc.querySelector('.add-repeat p');
    var repeatSelector = getElementByClassName('repeat-selection');
    if (!taskObj.getRepeat()) {
        repeatButtonText.innerText = 'Repeat';
        repeatSelector.classList.remove('display-inline-block');
    }
    else {
        repeatButtonText.innerText = 'Repeat - ';
        repeatSelector.classList.add('display-inline-block');
    }
    repeatSelector.value = taskObj.getRepeat();
}
function updateCreatedDate(taskObj) {
    var createdDateInfo = doc.querySelector('.bottom-settings p');
    createdDateInfo.innerText =
        taskObj.getCreatedDate() === moment(currentDate()) ? 'Created Today' : 'Created on ' + taskObj.getCreatedDate();
}
function updateNote(taskObj) {
    var noteInput = getElementByClassName('note-card');
    var letterCount = getElementByClassName('letter-count');
    noteInput.value = taskObj.getNote();
    letterCount.innerText = (noteInput.maxLength - noteInput.value.length) + ' characters remaining';
}
function currentDate() {
    return moment();
}
;
