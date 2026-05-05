// js/main.js - Bit-by-Bit Terminal Main Script

// --- Globals from other modules are assumed available ---

async function showCinematicBoot() {
    isSkipping = false;
    terminalOutput.innerHTML = '';
    const sys = (typeof BUDDY_CONFIG !== 'undefined') ? BUDDY_CONFIG.system : {};

    // 1. BIOS SOUNDS & INITIAL TEXT
    if (typeof audio !== 'undefined') {
        audio.playBiosBeep(); // Das klassische "System OK" Piepen
        audio.startBootRumble(); // Das Rattern geht los
    }

    // Das ASCII-Logo vorbereiten
    const biosLogo = `<div id="bios-logo">
   .-~~^-.
 .'  O    \\
(_____,    \\
 \`----.     \\
       \\     \\
        \\     \\
         \\     \`.             _ _
          \\       ~- _ _ - ~       ~ - .
           \\                              ~-.
            \\                                \`.
             \\    /               /       \\    \\
              \`. |         }     |         }    \\
                \`|        /      |        /       \\
                 |       /       |       /          \\
                 |      /\`- _ _ _|      /.- ~ ^-.     \\
                 |     /         |     /          \`.    \\
                 |     |         |     |             -.   \` . _ _ _ _ _ _
                 |_____|         |_____|                ~ . _ _ _ _ _ _ _ >       ~ - . _ _ _ _ _>
    </div>`;

    terminalOutput.innerHTML = biosLogo;

    // BIOS Text-Output mit deinem neuen Cyrix Prozessor
    await typeWriterOutput("Award Modular BIOS v4.51PG, An Energy Star Ally", "system-msg", 1);
    await typeWriterOutput("BiB-OS (TM) v1.0 - Processor: Cyrix 6x86MX-BiB PR233", "system-msg", 1);

    // 2. MEMORY TEST (mit Sound-Ticks)
    const memoryLimit = 65536;
    for (let i = 0; i <= memoryLimit; i += 8192) {
        if (isSkipping) break;
        const currentContent = terminalOutput.innerHTML.split("Memory Test :ிகளில்")[0];
        terminalOutput.innerHTML = currentContent + "Memory Test : " + i + "K OK";
        if (typeof audio !== 'undefined') audio.playTick();
        await sleep(60);
    }

    await typeWriterOutput("\n\nDetecting IDE Primary Master ... BiB_BRAIN_V1", "system-msg", 1);
    await typeWriterOutput("Detecting IDE Secondary Master ... SARCASM_MODULE", "system-msg", 1);

    if (!isSkipping) await sleep(800);

    // 3. SYSTEM CONFIGURATION TABLE
    terminalOutput.innerHTML = ''; // Clear für die Tabelle
    const tableHTML = `
    <div class="table-header">System Configurations</div>
    <table class="bios-table">
    <tr>
    <td class="label">CPU Type</td><td class="value">Cyrix 6x86MX</td>
    <td class="label">Base Memory</td><td class="value">640K</td>
    </tr>
    <tr>
    <td class="label">Co-Processor</td><td class="value">Installed</td>
    <td class="label">Extended Memory</td><td class="value">65408K</td>
    </tr>
    <tr>
    <td class="label">Sarcasm Level</td><td class="value">Maximum</td>
    <td class="label">Caffeine Cache</td><td class="value">512K</td>
    </tr>
    <tr>
    <td class="label">Coach Mode</td><td class="value">AP1-READY</td>
    <td class="label">Vibe-Check</td><td class="value">Passed</td>
    </tr>
    </table>
    <div style="text-align:center; margin-top:10px; font-size:0.8rem; opacity:0.8;">
    Verifying DMI Pool Data ........... Update Success<br>
    Booting from Hard Disk ........... Done
    </div>
    `;
    terminalOutput.innerHTML = tableHTML;

    if (!isSkipping) await sleep(1800);

    // BIOS ENDE: Das Rattern hört auf
    if (typeof audio !== 'undefined') {
        audio.stopBootRumble();
    }

    terminalOutput.innerHTML = ''; // Screen leeren für den Kernel-Flow

    const hasData = loadFromLocalStorage();
    const detectMsg = (userName && userName !== 'Guest') ? (sys.biometricScan ? sys.biometricScan(userName) : `BENUTZER ERKANNT: ${userName}`) : (sys.biometricNew || "NEUER BENUTZER ERKANNT");
    await typeWriterOutput(`[OK] ${detectMsg}`, "success-msg");

    if (!isSkipping) await sleep(500);

    const bootDate = new Date().toLocaleDateString('de-DE', { month: 'long', day: 'numeric', year: 'numeric' });
    await typeWriterOutput(`SYSTEM INITIALISIERT AM ${bootDate}`, "system-msg");
    if (!isSkipping) await sleep(1500);

    terminalOutput.innerHTML = '';

    if (typeof audio !== 'undefined') audio.startAmbientLoop();

    if (!hasData || userName === 'Guest') {
        const intro = (typeof BUDDY_CONFIG !== 'undefined') ? BUDDY_CONFIG.intro : {};
        await showHeader();

        // Full Intro Sequence from BUDDY_CONFIG
        await typeWriterOutput(`\n[BiB]: ${intro.greeting}`, "success-msg");
        if (!isSkipping) await sleep(2000);

        await typeWriterOutput(`[BiB]: ${intro.explanation}`);
        if (!isSkipping) await sleep(2500);

        await typeWriterOutput(`[BiB]: ${intro.statusBoxInfo}`);
        if (!isSkipping) await sleep(2000);

        await typeWriterOutput(`[BiB]: ${intro.moodInfo}`);
        if (!isSkipping) await sleep(2500);

        await typeWriterOutput(`[BiB]: ${intro.rankInfo}`);
        if (!isSkipping) await sleep(2000);

        await typeWriterOutput(`[BiB]: ${intro.rankStart}`);
        if (!isSkipping) await sleep(3000);

        await typeWriterOutput(`[BiB]: ${intro.workInProgress}`);
        if (!isSkipping) await sleep(2500);

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

async function showStartMenu(isInitialSetup = false) {
    if (!isInitialSetup) {
        terminalOutput.innerHTML = '';
        await showHeader();
    }

    // --- TÄGLICHE BEGRÜSSUNG (Zufällig) ---
    // Wird nur gezeigt, wenn es NICHT das erste Setup ist und es der erste Load der Session ist
    if (firstLoad && !isInitialSetup) {
        let greetText;
        const isRareGreeting = Math.random() < 0.05; // 5% Chance auf den Spezial-Roast

        if (isRareGreeting) {
            // Dein Wunsch-Satz als seltenes Easter Egg
            greetText = `Willkommen zurück, ${userName}. Ich habe die Zeit deiner Abwesenheit genutzt, um deine bisherigen Fehler zu katalogisieren. Es war eine lange Liste. Wollen wir anfangen?`;
        } else {
            const greetings = [
                `[SESSION_RESTORED]: Hey ${userName}! Fokus-Modus an? Gut.`, 
                `Willkommen zurück, ${userName}! Koffein-Level stabil?`, 
                `Da bist du ja wieder. Weniger scrollen, mehr coden, ${userName}.`, 
                `[USER_AUTH]: ${userName} angemeldet. Bereit für die AP1?`, 
                `Connection established. Okay ${userName}, bereit für das nächste Level?`, 
                `Verbindung steht. Mein RAM wartet auf dein Genie.`
            ];
            greetText = greetings[Math.floor(Math.random() * greetings.length)];
        }

        await typeWriterOutput("\n" + greetText, isRareGreeting ? "warning-msg" : "success-msg");
        await typeWriterOutput("Tippe /help für eine Liste der Befehle.", "system-msg");
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

        if (val.toLowerCase() === '/exit') { if(commands['/exit']) commands['/exit'](); return; }

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
            if (awaitingConfirmation.action === 'sudo_password') {
                awaitingConfirmation.active = false;
                await typeWriterOutput("\n[BiB]: Passwort korrekt.");
                await sleep(1500);
                await typeWriterOutput("Scherz. Du hast hier immer noch nichts zu melden.");
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
            userName = val; 
            setupState.active = false; 
            userStats.introSeen = true; 
            firstLoad = false; 
            saveToLocalStorage();
            terminalOutput.innerHTML = '';
            terminalHeader.innerHTML = '';
            
            // Clean welcome for new users
            await showHeader();
            await typeWriterOutput(`\nWillkommen, ${userName}!`, "success-msg");
            await typeWriterOutput("Ich habe dein Profil angelegt. Lass uns mit deiner Vorbereitung starten.");
            
            showStartMenu(true); // Added flag to skip re-running header logic
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
                await typeWriterOutput(sel.content);
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
            const parts = val.split(' ');
            let cmd = parts[0].toLowerCase();
            const args = parts.slice(1).join(' ');

            if (cmd === 'sudo') {
                if(commands['/sudo']) commands['/sudo']();
                return;
            }

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
    applySettings();
    await typeWriterOutput("\n[!] WARNUNG: EPILEPSIE-GEFAHR", "error-msg");
    await typeWriterOutput("Dieses PROGRAMM nutzt LICHTEFFEKTE (CRT-Flimmern, Feuerwerk),\ndie bei fotosensibler EPILEPSIE ANFÄLLE auslösen können.");
    await typeWriterOutput("\nBesteht eine bekannte EPILEPSIE oder LICHT-SENSIBILITÄT? (y/n)", "success-msg");

    awaitingConfirmation.active = true;
    awaitingConfirmation.action = 'epilepsy_check';

    // AUDIO-UNLOCK: Browsers block audio until user interaction.
    // We resume the AudioContext on the first keypress.
    const unlockAudio = async () => {
        if (typeof audioCtx !== 'undefined' && audioCtx) {
            if (audioCtx.state === 'suspended') {
                await audioCtx.resume();
            }
        }
        window.removeEventListener('keydown', unlockAudio);
    };
    window.addEventListener('keydown', unlockAudio);
})();
