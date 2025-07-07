// components/Piece.js
export function Piece({ piece }) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {piece.shape.map((row, y) =>
        row.map((cell, x) =>
          cell ? (
            <div
              key={`${y}-${x}`}
              className="absolute w-6 h-6 sm:w-8 sm:h-8 bg-primary transition-transform"
              style={{
                transform: `translate(${(piece.position.x + x) * 24}px, ${
                  (19 - piece.position.y - y) * 24
                }px)`,
              }}
            />
          ) : null
        )
      )}
    </div>
  );
}
