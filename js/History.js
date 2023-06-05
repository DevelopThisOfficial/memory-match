import elements from "./document.js";

const { clearHistoryButton, historyList } = elements;

export default class History {
  constructor() {
    // this.history is an array of ISO Strings
    this.history = localStorage.getItem("history")
      ? JSON.parse(localStorage.getItem("history"))
      : [];

    this.history.length === 0 &&
      clearHistoryButton.setAttribute("disabled", true);

    clearHistoryButton.addEventListener("click", () => {
      this.clearHistory();
      localStorage.removeItem("history");
    });
  }

  addHistoryItem(item) {
    // if clearHistoryButton is disabled, enable it
    if (clearHistoryButton.hasAttribute("disabled")) {
      clearHistoryButton.removeAttribute("disabled");
    }

    this.history.push(item);
    // If history length exceeds 10, remove the oldest entry
    if (this.history.length > 10) {
      this.history.shift();
    }
    this.syncLocalStorage();
  }

  getHistory() {
    return this.history;
  }

  clearHistory() {
    this.history = [];
    this.syncLocalStorage();
    this.renderTable();
  }

  syncLocalStorage() {
    localStorage.setItem("history", JSON.stringify(this.history));
  }

  renderTable() {
    if (this.history.length === 0) {
      historyList.textContent = `No history to show`;
      historyList.style.textAlign = "center";
      return;
    } else {
      historyList.innerHTML = "";
      for (let i = 0; i < this.history.length; i++) {
        const historyCard = this.createHistoryCard(i);

        historyList.prepend(historyCard);
      }
    }
  }

  createHistoryCard(historyIndex) {
    const { dateTime, level, movesMade, timeSpent, matchesMade } =
      this.history[historyIndex];

    const historyCard = document.createElement("div");
    historyCard.classList.add("history-card");
    historyCard.style.backgroundColor = this.history[historyIndex].win
      ? "rgba(0, 255, 0, 0.2)"
      : "rgba(255, 0, 0, 0.2)";

    for (let i = 0; i < 5; i++) {
      const historyCardCell = document.createElement("div");
      historyCardCell.classList.add("history-card-cell");

      let label;
      let value;
      switch (i) {
        case 0:
          label = "Date";
          value = [
            new Date(dateTime).toLocaleDateString({
              year: "numeric",
              month: "long",
              day: "numeric",
            }),

            new Date(dateTime).toLocaleTimeString({
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
            }),
          ];
          break;
        case 1:
          label = "Level";
          value = level.charAt(0).toUpperCase() + level.slice(1);
          break;
        case 2:
          label = "Moves";
          value = movesMade;
          break;
        case 3:
          label = "Time";
          value = timeSpent;
          break;
        case 4:
          label = "Matches";
          value = matchesMade;
          break;
      }

      const historyCardCellLabel = document.createElement("div");
      historyCardCellLabel.classList.add("history-card-cell-label");
      historyCardCellLabel.textContent = label;

      const historyCardCellValue = document.createElement("div");
      historyCardCellValue.classList.add("history-card-cell-value");
      historyCardCellValue.textContent = value;

      // splitting the datetime onto two lines
      if (typeof value === "object") {
        historyCardCellValue.innerHTML = `
          <div>${value[0]}</div>
          <div>${value[1]}</div>`;
      }

      historyCardCell.appendChild(historyCardCellLabel);
      historyCardCell.appendChild(historyCardCellValue);
      historyCard.appendChild(historyCardCell);
    }

    return historyCard;
  }
}
