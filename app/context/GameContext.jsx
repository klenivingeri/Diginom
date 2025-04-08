import { createContext, useContext, useRef, useState } from 'react';
import {getRandom } from '../utils/random'

const GameContext = createContext(null);
GameContext.displayName = 'GameContext';

export const GameProvider = ({ children }) => {
  const [frame, setFrame] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [random, setRandom] = useState(getRandom());
  const [foundOpen, setFoundOpen] = useState(false);
  const distanceRef = useRef(0);
  const containerRef = useRef(null);
  const targetRef = useRef(null);
  const isMouseDown = useRef(false);
  const directionRef = useRef('up');

  const resetDistance = () => {
    distanceRef.current = 0;
    setRandom(getRandom());
  };

  return (
    <GameContext.Provider value={{
      frame, setFrame,
      containerRef,
      directionRef,
      position, setPosition,
      random, setRandom,
      distanceRef,
      targetRef,
      isMouseDown,
      resetDistance,
      foundOpen, setFoundOpen
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame deve ser usado dentro de um GameProvider');
  }
  return context;
};