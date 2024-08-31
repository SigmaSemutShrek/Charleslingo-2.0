let questions = [];
let currentQuestionIndex = 0;
let currentAnswer = null;
let score = 0; 

function getLevelOfDifficulty() {
    const validLevels = ['easy', 'medium', 'hard', 'sheldon'];
    return validLevels.filter(level => localStorage.getItem(level) === 'true');
}

function getOperations() {
    const validOperations = ['add', 'minus', 'times', 'division'];
    return validOperations.filter(operation => localStorage.getItem(operation) === 'true');
}

const questionTemplates = {
    easy: {
        add: (a, b) => `${a} + ${b} = ?`,
        minus: (a, b) => `${a} - ${b} = ?`,
        times: (a, b) => `${a} × ${b} = ?`,
        division: (a, b) => `${a} ÷ ${b} = ?`,
    },
    medium: {
        add: (a, b) => `${a} + ${b} = ?`,
        minus: (a, b) => `${a} - ${b} = ?`,
        times: (a, b) => `${a} × ${b} = ?`,
        division: (a, b) => `${a} ÷ ${b} = ?`,
    },
    hard: {
        add: (a, b) => `${a} + ${b} = ?`,
        minus: (a, b) => `${a} - ${b} = ?`,
        times: (a, b) => `${a} × ${b} = ?`,
        division: (a, b) => `${a} ÷ ${b} = ?`,
    },
    sheldon: {
        add: (a, b) => `${a} + ${b} = ?`,
        minus: (a, b) => `${a} - ${b} = ?`,
        times: (a, b) => `${a} × ${b} = ?`,
        division: (a, b) => `${a} ÷ ${b} = ?`,
    },
};

function getRange(level) {
    switch(level) {
        case 'easy':
            return { min: 1, max: 100 };
        case 'medium':
            return { min: 1, max: 1000 };
        case 'hard':
            return { min: 1, max: 100000 };
        case 'sheldon':
            return { min: 1, max: 1000000 };
        default:
            return { min: 1, max: 10 };
    }
}

function formatNumber(num, decimalPlaces = 2) {
    return num.toFixed(decimalPlaces);
}

function generateQuestion(level, operation) {
    const range = getRange(level);
    const a = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
    const b = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
    let question = questionTemplates[level][operation](a, b);
    let answer;
    
    switch (operation) {
        case 'add':
            answer = a + b;
            break;
        case 'minus':
            answer = a - b;
            break;
        case 'times':
            answer = a * b;
            break;
        case 'division':
            answer = b !== 0 ? a / b : a;
            break;
    }

    return { question, answer: formatNumber(answer) };
}

function generateQuestions(levels, operations, totalQuestions) {
    const questions = [];
    const totalCombinations = levels.length * operations.length;
    const maxQuestionsPerCombination = Math.ceil(totalQuestions / totalCombinations);
    
    levels.forEach(level => {
        operations.forEach(operation => {
            for (let i = 0; i < maxQuestionsPerCombination; i++) {
                if (questions.length < totalQuestions) {
                    questions.push(generateQuestion(level, operation));
                }
            }
        });
    });

    return questions.slice(0, totalQuestions);
}

function displayQuestion(index) {
    if (index >= 0 && index < questions.length) {
        const { question, answer } = questions[index];
        document.querySelector('.question').innerHTML = question;
        currentAnswer = answer;

        const answerBoxes = [
            document.getElementById('box1'),
            document.getElementById('box2'),
            document.getElementById('box3'),
            document.getElementById('box4')
        ];
        const answers = [answer];
        while (answers.length < answerBoxes.length) {
            let wrongAnswer;
            do {
                wrongAnswer = formatNumber(Math.floor(Math.random() * (getRange(getLevelOfDifficulty()[0]).max * 2)), 2);
            } while (answers.includes(wrongAnswer));
            answers.push(wrongAnswer);
        }
        answers.sort(() => Math.random() - 0.5);

        answerBoxes.forEach((box, i) => {
            box.innerHTML = answers[i];
            box.setAttribute('data-answer', answers[i]);
        });
    } else {
        questiondocument.querySelector('.question').innerHTML = 'No more questions.';
    }
}

function setupEventListeners() {
    const answerBoxes = [
        document.getElementById('box1'),
        document.getElementById('box2'),
        document.getElementById('box3'),
        document.getElementById('box4')
    ];
    
    answerBoxes.forEach(box => {
        box.addEventListener('click', function() {
            const selectedAnswer = parseFloat(box.getAttribute('data-answer'));
            if (selectedAnswer === parseFloat(currentAnswer)) {
                score++;
                console.log('Correct answer! Score:', score);
            } else {
                console.log('Incorrect answer. Score:', score);
            }

            if (currentQuestionIndex < questions.length - 1) {
                currentQuestionIndex++;
                displayQuestion(currentQuestionIndex);
            } else {
                answerBoxes.forEach(b => b.disabled = true);
                document.querySelector('.question').innerHTML = `Game over! Your score: ${score}`;
                console.log('No more questions. Final Score:', score);
                answerBoxes.forEach(box => {
                    box.style.display = 'none';
                });
                const question = document.querySelector('.question');
                const parent = document.querySelector('.parentQues');
                parent.style.display = 'flex';
                parent.style.alignItems = 'center';
                parent.style.justifyContent = 'center';
                parent.style.height = '100vh';  
                parent.style.paddingBottom = '150px';
            }
        });
    });
}

function initializeGame(levels, operations) {
    console.log('Game initialized with levels:', levels);
    console.log('Operations:', operations);
    questions = generateQuestions(levels, operations, 10);
    displayQuestion(currentQuestionIndex);
    setupEventListeners();
}

function startGame() {
    const levels = getLevelOfDifficulty();
    const operations = getOperations();
    
    if (levels.length === 0 || operations.length === 0) {
        console.log('No valid mode or operation selected. Redirecting to the main choosing page.');
        window.location.href = 'selection.html';
        return;
    }

    console.log('Starting the game...');
    initializeGame(levels, operations);
}

startGame();
