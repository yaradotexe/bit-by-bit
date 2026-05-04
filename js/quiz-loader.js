// js/quiz-loader.js - Aggregates modular quiz data

const quizData = {
    chapters: []
};

function loadQuizData() {
    if (typeof CH1_DATA !== 'undefined') quizData.chapters.push(CH1_DATA);
    if (typeof CH2_DATA !== 'undefined') quizData.chapters.push(CH2_DATA);
    if (typeof CH3_DATA !== 'undefined') quizData.chapters.push(CH3_DATA);
    if (typeof CH4_DATA !== 'undefined') quizData.chapters.push(CH4_DATA);
    if (typeof CH5_DATA !== 'undefined') quizData.chapters.push(CH5_DATA);
    if (typeof CH6_DATA !== 'undefined') quizData.chapters.push(CH6_DATA);
    if (typeof CH7_DATA !== 'undefined') quizData.chapters.push(CH7_DATA);
    
    // Sort chapters by priority if available
    quizData.chapters.sort((a, b) => (a.priority || 99) - (b.priority || 99));
}

// Execute immediately
loadQuizData();
