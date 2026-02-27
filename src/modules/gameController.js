import Ship from "./ship.js";

export default class Game {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.currentPlayer = player1;
    this.winner = null;
  }

  switchTurn() {
    if (this.currentPlayer === this.player1) {
      this.currentPlayer = this.player2;
    } else {
      this.currentPlayer = this.player1;
    }
  }

  playRound(coords) {
    if (this.winner != null) return;
    if (this.currentPlayer.type === "computer" && coords) return;

    const opponent =
      this.currentPlayer === this.player1 ? this.player2 : this.player1;

    const shipAtTarget = opponent.gameboard.getSlot(coords);
    const result = this.currentPlayer.play(opponent.gameboard, coords);

    if (shipAtTarget && shipAtTarget.isSunk()) {
      console.log("Sunk!");
    }

    if (opponent.gameboard.allShipsSunk()) {
      this.winner = this.currentPlayer;
    } else {
      this.switchTurn();

      if (this.currentPlayer.type === "computer") {
        setTimeout(() => {
          this.playRound();
        }, 600);
      }
    }
    return result;
  }

  autoPlaceShips(playerInstance) {
    const lengths = [5, 4, 3, 3, 2];
    lengths.forEach((len) => {
      let placed = false;
      while (!placed) {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        const orientation = Math.random() > 0.5 ? "horizontal" : "vertical";
        const ship = new Ship(len);
        if (
          playerInstance.gameboard.placeShip(ship, [x, y], orientation) !==
          false
        ) {
          placed = true;
        }
      }
    });
  }
}
