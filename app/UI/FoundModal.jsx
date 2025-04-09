import { useGame } from '../context/GameContext';
import { grid } from '../mapa/grid/nivel1';

export default function FoundModal({ open, onClose , resetDistance }) {
  const { position } = useGame();

  if (!open) return null;

  const handleOnClose = () => {
    resetDistance();
    onClose();
  };

  const gridCols = 6;
  const gridRows = 12;

  const cellWidth = window.innerWidth / gridCols;
  const cellHeight = window.innerHeight / gridRows;

  const col = Math.floor(position.x / cellWidth);
  const row = Math.floor(position.y / cellHeight);

  const level =
    row >= 0 && row < grid.length && col >= 0 && col < grid[0].length
      ? grid[row][col]
      : '???';

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        className="bg-white rounded-2xl shadow-lg p-6 w-80 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4 text-black">Você encontrou algo!</h2>
        <p className="mb-2 text-black">Você está no <strong>nível {level}</strong> do mapa.</p>
        <p className="mb-6 text-black">Continue explorando para achar mais surpresas.</p>
        <button
          onClick={handleOnClose}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}