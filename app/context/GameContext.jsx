import { createContext, useContext, useRef, useState } from 'react';
import { getRandom } from '../utils/random'

import { hero } from './hero'


const GameContext = createContext(null);
GameContext.displayName = 'GameContext';

export const GameProvider = ({ children }) => {
  const [frame, setFrame] = useState(0);
  const [characterAttr, setCharacterAttr] = useState(hero);

  const [random, setRandom] = useState(getRandom());
  const [foundOpen, setFoundOpen] = useState(false);
  const distanceRef = useRef(0);
  const containerRef = useRef(null);
  const targetRef = useRef(null);
  const isMouseDown = useRef(false);

  const resetDistance = () => {
    distanceRef.current = 0;
    setRandom(getRandom());
  };

  return (
    <GameContext.Provider value={{
      frame, setFrame,
      containerRef,
      characterAttr, setCharacterAttr,
      random, setRandom,
      distanceRef,
      targetRef,
      isMouseDown,
      resetDistance,
      foundOpen, setFoundOpen,
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