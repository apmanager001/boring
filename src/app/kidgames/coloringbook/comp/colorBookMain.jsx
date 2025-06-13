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
    const handleTemplateSelect = (template, customColorMap, dimensions) => {
      setCurrentTemplate(template)
      setColorMap(customColorMap)
      // setGridSize(size);
      setGridDimensions({
        width: template.gridWidth,
        height: template.gridHeight,
      });
    };

    const handleProcessComplete = (colorData) => {
      setCurrentTemplate(colorData);
      // You can also set other states if needed
      setColorMap(colorData.colorMap)
      setGridDimensions({
        width: colorData.gridWidth,
        height: colorData.gridHeight,
      });
    };

    const handleRefresh = () => {
      window.location.reload();
    };
    
  return (
    <>
      {currentTemplate ? (
        <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
          <h2 className="text-center text-xl">Coloring Book</h2>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <button className="btn btn-primary text-xl my-4" onClick={handleRefresh}> Try Another Image</button>
          </div>
        </div>
      ) : (
        <ImageProcessor onProcessComplete={handleProcessComplete} />
      )}
      {currentTemplate ? "": <Templates onSelectTemplate={handleTemplateSelect} />}
      {currentTemplate && (
        <ColoringGame
          colorMap={colorMap}
          template={currentTemplate}
          gridWidth={gridDimensions.width}
          gridHeight={gridDimensions.height}
        />
      )}
    </>
  );
};

export default ColorBookMain;
