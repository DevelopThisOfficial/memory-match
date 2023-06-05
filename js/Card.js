export default class Card {
  constructor(game, index) {
    this.game = game;
    this.value = game.cardValues[index];
    this.index = index;
    this.isFlipped = false;
    this.isMatched = false;
    this.background = Math.floor(Math.random() * 8) + 1;
    this.element = document.createElement("div");
    this.element.classList.add("flip-card", "is-not-flipped");
    this.element.innerHTML = `
          <div class="flip-card-inner">
          <div class="flip-card-front">
          </div>
          <div class="flip-card-back">
              ${this.value}
              </div>
          </div>
          `;
    this.element.children[0].style.cssText = `background-image: url(./images/pattern${this.background}.png); background-size: cover`;
    this.element.addEventListener("click", (e) => {
      this.flipCardToFront();
    });
  }

  flipCardToFront() {
    if (!this.isFlipped && !this.isMatched) {
      // reveal the 'front' of the card
      this.isFlipped = true;
      this.element.children[0].style.transform = "rotateY(180deg)";

      this.game.setBeingMatched([...this.game.beingMatched, this]);
    }

    if (!this.game.timer) this.game.startTimer();
  }

  flipCardToBack() {
    if (this.isFlipped) {
      // hide the 'front' of the card
      this.isFlipped = false;
      this.element.children[0].style.transform = "rotateY(0deg)";
    }
  }

  getHTMLElement() {
    return this.element;
  }

  setIsMatched(bool) {
    this.isMatched = bool;
    this.element.classList.add("is-matched");
  }
}
