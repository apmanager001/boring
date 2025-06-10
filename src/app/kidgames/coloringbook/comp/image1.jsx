import React, { useState } from "react";
import { Image } from "image-js";
import convert from "color-convert";

const ImageProcessor = ({ onProcessComplete }) => {
  const [pixelatedImage, setPixelatedImage] = useState(null);
  const [colorMap, setColorMap] = useState([]);
  const [finalColorMatrix, setFinalColorMatrix] = useState([]);

  // Function to group similar colors
  const groupSimilarColors = (
    colorFrequency,
    maxColors = 15,
    threshold = 30
  ) => {
    const colors = Array.from(colorFrequency.entries());
    const groupedColors = new Map();

    colors.forEach(([color, count]) => {
      const [r, g, b, a] = color.match(/\d+/g).map(Number);
      let matched = false;

      // Check if this color is similar to any existing group
      for (const [groupColor, groupData] of groupedColors) {
        const [gr, gg, gb] = groupColor.match(/\d+/g).map(Number);
        const distance = Math.sqrt(
          Math.pow(r - gr, 2) + Math.pow(g - gg, 2) + Math.pow(b - gb, 2)
        );

        if (distance < threshold) {
          // Calculate weighted average with existing color
          const totalCount = groupData.count + count;
          const newR = Math.round(
            (groupData.r * groupData.count + r * count) / totalCount
          );
          const newG = Math.round(
            (groupData.g * groupData.count + g * count) / totalCount
          );
          const newB = Math.round(
            (groupData.b * groupData.count + b * count) / totalCount
          );

          groupedColors.set(`rgba(${newR}, ${newG}, ${newB}, ${a})`, {
            r: newR,
            g: newG,
            b: newB,
            count: totalCount,
          });
          groupedColors.delete(groupColor);
          matched = true;
          break;
        }
      }

      if (!matched && groupedColors.size < maxColors) {
        groupedColors.set(color, { r, g, b, count });
      } else if (!matched) {
        // If we've reached max colors, merge with closest existing color
        let closestColor = null;
        let minDistance = Infinity;

        for (const [groupColor] of groupedColors) {
          const [gr, gg, gb] = groupColor.match(/\d+/g).map(Number);
          const distance = Math.sqrt(
            Math.pow(r - gr, 2) + Math.pow(g - gg, 2) + Math.pow(b - gb, 2)
          );

          if (distance < minDistance) {
            minDistance = distance;
            closestColor = groupColor;
          }
        }

        if (closestColor) {
          const groupData = groupedColors.get(closestColor);
          const totalCount = groupData.count + count;
          const newR = Math.round(
            (groupData.r * groupData.count + r * count) / totalCount
          );
          const newG = Math.round(
            (groupData.g * groupData.count + g * count) / totalCount
          );
          const newB = Math.round(
            (groupData.b * groupData.count + b * count) / totalCount
          );

          groupedColors.set(`rgba(${newR}, ${newG}, ${newB}, ${a})`, {
            r: newR,
            g: newG,
            b: newB,
            count: totalCount,
          });
          groupedColors.delete(closestColor);
        }
      }
    });

    return Array.from(groupedColors.entries()).sort(
      (a, b) => b[1].count - a[1].count
    );
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      // Load the image
      const arrayBuffer = await file.arrayBuffer();
      const image = await Image.load(arrayBuffer);

      // Set pixelation parameters
      const pixelSize = 60;
      const finalSize = 800;

      // Calculate small dimensions maintaining aspect ratio
      const ratio = Math.min(pixelSize / image.width, pixelSize / image.height);
      const smallWidth = Math.max(1, Math.floor(image.width * ratio));
      const smallHeight = Math.max(1, Math.floor(image.height * ratio));

      // Step 1: Downscale to create pixelation
      const smallImage = image.resize({
        width: smallWidth,
        height: smallHeight,
      });

      // Step 2: Reduce colors and build color frequency map
      const colorDepth = 32;
      const data = smallImage.data;
      const colorFrequency = new Map();

      for (let i = 0; i < data.length; i += 4) {
        const r = Math.round(data[i] / colorDepth) * colorDepth;
        const g = Math.round(data[i + 1] / colorDepth) * colorDepth;
        const b = Math.round(data[i + 2] / colorDepth) * colorDepth;
        const a = data[i + 3];

        const colorKey = `rgba(${r}, ${g}, ${b}, ${a})`;
        colorFrequency.set(colorKey, (colorFrequency.get(colorKey) || 0) + 1);
      }

      // Group similar colors to max 15 colors
      const limitedColorMap = groupSimilarColors(colorFrequency, 15, 40);
      // const filteredColorMap = Object.fromEntries(
      //   limitedColorMap.map((item, index) => [index, item[0]])
      // );
      const filteredColorMap = Object.fromEntries(
        limitedColorMap.map(([item, data], index) => {
          // Extract RGB values
          const { r, g, b } = data;

          // Convert RGB to closest color name
          const colorName = convert.rgb.keyword(r, g, b) || item;

          // Format the final output as an array inside the object
          return [index + 1 , [item, colorName]];
        })
      );

      setColorMap(limitedColorMap);

      // Create a matrix to store color indices (60x60)
      const colorMatrix = Array.from({ length: smallHeight }, () =>
        Array(smallWidth).fill(0)
      );

      // Apply the limited color palette to the image and build the color matrix
      for (let y = 0; y < smallHeight; y++) {
        for (let x = 0; x < smallWidth; x++) {
          const i = (y * smallWidth + x) * 4;
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];

          // Find closest color in our limited palette
          let closestIndex = 0;
          let minDistance = Infinity;

          limitedColorMap.forEach(([color], index) => {
            const [cr, cg, cb] = color.match(/\d+/g).map(Number);
            const distance = Math.sqrt(
              Math.pow(r - cr, 2) + Math.pow(g - cg, 2) + Math.pow(b - cb, 2)
            );

            if (distance < minDistance) {
              minDistance = distance;
              closestIndex = index;
            }
          });

          // Store the color index in the matrix
          colorMatrix[y][x] = closestIndex;

          // Update the pixel with the palette color
          const closestColor = limitedColorMap[closestIndex][0];
          const [nr, ng, nb] = closestColor.match(/\d+/g).map(Number);
          data[i] = nr;
          data[i + 1] = ng;
          data[i + 2] = nb;
        }
      }

      const finalColorMatrix = colorMatrix.map((row) =>
        row.map((colorIndex) => colorIndex + 1)
      );

      const updatedColorMatrix = colorMatrix.map((row) =>
        row.map((colorIndex) => colorIndex + 1)
      );
      
      
      // const finalColorMatrix = colorMatrix.map((row) =>
      //   row.map((colorIndex) => colorMatrix[colorIndex] || `color${colorIndex}`)
      // );

      setFinalColorMatrix(finalColorMatrix);
      const colorData = {
        grid: updatedColorMatrix,
        gridWidth: colorMatrix[0].length,
        gridHeight: colorMatrix.length,
        colorMap: filteredColorMap,
      };
      onProcessComplete(colorData);

      // Now we have a colorMatrix where each cell contains an index (0-14)
      // representing one of the 15 colors in our palette
      // Step 3: Upscale back to display size
      const pixelated = smallImage.resize({
        width: finalSize,
        height: finalSize,
      });

      // Convert to base64 for display
      const base64Image = pixelated.toDataURL();
      setPixelatedImage(base64Image);

      // If you want to use the colorMatrix elsewhere, you might want to set it in state
      // setColorMatrix(colorMatrix);
    } catch (error) {
      console.error("Error processing image:", error);
    }
  };

  const rgbaToHex = (rgba) => {
    const parts = rgba.match(/[\d.]+/g);
    const r = parseInt(parts[0]).toString(16).padStart(2, "0");
    const g = parseInt(parts[1]).toString(16).padStart(2, "0");
    const b = parseInt(parts[2]).toString(16).padStart(2, "0");
    return `#${r}${g}${b}`.toUpperCase();
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <h2 className="text-center text-xl">Coloring Book</h2>
      <div
        className="flex justify-center my-4"
      >
        <input
          type="file"
          accept="image/*"
          className="file-input file-input-primary"
          onChange={handleImageUpload}
        />
      </div>
      {/*
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {pixelatedImage && (
          <div style={{ flex: 1, minWidth: "300px" }}>
            <div
              style={{
                border: "2px solid #ddd",
                padding: "10px",
                backgroundColor: "#f5f5f5",
                marginBottom: "20px",
              }}
            >
              <img
                src={pixelatedImage}
                alt="Pixelated result"
                style={{
                  imageRendering: "pixelated",
                  width: "100%",
                  maxHeight: "80vh",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                }}
              />
            </div>
          </div>
        )}

        {colorMap.length > 0 && (
          <div style={{ flex: 1, minWidth: "300px" }}>
            <h3 style={{ textAlign: "center" }}>
              Color Palette ({colorMap.length} colors)
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
                gap: "10px",
                marginTop: "10px",
              }}
            >
              {colorMap.map(([color, data]) => (
                <div
                  key={color}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "5px",
                    border: "1px solid #eee",
                    borderRadius: "4px",
                  }}
                >
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      backgroundColor: color,
                      marginBottom: "5px",
                      border: "1px solid #ddd",
                    }}
                  />
                  <div style={{ fontSize: "12px", textAlign: "center" }}>
                    <div>{rgbaToHex(color)}</div>
                    <div>({data.count} pixels)</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default ImageProcessor;
