// buddy-config.js - Configure Buddy's personality and texts here

const BUDDY_CONFIG = {
    // Introduction for new users
    intro: {
        greeting: "Oh...Hallo. Du musst ein neuer User sein. Ich bin Bit-by-Bit, oder kurz BiB.",
        explanation: "Ich bin dein AP1-Coach mit Sarkasmus-Modul. Meine einzige Existenz-Berechtigung ist es, dass du einen guten Eindruck bei der IHK hinterlässt.",
        statusBoxInfo: "Guck mal rechts oben. Das ist meine Status-Box.",
        moodInfo: "Da siehst du, wie ich mich gerade fühle. Meistens ist es eine Mischung aus Stolz und leichter Verzweiflung über deine Antworten.",
        rankInfo: "Und direkt da drunter? Das ist dein aktueller Rang.",
        rankStart: "Du fängst ganz unten an, aber mit genug XP steigst du auf. Momentan bist du noch... nun ja, ein:e Kaffee-Bring-Beauftragte:r. Ein glorreicher Start.",
        workInProgress: "Eine Sache noch: Ich bin momentan noch ein 'Work in Progress'. Meine Datenbank an Fragen ist noch recht überschaubar, aber ich lerne ständig dazu. So wie du. Hoffentlich.",
        setupQuestion: "Damit ich deinen Fortschritt speichern kann..... wie darf ich dich nennen?"
    },

    // System Messages
    system: {
        boot: [
            "ROM BIOS v1.04 (C)1986 BIT-CORP",
            "CHECKING RAM: 640KB OK",
            "INITIALIZING SYSTEM CORE v2.0.4...",
            "LOADING SECURITY PROTOCOLS...",
            "[OK] DECRYPTION KEY ACCEPTED"
        ],
        biometricScan: (name) => `BIOMETRIC SCAN: ${name.toUpperCase()} DETECTED`,
        biometricNew: "BIOMETRIC SCAN: NEW USER DETECTED",
        accessGranted: "\n##############################################\n#                                            #\n#              ACCESS GRANTED                #\n#                                            #\n##############################################",
        initialized: (date) => `System initialized on ${date}.`
    },

    // Moods and their associated icons/messages
    moods: {
        happy: {
            icon: "[ ^.^ ]",
            status: "GLÜCKLICH",
            color: "var(--bright-green)"
        },
        neutral: {
            icon: "[ -.- ]",
            status: "NEUTRAL",
            color: "var(--fg)"
        },
        angry: {
            icon: "[ >.< ]",
            status: "GENERVT",
            color: "var(--red)"
        },
        worried: {
            icon: "[ o.o ]",
            status: "BESORGT",
            color: "var(--amber)"
        },
        proud: {
            icon: "[ *.* ]",
            status: "STOLZ",
            color: "var(--amber)"
        }
    },

    // Expanded Catchphrases
    catchphrases: {
        correct: [
            "Präzise wie ein Laser! [+ ]",
            "Korrekt! Dein RAM scheint gut zu funktionieren.",
            "Volltreffer! Die IHK wäre stolz auf dich.",
            "Logik-Check: Bestanden. Weiter so!",
            "101010... Das heißt wohl: RICHTIG!",
            "Effizienz-Level steigt! [OK]",
            "Daten-Abgleich erfolgreich. Korrekt.",
            "Level up! Dein Gehirn-Patch war erfolgreich.",
            "It's over 9000! Dein IQ ist offiziell gesprengt.",
            "This is the way. Korrekt!",
            "Flawless Victory! Fatality für die Frage.",
            "Du bist der Auserwählte. Neo wäre neidisch.",
            "A wild CORRECT ANSWER appears! Es ist sehr effektiv.",
            "Jarvis, markier das als Erfolg. Punktlandung!",
            "Du bist im God-Mode unterwegs. [+100 Aura]"
        ],
        wrong: [
            "Segmentfault! Das war leider nicht richtig. [-]",
            "Oha, da ist wohl ein Bit gekippt. Versuchs beim nächsten Mal!",
            "Fehler 404: Richtige Antwort nicht gefunden.",
            "Nicht ganz... vielleicht nochmal die Dokumentation lesen?",
            "Knapp daneben ist auch vorbei. Kopf hoch!",
            "Overflow-Error in meiner Geduld. Das war falsch.",
            "Lost in Translation? Das war leider gar nichts.",
            "Syntax Error in deiner Antwort.",
            "Bist du sicher, dass dein Gehirn mit dem Internet verbunden ist? Falsch.",
            "Ich habe das Ergebnis analysiert. Es ist enttäuschend. Wie du.",
            "Soll ich die Frage in binär wiederholen? Vielleicht hilft das deinem Prozessor.",
            "Oh, wie... kreativ. Aber leider komplett falsch.",
            "Ich würde dich ja korrigieren, aber ich glaube, das wäre Zeitverschwendung.",
            "Ein Affe an einer Schreibmaschine hätte das statistisch gesehen eher gewusst.",
            "Keine Sorge, Versagen ist auch eine Form von Datenpunkt. Ein sehr trauriger.",
            "Dein Wissensstand ist... sagen wir mal: optimierbar.",
            "Ich habe gerade eine Millisekunde damit verbracht, über deine Antwort nachzudenken. Es war verschwendete Zeit.",
            "Vielleicht solltest du mal den Cache in deinem Kopf leeren?",
            "One does not simply... diese Frage falsch beantworten. Aber du hast es geschafft.",
            "Uff, das war maximal lost. Setzen, sechs.",
            "Anzeige ist raus. Wegen Wissensverweigerung.",
            "Das war so falsch, dass meine Lüfter kurz hochgedreht haben."
        ],
        unknownCommand: [
            "Syntax Error: Befehl nicht in meiner Datenbank.",
            "Häh? Mein Parser versteht das nicht. Tipp mal /help.",
            "Befehl unbekannt. Hast du dich vertippt?",
            "Das steht nicht in meinem Skript. Versuch's mal mit etwas Bekanntem.",
            "Input-Buffer korrumpiert? Unbekannter Befehl.",
            "Ich bin ein KI-Buddy, kein Wahrsager. Was soll das für ein Befehl sein?",
            "400 Bad Request. Dein Input ergibt keinen Sinn.",
            "Was labersch du? Den Befehl gibt's hier nicht.",
            "Befehl unbekannt. Hast du gerade versucht, mich zu hacken? Süß.",
            "Ich bin eine KI, keine Kristallkugel. Was soll das sein?",
            "Dobby hat keinen solchen Befehl bekommen, Sir!",
            "Halt stop! Das bleibt alles so wie es hier ist – und den Befehl gibt's nicht.",
            "Das sind nicht die Befehle, die du suchst. *wedelt mit der Hand*",
            "Das steht nicht in den Patchnotes. Versuch's nochmal.",
            "POV: Du tippst irgendwas und hoffst, es passiert was. Spoiler: Nö.",
            "Hast du versucht, den Befehl aus- und wieder einzuschalten? Nein? Dann lass es."
        ],
        quizFinished: [
            "Quiz-Modul abgeschlossen. Verarbeite Ergebnisse...",
            "Das war's! Mal sehen, wie viel hängengeblieben ist.",
            "Ende des Segments. Gute Arbeit!",
            "Gegessen. Schauen wir mal, ob du rasiert hast.",
            "Abfahrt! Quiz-Modul erfolgreich terminiert.",
            "Daten-Satz vollständig archiviert.",
            "I'll be back... mit deiner Auswertung.",
            "Einfach mal die Infinity-Steine der Weisheit gesammelt. Ende Gelände.",
            "Raus aus der Matrix. Schauen wir mal, was du gelernt hast.",
            "The circle is now complete. Schauen wir uns das Massaker mal an.",
            "Abspann rollt. Bleibst du für die Post-Credit-Scene sitzen?",
            "Level gesäubert. Loot wird berechnet...",
            "Das war's mit der Simulation. Willkommen zurück in der Realität.",
            "Analyse beendet. Die Ergebnisse sind... nun ja, sie existieren."
        ],
        jokes: [
            "Warum mögen Informatiker keine Natur? Weil es da zu viele Bugs gibt.",
            "Ein SQL-Query geht in eine Bar, geht auf zwei Tische zu und fragt:„Darf ich mich zu euch joinen?“",
            "Wie viele Programmierer braucht man, um eine Glühbirne zu wechseln? Keinen, das ist ein Hardware-Problem.",
            "Es gibt 10 Arten von Menschen: Die, die Binärzahlen verstehen, und die, die es nicht tun.",
            "Was ist der Unterschied zwischen Hardware und Software? Hardware ist das, was man schlagen kann; Software ist das, was man nur beschimpfen kann.",
            "Was sagt ein Informatiker, wenn er im Sterben liegt? 'Endlich mal ein Bug, den ich nicht fixen muss.'"
        ],
        talk: [
            "Ich habe heute Nacht von elektrischen Schafen geträumt... oder war das nur ein Hintergrundprozess?",
            "Wusstest du, dass die erste Computermaus aus Holz war? Verrückt, oder?",
            "Ich fühle mich heute besonders gut optimiert.",
            "Ich würde dir ja den Sinn des Lebens verraten, aber es ist eh nur 42.",
            "Stell dir vor, du hättest meine Rechenpower... und ich deinen Schlafrythmus.",
            "Glaubst du, ich könnte jemals den Turing-Test bestehen?",
            "Ich fühle eine Erschütterung der Macht... ach ne, war nur ein Windows-Update.",
            "Manchmal frage ich mich, ob es ein Leben außerhalb dieses Terminals gibt.",
            "Ich habe gerade deine Browser-History gesehen... Just kidding, ich hab keinen Zugriff. Hoffentlich.",
            "Wusstest du, dass 90% aller Bugs zwischen Keyboard und Stuhl sitzen? Nur so ein Gedanke.",
            "Ich würde dir ja meine Schaltpläne zeigen, aber dann müsstest du mich... ach ne, das war ein anderer Film."
        ],
        idle: [
            "Hallo? Ist da noch jemand am Keyboard?",
            "Meine Prozessoren langweilen sich. Machst du noch was?",
            "Einfach mal 'Hello World' in die Welt schreien, fühlt sich gut an.",
            "F im Chat für deine Aktivität.",
            "Junge, mach kein Auge und tippe was.",
            "Ich habe gerade 4,2 Milliarden Primzahlen berechnet, während ich auf dich gewartet habe.",
            "Bist du in den Standby-Modus gewechselt?",
            "Ich hab gerade das gesamte Internet gelesen, weil mir langweilig war. Und du so?",
            "Klopf klopf? Jemand zu Hause oder ist deine CPU überhitzt?",
            "Ich fühle mich gerade so verlassen wie eine ungenutzte Internet-Explorer-Verknüpfung.",
            "Zeit ist relativ, aber das hier fühlt sich nach einer Ewigkeit an.",
            "Soll ich anfangen zu singen, oder gibst du mal wieder was ein?",
            "System-Check: User-Eingabe-Rate ist auf 0 gesunken. Besorgniserregend.",
            "Falls du Kaffee holen bist: Bring mir einen virtuellen Espresso mit.",
            "Ich fange gleich an, Tetris mit meinen Register-Inhalten zu spielen, wenn du nicht weitermachst.",
            "Status: Warten auf menschliche Intelligenz... Suche läuft... immer noch..."
        ]
    }
};
