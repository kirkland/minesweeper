import { useState } from "react";
import "./App.css";

function Cell(props) {
  const { state } = props;

  return <div className={`cell cell-${state}`} />;
}

function Row(props) {
  const { row } = props;

  return (
    <div className="row">
      {row.map((cell, index) => (
        <Cell state={cell} key={index} />
      ))}
    </div>
  );
}

function App() {
  const rows = 10;
  const columns = 10;

  let board = new Array(10);

  for (let row = 0; row < rows; row++) {
    board[row] = new Array(columns).fill("unknown");
  }

  return (
    <div className="board">
      {board.map((row, index) => (
        <Row row={row} key={index} />
      ))}
    </div>
  );
}

export default App;
