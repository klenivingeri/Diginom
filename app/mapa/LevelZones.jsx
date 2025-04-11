import { useGame } from '../context/GameContext';

export default function MapGrid() {
  const { mapGrids, enteredGridCell } = useGame();
  console.log(enteredGridCell)
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        pointerEvents: 'none',
      }}
    >
      {mapGrids.map((item, index) => (
        <div
          key={index}
          style={{
            width: '16.6667%', // 100 / 6
            height: '8.3333%', // 100 / 12
            background: item.bg,
            border: '1px solid rgba(0,0,0,0.2)',
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 8,
          }}
        >
          {item.level}
        </div>
      ))}
    </div>
  );
}
