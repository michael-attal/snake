import Direction from "./direction.js";
import GameGui from "./game-gui.js";

class GameController {
    static keyToDirection = new Map([
        ["ArrowLeft", "left"],
        ["ArrowRight", "right"],
        ["ArrowUp", "up"],
        ["ArrowDown", "down"],
    ]);

    gameStarted
    gamePaused
    intervalSnake
    lastKey


    /**  @type {GameGui} **/
    gameGui

    constructor(gameGui) {
        this.gameGui = gameGui;
        this.gameStarted = false;
        this.gamePaused = false;
    }

    addListerners() {
        document.body.addEventListener("keydown", e => {
            if (this.gameStarted && this.gamePaused === false) {
                if (GameController.keyToDirection.has(e.key) && this.lastKey != Direction.oppositeDirections.get(GameController.keyToDirection.get(e.key))) {
                    this.lastKey = GameController.keyToDirection.get(e.key);
                    if (this.intervalSnake) {
                        clearInterval(this.intervalSnake);
                    }
                    this.intervalSnake = setInterval(() => {
                        this.handleDirection(GameController.keyToDirection.get(e.key));
                    }, 10);
                }
            }
        });

        this.gameGui.htmlElements.get("startBtn").addEventListener("click", e => {
            this.startGame();
        });
        this.gameGui.htmlElements.get("pauseBtn").addEventListener("click", e => {
            this.pauseGame();
        });
    }

    startGame() {
        if (this.gameStarted === false) {
            this.gameGui.htmlElements.get("startBtn").textContent = "Restart game";
            this.gameGui.htmlElements.get("pauseBtn").hidden = false;


            const initialDirection = this.gameGui.snake.directions[this.gameGui.snake.directions.length - 1].directionName;
            this.lastKey = initialDirection;
            this.intervalSnake = setInterval(() => {
                this.handleDirection(initialDirection);
            }, 10);
        } else {
            clearInterval(this.intervalSnake);
            this.gameGui.htmlElements.get("startBtn").textContent = "Start game";
            this.gameGui.htmlElements.get("pauseBtn").hidden = true;

            this.gameGui.clearRectOfSnake();
            this.gameGui.clearRectOfApple();

            this.gameGui.snake = this.gameGui.initSnake(this.gameGui.snake.velocity.x, this.gameGui.snake.velocity.y, this.gameGui.snake.initialLength, this.gameGui.snake.thick)
            this.gameGui.apple = this.gameGui.initApple(this.gameGui.snake);
            this.gameGui.printSnake();
            this.gameGui.printApple();
        }

        this.gameStarted = !this.gameStarted;
    }

    pauseGame() {
        // NOTE: To allow pause or unpause the game we must be sure that a game is already started.
        if (this.gameStarted) {
            if (this.gamePaused) {
                this.intervalSnake = setInterval(() => {
                    this.handleDirection(this.lastKey);
                }, 10);
                this.gameGui.htmlElements.get("pauseBtn").textContent = "Pause";
            } else {
                clearInterval(this.intervalSnake);
                this.gameGui.htmlElements.get("pauseBtn").textContent = "Continue";
            }
            this.gamePaused = !this.gamePaused;
        }
    }

    handleDirection(key) {
        let displayGameOver = false;
        // NOTE: Update canvas with only to the new direction and clear only the first position of snack - NOT USED ANYMORE
        // const clearOnlyFirstDirection = true;
        // this.gameGui.clearRectOfSnake(clearOnlyFirstDirection);
        this.gameGui.ctx.clearRect(0, 0, this.gameGui.widthGame, this.gameGui.heightGame); // NOTE: #RoiSuggestion As Roi said in big game it's better to clean the whole screen and draw every object for each frame instead of calculate each object position and then clean these positions.
        this.gameGui.printApple(); // NOTE: We have to print again the apple if we clear the whole canvas.

        // const printOnlyLastDirection = true;
        // this.gameGui.printSnake(printOnlyLastDirection); // NOTE: Because we are not more only clear the last position we should also print the whole snake and not just the head.
        this.gameGui.printSnake();

        let newDirection = new Direction(this.gameGui.snake, key);

        if (newDirection.isValidPosition(this.gameGui.widthGame, this.gameGui.heightGame)) {
            if (newDirection.directionName != Direction.oppositeDirections.get(this.gameGui.snake.directions[this.gameGui.snake.directions.length - 1].directionName)) {

                if (newDirection.isHittingHimSelf(this.gameGui.snake.directions) === false) {
                    this.gameGui.snake.position.x = newDirection.position.x;
                    this.gameGui.snake.position.y = newDirection.position.y;
                    this.gameGui.snake.directions.shift();
                    this.gameGui.snake.directions.push(newDirection);

                    // NOTE: If it hurt a apple, it eat it and get bigger from the head of the snake
                    if (this.gameGui.snake.isEatingApple(this.gameGui.apple)) {
                        this.gameGui.snake.score += 1;
                        this.gameGui.htmlElements.get("scoreSpan").textContent = this.gameGui.snake.score;

                        // NOTE: Add the size of the apple to the front of the snake (it take the size where the apple was)
                        for (let i = 0; i < Math.floor(this.gameGui.apple.size / this.gameGui.snake.velocity.x); i++) {
                            this.gameGui.snake.length += 1;
                            let newDirectionApple = new Direction(this.gameGui.snake, key);
                            this.gameGui.snake.position.x = newDirectionApple.position.x;
                            this.gameGui.snake.position.y = newDirectionApple.position.y;
                            this.gameGui.snake.directions.push(newDirectionApple);
                            // this.gameGui.printSnake(printOnlyLastDirection, true); // NOTE: Commented for same reason as previously said in note #RoiSuggestion
                            this.gameGui.ctx.clearRect(0, 0, this.gameGui.widthGame, this.gameGui.heightGame);
                            this.gameGui.printSnake();
                        }

                        // this.gameGui.clearRectOfApple(); // NOTE:  Commented for same reason as previously said in note #RoiSuggestion
                        // NOTE: Generate and print a new apple.
                        this.gameGui.apple.generateNewRandomPosition(this.gameGui.widthGame, this.gameGui.heightGame, this.gameGui.snake);
                        this.gameGui.printApple();
                    }
                    return;
                } else {
                    displayGameOver = true;
                }
            } else {
                // NOTE: Just continue to the current direction if a opposite key was finded
                // TODO: Maybe to it here instead of the addEventListener of keydown ?

            }
        } else {
            displayGameOver = true;
        }

        if (displayGameOver) {
            clearInterval(this.intervalSnake);
            this.gameGui.printGameOver();
        }


    }

}

export default GameController;