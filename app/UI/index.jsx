
import { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { ButtonExpand } from './ButtonExpand';
import FoundModal from './FoundModal';

import WelcomeModal from './WelcomeModal'

const UIBottom = ({ children }) => {
  return <div style={{
    position: 'fixed',
    bottom: 0,
    right: 0,
    width: '100%',
    color: 'black',
    zIndex: 1000,
    height: '5px',
    fontSize: '16px',
  }}>
    {children}
  </div>
}
const DistanceTraveledBar = ({ distanceRef }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const newWidth = (distanceRef.current / 4000) * 100;
      setWidth(newWidth);
    }, 50); // atualiza a cada 50ms (ou ajuste como preferir)

    return () => clearInterval(interval);
  }, [distanceRef]);

  return (
    <div style={{
      width: '100%',
      height: '5px',
      position: 'relative',
      overflow: 'visible',
    }}>
      <div style={{
        background: 'red',
        height: '10px',
        width: `${width}%`,
        position: 'relative',
        transition: 'width 0.1s linear',
      }}>
        <div style={{
          position: 'absolute',
          right: 0,
          width: '5px',
          height: '5px',
          background: 'red',
          animation: 'shake 0.3s infinite',
        }} />
      </div>

      <style>
        {`
          @keyframes shake {
            0% { transform: translateX(0); }
            25% { transform: translateX(-2px); }
            50% { transform: translateX(2px); }
            75% { transform: translateX(-2px); }
            100% { transform: translateX(0); }
          }
        `}
      </style>
    </div>
  );
};

export const UI = () => {
  const { distanceRef, foundOpen, setFoundOpen, resetDistance } = useGame()
  const [modaOpen, setModal] = useState(true)
  return (
    <>
      <ButtonExpand />
      <WelcomeModal open={modaOpen} onClose={() => setModal(false)} />
      <FoundModal open={foundOpen} onClose={() => setFoundOpen(false)} resetDistance={resetDistance} />
      <UIBottom>
        <DistanceTraveledBar
          distanceRef={distanceRef}
        />
      </UIBottom>
    </>
  )
}