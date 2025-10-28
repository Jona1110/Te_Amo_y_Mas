const audio = document.getElementById('audio');
const playBtn = document.getElementById('playBtn');
const messageBtn = document.getElementById('messageBtn');
const modal = document.getElementById('modal');
const closeModal = document.querySelector('.close');
const karaokeContainer = document.getElementById('karaokeContainer');
const lyrics = document.querySelectorAll('.lyric');
const confettiContainer = document.getElementById('confetti');

let hearts = [];

// Función para crear corazones flotantes
function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.fontSize = 16 + Math.random() * 20 + 'px';
    heart.innerText = '💖';
    document.body.appendChild(heart);
    hearts.push(heart);

    setTimeout(() => {
        heart.remove();
        hearts = hearts.filter(h => h !== heart);
    }, 6000);
}

// Generar corazones cada 0.5s
setInterval(createHeart, 500);

// Función para karaoke sincronizado
function syncLyrics() {
    const currentTime = audio.currentTime;
    lyrics.forEach((line, index) => {
        const time = parseFloat(line.dataset.time);
        if (currentTime >= time && (index === lyrics.length - 1 || currentTime < parseFloat(lyrics[index + 1].dataset.time))) {
            lyrics.forEach(l => l.classList.remove('active-lyric'));
            line.classList.add('active-lyric');
            // Scroll automático si no visible
            const rect = line.getBoundingClientRect();
            if (rect.top < 0 || rect.bottom > window.innerHeight) {
                line.scrollIntoView({behavior: 'smooth', block: 'center'});
            }
        }
    });
}

// Evento Play
playBtn.addEventListener('click', () => {
    audio.play();
    setInterval(syncLyrics, 100);
    playBtn.disabled = true;
});

// Modal
messageBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    createConfetti();
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    confettiContainer.innerHTML = '';
});

// Confeti y mini corazones en modal
function createConfetti() {
    for(let i=0; i<50; i++){
        const c = document.createElement('div');
        c.className = 'heart';
        c.style.fontSize = 10 + Math.random()*15 + 'px';
        c.style.left = Math.random()*confettiContainer.offsetWidth + 'px';
        c.style.top = Math.random()*confettiContainer.offsetHeight + 'px';
        c.innerText = '💖';
        confettiContainer.appendChild(c);
        setTimeout(() => c.remove(), 5000);
    }
}
