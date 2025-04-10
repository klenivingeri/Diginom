import { createContext, useContext, useRef, useState } from 'react';
import { getRandom } from '../utils/random'
import spriteSrc from '/chxk2csydkh81.png';
const GameContext = createContext(null);
GameContext.displayName = 'GameContext';

export const GameProvider = ({ children }) => {
  const [frame, setFrame] = useState(0);
  const [characterAttr, setCharacterAttr] = useState({
    name: 'Herói',
    reset: 0,
    rounds: 30,
    level: 1,
    experience: {
      current: 0,
      nextLevel: 200
    },
    health: {
      current: 100,
      max: 100,
    },
    stamina: {
      current: 50,
      max: 50,
    },
    strength: 10,
    agility: 8,
    intelligence: 6,
    speed: 1,
    critical: 0,
    defense: 5,
    attackPower: 12,
    inventory: [],
    equipped: {
      weapon: null,
      armor: null,
      accessory: null,
    },
    position: {
      x: 0, y: 0
    },
    direction: 'down',
    statusEffects: [],
    gold: 0,
    skills: [],
    sprite: {
      img: spriteSrc
    },
    directionRowMap: {
      down: 0,
      left: 1,
      right: 2,
      up: 3,
    }
  });

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