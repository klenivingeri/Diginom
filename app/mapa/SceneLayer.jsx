import { useGame } from '../context/GameContext';
import { useEffect, useState } from 'react';

const obstacles = [
  { position: { x: 300, y: 425 }, width: 20, height: 20, img: '/planta.png', type: 'arvore', nevative: 32 },
];

export default function SceneLayer() {
  const { characterAttr } = useGame();
  const { position } = characterAttr;

  const [viewport, setViewport] = useState({ width: 1, height: 1 });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const updateViewport = () => {
        setViewport({ width: window.innerWidth, height: window.innerHeight });
        setReady(true);
      };

      updateViewport(); // chamada inicial
      window.addEventListener('resize', updateViewport);
      return () => window.removeEventListener('resize', updateViewport);
    }
  }, []);

  if (!ready) return null;

  const isMobile = viewport.height > viewport.width;

  const ajust = (obsPosition, obs) => {
    const obsBaseY = obsPosition + (obs.height - obs.nevative);
    return position.y > obsBaseY ? 2 : 20;
  }

  return obstacles.map((obs, idx) => {
    const isInFront = isMobile ? ajust(obs.position.y, obs) : ajust(obs.position.x, obs)
    const visualX = isMobile ? obs.position.x : obs.position.y;
    const visualY = isMobile ? obs.position.y : obs.position.x;

    const left = `${(visualX / viewport.width) * 100}vw`;
    const top = `${(visualY / viewport.height) * 100}vh`;
    return (
      <img
        key={idx}
        src={obs.img}
        alt=""
        style={{
          position: 'absolute',
          left,
          top,
          width: obs.width,
          height: obs.height,
          zIndex: isInFront,
          pointerEvents: 'none',
        }}
      />
    );
  });
}
