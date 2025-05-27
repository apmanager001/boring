// import React, { useEffect, useState } from "react";

// const MAX_COLORS = 15;
// const MAX_WIDTH = 60;
// const MAX_HEIGHT = 60;

// const PixelArray = () => {
//   const imageSrc = "/coloringbook/horse.png";
//   const [pixelArray, setPixelArray] = useState([]);
//   const [colorMap, setColorMap] = useState({});

//   useEffect(() => {
//     const processImage = () => {
//       const img = new Image();
//       img.src = imageSrc;
//       img.crossOrigin = "Anonymous";

//       img.onload = () => {
//         const canvas = document.createElement("canvas");
//         const ctx = canvas.getContext("2d");

//         // Limit dimensions to 60x60
//         const width = Math.min(img.width, MAX_WIDTH);
//         const height = Math.min(img.height, MAX_HEIGHT);
//         canvas.width = width;
//         canvas.height = height;

//         ctx.drawImage(img, 0, 0, width, height);
//         const imageData = ctx.getImageData(0, 0, width, height);
//         const pixels = imageData.data;

//         // Process colors
//         const newColorMap = { "0,0,0,0": 0 }; // Transparent = 0
//         let colorIndex = 1; // Start color indices at 1

//         const newPixelArray = Array(height)
//           .fill()
//           .map(() => Array(width).fill(0));

//         for (let y = 0; y < height; y++) {
//           for (let x = 0; x < width; x++) {
//             const i = (y * width + x) * 4;
//             const r = pixels[i];
//             const g = pixels[i + 1];
//             const b = pixels[i + 2];
//             const a = pixels[i + 3];

//             // Skip if transparent
//             if (a === 0) {
//               newPixelArray[y][x] = 0;
//               continue;
//             }

//             const colorKey = `${r},${g},${b},${a}`;

//             // Add new color if not exists (up to MAX_COLORS)
//             if (!newColorMap[colorKey]) {
//               if (colorIndex <= MAX_COLORS) {
//                 newColorMap[colorKey] = colorIndex;
//                 colorIndex++;
//               } else {
//                 // If we exceed MAX_COLORS, find the closest existing color
//                 const closestColor = findClosestColor(newColorMap, r, g, b, a);
//                 newPixelArray[y][x] = newColorMap[closestColor];
//                 continue;
//               }
//             }

//             newPixelArray[y][x] = newColorMap[colorKey];
//           }
//         }

//         setColorMap(newColorMap);
//         setPixelArray(newPixelArray);
//       };
//     };

//     // Helper to find closest color when we exceed MAX_COLORS
//     const findClosestColor = (colorMap, r, g, b, a) => {
//       let minDistance = Infinity;
//       let closestColor = null;

//       for (const [colorKey] of Object.entries(colorMap)) {
//         if (colorKey === "0,0,0,0") continue; // Skip transparent

//         const [cr, cg, cb, ca] = colorKey.split(",").map(Number);
//         const distance = Math.sqrt(
//           Math.pow(r - cr, 2) +
//             Math.pow(g - cg, 2) +
//             Math.pow(b - cb, 2) +
//             Math.pow(a - ca, 2)
//         );

//         if (distance < minDistance) {
//           minDistance = distance;
//           closestColor = colorKey;
//         }
//       }

//       return closestColor || "0,0,0,0";
//     };

//     processImage();
//   }, [imageSrc]);

//   console.log(pixelArray)
//   return (
//     <div>
//       <h2>Pixel Art Processor</h2>
//       <div style={{ display: "flex", gap: "2rem" }}>
//         <div>
//           <h3>Original Image</h3>
//           <img
//             src={imageSrc}
//             alt="Source Pixel Art"
//             style={{
//               imageRendering: "pixelated",
//               maxWidth: "300px",
//               border: "1px solid #ccc",
//             }}
//           />
//         </div>
//         <div>
//           <h3>Color Map</h3>
//           <pre style={{ background: "#f5f5f5", padding: "1rem" }}>
//             {JSON.stringify(colorMap, null, 2)}
//           </pre>
//         </div>
//       </div>

//       {/* <div>
//         <h3>
//           Pixel Array ({pixelArray.length} rows × {pixelArray[0]?.length || 0}{" "}
//           columns)
//         </h3>
//         <pre
//           style={{
//             background: "#f5f5f5",
//             padding: "1rem",
//             maxHeight: "400px",
//             overflow: "auto",
//           }}
//         >
//           {JSON.stringify(pixelArray, null, 2)}
//         </pre>
//       </div> */}
//     </div>
//   );
// };

// export default PixelArray;

import React, { useRef, useEffect, useState } from "react";
import { prominent } from "color.js";

const ROWS = 60;
const COLUMNS = 48;
const imageSrc = "/coloringbook/horse.png";

const ImageProcessor = () => {
  const canvasRef = useRef(null);
  const [processedArray, setProcessedArray] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = imageSrc;
    img.crossOrigin = "Anonymous"; // Ensure proper CORS handling

    // If the image fails to load, set the error state
    img.onerror = () => {
      const errMsg = `Failed to load image: ${imageSrc}`;
      setError(errMsg);
      console.error(errMsg);
    };

    img.onload = () => {
      // Calculate target width and height based on grid dimensions
      // You can adjust these calculations based on whether you want to downscale
      // the image to exactly these dimensions or sample from the original image
      const width = Math.min(img.width, COLUMNS);
      const height = Math.min(img.height, ROWS);
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      console.log(`Image drawn at dimensions: ${width}x${height}`);

      // Process the image into cells
      const gridPromises = [];
      for (let row = 0; row < ROWS; row++) {
        const rowPromises = [];
        for (let col = 0; col < COLUMNS; col++) {
          // Calculate each cell's coordinates and dimensions
          const cellX = Math.floor((col / COLUMNS) * width);
          const cellY = Math.floor((row / ROWS) * height);
          const cellWidth = Math.floor(width / COLUMNS);
          const cellHeight = Math.floor(height / ROWS);

          console.log(
            `Processing cell [${row}, ${col}] at (${cellX}, ${cellY}) with size ${cellWidth}x${cellHeight}`
          );

          // Extract the image data from the cell
          const imageData = ctx.getImageData(
            cellX,
            cellY,
            cellWidth,
            cellHeight
          );

          // Get the prominent color for this cell; prominent() returns a promise.
          const colorPromise = prominent(imageData, { amount: 1 })
            .then((color) => {
              console.log(`Cell [${row}, ${col}] prominent color:`, color);
              return color;
            })
            .catch((err) => {
              console.error(`Error processing cell [${row}, ${col}]:`, err);
              return null;
            });

          rowPromises.push(colorPromise);
        }
        gridPromises.push(Promise.all(rowPromises));
      }

      Promise.all(gridPromises).then((result) => {
        console.log("Processed Array:", result);
        setProcessedArray(result);
      });
    };
  }, [imageSrc]);

  // If there's an error loading the image, display it
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <h2>Pixel Art Processor</h2>
      <pre>{JSON.stringify(processedArray, null, 2)}</pre>
    </div>
  );
};

export default ImageProcessor;