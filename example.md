# BiB Content Contribution Guide

Hier erfährst du, wie du neue Quiz-Fragen oder Lern-Inhalte zum Projekt hinzufügen kannst. Keine Sorge: Du musst den Kern-Code von BiB nicht anfassen. Wenn du ein JavaScript-Objekt (das Ding mit den geschweiften Klammern `{}`) ausfüllen kannst, bist du qualifiziert!

## 1. Neue Quiz-Fragen (Der "Prüfungs-Modus")
Quiz-Dateien befinden sich im Ordner `/quiz/` (z.B. `ch1.js`). 

### Struktur einer Quiz-Datei:
Stell dir das wie einen Ordner vor: Das **Kapitel** (`chapter`) ist der Ordner, und die **Unterthemen** (`subsections`) sind die Dokumente darin.

```javascript
// Beispiel: Eine neue Datei quiz/mein_neues_thema.js
quizData.chapters.push({
    title: "Netzwerktechnik", // Erscheint in der Liste der Verdammnis (/topics)
    subsections: [
        {
            id: "osi-modell", // WICHTIG: Damit startest du direkt via /start osi-modell
            title: "Das OSI-Referenzmodell",
            description: "Teste dein Wissen über die 7 Schichten des OSI-Modells.",
            questions: [
                {
                    question: "Auf welcher Schicht arbeitet ein Router?",
                    options: [
                        "Schicht 1 (Physical)",
                        "Schicht 2 (Data Link)",
                        "Schicht 3 (Network)", // <--- Das ist die richtige Antwort
                        "Schicht 4 (Transport)"
                    ],
                    answer: 2 // Wir zählen ab 0! (0 = erste Option, 1 = zweite, 2 = dritte...)
                }
            ]
        }
    ]
});


Pro-Tipps für Quiz-Master:

    IDs: Nutze keine Leerzeichen in der id. osi-modell ist super, osi modell macht BiB traurig und führt zu Fehlern.

    Zero-Indexing: Vergiss nicht: Programmierer fangen bei 0 an zu zählen. answer: 0 ist also die oberste Antwortmöglichkeit.

    Kommas: Achte darauf, dass nach jedem Objekt in einer Liste ein Komma steht, außer beim letzten.
    
    
## 2. Neue Lern-Inhalte (Das "Lern-Modul")

Lern-Daten liegen in /learn-data/ (z.B. hardware.js). Das ist der Text, den BiB ausspuckt, wenn jemand den Befehl /lernen benutzt.
JavaScript

// Beispiel: learn-data/neues_wissen.js
LERN_DATA.push({
    id: "sub-masken", // Interne ID
    title: "Subnetzmasken berechnen",
    priority: "hoch", // Bestimmt das optische Highlight im Menü ('niedrig', 'mittel', 'hoch', 'sehr hoch')
    content: `
--- SUBNETZMASKEN ---
Eine Subnetzmaske trennt die IP-Adresse in Netzwerk- und Host-Anteil.

Beispiel /24:
- Maske: 255.255.255.0
- Binär: 11111111.11111111.11111111.00000000

Merke: Die Anzahl der 1en gibt die Länge des Netzwerkanteils an.
    `
});

Pro-Tipps für Content-Creator:

    Backticks: Benutze diese schrägen Hochkommas (`) für den content. Damit kannst du den Text über mehrere Zeilen schreiben und kleine ASCII-Art-Elemente oder Trenner einbauen, genau so, wie sie im Terminal erscheinen sollen.

## 3. BiB sagen, dass es neue Daten gibt

Wenn du eine ganz neue Datei (z.B. quiz/ch8.js) erstellt hast, weiß BiB noch nichts von seinem Glück. Du musst sie kurz in der index.html vorstellen. Suche die anderen `<script>` Tags am Ende der Datei (kurz vor dem schließenden `</body>`) und füge deine Zeile hinzu.

**Wichtig:** Die Loader-Dateien (`js/quiz-loader.js` und `js/learn-loader.js`) müssen **VOR** den eigentlichen Daten-Dateien geladen werden, da sie die globalen Arrays `quizData` und `LERN_DATA` erst initialisieren.

```html
<!-- Ganz unten in der index.html suchen und deine Datei einreihen -->
<!-- Erst die Loader... -->
<script src="js/quiz-loader.js" defer></script>
<script src="js/learn-loader.js" defer></script>

<!-- ...dann die Daten -->
<script src="quiz/ch1.js" defer></script>
<script src="quiz/ch8.js" defer></script>
<script src="learn-data/hardware.js" defer></script>
<script src="learn-data/neues_wissen.js" defer></script>
```




## Abschluss-Check vor dem Commit:

    Datei gespeichert? (Klassiker).

    Syntax-Check: Hast du irgendwo eine schließende Klammer } oder ein Komma , vergessen? Das ist der häufigste Grund, warum das Terminal beim Booten hängen bleibt.

    In der index.html registriert? Ohne den <script> Tag bleibt deine Datei für BiB unsichtbar.

Tipp: Am sichersten fährst du, wenn du eine bestehende Datei kopierst, sie umbenennst und dann einfach die Texte innerhalb der Anführungszeichen austauschst!
