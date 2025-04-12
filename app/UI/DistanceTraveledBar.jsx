import { useState, useEffect } from 'react'
export const DistanceTraveledBar = ({ distanceRef, windowSize, fullBar }) => {

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    console.log('aaaaaaaa', windowSize)
    const interval = setInterval(() => {
      const newWidth = Math.floor((distanceRef.current / fullBar) * 100);
      setProgress(newWidth <= 100 ? newWidth : 100);

    }, 50); // atualiza a cada 50ms (ou ajuste como preferir)

    return () => clearInterval(interval);
  }, [distanceRef, fullBar]);

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
        width: `${progress}%`,
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