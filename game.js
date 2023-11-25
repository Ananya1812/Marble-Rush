alert("Score More than 300 to win this game");
// displaying name
const storedName = localStorage.getItem("nickname");

// Updates the content of the span element with the stored name
const nameSpan = document.getElementById("nickname");
nameSpan.textContent = storedName;

// mute-unmute
const soundIcon = document.getElementById("soundIcon");
const gameAudio = document.getElementById("gameAudio");
var startTimeInSeconds = 10;
gameAudio.currentTime = startTimeInSeconds;
gameAudio.play();

let isMuted = false;

soundIcon.addEventListener("click", () => {
  if (isMuted) {
    gameAudio.play();
    soundIcon.textContent = "🔊"; // Change to unmute symbol
  } else {
    gameAudio.pause();
    soundIcon.textContent = "🔇"; // Change to mute symbol
  }
  isMuted = !isMuted;
});

// exit button
const exitButton = document.getElementById("exitButton");

exitButton.addEventListener("click", () => {
  window.location.href = "./index.html";
});

// game code-------------------------------------------------------------------------------------

// we have to create an array which contains all the colour of marbles present it corresponds to the image eg:Red.png
var marbles = ["Blue", "Orange", "Green", "Yellow", "Pink", "Purple"];
var board = []; //2d array which would have all the images
var rows = 9; //number of rows
var columns = 9; //number of columns
var score = 0; //keep a tract of scor
const audio = document.getElementById("hit");

var currTile; //location from where you want to drag
var otherTile; //location where you want to drop

window.onload = function () {
  startGame();
  //every 1/10th os a second this funtion would be called and the marble marble would be crushed
  window.setInterval(function () {
    crushMarble();
    slideMarble();
    generateMarble();
    // scoreBoard();
  }, 100);
};
// to generate random marbles
function randomMarble() {
  return marbles[Math.floor(Math.random() * marbles.length)];
}
// generates random marble and places them on
function startGame() {
  for (let r = 0; r < rows; r++) {
    let row = []; //hold all the image tag for specifc row address
    for (let c = 0; c < columns; c++) {
      // we created an image tag here
      let tile = document.createElement("img");
      tile.id = r.toString() + "-" + c.toString(); //giving coordinates for the marbles to be placed on the borad
      tile.src = "./images/marble/" + randomMarble() + ".png"; //setting the source of image to marbles folder

      //DRAG FUNCTIONALITY BY ADDING EVENT LISTENER
      tile.addEventListener("dragstart", dragStart); //click on a marble, initialize drag process
      tile.addEventListener("dragover", dragOver); //clicking on marble, moving mouse to drag the marble
      tile.addEventListener("dragenter", dragEnter); //dragging marble onto another marble
      tile.addEventListener("dragleave", dragLeave); //leave marble over another marble
      tile.addEventListener("drop", dragDrop); //dropping a marble over another marble
      tile.addEventListener("dragend", dragEnd); //after drag process completed, we swap marble

      document.getElementById("board").append(tile); //adds the marbles to the board
      row.push(tile); //adding the marble to 2d array
    }
    board.push(row); //marbles get printed on the board
  }

  console.log(board); //displays address of 2d array in console
}
// initialising funtions to eventlisteners
function dragStart() {
  //this refers to tile that was clicked on for dragging

  currTile = this;
}

function dragOver(e) {
  //this refers to tile that was clicked on for swapping
  e.preventDefault();
}

function dragEnter(e) {
  //this refers to tile that was clicked on for dropping
  e.preventDefault();
}

function dragLeave() {} //leaving the marble

function dragDrop() {
  //this refers to the target tile that was dropped on
  otherTile = this;
}

