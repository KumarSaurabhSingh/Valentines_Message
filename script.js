const gifStages = [
  "https://media.tenor.com/EBV7OT7ACfwAAAAj/u-u-qua-qua-u-quaa.gif",
  "https://media1.tenor.com/m/uDugCXK4vI4AAAAd/chiikawa-hachiware.gif",
  "https://media.tenor.com/f_rkpJbH1s8AAAAj/somsom1012.gif",
  "https://media.tenor.com/OGY9zdREsVAAAAAj/somsom1012.gif",
  "https://media1.tenor.com/m/WGfra-Y_Ke0AAAAd/chiikawa-sad.gif",
  "https://media.tenor.com/CivArbX7NzQAAAAj/somsom1012.gif",
  "https://media.tenor.com/5_tv1HquZlcAAAAj/chiikawa.gif",
  "https://media1.tenor.com/m/uDugCXK4vI4AAAAC/chiikawa-hachiware.gif"
];

const noMessages = [
  "Nah Jii",
  "Sacchi me Kya? 🤔",
  "Sundari please... 🥺",
  "If you say no, Mai ro Dunga...",
  "Rula ke Manoge Kya Aap... 😢",
  "Please Jii??? 💔",
  "Aisa matt kriye jiii...",
  "Hamare Future child ke liye! 😭",
  "Mai nhi manane wala 😜"
];

const yesTeasePokes = [
  "try saying no first... I bet you want to know what happens 😏",
  "Ek baar no... Try kriye 👀",
  "Lagta hai bahut pyaar hai 😈",
  "Areee.. I love you too Sundari 😏"
];

let yesTeasedCount = 0;
let yesClickCount = 0;
let noClickCount = 0;
let runawayEnabled = false;
let musicPlaying = true;

const catGif = document.getElementById("cat-gif");
const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const music = document.getElementById("bg-music");

/* 🎵 AUTOPLAY HANDLING */
music.muted = true;
music.volume = 0.3;

music.play()
  .then(() => {
    music.muted = false;
  })
  .catch(() => {
    document.addEventListener(
      "click",
      () => {
        music.muted = false;
        music.play().catch(() => {});
      },
      { once: true }
    );
  });

function toggleMusic() {
  const toggleBtn = document.getElementById("music-toggle");

  if (musicPlaying) {
    music.pause();
    musicPlaying = false;
    toggleBtn.textContent = "🔇";
  } else {
    music.muted = false;
    music.play();
    musicPlaying = true;
    toggleBtn.textContent = "🔊";
  }
}

function handleYesClick() {
  yesClickCount++;

  if (!runawayEnabled) {
    const msg =
      yesTeasePokes[Math.min(yesTeasedCount, yesTeasePokes.length - 1)];
    yesTeasedCount++;
    showTeaseMessage(msg);
    return;
  }

  if (yesClickCount === 5) {
    showLovePopup();
    return;
  }

  if (yesClickCount > 5) {
    window.location.href = "yes.html";
  }
}

function showTeaseMessage(msg) {
  let toast = document.getElementById("tease-toast");
  toast.textContent = msg;
  toast.classList.add("show");

  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

function handleNoClick() {
  noClickCount++;

  const msgIndex = Math.min(noClickCount, noMessages.length - 1);
  noBtn.textContent = noMessages[msgIndex];

  const currentSize = parseFloat(
    window.getComputedStyle(yesBtn).fontSize
  );

  yesBtn.style.fontSize = `${currentSize * 1.35}px`;

  const padY = Math.min(18 + noClickCount * 5, 60);
  const padX = Math.min(45 + noClickCount * 10, 120);
  yesBtn.style.padding = `${padY}px ${padX}px`;

  if (noClickCount >= 2) {
    const noSize = parseFloat(
      window.getComputedStyle(noBtn).fontSize
    );
    noBtn.style.fontSize = `${Math.max(noSize * 0.85, 10)}px`;
  }

  const gifIndex = Math.min(noClickCount, gifStages.length - 1);
  swapGif(gifStages[gifIndex]);

  if (noClickCount >= 5 && !runawayEnabled) {
    enableRunaway();
    runawayEnabled = true;
  }
}

function swapGif(src) {
  catGif.style.opacity = "0";

  setTimeout(() => {
    catGif.src = src;
    catGif.style.opacity = "1";
  }, 200);
}

function enableRunaway() {
  noBtn.addEventListener("mouseover", runAway);
  noBtn.addEventListener("touchstart", runAway, { passive: true });
}

function runAway() {
  const margin = 20;
  const btnW = noBtn.offsetWidth;
  const btnH = noBtn.offsetHeight;

  const maxX = window.innerWidth - btnW - margin;
  const maxY = window.innerHeight - btnH - margin;

  const randomX = Math.random() * maxX + margin / 2;
  const randomY = Math.random() * maxY + margin / 2;

  noBtn.style.position = "fixed";
  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;
  noBtn.style.zIndex = "50";
}

/* 💖 LOVE POPUP + HEART BURST */
function showLovePopup() {
  const popup = document.createElement("div");
  popup.textContent = "I love you too 💖😊💕";

  popup.style.position = "fixed";
  popup.style.top = "50%";
  popup.style.left = "50%";
  popup.style.transform = "translate(-50%, -50%) scale(0)";
  popup.style.background = "linear-gradient(135deg, #ff4d6d, #ff99c8)";
  popup.style.color = "white";
  popup.style.padding = "25px 40px";
  popup.style.borderRadius = "20px";
  popup.style.fontSize = "28px";
  popup.style.fontWeight = "bold";
  popup.style.boxShadow = "0 15px 35px rgba(0,0,0,0.3)";
  popup.style.zIndex = "9999";
  popup.style.transition = "all 0.4s ease";

  document.body.appendChild(popup);

  setTimeout(() => {
    popup.style.transform = "translate(-50%, -50%) scale(1.2)";
  }, 100);

  setTimeout(() => {
    popup.style.transform = "translate(-50%, -50%) scale(1)";
  }, 300);

  createHeartBurst();

  setTimeout(() => {
    window.location.href = "yes.html";
  }, 3000);
}

function createHeartBurst() {
  for (let i = 0; i < 20; i++) {
    const heart = document.createElement("div");
    heart.textContent = "💖";

    heart.style.position = "fixed";
    heart.style.left = "50%";
    heart.style.top = "50%";
    heart.style.fontSize = "24px";
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "9998";

    document.body.appendChild(heart);

    const randomX = (Math.random() - 0.5) * 500;
    const randomY = (Math.random() - 0.5) * 500;

    heart.animate(
      [
        {
          transform: "translate(-50%, -50%) scale(1)",
          opacity: 1
        },
        {
          transform: `translate(${randomX}px, ${randomY}px) scale(1.5)`,
          opacity: 0
        }
      ],
      {
        duration: 1500,
        easing: "ease-out"
      }
    );

    setTimeout(() => heart.remove(), 1500);
  }
}
