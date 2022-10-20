class Snake {
    position // NOTE: The x y position of the canvas whe the snake is placed
    velocity // NOTE: The x y number of pixel each seconds the snake move when a movement is made
    length
    thick

    constructor(length = 100, thick = 4) {
        this.length = length;
        this.thick = thick;
        // NOTE Put snake position into the middle (see later how to do that, if we do it here or where the canvas is created).
        this.position = {
            x: 0,
            y: 0,
        }
        this.velocity = {
            x: 5,
            y: 5,
        }
    }
}

export default Snake;