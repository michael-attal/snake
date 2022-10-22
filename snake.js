import Apple from "./apple.js"
import Direction from "./direction.js"

class Snake {
    position // NOTE: The x y position of the head of the snake
    velocity // NOTE: The x y number of pixel each seconds the snake move when a movement is made
    directions // NOTE: The directions the snake has moved (A FIFO queu with the size of the snake length property)
    initialLength
    length
    thick
    score

    constructor(x = 0, y = 0, vx = 2, vy = 2, initialLength = 200, thick = 20) {
        this.initialLength = initialLength;
        this.length = this.initialLength;
        this.thick = thick;
        this.score = 0;

        this.position = {
            x: x,
            y: y,
        };

        this.velocity = {
            x: vx,
            y: vy,
        }

        this.directions = [];

        for (let i = 0; i < initialLength; i++) {
            let newDirection = new Direction(this, "left");
            this.directions.push(newDirection);
            this.position.x = newDirection.position.x;
            this.position.y = newDirection.position.y;
        }
    }

    /**
     * 
     * @param {Apple} apple 
     * @returns {bool}
     */
    isEatingApple(apple, customSnakePosition) {
        let snakeX = this.position.x;
        let snakeY = this.position.y;

        if (customSnakePosition) {
            snakeX = customSnakePosition.x;
            snakeY = customSnakePosition.y;
        }

        let snakeMinX = snakeX;
        let snakeMaxX = snakeMinX + this.thick;
        let snakeMinY = snakeY;
        let snakeMaxY = snakeMinY + this.thick;

        let appleMinX = apple.position.x;
        let appleMaxX = appleMinX + apple.size;
        let appleMinY = apple.position.y;
        let appleMaxY = appleMinY + apple.size;

        if (
            (snakeMinX >= appleMinX && snakeMinX <= appleMaxX ||
                snakeMaxX >= appleMinX && snakeMaxX <= appleMaxX) &&
            (snakeMinY >= appleMinY && snakeMinY <= appleMaxY ||
                snakeMaxY >= appleMinY && snakeMaxY <= appleMaxY)
        ) {
            return true;
        }
        return false;
    }
}

export default Snake;