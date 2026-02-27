import Gameboard from "./gameBoard.js";
import { startNewGame } from "../index.js";

export function renderGrid(boardContainer) {
  for (let i = 0; i < 100; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    boardContainer.append(cell);

    const x = i % 10;
    const y = Math.floor(i / 10);

    cell.dataset.x = x;
    cell.dataset.y = y;
  }
}

export function initializeLayout() {
  const playerBoard = document.querySelector("#player-board");
  const enemyBoard = document.querySelector("#enemy-board");

  playerBoard.innerHTML = "";
  enemyBoard.innerHTML = "";

  const newPlayerBoard = playerBoard.cloneNode(true);
  const newEnemyBoard = enemyBoard.cloneNode(true);
  
  playerBoard.parentNode.replaceChild(newPlayerBoard, playerBoard);
  enemyBoard.parentNode.replaceChild(newEnemyBoard, enemyBoard);

  renderGrid(newPlayerBoard);
  renderGrid(newEnemyBoard);
}

export function renderShips(boardId, gameboard, isPlayerBoard = false) {
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      const shipInstance = gameboard.grid[x][y];

      if (shipInstance !== null) {
        const cell = document.querySelector(
          `${boardId} .cell[data-x="${x}"][data-y="${y}"]`,
        );

        if (!cell) continue;

        if (isPlayerBoard) {
          cell.classList.add("ship", `ship-${shipInstance.length}`);
        } else if (shipInstance.isSunk()) {
          cell.classList.add("revealed-sunk");
        }
      }
    }
  }
}

export function setupGameListeners(gameInstance) {
  const enemyBoard = document.querySelector("#enemy-board");

  enemyBoard.addEventListener("click", (e) => {
    if (gameInstance.currentPlayer.type !== "human") return;

    if (!e.target.classList.contains("cell")) return;
    if (
      e.target.classList.contains("hit") ||
      e.target.classList.contains("miss")
    ) {
      return;
    }
    const x = Number(e.target.dataset.x);
    const y = Number(e.target.dataset.y);

    gameInstance.playRound([x, y]);

    updateBoardUI("#enemy-board", gameInstance.player2.gameboard);
    updateBoardUI("#player-board", gameInstance.player1.gameboard);
    renderShips("#enemy-board", gameInstance.player2.gameboard, false);
    renderShips("#player-board", gameInstance.player1.gameboard, true);

    if (gameInstance.currentPlayer.type === "computer") {
      setTimeout(() => {
        updateBoardUI("#enemy-board", gameInstance.player2.gameboard);
        updateBoardUI("#player-board", gameInstance.player1.gameboard);
      }, 600);
    }
  });
}

function updateBoardUI(boardId, gameboard) {
  gameboard.missedAttacks.forEach(([x, y]) => {
    const cell = document.querySelector(
      `${boardId} .cell[data-x="${x}"][data-y="${y}"]`,
    );
    if (cell) cell.classList.add("miss");
  });

  gameboard.hitAttacks.forEach(([x, y]) => {
    const cell = document.querySelector(
      `${boardId} .cell[data-x="${x}"][data-y="${y}"]`,
    );
    if (cell) cell.classList.add("hit");
  });
}

export function setupPlacementListeners(gameInstance) {
  const randomizeBtn = document.querySelector("#randomize-btn");

  randomizeBtn.onclick = () => {
    gameInstance.player1.gameboard = new Gameboard();
    gameInstance.autoPlaceShips(gameInstance.player1);

    const allCells = document.querySelectorAll("#player-board .cell");
    allCells.forEach((cell) => {
      cell.className = "cell";
    });

    renderShips("#player-board", gameInstance.player1.gameboard, true);
  };
}

export function showGameOver(winnerName) {
  const modal = document.getElementById("game-over-modal");
  const message = document.getElementById("winner-message");
  const restartBtn = document.getElementById("restart-btn");

  const displayName = winnerName ? winnerName.toUpperCase() : "SOMEONE";
  message.textContent = `${displayName} WON!`;
  modal.classList.remove("hidden");

  restartBtn.onclick = () => {
    modal.classList.add("hidden");
    startNewGame();
  };
}
