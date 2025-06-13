import React, { useRef } from "react";
import toast from "react-hot-toast";
import { Download, ClipboardCopy } from "lucide-react";

export default function ScreenshotButton({
  showSolution,
  colorGrid,
  numberGrid,
  gridWidth,
  gridHeight,
  colorMap,
}) {
  const canvasRef = useRef(null);

  // Function to draw the grid onto the canvas
  const drawGrid = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas dimensions
    const cellSize = 30;
    canvas.width = gridWidth * cellSize;
    canvas.height = gridHeight * cellSize;

    numberGrid.forEach((row, i) => {
      row.forEach((cellNumber, j) => {
        const isColored = colorGrid[i][j] !== null;
        const cellColor = showSolution
          ? colorMap[cellNumber][0]
          : isColored
          ? colorGrid[i][j]
          : "#f3f4f6";

        // Fill the cell with its respective color
        ctx.fillStyle = cellColor;
        ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);

        // Draw the border around each cell
        ctx.strokeStyle = "#e5e7eb";
        ctx.strokeRect(j * cellSize, i * cellSize, cellSize, cellSize);
      });
    });
  };

  // Function to download the image
  const captureGrid = () => {
    drawGrid(); // Ensure grid is drawn before downloading
    const canvas = canvasRef.current;
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "image.png";
    link.click();
    toast.success('Download Image Successful')
  };

  // Function to copy image to clipboard
  const copyToClipboard = () => {
    drawGrid(); // Ensure grid is drawn before copying
    const canvas = canvasRef.current;

    canvas.toBlob((blob) => {
      const item = new ClipboardItem({ "image/png": blob });
      navigator.clipboard
        .write([item])
        .then(() => {
          toast.success("Image copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy:", err);
        });
    });
  };

  return (
    <div className="my-4">
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <div className="flex gap-2">
        <button className="btn btn-primary flex gap-2" onClick={captureGrid}>
          <Download />
          Download Image
        </button>
        <button
          className="btn btn-primary flex gap-2"
          onClick={copyToClipboard}
        >
          <ClipboardCopy />
          Copy to Clipboard
        </button>
      </div>
    </div>
  );
}
