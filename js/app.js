document.addEventListener("DOMContentLoaded", () => {
  createSquares();

  
  const words = ["logic", "stack", "array", "query", "merge", "patch", "cache", "debug", "build", "model"];
  let word;
  let guessedWords = [[]];
  let availableSpace = 1;
  let guessedWordCount = 0;

  const keys = document.querySelectorAll(".keyboard-row button");

  function getNewWord() {
    
      word = words[Math.floor(Math.random() * words.length)];
      console.log("The word to guess is:", word);
  }

  getNewWord();

  function getCurrentWordArr() {
      const numberOfGuessedWords = guessedWords.length;
      return guessedWords[numberOfGuessedWords - 1];
  }

  function updateGuessedWords(letter) {
      const currentWordArr = getCurrentWordArr();

      if (currentWordArr && currentWordArr.length < 5) {
          currentWordArr.push(letter);

          const availableSpaceEl = document.getElementById(String(availableSpace));
          availableSpace = availableSpace + 1;
          availableSpaceEl.textContent = letter;
      }
  }

  function getTileColor(letter, index) {
      const isCorrectLetter = word.includes(letter);

      if (!isCorrectLetter) {
          return "rgb(58, 58, 60)";
      }

      const letterInThatPosition = word.charAt(index);
      const isCorrectPosition = letter === letterInThatPosition;

      if (isCorrectPosition) {
          return "rgb(83, 141, 78)";
      }

      return "rgb(181, 159, 59)";
  }

  function handleSubmitWord() {
      const currentWordArr = getCurrentWordArr();
      if (currentWordArr.length !== 5) {
          window.alert("Word must be 5 letters");
          return;
      }

      const currentWord = currentWordArr.join("");
      const firstLetterId = guessedWordCount * 5 + 1;
      const interval = 200;

      currentWordArr.forEach((letter, index) => {
          setTimeout(() => {
              const tileColor = getTileColor(letter, index);
              const letterId = firstLetterId + index;
              const letterEl = document.getElementById(letterId);
              letterEl.classList.add("animate__flipInX");
              letterEl.style = `background-color:${tileColor};border-color:${tileColor}`;
          }, interval * index);
      });

      guessedWordCount += 1;

      if (currentWord === word) {
          window.alert("Congratulations!");
      }

      if (guessedWords.length === 6) {
          window.alert(`Sorry, you have no more guesses! The word is ${word}.`);
      }

      guessedWords.push([]);
  }

  function createSquares() {
      const gameBoard = document.getElementById("board");

      for (let index = 0; index < 30; index++) {
          let square = document.createElement("div");
          square.classList.add("square");
          square.classList.add("animate__animated");
          square.setAttribute("id", index + 1);
          gameBoard.appendChild(square);
      }
  }

  function handleDeleteLetter() {
    const currentWordArr = getCurrentWordArr();
    if (!currentWordArr.length) return;

    const removedLetter = currentWordArr.pop();
    guessedWords[guessedWords.length - 1] = currentWordArr;

    const lastLetterEl = document.getElementById(String(availableSpace - 1));
    if (lastLetterEl) {
        lastLetterEl.textContent = "";
    }

    availableSpace = availableSpace - 1;
}
  

  for (let i = 0; i < keys.length; i++) {
      keys[i].onclick = ({ target }) => {
          const letter = target.getAttribute("data-key");

          if (letter === "enter") {
              handleSubmitWord();
              return;
          }

          if (letter === "del") {
              handleDeleteLetter();
              return;
          }

          updateGuessedWords(letter);
      };
  }
});

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const colors = ['yellow', 'green', 'gray'];

function createLetter() {
    const letterElement = document.createElement('div');
    letterElement.classList.add('letter');
    letterElement.textContent = letters[Math.floor(Math.random() * letters.length)];
    letterElement.style.color = colors[Math.floor(Math.random() * colors.length)];
    

    letterElement.style.left = Math.random() * window.innerWidth + 'px';
    letterElement.style.top = Math.random() * window.innerHeight + 'px';
    
    document.querySelector('.background').appendChild(letterElement);
    

    animateLetter(letterElement);
}

function animateLetter(letterElement) {
    const animationDuration = Math.random() * 5 + 3; 
    const endX = Math.random() * window.innerWidth;
    const endY = Math.random() * window.innerHeight;

    letterElement.animate([
        { transform: 'translate(0, 0)' },
        { transform: `translate(${endX}px, ${endY}px)` }
    ], {
        duration: animationDuration * 1000,
        easing: 'linear',
        fill: 'forwards'
    });


    setTimeout(() => {
        letterElement.remove();
    }, animationDuration * 1000);
}

setInterval(createLetter, 500);

document.addEventListener("DOMContentLoaded", () => {
    const welcomeScreen = document.getElementById("welcome-screen");
    const startButton = document.getElementById("start-button");
    const gameContainer = document.getElementById("container");

    gameContainer.style.display = "none";

    startButton.addEventListener("click", () => {
        welcomeScreen.style.display = "none";
        gameContainer.style.display = "flex";
    });
});
