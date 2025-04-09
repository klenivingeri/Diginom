import { useGame } from '../context/GameContext';

const obstacles = [
  {
    position: { x: 60, y: 720 },
    width: 20,
    height: 20,
    img: '/planta.png',
    type: 'arvore'
  },  {
    position: { x: 140, y: 452 },
    width: 20,
    height: 20,
    img: '/planta.png',
    type: 'arvore'
  },  {
    position: { x: 200, y: 123 },
    width: 20,
    height: 20,
    img: '/planta.png',
    type: 'arvore'
  },  {
    position: { x: 60, y: 315 },
    width: 20,
    height: 20,
    img: '/planta.png',
    type: 'arvore'
  },  {
    position: { x: 120, y: 642 },
    width: 20,
    height: 20,
    img: '/planta.png',
    type: 'arvore'
  },  {
    position: { x: 426, y: 23 },
    width: 20,
    height: 20,
    img: '/planta.png',
    type: 'arvore'
  },  {
    position: { x: 300, y: 425 },
    width: 20,
    height: 20,
    img: '/planta.png',
    type: 'arvore'
  },  {
    position: { x: 60, y: 720 },
    width: 20,
    height: 20,
    img: '/planta.png',
    type: 'arvore'
  },  {
    position: { x: 60, y: 720 },
    width: 20,
    height: 20,
    img: '/planta.png',
    type: 'arvore'
  },  {
    position: { x: 60, y: 720 },
    width: 20,
    height: 20,
    img: '/planta.png',
    type: 'arvore'
  },
];

export default function SceneLayer() {
  const { position } = useGame();

  return obstacles.map((obs, idx) => {
    const baseY = obs.position.y + (obs.height-32)
    const isInFront = position.y > baseY ? 2 : 20
    console.log('aaaa',position.y, baseY, isInFront)
    return (
      <img
        key={idx}
        src={obs.img}
        style={{
          position: 'absolute',
          left: obs.position.x,
          top: obs.position.y,
          width: obs.width,
          height: obs.height,
          zIndex: isInFront,
          pointerEvents: 'none',
        }}
      />
    );
  })};

