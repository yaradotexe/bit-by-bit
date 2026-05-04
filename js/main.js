// js/main.js - Bit-by-Bit Terminal Main Script

// --- Globals from other modules are assumed to be available in the global scope (browser) ---

async function showCinematicBoot() {
    isSkipping = false;
    terminalOutput.innerHTML = '';
    const sys = (typeof BUDDY_CONFIG !== 'undefined') ? BUDDY_CONFIG.system : {};
    
    if (typeof audio !== 'undefined') {
        audio.playFile('boot.mp3', 0.6);
        audio.playBoot();
    }

    // Sequence from Codepen 4 snippet
    await typeWriterOutput("[INITIALISIERE KERNEL...]", "system-msg");
    await new Promise(r => setTimeout(r, 400));
    await typeWriterOutput("[LADE ASSETS...]", "system-msg");
    await showProgressBar(1000);
    
    await typeWriterOutput("\n" + (sys.boot ? sys.boot[0] : "SYSTEM BEREIT"), "system-msg");
    await new Promise(r => setTimeout(r, 400));
    
    const hasData = loadFromLocalStorage();
    const detectMsg = (userName && userName !== 'Guest') ? (sys.biometricScan ? sys.biometricScan(userName) : `BENUTZER ERKANNT: ${userName}`) : (sys.biometricNew || "NEUER BENUTZER ERKANNT");
    await typeWriterOutput(`[OK] ${detectMsg}`, "success-msg");
    
    if (!isSkipping) await new Promise(r => setTimeout(r, 800));
    terminalOutput.innerHTML = '';
    
    await typeWriterOutput(sys.accessGranted || "ZUGRIFF GEWÄHRT", "success-msg", 2);
    if (!isSkipping) await new Promise(r => setTimeout(r, 1000));
    
    const bootDate = new Date().toLocaleDateString('de-DE', { month: 'long', day: 'numeric', year: 'numeric' });
    await scrambleText(`\nSYSTEM INITIALISIERT AM ${bootDate}`, "system-msg");
    if (!isSkipping) await new Promise(r => setTimeout(r, 1500));
    
    terminalOutput.innerHTML = '';
    
    if (typeof audio !== 'undefined') audio.startAmbientLoop();
    
    if (!hasData || userName === 'Guest') {
        const intro = (typeof BUDDY_CONFIG !== 'undefined') ? BUDDY_CONFIG.intro : {};
        await showHeader();
        
        // Full Intro Sequence
        await typeWriterOutput(`\n[BiB]: ${intro.greeting || "Hallo!"}`, "success-msg");
        if (!isSkipping) await new Promise(r => setTimeout(r, 2000));
        
        await typeWriterOutput(`[BiB]: ${intro.explanation || "Ich bin dein Buddy."}`);
        if (!isSkipping) await new Promise(r => setTimeout(r, 2500));
        
        await typeWriterOutput(`[BiB]: ${intro.statusBoxInfo}`);
        if (!isSkipping) await new Promise(r => setTimeout(r, 2000));
        
        await typeWriterOutput(`[BiB]: ${intro.moodInfo}`);
        if (!isSkipping) await new Promise(r => setTimeout(r, 2500));
        
        await typeWriterOutput(`[BiB]: ${intro.rankInfo}`);
        if (!isSkipping) await new Promise(r => setTimeout(r, 2000));
        
        await typeWriterOutput(`[BiB]: ${intro.rankStart}`);
        if (!isSkipping) await new Promise(r => setTimeout(r, 3000));
        
        await typeWriterOutput("\n[BiB]: Btw...");
        if (!isSkipping) await new Promise(r => setTimeout(r, 2000));
        
        await typeWriterOutput(`[BiB]: ${intro.workInProgress}`);
        if (!isSkipping) await new Promise(r => setTimeout(r, 2500));

        await typeWriterOutput(`\n[BiB]: ${intro.setupQuestion || "Wie darf ich dich nennen?"}`, "success-msg");
        setupState.active = true;
    } else {
        showStartMenu();
    }
    isSkipping = false;
}

function resetIdleTimer() {
    if (idleTimer) clearTimeout(idleTimer);
    isBuddyWaiting = false; 
    idleTimer = setTimeout(async () => {
        if (!currentQuiz.active && !setupState.active && !awaitingConfirmation.active && !menuState.active) {
            const cfg = (typeof BUDDY_CONFIG !== 'undefined') ? BUDDY_CONFIG.catchphrases.idle : ["Noch da?"];
            const msg = cfg[Math.floor(Math.random() * cfg.length)];
            await typeWriterOutput(`\n[Buddy]: ${msg}`, "system-msg");
            isBuddyWaiting = true;
        } else {
            resetIdleTimer();
        }
    }, IDLE_TIMEOUT_MS);
}

