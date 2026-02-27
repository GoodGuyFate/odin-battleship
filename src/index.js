import "./styles.css";
import Game from "./modules/gameController.js";
import Player from "./modules/player.js";
import Ship from "./modules/ship.js";
import { initializeLayout, setupGameListeners, renderShips, setupPlacementListeners } from "./modules/displayController.js";

initializeLayout();

const player1 = new Player("human", "human");
const player2 = new Player("computer", "computer");

const myGame = new Game(player1, player2);

myGame.autoPlaceShips(player2);
myGame.autoPlaceShips(player1);
renderShips("#player-board", myGame.player1.gameboard, true)
setupPlacementListeners(myGame);

document.querySelector("#start-btn").addEventListener("click", () => {
    setupGameListeners(myGame);
    document.querySelector("#randomize-btn").disabled = true;
});

document.getElementById("current-year").textContent = new Date().getFullYear();