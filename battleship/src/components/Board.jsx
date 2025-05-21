import { memo } from "react";
import Cell from "./Cell";
import "../styles/Board.css";

const Board = ({ board, shots, isPlayerBoard, onCellClick, disabled }) => {
  return (
    <div className={`board ${disabled ? "disabled" : ""}`}>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              hasShip={cell.hasShip}
              isHit={cell.isHit}
              isShot={shots[rowIndex][colIndex]}
              isPlayerBoard={isPlayerBoard}
              onClick={() => onCellClick(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

// Memoize the Board component to prevent unnecessary re-renders
export default memo(Board);
