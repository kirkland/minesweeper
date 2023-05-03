import { useState } from "react";

import Row from "./Row";
import styles from "./Board.module.css";
import { GameState, Coordinate } from "../game-state";

export default function Board() {
  const rows = 9;
  const columns = 9;
  const bombs = 10;

  const revealCells = (cells: Coordinate[]) => {
    updateBoard((board: GameState) => {
      let nextRevealed: Coordinate[] = [];
      const newBoard = board.clone();

      cells.forEach((coordinate) => {
        nextRevealed = nextRevealed.concat(newBoard.reveal(coordinate));
      });

      if (nextRevealed.length > 0) {
        setTimeout(() => {
          revealCells(nextRevealed);
        }, 100);
      }

      return newBoard;
    });
  };

  const startNewGame = () => {
    updateBoard(GameState.createInitialBoard(rows, columns, bombs));
  };

  const [board, updateBoard] = useState(
    GameState.createInitialBoard(rows, columns, bombs)
  );

  const onClickCell = (button: string, coordinate: Coordinate) => {
    if (board.state() !== "in progress") {
      return;
    }

    if (button === "left") {
      revealCells([coordinate]);
    } else {
      updateBoard((board) => {
        return board.flag(coordinate);
      });
    }
  };

  let message: string;

  if (board.state() === "lost") {
    message = "Sorry, you lost.";
  } else if (board.state() === "won") {
    message = "Hurray, you won!";
  } else {
    message = "Best of luck!";
  }

  return (
    <>
      <p>{message}</p>
      <div id="game-status">
        <div id="bombs-remaining-container">
          <div id="bombs-remaining">{board.bombsRemaining()}</div>
        </div>
        <div id="new-game-container">
          <button id="new-game" onClick={startNewGame}>
            New Game
          </button>
        </div>
      </div>

      <div className={styles.board}>
        {board.rows.map((row, rowIndex) => (
          <Row
            row={row}
            key={rowIndex}
            rowIndex={rowIndex}
            onClickCell={onClickCell}
          />
        ))}
      </div>
    </>
  );
}
