// templates.js
"use client";
import React from "react";
import { template1 } from "./templates/temp1";
import { template2 } from "./templates/temp2";
import { template3 } from "./templates/temp3";
import { template4 } from "./templates/temp4";
import { template5 } from "./templates/temp5";

const Templates = ({ onSelectTemplate }) => {
  const templates = [
    {
      name: "Smiley Face",
      template: template1,
      gridSize: template1.gridSize,
      colorMap: {
        1: "red",
        2: "blue",
        3: "yellow",
      },
    },
    {
      name: "Heart",
      template: template2,
      gridSize: template2.gridSize,
      colorMap: {
        1: "red",
        2: "green",
      },
    },
    {
      name: "Abstract",
      template: template3,
      gridSize: template3.gridSize,
      colorMap: {
        1: "red",
        2: "blue",
        3: "yellow",
        4: "green",
        5: "purple",
      },
    },
    {
      name: "SpongeBob",
      template: template4,
      gridSize: template4.gridSize,
      colorMap: {
        1: "red", // Red tie
        2: "yellow", // Yellow body
        3: "blue", // Blue background
        4: "Black", // Black pupils/mouth line
        5: "White", // White eyes/teeth
        6: "Green", // Green nose
        7: "SaddleBrown", // Brown pants
        // 8: "White", // White collar
        8: "Gold", // Gold pores
      },
    },
    {
      name: "SpongeBob",
      template: template5,
      dimensions: { width: template5.gridWidth, height: template5.gridHeight },
      colorMap: {
          0:    "rgba(32, 128, 255, 255)",
          1:    "rgba(116, 65, 28, 255)",
          2:    "rgba(133, 150, 130, 255)",
          3:    "rgba(177, 193, 164, 255)",
          4:    "rgba(115, 147, 211, 255)",
          5:    "rgba(224, 218, 78, 255)",
          6:    "rgba(193, 184, 33, 255)",
          7:    "rgba(256, 222, 71, 255)",
          8:    "rgba(169, 136, 12, 255)",
          9:    "rgba(238, 64, 35, 255)",
          10:    "rgba(60, 121, 156, 255)",
          11:    "rgba(256, 237, 192, 255)",
          12:    "rgba(64, 128, 96, 255)",
          13:    "rgba(160, 160, 96, 255)",
        // 0: "cornflowerblue", // Sky background
        // 1: "white", // Horse outline
        // 2: "lightskyblue", // Horse eye white
        // 3: "saddlebrown", // Horse nostril
        // 4: "black", // Horse leg joints
        // 5: "tan", // Horse hooves
        // 6: "darkslategrey", // Horse mane
        // 7: "moccasin", // Horse body
        // 8: "goldenrod", // Clouds
        // 9: "gray", // Fence
      },
    },
  ];

  return (
    <div className="flex justify-center gap-4 p-4">
      {templates.map((t, index) => (
        <button
          key={index}
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => onSelectTemplate(t.template, t.colorMap, t.dimensions)}
        >
          {t.name}
        </button>
      ))}
    </div>
  );
};

export default Templates;
