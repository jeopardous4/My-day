const messages = [
    "Tumi sure babesh?",
    "Sotti sure??",
    "100% tho?",
    "Ektu vebe bolba nah?🥺...",
    "arekbar vebe dekho?🥹",
    "mittha bolle pap",
    "Onek pap...",
    "sottikarer onk besi pap...",
    "accha jaw bole deo nah 😭...",
    "hehehe, say yes please! ❤️"
];

let messageIndex = 0;

function handleNoClick() {
    const noButton = document.querySelector('.no-button');
    const yesButton = document.querySelector('.yes-button');
    noButton.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;
    const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
    yesButton.style.fontSize = `${currentSize * 1.2}px`; // Slightly reduced scaling for mobile
}

function handleYesClick() {
    confetti(); // Confetti effect when clicking yes
    setTimeout(() => {
        window.location.href = "yes_page.html";
    }, 1000);
}
