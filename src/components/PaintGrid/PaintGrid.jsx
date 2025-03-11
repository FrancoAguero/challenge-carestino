import { useState } from "react";

import PaintCell from "../PaintCell/PaintCell";
import styles from "./PaintGrid.module.css";
import Palette from "../Palette/Palette";

export default function PaintGrid() {
  const colors = [
    "rgb(255 0 255)",
    "rgb(255 117 120)",
    "rgb(135 111 255)",
    "rgb(252 255 106)",
    "rgb(74 255 255)",
  ];
  const cellSize = window.innerWidth / 100;
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [paletteConfig, setPaletteConfig] = useState({
    show: false,
    x: 0,
    y: 0,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [cells, setCells] = useState(
    Array(Math.floor(window.innerHeight / cellSize) * 100).fill({
      isActive: false,
      color: null,
    })
  );

  const handleChangeColor = (color) => () => {
    setSelectedColor(color);
    setPaletteConfig((prev) => ({ ...prev, show: false }));
  };

  const handlePaintCell = (index) => {
    setCells((prevCells) => {
      const newCells = [...prevCells];
      newCells[index] = {
        isActive:
          newCells[index].isActive && !newCells[index].color === selectedColor
            ? !newCells[index].isActive
            : true,
        color:
          newCells[index].isActive && newCells[index].color === selectedColor
            ? null
            : selectedColor,
      };
      return newCells;
    });
  };

  const handlePaintDrag = (index) => {
    if (isDragging) {
      setCells((prevCells) => {
        const newCells = [...prevCells];
        newCells[index] = {
          isActive: true,
          color: selectedColor,
        };
        return newCells;
      });
    }
  };

  const handleOpenPalette = (e) => {
    e.preventDefault();
    setPaletteConfig({
      show: true,
      x: e.clientX,
      y: e.clientY,
    });
  };

  return (
    <>
      <Palette
        paletteConfig={paletteConfig}
        colors={colors}
        handleChangeColor={handleChangeColor}
        handleShowPalette={setPaletteConfig}
      />
      <div
        className={styles.gridContainer}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onContextMenu={(e) => handleOpenPalette(e)}
      >
        {cells.map((cell, index) => (
          <PaintCell
            key={`cell-${index}`}
            index={index}
            cell={cell}
            handlePaintCell={handlePaintCell}
            handlePaintDrag={handlePaintDrag}
          />
        ))}
      </div>
    </>
  );
}
