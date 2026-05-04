// audio.js - Synthesized Sound Effects, MP3 Support & Ambient Retro Noises
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

const initAudio = () => {
    if (!audioCtx) audioCtx = new AudioContext();
    if (audioCtx.state === 'suspended') audioCtx.resume();
};

const audio = {
    shouldPlay: () => {
        // If settingsState exists and soundEnabled is explicitly false, don't play
        if (typeof settingsState !== 'undefined' && settingsState.soundEnabled === false) return false;
        return true;
    },

    playTone: (freq, type, duration, vol = 0.1) => {
        if (!audioCtx || !audio.shouldPlay()) return;
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(vol, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    },
    
    playFile: async (url, vol = 0.3) => {
        if (!audio.shouldPlay()) return;
        initAudio();
        try {
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
            const source = audioCtx.createBufferSource();
            const gainNode = audioCtx.createGain();
            source.buffer = audioBuffer;
            gainNode.gain.setValueAtTime(vol, audioCtx.currentTime);
            source.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            source.start();
            return source;
        } catch (e) {
            console.error("Audio file error:", e);
        }
    },

    playTick: () => audio.playTone(800 + Math.random() * 200, 'square', 0.03, 0.01),
    playKeypress: () => audio.playTone(400 + Math.random() * 100, 'triangle', 0.04, 0.015),
    playCorrect: () => {
        audio.playTone(600, 'sine', 0.1, 0.1);
        setTimeout(() => audio.playTone(800, 'sine', 0.2, 0.1), 100);
    },
    playRankUpdate: () => {
        audio.playTone(400, 'sine', 0.1, 0.1);
        setTimeout(() => audio.playTone(500, 'sine', 0.1, 0.1), 100);
        setTimeout(() => audio.playTone(600, 'sine', 0.3, 0.1), 200);
    },
    playWrong: () => audio.playTone(150, 'sawtooth', 0.4, 0.15),
    playBoot: () => {
        audio.playTone(200, 'square', 0.1, 0.05);
        setTimeout(() => audio.playTone(400, 'square', 0.1, 0.05), 100);
        setTimeout(() => audio.playTone(800, 'square', 0.4, 0.05), 200);
    },
    playScramble: () => audio.playTone(1200 + Math.random() * 400, 'square', 0.02, 0.005),

    // Randomized Ambient Sounds (Synthesized)
    playAmbientRandom: () => {
        const types = ['disk', 'beep', 'static'];
        const type = types[Math.floor(Math.random() * types.length)];
        
        if (type === 'disk') {
            // Simulated floppy drive seek
            for(let i=0; i<5; i++) {
                setTimeout(() => audio.playTone(100 + Math.random()*50, 'sawtooth', 0.05, 0.01), i*60);
            }
        } else if (type === 'beep') {
            // Short high pitched status beep
            audio.playTone(2000 + Math.random()*1000, 'sine', 0.05, 0.005);
        } else if (type === 'static') {
            // Burst of white noise
            if (!audioCtx) return;
            const bufferSize = audioCtx.sampleRate * 0.1;
            const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
            const source = audioCtx.createBufferSource();
            const gain = audioCtx.createGain();
            source.buffer = buffer;
            gain.gain.value = 0.005;
            source.connect(gain);
            gain.connect(audioCtx.destination);
            source.start();
        }
    },

    startAmbientLoop: () => {
        setInterval(() => {
            if (Math.random() > 0.7) audio.playAmbientRandom();
        }, 15000); // Check every 15 seconds
    }
};

document.addEventListener('click', initAudio, { once: true });
document.addEventListener('keydown', initAudio, { once: true });
