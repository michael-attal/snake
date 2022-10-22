import GameGui from "./game-gui.js";

const gameGui = new GameGui(
    document.getElementById("snake-gui"),
);

gameGui.printMenu();
gameGui.printGame();