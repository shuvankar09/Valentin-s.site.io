function nextScreen(num) {
  document.querySelectorAll(".screen")
    .forEach(s => s.classList.remove("active"));

  document.getElementById("screen" + num)
    .classList.add("active");
}

/* NO button runaway */
const noBtn = document.getElementById("noBtn");
if (noBtn) {
  noBtn.addEventListener("mouseover", () => {
    const x = Math.random() * 80 - 40;
    const y = Math.random() * 80 - 40;
    noBtn.style.transform = `translate(${x}px, ${y}px)`;
  });
}

/* 💕 Continuous pixel hearts */
const heartsContainer = document.getElementById("hearts-container");
const heartEmojis = ["❤️","💖","💕","💘","💓"];

setInterval(() => {
  if (!document.getElementById("screen4").classList.contains("active")) return;

  const heart = document.createElement("div");
  heart.classList.add("pixel-heart");
  heart.innerText = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 10 + 14 + "px";

  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 4000);
}, 400);