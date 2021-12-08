
//const dueTime = document.getElementById('duetime_input').value;
//const dueDate = document.getElementById('duedate_input').value;

// doneButtonElement.id = '' or setAttribute
// have a separate add task function from click
function addTask(description, dueTime) {
    const newListElement = document.createElement('li');
    newListElement.textContent = description
    if (dueTime) {
        const formatDate = new Date(dueTime);
        newListElement.append(' due ');
        newListElement.append(formatDate.toLocaleString());
    }
    task_list.appendChild(newListElement);
    const doneButtonElement = document.createElement('button');
    doneButtonElement.textContent = 'Done';
    doneButtonElement.classList.add('btn', 'btn-sm', 'btn-outline-danger', 'done');
    newListElement.append(doneButtonElement); // add the button onto the end of the new list element
    doneButtonElement.onclick = function () {
        console.log("clicked done");
        newListElement.remove();
    }
}

//Part 3
function dateAndTimeToTimestamp(dateInputElement, timeInputElement) {
    const dueDate = dateInputElement.valueAsNumber; // Returns the timestamp at midnight for the given date
    const dueTime = timeInputElement.valueAsNumber; // Returns the number of milliseconds from midnight to the time
    console.log(dateInputElement, timeInputElement);
    if (dueDate && dueTime) { // The user specified both a due date & due time
        //Add the timezone offset to account for the fact that timestamps are specified by UTC
        const timezoneOffset = (new Date()).getTimezoneOffset() * 60 * 1000;
        return dueDate + dueTime + timezoneOffset;
    } else {
        // if the user did not specify both a due date and due time, return false
        return false;
    }
}

// addTask('buy milk');
// () calls function now, addTask is function object that will be called on click

document.getElementById('add_task').onclick = function () {
    //addTask(description);
    const description = document.getElementById('task_description_input').value;
    const dateInputElement = document.getElementById("duedate_input");
    const timeInputElement = document.getElementById("duetime_input");
    var dateTime = dateAndTimeToTimestamp(dateInputElement, timeInputElement);
    console.log(dateInputElement);
    console.log(timeInputElement);
    console.log(dateTime);
    addTask(description, dateTime);
    document.getElementById("task_description_input").value = "";
}


document.getElementById('task_description_input').addEventListener('keydown', (event) => {
    const description = document.getElementById('task_description_input').value;
    const dateInputElement = document.getElementById("duedate_input");
    const timeInputElement = document.getElementById("duetime_input");
    var dateTime = dateAndTimeToTimestamp(dateInputElement, timeInputElement);
    if (event.keyCode == 13) { //event.which == enter
        addTask(description, dateTime);
    }
})