async function showStartMenu() {
    terminalOutput.innerHTML = '';
    await showHeader();
    
    if (firstLoad && !userStats.introSeen) {
        await typeWriterOutput(`\nWillkommen, ${userName}!`, "success-msg");
        await typeWriterOutput("\n[BiB]: Ich bin bereit, dich durch die AP1 zu peitschen.");
        userStats.introSeen = true;
        saveToLocalStorage();
    }

    if (firstLoad) {
        const greetText = (typeof BUDDY_CONFIG !== 'undefined') ? (BUDDY_CONFIG.returningGreeting ? BUDDY_CONFIG.returningGreeting(userName) : `Willkommen zurück, ${userName}!`) : `Willkommen zurück, ${userName}!`;
        await typeWriterOutput("\n" + greetText, "success-msg");
        firstLoad = false;
    }
    
    await typeWriterOutput("\n" + "=".repeat(40), "menu-header");
    await typeWriterOutput("[HAUPTMENÜ - BIBS BEFEHLSZENTRALE]:", "menu-header");
    await typeWriterOutput("=".repeat(40), "menu-header");
    appendToOutput("  /start       - Marathon-Modus (Alle Fragen, zufällig)");
    appendToOutput("  /topics      - Die Liste der Verdammnis (Themenübersicht)");
    appendToOutput("  /lernen      - Wissenstransfer (Lern-Modul)");
    appendToOutput("  /settings    - Systemeinstellungen");
    appendToOutput("  /help        - Hilfe");
    appendToOutput("-".repeat(40));
    
    await typeWriterOutput("\nNa los, tipp was ein. Womit machen wir heute weiter?", "system-msg");
    menuState.active = false;
    resetIdleTimer();
}

// Event Listeners
document.addEventListener('click', () => {
    commandInput.focus();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') isSkipping = true;
});

// Intro continuation via Enter
document.addEventListener('keydown', async (event) => {
    if (awaitingConfirmation.active && awaitingConfirmation.action === 'intro_continue' && event.key === 'Enter') {
        awaitingConfirmation.active = false;
        showStartMenu();
    }
});

