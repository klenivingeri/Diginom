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
      setTimeout(() => setShowPulse(false), 1000); // desaparece após 1s
      count++;
      if (count >= 3) clearInterval(interval); // executa 3 vezes
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
              opacity: 1;
            }
            50% {
              transform: scale(1.2);
              opacity: 0.5;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }

          @keyframes borderPulse {
            0% {
              box-shadow: inset 0 0 20px red, 0 0 20px red;
            }
            50% {
              box-shadow: inset 0 0 40px red, 0 0 40px red;
            }
            100% {
              box-shadow: inset 0 0 20px red, 0 0 20px red;
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
            animation: 'borderPulse 1s infinite',
          }}
        >
          {showPulse && (
            <div
              style={{
                width: '180px',
                height: '80px',
                display: 'flex',
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                animation: 'pulse 2s ease-in-out',
                color: 'red',
                fontSize: '8px',
                zIndex: 20,
              }}

            > <img src='./warning3.png' height="100" />
              ESTÁ AREA É LV: {currentGridLevel}
            </div>
          )}
        </div>
      )}
    </>
  );
};
