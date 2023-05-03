import { ReactElement } from "react";
import { CellData, Coordinate } from "../game-state";
import bomb from "../assets/images/bomb.png";
import flag from "../assets/images/flag.png";
import styles from "./Cell.module.css";

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

  let cellClass = `${styles.cell} `;
  let content: ReactElement = <div />;

  if (state.flagged) {
    cellClass += styles.cellFlagged;
    content = <img src={flag} />;
  }

  if (state.revealed) {
    cellClass += `${styles.cellRevealed} `;
    content = <>{state.adjacentBombs}</>;

    if (state.bomb) {
      cellClass += styles.cellRevealedBomb;
      content = <img src={bomb} />;
    }
  }

  return (
    <div
      className={cellClass}
      onClick={clickHandler}
      onContextMenu={clickHandler}
    >
      <div className={styles.contentHolder}>{content}</div>
    </div>
  );
}
