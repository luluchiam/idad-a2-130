const bubble = document.querySelector('.bubble');
const ambient = document.getElementById('ambient');


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


bubble.addEventListener('click', unlockAudio);
bubble.addEventListener('mouseenter', unlockAudio);

bubble.addEventListener('mouseenter', () => {
  if (audioStarted) {
    ambient.volume = Math.min(1, ambient.volume + Math.random() * 0.1);
  }
});

bubble.addEventListener('click', () => {
  if (audioStarted) {
 
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioCtx.createMediaElementSource(ambient);
    const gainNode = audioCtx.createGain();

    
    gainNode.gain.value = 1 + Math.random() * 0.2;

    source.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    
    ambient.volume = Math.min(1, ambient.volume + 0.05);
  }
});

