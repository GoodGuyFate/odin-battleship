import Gameboard from "../modules/gameboard";
import Ship from "../modules/ship";

describe("Gameboard class", () => {
  let board;

  beforeEach(() => {
    board = new Gameboard();
  });

  test("placeShip can place a ship at specific coordinates horizontally", () => {
    const cruiser = new Ship(3);
    board.placeShip(cruiser, [0, 0], "horizontal");

    expect(board.getSlot([0, 0])).toBe(cruiser);
    expect(board.getSlot([1, 0])).toBe(cruiser);
    expect(board.getSlot([2, 0])).toBe(cruiser);
  });

  test("placeShip can place a ship at specific coordinates vertically", () => {
    const cruiser = new Ship(3);
    board.placeShip(cruiser, [0, 0], "vertical");

    expect(board.getSlot([0, 0])).toBe(cruiser);
    expect(board.getSlot([0, 1])).toBe(cruiser);
    expect(board.getSlot([0, 2])).toBe(cruiser);
  });

  test("placeShip should not allow overlapping ships", () => {
    const ship1 = new Ship(3);
    const ship2 = new Ship(3);
    board.placeShip(ship1, [0, 0], "horizontal");
    const result = board.placeShip(ship2, [0, 0], "horizontal");

    expect(result).toBe(false);
  });

  test("placeShip should not allow placement outside of grid", () => {
    const cruiser = new Ship(3);

    expect(board.placeShip(cruiser, [8, 0], "horizontal")).toBe(false);
  });

  test("receiveAttack should record a hit on a ship", () => {
    const cruiser = new Ship(3);
    board.placeShip(cruiser, [0, 0], "horizontal");

    expect(board.receiveAttack([0, 0])).toBe(true);
    expect(cruiser.hits).toBe(1);
  });

  test("receiveAttack should record a miss", () => {
    expect(board.receiveAttack([5, 5])).toBe(false);
    expect(board.missedAttacks).toContainEqual([5, 5]);
  });

  test("receiveAttack shouldn't be able to attack twice", () => {
    const cruiser = new Ship(3);
    board.placeShip(cruiser, [0, 0], "horizontal");

    expect(board.receiveAttack([0, 0])).toBe(true);
    expect(board.receiveAttack([0, 0])).toBe("already attacked");
  });
});
