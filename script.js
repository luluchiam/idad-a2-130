const bubble = document.querySelector('.bubble');
const ambient = document.getElementById('ambient');

// Set initial volume low
ambient.volume = 0.2;

let audioStarted = false;

function unlockAudio() {
  if (!audioStarted) {
    ambient.play().then(() => {
      audioStarted = true;
      console.log("Ocean breeze ambience started");
    }).catch((err) => {
      console.log("Could not autoplay:", err);
    });
  }
}

// Unlock audio on first interaction
bubble.addEventListener('click', unlockAudio);
bubble.addEventListener('mouseenter', unlockAudio);

bubble.addEventListener('mouseenter', () => {
  if (audioStarted) {
    ambient.volume = Math.min(1, ambient.volume + Math.random() * 0.1);
  }
});

bubble.addEventListener('click', () => {
  if (audioStarted) {
    // Maybe slightly change something like add a reverb effect or echo
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioCtx.createMediaElementSource(ambient);
    const gainNode = audioCtx.createGain();

    // small boost + random variation
    gainNode.gain.value = 1 + Math.random() * 0.2;

    source.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    // restore ambient.volume slightly
    ambient.volume = Math.min(1, ambient.volume + 0.05);
  }
});

