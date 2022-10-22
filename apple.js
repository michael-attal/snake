import Snake from "./snake.js"

class Apple {
    position
    size

    constructor(x = 0, y = 0, size = 40) {
        this.position = {
            x: x,
            y: y,
        }

        this.size = size;
    }

    /**
     * 
     * @param {Number} limitX 
     * @param {Number} limitY 
     * @param {Snake} snake 
     */
    generateNewRandomPosition(limitX, limitY, snake) {
        let validPosition = false;
        while (validPosition === false) {
            validPosition = true;
            this.position.x = Math.floor(Math.random() * (limitX - this.size)); // NOTE: Spawn the apple in the limit of the maze width and height
            this.position.y = Math.floor(Math.random() * (limitY - this.size));
            // NOTE: Be careful to not spawn the apple on the snake
            for (let i = 0; i < snake.directions.length; i++) {
                if (snake.isEatingApple(this, snake.directions[i].position)) {
                    validPosition = false;
                }

            }
        }
    }
}

export default Apple;