// Crear corazones con emoji flotantes
for (let i = 0; i < 50; i++) {
  let heart = document.createElement('div');
  heart.className = 'heart';
  heart.textContent = '💖'; // emoji de corazón
  let size = 20 + Math.random() * 30;
  heart.style.fontSize = size + 'px';
  heart.style.position = 'absolute';
  heart.style.left = Math.random() * window.innerWidth + 'px';
  heart.style.top = window.innerHeight + 'px';
  heart.style.opacity = 0.5 + Math.random() * 0.5;
  heart.style.pointerEvents = 'none';
  document.body.appendChild(heart);

  // Animación ondulada
  let angle = Math.random() * 2 * Math.PI;
  let speed = 1 + Math.random() * 2;
  let amplitude = 50 + Math.random() * 50;

  function moveHeart() {
    angle += 0.02 * speed;
    let x = parseFloat(heart.style.left) + Math.sin(angle) * amplitude * 0.01;
    let y = parseFloat(heart.style.top) - speed;
    if (y < -50) y = window.innerHeight;
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    requestAnimationFrame(moveHeart);
  }
  moveHeart();
}

// Karaoke con scroll inteligente
const song = document.getElementById('song');
const lyrics = document.querySelectorAll('.lyric');
const container = document.getElementById('lyrics-container');
let lastActiveIndex = -1;

song.addEventListener('timeupdate', () => {
  const currentTime = song.currentTime;
  for (let i = lyrics.length - 1; i >= 0; i--) {
    let lineTime = parseFloat(lyrics[i].dataset.time);
    if (currentTime >= lineTime) {
      if (lastActiveIndex !== i) {
        if (lastActiveIndex >= 0) lyrics[lastActiveIndex].classList.remove('active-lyric');
        lyrics[i].classList.add('active-lyric');
        lastActiveIndex = i;

        const lineTop = lyrics[i].offsetTop;
        const containerTop = container.scrollTop;
        const containerHeight = container.offsetHeight;
        if (lineTop < containerTop || lineTop > containerTop + containerHeight - 50) {
          container.scrollTo({
            top: lineTop - containerHeight / 2,
            behavior: 'smooth'
          });
        }
      }
      break;
    }
  }
});

// Modal con confeti y mini corazones emoji
const btn = document.getElementById('secretBtn');
const modal = document.getElementById('secretModal');
const close = document.querySelector('.close');

// Crear contenedor de confeti/mini corazones dentro del modal
let confettiContainer = document.createElement('div');
confettiContainer.style.position = 'absolute';
confettiContainer.style.width = '100%';
confettiContainer.style.height = '100%';
confettiContainer.style.top = 0;
confettiContainer.style.left = 0;
confettiContainer.style.pointerEvents = 'none';
modal.querySelector('.modal-content').appendChild(confettiContainer);

btn.addEventListener('click', () => {
  modal.style.display = 'block';
  launchConfetti();
  launchMiniHearts();
});

close.addEventListener('click', () => {
  modal.style.display = 'none';
  confettiContainer.innerHTML = '';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    confettiContainer.innerHTML = '';
  }
});

// Confeti dinámico
function launchConfetti() {
  confettiContainer.innerHTML = '';
  for (let i = 0; i < 50; i++) {
    let conf = document.createElement('div');
    conf.style.position = 'absolute';
    conf.style.width = conf.style.height = (5 + Math.random() * 8) + 'px';
    conf.style.backgroundColor = ['#ff0066','#ff69b4','#ff477e','#ff99cc'][Math.floor(Math.random()*4)];
    conf.style.left = Math.random() * confettiContainer.offsetWidth + 'px';
    conf.style.top = Math.random() * confettiContainer.offsetHeight + 'px';
    conf.style.opacity = Math.random();
    conf.style.borderRadius = '50%';
    conf.style.transition = 'transform 0.1s linear';
    confettiContainer.appendChild(conf);

    // Animación confeti
    let speed = 1 + Math.random() * 2;
    function animate() {
      let y = parseFloat(conf.style.top) - speed;
      if (y < -20) y = confettiContainer.offsetHeight;
      conf.style.top = y + 'px';
      requestAnimationFrame(animate);
    }
    animate();
  }
}

// Mini corazones emoji dentro del modal
function launchMiniHearts() {
  for (let i = 0; i < 30; i++) {
    let h = document.createElement('div');
    h.textContent = '💖';
    h.style.position = 'absolute';
    h.style.fontSize = (15 + Math.random()*15)+'px';
    h.style.left = Math.random()*confettiContainer.offsetWidth+'px';
    h.style.top = Math.random()*confettiContainer.offsetHeight+'px';
    h.style.opacity = 0.7 + Math.random()*0.3;
    confettiContainer.appendChild(h);

    let angle = Math.random()*2*Math.PI;
    let speed = 0.5 + Math.random();
    function move() {
      angle += 0.02*speed;
      let x = parseFloat(h.style.left) + Math.sin(angle)*2;
      let y = parseFloat(h.style.top) - speed;
      if(y < -20) y = confettiContainer.offsetHeight;
      h.style.left = x+'px';
      h.style.top = y+'px';
      requestAnimationFrame(move);
    }
    move();
  }
}
