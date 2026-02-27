import Game from "../modules/gameController";
import Player from "../modules/player";
import Ship from "../modules/ship";

describe("Game controller", () => {
  test("switchTurn should toggle between player1 and player2", () => {
    const p1 = new Player("human");
    const p2 = new Player("computer");
    const game = new Game(p1, p2);

    // initial state should be p1
    expect(game.currentPlayer).toBe(p1);

    // first switch
    game.switchTurn();
    expect(game.currentPlayer).toBe(p2);

    // second switch
    game.switchTurn();
    expect(game.currentPlayer).toBe(p1);
  });

  test("playRound should declare a winner when a player's last ship is sunk", () => {
    const p1 = new Player("human");
    const p2 = new Player("human");
    const game = new Game(p1, p2);
    const boat = new Ship(1)

    // place a boat of length 1 for player 2
    p2.gameboard.placeShip(boat, [0, 0], "horizontal");

    // player 1 attacks that exact spot
    game.playRound([0, 0]);

    // player 1 should be the winner
    expect(game.winner).toBe(p1);
  });
});
