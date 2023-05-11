import { MutableRefObject, ReactElement, useRef, useState } from "react";
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

  const cellRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  // TODO: What is correct type for this?
  const timerRef: MutableRefObject<any> = useRef(null);

  const [touching, setTouching] = useState(false);
  const [touchAction, setTouchAction] = useState("reveal");

  const clickHandler = (event: React.MouseEvent) => {
    event.preventDefault();

    if (touching) {
      return;
    }

    const action = event.type === "click" ? "reveal" : "flag";

    onClickCell(action, coordinate);
  };

  const startPressTimer = () => {
    timerRef.current = setTimeout(() => {
      setTouchAction("flag");
    }, 300);
  };

  const touchStartHandler = (event: React.TouchEvent) => {
    startPressTimer();
    setTouching(true);
  };

  const touchWithinCell = (event: React.TouchEvent) => {
    if (cellRef.current) {
      const touch = event.changedTouches[0];

      const touchX = touch.pageX;
      const touchY = touch.pageY;

      const cellLeftBoundary = cellRef.current.offsetLeft;
      const cellRightBoundary = cellLeftBoundary + cellRef.current.offsetWidth;
      const cellTopBoundary = cellRef.current.offsetTop;
      const cellBottomBoundary = cellTopBoundary + cellRef.current.offsetHeight;

      return !(
        cellLeftBoundary <= touchX &&
        touchX <= cellRightBoundary &&
        cellTopBoundary <= touchY &&
        touchY <= cellBottomBoundary
      );
    }
  };

  // If user has moved outside of the cell, do not take any actions on end touch
  const touchMoveHandler = (event: React.TouchEvent) => {
    if (!touchWithinCell(event)) {
      setTouching(false);
    }
  };

  const touchEndHandler = (event: React.TouchEvent) => {
    event.preventDefault();
    clearTimeout(timerRef.current);

    // touching will have been set to false if user dragged their finger outside of the cell
    if (touching) {
      setTouching(false);
      onClickCell(touchAction, coordinate);
    }

    setTouchAction("click");
  };

  let cellClass = `${styles.cell} `;
  let content: ReactElement = <div />;

  if (state.flagged) {
    cellClass += styles.cellFlagged;
    content = <img alt="flag" src={flag} />;
  } else if (state.revealed) {
    cellClass += `${styles.cellRevealed} `;
    content = <>{state.adjacentBombs}</>;

    if (state.bomb) {
      cellClass += styles.cellRevealedBomb;
      content = <img alt="bomb" src={bomb} />;
    }
  } else if (touching && touchAction === "flag") {
    cellClass += `${styles.cellFlagging}`
  }

  return (
    <div
      className={cellClass}
      onClick={clickHandler}
      onContextMenu={clickHandler}
      onTouchStart={touchStartHandler}
      onTouchEnd={touchEndHandler}
      onTouchMove={touchMoveHandler}
      ref={cellRef}
    >
      <div className={styles.contentHolder}>{content}</div>
    </div>
  );
}
