import { CellData, Coordinate } from "../board-state";

type CellProps = {
  state: CellData;
  rowIndex: number;
  columnIndex: number;
  onClick: Function
};

export default function Cell(props: CellProps) {
  const { state, rowIndex: row, columnIndex: column, onClick } = props;

  const clickHandler = (event: React.MouseEvent) => {
    event.preventDefault();

    const button = event.type === "click" ? "left" : "right";

    onClick(button, new Coordinate(row, column));
  };

  let cellClass = "";

  if (state.flagged) {
    cellClass = "cell-flagged";
  }

  if (state.revealed) {
    cellClass = "cell-revealed";

    if (state.bomb) {
      cellClass += " cell-revealed-bomb";
    }
  }

  return (
    <td
      className={`cell ${cellClass}`}
      onClick={clickHandler}
      onContextMenu={clickHandler}
    >
      <div className="content-holder">
        {state.revealed && state.adjacentBombs}
      </div>
    </td>
  );
}
