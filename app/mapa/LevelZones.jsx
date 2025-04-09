import { grid } from './grid/nivel1'

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
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gridTemplateRows: 'repeat(12, 1fr)',
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        pointerEvents: 'none',
      }}
    >
      {grid.flat().map((level, idx) => (
        <div
          key={idx}
          style={{
            backgroundColor: levelColors[level] || 'transparent',
            border: '1px solid rgba(0,0,0,0.05)',
            width: '100%',
            height: '100%',
            padding: '2px 3px',
            fontSize: '8px',
          }}
        >{level}</div>
      ))}
    </div>
  );
}
