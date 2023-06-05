const gridParent = document.querySelector(".grid-container");
const pairsEl = document.querySelector("#pairs");
const movesEl = document.querySelector("#moves");
const modalShade = document.querySelector(".modal-shade");
const endForm = document.getElementById("end-form");
const levelSelect = document.getElementById("difficulty");

let beingMatched = [];
let numOfPairs = 0;

let movesMade = 0;
let timeSpent = 0;
let timeAllowed = 60;
let timer;
let level = "easy";
let movesAllowed = 20;

endForm.addEventListener("submit", (e) => {
  // window.location.reload();
  e.preventDefault();
  const name = document.getElementById("name").value;
  console.log(name);
});

levelSelect.addEventListener("change", (e) => {
  console.log(e.target.value);
  level = e.target.value;
  if (level === "easy") {
    timeAllowed = 60;
    movesAllowed = 25;
  }
  if (level === "medium") {
    timeAllowed = 45;
    movesAllowed = 20;
  }
  if (level === "hard") {
    timeAllowed = 30;
    movesAllowed = 15;
  }

  // reset the board
  numOfPairs = 0;
  pairsEl.textContent = numOfPairs;
  movesMade = 0;
  movesEl.textContent = movesMade;
  timeSpent = 0;
  clearInterval(timer);
  timer = null;
  generateBoard();
});

// display number of pairs and moves
pairsEl.textContent = numOfPairs;
movesEl.textContent = movesMade;

generateBoard();

function generateBoard() {
  const cardNumbers = [];
  while (cardNumbers.length < 8) {
    let randomNumber = Math.floor(Math.random() * 10) + 1;
    if (!cardNumbers.includes(randomNumber)) cardNumbers.push(randomNumber);
  }
  // double the digits
  cardNumbers.push(...cardNumbers);

  // shuffle the digits
  cardNumbers.sort(() => Math.random() - 0.5);

  gridParent.innerHTML = "";

  for (let i = 0; i < cardNumbers.length; i++) {
    const newCard = document.createElement("div");
    newCard.classList.add("flip-card", "is-not-flipped");
    newCard.innerHTML = `
    <div class="flip-card-inner">
    <div class="flip-card-front">
    </div>
      <div class="flip-card-back">
        ${cardNumbers[i]}
        </div>
    </div>
    `;

    newCard.addEventListener("click", (e) => {
      flipCard(newCard, cardNumbers[i], i);
    });

    gridParent.appendChild(newCard);
  }
}

function flipCard(newCard, cardValue, index) {
  if (!timer) {
    timer = setInterval(() => {
      if (timeSpent >= timeAllowed) {
        endGame();
      }
      timeSpent += 0.01;
    }, 10);
  }

  const cards = document.querySelectorAll(".flip-card");

  if (newCard.classList.contains("is-flipped")) {
    newCard.classList.remove("is-flipped");
    newCard.classList.add("is-not-flipped");
    newCard.children[0].setAttribute("style", "transform: rotateY(0deg)");
    beingMatched = beingMatched.filter((item) => item.cardIndex != index);
  }

  if (newCard.classList.contains("is-not-flipped")) {
    newCard.classList.add("is-flipped");
    newCard.classList.remove("is-not-flipped");
    newCard.children[0].setAttribute("style", "transform: rotateY(180deg)");

    beingMatched.push({
      cardIndex: index,
      cardValue: cardValue,
    });
  }

  if (beingMatched.length === 2) {
    movesMade++;
    movesEl.textContent = movesMade;
    if (movesMade >= movesAllowed) {
      endGame();
    }

    gridParent.style.pointerEvents = "none";

    const card1 = cards[beingMatched[0].cardIndex];
    const card2 = cards[beingMatched[1].cardIndex];

    if (beingMatched[0].cardValue === beingMatched[1].cardValue) {
      console.log("match");
      console.log(card1);
      console.log(card2);
      // add class 'is-Matched' to the cards
      card1.classList.add("is-matched");
      card2.classList.add("is-matched");
      gridParent.style.pointerEvents = "auto";
      beingMatched = [];
      // add 1 to numOfPairs
      numOfPairs++;
      pairsEl.textContent = numOfPairs;
      // if numOfPairs === 8, then game over
      if (numOfPairs === 8) {
        alert("game over");
      }
    } else {
      console.log("no match");
      console.log(card1);
      console.log(card2);
      // flip the cards back over

      setTimeout(() => {
        console.log("hello");
        card1.classList.remove("is-flipped");
        card1.classList.add("is-not-flipped");
        card2.classList.remove("is-flipped");
        card2.classList.add("is-not-flipped");
        card1.children[0].setAttribute("style", "transform: rotateY(0deg)");
        card2.children[0].setAttribute("style", "transform: rotateY(0deg)");
        beingMatched = [];
        gridParent.style.pointerEvents = "auto";
      }, 750);
    }
    // empty out the beingMatched array
  }
}

function endGame() {
  modalShade.style.display = "grid";
  const pairs2 = document.getElementById("pairs2");
  const moves2 = document.getElementById("moves2");
  pairs2.textContent = numOfPairs;
  moves2.textContent = movesMade;
  clearInterval(timer);
  timer = null;
  document.getElementById("time").textContent = timeSpent.toFixed(2);
}
