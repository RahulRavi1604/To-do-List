var doc = document;

var obj: List[] = [];

class List {
    private id: number;
    private name: string;
    private numberOfTasks: number;
    private tasks: Task[];
    private active: boolean;
    constructor(id: number, name: string, numberOfTasks: number, tasks: Task[], active: boolean) {
        this.id = id;
        this.name = name;``
        this.numberOfTasks = numberOfTasks;
        this.tasks = tasks;
        this.active = active;
    }
    public getId(): number {
        return this.id;
    }
    public setId(id: number) {
        this.id = id;
    }
    public getName(): string {
        return this.name;
    }
    public setName(name: string) {
        this.name = name;
    }
    public getNumberOfTasks(): number {
        return this.numberOfTasks;
    }
    public setNumberOfTasks(numberOfTasks: number) {
        this.numberOfTasks = numberOfTasks;
    }
    public getTasks(): Task[] {
        return this.tasks;
    }
    public setTasks(tasks: Task[]) {
        this.tasks = tasks;
    }
    public isActive(): boolean {
        return this.active;
    }
    public setActive(active: boolean) {
        this.active = active;
    }
}
class Task {
    private id: number;
    private name: string;
    private addedToDay: boolean;
    private note: string;
    private createdDate: Date;
    private dueDate: Date;
    private reminderDate: Date;
    private completed: boolean;
    private important: boolean;
    private repeat: string;
    constructor(id, name, addedToDay, note, createdDate, dueDate, reminderDate, completed, important, repeat) {
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
    public getId(): number {
        return this.id;
    }
    public setId(): number {
        return this.id;
    }
    public getName(): string {
        return this.name;
    }
    public setName(name: string) {
        this.name = name;
    }
    public isAddedToDay(): boolean {
        return this.addedToDay;
    }
    public setAddedToDay(addedToDay: boolean) {
        this.addedToDay = addedToDay;
    }
    public getNote(): string {
        return this.note;
    }
    public setNote(note: string) {
        this.note = note;
    }
    public getCreatedDate(): Date {
        return this.createdDate;
    }
    public setCreatedDate(createdDate: Date) {
        this.createdDate = createdDate;
    }
    public getDueDate(): Date {
        return this.dueDate;
    }
    public setDueDate(dueDate: Date) {
        this.dueDate = dueDate;
    }
    public getReminderDate(): Date {
        return this.reminderDate;
    }
    public setReminderDate(reminderDate: Date) {
        this.reminderDate = reminderDate;
    }
    public isCompleted(): boolean {
        return this.completed;
    }
    public setCompleted(completed: boolean) {
        this.completed = completed;
    }
    public isImportant(): boolean {
        return this.important;
    }
    public setImportant(important: boolean) {
        this.important = important;
    }
    public getRepeat(): string {
        return this.repeat;
    }
    public setRepeat(repeat: string) {
        this.repeat = repeat;
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
    collapseButton.addEventListener(clickEvent, function toggleSidebar():void {
        toggleClass(getElementByClassName('sidebar'), 'sidebar-collapse');
        toggleClass(getElementByClassName('todo'), 'todo-full-width');
    }, false);

    var addInput = getElementByClassName('add-input');
    addInput.addEventListener(focusEvent, handleNewTaskInputFocus, false);
    addInput.addEventListener(blurEvent, handleNewTaskInputBlur, false);
    addInput.addEventListener(keyPressEvent, function addTask(event: KeyboardEvent):void {
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

    listInput.addEventListener(keyPressEvent, function addList(event: KeyboardEvent):void {
        var key = event.keyCode;
        if (key === enterKeyCode) {
            addNewList();
        }
    });

    var importantButtons = getElementsByClassName('important');

    for (let index = 0; index < importantButtons.length; index++) {
        importantButtons[index].addEventListener(clickEvent, function ():void {
            toggleBetweenClasses(event.target, 'fa-star-o', 'fa-star');
        }, false);
    }
    var statusButtons = getElementsByClassName('status');

    for (let index = 0; index < statusButtons.length; index++) {
        statusButtons[index].addEventListener(clickEvent, function ():void {
            toggleBetweenClasses(event.target, 'fa-circle-thin', 'fa-check-circle-o');
        }, false);
    }
    var taskStatus = getElementByClassName('task-status');
    var taskImportant = getElementByClassName('task-important');
    taskImportant.addEventListener(clickEvent, function (event:MouseEvent):void {
        toggleBetweenClasses(event.target, 'fa-star-o', 'fa-star');
        var taskDetails = getElementByClassName('task-details');
        var taskId = taskDetails.id.split('-')[1];
        var task = getTaskObjectById(parseInt(taskId));
        task.setImportant(!task.isImportant());
        toggleBetweenClasses(doc.getElementById('task' + taskId).lastChild, 'fa-star-o', 'fa-star');
    }, false);

    taskStatus.addEventListener(clickEvent, function (event:MouseEvent):void {
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
    var dueDateInput = <HTMLInputElement>getElementByClassName('due-date-picker');
    dueDateInput.min = moment(currentDate()).format("YYYY-MM-DD");
    dueDateInput.addEventListener(changeEvent, addDueDate, false);

    var addReminderDateButton = getElementByClassName('add-reminder-date');
    addReminderDateButton.addEventListener(clickEvent, displayReminderDate, false);
    var reminderDateInput = <HTMLInputElement>getElementByClassName('reminder-date-picker');
    reminderDateInput.min = moment(currentDate()).format("YYYY-MM-DD");
    reminderDateInput.addEventListener(changeEvent, addReminderDate, false);

    var addRepeatButton = getElementByClassName('add-repeat');
    addRepeatButton.addEventListener(clickEvent, displayRepeatInput, false);
    var repeatInput = <HTMLInputElement>getElementByClassName('repeat-selection');
    repeatInput.min = moment(currentDate()).format("YYYY-MM-DD");
    repeatInput.addEventListener(changeEvent, addRepeat, false);

    var noteElement = <HTMLInputElement>getElementByClassName('note-card');
    noteElement.addEventListener(blurEvent, addNote, false);
    noteElement.addEventListener(keyUpEvent,
        function ():void {
            var letterCount = <HTMLDivElement>getElementByClassName('letter-count');
            letterCount.innerText = (noteElement.maxLength - noteElement.value.length) + ' characters remaining';
        }, false);


    var sortButton = getElementByClassName('sort-button');
    sortButton.addEventListener(clickEvent, sortList, false);

    getElementByClassName('my-day').classList.add('show-day');

})();

function toggleClass(element, className):void {
    if (element.classList.contains(className)) {
        element.classList.remove(className);
    }
    else {
        element.classList.add(className);
    }
}
function toggleBetweenClasses(element, firstClass, secondClass):void {
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



function createTaskElement(task: Task, event) : void {
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
    var statusIcon = <HTMLElement>doc.getElementById(('task' + task.getId())).firstChild;
    var importantIcon = <HTMLElement>doc.getElementById(('task' + task.getId())).lastChild;
    addListenerToStatusButton(statusIcon, event);
    addListenerToImportantButton(importantIcon, event);
    var numberOfTasksDiv = <HTMLDivElement>getCurrentListElement().lastChild;
    numberOfTasksDiv.innerText = String(getCurrentListObject().getNumberOfTasks());
};

function createListElement(list : List):void {
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
};




function addNewTask(event):void {
    var plusIcon = getElementByClassName('plus-icon');
    var addInput = <HTMLInputElement>getElementByClassName('add-input');
    var currentListObj = getCurrentListObject();
    var tasks : Task[] = currentListObj.getTasks();
    if (plusIcon.classList.contains('fa-plus')) {
        plusIcon.classList.replace('fa-plus', 'fa-circle-thin');
    }
    let task = new Task(currentListObj.getNumberOfTasks() == 0 ? 1 : tasks[currentListObj.getTasks().length - 1].getId() + 1,
        !addInput.value.trim() ? 'Untitled Task (' + findUntitledTaskCount() + ')' : addInput.value,
        false, '', moment(new Date()).format("YYYY-MM-DD"), '', '', false, false, ''
    );
    currentListObj.setNumberOfTasks(currentListObj.getNumberOfTasks() + 1);
    createTaskElement(task, event);
    tasks.push(task);
    addInput.placeholder = 'Add a Task';
    addInput.value = '';
};
function addNewList() :void {
    var sidebar = getElementByClassName('sidebar');
    var listInput = <HTMLInputElement>getElementByClassName('add-list-input');
    var addListIcon = getElementByClassName('add-list');

    if (addListIcon.classList.contains('fa-plus')) {
        addListIcon.classList.replace('fa-plus', 'fa-list-ul');
    }
    if (sidebar.classList.contains('sidebar-collapse')) {
        toggleClass(sidebar, 'sidebar-collapse');
    }
    var list = new List(obj.length == 0 ? 1 : obj[obj.length - 1].getId() + 1,
        !listInput.value.trim() ? 'Untitled List' : listInput.value, 0, [], false);
    createListElement(list);
    obj.push(list);
    listInput.placeholder = 'New List';
    listInput.value = '';
};



function deleteCurrentTask() :void {
    var numberOfTasksDiv = <HTMLDivElement>getCurrentListElement().lastChild;
    let tasktext = <HTMLDivElement>getElementByClassName('task-text');
    if (confirm(tasktext.innerText + ' \nwill be deleted forever.\n You wont be able to undo this action.')) {
        getCurrentListObject().getTasks().splice(getCurrentTaskOBject().getId() - 1, 1);
        getCurrentTaskElement().remove();
        closeTaskDescriptionWindow();
    }
    getCurrentListObject().setNumberOfTasks(getCurrentListObject().getNumberOfTasks() - 1)
    numberOfTasksDiv.innerText = String(getCurrentListObject().getNumberOfTasks());
};
function deleteCurrentList() : void {
    var list = getCurrentListObject();
    if (confirm(list.getName() + ' \nwill be deleted forever.\n You wont be able to undo this action.')) {
        obj.splice(list.getId() - 1, 1);
        doc.getElementById('list' + list.getId()).remove();
        closeTaskDescriptionWindow();
        openDayWindow();
    };
};


function renameList() : void {
    var renameInput = <HTMLInputElement>getElementByClassName('list-rename-input');
    getCurrentListObject().setName(renameInput.value);
    doc.getElementById('list' + getCurrentListObject().getId()).querySelector('p').innerText = renameInput.value;
};
function renameTask() : void {
    var taskText = <HTMLInputElement> getElementByClassName('task-text');
    taskText.value = taskText.value ? taskText.value : 'Untitled Task';
    getCurrentTaskElement().querySelector('div').innerText = taskText.value ? taskText.value : 'Untitled Task';
    getCurrentTaskOBject().setName(taskText.value);
};




function openTaskDescriptionWindow(event : MouseEvent) : void {

    var desc = <HTMLElement>getElementByClassName('task-description');
    var todo = <HTMLElement>getElementByClassName('todo');
    var tasks = <HTMLCollection>getElementsByClassName('task');
    var taskStatus = <HTMLElement>getElementByClassName('task-status');
    var taskImportant = <HTMLElement>getElementByClassName('task-important');
    var taskDetails = <HTMLElement>getElementByClassName('task-details');
    var taskId = getTargetTaskId(event.target);
    var taskElement = <HTMLElement>doc.getElementById(taskId);
    var tasktext = <HTMLInputElement>getElementByClassName('task-text');

    tasktext.value = (taskElement.innerText);
    var currentTaskStatusIcon = <HTMLElement>taskElement.firstChild;
    var currentTaskImportantIcon = <HTMLElement>taskElement.lastChild;
    taskStatus.className = currentTaskStatusIcon.className + ' task-status';
    taskImportant.className = currentTaskImportantIcon.className + ' task-important';
    var taskObj = <Task>getTaskObjectById(parseInt(taskId.split('task')[1]));

    updateAddToDay(taskObj);
    updateDueDate(taskObj);
    updateReminderDate(taskObj);
    updateRepeatSelection(taskObj);
    updateCreatedDate(taskObj);
    updateNote(taskObj);
    desc.classList.add('desc-open');
    todo.classList.add('list-open');
    for (let index = 0; index < tasks.length; index++) {
        tasks[index].classList.remove('active');
    }
    taskElement.classList.add('active');
    taskDetails.id = getCurrentListObject().getId() + '-' + taskId.split('task')[1];

};

function closeTaskDescriptionWindow() : void {
    var desc = getElementByClassName('task-description');
    var todo = getElementByClassName('todo');
    var tasks = getElementsByClassName('task');
    desc.classList.remove('desc-open');
    todo.classList.remove('list-open');
    for (let index = 0; index < tasks.length; index++) {
        tasks[index].classList.remove('active');
    }
};



function handleNewTaskInputBlur() : void {
    var addButton = getElementByClassName('add-button');
    var addTaskInputElement = <HTMLInputElement>getElementByClassName('add-input');
    addButton.classList.remove('active');
    if (addTaskInputElement.value != '') { addNewTask(event) };
    var plusIcon = getElementByClassName('plus-icon');
    plusIcon.classList.replace('fa-circle-thin', 'fa-plus');
};
function handleNewListInputBlur() : void {
    var addListIcon = getElementByClassName('add-list');
    var addListInputElement = <HTMLInputElement>getElementByClassName('add-list-input');
    if (addListInputElement.value != '') { addNewList() };
    addListIcon.classList.replace('fa-list-ul', 'fa-plus');
};
function handleNewTaskInputFocus() : void {
    var addButton = getElementByClassName('add-button');
    addButton.classList.add('active');
    var plusIcon = getElementByClassName('plus-icon');
    toggleBetweenClasses(plusIcon, 'fa-plus', 'fa-circle-thin');
};








function displayTasks(event : MouseEvent) : void {
    closeTaskDescriptionWindow();
    var id = getTargetListId(event.target);
    var lists = getElementsByClassName('list');
    var mainList = doc.getElementsByClassName('tasks')[0];
    while (mainList.childNodes.length > 1) {
        mainList.removeChild(mainList.firstChild);
    }
    openTasksWindow();
    for (let index = 0; index < lists.length; index++) {
        lists[index].classList.remove('active');
    }
    doc.getElementById(id).classList.add('active');
    obj.forEach(function (list) { list.setActive(false); });
    getListObjectById(parseInt(id.split('list')[1])).setActive(true);
    var listHeading = <HTMLInputElement>getElementByClassName('list-rename-input');
    listHeading.value = getCurrentListObject().getName();
    getCurrentListObject().getTasks().forEach(function (task : Task) : void {
        createTaskElement(task, event);
    })
};
function displayLists() : void {
    var lists = getElementByClassName('lists');
    obj.forEach(function (list : List) {
        createListElement(list);
    });
};



function getTargetTaskId(eventTargetNode): string {
    if (eventTargetNode.classList.contains('task')) {
        return eventTargetNode.id;
    } else {
        return eventTargetNode.parentNode.id;
    }
};
function getTargetListId(eventTargetNode) : string {
    if (eventTargetNode.classList.contains('list')) {
        return eventTargetNode.id;
    } else {
        return eventTargetNode.parentNode.id;
    }
};
function getCurrentListObject() : List {
    for (let index = 0; index < obj.length; index++) {
        if (obj[index].isActive()) {
            return obj[index];
        }
    }
};
function getCurrentListElement() {
    return doc.querySelector('.lists .active');
};
function getCurrentTaskElement() {
    return doc.querySelector('.tasks .active');
};
function getCurrentTaskOBject() : Task {
    var tasks = getCurrentListObject().getTasks();
    for (let index = 0; index < tasks.length; index++) {
        if (String(tasks[index].getId()) == getCurrentTaskElement().id.split('task')[1]) {
            return tasks[index];
        }
    };
};

function addListenerToImportantButton(element,event : MouseEvent) {
    element.addEventListener(clickEvent, function () {
        toggleBetweenClasses(element, 'fa-star-o', 'fa-star');
        var elementId = (element.parentElement.id);
        var id = elementId.split('task')[1];
        var selectedTask = getTaskObjectById(id);
        selectedTask.setImportant(!selectedTask.isImportant());
        openTaskDescriptionWindow(event);
    }, false);
};
function addListenerToStatusButton(element,event:MouseEvent) {
    element.addEventListener(clickEvent, function () {
        toggleBetweenClasses(element, 'fa-circle-thin', 'fa-check-circle-o');
        var elementId = (element.parentElement.id);
        var id = elementId.split('task')[1];
        var selectedTask = getTaskObjectById(parseInt(id));
        selectedTask.setCompleted(!selectedTask.isCompleted());
        openTaskDescriptionWindow(event);
    }, false);
};




function openTasksWindow():void {
    var myDay = getElementByClassName('my-day');
    var todo = getElementByClassName('todo');
    todo.classList.add('show-todo');
    myDay.classList.remove('show-day');
    doc.querySelectorAll('.sidebar ul li').forEach(function (listItem) { listItem.classList.remove('active') });
};
function openDayWindow() :void {
    closeTaskDescriptionWindow();
    var listRows = getElementsByClassName('list');
    for (let index = 0; index < listRows.length; index++) {
        listRows[index].classList.remove('active');
    }
    var myDay = getElementByClassName('my-day');
    var todo = getElementByClassName('todo');
    getElementByClassName('my-day-li').classList.add('active');
    todo.classList.remove('show-todo');
    myDay.classList.add('show-day');
};



function getTaskObjectById(id : number) : Task{
    var currentList = getCurrentListObject();
    for (let index = 0; index < currentList.getTasks().length; index++) {
        if (currentList.getTasks()[index].getId() == id) {
            return currentList.getTasks()[index];
        }
    }
};
function getListObjectById(id:number) : List {
    for (let index = 0; index < obj.length; index++) {
        if (obj[index].getId() == id) {
            return obj[index];
        }
    }
};
function addToDay() : void {
    var currentTask = getCurrentTaskOBject();
    var addToDayDiv = <HTMLDivElement>getElementByClassName('add-to-day-button');
    if (!currentTask.isAddedToDay()) {
        addToDayDiv.innerText = 'Added To My Day - ' + moment(new Date()).format("YYYY-MM-DD");
        currentTask.setAddedToDay(true);
    } else {
        addToDayDiv.innerText = 'Add To Day';
        currentTask.setAddedToDay(false);
    }
};
function addNote() : void {
    var currentTask = getCurrentTaskOBject();
    var noteInput = <HTMLInputElement>getElementByClassName('note-card')
    currentTask.setNote(noteInput.value);
};

function displayDueDate() : void {
    var dueDateInput = getElementByClassName('due-date-picker');
    dueDateInput.classList.add('display-inline-block');
};
function displayReminderDate() : void {
    var dueDateInput = getElementByClassName('reminder-date-picker');
    dueDateInput.classList.add('display-inline-block');
};
function displayRepeatInput() : void {
    var repeatInput = getElementByClassName('repeat-selection');
    repeatInput.classList.add('display-inline-block');
};
function addDueDate() : void {
    var addDueDateInput = <HTMLInputElement>getElementByClassName('due-date-picker');
    getCurrentTaskOBject().setDueDate(moment(addDueDateInput.value,"YYYY-MM-DD", true).format());
};
function addReminderDate() : void {
    var addReminderDateInput = <HTMLInputElement>getElementByClassName('reminder-date-picker');
    getCurrentTaskOBject().setReminderDate(moment(addReminderDateInput.value,"YYYY-MM-DD", true).format());
};
function addRepeat() : void {
    var addRepeatInput = <HTMLInputElement>getElementByClassName('repeat-selection');
    getCurrentTaskOBject().setRepeat(addRepeatInput.value);
};



function findUntitledTaskCount() : number {
    var count = 1;
    var tasks = getCurrentListObject().getTasks();
    for (let index = 0; index < tasks.length; index++) {
        if (String(count) == tasks[index].getName().substring(
            tasks[index].getName().lastIndexOf('(') + 1,
            tasks[index].getName().lastIndexOf(')'))) {
            count++;
        } else {
            continue;
        }
    }
    return count;
}
function sortList() : void {
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
};


function updateAddToDay(taskObj :Task) : void {
    var addToDayButton = <HTMLElement>getElementByClassName('add-to-day-button');
    if (!taskObj.isAddedToDay()) {
        addToDayButton.innerText = 'Add To Day';
    } else {
        addToDayButton.innerText = 'Added To Date - ' + moment(new Date()).format("YYYY-MM-DD");
    }
}
function updateDueDate(taskObj :Task) : void {
    var dueDatePicker = <HTMLInputElement>getElementByClassName('due-date-picker');
    var dueDateText = <HTMLElement>doc.querySelector('.add-due-date p');
    if (!taskObj.getDueDate()) {
        dueDateText.innerText = 'Add Due Date';
        dueDatePicker.classList.remove('display-inline-block');
    } else {
        dueDateText.innerText = 'Due Date - ';
        dueDatePicker.classList.add('display-inline-block');
    }
    dueDatePicker.value = moment(taskObj.getDueDate()).format("YYYY-MM-DD");
}
function updateReminderDate(taskObj :Task) : void {
    var reminderDatePicker = <HTMLInputElement>getElementByClassName('reminder-date-picker');
    var reminderDateText = <HTMLElement>doc.querySelector('.add-reminder-date p');
    if (!taskObj.getReminderDate()) {
        reminderDateText.innerText = 'Remind Me';
        reminderDatePicker.classList.remove('display-inline-block');
    } else {
        reminderDateText.innerText = 'Reminder on - ';
        reminderDatePicker.classList.add('display-inline-block');
    }
    reminderDatePicker.value = moment(taskObj.getReminderDate()).format("YYYY-MM-DD");
}
function updateRepeatSelection(taskObj :Task) : void{
    var repeatButtonText = <HTMLElement>doc.querySelector('.add-repeat p');
    var repeatSelector = <HTMLInputElement>getElementByClassName('repeat-selection');
    if (!taskObj.getRepeat()) {
        repeatButtonText.innerText = 'Repeat';
        repeatSelector.classList.remove('display-inline-block');
    } else {
        repeatButtonText.innerText = 'Repeat - ';
        repeatSelector.classList.add('display-inline-block');
    }
    repeatSelector.value = taskObj.getRepeat();
}

function updateCreatedDate(taskObj :Task) : void {
    var createdDateInfo = <HTMLElement>doc.querySelector('.bottom-settings p');
    createdDateInfo.innerText =
        taskObj.getCreatedDate() === moment(currentDate()) ? 'Created Today' : 'Created on ' + taskObj.getCreatedDate();
}
function updateNote(taskObj :Task) {
    var noteInput = <HTMLInputElement>getElementByClassName('note-card');
    var letterCount = <HTMLInputElement>getElementByClassName('letter-count');
    noteInput.value = taskObj.getNote();
    letterCount.innerText = (noteInput.maxLength - noteInput.value.length) + ' characters remaining';
}

function currentDate() : Date {
    return moment();
};