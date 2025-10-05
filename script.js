//  AUDIO + TONE SETUP
const ambient = document.getElementById("ambient");
const container = document.getElementById("bubble-container");
const popup = document.getElementById("welcome-popup");
const startBtn = document.getElementById("start-btn");

const playBtn = document.getElementById("play-btn");
const pauseBtn = document.getElementById("pause-btn");
const muteBtn = document.getElementById("mute-btn");

ambient.volume = 0.4;

// Load Tone.js Synth
const synth = new Tone.Synth({
  oscillator: { type: "sine" },
  envelope: { attack: 0.05, decay: 0.2, sustain: 0.3, release: 0.6 },
}).toDestination();

// Musical notes for bubbles
const notes = ["C4", "D4", "E4", "G4", "A4", "C5", "D5", "E5"];

//  BUBBLE CREATION
function createBubbles() {
  for (let i = 0; i < 12; i++) {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");

    const size = Math.random() * 100 + 80; // 80–180px
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${Math.random() * 100}vw`;
    bubble.style.bottom = `-${Math.random() * 200}px`;

    // Slower floating
    bubble.style.animationDuration = `${Math.random() * 10 + 15}s`;

    // Assign random note
    const note = notes[Math.floor(Math.random() * notes.length)];

    // Bubble click - plays a note
    bubble.addEventListener("click", async () => {
      await Tone.start(); // unlock audio context (required for first interaction)
      synth.triggerAttackRelease(note, "8n"); // play the note

      const popSound = new Audio(
        "https://cdn.pixabay.com/download/audio/2021/08/04/audio_9adad6781e.mp3?filename=bubble-pop-6872.mp3"
      );
      popSound.volume = 0.3;
      popSound.play();
    });

    container.appendChild(bubble);

    // Recreate bubbles when animation ends
    bubble.addEventListener("animationend", () => {
      container.removeChild(bubble);
      createBubbles();
    });
  }
}

//  POPUP INTERACTION
startBtn.addEventListener("click", () => {
  popup.style.display = "none";
  ambient.play();
  createBubbles();
});

//  AUDIO CONTROLS
playBtn.addEventListener("click", () => ambient.play());
pauseBtn.addEventListener("click", () => ambient.pause());
muteBtn.addEventListener("click", () => (ambient.muted = !ambient.muted));
