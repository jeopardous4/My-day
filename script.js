document.addEventListener('DOMContentLoaded', () => {
    const startDayBtn = document.getElementById('startDayBtn');
    const taskList = document.getElementById('taskList');
    const progress = document.getElementById('progress');
    const tasksUl = document.getElementById('tasks');
    
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

    // Start Day button click handler
    startDayBtn.addEventListener('click', () => {
        startDayBtn.style.display = 'none';
        taskList.classList.remove('hidden');
        generateTasks();
        showPrayerTimes();
        startCountdown();
    });

    // Generate task list dynamically
    function generateTasks() {
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task;
            li.classList.add('task');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.addEventListener('change', updateProgress);
            li.prepend(checkbox);
            tasksUl.appendChild(li);
        });
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

    // Update progress bar based on task completion
    function updateProgress() {
        const completedTasks = document.querySelectorAll('.task input:checked').length;
        const totalTasks = tasks.length;
        const progressPercentage = (completedTasks / totalTasks) * 100;
        progress.style.width = `${progressPercentage}%`;
    }

    // Start countdown timer
    function startCountdown() {
        let timeRemaining = 30 * 60; // 30 minutes in seconds
        const countdown = setInterval(() => {
            if (timeRemaining <= 0) {
                clearInterval(countdown);
                alert("Time's up! Take a break!");
            } else {
                timeRemaining--;
                const minutes = Math.floor(timeRemaining / 60);
                const seconds = timeRemaining % 60;
                console.log(`Time left: ${minutes}:${seconds}`);
            }
        }, 1000);
    }
});
