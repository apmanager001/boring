// coloringBookMain.js
"use client";
import React, { useState } from "react";
import ColoringGame from "./coloringBook";
import Templates from "./templates";
import ImageProcessor from "./image1";

const ColorBookMain = () => {
    const [currentTemplate, setCurrentTemplate] = useState(null);
    const [colorMap, setColorMap] = useState(null);
    // const [gridSize, setGridSize] = useState(25); // Default size
    const [gridDimensions, setGridDimensions] = useState({
      width: 25,
      height: 25,
    });
// console.log(currentTemplate)
    const handleTemplateSelect = (template, customColorMap, dimensions) => {
      setCurrentTemplate(template);
      setColorMap(customColorMap);
      // setGridSize(size);
      setGridDimensions(dimensions);
    };

    const handleProcessComplete = (colorData) => {
      console.log(colorData)
      setCurrentTemplate(colorData);
      // You can also set other states if needed
      setColorMap(colorData.colorMap)
      setGridDimensions({
        width: colorData.gridWidth,
        height: colorData.gridHeight,
      });
    };
    console.log(colorMap);
  return (
    <>
      <ImageProcessor onProcessComplete={handleProcessComplete} />
      <Templates onSelectTemplate={handleTemplateSelect} />
      {currentTemplate && (
        <ColoringGame
          colorMap={colorMap}
          template={currentTemplate}
          // gridSize={gridSize}
          gridWidth={gridDimensions.width}
          gridHeight={gridDimensions.height}
        />
      )}
    </>
  );
};

export default ColorBookMain;
