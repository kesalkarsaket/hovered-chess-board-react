import "./styles.css";
import { useState } from "react";
export default function App({ boardSize = 8 }) {
  const [hoveredSq, setHoveredSq] = useState(null);
  const initialBoardSize = Array(boardSize)
    .fill(null)
    .map(() => Array(boardSize).fill(""));
  console.log(">>", initialBoardSize);
  const handleMouseEnter = (row, col) => {
    setHoveredSq([row, col]);
  };
  const handleMouseLeave = () => {
    setHoveredSq(null);
  };
  const getSquareColor = (row, col) => {
    if (!hoveredSq) return "";
    const [hoveredRow, hoveredCol] = hoveredSq;
    if (row === hoveredRow && col === hoveredCol) {
      return "lightBlue";
    }
    if (Math.abs(hoveredRow - row) === Math.abs(hoveredCol - col)) {
      return "darkBlue";
    }
  };
  return (
    <div className="chessboard">
      {initialBoardSize.map((row, rowIndex) =>
        row.map((_, colIndex) => {
          const isDark = (rowIndex + colIndex) % 2 === 1;
          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`square ${isDark ? "dark" : "light"}`}
              style={{ backgroundColor: getSquareColor(rowIndex, colIndex) }}
              onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
              onMouseLeave={handleMouseLeave}
            ></div>
          );
        })
      )}
    </div>
  );
}
