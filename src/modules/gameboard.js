export default class Gameboard {
  constructor() {
    this.ships = [];
    this.missedAttacks = [];
    this.hitAttacks = [];
    this.grid = Array.from({ length: 10 }, () => Array(10).fill(null));
  }

  placeShip(ship, [x, y], orientation) {
    for (let i = 0; i < ship.length; i++) {
      let currentX = x;
      let currentY = y;

      if (orientation === "horizontal") {
        currentX += i;
      } else if (orientation === "vertical") {
        currentY += i;
      }

      if (!this.#checkGrid([currentX, currentY])) return false;
    }

    for (let i = 0; i < ship.length; i++) {
      let currentX = x;
      let currentY = y;

      if (orientation === "horizontal") {
        currentX += i;
      } else if (orientation === "vertical") {
        currentY += i;
      }

      this.grid[currentX][currentY] = ship;
    }
    this.ships.push(ship)
  }

  receiveAttack([x, y]) {
    if (this.#isAlreadyAttacked([x, y])) {
      return "already attacked";
    }

    const target = this.getSlot([x, y]);

    if (target) {
      this.hitAttacks.push([x, y]);
      target.hit();
      return true;
    }
    this.missedAttacks.push([x, y]);
    return false;
  }

  allShipsSunk() {
    return this.ships.every(ship => ship.isSunk())
  }

  getSlot([x, y]) {
    return this.grid[x][y];
  }

  #isWithinBoard = ([x, y]) => {
    return x >= 0 && x <= 9 && y >= 0 && y <= 9;
  };

  #isAlreadyAttacked([x, y]) {
    const inMisses = this.missedAttacks.some((c) => c[0] === x && c[1] === y);
    const inHits = this.hitAttacks.some((c) => c[0] === x && c[1] === y);

    return inMisses || inHits;
  }

  #checkGrid([x, y]) {
    if (!this.#isWithinBoard([x, y]) || this.grid[x][y] != null) {
      return false;
    }
    return true;
  }
}
