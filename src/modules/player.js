import Gameboard from "./gameBoard.js";

export default class Player {
  constructor(type) {
    this.type = type;
    this.gameboard = new Gameboard();
  }

  attack(opponentBoard, [x, y]) {
    return opponentBoard.receiveAttack([x, y]);
  }

  play(opponentBoard, coords) {
    if (this.type === "computer") {
      return this.#makeRandomAttack(opponentBoard);
    }
    const [x, y] = coords;
    return this.attack(opponentBoard, [x, y]);
  }

  #makeRandomAttack(opponentBoard) {
    let result = null;

    while (result === "already attacked" || result === null) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);

      result = this.attack(opponentBoard, [x, y]);
    }

    return result;
  }
}
