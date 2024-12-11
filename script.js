document.addEventListener('DOMContentLoaded', () => {
    const loginPage = document.getElementById('loginPage');
    const taskPage = document.getElementById('taskPage');
    const startDayBtn = document.getElementById('startDayBtn');
    const taskList = document.getElementById('taskList');
    const progress = document.getElementById('progress');
    const tasksTableBody = document.getElementById('tasks');
    const passwordInput = document.getElementById('passwordInput');
    const loginBtn = document.getElementById('loginBtn');
    const loginError = document.getElementById('loginError');
    
    const tasks = [
        { time: "5:30 AM", task: "Recite Fajr Prayer", id: 0 },
        { time: "6:00 AM", task: "Review Bangla 1st Paper - Chapter 1", id: 1 },
        { time: "8:00 AM", task: "Review Bangla 2nd Paper - Grammar", id: 2 },
        { time: "10:00 AM", task: "Learn new vocabulary words", id: 3 },
        { time: "12:00 PM", task: "Complete English Grammar exercise", id: 4 },
        { time: "1:00 PM", task: "Lunch Break", id: 5 },
        { time: "2:00 PM", task: "Study GK International", id: 6 },
        { time: "3:30 PM", task: "Complete prayer at Zuhr", id: 7 },
        { time: "4:00 PM", task: "Take a walk / Relax", id: 8 },
        { time: "5:45 PM", task: "Complete prayer at Maghrib", id: 9 },
        { time: "7:00 PM", task: "Dinner Break", id: 10 },
        { time: "7:15 PM", task: "Complete prayer at Isha", id: 11 }
    ];

    // Check if user is already logged in
    if (localStorage.getItem('loggedIn') === 'true') {
        loginPage.classList.add('hidden');
        taskPage.classList.remove('hidden');
    } else {
        loginPage.classList.remove('hidden');
        taskPage.classList.add('hidden');
    }

    // Login functionality
    loginBtn.addEventListener('click', () => {
        const password = passwordInput.value;
        if (password === "yourPassword") { // Replace with your actual password
            localStorage.setItem('loggedIn', 'true');
            loginPage.classList.add('hidden');
            taskPage.classList.remove('hidden');
            generateTasks();
        } else {
            loginError.classList.remove('hidden');
        }
    });

    // Start Day button click handler
    startDayBtn.addEventListener('click', () => {
        taskList.classList.remove('hidden');
