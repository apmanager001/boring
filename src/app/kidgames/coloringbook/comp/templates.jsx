// templates.js
"use client";
import React from "react";
import convert from "color-convert";
import { template1 } from "./templates/temp1";
import { template2 } from "./templates/temp2";
import { template3 } from "./templates/temp3";
import { template4 } from "./templates/temp4";
import { template5 } from "./templates/temp5";
import { template6 } from "./templates/temp6";

const Templates = ({ onSelectTemplate }) => {
  const templates = [
    {
      name: "Smiley Face",
      template: template1,
      dimensions: { width: template1.gridWidth, height: template1.gridHeight },
      colorMap: {
        1: ["rgba(256, 224, 2, 185)", "gold"],
        2: ["rgba(0, 0, 0, 255)", "black"],
        3: ["rgba(256, 256, 256, 24)", "white"],
        4: ["rgba(32, 32, 32, 11)", "black"],
        5: ["rgba(160, 160, 160, 18)", "darkgray"],
        6: ["rgba(128, 128, 128, 13)", "grey"],
        7: ["rgba(224, 224, 224, 22)", "gainsboro"],
        8: ["rgba(78, 78, 78, 11)", "darkslategray"],
        9: ["rgba(192, 192, 192, 21)", "silver"],
        10: ["rgba(168, 160, 0, 255)", "darkgoldenrod"],
        11: ["rgba(107, 96, 0, 255)", "olive"],
        12: ["rgba(96, 64, 32, 255)", "saddlebrown"],
        13: ["rgba(224, 192, 0, 255)", "gold"],
        14: ["rgba(256, 224, 96, 73)", "khaki"],
        15: ["rgba(128, 128, 32, 255)", "olivedrab"],
      },
    },
    {
      name: "Heart",
      template: template2,
      dimensions: { width: template2.gridWidth, height: template2.gridHeight },
      colorMap: {
        1: ["rgba(210, 1, 0, 255)", "red"],
        2: ["rgba(253, 0, 21, 255)", "red"],
        3: ["rgba(256, 97, 96, 255)", "tomato"],
        4: ["rgba(255, 128, 128, 255)", "salmon"],
        5: ["rgba(160, 0, 0, 255)", "darkred"],
        6: ["rgba(185, 25, 21, 255)", "firebrick"],
        7: ["rgba(256, 224, 256, 255)", "lavenderblush"],
        8: ["rgba(224, 243, 256, 255)", "lightcyan"],
        9: ["rgba(256, 192, 171, 255)", "lightpink"],
        10: ["rgba(192, 96, 96, 255)", "indianred"],
        11: ["rgba(176, 64, 64, 255)", "sienna"],
        12: ["rgba(128, 32, 32, 255)", "brown"],
        13: ["rgba(224, 128, 96, 255)", "salmon"],
        14: ["rgba(224, 160, 128, 255)", "darksalmon"],
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
      name: "Berenstain Bears",
      template: template4,
      dimensions: { width: template4.gridWidth, height: template4.gridHeight },
      colorMap: {
        1: ["rgba(196, 224, 256, 255)", "paleturquoise"],
        2: ["rgba(226, 179, 59, 255)", "goldenrod"],
        3: ["rgba(5, 192, 224, 255)", "darkturquoise"],
        4: ["rgba(130, 101, 58, 255)", "sienna"],
        5: ["rgba(88, 62, 40, 255)", "darkolivegreen"],
        6: ["rgba(94, 64, 0, 255)", "saddlebrown"],
        7: ["rgba(46, 29, 13, 255)", "black"],
        8: ["rgba(163, 197, 199, 255)", "lightsteelblue"],
        9: ["rgba(196, 146, 166, 255)", "rosybrown"],
        10: ["rgba(109, 134, 138, 255)", "slategray"],
        11: ["rgba(6, 3, 3, 255)", "black"],
        12: ["rgba(48, 125, 186, 255)", "steelblue"],
        13: ["rgba(16, 64, 80, 255)", "darkslategray"],
        14: ["rgba(58, 96, 64, 255)", "darkslategray"],
        15: ["rgba(160, 112, 128, 255)", "gray"],
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
      {
        name: "Squirrel",
        template: template6,
        dimensions: { width: template6.gridWidth, height: template6.gridHeight },
        colorMap: 
        {
          "1": [
              "rgba(32, 64, 0, 255)",
              "darkgreen"
          ],
          "2": [
              "rgba(102, 65, 29, 255)",
              "saddlebrown"
          ],
          "3": [
              "rgba(191, 179, 159, 255)",
              "darkgray"
          ],
          "4": [
              "rgba(80, 64, 54, 255)",
              "darkolivegreen"
          ],
          "5": [
              "rgba(229, 224, 200, 255)",
              "gainsboro"
          ],
          "6": [
              "rgba(194, 129, 73, 255)",
              "peru"
          ],
          "7": [
              "rgba(152, 98, 32, 255)",
              "sienna"
          ],
          "8": [
              "rgba(65, 32, 24, 255)",
              "darkslategray"
          ],
          "9": [
              "rgba(32, 32, 32, 255)",
              "black"
          ],
          "10": [
              "rgba(225, 193, 169, 255)",
              "tan"
          ],
          "11": [
              "rgba(96, 96, 96, 255)",
              "dimgray"
          ],
          "12": [
              "rgba(32, 0, 0, 255)",
              "black"
          ],
          "13": [
              "rgba(224, 160, 122, 255)",
              "darksalmon"
          ],
          "14": [
              "rgba(96, 32, 0, 255)",
              "maroon"
          ]
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