commandInput.addEventListener('keydown', async function(event) {
    resetIdleTimer();
    if (typeof audio !== 'undefined' && event.key !== 'Enter') audio.playKeypress();
    
    if (menuState.active && (event.key === 'ArrowUp' || event.key === 'ArrowDown')) {
        event.preventDefault();
        const menuLines = terminalOutput.querySelectorAll('.menu-item, .menu-header');
        menuLines.forEach(l => l.remove());
        if (event.key === 'ArrowUp') menuState.selectedIndex = (menuState.selectedIndex - 1 + menuState.items.length) % menuState.items.length;
        if (event.key === 'ArrowDown') menuState.selectedIndex = (menuState.selectedIndex + 1) % menuState.items.length;
        renderMenu();
        return;
    }

    if (event.key === 'Enter') {
        const val = commandInput.value.trim();
        commandInput.value = '';

        if (val.toLowerCase() === '/exit') { commands['/exit'](); return; }

        if (awaitingConfirmation.active) {
            const lowVal = val.toLowerCase();
            if (awaitingConfirmation.action === 'epilepsy_check') {
                if (lowVal === 'n') {
                    settingsState.effectsEnabled = true;
                    applySettings();
                    appendToOutput("[SYSTEM]: Lichteffekte AKTIVIERT.", "success-msg");
                } else {
                    settingsState.effectsEnabled = false;
                    applySettings();
                    appendToOutput("[SYSTEM]: Lichteffekte bleiben DEAKTIVIERT.", "system-msg");
                }
                awaitingConfirmation.active = false;
                showCinematicBoot();
                return;
            }
            if (awaitingConfirmation.action === 'intro_continue' || awaitingConfirmation.action === 'system_start') {
                const action = awaitingConfirmation.action;
                awaitingConfirmation.active = false;
                if (action === 'system_start') showCinematicBoot();
                else showStartMenu();
                return;
            }
            if (awaitingConfirmation.action === 'reload' && lowVal === 'y') { 
                localStorage.removeItem('ap1_quiz_progress'); 
                location.reload(); 
                return; 
            }
            awaitingConfirmation.active = false;
            return;
        }

        if (setupState.active) {
            if (val === '') return;
            userName = val; setupState.active = false; saveToLocalStorage();
            terminalHeader.innerHTML = '';
            showStartMenu();
            return;
        }

        if (currentQuiz.active) {
            const ans = parseInt(val, 10);
            if (!isNaN(ans) && ans > 0 && ans <= currentQuiz.currentShuffledOptions.length) {
                const cfg = (typeof BUDDY_CONFIG !== 'undefined') ? BUDDY_CONFIG.catchphrases : { correct: ["Korrekt!"], wrong: ["Falsch!"] };
                const isCorrect = (ans - 1 === currentQuiz.currentCorrectIndex);
                updateBuddyMood(isCorrect);
                if (isCorrect) { 
                    const msg = cfg.correct[Math.floor(Math.random() * cfg.correct.length)];
                    appendToOutput(msg); 
                    currentQuiz.score++; 
                    updateStats(10);
                    if (typeof audio !== 'undefined') audio.playCorrect();
                } else { 
                    const q = currentQuiz.questions[currentQuiz.currentQuestionIndex];
                    userStats.troubleQuestions[q.question] = (userStats.troubleQuestions[q.question] || 0) + 1;
                    const msg = cfg.wrong[Math.floor(Math.random() * cfg.wrong.length)];
                    appendToOutput(msg, 'error-msg'); 
                    updateStats(-5);
                    if (typeof audio !== 'undefined') audio.playWrong();
                }
                currentQuiz.currentQuestionIndex++;
                displayQuestion();
                refreshHeader();
            }
            return;
        }

        if (menuState.active && val === '') {
            const sel = menuState.items[menuState.selectedIndex];
            if (menuState.type === 'settings') {
                if (sel.action === 'crt') commands['/crt']();
                else if (sel.action === 'sound') commands['/sound']();
                else if (sel.action === 'smart') commands['/smart']();
                else if (sel.action === 'save') commands['/save']();
                else if (sel.action === 'import') commands['/import']();
                else if (sel.action === 'exit') commands['/exit']();
                return;
            }
            if (menuState.type === 'learning') {
                terminalOutput.innerHTML = '';
                showHeader();
                appendToOutput(`\n--- ${sel.title} ---`, "success-msg");
                typeWriterOutput(sel.content);
                appendToOutput("\nTippe /exit für das Menü.");
                menuState.active = false;
                return;
            }
            if (menuState.type === 'chapters') {
                menuState.type = 'subsections';
                menuState.items = [...sel.subsections];
                menuState.selectedIndex = 0;
                const menuLines = terminalOutput.querySelectorAll('.menu-item, .menu-header');
                menuLines.forEach(l => l.remove());
                renderMenu();
            } else {
                menuState.active = false;
                commands['start quiz'](sel.id);
            }
            return;
        }

        if (val !== '') {
            const lowVal = val.toLowerCase();
            const parts = val.split(' ');
            let cmd = parts[0].toLowerCase();
            const args = parts.slice(1).join(' ');

            if (!cmd.startsWith('/')) {
                if (commands['/' + cmd]) {
                    commands['/' + cmd](args);
                    return;
                }
            }

            if (commands[cmd]) {
                commands[cmd](args);
            } else {
                const cfg = (typeof BUDDY_CONFIG !== 'undefined') ? BUDDY_CONFIG.catchphrases : { unknownCommand: ["?"] };
                appendToOutput(`[BiB]: ${cfg.unknownCommand[Math.floor(Math.random() * cfg.unknownCommand.length)]}`);
            }
        }
    }
});

// Initialization
(async () => {
    terminalOutput.innerHTML = '';
    applySettings(); // Ensure effects are OFF at start
    await typeWriterOutput("\n[!] WARNUNG: EPILEPSIE-GEFAHR", "error-msg");
    await typeWriterOutput("Dieses Programm nutzt Lichteffekte (CRT-Flimmern, Feuerwerk),\ndie bei fotosensibler Epilepsie Anfälle auslösen können.");
    await typeWriterOutput("\nBesteht eine bekannte Epilepsie oder Licht-Sensibilität? (y/n)", "success-msg");
    
    awaitingConfirmation.active = true;
    awaitingConfirmation.action = 'epilepsy_check';
})();
