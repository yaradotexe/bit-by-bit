// js/state.js - Bit-by-Bit State Management

let userName = 'Guest';
let userScores = {};
let userStats = { streak: 0, lastPlayed: null, totalCorrect: 0, rank: 'Kaffee-Bring-Beauftragte:r', introSeen: false, troubleQuestions: {} };
let settingsState = { effectsEnabled: false, soundEnabled: true, smartMode: false };
let buddyMood = 'neutral';
let firstLoad = true;
let isSkipping = false;

const RANKS = [
    { name: 'Kaffee-Bring-Beauftragte:r', min: 0 },
    { name: 'Praktikant:in', min: 30 },
    { name: 'Auszubildende:r', min: 150 },
    { name: 'System-Flüsterer', min: 300 },
    { name: 'IT-Held:in der Herzen', min: 600 },
    { name: 'IHK-Legende', min: 1000 }
];

let currentQuiz = { active: false, topicId: '', questions: [], currentQuestionIndex: 0, score: 0, currentShuffledOptions: [], currentCorrectIndex: -1 };
let menuState = { active: false, type: 'chapters', items: [], selectedIndex: 0, parentChapter: null };
let setupState = { active: false };
let awaitingConfirmation = { active: false, action: null };
let isBuddyWaiting = false;
let idleTimer = null;
const IDLE_TIMEOUT_MS = 60000;

function applySettings() {
    if (settingsState.effectsEnabled) {
        document.body.classList.add('effects-enabled');
    } else {
        document.body.classList.remove('effects-enabled');
    }
}

function saveToLocalStorage() { 
    localStorage.setItem('ap1_quiz_progress', JSON.stringify({ userName, userScores, userStats, settingsState })); 
}

function loadFromLocalStorage() {
    const saved = localStorage.getItem('ap1_quiz_progress');
    if (saved) { 
        try { 
            const d = JSON.parse(saved); 
            userName = d.userName || 'Guest'; 
            userScores = d.userScores || {}; 
            userStats = { ...userStats, ...d.userStats }; 
            if (d.settingsState) settingsState = { ...settingsState, ...d.settingsState }; 
            applySettings(); 
            return (userName !== 'Guest'); 
        } catch(e) { 
            applySettings(); return false; 
        } 
    }
    applySettings();
    return false;
}

function updateStats(amount) {
    const oldRank = userStats.rank;
    userStats.totalCorrect = Math.max(0, userStats.totalCorrect + amount);
    const newRankObj = RANKS.reduce((prev, curr) => (userStats.totalCorrect >= curr.min) ? curr : prev);
    userStats.rank = newRankObj.name;
    if (oldRank !== userStats.rank) {
        appendToOutput(`\n>>> RANG-UPDATE: ${userStats.rank} <<<`, 'success-msg');
        if (typeof audio !== 'undefined') audio.playRankUpdate();
    }
    saveToLocalStorage();
}

function updateBuddyMood(isCorrect) {
    if (isCorrect) {
        userStats.streak = Math.max(1, userStats.streak + 1);
        if (userStats.streak >= 5) buddyMood = 'proud';
        else if (userStats.streak >= 3) buddyMood = 'happy';
        else buddyMood = 'neutral';
    } else {
        userStats.streak = Math.min(-1, userStats.streak - 1);
        if (userStats.streak <= -5) buddyMood = 'angry';
        else if (userStats.streak <= -3) buddyMood = 'worried';
        else buddyMood = 'neutral';
    }
    refreshHeader();
}

function getBuddyStatus() {
    const cfg = (typeof BUDDY_CONFIG !== 'undefined') ? BUDDY_CONFIG.moods[buddyMood] : { icon: "[ -.- ]", status: "ONLINE" };
    return `STATUS: ${cfg.status}\nBUDDY : ${cfg.icon}\nMOOD  : ${buddyMood.toUpperCase()}`;
}

function getAccuracy() {
    const total = currentQuiz.questions.length;
    if (total === 0) return 100;
    return Math.round((currentQuiz.score / total) * 100);
}

function getBibComment() {
    const accuracy = getAccuracy();
    if (accuracy === 100) return "Perfekt. Endlich mal jemand, der nicht nur Kaffee holt.";
    if (accuracy >= 80) return "Nicht schlecht. Fast so gut wie mein Cache-Management.";
    if (accuracy >= 50) return "Ausbaufähig. Ein Neustart würde dir vielleicht gut tun.";
    return "Autsch. Soll ich dir erklären, was ein Bit ist? Oder fangen wir bei Strom an?";
}
