// js/quiz-loader.js - Global initialization for quiz data

const quizData = {
    chapters: [],
    sort: function() {
        this.chapters.sort((a, b) => (a.priority || 99) - (b.priority || 99));
    }
};

// The data files (ch1.js, etc.) will push themselves into quizData.chapters
// Sorting will happen on demand (e.g., in commands.js)
