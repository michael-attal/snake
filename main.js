import GameGui from "./game-gui.js";
import Snake from "./snake.js";
import Apple from "./apple.js";
import Direction from "./direction.js";


const gameGui = new GameGui(
    document.getElementById("snake-gui"),
    new Snake(),
    new Apple(),
    "assets/images/apple.png",
    new Direction(),
);

gameGui.printMenu();
gameGui.printGame();