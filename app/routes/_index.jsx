import { GameProvider } from '../context/GameContext';
import MovableBox from '../components/MovableBox';
import { UI } from '../UI/index'; // você pode remover se não estiver usando
import SceneLayer from '../mapa/SceneLayer';
import LevelZones from '../mapa/LevelZones';



export default function Index() {
  return (
    <GameProvider>
      <div className="flex justify-center h-screen bg-white relative overflow-hidden">
        <MovableBox />
        <SceneLayer />
        <LevelZones />
        <UI />
      </div>
    </GameProvider>
  );
}