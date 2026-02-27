import "./styles.css";
import Game from "./modules/gameController.js";
import Player from "./modules/player.js";
import {
  initializeLayout,
  setupGameListeners,
  renderShips,
  setupPlacementListeners,
} from "./modules/displayController.js";

let myGame;

export function startNewGame() {
  const player1 = new Player("player", "human");
  const player2 = new Player("computer", "computer");

  myGame = new Game(player1, player2);

  initializeLayout();
  myGame.autoPlaceShips(player2);
  myGame.autoPlaceShips(player1);

  renderShips("#player-board", myGame.player1.gameboard, true);
  setupPlacementListeners(myGame);

  const randomizeBtn = document.querySelector("#randomize-btn");
  if (randomizeBtn) randomizeBtn.disabled = false;
}

startNewGame();

document.querySelector("#start-btn").addEventListener("click", () => {
  setupGameListeners(myGame);
  document.querySelector("#randomize-btn").disabled = true;
});

document.getElementById("current-year").textContent = new Date().getFullYear();
