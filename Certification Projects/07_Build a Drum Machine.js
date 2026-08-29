const pads = [
    { key: 'Q', label: 'Heater 1', file: 'Heater-1.mp3' },
    { key: 'W', label: 'Heater 2', file: 'Heater-2.mp3' },
    { key: 'E', label: 'Heater 3', file: 'Heater-3.mp3' },
    { key: 'A', label: 'Heater 4', file: 'Heater-4_1.mp3' },
    { key: 'S', label: 'Clap', file: 'Heater-6.mp3' },
    { key: 'D', label: 'Open-HH', file: 'Dsc_Oh.mp3' },
    { key: 'Z', label: 'Kick-n-Hat', file: 'Kick_n_Hat.mp3' },
    { key: 'X', label: 'Kick', file: 'RP4_KICK_1.mp3' },
    { key: 'C', label: 'Closed-HH', file: 'Cev_H2.mp3' }
];

const padBank = document.getElementById('pad-bank');
const display = document.getElementById('display');
const BASE_URL = 'https://cdn.freecodecamp.org/curriculum/drum/';

// Кнопки и аудио //

pads.forEach(({ key, label, file }) => {
    const pad = document.createElement('button');
    pad.className = 'drum-pad';
    pad.id = `pad-${key}`;         
    pad.dataset.key = key;
    pad.textContent = key;

    const audio = document.createElement('audio');
    audio.className = 'clip';
    audio.id = key;
    audio.src = BASE_URL + file;
    pad.appendChild(audio);
    padBank.appendChild(pad);
});


// Воспроизведение //
function playPad(key) {
    const audio = document.getElementById(key);
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();  

    const pad = document.querySelector(`.drum-pad[data-key="${key}"]`);
    if (pad) {
        pad.classList.add('active');
        setTimeout(() => pad.classList.remove('active'), 150);
    }

    const padData = pads.find(p => p.key === key);
    if (padData) display.textContent = padData.label;
}


padBank.addEventListener('click', (e) => {
    const pad = e.target.closest('.drum-pad');
    if (!pad) return;
    playPad(pad.dataset.key);
});

// Нажатие клавиши //
document.addEventListener('keydown', (e) => {
    const key = e.key.toUpperCase();
    if (pads.some(p => p.key === key)) {
        e.preventDefault();
        playPad(key);
    }

});
