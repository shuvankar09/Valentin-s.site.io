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

const messages = [
  "Are you sure?", "Really sure?", "Think again!",
  "Last chance!", "Don't break my heart 💔"
];

let hoverCount = 0;
const MAX_HOVERS = 12;

// Typewriter
function typeWriter(text, el, speed = 80) {
  el.innerText = "";
  let i = 0;
  const t = setInterval(() => {
    el.innerText += text[i++];
    if (i === text.length) clearInterval(t);
  }, speed);
}

// Envelope click
envelope.addEventListener("click", () => {
  envelope.style.display = "none";
  letterContainer.style.display = "flex";
  setTimeout(() => {
    letterWindow.classList.add("open");
    typeWriter("Will you be my Valentine? 💖", title);
  }, 200);
});

// No button
function moveNo() {
  if (hoverCount >= MAX_HOVERS) {
    noBtn.style.opacity = "0";
    setTimeout(() => noBtn.remove(), 500);
    return;
  }
  noBtn.style.transform = `translate(${Math.random()*120-60}px,${Math.random()*120-60}px)`;
  noBtn.innerText = messages[hoverCount % messages.length];
  hoverCount++;

  if (hoverCount === 8) catImg.src = "cat_sad.gif";
}
noBtn.addEventListener("mouseover", moveNo);
noBtn.addEventListener("click", e => { e.preventDefault(); moveNo(); });

// Hearts
function heartBurst() {
  for (let i = 0; i < 25; i++) {
    const h = document.createElement("div");
    h.innerText = "💖";
    h.style.position = "fixed";
    h.style.left = Math.random()*100+"vw";
    h.style.bottom = "0";
    h.style.animation = "floatUp 3s forwards";
    document.body.appendChild(h);
    setTimeout(()=>h.remove(),3000);
  }
}

// Yes button
yesBtn.addEventListener("click", () => {
  heartBurst();
  letterContainer.style.display = "none";
  successContainer.style.display = "flex";
  setTimeout(() => adventureBtn.classList.add("show"), 2000);
});

// Adventure
adventureBtn.addEventListener("click", () => {
  successContainer.style.display = "none";
  adventureContainer.style.display = "flex";
});
