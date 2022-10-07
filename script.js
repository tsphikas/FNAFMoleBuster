const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
const countdownBoard = document.querySelector(".countdown");
const startButton = document.querySelector(".startButton");
const wrapper = document.querySelector(".game");
const closeButton = document.querySelector(".closeButton");
const hitMole = new Audio("audio/scream.mp3");
const click = new Audio("audio/click.mp3");

let lastHole,
  timeUp,
  timeLimit = 20000,
  score = 0,
  countdown,
  firstClick = true,
  playing = false;

hideShowList(false, [wrapper, scoreBoard]);

function pickRandomHole(holes) {
  const randomHole = Math.floor(Math.random() * holes.length);
  const hole = holes[randomHole];
  if (hole === lastHole) {
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
  if (firstClick) {
    audioPlayer(click);
    hideShowList(true, [closeButton]);

    startButton.textContent = "Start";
    wrapper.style.display = "";
    scoreBoard.style.display = "";
    firstClick = false;
    return;
  }
  playing = true;
  audioPlayer(click);
  hideShowList(true, [closeButton, scoreBoard]);
  wrapper.style.display = "";
  countdown = timeLimit / 1000;
  scoreBoard.textContent = 0;
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
  audioPlayer(hitMole);
  this.style.pointerEvents = "none";
  setTimeout(() => {
    this.style.pointerEvents = "all";
  }, 800);
  scoreBoard.textContent = score;
}

moles.forEach((mole) => {
  mole.addEventListener("click", hit);
});

closeButton.addEventListener("click", () => {
  audioPlayer(click);
  hideShowList(false, [wrapper, scoreBoard, closeButton, countdownBoard]);
  startButton.textContent = "PlayGame";
});

const audioPlayer = function (sound) {
  sound.load();
  return sound.play();
};

function hideShowList(variable, list) {
  if (variable === false) {
    list.map((item) => (item.style.display = "none"));
  } else if (variable === true) {
    list.map(
      (item = function (item) {
        if (item === closeButton || item === scoreBoard) {
          item.style.display = "block";
        }
      })
    );
  }
}
