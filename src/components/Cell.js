export default function Cell(props) {
  const { state, row, column, onClick } = props;

  const clickHandler = (event) => {
    event.preventDefault();

    const button = event.type === "click" ? "left" : "right";

    onClick(button, row, column);
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
