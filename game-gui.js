class GameGui {
    gameController
    snake
    apple
    direction
    startBtn
    pauseBtn
    scoreDiv

    constructor(gameController, snake, apple, direction) {

    }

    printMenu() {
        const title = document.createElement("h1");
        title.textContent = "Snake Game";

        this.startBtn = document.createElement("button");
        this.startBtn.textContent = "Start";

        this.pauseBtn = document.createElement("button");
        this.pauseBtn.textContent = "Pause";

        this.scoreDiv = document.createElement("div");
        this.scoreDiv.textContent = "0";
    }


}

export default GameGui;