const dayTasks = [
    { day: 1, tasks: [ { id: 1, name: "Study 'অপরিচিতা' (Poetry from Bangla 1st Paper)", done: false }, { id: 2, name: "Study 'Noun' & 'Pronoun' from Grammar", done: false }, { id: 3, name: "Practice 'Vocabulary' (Prefix/Suffix)", done: false }, { id: 4, name: "Review 'Bangladesh's Pre-British History'", done: false }, { id: 5, name: "Complete daily 'One Word Substitution' Practice", done: false }, { id: 6, name: "Review 'Recent National GK'", done: false }] },
    { day: 2, tasks: [ { id: 7, name: "Study 'বিলাসী' (Poetry from Bangla 1st Paper)", done: false }, { id: 8, name: "Practice 'Verb' from Grammar", done: false }, { id: 9, name: "Practice 'Synonyms' & 'Antonyms'", done: false }, { id: 10, name: "Complete daily 'Suffix' practice", done: false }, { id: 11, name: "Review 'Recent International GK'", done: false }, { id: 12, name: "Review 'Bangladesh's Liberation War'", done: false }] },
    // Continue adding tasks for days 3-34 as before
    { day: 35, tasks: [ { id: 210, name: "Complete daily 'One Word Substitution' practice", done: false }, { id: 211, name: "Complete revision of all GK topics", done: false }, { id: 212, name: "Final review of all subjects", done: false }, { id: 213, name: "Prepare for the next day's exam", done: false }] }
];

function loadTasks() {
    const currentDay = parseInt(localStorage.getItem('currentDay') || '1');
    const savedTasks = JSON.parse(localStorage.getItem(`tasks_day_${currentDay}`));

    const dayData = dayTasks.find(day => day.day === currentDay);
    const tasksToRender = savedTasks || dayData.tasks;

    renderTasks(tasksToRender, currentDay);
}

function renderTasks(tasks, day) {
    document.getElementById("task-container").innerHTML = ''; // Clear existing tasks
    const taskTable = document.createElement("table");
    const taskHeader = document.createElement("tr");
    taskHeader.innerHTML = `
        <th>Task</th>
        <th>Status</th>
    `;
    taskTable.appendChild(taskHeader);

    tasks.forEach(task => {
        const taskRow = document.createElement("tr");
        taskRow.classList.add(task.done ? "done" : "");
        taskRow.innerHTML = `
            <td>${task.name}</td>
            <td><button onclick="toggleTaskStatus(${task.id}, ${day})">${task.done ? "Undo" : "Mark as Done"}</button></td>
        `;
        taskTable.appendChild(taskRow);
    });

    document.getElementById("task-container").appendChild(taskTable);

    // Save tasks to localStorage
    localStorage.setItem(`tasks_day_${day}`, JSON.stringify(tasks));

    // Show the "Start Next Day" button if all tasks are done
    if (tasks.every(task => task.done)) {
        document.getElementById("next-day-btn").style.display = 'block';
    } else {
        document.getElementById("next-day-btn").style.display = 'none';
    }
}

function toggleTaskStatus(taskId, day) {
    const task = dayTasks.find(d => d.day === day).tasks.find(t => t.id === taskId);
    task.done = !task.done;

    // Re-render tasks after toggling
    renderTasks(dayTasks.find(d => d.day === day).tasks, day);

    // Show confetti when all tasks are completed
    if (dayTasks.find(d => d.day === day).tasks.every(t => t.done)) {
        document.getElementById("confetti").style.display = 'block';
        setTimeout(() => document.getElementById("confetti").style.display = 'none', 3000);
    }
}

function nextDay() {
    const currentDay = parseInt(localStorage.getItem('currentDay') || '1');
    const nextDay = currentDay + 1;

    if (nextDay <= 35) {
        localStorage.setItem('currentDay', nextDay); // Update current day in localStorage
        loadTasks(); // Load tasks for the next day
    } else {
        alert('You have completed all 35 days!'); // Alert when all days are completed
    }
}

window.onload = () => {
    loadTasks();
    document.getElementById("next-day-btn").onclick = nextDay;
};
