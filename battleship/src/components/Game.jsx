import { useState } from "react";
import Board from "./Board";
import GameControls from "./GameControls";
import {
  initializeBoard,
  placeShipsRandomly,
  checkGameOver,
} from "../utils/gameLogic";
import "../styles/Game.css";

const BOARD_SIZE = 10;
const SHIPS = [
  { name: "Carrier", size: 5 },
  { name: "Battleship", size: 4 },
  { name: "Cruiser", size: 3 },
  { name: "Submarine", size: 3 },
  { name: "Destroyer", size: 2 },
];

const Game = () => {
  // Player board state
  const [playerBoard, setPlayerBoard] = useState(() =>
    placeShipsRandomly(initializeBoard(BOARD_SIZE), SHIPS)
  );

  // Computer board state
  const [computerBoard, setComputerBoard] = useState(() =>
    placeShipsRandomly(initializeBoard(BOARD_SIZE), SHIPS)
  );

  // Game state
  const [gameState, setGameState] = useState({
    isPlayerTurn: true,
    gameOver: false,
    winner: null,
    message: "Your turn! Click on the computer's board to attack.",
  });

  // Player shots and computer shots
  const [playerShots, setPlayerShots] = useState(
    Array(BOARD_SIZE)
      .fill()
      .map(() => Array(BOARD_SIZE).fill(false))
  );
  const [computerShots, setComputerShots] = useState(
    Array(BOARD_SIZE)
      .fill()
      .map(() => Array(BOARD_SIZE).fill(false))
  );

  // Handle player's attack
  const handlePlayerAttack = (row, col) => {
    if (
      !gameState.isPlayerTurn ||
      gameState.gameOver ||
      playerShots[row][col]
    ) {
      return;
    }

    // Update player shots
    const newPlayerShots = [...playerShots];
    newPlayerShots[row][col] = true;
    setPlayerShots(newPlayerShots);

    // Check if hit
    const isHit = computerBoard[row][col].hasShip;

    // Update computer board
    const newComputerBoard = [...computerBoard];
    if (isHit) {
      newComputerBoard[row][col] = {
        ...newComputerBoard[row][col],
        isHit: true,
      };
      setComputerBoard(newComputerBoard);
    }

    // Check if game is over
    const playerWon = checkGameOver(newComputerBoard);
    if (playerWon) {
      setGameState({
        ...gameState,
        gameOver: true,
        winner: "player",
        message: "You won! All enemy ships have been sunk.",
      });
      return;
    }

    // Switch turn to computer
    setGameState({
      ...gameState,
      isPlayerTurn: false,
      message: "Computer is thinking...",
    });

    // Computer's turn (with a small delay)
    setTimeout(computerAttack, 1000);
  };

  // Computer's attack logic
  const computerAttack = () => {
    if (gameState.gameOver) {
      return;
    }

    // Find a valid move (not already shot)
    let row, col;
    do {
      row = Math.floor(Math.random() * BOARD_SIZE);
      col = Math.floor(Math.random() * BOARD_SIZE);
    } while (computerShots[row][col]);

    // Update computer shots
    const newComputerShots = [...computerShots];
    newComputerShots[row][col] = true;
    setComputerShots(newComputerShots);

    // Check if hit
    const isHit = playerBoard[row][col].hasShip;

    // Update player board
    const newPlayerBoard = [...playerBoard];
    if (isHit) {
      newPlayerBoard[row][col] = { ...newPlayerBoard[row][col], isHit: true };
      setPlayerBoard(newPlayerBoard);
    }

    // Check if game is over
    const computerWon = checkGameOver(newPlayerBoard);
    if (computerWon) {
      setGameState({
        ...gameState,
        gameOver: true,
        winner: "computer",
        message: "Computer won! All your ships have been sunk.",
      });
      return;
    }

    // Switch turn back to player
    setGameState({
      ...gameState,
      isPlayerTurn: true,
      message: "Your turn! Click on the computer's board to attack.",
    });
  };

  // Reset game
  const resetGame = () => {
    setPlayerBoard(placeShipsRandomly(initializeBoard(BOARD_SIZE), SHIPS));
    setComputerBoard(placeShipsRandomly(initializeBoard(BOARD_SIZE), SHIPS));
    setPlayerShots(
      Array(BOARD_SIZE)
        .fill()
        .map(() => Array(BOARD_SIZE).fill(false))
    );
    setComputerShots(
      Array(BOARD_SIZE)
        .fill()
        .map(() => Array(BOARD_SIZE).fill(false))
    );
    setGameState({
      isPlayerTurn: true,
      gameOver: false,
      winner: null,
      message: "Your turn! Click on the computer's board to attack.",
    });
  };

  return (
    <div className="game-container">
      <h1>Battleship</h1>
      <div className="message">{gameState.message}</div>

      <div className="boards-container">
        <div className="board-wrapper">
          <h2>Your Board</h2>
          <Board
            board={playerBoard}
            shots={computerShots}
            isPlayerBoard={true}
            onCellClick={() => {}} // No action when clicking own board
          />
        </div>

        <div className="board-wrapper">
          <h2>Computer's Board</h2>
          <Board
            board={computerBoard}
            shots={playerShots}
            isPlayerBoard={false}
            onCellClick={handlePlayerAttack}
            disabled={!gameState.isPlayerTurn || gameState.gameOver}
          />
        </div>
      </div>

      <GameControls
        gameOver={gameState.gameOver}
        winner={gameState.winner}
        onReset={resetGame}
      />
    </div>
  );
};

export default Game;
