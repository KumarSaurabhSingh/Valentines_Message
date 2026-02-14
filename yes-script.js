let musicPlaying = false;

window.addEventListener("load", () => {
    launchConfetti();

    // Autoplay music (works because user clicked Yes)
    const music = document.getElementById("bg-music");
    const toggleBtn = document.getElementById("music-toggle");

    music.volume = 0.3;

    music.play().catch(() => {});
    musicPlaying = true;

    if (toggleBtn) {
        toggleBtn.textContent = "🔊";
    }
});

function launchConfetti() {
    const colors = [
        "#ff69b4",
        "#ff1493",
        "#ff85a2",
        "#ffb3c1",
        "#ff0000",
        "#ff6347",
        "#ffffff",
        "#ffdf00"
    ];

    const duration = 6000;
    const end = Date.now() + duration;

    // Initial big burst
    confetti({
        particleCount: 150,
        spread: 100,
        origin: { x: 0.5, y: 0.3 },
        colors
    });

    // Side cannons
    const interval = setInterval(() => {
        if (Date.now() > end) {
            clearInterval(interval);
            return;
        }

        confetti({
            particleCount: 40,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.6 },
            colors
        });

        confetti({
            particleCount: 40,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.6 },
            colors
        });

    }, 300);
}

function toggleMusic() {
    const music = document.getElementById("bg-music");
    const toggleBtn = document.getElementById("music-toggle");

    if (musicPlaying) {
        music.pause();
        musicPlaying = false;
        toggleBtn.textContent = "🔇";
    } else {
        music.play();
        musicPlaying = true;
        toggleBtn.textContent = "🔊";
    }
}
