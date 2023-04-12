import { useState } from "react";

import Row from "./Row";
import {
  cloneBoard,
  createInitialBoard,
  flag,
  gameLost,
  gameWon,
  reveal,
} from "../board-state";

export default function Board(props) {
  const rows = 9;
  const columns = 9;
  const bombs = 10;

  const revealCells = (cells) => {
    updateBoard((board) => {
      let nextRevealed = [];
      const newBoard = cloneBoard(board);

      cells.forEach((coordinates) => {
        const [row, column] = coordinates;
        nextRevealed = nextRevealed.concat(reveal(newBoard, row, column));
      });

      if (nextRevealed.length > 0) {
        setTimeout(() => {
          revealCells(nextRevealed);
        }, 100);
      }

      return newBoard;
    });
  };

  const [board, updateBoard] = useState(
    createInitialBoard(rows, columns, bombs)
  );

  const onClick = (button, row, column) => {
    if (button === "left") {
      revealCells([[row, column]]);
    } else {
      updateBoard((board) => {
        return flag(board, row, column);
      });
    }
  };

  return (
    <>
      {gameLost(board) && <p>Sorry, you lost.</p>}
      {gameWon(board) && <p>Hurray, you won!</p>}
      <table className="board">
        <tbody>
          {board.map((row, rowIndex) => (
            <Row
              row={row}
              key={rowIndex}
              rowIndex={rowIndex}
              onClick={onClick}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}
