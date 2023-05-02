import { ReactElement } from "react";
import { CellData, Coordinate } from "../game-state";
import bomb from "../assets/images/bomb.png"
import flag from "../assets/images/flag.png"

type CellProps = {
  state: CellData;
  coordinate: Coordinate;
  onClickCell: (button: string, coordinate: Coordinate) => void;
};

export default function Cell(props: CellProps) {
  const { state, coordinate, onClickCell } = props;

  const clickHandler = (event: React.MouseEvent) => {
    event.preventDefault();

    const button = event.type === "click" ? "left" : "right";

    onClickCell(button, coordinate);
  };

  let cellClass = "";
  let content: ReactElement = <div />;

  if (state.flagged) {
    cellClass = "cell-flagged";
    content = <img src={flag} />
  }

  if (state.revealed) {
    cellClass = "cell-revealed";
    content = <>{state.adjacentBombs}</>;

    if (state.bomb) {
      cellClass += " cell-revealed-bomb";
      content = <img src={bomb} />
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
