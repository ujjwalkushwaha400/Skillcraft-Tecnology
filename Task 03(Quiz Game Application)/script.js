// DOM element references
const quizContainer = document.getElementById('quiz-container');
const scoreContainer = document.getElementById('score-container');
const questionElement = document.getElementById('question');
const progressText = document.getElementById('progress');
const answerButtonsElement = document.getElementById('answer-buttons');
const actionButton = document.getElementById('action-btn');
const restartButton = document.getElementById('restart-btn');
const scoreText = document.getElementById('score-text');
const feedbackElement = document.getElementById('feedback');

// Updated quiz questions with different types
const questions = [
    {
        question: "Which is the largest planet in our solar system?",
        type: "single",
        answers: [
            { text: "Earth", correct: false },
            { text: "Jupiter", correct: true },
            { text: "Mars", correct: false },
            { text: "Saturn", correct: false }
        ]
    },
    {
        question: "Which of the following are primary colors? (Select all that apply)",
        type: "multiple",
        answers: [
            { text: "Red", correct: true },
            { text: "Green", correct: false },
            { text: "Blue", correct: true },
            { text: "Yellow", correct: true }
        ]
    },
    {
        question: "What is the currency of Japan?",
        type: "single",
        answers: [
            { text: "Won", correct: false },
            { text: "Yuan", correct: false },
            { text: "Yen", correct: true },
            { text: "Dollar", correct: false }
        ]
    },
    {
        question: "Which of the following countries are in Europe? (Select all that apply)",
        type: "multiple",
        answers: [
            { text: "Germany", correct: true },
            { text: "Brazil", correct: false },
            { text: "France", correct: true },
            { text: "Egypt", correct: false }
        ]
    },
    {
        question: "What is the capital of France?",
        type: "single",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Rome", correct: false }
        ]
    },
    {
        question: "Who is known as the 'Father of the Indian Constitution'?",
        type: "single",
        answers: [
            { text: "Mahatma Gandhi", correct: false },
            { text: "Jawaharlal Nehru", correct: false },
            { text: "Dr. B.R. Ambedkar", correct: true },
            { text: "Sardar Vallabhbhai Patel", correct: false }
        ]
    },
    {
        question: "Which of the following are official languages of the United Nations? (Select all that apply)",
        type: "multiple",
        answers: [
            { text: "English", correct: true },
            { text: "German", correct: false },
            { text: "Spanish", correct: true },
            { text: "Japanese", correct: false }
        ]
    },
    {
        question: "Which is the longest river in the world?",
        type: "single",
        answers: [
            { text: "Amazon River", correct: false },
            { text: "Nile River", correct: true },
            { text: "Yangtze River", correct: false },
            { text: "Mississippi River", correct: false }
        ]
    },
    {
        question: "Which of the following monuments are located in India? (Select all that apply)",
        type: "multiple",
        answers: [
            { text: "Taj Mahal", correct: true },
            { text: "Eiffel Tower", correct: false },
            { text: "Great Wall of China", correct: false },
            { text: "Qutub Minar", correct: true }
        ]
    },
    {
        question: "What is the hardest natural substance on Earth?",
        type: "single",
        answers: [
            { text: "Gold", correct: false },
            { text: "Iron", correct: false },
            { text: "Diamond", correct: true },
            { text: "Quartz", correct: false }
        ]
    }
];

// Game state variables
let currentQuestionIndex = 0;
let score = 0;

// --- Event Listeners ---
actionButton.addEventListener('click', handleActionClick);
restartButton.addEventListener('click', startQuiz);

// --- Core Functions ---

/**
 * Initializes or restarts the quiz.
 */
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreContainer.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    actionButton.classList.add('hidden');
    setNextQuestion();
}

/**
 * Sets up the next question or ends the quiz.
 */
function setNextQuestion() {
    resetState();
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
    } else {
        showScore();
    }
}

/**
 * Displays the current question and its answer options based on type.
 * @param {object} question - The question object.
 */
