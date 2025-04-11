import { useGame } from '../context/GameContext';
import { useEffect, useState } from 'react';
import { vegetation } from './vegetation'
import { getRandom } from '../utils/random'

const createVegetation = (x, y) => {

  return [{
    ...vegetation[1],
    position: {
      x: getRandom(0, x),
      y: getRandom(0, y)
    }
  },
  {
    ...vegetation[2],
    position: {
      x: getRandom(0, x),
      y: getRandom(0, y)
    }
  },
  {
    ...vegetation[3],
    position: {
      x: getRandom(0, x),
      y: getRandom(0, y)
    }
  },
  {
    ...vegetation[4],
    position: {
      x: getRandom(0, x),
      y: getRandom(0, y)
    }
  },
  {
    ...vegetation[5],
    position: {
      x: getRandom(0, x),
      y: getRandom(0, y)
    }
  },
  {
    ...vegetation[6],
    position: {
      x: getRandom(0, x),
      y: getRandom(0, y)
    }
  },
  {
    ...vegetation[5],
    position: {
      x: getRandom(0, x),
      y: getRandom(0, y)
    }
  },
  {
    ...vegetation[1],
    position: {
      x: getRandom(0, x),
      y: getRandom(0, y)
    }
  },
  {
    ...vegetation[1],
    position: {
      x: getRandom(0, x),
      y: getRandom(0, y)
    }
  },
  {
    ...vegetation[1],
    position: {
      x: getRandom(0, x),
      y: getRandom(0, y)
    }
  },
  {
    ...vegetation[0],
    position: {
      x: getRandom(0, x),
      y: getRandom(0, y)
    }
  },
  {
    ...vegetation[0],
    position: {
      x: getRandom(0, x),
      y: getRandom(0, y)
    }
  },
  {
    ...vegetation[0],
    position: {
      x: getRandom(0, x),
      y: getRandom(0, y)
    }
  },
  {
    ...vegetation[1],
    position: {
      x: getRandom(0, x),
      y: getRandom(0, y)
    }
  }
  ]
}

export default function SceneLayer() {
  const { characterAttr } = useGame();
  const { position } = characterAttr;
  const [v, setV] = useState([]);
  const [viewport, setViewport] = useState({ width: 1, height: 1 });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {

      const updateViewport = () => {
        setViewport({ width: window.innerWidth, height: window.innerHeight });
        setReady(true);
      };
      setV(createVegetation(window.innerWidth - 50, window.innerHeight - 50))
      updateViewport(); // chamada inicial
      window.addEventListener('resize', updateViewport);
      return () => window.removeEventListener('resize', updateViewport);
    }

  }, []);

  const isMobile = viewport.height > viewport.width;

  if (!ready) return null;

  const ajust = (obsPosition, obs) => {
    const obsBaseY = obsPosition + (obs.height - obs.nevative);
    return position.y > obsBaseY ? 2 : 20;
  }

  return v
    .sort((a, b) => a.position.y - b.position.y)
    .map((obs, idx) => {
      const isInFront = isMobile ? ajust(obs.position.y, obs) : ajust(obs.position.x, obs);

      const left = `${(obs.position.x)}px`;
      const top = `${(obs.position.y)}px`;

      return (
        <div key={idx} style={{ position: 'absolute', left, top }}>
          {/* sombra */}
          <div
            style={{
              position: 'absolute',
              top: obs.height - obs.height / 6,
              left: 0,
              width: obs.width,
              height: obs.height / 4,
              background: 'rgba(0, 0, 0, 0.2)',
              borderRadius: '50%',
              filter: 'blur(3px)',
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
