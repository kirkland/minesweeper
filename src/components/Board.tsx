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

import type { BoardState, Coordinate } from "../board-state";

export default function Board() {
  const rows = 9;
  const columns = 9;
  const bombs = 10;

  const revealCells = (cells: Coordinate[]) => {
    updateBoard((board: BoardState) => {
      let nextRevealed: Coordinate[] = [];
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

  const onClick = (button: string, row: number, column: number) => {
    if (button === "left") {
      revealCells([[row, column]]);
    } else {
      updateBoard((board) => {
        return flag(board, row, column);
      });
    }
  };

  let message: string;

  if (gameLost(board)) {
    message = "Sorry, you lost.";
  } else if (gameWon(board)) {
    message = "Hurray, you won!";
  } else {
    message = "Best of luck!";
  }

  return (
    <>
      <p>{message}</p>
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
