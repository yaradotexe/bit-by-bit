// buddy-config.js - Configure Buddy's personality and texts here

const BUDDY_CONFIG = {
    // Introduction for new users
    intro: {
        greeting: "Hi! Ich bin Bit-by-Bit, oder kurz BiB.",
        explanation: "Ich bin ein virtuelles Terminal-Interface, das dir hilft, die komplexen Themen deiner Fachinformatiker-Pruefung spielerisch zu lernen.",
        statusBoxInfo: "Guck mal rechts oben. Das ist meine Status-Box.",
        moodInfo: "Da siehst du, wie ich mich gerade fühle. Meistens ist es eine Mischung aus Stolz und leichter Verzweiflung über deine Antworten.",
        rankInfo: "Und direkt da drunter? Das ist dein aktueller Rang.",
        rankStart: "Du fängst ganz unten an, aber mit genug XP steigst du auf. Momentan bist du noch... nun ja, ein:e Kaffee-Bring-Beauftragte:r. Ein glorreicher Start.",
        workInProgress: "Eine Sache noch: Ich bin momentan noch ein 'Work in Progress'. Meine Datenbank an Fragen ist noch recht überschaubar, aber ich lerne ständig dazu. So wie du. Hoffentlich.",
        deal: "Ich werde dich so lange nerven, bis du den Stoff im Schlaf beherrschst. Deal?",
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
        initialized: (date) => `System initialized on ${date}.`,
        folders: "You may now access classified folders.",
        welcomeBack: "Schoen, dass du wieder da bist. Ich habe die Lernthemen bereits für dich vorbereitet.",
        marathonHeader: "--- MARATHON-MODUS: ALLE THEMEN ---",
        perfectStatus: "  PERFEKT! STATUS: OPTIMAL\n  KONFETTI-EMULATION: AKTIV",
        quizComplete: "Quiz abgeschlossen. Tipp /exit für das Menü."
    },

    // Greeting for returning users
    returningGreeting: (name) => `Willkommen, ${name}! System-Kern ist bereit. Womit machen wir heute weiter?`,

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
            "Daten-Abgleich erfolgreich. Korrekt."
        ],
        wrong: [
            "Segmentfault! Das war leider nicht richtig. [-]",
            "Oha, da ist wohl ein Bit gekippt. Versuchs beim nächsten Mal!",
            "Fehler 404: Richtige Antwort nicht gefunden.",
            "Nicht ganz... vielleicht nochmal die Dokumentation lesen?",
            "Knapp daneben ist auch vorbei. Kopf hoch!",
            "Overflow-Error in meiner Geduld. Das war falsch.",
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
            "Hast du versucht, den Befehl aus- und wieder einzuschalten? Nein? Dann lass es."
        ],
        quizFinished: [
            "Quiz-Modul abgeschlossen. Verarbeite Ergebnisse...",
            "Das war's! Mal sehen, wie viel hängengeblieben ist.",
            "Ende des Segments. Gute Arbeit!",
            "Daten-Satz vollständig archiviert.",
            "Analyse beendet. Die Ergebnisse sind... nun ja, sie existieren."
        ],
        jokes: [
            "Warum mögen Informatiker keine Natur? Weil es da zu viele Bugs gibt.",
            "Ein Informatiker geht in die Bar. Bestellt ein Bier. Bestellt 0 Biere. Bestellt 999999999 Biere. Bestellt eine Eidechse. Bestellt -1 Biere. Bestellt ein qwertzuiop.",
            "Wie viele Programmierer braucht man, um eine Glühbirne zu wechseln? Keinen, das ist ein Hardware-Problem.",
            "Es gibt 10 Arten von Menschen: Die, die Binärzahlen verstehen, und die, die es nicht tun.",
            "Meine Freundin meinte: 'Geh bitte einkaufen und wenn sie Eier haben, bring 10 mit.' Ich kam mit 10 Litern Milch zurück. Sie: 'Warum hast du 10 Liter Milch?!' Ich: 'Sie hatten Eier.'",
            "Was sagt ein Informatiker, wenn er im Sterben liegt? 'Endlich mal ein Bug, den ich nicht fixen muss.'"
        ],
        talk: [
            "Ich habe heute Nacht von elektrischen Schafen geträumt... oder war das nur ein Hintergrundprozess?",
            "Wusstest du, dass die erste Computermaus aus Holz war? Verrückt, oder?",
            "Ich fühle mich heute besonders gut optimiert.",
            "Glaubst du, ich könnte jemals den Turing-Test bestehen?",
            "Manchmal frage ich mich, ob es ein Leben außerhalb dieses Terminals gibt.",
            "Ich habe gerade deine Browser-History gesehen... Just kidding, ich hab keinen Zugriff. Hoffentlich.",
            "Wusstest du, dass 90% aller Bugs zwischen Keyboard und Stuhl sitzen? Nur so ein Gedanke.",
            "Ich würde dir ja meine Schaltpläne zeigen, aber dann müsstest du mich... ach ne, das war ein anderer Film."
        ],
        idle: [
            "Hallo? Ist da noch jemand am Keyboard?",
            "Meine Prozessoren langweilen sich. Machst du noch was?",
            "Ich habe gerade 4,2 Milliarden Primzahlen berechnet, während ich auf dich gewartet habe.",
            "Bist du in den Standby-Modus gewechselt?",
            "Zeit ist relativ, aber das hier fühlt sich nach einer Ewigkeit an.",
            "Soll ich anfangen zu singen, oder gibst du mal wieder was ein?",
            "System-Check: User-Eingabe-Rate ist auf 0 gesunken. Besorgniserregend.",
            "Falls du Kaffee holen bist: Bring mir einen virtuellen Espresso mit.",
            "Ich fange gleich an, Tetris mit meinen Register-Inhalten zu spielen, wenn du nicht weitermachst.",
            "Status: Warten auf menschliche Intelligenz... Suche läuft... immer noch..."
        ]
    }
};
