import Apple from "./apple.js"
import GameController from "./game-controller.js"
import Snake from "./snake.js"

class GameGui {
    /** @type {HTMLElement} */
    elementWhereToInsertGui
    gameController
    /** @type {HTMLCanvasElement} */
    canvas
    /** @type {CanvasRenderingContext2D} */
    ctx
    /** @type {Snake} */
    snake
    /** @type {Apple} */
    apple
    appleImg
    /** @type {Map<String,HTMLElement} */
    widthGame
    heightGame

    htmlElements = new Map([
        ["startBtn", null],
        ["pauseBtn", null],
        ["scoreDiv", null],
    ])


    constructor(elementWhereToInsertGui, initialSnakeLength = 40, thickSnake = 20, appleImg = 'assets/images/apple.png', widthGame = 1000, heightGame = 600, vxSnake = 2, vySnake = 2) {
        this.elementWhereToInsertGui = elementWhereToInsertGui;
        this.widthGame = widthGame;
        this.heightGame = heightGame;

        this.snake = this.initSnake(vxSnake, vySnake, initialSnakeLength, thickSnake);
        this.apple = this.initApple(this.snake);

        this.appleImg = new Image(this.apple.size, this.apple.size);
        this.appleImg.src = appleImg;

        this.gameController = new GameController(this);
    }

    initSnake(vxSnake, vySnake, initialSnakeLength, thickSnake) {
        return new Snake(this.widthGame / 2, this.heightGame / 2, vxSnake, vySnake, initialSnakeLength, thickSnake);
    }

    initApple(snake) {
        let apple = new Apple(0, 0, snake.thick);
        apple.generateNewRandomPosition(this.widthGame, this.heightGame, snake);
        return apple;
    }

    printMenu() {
        const title = document.createElement("h1");
        title.textContent = "Snake Game";
        title.id = "title";

        const startBtn = document.createElement("button");
        startBtn.textContent = "Start game";
        startBtn.id = "start-btn";

        const pauseBtn = document.createElement("button");
        pauseBtn.textContent = "Pause";
        pauseBtn.id = "pause-btn";
        pauseBtn.hidden = true; // NOTE: Hide until game is not started

        const scoreDiv = document.createElement("div");
        scoreDiv.textContent = "Score: ";
        scoreDiv.id = "score";
        const scoreSpan = document.createElement("span");
        scoreSpan.id = "score-result";
        scoreSpan.textContent = "0";
        scoreDiv.appendChild(scoreSpan);

        this.htmlElements.set("startBtn", startBtn);
        this.htmlElements.set("pauseBtn", pauseBtn);
        this.htmlElements.set("scoreSpan", scoreSpan);
        this.htmlElements.set("scoreDiv", scoreDiv);

        const rowMenuDiv = document.createElement("div");
        rowMenuDiv.id = "row-menu";

        this.htmlElements.forEach(elmt => {
            // NOTE: Don't add score-result span which is already in score div element
            if (elmt.id != "score-result") {
                rowMenuDiv.appendChild(elmt);
            }
        });

        this.elementWhereToInsertGui.appendChild(title);
        this.elementWhereToInsertGui.appendChild(rowMenuDiv);

        this.gameController.addListerners();
    }

    printGame() {
        // NOTE: Create a canvas for the whole game and put inside the snake and apple
        this.canvas = document.createElement('canvas');
        this.canvas.id = "main-canvas";
        this.canvas.width = this.widthGame;
        this.canvas.height = this.heightGame;
        this.ctx = this.canvas.getContext('2d');

        // NOTE: Print every part of the snake into the canvas
        this.printSnake();

        // NOTE: Print the apple into the canvas
        this.appleImg.onload = () => {
            this.printApple();
            // NOTE: Only when apple is loaded, then insert the canvas to the page
            this.elementWhereToInsertGui.appendChild(this.canvas);
        };
    }

    printSnake(printOnlyLastDirection = false) {
        // NOTE Create each part of the snake depending on his directions
        let i = 0;
        if (printOnlyLastDirection) {
            i = this.snake.directions.length - 2; // NOTE: Start -2 to allow print a different color for the head of the snake
        }

        for (i; i < this.snake.directions.length; i++) {
            if (i === this.snake.directions.length - 1) {
                // NOTE: Create the head of the snake
                this.ctx.fillStyle = "blue";
            } else {
                this.ctx.fillStyle = "green";
            }
            this.ctx.fillRect(this.snake.directions[i].position.x, this.snake.directions[i].position.y, this.snake.thick, this.snake.thick);
        }
    }

    clearRectOfSnake(clearOnlyFirstDirection = false) {
        if (clearOnlyFirstDirection) {
            // NOTE: Clear only first direction for performance (instead of the whole snake)
            this.ctx.clearRect(this.snake.directions[0].position.x, this.snake.directions[0].position.y, this.snake.thick, this.snake.thick);
        } else {
            // NOTE: Clear the whole snake
            for (let i = 0; i < this.snake.directions.length; i++) {
                this.ctx.clearRect(this.snake.directions[i].position.x, this.snake.directions[i].position.y, this.snake.thick, this.snake.thick);
            }
        }
    }

    printApple() {
        this.ctx.drawImage(this.appleImg, this.apple.position.x, this.apple.position.y, this.apple.size, this.apple.size);
    }

    clearRectOfApple() {
        this.ctx.clearRect(this.apple.position.x, this.apple.position.y, this.apple.size, this.apple.size);
    }

    printGameOver() {
        alert("Game Over! Your score : " + this.snake.score);
    }

}

export default GameGui;