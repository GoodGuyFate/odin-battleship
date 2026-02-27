import Ship from '../modules/ship.js';

describe("Ship class", () => {
    let cruiser;

    beforeEach(() => {
        cruiser = new Ship(3)
    })

    test("should have a length", () => {
        expect(cruiser.length).toBe(3)
    })

    test("should increase hits when hit() is called", () => {
        cruiser.hit()
        expect(cruiser.hits).toBe(1)
    })

    test("should sink when hits equal length", () => {
        cruiser.hit()
        cruiser.hit()
        cruiser.hit()
        expect(cruiser.isSunk()).toBe(true)
    })

    test("should NOT be sunk initially", () => {
        expect(cruiser.isSunk()).toBe(false)
    })
})