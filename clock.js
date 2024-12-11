function updateClock() {
    const clockElement = document.getElementById("clock");

    const options = {
        timeZone: "Asia/Dhaka",
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    };

    const now = new Date().toLocaleTimeString("en-US", options);
    clockElement.innerText = now;
}

setInterval(updateClock, 1000);
updateClock(); // Initialize the clock immediately
