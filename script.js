// --- Elements ---
const envelope = document.getElementById("envelope-container");
const letterContainer = document.getElementById("letter-container");
const letterWindow = document.querySelector(".letter-window");
const successContainer = document.getElementById("success-container");
const adventureContainer = document.getElementById("adventure-container");

const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".yes-btn");
const adventureBtn = document.getElementById("adventure-btn");

const loveSign = document.getElementById("love-sign");

// --- 🎵 MUSIC SETUP 🎵 ---

// 1. Intro Music (Plays for pages 1, 2, 3)
// Make sure this file is named "intro.mp3"
const introMusic = new Audio('intro.mp3'); 
introMusic.loop = true; 
introMusic.volume = 0.5;

// 2. Final Music (Plays for page 4)
// UPDATED: Now looks for the double extension file
const finalMusic = new Audio('song.mp3.mp3'); 
finalMusic.loop = true;
finalMusic.volume = 0.5;

// --- CONFIG ---
const messages = ["Are you sure?", "Really রাজশ্রী sure??", "Think again রাজশ্রী!", "Last chance মিষ্টি রাজশ্রী!", "Surely not মিষ্টি মেয়ে?", "You might regret this!", "একবার চেষ্টা করো!", "আলতো করে চেষ্টা করো একবার?", "Uff OG cutie!", "Have a heart cutie🥺!", "Don't be so cold বাচ্চা মেয়ে!", "এবার তো yes বলে দাও 😬", "এমন করতে নেই রাজশ্রী😓", "তুমি মিষ্টি বাচ্চা না🌻", "শেষবার, হ্যাঁ বলে দাও রাজশ্রী❤️"];
const MAX_HOVERS = 15; 
let hoverCount = 0;

// --- VIBRATION HELPER ---
function vibrate(pattern) {
    if (navigator.vibrate) navigator.vibrate(pattern);
}

// --- 1. Open Envelope (Start Intro Music) ---
if (envelope) {
    envelope.addEventListener("click", () => {
        vibrate(50);
        envelope.style.display = "none";
        
        // PLAY INTRO MUSIC HERE
        introMusic.play().catch(e => console.log("Intro music blocked:", e));

        if (letterContainer) {
            letterContainer.style.display = "flex";
            setTimeout(() => { if (letterWindow) letterWindow.classList.add("open"); }, 50);
        }
    });
}

// --- 2. Move "No" Button ---
function moveNoButton() {
    vibrate(30);
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
    noBtn.addEventListener("click", (e) => { e.preventDefault(); moveNoButton(); });
}

// --- 3. Yes Button (Music Keeps Playing) ---
if (yesBtn) {
    yesBtn.addEventListener("click", () => {
        vibrate([100, 50, 100]);
        letterContainer.style.display = "none";
        successContainer.style.display = "flex";
        setTimeout(() => { if (adventureBtn) adventureBtn.classList.add("show"); }, 2000);
    });
}

// --- 4. Final Adventure Button (Switch Music) ---
if (adventureBtn) {
    adventureBtn.addEventListener("click", () => {
        vibrate(200);
        successContainer.style.display = "none";
        adventureContainer.style.display = "flex";

        // STOP INTRO, PLAY FINAL
        introMusic.pause();
        finalMusic.play().catch(e => console.log("Final music blocked:", e));
        
        setTimeout(() => { if (loveSign) loveSign.classList.add("show"); }, 1000);
    });
}
// --- FLOATING HEARTS FUNCTION ---
function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    
    // Random emojis for variety
    const hearts = ["💖", "❤️", "🥰", "😍", "💕"];
    heart.innerText = hearts[Math.floor(Math.random() * hearts.length)];
    
    // Random position across the screen
    heart.style.left = Math.random() * 100 + "vw";
    
    // Random speed (between 3 and 5 seconds)
    heart.style.animationDuration = Math.random() * 2 + 3 + "s"; 
    
    document.body.appendChild(heart);
    
    // Clean up: Remove heart after 5 seconds so the browser doesn't get slow
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

// Start the hearts popping up every 300 milliseconds!
setInterval(createHeart, 300);