function dragEnd() {
  //crush the marble of swap
  if (currTile.src.includes("blank") || otherTile.src.includes("blank")) {
    return; //the swapping dosent happen with blank tile
  }

  let currCoords = currTile.id.split("-"); //it will take the id  and the split it into 2 elements of the array  eg :id="0-0" -> {"0", "0"}
  let r = parseInt(currCoords[0]); //converts the string into numbers
  let c = parseInt(currCoords[1]);

  let otherCoords = otherTile.id.split("-"); // same process for  the other tile
  let r2 = parseInt(otherCoords[0]);
  let c2 = parseInt(otherCoords[1]);

  let left = c2 == c - 1 && r == r2; //othertile=current tile-1 && current tile == other tile (for coulmns)
  let right = c2 == c + 1 && r == r2; //othertile=current tile+1 && current tile == other tile (for coulmns)

  let up = r2 == r - 1 && c == c2; //other tile = other tile -1 && current tile == other tile    (for rows)
  let down = r2 == r + 1 && c == c2; //other tile = other tile +1 && current tile == other tile  (for rows)

  let isAdjacent = left || right || up || down; //one of the 4 direction

  if (isAdjacent) {
    // swapping of images using a thrid variable
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;

    let validMove = checkValid();
    if (!validMove) {
      // swapping of images using a thrid variable if not matched the wasps back

      let currImg = currTile.src;
      let otherImg = otherTile.src;
      currTile.src = otherImg;
      otherTile.src = currImg;
    }
  }
}

function crushMarble() {
  crushThree(); //if 3 marbles are matching initilaising a function to crush them
  document.getElementById("score").innerText = score;
}

function crushThree() {
  //check rows
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns - 2; c++) {
      //checking each marble with 2 ahead of actual cmarble selected
      let marble1 = board[r][c]; //adress of the current marble
      let marble2 = board[r][c + 1]; //adress of the current marble +1
      let marble3 = board[r][c + 2]; //adress of the current marble +2
      if (
        marble1.src == marble2.src &&
        marble2.src == marble3.src &&
        !marble1.src.includes("blank") //we want to fill up the marble marble crushed place
      ) {
        marble1.src = "./images/blank.png"; //assigning the image to .src
        marble2.src = "./images/blank.png";
        marble3.src = "./images/blank.png";
        score += 20;
        hit.play();
        console.log(score);
        localStorage.setItem("score1", score);
      }
    }
  }

  //check columns(same process as rows)
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows - 2; r++) {
      let marble1 = board[r][c];
      let marble2 = board[r + 1][c];
      let marble3 = board[r + 2][c];
      if (
        marble1.src == marble2.src &&
        marble2.src == marble3.src &&
        !marble1.src.includes("blank")
      ) {
        marble1.src = "./images/blank.png";
        marble2.src = "./images/blank.png";
        marble3.src = "./images/blank.png";
        score += 20;
        hit.play();
        console.log(score);
        localStorage.setItem("score2", score);
      }
    }
  }
}

function checkValid() {
  //check rows
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns - 2; c++) {
      let marble1 = board[r][c];
      let marble2 = board[r][c + 1];
      let marble3 = board[r][c + 2];
      if (
        marble1.src == marble2.src &&
        marble2.src == marble3.src &&
        !marble1.src.includes("blank")
      ) {
        return true;
      }
    }
  }

  //check columns
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows - 2; r++) {
      let marble1 = board[r][c];
      let marble2 = board[r + 1][c];
      let marble3 = board[r + 2][c];
      if (
        marble1.src == marble2.src &&
        marble2.src == marble3.src &&
        !marble1.src.includes("blank")
      ) {
        return true;
      }
    }
  }

  return false;
}

function slideMarble() {
  for (let c = 0; c < columns; c++) {
    let ind = rows - 1; //start iterating at bottom and goes up
    for (let r = columns - 1; r >= 0; r--) {
      if (!board[r][c].src.includes("blank")) {
        board[ind][c].src = board[r][c].src; //the blank tile will be replaced by marble
        ind -= 1; //and after replacing teh marble it moved=s up to the blank tile and keep replacing
      }
    }

    for (let r = ind; r >= 0; r--) {
      board[r][c].src = "./images/blank.png"; // set marble image to each tile
    }
  }
}
//generate new marble . we will genrate only for 1st row as the marble keeps sliding down
function generateMarble() {
  for (let c = 0; c < columns; c++) {
    //new marble woul be generate drow wise and replace with blank image
    if (board[0][c].src.includes("blank")) {
      board[0][c].src = "./images/marble/" + randomMarble() + ".png";
    }
  }
}

// timer

let seconds = 20;

(function countdown() {
  const timerDisplay = document.getElementById("timer");
  timerDisplay.textContent = seconds;

  if (seconds > 0) {
    seconds--;
    setTimeout(countdown, 1000);
  } else {
    console.log("Timer ended!");
  }

  if (seconds == 0) {
    location.href = "./end.html";
  }
})();
