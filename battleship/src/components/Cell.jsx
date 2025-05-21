import { memo } from "react";
import "../styles/Cell.css";

const Cell = ({ hasShip, isHit, isShot, isPlayerBoard, onClick }) => {
  // Determine cell class based on state
  const getCellClass = () => {
    let cellClass = "cell";

    // For player's board, show ships
    if (isPlayerBoard) {
      if (hasShip) cellClass += " ship";
      if (isHit) cellClass += " hit";
      else if (isShot) cellClass += " miss";
    }
    // For computer's board, only show hits and misses
    else {
      if (isShot) {
        if (hasShip) cellClass += " hit";
        else cellClass += " miss";
      }
    }

    return cellClass;
  };

  return (
    <div
      className={getCellClass()}
      onClick={onClick}
      aria-label={hasShip ? "Ship" : "Water"}
    />
  );
};

// Memoize the Cell component to prevent unnecessary re-renders
export default memo(Cell);
