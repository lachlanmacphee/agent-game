import { memo } from "react";
import "../styles/GameControls.css";

const GameControls = ({ gameOver, winner, onReset }) => {
  return (
    <div className="game-controls">
      {gameOver && (
        <div className="game-over">
          <h2>Game Over!</h2>
          <p>
            {winner === "player"
              ? "Congratulations! You won!"
              : "Computer won. Better luck next time!"}
          </p>
        </div>
      )}

      <button className="reset-button" onClick={onReset}>
        {gameOver ? "Play Again" : "Reset Game"}
      </button>

      <div className="game-info">
        <h3>How to Play:</h3>
        <ul>
          <li>Click on the computer's board to attack</li>
          <li>Sink all enemy ships to win</li>
          <li>Ships are placed randomly</li>
        </ul>
      </div>
    </div>
  );
};

// Memoize the GameControls component to prevent unnecessary re-renders
export default memo(GameControls);
