import type { MetaFunction } from "@remix-run/node";
import { GameProvider } from '../context/GameContext';
import MovableBox from '../components/MovableBox';
import { UI } from '../UI/index'; // você pode remover se não estiver usando

export const meta = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <GameProvider>
      <div className="flex justify-center h-screen bg-white">
        <MovableBox />
        <UI />
      </div>
    </GameProvider>
  );
}
