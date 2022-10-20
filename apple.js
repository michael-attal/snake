class Apple {
    position

    constructor(initialPosition) {
        if (initialPosition) {
            this.position = initialPosition
        } else {
            this.position = {
                x: Math.random(), // TODO: Get the limit of the game and also the initial emplacement of the snake to avoid conflict
                y: Math.random(),
            }
        }

    }
}

export default Apple;