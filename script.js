// --- MUSIC LOGIC ---
const bgMusic = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-btn');
let isPlaying = false;

function playAudio() {
    bgMusic.volume = 0.5;
    bgMusic.play().then(() => {
        isPlaying = true;
        musicBtn.innerHTML = "⏸️ Pause Music";
    }).catch(error => {
        console.log("Autoplay blocked. User needs to click the music button.");
    });
}

function toggleMusic() {
    if (isPlaying) {
        bgMusic.pause();
        musicBtn.innerHTML = "🎵 Play Music";
        isPlaying = false;
    } else {
        bgMusic.play();
        musicBtn.innerHTML = "⏸️ Pause Music";
        isPlaying = true;
    }
}

// --- 1. INTRO SCREEN LOGIC ---
function openSurprise() {
    const intro = document.getElementById('intro-screen');
    intro.classList.add('fade-out');
    
    const mainCard = document.getElementById('main-card');
    mainCard.classList.remove('hidden');
    
    // Play music!
    playAudio();

    // Trigger Confetti Explosion!
    fireConfetti();
    
    // Trigger a burst of hearts
    for (let i = 0; i < 15; i++) {
        setTimeout(createHeart, i * 100);
    }
}

// --- 2. CONFETTI LOGIC ---
function fireConfetti() {
    var duration = 3 * 1000;
    var end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5, angle: 60, spread: 55, origin: { x: 0 },
            colors: ['#ffb6c1', '#d15a7b', '#ffffff', '#ffd700']
        });
        confetti({
            particleCount: 5, angle: 120, spread: 55, origin: { x: 1 },
            colors: ['#ffb6c1', '#d15a7b', '#ffffff', '#ffd700']
        });
        if (Date.now() < end) { requestAnimationFrame(frame); }
    }());
}

// --- 3. FLOATING HEARTS LOGIC ---
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    const emojis = ['🩷', '🎀', '🫂', '✨', '🤍', '🥹', '🌟', '🎁'];
    heart.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 2 + 3 + 's';
    heart.style.fontSize = Math.random() * 20 + 15 + 'px';
    document.getElementById('hearts-container').appendChild(heart);
    setTimeout(() => { heart.remove(); }, 5000);
}
setInterval(createHeart, 800);

// --- 4. INLINE SURPRISE LOGIC (Button ke theek neeche khulne wala) ---
function toggleInlineSurprise() {
    const inlineContent = document.getElementById('inline-surprise-content');
    
    // Agar pehle se khula hai to band kar do, warna khol do
    if (inlineContent.classList.contains('show')) {
        inlineContent.classList.remove('show');
    } else {
        inlineContent.classList.add('show');
        
        // Jab khule toh confetti chalao
        confetti({
            particleCount: 150, spread: 80, origin: { y: 0.7 },
            colors: ['#ff9a9e', '#fecfef', '#ffffff', '#d15a7b']
        });

        // Aur thora sa scroll karke us jagah le jao jahan wo khula hai
        setTimeout(() => {
            inlineContent.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    }
}