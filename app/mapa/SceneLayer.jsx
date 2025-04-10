import { useGame } from '../context/GameContext';
import { useEffect, useState } from 'react';
import { vegetation } from './vegetation'


const obstacles = [{
  ...vegetation[1],
  position: {
    x: 30,
    y: 700,
  }
},
{
  ...vegetation[2],
  position: {
    x: 340,
    y: 500,
  }
},
{
  ...vegetation[3],
  position: {
    x: 159,
    y: 450,
  }
},
{
  ...vegetation[4],
  position: {
    x: 56,
    y: 200,
  }
},
{
  ...vegetation[5],
  position: {
    x: 400,
    y: 327,
  }
},
{
  ...vegetation[6],
  position: {
    x: 289,
    y: 10,
  }
},
{
  ...vegetation[5],
  position: {
    x: 283,
    y: 450,
  }
},
{
  ...vegetation[1],
  position: {
    x: 10,
    y: 100,
  }
},
{
  ...vegetation[1],
  position: {
    x: 345,
    y: 300,
  }
},
{
  ...vegetation[1],
  position: {
    x: 40,
    y: 10,
  }
},
{
  ...vegetation[0],
  position: {
    x: 20,
    y: 720,
  }
},
{
  ...vegetation[0],
  position: {
    x: 100,
    y: 400,
  }
},
{
  ...vegetation[0],
  position: {
    x: 300,
    y: 20,
  }
},
{
  ...vegetation[1],
  position: {
    x: 190,
    y: 390,
  }
}
]


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
    const isInFront = isMobile ? ajust(obs.position.y, obs) : ajust(obs.position.x, obs);
    const visualX = isMobile ? obs.position.x : obs.position.y;
    const visualY = isMobile ? obs.position.y : obs.position.x;

    const left = `${(visualX / viewport.width) * 100}vw`;
    const top = `${(visualY / viewport.height) * 100}vh`;

    const shadowSize = obs.shadow || 10; // largura da sombra
    const shadowHeight = 4; // altura achatada

    return (
      <div key={idx} style={{ position: 'absolute', left, top }}>
        {/* sombra */}
        <div
          style={{
            position: 'absolute',
            top: obs.height - 4, // posiciona logo abaixo da imagem
            left: 0,
            width: obs.width,
            height: shadowHeight,
            background: 'rgba(0, 0, 0, 0.4)',
            borderRadius: '50%',
            filter: 'blur(1px)',
            zIndex: isInFront - 1,
          }}
        />
        {/* imagem */}
        <img
          src={obs.img}
          alt=""
          style={{
            width: obs.width,
            height: obs.height,
            zIndex: isInFront,
            pointerEvents: 'none',
            position: 'relative',
          }}
        />
      </div>
    );
  });
}
