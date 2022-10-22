import Snake from "./snake.js"

class Direction {

    static oppositeDirections = new Map([
        ["left", "right"],
        ["right", "left"],
        ["up", "down"],
        ["down", "up"],
    ]);

    position
    velocity
    directionName

    left
    right
    up
    down
    /** @type {Snake} */
    snake

    constructor(snake, directionName) {
        this.snake = snake;
        this.directionName = directionName;

        this.velocity = {
            x: this.snake.velocity.x,
            y: this.snake.velocity.y,
        };

        this.left = {
            x: -this.velocity.x,
            y: 0,
        };

        this.right = {
            x: this.velocity.x,
            y: 0,
        };

        this.up = {
            x: 0,
            y: -this.velocity.y,
        };

        this.down = {
            x: 0,
            y: this.velocity.y,
        };

        this.position = {
            x: this[directionName].x += this.snake.position.x,
            y: this[directionName].y += this.snake.position.y,
        }
    }

    isValidPosition(limitX, limitY) {
        // NOTE: Check if the snake hits a horizontal wall
        if (this.position.x + this.velocity.x > limitX || this.position.x + this.velocity.x < 0) {
            return false;
        } else if (this.position.y + this.velocity.y > limitY || this.position.y + this.velocity.y < 0) { // NOTE: Check if the snake hits a vertical wall
            return false;
        }
        return true;
    }

    /**
     * 
     * @param {Array<Direction>} previousDirections 
     * @returns {bool}
     */
    isHittingHimSelf(previousDirections) {
        for (let i = 0; i < previousDirections.length; i++) {
            if (previousDirections[i].position.x === this.position.x && previousDirections[i].position.y === this.position.y) {
                return true;
            }
        }
        return false;
    }
}

export default Direction;
