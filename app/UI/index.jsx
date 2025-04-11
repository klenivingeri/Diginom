
import { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { ButtonExpand } from './ButtonExpand';
import FoundModal from './FoundModal';
import { TopLevelAlert } from './TopLevelAlert'
import WelcomeModal from './WelcomeModal'

const UIBottom = ({ children }) => {
  return <div style={{
    position: 'fixed',
    bottom: 0,
    right: 0,
    width: '100%',
    color: 'black',
    zIndex: 199,
    height: '5px',
    fontSize: '16px',
  }}>
    {children}
  </div>
}

const DistanceTraveledBar = ({ distanceRef, windowSize }) => {

  const [width, setWidth] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const newWidth = (distanceRef.current / 500) * 100;
      setWidth(newWidth <= 100 ? newWidth : 100);
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

const ShowMoviment = ({ characterAttr, distanceRef, randomRef }) => {
  return <div style={{
    position: 'fixed',
    bottom: 300,
    right: 10,
    width: '100px',
    height: '200px',
    color: 'black',
    fontSize: '10px ',
    zIndex: 199,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'end',
  }}>
    <div>{`E: ${randomRef.current}`}</div>
    <div>{`D: ${Math.floor(distanceRef.current)}`}</div>
    {`y: ${Math.floor(characterAttr.position.y)} x: ${Math.floor(characterAttr.position.x)}`}
  </div>
}

export const UI = () => {
  const { modaStartOpen, setModaStart, distanceRef, characterAttr, randomRef, topLevelAlert, windowSize } = useGame()


  return (
    <>
      <ButtonExpand />
      <WelcomeModal open={modaStartOpen} onClose={() => setModaStart(false)} />
      <FoundModal />
      <TopLevelAlert topLevelAlert={topLevelAlert} />
      <ShowMoviment characterAttr={characterAttr} distanceRef={distanceRef} randomRef={randomRef} />
      <UIBottom>

        <DistanceTraveledBar
          distanceRef={distanceRef}
          windowSize={windowSize}
        />
      </UIBottom>
    </>
  )
}