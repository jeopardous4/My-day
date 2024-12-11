// Prayer Times for Dhaka (hardcoded)
const prayerTimes = {
    "Fajr": "05:30 AM",
    "Dhuhr": "12:00 PM",
    "Asr": "03:30 PM",
    "Maghrib": "05:45 PM",
    "Isha": "07:00 PM"
};

// Sample Study Schedule and Topics
const studyTopics = [
    "Bangla 1st Paper: 'অপরিচিতা'",
    "Bangla 2nd Paper: 'ভাষা, বাংলা ভাষার উৎপত্তি'",
    "English Grammar: 'Basic Sentence Structure'",
    "GK: 'প্রাচীন ও মধ্যযুগে বাংলার ইতিহাস'",
    "Meal: Lunch",
    "Shower",
    "Prayer: Fajr",
    "Prayer: Dhuhr",
    "Prayer: Asr",
    "Prayer: Maghrib",
    "Prayer: Isha"
];

const progressData = {
    "Bangla 1st Paper": 0,
    "Bangla 2nd Paper": 0,
    "English Grammar": 0,
    "GK": 0
};

// Display Date and Dynamic Motivational Header
function updateDateAndMotivation() {
    const currentDate = new Date().toDateString();
    const motivationalMessages = [
        "You got this! Keep going!",
        "Make today your best day!",
        "Small steps every day, big results tomorrow!",
    ];

    document.getElementById('current-date').innerText = currentDate;
    document.querySelector('header h1').classList.add('motivated');

    setTimeout(() => {
        document.querySelector('header h1').classList.remove('motivated');
    }, 2000);
}

updateDateAndMotivation();

// Display Prayer Times
function displayPrayerTimes() {
    const prayerList = document.getElementById('prayers');
    for (let prayer in prayerTimes) {
        const li = document.createElement('li');
        li.textContent = `${prayer}: ${prayerTimes[prayer]}`;
        prayerList.appendChild(li);
    }
}

// Start Day with Tasks
function startDay() {
    displayPrayerTimes();

    const taskList = document.getElementById('task-list');
    studyTopics.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `<input type="checkbox" onclick="markTaskCompleted(this)"> ${task}`;
        taskList.appendChild(li);
    });

    displayProgress();
}

// Mark Tasks as Completed
function markTaskCompleted(checkbox) {
    const li = checkbox.parentElement;
    if (checkbox.checked) {
        li.classList.add('completed');
    } else {
        li.classList.remove('completed');
    }
    updateProgress();
}

// Update Progress Bars
function displayProgress() {
    const progressBarsContainer = document.getElementById('progress-bars');
    progressBarsContainer.innerHTML = ""; // Clear previous bars
    for (let subject in progressData) {
        const div = document.createElement('div');
        div.classList.add('progress-bar');
        div.innerHTML = `<div style="width: ${progressData[subject]}%"></div>`;
        progressBarsContainer.appendChild(div);
    }
}

// Update Progress
function updateProgress() {
    const totalTasks = studyTopics.length;
    let completedTasks = document.querySelectorAll('#task-list .completed').length;
    let percentage = (completedTasks / totalTasks) * 100;

    // Simulating task completion per subject
    progressData["Bangla 1st Paper"] = Math.min(100, (completedTasks / 4) * 100);
    progressData["Bangla 2nd Paper"] = Math.min(100, (completedTasks / 4) * 100);
    progressData["English Grammar"] = Math.min(100, (completedTasks / 4) * 100);
    progressData["GK"] = Math.min(100, (completedTasks / 4) * 100);

    displayProgress();
}

// Toggle Dark Mode
document.getElementById('dark-mode-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Download Progress
function downloadProgress() {
    const progressJSON = JSON.stringify(progressData, null, 2);
    const blob = new Blob([progressJSON], { type: "application/json" });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = "progress.json";
    link.click();
}

// Start the Day
startDay();
