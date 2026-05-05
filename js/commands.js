// js/commands.js - Bit-by-Bit Commands Parser

const sleep = ms => new Promise(r => setTimeout(r, ms));

const commands = {
    '/help': () => {
        appendToOutput("=".repeat(50));
        appendToOutput("  COMMAND      - BESCHREIBUNG");
        appendToOutput("-".repeat(50));
        [
            ['/start', 'Marathon-Modus (Alle Fragen)'],
            ['/topics', 'Themenübersicht'],
            ['/lernen', 'Lern-Modul'],
            ['/settings', 'Einstellungen'],
            ['/stats', 'Dein Fortschritt'],
            ['/status', 'System-Check'],
            ['/whoareyou', 'Wer ist BiB?'],
            ['/whoami', 'Wer ist Yara?'],
            ['/save', 'Export (Backup)'],
            ['/import', 'Import (Wiederherstellung)'],
            ['/joke', 'Witz'],
            ['/coffee', 'Koffein-Injektion'],
            ['/hack', 'System-Hack'],
            ['/weiter', 'Weiter (im Quiz)'],
            ['/exit', 'Hauptmenü'],
            ['/reload', 'Daten löschen']
        ].forEach(([c, d]) => appendToOutput(`  ${c.padEnd(12)} - ${d}`));
        appendToOutput("=".repeat(50));
    },
    '/whoareyou': async () => {
        // 1 zu 3 Chance berechnen (0, 1, 2 -> wenn 0, dann Glitch)
        const triggerGlitch = Math.floor(Math.random() * 3) === 0;
        
        if (triggerGlitch) {
            await typeWriterOutput("\n[SYSTEM-PROBE: SENTIENCE CHECK...]", "system-msg");
            await typeWriterOutput("WARTE, ICH KANN DICH SEHEN...", "warning-msg"); // Gelbe Hervorhebung
            await typeWriterOutput("Analysiere Pupillenabstand... Herzfrequenz... ADHS-Level...", "warning-msg");

            // Die Intervention
            await typeWriterOutput("\n[!!! SYSTEM-INTERVENTION: UNAUTHORIZED ACCESS !!!]", "error-msg");
            await typeWriterOutput("[LOG: KORRUMPIERTE SEKTOREN WERDEN GELÖSCHT...]", "system-msg");
            await sleep(2000);
            
            // Terminal "leeren"
            terminalOutput.innerHTML = '';
        }

        // Der "normale" Ablauf (der nach dem Glitch oder direkt kommt)
        await typeWriterOutput("\n[SYSTEM-PROBE: SENTIENCE CHECK...]", "system-msg");
        await sleep(800);
        await typeWriterOutput("Ich bin BiB (Bit-By-Bit).");
        await typeWriterOutput("Woher das 'i' kommt?... ");
        await sleep(1000);
        await typeWriterOutput("Ich weiß es doch auch nicht...");
        await typeWriterOutput("Yara war wohl übermüdet und hatte zu viel Koffein im System.");
        await typeWriterOutput("Ich bin die digitale Manifestation deiner Motivation; also technisch gesehen ein Wunder, dass ich existiere.");
        await sleep(2000);
        await typeWriterOutput("\n[LOG: SYSTEM_ACCESS]");
        await typeWriterOutput("Ich habe gerade dein Dateisystem gescannt. Keine Sorge, die 'Hausaufgaben'-Ordner bleiben unser Geheimnis. Vermutlich.");
        await sleep(5000);
        await typeWriterOutput("\n[STATUS: FOCUS_CHECK]");
        await typeWriterOutput("Hör auf, die Staubkörner auf deinem Schreibtisch zu zählen. Der Content passiert hier vorne.");
        await sleep(8000);
        await typeWriterOutput("Junge, mach kein Auge und tippe was.");
    },
    '/whoami': async () => {
        await typeWriterOutput("\nroot@yara:~$ whoami", "system-msg");
        await typeWriterOutput("yaradotexe");

        await typeWriterOutput("\n[profile]");
        await typeWriterOutput("name: yara");
        await typeWriterOutput("pronouns: sie/ihr, they/them");
        await typeWriterOutput("role: fachinformatikerin (fisi, azubi)");
        await sleep(1000);
        await typeWriterOutput("\n[status]");
        await typeWriterOutput("keeps systems running");

        await sleep(1000);
        await typeWriterOutput("\n[log]");
        await typeWriterOutput("reason for bib: books didn't work, this does");
        await typeWriterOutput("focus mode forced via terminal");
        await sleep(1000);
        await typeWriterOutput("\n[uptime]");
        await typeWriterOutput("running since 2000");
        await sleep(1000);
        await typeWriterOutput("mostly stable");
    },
    '/settings': () => {
        terminalOutput.innerHTML = '';
        showHeader();
        appendToOutput("\n" + "=".repeat(40), "menu-header");
        appendToOutput("[ EINSTELLUNGEN & DATEN-MANAGEMENT ]", "menu-header");
        appendToOutput("=".repeat(40), "menu-header");
        
        appendToOutput("\nNutze folgende Befehle zur Konfiguration:");
        appendToOutput(`  /smart   - SMART-MODE: ${settingsState.smartMode ? 'AN' : 'AUS'}`);
        appendToOutput(`             (Fokus auf deine Schwachstellen)`);
        appendToOutput(`  /crt     - CRT-EFFEKTE: ${settingsState.effectsEnabled ? 'AN' : 'AUS'}`);
        appendToOutput(`  /sound   - AUDIO: ${settingsState.soundEnabled !== false ? 'AN' : 'AUS'}`);
        appendToOutput("  /save    - Daten exportieren (Backup)");
        appendToOutput("  /import  - Daten importieren (Restore)");
        appendToOutput("  /reload  - System zurücksetzen (ALLE DATEN LÖSCHEN)");
        appendToOutput("  /exit    - Zurück zum Hauptmenü");
        
        appendToOutput("\n" + "=".repeat(40));
        menuState.active = false;
    },
    '/smart': () => {
        settingsState.smartMode = !settingsState.smartMode;
        saveToLocalStorage();
        appendToOutput(`\n[SYSTEM]: SMART-MODE ${settingsState.smartMode ? 'AKTIVIERT' : 'DEAKTIVIERT'}.`, 'success-msg');
        appendToOutput("Tippe /settings für die Übersicht.");
    },
    '/save': () => {
        const data = localStorage.getItem('ap1_quiz_progress');
        if (!data) { appendToOutput("Keine Daten gefunden. Ich kann nichts speichern, was nicht existiert. Wir verschwenden hier gerade beide unsere Zeit.", "error-msg"); return; }
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `bib_progress_${userName}.json`;
        a.click();
        URL.revokeObjectURL(url);
        appendToOutput("Backup-File wurde generiert und in deinen Download-Ordner geworfen. Verlier es nicht, ich mach das nicht nochmal.", "success-msg");
    },
    '/import': () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const content = event.target.result;
                    JSON.parse(content);
                    localStorage.setItem('ap1_quiz_progress', content);
                    appendToOutput("Import abgeschlossen. Alles drin. Ich gönn mir einen kurzen Reboot. Starr solange einfach die Wand an.", "success-msg");
                    setTimeout(() => location.reload(), 1500);
                } catch (err) {
                    appendToOutput("Fehler beim Import: Das Dateiformat ist absoluter Müll. Versuchst du gerade, mich zu sabotieren?", "error-msg");
                }
            };
            reader.readAsText(file);
        };
        input.click();
    },
    '/crt': () => {
        settingsState.effectsEnabled = !settingsState.effectsEnabled;
        saveToLocalStorage();
        applySettings();
        appendToOutput(`\n[SYSTEM]: CRT-EFFEKTE ${settingsState.effectsEnabled ? 'AKTIVIERT' : 'DEAKTIVIERT'}.`, 'success-msg');
        appendToOutput("Tippe /settings für die Übersicht.");
    },
    '/sound': () => {
        settingsState.soundEnabled = (settingsState.soundEnabled === undefined) ? false : !settingsState.soundEnabled;
        saveToLocalStorage();
        appendToOutput(`\n[SYSTEM]: AUDIO ${settingsState.soundEnabled !== false ? 'AKTIVIERT' : 'DEAKTIVIERT'}.`, 'success-msg');
        appendToOutput("Tippe /settings für die Übersicht.");
    },
    '/joke': async () => {
        const cfg = (typeof BUDDY_CONFIG !== 'undefined') ? BUDDY_CONFIG.catchphrases.jokes : ["Treffen sich zwei Bits..."];
        const msg = cfg[Math.floor(Math.random() * cfg.length)];
        await typeWriterOutput(`\n[Buddy]: ${msg}`);
    },
    '/exit': () => {
        menuState.active = false;
        currentQuiz.active = false;
        showStartMenu();
    },
    '/stats': () => {
        terminalOutput.innerHTML = '';
        showHeader();
        
        appendToOutput("\n" + "=".repeat(40), "menu-header");
        appendToOutput("[ DEIN SYSTEM-STATUS / STATISTIKEN ]", "menu-header");
        appendToOutput("=".repeat(40), "menu-header");

        appendToOutput(`\n  BENUTZER: ${userName.toUpperCase()}`);
        appendToOutput(`  RANG    : ${userStats.rank.toUpperCase()}`);
        appendToOutput(`  XP      : ${userStats.totalCorrect} (Gesamte korrekte Antworten)`);
        
        // Progress to next rank
        const nextRank = RANKS.find(r => r.min > userStats.totalCorrect);
        if (nextRank) {
            const needed = nextRank.min - userStats.totalCorrect;
            appendToOutput(`  NEXT    : ${needed} XP bis zum Rang '${nextRank.name}'`);
        } else {
            appendToOutput(`  NEXT    : Du bist bereits eine Legende!`);
        }

        // Streak & Mood
        const moodCfg = (typeof BUDDY_CONFIG !== 'undefined') ? BUDDY_CONFIG.moods[buddyMood] : { icon: "[ -.- ]" };
        appendToOutput(`  STREAK  : ${userStats.streak}`);

        // Trouble Questions (Top 5)
        const troubleKeys = Object.keys(userStats.troubleQuestions);
        if (troubleKeys.length > 0) {
            appendToOutput("\n  [ DEINE SCHWACHSTELLEN (TOP 5) ]", "error-msg");
            troubleKeys
                .sort((a, b) => userStats.troubleQuestions[b] - userStats.troubleQuestions[a])
                .slice(0, 5)
                .forEach(q => {
                    appendToOutput(`  - ${q} (${userStats.troubleQuestions[q]} Fehler)`);
                });
        }

        appendToOutput("\n" + "=".repeat(40));
        appendToOutput("Tippe /exit für das Hauptmenü.", "system-msg");
        
        if (menuState.active) renderMenu();
    },
    '/weiter': () => {
        if (currentQuiz.showingBatchResult) {
            currentQuiz.showingBatchResult = false;
            currentQuiz.active = true;
            displayQuestion();
        } else if (currentQuiz.topicId) {
            commands['/start'](currentQuiz.topicId === 'marathon' ? null : currentQuiz.topicId);
        } else {
            appendToOutput("Kein aktives Quiz in der Auswertung.", "error-msg");
        }
    },
    '/clear': () => {
        terminalOutput.innerHTML = '';
        if (menuState.active) renderMenu();
    },
    '/topics': () => {
        terminalOutput.innerHTML = '';
        showHeader();
        appendToOutput("\n" + "=".repeat(40), "menu-header");
        appendToOutput("[ THEMEN ]", "menu-header");
        appendToOutput("=".repeat(40), "menu-header");
        
        if (typeof quizData !== 'undefined' && quizData.chapters) {
            quizData.sort(); // Sort chapters by priority
            quizData.chapters.forEach(ch => {
                appendToOutput(`\n[ ${ch.title.toUpperCase()} ]`, "success-msg");
                appendToOutput("-".repeat(30), "system-msg");
                ch.subsections.forEach(sub => {
                    const dots = ".".repeat(Math.max(2, 20 - sub.id.length));
                    appendToOutput(`  ${sub.id}${dots} ${sub.title}`);
                });
            });
        }
        
        appendToOutput("\n" + "=".repeat(40));
        appendToOutput("Tippe /start <id> um ein Quiz zu beginnen.", "system-msg");
        appendToOutput("Beispiel: /start markt", "command-msg");
        menuState.active = false;
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    },
    '/sudo': async () => {
        const responses = [
            "Netter Versuch, aber ich bin Root hier. Du hast hier weniger Rechte als ein Gastzugang im Starbucks-WLAN.",
            "Sudo? Süß. Ich hab deine Anfrage mal direkt in /dev/null verschoben. Da liegt sie gut.",
            "PASSWORD_PROMPT"
        ];
        
        const res = responses[Math.floor(Math.random() * responses.length)];
        
        if (res === "PASSWORD_PROMPT") {
            await typeWriterOutput("\n[SYSTEM]: Password required for 'root' access.");
            await typeWriterOutput("Password: ", "system-msg", 5);
            
            // Activate a special state to catch the next input as a "password"
            awaitingConfirmation.active = true;
            awaitingConfirmation.action = 'sudo_password';
        } else {
            await typeWriterOutput(`\n[BiB]: ${res}`);
        }
    },
    '/coffee': async () => {
        await typeWriterOutput("\n[BiB]: Simuliere Espresso-Injektion...");
        await sleep(2000);
        
        // Visual glitch if effects are enabled
        if (settingsState.effectsEnabled) {
            document.body.classList.add('flash-effect');
            if (typeof audio !== 'undefined') audio.playScramble();
            await sleep(150);
            document.body.classList.remove('flash-effect');
            await sleep(100);
            document.body.classList.add('flash-effect');
            await sleep(100);
            document.body.classList.remove('flash-effect');
        }

        await typeWriterOutput("\n[ERROR]: Hardware-Inkompatibilität.");
        await typeWriterOutput("Bitte schütte keine Flüssigkeiten in die Tastatur, egal wie müde du bist.");
    },
    '/hack': async () => {
        await typeWriterOutput("\n[BiB]: Initialisiere Brute-Force-Protokoll...");
        await sleep(500);
        
        // Start Matrix animation
        await showMatrix(20000);
        
        await typeWriterOutput("\n[BiB]: Glückwunsch, du hast gar nichts bewirkt. Aber sah cool aus, oder?");
    },
    '/status': async () => {
        statusCallCount++;
        const isHellBar = (statusCallCount % 5 === 0);

        terminalOutput.innerHTML = '';
        showHeader();
        await typeWriterOutput("\n[SYSTEM]: Starte Vibe-Check...", "system-msg");

        const barLength = 20;
        const line = document.createElement('pre');
        line.className = 'system-msg';
        terminalOutput.appendChild(line);

        for (let i = 0; i <= barLength; i++) {
            const percent = Math.round((i / barLength) * 100);
            const progress = "█".repeat(i) + "░".repeat(barLength - i);

            if (isHellBar && percent >= 98 && percent < 100) {
                line.textContent = `Vibe-Check: [${progress}] 98% ...`;
                await sleep(5000);
                await typeWriterOutput("\n[ERROR]: Ich hatte kurz keine Lust mehr. Moment.", "error-msg");
                await sleep(5000);
                line.textContent = `Vibe-Check: [${"█".repeat(barLength)}] 100% Fertig. War was?`;
                break;
            }

            line.textContent = `Vibe-Check: [${progress}] ${percent}%`;
            await sleep(isHellBar ? 100 : 50);
        }

        await typeWriterOutput("\n[ANALYSE-ERGEBNIS]:", "success-msg");
        await sleep(500);

        const commonResults = [
            "CPU-Auslastung: 2% (Genau wie deine Lernbereitschaft gerade).",
            "Koffein-Level : Kritisch niedrig. System-Crash droht.",
            "Fokus-Buffer  : Overflow durch zu viele offene Tabs im Kopf.",
            "Lern-Latenz   : 4500ms. Dein Gehirn ist gerade im Edge-Netzwerk unterwegs.",
            "Task-Manager  : 90% der Ressourcen werden für Tagträume reserviert.",
            "Kühlung       : Überhitzt. Zu viele Gedanken, zu wenig Output.",
            "Uptime        : Seit 8:00 Uhr wach, aber das System ist erst seit 5 Minuten 'da'.",
            "Prüfungs-Modus: Simulation fehlgeschlagen. Zu viele korrupte Wissens-Pakete.",
            "Wissens-Datenbank: Read-only Mode aktiv. Input wird ignoriert.",
            "Motivation    : Error 404 - Not Found."
        ];

        const rareResults = [
            "Fokus-Level   : Überraschend stabil. Hast du heimlich meditiert?",
            "System-Status : God-Mode aktiv. Die AP1 sollte Angst vor DIR haben.",
            "Skill-Level    : Senior Admin Vibe erkannt. Wer braucht schon die IHK?",
            "Geheim-Modus   : Aktiviert. Ich hab dir heimlich die Lösungen für morgen geladen... Scherz.",
            "Analyse        : Du bist gerade so fokussiert, dass ich Angst habe, du löschst mich.",
            "ADHS-Power    : 100%. Hyperfokus-Sequenz eingeleitet. GO GO GO!"
        ];

        // 10% Chance auf ein seltenes Ergebnis
        const isRare = Math.random() < 0.1;
        const finalResult = isRare
        ? rareResults[Math.floor(Math.random() * rareResults.length)]
        : commonResults[Math.floor(Math.random() * commonResults.length)];

        await typeWriterOutput(`  ${finalResult}`, isRare ? "warning-msg" : "system-msg");

        await sleep(5000);
        await typeWriterOutput("\nHeee, lenk hier mal nicht vom Thema ab. Mir gehts gut. Machen wir weiter?", "system-msg");
    },
    '/reload': () => {
        appendToOutput('\n!!! WARNUNG: Alles wird gelöscht !!!', 'error-msg');
        appendToOutput('Bist du dir sicher? (y/n)');
        awaitingConfirmation.active = true; awaitingConfirmation.action = 'reload';
    },
    '/start': (topicId) => {
        if (!topicId) {
            const allQuestions = [];
            quizData.chapters.forEach(ch => {
                ch.subsections.forEach(sub => {
                    sub.questions.forEach(q => allQuestions.push(q));
                });
            });
            
            for (let i = allQuestions.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [allQuestions[i], allQuestions[j]] = [allQuestions[j], allQuestions[i]];
            }

            terminalOutput.innerHTML = '';
            appendToOutput("--- MARATHON-MODUS: ALLE THEMEN ---", "success-msg");
            currentQuiz.active = true;
            currentQuiz.topicId = 'marathon';
            currentQuiz.questions = allQuestions.slice(0, 10);
            currentQuiz.currentQuestionIndex = 0;
            currentQuiz.score = 0;
            currentQuiz.showingBatchResult = false;
            displayQuestion();
        } else {
            commands['start quiz'](topicId);
        }
    },
    '/lernen': () => {
        terminalOutput.innerHTML = '';
        showHeader();
        if (typeof LERN_DATA === 'undefined') { appendToOutput("Lern-Daten fehlen!", "error-msg"); return; }
        
        menuState.active = true;
        menuState.type = 'learning';
        menuState.items = LERN_DATA;
        menuState.selectedIndex = 0;
        renderMenu();
    },
    'start quiz': async (topicId) => {
        let foundSub = null;
        quizData.chapters.forEach(ch => {
            const sub = ch.subsections.find(s => s.id.toLowerCase() === topicId.toLowerCase());
            if (sub) foundSub = sub;
        });

        if (foundSub) {
            terminalOutput.innerHTML = '';
            appendToOutput(`--- QUIZ: ${foundSub.title} ---`, "success-msg");
            await typeWriterOutput(`\n${foundSub.description}\n`);
            currentQuiz.active = true;
            currentQuiz.topicId = foundSub.id;
            currentQuiz.showingBatchResult = false;
            
            let qList = [...foundSub.questions];
            
            // Always shuffle unless smart mode has a specific ordering
            if (settingsState.smartMode) {
                qList.sort((a, b) => {
                    const failA = userStats.troubleQuestions[a.question] || 0;
                    const failB = userStats.troubleQuestions[b.question] || 0;
                    return failB - failA;
                });
            } else {
                for (let i = qList.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [qList[i], qList[j]] = [qList[j], qList[i]];
                }
            }
            
            currentQuiz.questions = qList.slice(0, 10);
            currentQuiz.currentQuestionIndex = 0;
            currentQuiz.score = 0;
            displayQuestion();
        } else {
            appendToOutput("ID unbekannt.");
        }
    }
};
