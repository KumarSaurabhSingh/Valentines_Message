/* ===============================
   💖 INTRO SCREEN + MUSIC START
================================= */

const introScreen = document.getElementById("intro-screen")
const music = document.getElementById("bg-music")
const musicToggle = document.getElementById("music-toggle")

let musicPlaying = false

introScreen.addEventListener("click", () => {
    introScreen.classList.add("fade-out")

    setTimeout(() => {
        introScreen.style.display = "none"
    }, 800)

    music.volume = 0.3
    music.play().then(() => {
        musicPlaying = true
        musicToggle.textContent = "🔊"
    }).catch(() => {})
})

function toggleMusic() {
    if (musicPlaying) {
        music.pause()
        musicPlaying = false
        musicToggle.textContent = "🔇"
    } else {
        music.play()
        musicPlaying = true
        musicToggle.textContent = "🔊"
    }
}

/* ===============================
   💕 ORIGINAL GAME LOGIC
================================= */

const gifStages = [
    "https://media.tenor.com/EBV7OT7ACfwAAAAj/u-u-qua-qua-u-quaa.gif",
    "https://media1.tenor.com/m/uDugCXK4vI4AAAAd/chiikawa-hachiware.gif",
    "https://media.tenor.com/f_rkpJbH1s8AAAAj/somsom1012.gif",
    "https://media.tenor.com/OGY9zdREsVAAAAAj/somsom1012.gif",
    "https://media1.tenor.com/m/WGfra-Y_Ke0AAAAd/chiikawa-sad.gif",
    "https://media.tenor.com/CivArbX7NzQAAAAj/somsom1012.gif",
    "https://media.tenor.com/5_tv1HquZlcAAAAj/chiikawa.gif",
    "https://media1.tenor.com/m/uDugCXK4vI4AAAAC/chiikawa-hachiware.gif"
]

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
]

const yesTeasePokes = [
    "try saying no first... I bet you want to know what happens 😏",
    "Ek baar no... Try kriye 👀",
    "Lagta hai bahut pyaar hai 😈",
    "Areee.. I love you too Sundari 😏"
]

let yesTeasedCount = 0
let yesClickCount = 0
let noClickCount = 0
let runawayEnabled = false

const catGif = document.getElementById('cat-gif')
const yesBtn = document.getElementById('yes-btn')
const noBtn = document.getElementById('no-btn')

function handleYesClick() {
    yesClickCount++

    if (!runawayEnabled) {
        const msg = yesTeasePokes[Math.min(yesTeasedCount, yesTeasePokes.length - 1)]
        yesTeasedCount++
        showTeaseMessage(msg)
        return
    }

    if (yesClickCount === 5) {
        showLovePopup()
        return
    }

    if (yesClickCount > 5) {
        window.location.href = 'yes.html'
    }
}

function showTeaseMessage(msg) {
    let toast = document.getElementById('tease-toast')
    toast.textContent = msg
    toast.classList.add('show')
    clearTimeout(toast._timer)
    toast._timer = setTimeout(() => toast.classList.remove('show'), 2500)
}

function handleNoClick() {
    noClickCount++

    const msgIndex = Math.min(noClickCount, noMessages.length - 1)
    noBtn.textContent = noMessages[msgIndex]

    const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize)
    yesBtn.style.fontSize = `${currentSize * 1.35}px`

    const gifIndex = Math.min(noClickCount, gifStages.length - 1)
    catGif.src = gifStages[gifIndex]

    if (noClickCount >= 5 && !runawayEnabled) {
        noBtn.addEventListener('mouseover', runAway)
        runawayEnabled = true
    }
}

function runAway() {
    const maxX = window.innerWidth - noBtn.offsetWidth
    const maxY = window.innerHeight - noBtn.offsetHeight

    noBtn.style.position = "fixed"
    noBtn.style.left = Math.random() * maxX + "px"
    noBtn.style.top = Math.random() * maxY + "px"
}

/* LOVE POPUP */

function showLovePopup() {
    const popup = document.createElement("div")
    popup.className = "love-popup"
    popup.textContent = "I love you too 💖😊💕"
    document.body.appendChild(popup)

    setTimeout(() => {
        window.location.href = "yes.html"
    }, 3000)
}
