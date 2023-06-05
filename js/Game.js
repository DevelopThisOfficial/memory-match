import Card from "./Card.js";
import History from "./History.js";
import elements from "./document.js";

const {
  levelSelect,
  modalShade,
  gameOverModal,
  historyModal,
  viewHistory,
  playAgain,
  gridParent,
  pairsEl,
  movesEl,
  timeRemaining,
} = elements;

export default class Game {
  constructor() {
    this.level = "easy";
    this.cardValues = [];
    this.beingMatched = [];
    this.numOfPairs = 0;
    this.movesMade = 0;
    this.movesAllowed = 25;
    this.timeElapsed = 0;
    this.timer = null;
    this.timeAllowed = 60;
    this.history = new History();
    this.viewHistory = this.viewHistory.bind(this);

    levelSelect.addEventListener("change", (e) => {
      this.changeLevel(e.target.value);
    });

    const playAgainButtons = Array.from(playAgain);
    playAgainButtons.forEach((button) => {
      button.addEventListener("click", () => {
        this.resetGame();
        modalShade.style.display = "none";
        gameOverModal.style.display = "none";
        historyModal.style.display = "none";
        this.newGame();
      });
    });

    viewHistory.addEventListener("click", this.viewHistory);
  }

  newGame() {
    this.generateCardValues();
    this.generateGrid();
    this.history.renderTable(); // take away later
  }

  generateCardValues() {
    this.cardValues = [];

    while (this.cardValues.length < 8) {
      let randomNumber = Math.floor(Math.random() * 10) + 1;
      if (!this.cardValues.includes(randomNumber))
        this.cardValues.push(randomNumber);
    }

    // double the digits
    this.cardValues.push(...this.cardValues);

    // shuffle the digits
    this.cardValues.sort(() => Math.random() - 0.5);
  }

  generateGrid() {
    gridParent.innerHTML = ``;
    for (let i = 0; i < this.cardValues.length; i++) {
      const card = new Card(this, i);

      gridParent.appendChild(card.getHTMLElement());
    }
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.timeElapsed += 0.01;
      if (this.timeAllowed - this.timeElapsed <= 0) {
        this.endGame("time");
        clearInterval(this.timer);
        return;
      }
      timeRemaining.textContent = (this.timeAllowed - this.timeElapsed).toFixed(
        2
      );
    }, 10);
  }

  changeLevel(selectedLevel) {
    if (selectedLevel === "easy") {
      this.level = "easy";
      this.timeAllowed = 60;
      this.movesAllowed = 25;
    }
    if (selectedLevel === "medium") {
      this.level = "medium";
      this.timeAllowed = 45;
      this.movesAllowed = 20;
    }
    if (selectedLevel === "hard") {
      this.level = "hard";
      this.timeAllowed = 30;
      this.movesAllowed = 15;
    }
    this.resetGame();
  }

  setBeingMatched(array) {
    this.beingMatched = array;
    if (this.beingMatched.length === 2) {
      this.evaluateMatch();
    }
  }

  evaluateMatch() {
    this.movesMade++;
    movesEl.textContent = this.movesAllowed - this.movesMade;

    gridParent.style.pointerEvents = "none";
    const card1 = this.beingMatched[0];
    const card2 = this.beingMatched[1];
    if (card1.value === card2.value) {
      // match
      this.numOfPairs++;
      pairsEl.textContent = this.numOfPairs;
      this.beingMatched = [];

      card1.setIsMatched(true);
      card2.setIsMatched(true);

      gridParent.style.pointerEvents = "auto";
    } else {
      // no match
      // flip the cards back over
      setTimeout(() => {
        card1.flipCardToBack();
        card2.flipCardToBack();
        this.setBeingMatched([]);
        gridParent.style.pointerEvents = "auto";
      }, 750);
    }

    if (this.movesMade >= this.movesAllowed && this.numOfPairs < 8) {
      this.endGame("moves");
      return;
    }
    if (this.numOfPairs >= 8) this.endGame("pairs");
  }

  endGame(condition) {
    clearInterval(this.timer);
    const dateTime = new Date().toISOString();

    this.history.addHistoryItem({
      dateTime,
      level: this.level,
      timeSpent: Math.min(this.timeElapsed.toFixed(2), this.timeAllowed),
      movesMade: this.movesMade,
      matchesMade: this.numOfPairs,
      win: condition === "pairs" ? true : false,
    });
    let endMessage = { text: "", color: "" };

    switch (condition) {
      case "moves":
        endMessage.text = `You ran out of moves!`;
        endMessage.color = "red";
        break;

      case "time":
        endMessage.text = `You ran out of time!`;
        endMessage.color = "red";
        break;

      default:
        endMessage.text = `You matched all the pairs!`;
        endMessage.color = "green";
        break;
    }

    document.getElementById("end-message").textContent = endMessage.text;
    document.getElementById("end-message").style.color = endMessage.color;
    document.getElementById("pairs2").textContent = this.numOfPairs;
    document.getElementById("moves2").textContent = this.movesMade;
    document.getElementById("time2").textContent = Math.min(
      this.timeElapsed.toFixed(2),
      this.timeAllowed
    );
    modalShade.style.display = "grid";
    gameOverModal.style.display = "block";
  }

  resetGame() {
    clearInterval(this.timer);
    this.timer = null;
    this.cardValues = [];
    this.beingMatched = [];
    this.numOfPairs = 0;
    this.movesMade = 0;
    this.timeElapsed = 0;
    pairsEl.textContent = this.numOfPairs;
    movesEl.textContent = this.movesAllowed;
    timeRemaining.textContent = this.timeAllowed;
  }

  viewHistory() {
    this.history.renderTable();
    gameOverModal.style.display = "none";
    historyModal.style.display = "block";
  }
}
