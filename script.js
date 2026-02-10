// --- Elements ---
const envelope = document.getElementById("envelope-container");
const letterContainer = document.getElementById("letter-container");
const letterWindow = document.querySelector(".letter-window");
const successContainer = document.getElementById("success-container");
const adventureContainer = document.getElementById("adventure-container");

const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".yes-btn");
const adventureBtn = document.getElementById("adventure-btn");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");

const music = document.getElementById("bg-music");
const loveSign = document.getElementById("love-sign");

// --- CONFIG ---
const messages = [
    "Are you sure?", 
    "Really sure??", 
    "Think again!", 
    "Last chance!", 
    "Surely not?",
    "You might regret this!",
    "Give it another thought!",
    "Are you absolutely certain?",
    "This could be a mistake!",
    "Have a heart!",
    "Don't be so cold!",
    "Change of heart?",
    "Wouldn't you reconsider?",
    "Is that your final answer?",
    "You're breaking my heart ;(",
];

const MAX_HOVERS = 15; // Button runs away after 15 times
let hoverCount = 0;

// --- 1. Open Envelope ---
envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    letterContainer.style.display = "flex";
    setTimeout(() => {
        letterWindow.classList.add("open");
    }, 50);
});

// --- 2. Move "No" Button Logic ---
function moveNoButton() {
    // Check if limit reached
    if (hoverCount >= MAX_HOVERS) {
        noBtn.style.position = "fixed";
        noBtn.style.transition = "transform 0.8s ease-in, opacity 0.8s ease-in";
        noBtn.style.transform = "translate(1000px, -1000px) rotate(720deg)";
        noBtn.style.opacity = "0";
        setTimeout(() => { noBtn.style.display = "none"; }, 800);
        return;
    }

    // Move logic (Responsive)
    const range = window.innerWidth < 600 ? 50 : 100; // Smaller jumps on mobile
    const x = Math.random() * (range * 2) - range; 
    const y = Math.random() * (range * 2) - range; 
    
    noBtn.style.transform = `translate(${x}px, ${y}px)`;

    // Change text (Looping)
    noBtn.innerText = messages[hoverCount % messages.length];

    hoverCount++;
}

// Attach Event Listeners
noBtn.addEventListener("mouseover", moveNoButton);
noBtn.addEventListener("click", (e) => {
    e.preventDefault(); // Stop click on mobile
    moveNoButton();
});

// --- 3. Yes Button Logic ---
yesBtn.addEventListener("click", () => {
    // Hide Letter
    letterContainer.style.display = "none";
    
    // Show Ticket
    successContainer.style.display = "flex";
    
    // DELAY: Show Adventure Button after 2 seconds
    setTimeout(() => {
        adventureBtn.classList.add("show");
    }, 2000);
});

// --- 4. Final Adventure Button Logic ---
adventureBtn.addEventListener("click", () => {
    // Switch Pages
    successContainer.style.display = "none";
    adventureContainer.style.display = "flex";

    // Play Music
    music.play().catch(error => {
        console.log("Autoplay prevented:", error);
    });
    
    // Show Love Sign after 1 second
    setTimeout(() => {
        loveSign.classList.add("show");
    }, 1000);
});