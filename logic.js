document.querySelector(".js-btn-rock").addEventListener("click", () => {
  playgame("Rock");
});
document.querySelector(".js-btn-paper").addEventListener("click", () => {
  playgame("Paper");
});
document.querySelector(".js-btn-scissors").addEventListener("click", () => {
  playgame("Scissors");
});
document.querySelector(".reset-game").addEventListener("click", () => {
  resetgame();
});
document.querySelector(".auto-play").addEventListener("click", () => {
  autoPlay();
});

document.body.addEventListener("keydown", (event) => {
  const keyPress = event.key.toLowerCase();
  if (keyPress === "r") {
    playgame("Rock");
  } else if (keyPress === "p") {
    playgame("Paper");
  } else if (keyPress === "s") {
    playgame("Scissors");
  }
});

let score = JSON.parse(localStorage.getItem("score")) || {
  gametie: 0,
  compwin: 0,
  userwin: 0,
};

function getcompMove() {
  const num = Math.random();
  if (num >= 0 && num < 1 / 3) {
    return "Rock";
  } else if (num >= 1 / 3 && num < 2 / 3) {
    return "Paper";
  } else {
    return "Scissors";
  }
}

function playgame(userMove) {
  let compMove = getcompMove();
  document.querySelector(
    ".moves"
  ).innerHTML = `Your Move is ${userMove} and Computer Move is ${compMove}`;
  game(userMove, compMove);
}

function game(userMove, compMove) {
  if (userMove === "Rock") {
    if (compMove === "Rock") {
      document.querySelector(".result").innerHTML = "Game Tie";
      score.gametie += 1;
    } else if (compMove === "Scissors") {
      document.querySelector(".result").innerHTML = "User Win";
      score.userwin += 1;
    } else {
      document.querySelector(".result").innerHTML = "Computer Win";
      score.compwin += 1;
    }
  } else if (userMove === "Paper") {
    if (compMove === "Paper") {
      document.querySelector(".result").innerHTML = "Game Tie";
      score.gametie += 1;
    } else if (compMove === "Rock") {
      document.querySelector(".result").innerHTML = "User Win";
      score.userwin += 1;
    } else {
      document.querySelector(".result").innerHTML = "Computer Win";
      score.compwin += 1;
    }
  } else {
    if (compMove === "Scissors") {
      document.querySelector(".result").innerHTML = "Game Tie";
      score.gametie += 1;
    } else if (compMove === "Paper") {
      document.querySelector(".result").innerHTML = "User Win";
      score.userwin += 1;
    } else {
      document.querySelector(".result").innerHTML = "Computer Win";
      score.compwin += 1;
    }
  }
  localStorage.setItem("score", JSON.stringify(score));
  document.querySelector(
    "p"
  ).innerHTML = `Game Tie: ${score.gametie} User Win: ${score.userwin} Computer Win: ${score.compwin}`;
}

function resetgame() {
  score.gametie = 0;
  score.compwin = 0;
  score.userwin = 0;
  localStorage.setItem("score", JSON.stringify(score));
  document.querySelector(".moves").innerHTML = "";
  document.querySelector(".result").innerHTML = "Scores get Reset";
  document.querySelector(
    "p"
  ).innerHTML = `Game Tie: ${score.gametie} User Win: ${score.userwin} Computer Win: ${score.compwin}`;
}
document.querySelector(
  "p"
).innerHTML = `Game Tie: ${score.gametie} User Win: ${score.userwin} Computer Win: ${score.compwin}`;

let isAutoPlay = false;
let intervalID;

function autoPlay() {
  if (!isAutoPlay) {
    intervalID = setInterval(() => {
      const usermv = getcompMove();
      playgame(usermv);
    }, 1000);
    isAutoPlay = true;
    document.querySelector(".auto-play").innerText = "Stop Play";
  } else {
    clearInterval(intervalID);
    isAutoPlay = false;
    document.querySelector(".auto-play").innerText = "Auto Play";
  }
}
