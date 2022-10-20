import GameGui from "./game-gui.js";

class GameController {
    /**  @type {GameGui} **/
    gameGui

    constructor(gameGui) {
        this.gameGui = gameGui;
    }

    addListerners() {
        this.document.body.addEventListener("keydown", e => {
            // TODO: Faire si e.key correspond a la key du direction map...
            this.handleDirection(e.key);
        });

        this.gameGui.htmlElements["startBtn"].addEventListener("click", e => {

        });
        this.gameGui.htmlElements["pauseBtn"].addEventListener("click", e => {

        });
    }

    startGame(gameStarted = false) {

    }

    pauseGame(gamePaused = false) {

    }

    handleDirection(key) {
        // TODO: Faire le mouvement du snake puis faire ces conditions pour voir si il touche une limite (voir ensuite si il se heurte à lui même):
        if (this.gameGui.snake.position.x + this.gameGui.snake.velocity.x > canvas.width || this.gameGui.snake.position.x + this.gameGui.snake.velocity.x < 0) {
            this.gameGui.printGameOver();
        } else if (this.gameGui.snake.position.y + this.gameGui.snake.velocity.y > canvas.height || this.gameGui.snake.position.y + this.gameGui.snake.velocity.y < 0) {
            this.gameGui.printGameOver();
        }

    }
}

export default GameController;