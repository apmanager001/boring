// templates.js
"use client";
import React from "react";
import convert from "color-convert";
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
      dimensions: { width: template1.gridWidth, height: template1.gridHeight },
      colorMap: {
        1: ["red", "red"],
        2: ["blue", "blue"],
        3: ["yellow", "yellow"],
      },
    },
    {
      name: "Heart",
      template: template2,
      dimensions: { width: template2.gridWidth, height: template2.gridHeight },
      colorMap: {
        1: ["red", "red"],
        2: ["green", "green"],
      },
    },
    {
      name: "Abstract",
      template: template3,
      dimensions: { width: template3.gridWidth, height: template3.gridHeight },
      colorMap: {
        1: ["red", "red"],
        2: ["blue", "blue"],
        3: ["yellow", "yellow"],
        4: ["green", "green"],
        5: ["purple", "purple"],
      },
    },
    {
      name: "SpongeBob",
      template: template4,
      dimensions: { width: template4.gridWidth, height: template4.gridHeight },
      colorMap: {
        1: ["red", "red"],
        2: ["yellow", "yellow"],
        3: ["blue", "blue"],
        4: ["black", "black"], 
        5: ["white", "white"],
        6: ["green", "green"], 
        7: ["saddlebrown", "saddlebrown"], 
        8: ["gold", "gold"],
      },
    },
    {
      name: "SpongeBob",
      template: template5,
      dimensions: { width: template5.gridWidth, height: template5.gridHeight },
      colorMap: {
        1: [
          "rgba(32, 128, 255, 255)",
          convert.rgb.keyword(32, 128, 255) || "rgba(32, 128, 255, 255)",
        ],
        2: [
          "rgba(116, 65, 28, 255)",
          convert.rgb.keyword(116, 65, 28) || "rgba(116, 65, 28, 255)",
        ],
        3: [
          "rgba(133, 150, 130, 255)",
          convert.rgb.keyword(133, 150, 130) || "rgba(133, 150, 130, 255)",
        ],
        4: [
          "rgba(177, 193, 164, 255)",
          convert.rgb.keyword(177, 193, 164) || "rgba(177, 193, 164, 255)",
        ],
        5: [
          "rgba(115, 147, 211, 255)",
          convert.rgb.keyword(115, 147, 211) || "rgba(115, 147, 211, 255)",
        ],
        6: [
          "rgba(224, 218, 78, 255)",
          convert.rgb.keyword(224, 218, 78) || "rgba(224, 218, 78, 255)",
        ],
        7: [
          "rgba(193, 184, 33, 255)",
          convert.rgb.keyword(193, 184, 33) || "rgba(193, 184, 33, 255)",
        ],
        8: [
          "rgba(256, 222, 71, 255)",
          convert.rgb.keyword(256, 222, 71) || "rgba(256, 222, 71, 255)",
        ],
        9: [
          "rgba(169, 136, 12, 255)",
          convert.rgb.keyword(169, 136, 12) || "rgba(169, 136, 12, 255)",
        ],
        10: [
          "rgba(238, 64, 35, 255)",
          convert.rgb.keyword(238, 64, 35) || "rgba(238, 64, 35, 255)",
        ],
        11: [
          "rgba(60, 121, 156, 255)",
          convert.rgb.keyword(60, 121, 156) || "rgba(60, 121, 156, 255)",
        ],
        12: [
          "rgba(256, 237, 192, 255)",
          convert.rgb.keyword(256, 237, 192) || "rgba(256, 237, 192, 255)",
        ],
        13: [
          "rgba(64, 128, 96, 255)",
          convert.rgb.keyword(64, 128, 96) || "rgba(64, 128, 96, 255)",
        ],
        14: [
          "rgba(160, 160, 96, 255)",
          convert.rgb.keyword(160, 160, 96) || "rgba(160, 160, 96, 255)",
        ],
      },
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
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
