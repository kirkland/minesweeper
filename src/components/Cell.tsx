import { ReactElement } from "react";
import { CellData, Coordinate } from "../board-state";

type CellProps = {
  state: CellData;
  coordinate: Coordinate;
  onClick: (button: string, coordinate: Coordinate) => void;
};

export default function Cell(props: CellProps) {
  const { state, coordinate, onClick } = props;

  const clickHandler = (event: React.MouseEvent) => {
    event.preventDefault();

    const button = event.type === "click" ? "left" : "right";

    onClick(button, coordinate);
  };

  let cellClass = "";
  let content: ReactElement = <div />;

  if (state.flagged) {
    cellClass = "cell-flagged";
    content = <img src="/public/flag.png" />
  }

  if (state.revealed) {
    cellClass = "cell-revealed";
    content = <>{state.adjacentBombs}</>;

    if (state.bomb) {
      cellClass += " cell-revealed-bomb";
      content = <img src="/public/bomb.png" />
    }
  }

  return (
    <td
      className={`cell ${cellClass}`}
      onClick={clickHandler}
      onContextMenu={clickHandler}
    >
      <div className="content-holder">
        {content}
      </div>
    </td>
  );
}
