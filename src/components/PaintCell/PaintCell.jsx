import styles from "./PaintCell.module.css";

export default function PaintCell({
  index,
  cell,
  handlePaintCell,
  handlePaintDrag,
}) {
  return (
    <div
      className={styles.cell}
      style={{
        backgroundColor: cell.isActive ? cell.color : "#fff",
      }}
      onClick={() => handlePaintCell(index)}
      onMouseEnter={() => handlePaintDrag(index)}
    />
  );
}
