document.addEventListener('DOMContentLoaded', () => {
    const startDayBtn = document.getElementById('startDayBtn');
    const taskList = document.getElementById('taskList');
    const progress = document.getElementById('progress');
    const tasksUl = document.getElementById('tasks');
    const loginSection = document.getElementById('loginSection');
    const passwordInput = document.getElementById('passwordInput');
    const loginBtn = document.getElementById('loginBtn');
    
    const tasks = [
        "Review Bangla 1st Paper - Chapter 1",
        "Review Bangla 2nd Paper - Grammar",
        "Learn new vocabulary words",
        "Complete English Grammar exercise",
        "Recite prayer at Fajr",
        "Lunch Break",
        "Study GK International",
        "Take a walk / Relax",
        "Complete prayer at Zuhr",
        "Study History",
        "Dinner Break",
        "Complete prayer at Maghrib"
    ];

    // Prayer times for Dhaka
    const prayerTimes = {
        fajr: "5:30 AM",
        zuhr: "12:00 PM",
        asr: "3:30 PM",
        maghrib: "5:45 PM",
        isha: "7:15 PM"
    };

    // Check if user is already logged in
    if (localStorage.getItem('loggedIn') === 'true') {
        loginSection.classList.add('hidden');
        startDayBtn.classList.remove('hidden');
    } else {
        loginSection.classList.remove('hidden');
        startDayBtn.classList.add('hidden');
    }

    // Login functionality
    loginBtn.addEventListener('click', () => {
        const password = passwordInput.value;
        if (password === "yourPassword") { // Replace with your actual password
            localStorage.setItem('loggedIn', 'true');
            loginSection.classList.add('hidden');
            startDayBtn.classList.remove('hidden');
            location.reload();  // Reload the page to show tasks and progress
        } else {
            alert('Invalid password');
        }
    });

    // Start Day button click handler
    startDayBtn.addEventListener('click', () => {
        startDayBtn.style.display = 'none';
        taskList.classList.remove('hidden');
        generateTasks();
        showPrayerTimes();
    });

    // Generate task list dynamically
    function generateTasks() {
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.textContent = task;
            li.classList.add('task');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = localStorage.getItem(`task-${index}`) === 'completed'; // Load progress from localStorage
            checkbox.addEventListener('change', () => updateProgress(index, checkbox.checked));
            li.prepend(checkbox);
            tasksUl.appendChild(li);
        });
        updateProgressBar();
    }

    // Show prayer times for Dhaka
    function showPrayerTimes() {
        const prayerDiv = document.getElementById('prayerTimes');
        for (let prayer in prayerTimes) {
            const p = document.createElement('p');
            p.textContent = `${prayer.charAt(0).toUpperCase() + prayer.slice(1)}: ${prayerTimes[prayer]}`;
            prayerDiv.appendChild(p);
        }
    }

    // Update task progress in localStorage
    function updateProgress(index, isCompleted) {
        localStorage.setItem(`task-${index}`, isCompleted ? 'completed' : 'pending');
        updateProgressBar();
    }

    // Update the progress bar based on completed tasks
    function updateProgressBar() {
        const completedTasks = document.querySelectorAll('.task input:checked').length;
        const totalTasks = tasks.length;
        const progressPercentage = (completedTasks / totalTasks) * 100;
        progress.style.width = `${progressPercentage}%`;

        // Save progress to localStorage
        localStorage.setItem('progress', progressPercentage);
    }

    // Set progress bar width based on saved progress
    const savedProgress = localStorage.getItem('progress');
    if (savedProgress) {
        progress.style.width = `${savedProgress}%`;
    }
});
