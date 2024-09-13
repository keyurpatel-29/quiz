const quizData = [
    {
        level: 1,
        questions: [
            { 
                // img src="elephant.jpeg"
                image:"",
                question: "What is Flutter?", 
                options: ["A database", "A framework", "An operating system", "A web server"], 
                correct: 1 
            },
            { 
                question: "Who created Flutter?", 
                options: ["Apple", "Facebook", "Microsoft", "Google"], 
                correct: 3 
            }
        ]
    },
    {
        level: 2,
        questions: [
            { 
                question: "Which programming language does Flutter use?", 
                options: ["Kotlin", "Swift", "Dart", "JavaScript"], 
                correct: 2 
            },
            { 
                question: "Which of the following is a core component of Flutter's architecture?", 
                options: ["MVC", "BLoC", "MVVM", "MVP"], 
                correct: 1 
            }
        ]
    },
    {

        
    }
    // bija levels...
];

let currentLevel = 1;
let currentQuestion = 0;
let score = 0;
let lockAnswer = false;  // To prevent clicking multiple times

// Load quiz for the current level
function loadQuiz() {
    const quiz = quizData[currentLevel - 1].questions[currentQuestion];
    document.getElementById("question").textContent = quiz.question;
    document.getElementById("level-title").textContent = `Level ${currentLevel}`;
    
    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = '';
    
    quiz.options.forEach((option, index) => {
        const optionElement = document.createElement("div");
        optionElement.className = "option";
        optionElement.textContent = option;
        optionElement.onclick = () => checkAnswer(index, optionElement);
        optionsContainer.appendChild(optionElement);
    });
    
    document.getElementById("next-btn").style.display = 'none'; 
}

// Check if selected answer is correct
function checkAnswer(selectedOption, optionElement) {
    if (lockAnswer) return;  // Prevent multiple clicks
    lockAnswer = true;

    const quiz = quizData[currentLevel - 1].questions[currentQuestion];
    
    if (selectedOption === quiz.correct) {
        score++;
        optionElement.style.backgroundColor = "green";  // Correct answer turns green
    } else {
        optionElement.style.backgroundColor = "red";  // Wrong answer turns red
    }

    // Wait for 1 second before moving to the next question
    setTimeout(() => {
        lockAnswer = false;
        nextQuestion();
    }, 1000);
}

// Load next question or go to the next level
function nextQuestion() {
    currentQuestion++;
    const levelData = quizData[currentLevel - 1];
    
    if (currentQuestion >= levelData.questions.length) {
        if (currentLevel < quizData.length) {
            currentLevel++;
            currentQuestion = 0;
            loadQuiz();
        } else {
            document.getElementById("quiz-container").style.display = 'none';
            document.getElementById("result").textContent = `You completed the quiz with a score of ${score} out of ${quizData.length * 2}`;
            document.getElementById("result").style.display = 'block';
        }
    } else {
        loadQuiz();
    }
}

// Start the quiz on page load
window.onload = function() {
    loadQuiz();
};
