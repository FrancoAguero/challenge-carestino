import React from "react";
import styles from "./Palette.module.css";

export default function Palette({
  paletteConfig,
  colors,
  handleChangeColor,
  handleShowPalette,
}) {
  return (
    <div
      className={`${styles.palette} ${paletteConfig.show ? styles.show : ""}`}
      style={{ top: `${paletteConfig.y}px`, left: `${paletteConfig.x}px` }}
      onMouseLeave={() =>
        handleShowPalette((prev) => ({ ...prev, show: false }))
      }
    >
      {colors.map((color) => (
        <div
          key={color}
          className={styles.colorOption}
          style={{ backgroundColor: color }}
          onClick={handleChangeColor(color)}
        />
      ))}
    </div>
  );
}
