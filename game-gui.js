import Apple from "./apple.js"
import GameController from "./game-controller.js"
import Snake from "./snake.js"
import Direction from "./direction.js"

class GameGui {
    /** @type {HTMLElement} */
    elementWhereToInsertGui
    gameController
    /** @type {HTMLCanvasElement} */
    mainCanvas
    /** @type {Snake} */
    snake
    /** @type {HTMLCanvasElement} */
    snakeCanvas
    /** @type {Apple} */
    apple
    /** @type {HTMLCanvasElement} */
    appleCanvas
    appleImg
    /** @type {Direction} */
    direction
    /** @type {Map<String,HTMLElement} */
    widthGame
    heightGame

    htmlElements = new Map([
        ["startBtn", null],
        ["pauseBtn", null],
        ["scoreDiv", null],
    ])


    constructor(elementWhereToInsertGui, snake, apple, appleImg, direction, widthGame = 1000, heightGame = 600) {
        this.elementWhereToInsertGui = elementWhereToInsertGui;
        this.gameController = new GameController(this);
        this.snake = snake;
        this.apple = apple;
        this.direction = direction;
        this.widthGame = widthGame;
        this.heightGame = heightGame;
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

        const scoreDiv = document.createElement("div");
        scoreDiv.textContent = "Score: ";
        scoreDiv.id = "score";
        const scoreSpan = document.createElement("span");
        scoreSpan.id = "score-result";
        scoreSpan.textContent = "0";
        scoreDiv.appendChild(scoreSpan);

        this.htmlElements.set("startBtn", startBtn);
        this.htmlElements.set("pauseBtn", pauseBtn);
        this.htmlElements.set("scoreDiv", scoreDiv);

        const rowMenuDiv = document.createElement("div");
        rowMenuDiv.id = "row-menu";

        this.htmlElements.forEach(elmt => {
            rowMenuDiv.appendChild(elmt)
        });

        this.elementWhereToInsertGui.appendChild(title);
        this.elementWhereToInsertGui.appendChild(rowMenuDiv);
    }

    printGame() {
        // NOTE: Create a canvas for the whole game and put inside the snake and apple canvas
        this.mainCanvas = document.createElement('canvas');
        this.mainCanvas.id = "main-canvas";
        this.mainCanvas.width = this.widthGame;
        this.mainCanvas.height = this.heightGame;

        // NOTE: Create a canvas for the snake and display it
        this.printSnake();

        // NOTE: Create a canvas for the apple and display it
        this.printApple();

        this.elementWhereToInsertGui.appendChild(this.mainCanvas);
    }

    printSnake() {
        if (!this.snakeCanvas) {
            this.snakeCanvas = document.createElement('canvas');
        }
        const snakeCtx = this.snakeCanvas.getContext('2d');
        const mainCtx = this.mainCanvas.getContext('2d');

        // NOTE Create snack with length // TODO: Add rect when snake is moving and remove the old last move rect 
        snakeCtx.beginPath();
        snakeCtx.rect(0, 0, this.snake.length, 20);
        snakeCtx.fillStyle = "green";
        snakeCtx.fill();
        snakeCtx.closePath();

        mainCtx.drawImage(this.snakeCanvas, this.mainCanvas.width / 2, this.mainCanvas.height / 2);
    }

    printApple() {
        if (!this.appleCanvas) {
            this.appleCanvas = document.createElement('canvas');
        }
        const appleCtx = this.appleCanvas.getContext('2d');
        const mainCtx = this.mainCanvas.getContext('2d');

        mainCtx.drawImage(this.appleCanvas, this.mainCanvas.width / 2, this.mainCanvas.height / 2);
    }
}

export default GameGui;