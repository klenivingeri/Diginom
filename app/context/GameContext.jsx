import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { getRandom } from '../utils/random';
import { transformGrid } from '../utils/transformGrid';
import { hero } from './hero';
import { grid } from '../mapa/grid/nivel1';

const GameContext = createContext(null);
GameContext.displayName = 'GameContext';

export const GameProvider = ({ children }) => {
  const [frame, setFrame] = useState(0);
  const [characterAttr, setCharacterAttr] = useState(hero);
  const [currentGridLevel, setCurrentGridLevel] = useState('???');
  const [mapGrids, setMapGrids] = useState([]);
  const [modaStartOpen, setModaStart] = useState(true)
  const [enteredGridCell, setEnteredGridCell] = useState({ level: 0 });
  const [topLevelAlert, settopLevelAlert] = useState(false); //alerta nivel superior

  const [foundOpen, setFoundOpen] = useState(false); // Algo encontrado
  const distanceRef = useRef(0); // distancia porcorida pelo personagem y,x
  const randomRef = useRef(0);
  const containerRef = useRef(null);
  const targetRef = useRef(null);
  const isMouseDown = useRef(false);
  const lastOrientationRef = useRef(
    typeof window !== 'undefined' && window.innerWidth > window.innerHeight
      ? 'landscape'
      : 'portrait'
  );
  const lastPositionRef = useRef({ x: 0, y: 0 });

  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  const gridCols = 6;
  const gridRows = 12;

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  const resetDistance = () => {
    distanceRef.current = 0;

    if (windowSize.width > windowSize.height) {
      randomRef.current = getRandom(windowSize?.height * 0.02, windowSize?.height * 0.4 + 100);
      return;
    }

    randomRef.current = getRandom(windowSize.width * 0.02, windowSize.width * 0.4 + 100);
  };

  // Atualiza célula atual (nível)
  useEffect(() => {
    const cellWidth = window.innerWidth / gridCols;
    const cellHeight = window.innerHeight / gridRows;

    const centerX = characterAttr.position.x + characterAttr.sprite.width / 2;
    const centerY = characterAttr.position.y + characterAttr.sprite.height / 2;

    const col = Math.floor(centerX / cellWidth);
    const row = Math.floor(centerY / cellHeight);

    const level =
      row >= 0 && row < grid.length && col >= 0 && col < grid[0].length
        ? grid[row][col]
        : '???';

    setCurrentGridLevel(level);

    if (!modaStartOpen) {
      setEnteredGridCell((prev) => {
        if (!prev || prev.row !== row || prev.col !== col) {
          console.log(`Entrou na célula: linha ${row}, coluna ${col}, nível ${level}`);
          return { row, col, level };
        }
        return prev;
      });
    }


    settopLevelAlert(enteredGridCell?.level - characterAttr?.level >= 2)
  }, [characterAttr.position]);

  useEffect(() => {
    setMapGrids(transformGrid(grid));
    if (typeof window !== 'undefined') {
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }

  }, []);

  return (
    <GameContext.Provider
      value={{
        frame,
        setFrame,
        containerRef,
        characterAttr,
        setCharacterAttr,
        currentGridLevel,
        randomRef,
        distanceRef,
        targetRef,
        isMouseDown,
        resetDistance,
        foundOpen,
        setFoundOpen,
        windowSize,
        mapGrids,
        enteredGridCell,
        lastOrientationRef,
        lastPositionRef,
        handleResize,
        topLevelAlert,
        modaStartOpen, setModaStart
      }}
    >
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
