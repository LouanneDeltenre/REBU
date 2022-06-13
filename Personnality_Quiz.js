const socket = io("ws://localhost:8080");


socket.onAny((type, msg)=>{
    console.log(msg);
    messageReceiver();
})

function messageReceiver(name, face) {
    if (name == 1){
        selectedOption;
    }
    if (name == 2){
        selectedOption;
    }
    if (name == 3){
        selectedOption;
    }


}


const questions = [
  {
    "text": "vacances = ?",
    "trait": "extraversion",
    "answers":[
        {
            "text": "rien prevu",
            "score": 1
        },
        {
            "text": "auto-stop",
            "score": 2
        },
        {
            "text": "reserve",
            "score": 3
        }

    ]
  },
  {
    "text": "projet de groupe = ?",
    "trait": "perception",
    "answers":[
        {
            "text": "seul",
            "score": 1
        },
        {
            "text": "amis",
            "score": 2
        },
        {
            "text": "nouveau/nouvelle",
            "score": 3
        }

    ]
  },
  {
    "text": "ça fonctionne ? ",
    "trait": "extraversion",
    "answers":[
        {
            "text": "oui",
            "score": 1
        },
        {
            "text": "non",
            "score": 2
        },
        {
            "text": "peut-être",
            "score": 3
        }

    ]
  }
]

window.listePresence = new Array(10);
listePresence.forEach(function(cube){
    cube = -1; // -1 == cube pas connectée
    // si valeur == valeur de la face
});

window.traitsNames = [
    "perception","entreprise","abstraction","sensation",
    "logique","affectif","introversion","extraversion"
];

window.traits = {
     "perception" : {
        "total" : 0,
        "oldtotal" : 0,
        "transition" : "3",//la valeur qui est passée au lerp
        "transitionStart": 0
    }, 
    "entreprise" : {
        "total" : 0,
        "oldtotal" : 0,
        "transition" : "3",
        "transitionStart": 0
    },
    "abstraction" : {
        "total" : 0,
        "oldtotal" : 0,
        "transition" : "3",
        "transitionStart": 0
    },
     "sensation" : {
        "total" : 0,
        "oldtotal" : 0,
        "transition" : "3",
        "transitionStart": 0
    },
     "logique" : {
        "total" : 0,
        "oldtotal" : 0,
        "transition" : "3",
        "transitionStart": 0
    },
     "affectif" : {
        "total" : 0,
        "oldtotal" : 0,
        "transition" : "3",
        "transitionStart": 0
    },
     "introversion" : {
        "total" : 0,
        "oldtotal" : 0,
        "transition" : "3",
        "transitionStart": 0
    },
     "extraversion" : {
        "total" : 0,
        "oldtotal" : 0,
        "transition" : "3",// on l'utilise plus, il faudra le virer
        "transitionStart": 0
    },
}




const container = document.querySelector('.quiz-container');
const questionEl = document.querySelector('.question');
const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');
const result = document.querySelector('.result');
const restartButton = document.querySelector('.restart');
const previousButton = document.querySelector('.previous');
const nextButton = document.querySelector('.next');
const selectedOption = document.querySelector('input[type="radio"]:checked');



const totalQuestions = questions.length;
let currentQuestion = 0;
let score = [];
let selectedAnswersData = [];

displayQuestion(currentQuestion);
nextButton.addEventListener('click', processAnswer);
previousButton.addEventListener('click',loadPreviousQuestion);

function totaliser(){
    
    traitsNames.forEach(function(trait){
        window.traits[trait].oldtotal = window.traits[trait].total;
        
        //on remet le score total à zéro
        window.traits[trait].total = 0;

        //pour le lerp
        window.traits[trait].transition = 0;
        window.traits[trait].transitionStart = frameCount;
    });

    //on recalcule les nouveaux totaux
    selectedAnswersData.forEach(function(item){
        console.log("totaliser()");
        console.log(item);
        console.log(window.traits[item.trait]);
        window.traits[item.trait].total += item.score;
        console.log(window.traits[item.trait]);
    });
}

function displayQuestion(index){
    questionEl.innerHTML = questions[index].text

	   	option1.innerHTML = questions[index].answers[0].text
	    option2.innerHTML = questions[index].answers[1].text
	    option3.innerHTML = questions[index].answers[2].text
}

function processAnswer () {
    const selectedOption = document.querySelector('input[type="radio"]:checked');
    
    if(!selectedOption) {
        alert('Please select your answer!');
        return;
    }

 const answerScore = Number(selectedOption.value);


    selectedAnswersData.push({
        "trait":questions[currentQuestion].trait,
        "score":answerScore
    });

    currentQuestion++;

    selectedOption.checked = false;
    //If quiz is on the final question
    if(currentQuestion == totalQuestions - 1) {
        nextButton.textContent = 'Finish';
    }
    //If the quiz is finished then we hide the questions container and show the results 
    if(currentQuestion == totalQuestions) {
        container.style.display = 'none';
        result.innerHTML =
         `<h1 class="final-score">Your score:${option1_Total}</h1>
         <div class="summary">
            <h1>Summary</h1>
            <p>Possible - Personality Traits, see below for a summary based on your results:</p>
            <p>15 - 21- You Need Help</p>
            <p>10 - 15 - Good Soul</p>
            <p>5 - 10 - Meh </p>
            <p>5 - Are You Even Real</p>
        </div>
        <button class="restart">Restart Quiz</button>
         `;
        return;
    }

    totaliser();
    displayQuestion(currentQuestion);
}


function loadPreviousQuestion(){
	currentQuestion--;
	//enlève la dernière valeure du tableau
	score_NS.pop();
	//genère la question
	displayQuestion(currentQuestion);
}

//Fuction to reset and restart the quiz;
function restartQuiz(e) {
    if(e.target.matches('button')) {
    //reset array index and score
    currentQuestion = 0;
    score = [];
    //Reload quiz to the start
    location.reload();
    }
}

