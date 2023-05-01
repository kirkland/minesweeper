import { useState } from "react";

import Row from "./Row";
import { BoardState } from "../board-state";

import type { Coordinate } from "../board-state";

export default function Board() {
  const rows = 9;
  const columns = 9;
  const bombs = 10;

  const revealCells = (cells: Coordinate[]) => {
    updateBoard((board: BoardState) => {
      let nextRevealed: Coordinate[] = [];
      const newBoard = board.clone();

      cells.forEach((coordinates) => {
        const [row, column] = coordinates;
        nextRevealed = nextRevealed.concat(newBoard.reveal(row, column));
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
    BoardState.createInitialBoard(rows, columns, bombs)
  );

  const onClick = (button: string, row: number, column: number) => {
    if (button === "left") {
      revealCells([[row, column]]);
    } else {
      updateBoard((board) => {
        return board.flag(row, column);
      });
    }
  };

  let message: string;

  if (board.gameLost()) {
    message = "Sorry, you lost.";
  } else if (board.gameWon()) {
    message = "Hurray, you won!";
  } else {
    message = "Best of luck!";
  }

  return (
    <>
      <p>{message}</p>
      <table className="board">
        <tbody>
          {board.rows.map((row, rowIndex) => (
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
