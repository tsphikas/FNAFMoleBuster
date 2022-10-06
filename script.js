const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
const countdownBoard = document.querySelector(".countdown");
const startButton = document.querySelector(".startButton");
const hitMole = new Audio("audio/scream.mp3");

let lastHole,
  timeUp,
  timeLimit = 20000,
  score = 0,
  countdown;
//20000
function pickRandomHole(holes) {
  const randomHole = Math.floor(Math.random() * holes.length);
  const hole = holes[randomHole];
  if (hole === lastHole) {
    //moles[randomHole].style.backgroundImage = "url('images/freddy1.png')";
    return pickRandomHole(holes);
  }
  moles[randomHole].style.backgroundImage = "url('images/freddy1.png')";

  lastHole = hole;
  return hole;
}

function popOut() {
  const time = Math.random() * 1300 + 400;
  const hole = pickRandomHole(holes);

  hole.classList.add("up");
  setTimeout(() => {
    hole.classList.remove("up");
    if (!timeUp) popOut();
  }, time);
}

function startGame() {
  countdown = timeLimit / 1000; //1000
  scoreBoard.textContent = 0;
  scoreBoard.style.display = "block";
  countdownBoard.textContent = countdown;
  timeUp = false;
  score = 0;
  popOut();
  setTimeout(() => {
    timeUp = true;
  }, timeLimit);

  let startCoundown = setInterval(() => {
    countdown -= 1;
    countdownBoard.textContent = countdown;
    if (countdown < 0) {
      countdown = 0;
      clearInterval(startCoundown);
      countdownBoard.textContent = "Times Up!!";
    }
  }, 1000);
}

startButton.addEventListener("click", startGame);

function hit(e) {
  score++;
  this.style.backgroundImage = "url('images/freddy2.png')";
  hitMole.load();
  hitMole.play();
  this.style.pointerEvents = "none";
  setTimeout(() => {
    //this.style.backgroundImage = "url('images/freddy1.png')";
    this.style.pointerEvents = "all";
  }, 800);
  scoreBoard.textContent = score;
}

moles.forEach((mole) => {
  mole.addEventListener("click", hit);
});
