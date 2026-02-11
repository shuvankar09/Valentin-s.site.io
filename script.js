// --- Elements ---
const envelope = document.getElementById("envelope-container");
const letterContainer = document.getElementById("letter-container");
const letterWindow = document.querySelector(".letter-window");
const successContainer = document.getElementById("success-container");
const adventureContainer = document.getElementById("adventure-container");

const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".yes-btn");
const adventureBtn = document.getElementById("adventure-btn");

const music = document.getElementById("my-song");
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

const MAX_HOVERS = 15; 
let hoverCount = 0;

// --- VIBRATION HELPER ---
// Pattern: [vibrate, pause, vibrate]
function vibrate(pattern) {
    // Check if the browser supports vibration (Android mostly)
    if (navigator.vibrate) {
        navigator.vibrate(pattern);
    }
}

// --- 1. Open Envelope ---
if (envelope) {
    envelope.addEventListener("click", () => {
        vibrate(50); // Short buzz (50ms)
        envelope.style.display = "none";
        
        if (letterContainer) {
            letterContainer.style.display = "flex";
            setTimeout(() => {
                if (letterWindow) letterWindow.classList.add("open");
            }, 50);
        }
    });
}

// --- 2. Move "No" Button Logic ---
function moveNoButton() {
    vibrate(30); // Very short buzz when it runs away
    
    if (hoverCount >= MAX_HOVERS) {
        noBtn.style.position = "fixed";
        noBtn.style.transition = "transform 0.8s ease-in, opacity 0.8s ease-in";
        noBtn.style.transform = "translate(1000px, -1000px) rotate(720deg)";
        noBtn.style.opacity = "0";
        setTimeout(() => { noBtn.style.display = "none"; }, 800);
        return;
    }

    const range = window.innerWidth < 600 ? 50 : 100;
    const x = Math.random() * (range * 2) - range; 
    const y = Math.random() * (range * 2) - range; 
    
    noBtn.style.transform = `translate(${x}px, ${y}px)`;
    noBtn.innerText = messages[hoverCount % messages.length];
    hoverCount++;
}

if (noBtn) {
    noBtn.addEventListener("mouseover", moveNoButton);
    noBtn.addEventListener("click", (e) => {
        e.preventDefault();
        moveNoButton();
    });
}

// --- 3. Yes Button Logic ---
if (yesBtn) {
    yesBtn.addEventListener("click", () => {
        vibrate([100, 50, 100]); // "Heartbeat" double buzz (Buzz-pause-Buzz)
        
        letterContainer.style.display = "none";
        successContainer.style.display = "flex";
        
        setTimeout(() => {
            if (adventureBtn) adventureBtn.classList.add("show");
        }, 2000);
    });
}

// --- 4. Final Adventure Button Logic ---
// --- 4. Final Adventure Button Logic ---
if (adventureBtn) {
    adventureBtn.addEventListener("click", () => {
        vibrate(200); 
        
        successContainer.style.display = "none";
        adventureContainer.style.display = "flex";

        // --- DEBUG MUSIC ---
        if (music) {
            console.log("Found music element. Attempting to play...");
            var playPromise = music.play();

            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    console.log("Audio started!");
                    music.volume = 0.5;
                })
                .catch(error => {
                    console.log("Playback failed: " + error);
                    alert("Click anywhere to start music (Browser blocked it!)");
                });
            }
        } else {
            console.log("ERROR: Could not find <audio> element with id 'my-song'");
            alert("Music Error: Check your HTML ID!");
        }
        
        setTimeout(() => {
            if (loveSign) loveSign.classList.add("show");
        }, 1000);
    });
}