function showQuestion(question) {
    questionElement.innerText = question.question;
    progressText.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;

    if (question.type === "single") {
        showSingleChoiceOptions(question.answers);
    } else if (question.type === "multiple") {
        showMultipleChoiceOptions(question.answers);
    }
}

/**
 * Creates and displays buttons for single-choice questions.
 * @param {Array} answers - The array of answer objects.
 */
function showSingleChoiceOptions(answers) {
    answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn', 'bg-gray-700', 'hover:bg-gray-600', 'text-white', 'font-semibold', 'py-3', 'px-4', 'rounded-lg', 'text-left');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectSingleAnswer);
        answerButtonsElement.appendChild(button);
    });
}

/**
 * Creates and displays checkboxes for multiple-choice questions.
 * @param {Array} answers - The array of answer objects.
 */
function showMultipleChoiceOptions(answers) {
    answers.forEach((answer, index) => {
        const label = document.createElement('label');
        label.classList.add('checkbox-label');
        label.innerHTML = `
            <input type="checkbox" name="answer" value="${index}">
            <span></span>
            ${answer.text}
        `;
        if (answer.correct) {
            label.dataset.correct = answer.correct;
        }
        answerButtonsElement.appendChild(label);
    });
    actionButton.innerText = "Submit";
    actionButton.classList.remove('hidden');
}

/**
 * Resets the state for the next question.
 */
function resetState() {
    actionButton.classList.add('hidden');
    feedbackElement.innerText = "";
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

/**
 * Handles the click of the main action button (Next/Submit).
 */
function handleActionClick() {
    const question = questions[currentQuestionIndex];
    if (question.type === "multiple" && actionButton.innerText === "Submit") {
        checkMultiSelectAnswer();
    } else {
        currentQuestionIndex++;
        setNextQuestion();
    }
}

/**
 * Handles the selection of a single-choice answer.
 */
function selectSingleAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";

    if (correct) {
        score++;
        feedbackElement.innerText = "Your answer is right!";
        feedbackElement.style.color = "#10B981"; // Green
    } else {
        feedbackElement.innerText = "Your answer is wrong.";
        feedbackElement.style.color = "#EF4444"; // Red
    }

    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === "true");
        button.disabled = true;
    });

    actionButton.innerText = "Next";
    actionButton.classList.remove('hidden');
}

/**
 * Checks the submitted answers for a multiple-choice question.
 */
function checkMultiSelectAnswer() {
    const labels = answerButtonsElement.querySelectorAll('.checkbox-label');
    const correctAnswers = questions[currentQuestionIndex].answers
        .map((ans, i) => ans.correct ? i : null)
        .filter(i => i !== null);
    
    const selectedAnswers = Array.from(labels)
        .map((label, i) => label.querySelector('input').checked ? i : null)
        .filter(i => i !== null);

    let isCorrect = correctAnswers.length === selectedAnswers.length &&
                    correctAnswers.every(val => selectedAnswers.includes(val));

    if (isCorrect) {
        score++;
        feedbackElement.innerText = "Your answer is right!";
        feedbackElement.style.color = "#10B981";
    } else {
        feedbackElement.innerText = "Your answer is wrong.";
        feedbackElement.style.color = "#EF4444";
    }

    labels.forEach(label => {
        setStatusClass(label, label.dataset.correct === "true");
        label.querySelector('input').disabled = true;
    });
    
    actionButton.innerText = "Next";
}

/**
 * Sets the visual feedback class (correct/wrong) on an element.
 */
function setStatusClass(element, isCorrect) {
    clearStatusClass(element);
    if (isCorrect) {
        element.classList.add('correct');
    } else {
        // Only mark selected but incorrect answers as wrong for checkboxes
        if (element.tagName === 'LABEL' && !element.querySelector('input').checked) {
            return; // Don't mark unselected wrong answers
        }
        element.classList.add('wrong');
    }
}

/**
 * Clears feedback classes from an element.
 */
function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

/**
 * Displays the final score.
 */
function showScore() {
    quizContainer.classList.add('hidden');
    scoreContainer.classList.remove('hidden');
    scoreText.innerText = `You scored ${score} out of ${questions.length}.`;
}

// --- Initial Start ---
startQuiz();
