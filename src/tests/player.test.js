import Player from "../modules/player";
import Gameboard from "../modules/gameBoard";

describe("Player class", () => {
  test("player attack should record on the opponent's board", () => {
    const human = new Player("human");
    const enemyBoard = new Gameboard();
    const coords = [2, 2];

    human.attack(enemyBoard, coords);

    const isRecorded = enemyBoard.missedAttacks.some(
      (c) => c[0] === coords[0] && c[1] === coords[1],
    );

    expect(isRecorded).toBe(true);
  });

  test("computer player eventually finds the only remaining spot", () => {
    const computer = new Player("computer");
    const enemyBoard = new Gameboard();

    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        if (x === 9 && y === 9) continue;
        enemyBoard.receiveAttack([x, y]);
      }
    }
    const result = computer.play(enemyBoard);

    expect(result).not.toBe("already attacked");
    expect(enemyBoard.missedAttacks).toContainEqual([9, 9]);
  });
});
