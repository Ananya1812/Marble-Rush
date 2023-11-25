// storing score
const storedScore = localStorage.getItem("score");
if (storedScore !== null) {
  document.getElementById("displayScore").innerText = `Score: ${storedScore}`;
}

// result random generator
document.addEventListener("DOMContentLoaded", function () {
  // winning generator
  const winningPhrases = [
    " Congratulations! You won! ",
    "Victory is yours! ",
    " You are the champion! ",
    " Way to go! You nailed it! ",
    " Outstanding performance! You conquered! ",
    " Bravo! You've mastered this level! ",
    " You're unstoppable! You did it! ",
    " Incredible! You've achieved victory! ",
    " Fantastic job! You're the winner! ",
    " You're on fire! Another win for you! ",
  ];

  // loosing generator
  const losingPhrases = [
    " Better luck next time! ",
    " Don't give up! Try again. ",
    " It's okay to lose. Try harder next time. ",
    " Keep trying! You're getting closer. ",
    " Patience! Success is on its way. ",
    " Every failure is a stepping stone to success. ",
    " Learn from this setback! Keep pushing. ",
    "The storm will pass. Keep going! ",
    " Don't be discouraged! You're improving. ",
    " Every defeat brings new knowledge. ",
  ];

  const storedScore = localStorage.getItem("score1");
  const displayScoreElement = document.getElementById("displayScore");
  // checking if score is zero or not
  if (storedScore !== null) {
    displayScoreElement.innerText = `Score: ${storedScore}`;
    const score = parseInt(storedScore);
    displayResult(score);
  } else {
    displayScoreElement.innerText = "Score: N/A";
  }
  // random genration of quotes
  function getRandomPhrase(phrases) {
    const randomIndex = Math.floor(Math.random() * phrases.length);
    return phrases[randomIndex];
  }

  function displayResult(score) {
    const resultElement = document.getElementById("result");
    if (score >= 300) {
      resultElement.textContent = getRandomPhrase(winningPhrases);
      // make the audio work
      const win = document.getElementById("win-audio");
      win.play();
    } else {
      resultElement.textContent = getRandomPhrase(losingPhrases);
      // make the audio work
      const loose = document.getElementById("loose-audio");
      loose.play();
    }
  }
});

// making the play button functional
const button = document.getElementById("button");
button.onclick = () => {
  location.href = "./game.html";
};
