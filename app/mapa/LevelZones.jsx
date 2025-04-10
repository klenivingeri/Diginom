import { grid } from './grid/nivel1';

const levelColors = {
  0: 'rgba(240,240,240,0.2)',
  1: 'rgba(214,234,255,0.2)',
  2: 'rgba(181,216,255,0.2)',
  3: 'rgba(156,198,255,0.2)',
  4: 'rgba(132,181,255,0.2)',
  5: 'rgba(107,163,255,0.2)',
  6: 'rgba(82,145,255,0.2)',
  7: 'rgba(58,127,255,0.2)',
  8: 'rgba(33,109,255,0.2)',
  9: 'rgba(8,91,255,0.2)',
  10: 'rgba(0,68,204,0.2)',
};

export default function MapGrid() {
  const rows = grid.length;
  const cols = grid[0].length;
  const getShadowStyle = (x, y) => {
    const currentLevel = grid[y][x];
    const style = {};

    const right = x + 1 < cols ? grid[y][x + 1] : null;
    const bottom = y + 1 < rows ? grid[y + 1]?.[x] : null;
    const left = x - 1 >= 0 ? grid[y][x - 1] : null;

    if (right !== null && right < currentLevel) {
      style.borderRight = '2px solid rgba(0,0,0,0.15)';
    }

    if (bottom !== null && bottom < currentLevel) {
      style.borderBottom = '2px solid rgba(0,0,0,0.15)';
    }

    if (left !== null && left < currentLevel) {
      style.borderLeft = '2px solid rgba(0,0,0,0.15)';
    }

    return style;
  };





  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        pointerEvents: 'none',
        boxSizing: 'border-box',
        padding: 0,
        margin: 0,
      }}
    >
      {grid.flatMap((row, y) =>
        row.map((level, x) => (
          <div
            key={`${x}-${y}`}
            style={{
              backgroundColor: levelColors[level] || 'transparent',
              padding: '2px 3px',
              fontSize: '8px',
              width: '100%',
              height: '100%',
              ...getShadowStyle(x, y),
            }}
          >
            {level}
          </div>
        ))
      )}
    </div>
  );
}
