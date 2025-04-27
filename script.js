const words = [ "has begut oli", "perdre el temps i la llavor", "qui no arrisca no pisca", "anar fora corda", "estic més content que un ginjol", "del teu pa en faras sopes", "mesclar ous i caragols", "cercar na maria per sa cuina"];
const img   = ["oli.jpg","temps.jpg","arrisca.jpg","corda.jpg","ginjol.jpg","pa.jpg","ous.jpg","cuina.jpg"]
let selectedWord = "";
let guessedLetters = [];
let wrongGuesses = 0;
const maxWrong = 5;

// DOM Elements
const wordDisplay = document.getElementById("wordDisplay");
const imgDisplay = document.getElementById("imgDisplay");
const wrongGuessesDisplay = document.getElementById("wrongGuesses");
const lettersContainer = document.getElementById("letters");
const message = document.getElementById("message");
const restartBtn = document.getElementById("restartBtn");
const vowels = ['a','à','à','e','é','è','i','í','í','o','ó','ò','u','ú','ú'];

function initGame() {
  selectedWord = words[Math.floor(Math.random() * words.length)];
  guessedLetters = [];
  wrongGuesses = 0;
  message.textContent = "";
  restartBtn.style.display = "none";
  /* IMG */
  const newImage = document.createElement('img');
  newImage.src = img[words.indexOf(selectedWord)];
  newImage.alt = img[words.indexOf(selectedWord)];
  imgDisplay.appendChild(newImage);
  /* END IMG */	
  updateWordDisplay();
  updateWrongGuesses();
  generateLetterButtons();
}

function updateWordDisplay() {
  wordDisplay.innerHTML = selectedWord
    .split("")
    .map(letter => {
      if (letter === " ") {
        return '<span class="blank-space"> </span>'; // display a space
      } else if (guessedLetters.includes(letter)) {
		  //--------------------------------------------------------------
		  //console.log("UPDATE",letter);
		  //console.log("UPDATE",guessedLetters);
		  //--------------------------------------------------------------
        return `<span>${letter}</span>`;
      } else {
        return `<span>_</span>`;
      }
    })
    .join(" ");

  // Check win condition
  const allGuessed = selectedWord
    .split("")
    .filter(char => char !== " ") // Skip spaces
    .every(letter => guessedLetters.includes(letter));

  if (allGuessed) {
    message.textContent = "🎉 Has encertat!";
    endGame();
  }
}

function updateWrongGuesses() {
  wrongGuessesDisplay.textContent = wrongGuesses;
  if (wrongGuesses >= maxWrong) {
    message.textContent = `💀 Has Perdut! La dita era: "${selectedWord}"`;
    endGame();
  }
}

function generateLetterButtons() {
  lettersContainer.innerHTML = "";
  for (let i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i).toLowerCase();
    const button = document.createElement("button");
    button.textContent = letter;
    button.addEventListener("click", () => handleGuess(letter, button));
    lettersContainer.appendChild(button);
  }
}


function handleGuess(letter, button) {
  button.disabled = true;
  
  
  if (vowels.includes(letter)){ 
	
	//--------------------------------------------------------------
	//console.log("entro vocal",letter)
	//--------------------------------------------------------------
	if (selectedWord.includes(letter) ||
	    selectedWord.includes(vowels[vowels.indexOf(letter)+1]) ||
	    selectedWord.includes(vowels[vowels.indexOf(letter)+1])
	   )
	{
		
		guessedLetters.push(letter);
		guessedLetters.push(vowels[vowels.indexOf(letter)+1]);
		guessedLetters.push(vowels[vowels.indexOf(letter)+2]);
		updateWordDisplay();
	}else{
		wrongGuesses++;
   		updateWrongGuesses();	
	}
  }else if (selectedWord.includes(letter)) {
    guessedLetters.push(letter);
    updateWordDisplay();
  } else {
    wrongGuesses++;
    updateWrongGuesses();
  }
}

function endGame() {
  const buttons = document.querySelectorAll("#letters button");
  buttons.forEach(btn => btn.disabled = true);
  restartBtn.style.display = "inline-block";
}

restartBtn.addEventListener("click", initGame);

// Start game
initGame();
