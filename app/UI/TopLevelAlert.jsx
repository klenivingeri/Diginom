import { useGame } from '../context/GameContext';
import { useEffect, useState } from 'react';

export const TopLevelAlert = ({ topLevelAlert }) => {
  const { currentGridLevel } = useGame();
  const [showPulse, setShowPulse] = useState(false);

  useEffect(() => {
    if (!topLevelAlert) return;

    let count = 0;
    const interval = setInterval(() => {
      setShowPulse(true);
      setTimeout(() => setShowPulse(false), 1500); // desaparece após 1s
      count++;
    }, 2000); // a cada 2 segundos

    return () => clearInterval(interval);
  }, [topLevelAlert]);

  return (
    <>
      <style>
        {`
          @keyframes pulse {
            0% {
              transform: scale(1);
              opacity: 0.8;
            }
            25% {
              transform: scale(1.2);
              opacity: 0.5;
            }
            50% {
              transform: scale(1);
              opacity: 0.8;
            }
            100% {
              transform: scale(1.2)
              opacity: 0.5;
            }
          }

          @keyframes borderPulse {
            0% {
              box-shadow: inset 0 0 10px red, 0 0 10px red;
            }
            50% {
              box-shadow: inset 0 0 30px red, 0 0 30px red;
            }
            100% {
              box-shadow: inset 0 0 10px red, 0 0 10px red;
            }
          }
        `}
      </style>

      {topLevelAlert && (
        <div
          style={{
            position: 'absolute',
            height: '100vh',
            width: '100vw',
            zIndex: 1,
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: showPulse ? 'borderPulse 1.5s ease-in-out' : 'none',
          }}
        >
          {showPulse && (
            <div
              style={{
                width: '150px',
                height: '150px',
                background: 'red',
                display: 'flex',
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                borderRadius: '50%',
                animation: 'pulse 1.5s ease-in-out',
              }}

            > <img src='./warning3.png' height="100" />
              Está area é nivel {currentGridLevel}
            </div>
          )}
        </div >
      )}
    </>
  );
};
