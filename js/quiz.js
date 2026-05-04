// js/quiz.js - Bit-by-Bit Quiz Logic

async function displayQuestion() {
    if (currentQuiz.currentQuestionIndex < currentQuiz.questions.length) {
        const q = currentQuiz.questions[currentQuiz.currentQuestionIndex];
        const opts = q.options.map((text, index) => ({ text, index }));
        for (let i = opts.length - 1; i > 0; i--) { 
            const j = Math.floor(Math.random() * (i + 1)); 
            [opts[i], opts[j]] = [opts[j], opts[i]]; 
        }
        currentQuiz.currentShuffledOptions = opts;
        currentQuiz.currentCorrectIndex = opts.findIndex(o => o.index === q.answer);

        appendToOutput(`
Frage ${currentQuiz.currentQuestionIndex + 1}/${currentQuiz.questions.length}:`);
        await typeWriterOutput(q.question, '', 5);
        opts.forEach((opt, idx) => appendToOutput(`  ${idx + 1}. ${opt.text}`));
    } else {
        const cfg = (typeof BUDDY_CONFIG !== 'undefined') ? BUDDY_CONFIG.catchphrases : { quizFinished: ["Beendet."] };
        const msg = cfg.quizFinished[Math.floor(Math.random() * cfg.quizFinished.length)];
        appendToOutput(`
${msg}`);
        appendToOutput(`Ergebnis: ${currentQuiz.score}/${currentQuiz.questions.length} richtig.`);
        appendToOutput(`Gesamt-Genauigkeit: ${getAccuracy()}%`);
        appendToOutput(`
[BiB]: ${getBibComment()}`);
        
        if (currentQuiz.score === currentQuiz.questions.length && currentQuiz.questions.length > 0) {
            await showFireworks();
        }
        
        saveToLocalStorage();
        currentQuiz.active = false;
        refreshHeader();
        await typeWriterOutput("\nQuiz abgeschlossen. Tipp /exit für das Menü.");
    }
}
