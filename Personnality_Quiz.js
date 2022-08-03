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
    "text": " Choisir route",
    "trait": "abstraction",
    "answers":[
        {
            "text": "courte mais difficile",
            "score": 1
        },
        {
            "text": "facile mais longue",
            "score": 2
        },
        {
            "text": "facile mais longue en allant tres vite",
            "score": 3
        }

    ]
  },
  {
    "text": "Travail passionnant mais collègues odieux",
    "trait": "perception",
    "trait": "perception",
    "answers":[
        {
            "text": "rester et s&#039isoler",
            "score": 1
        },
        {
            "text": "partir",
            "score": 2
        },
        {
            "text": "rester et pers&eacutev&eacuterer",
            "score": 3
        }

    ]
  },
  {
    "text": "Mélancolique",
    "trait": "extraversion",
    "answers":[
        {
            "text": "voir des ami-e-s",
            "score": 1
        },
        {
            "text": "rester seul-e",
            "score": 2
        },
        {
            "text": "rencontrer des inconnu-e-s",
            "score": 3
        }

    ]
  },
	{
    "text": "Idée de projet à plusieurs",
    "trait": "logique",
    "answers":[
        {
            "text": "faire avec ancien-e-s coll&egravegues",
            "score": 1
        },
        {
            "text": "faire seul-e",
            "score": 2
        },
        {
            "text": "faire avec un-e inconnu-e",
            "score": 3
        }

    ]
  },
	{
    "text": "Ami-e quitt&eacute-e",
    "trait": "sensation",
    "answers":[
        {
            "text": "&eacutecouter",
            "score": 1
        },
        {
            "text": "expliquer la logique",
            "score": 2
        },
        {
            "text": "vengeance",
            "score": 3
        }

    ]
  },
	{
    "text": "Connaître",
    "trait": "extraversion",
    "answers":[
        {
            "text": "avec un livre ",
            "score": 1
        },
        {
            "text": "en essayant",
            "score": 2
        },
        {
            "text": "en imitant",
            "score": 3
        }

    ]
  },
	{
    "text": "Voyage",
    "trait": "perception",
    "answers":[
        {
            "text": "improvisation",
            "score": 1
        },
        {
            "text": "autostop",
            "score": 2
        },
        {
            "text": "r&eacuteserver",
            "score": 3
        }

    ]
  },
	{
    "text": "S'amuser",
    "trait": "introversion",
    "answers":[
        {
            "text": "avec ami-e-s",
            "score": 1
        },
        {
            "text": "seul-e",
            "score": 2
        },
        {
            "text": "avec des inconnu-e-s",
            "score": 3
        }

    ]
  },
	{
    "text": "Dysfonctionnement",
    "trait": "sensation",
    "answers":[
        {
            "text": "se renseigner",
            "score": 1
        },
        {
            "text": "bidouiller",
            "score": 2
        },
        {
            "text": " deamander de l'aide",
            "score": 3
        }

    ]
  },
	{
    "text": "fan d'une célébrité je veux...",
    "trait": "entreprise",
    "answers":[
        {
            "text": "le/la rencontrer",
            "score": 1
        },
        {
            "text": "lire sa biographie",
            "score": 2
        },
        {
            "text": "lui écrire",
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
        "transitionStart": 1
    }, 
    "entreprise" : {
        "total" : 0,
        "oldtotal" : 0,
        "transition" : "3",
        "transitionStart": 1
    },
    "abstraction" : {
        "total" : 0,
        "oldtotal" : 0,
        "transition" : "3",
        "transitionStart":1
    },
     "sensation" : {
        "total" : 0,
        "oldtotal" : 0,
        "transition" : "3",
        "transitionStart":1
    },
     "logique" : {
        "total" : 0,
        "oldtotal" : 0,
        "transition" : "3",
        "transitionStart": 1
    },
     "affectif" : {
        "total" : 0,
        "oldtotal" : 0,
        "transition" : "3",
        "transitionStart": 1
    },
     "introversion" : {
        "total" : 0,
        "oldtotal" : 0,
        "transition" : "3",
        "transitionStart": 1
    },
     "extraversion" : {
        "total" : 0,
        "oldtotal" : 0,
        "transition" : "3",// on l'utilise plus, il faudra le virer
        "transitionStart": 1
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
window.currentQuestion = 0;
let score = [];
let selectedAnswersData = [];

displayQuestion(window.currentQuestion);
nextButton.addEventListener('click', processAnswer);
previousButton.addEventListener('click',loadPreviousQuestion);

function recordAnswer(){
	
}
function totaliser(){
    
    traitsNames.forEach(function(trait){
       // window.traits[trait].oldtotal = window.traits[trait].total;
        
        //on remet le score total à zéro
      //  window.traits[trait].total = 0;

        //pour le lerp
     //   window.traits[trait].transition = 0;
       // window.traits[trait].transitionStart = frameCount;
    });

    //on recalcule les nouveaux totaux
    selectedAnswersData.forEach(function(item){
        console.log("totaliser()");
        console.log(item);
        console.log(window.traits[item.trait]);
        window.traits[item.trait].oldtotal += item.score;
        console.log(window.traits[item.trait]);
    });
		selectedAnswersData = [];
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
        "trait":questions[window.currentQuestion].trait,
        "score":answerScore
    });

    window.currentQuestion++;

    selectedOption.checked = false;
    //If quiz is on the final question
    if(window.currentQuestion == totalQuestions - 1) {
        nextButton.textContent = 'Finish';
    }
    //If the quiz is finished then we hide the questions container and show the results 
    if(window.currentQuestion == totalQuestions) {
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
    displayQuestion(window.currentQuestion);
}


function loadPreviousQuestion(){
	window.currentQuestion--;
	//enlève la dernière valeure du tableau
	score_NS.pop();
	//genère la question
	displayQuestion(window.currentQuestion);
}

//Fuction to reset and restart the quiz;
function restartQuiz(e) {
    if(e.target.matches('button')) {
    //reset array index and score
    window.currentQuestion = 0;
    score = [];
    //Reload quiz to the start
    location.reload();
    }
}

