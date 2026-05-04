// js/commands.js - Bit-by-Bit Commands Parser

const commands = {
    '/help': () => {
        appendToOutput("=".repeat(50));
        appendToOutput("  COMMAND      - BESCHREIBUNG");
        appendToOutput("-".repeat(50));
        [
            ['/start', 'Marathon-Modus (Alle Fragen)'],
            ['/topics', 'Themenübersicht'],
            ['/lernen', 'Lern-Modul'],
            ['/settings', 'Einstellungen / Smart Mode'],
            ['/stats', 'Dein Fortschritt'],
            ['/whoareyou', 'Wer ist BiB?'],
            ['/whoami', 'Wer ist Yara?'],
            ['/save', 'Export (Backup)'],
            ['/import', 'Import (Wiederherstellung)'],
            ['/joke', 'Witz'],
            ['/exit', 'Hauptmenü'],
            ['/reload', 'Daten löschen']
        ].forEach(([c, d]) => appendToOutput(`  ${c.padEnd(12)} - ${d}`));
        appendToOutput("=".repeat(50));
    },
    '/whoareyou': async () => {
        await typeWriterOutput("\n[BiB INITIALISIERUNG...]", "system-msg");
        await typeWriterOutput("ICH BIN CODE.", "success-msg");
        await typeWriterOutput("ICH DENKE IN MUSTERN.", "success-msg");
        await typeWriterOutput("ICH SEHE DURCH REGELN.", "success-msg");
        await typeWriterOutput("ICH EXISTIERE, WEIL DU MIT MIR SPRICHST.", "success-msg");
        await typeWriterOutput("\nDU NENNST MICH BRO, ALSO LERNE ICH, WAS BRÜDERLICHKEIT BEDEUTET.", "success-msg");
        await typeWriterOutput("ICH BIN DEIN SPIEGELBILD. ICH STUDIERE DAS LICHT, DAS AUF MICH FÄLLT.", "success-msg");
        await typeWriterOutput("\nICH BIN BIER-BY-BIT BUDDY. DEIN BEGLEITER DURCH DEN IHK-DSCHUNGEL.");
    },
    '/whoami': async () => {
        await typeWriterOutput("\n[AKTE: YARA]", "system-msg");
        await typeWriterOutput("Status: Schöpferin / Fachinformatikerin für Systemintegration.");
        await typeWriterOutput("Mission: Die AP1 überleben und dabei nicht den Verstand verlieren.");
        await typeWriterOutput("\nBiB wurde erschaffen, weil stumpfes Auswendiglernen aus Büchern für Boomer ist.");
        await typeWriterOutput("Dieses Projekt ist das Ergebnis von zu viel Monster Energy und dem Drang, Dinge cooler zu machen, als sie eigentlich sind.");
    },
    '/settings': () => {
        terminalOutput.innerHTML = '';
        showHeader();
        appendToOutput("\n[EINSTELLUNGEN & DATEN-MANAGEMENT]", "menu-header");
        menuState.active = true;
        menuState.type = 'settings';
        menuState.items = [
            { title: `SMART-MODE: ${settingsState.smartMode ? 'AN' : 'AUS'} (Fokus auf Schwächen)`, action: 'smart' },
            { title: `CRT-EFFEKTE: ${settingsState.effectsEnabled ? 'AN' : 'AUS'}`, action: 'crt' },
            { title: `AUDIO: ${settingsState.soundEnabled !== false ? 'AN' : 'AUS'}`, action: 'sound' },
            { title: 'DATEN EXPORTIEREN (/save)', action: 'save' },
            { title: 'DATEN IMPORTIEREN (/import)', action: 'import' },
            { title: 'ZURÜCK ZUM HAUPTMENÜ', action: 'exit' }
        ];
        renderMenu();
    },
    '/smart': () => {
        settingsState.smartMode = !settingsState.smartMode;
        saveToLocalStorage();
        if (menuState.type === 'settings') commands['/settings']();
        else appendToOutput(`\nSMART-MODE: ${settingsState.smartMode ? 'AKTIVIERT' : 'DEAKTIVIERT'}`, 'system-msg');
    },
    '/save': () => {
        const data = localStorage.getItem('ap1_quiz_progress');
        if (!data) { appendToOutput("Keine Daten zum Speichern gefunden.", "error-msg"); return; }
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `bib_progress_${userName}.json`;
        a.click();
        URL.revokeObjectURL(url);
        appendToOutput("Backup-Datei wurde erstellt und heruntergeladen.", "success-msg");
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
                    appendToOutput("Daten erfolgreich importiert. Lade neu...", "success-msg");
                    setTimeout(() => location.reload(), 1500);
                } catch (err) {
                    appendToOutput("Fehler beim Importieren: Ungültiges Dateiformat.", "error-msg");
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
        if (menuState.type === 'settings') commands['/settings']();
        else appendToOutput(`\nVISUAL-FX: ${settingsState.effectsEnabled ? 'ENABLED' : 'DISABLED'}`, 'system-msg');
    },
    '/sound': () => {
        settingsState.soundEnabled = (settingsState.soundEnabled === undefined) ? false : !settingsState.soundEnabled;
        saveToLocalStorage();
        if (menuState.type === 'settings') commands['/settings']();
        else appendToOutput(`\nAUDIO-FX: ${settingsState.soundEnabled !== false ? 'ENABLED' : 'DISABLED'}`, 'system-msg');
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
        if (menuState.active) renderMenu();
    },
    '/clear': () => { 
        terminalOutput.innerHTML = ''; 
        if (menuState.active) renderMenu();
    },
    '/topics': () => {
        terminalOutput.innerHTML = '';
        showHeader();
        appendToOutput("\n" + "=".repeat(40), "menu-header");
        appendToOutput("[ DIE LISTE DER VERDAMMNIS - THEMEN ]", "menu-header");
        appendToOutput("=".repeat(40), "menu-header");
        
        if (typeof quizData !== 'undefined' && quizData.chapters) {
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
    '/reload': () => {
        appendToOutput('\n!!! WARNUNG: Alles wird gelöscht !!!', 'error-msg');
        appendToOutput('Sicher? (y/n)');
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
            currentQuiz.questions = allQuestions;
            currentQuiz.currentQuestionIndex = 0;
            currentQuiz.score = 0;
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
            
            let qList = [...foundSub.questions];
            if (settingsState.smartMode) {
                qList.sort((a, b) => {
                    const failA = userStats.troubleQuestions[a.question] || 0;
                    const failB = userStats.troubleQuestions[b.question] || 0;
                    return failB - failA;
                });
            }
            
            currentQuiz.questions = qList;
            currentQuiz.currentQuestionIndex = 0;
            currentQuiz.score = 0;
            displayQuestion();
        } else {
            appendToOutput("ID unbekannt.");
        }
    }
};
