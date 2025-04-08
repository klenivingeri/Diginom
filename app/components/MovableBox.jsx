import { useEffect, useRef, useState } from 'react';
import { getRandom } from '../utils/random';
import spriteSrc from '/chxk2csydkh81.png';
import { UI } from '../UI/index';

const SPRITE_SIZE = 32;
const FRAME_COUNT = 4;
const BOX_SIZE = 30;
const SPEED = 4;

const directionRowMap = {
  down: 0,
  left: 1,
  right: 2,
  up: 3,
};

export default function MovableBox() {
  const [frame, setFrame] = useState(0);
  const [direction, setDirection] = useState('up');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [random, setRandom] = useState(getRandom());

  const containerRef = useRef(null);
  const targetRef = useRef(null);
  const isMouseDown = useRef(false);
  const directionRef = useRef('up');
  const distanceRef = useRef(0);

  useEffect(() => {
    const x = window.innerWidth / 2 - BOX_SIZE / 2;
    const y = window.innerHeight - BOX_SIZE;
    setPosition({ x, y });
  }, []);

  const resetDistance = () => {
    distanceRef.current = 0;
    setRandom(getRandom());
  };

  const getDirection = (dx, dy, current) => {
    if (Math.abs(dx) > Math.abs(dy)) return dx > 0 ? 'right' : 'left';
    if (dy !== 0) return dy > 0 ? 'down' : 'up';
    return current;
  };

  const updateTarget = (clientX, clientY) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width - BOX_SIZE, clientX - rect.left - BOX_SIZE / 2));
    const y = Math.max(0, Math.min(rect.height - BOX_SIZE, clientY - rect.top - BOX_SIZE / 2));
    targetRef.current = { x, y };
  };

  const handleStart = (clientX, clientY) => {
    isMouseDown.current = true;
    updateTarget(clientX, clientY);
  };

  const handleMouseDown = (e) => {
    if (e.target.tagName === 'BUTTON') return;
    handleStart(e.clientX, e.clientY);
  };

  const handleTouchStart = (e) => {
    if (e.target.tagName === 'BUTTON') return;
    handleStart(e.touches[0].clientX, e.touches[0].clientY);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isMouseDown.current) updateTarget(e.clientX, e.clientY);
    };
    const handleTouchMove = (e) => {
      if (isMouseDown.current) updateTarget(e.touches[0].clientX, e.touches[0].clientY);
    };
    const stop = () => {
      isMouseDown.current = false;
      targetRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', stop);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', stop);

    let raf;
    let accumulator = 0;

    const loop = () => {
      setPosition((prev) => {
        let { x, y } = prev;
        let dx = 0, dy = 0;

        if (targetRef.current) {
          dx = targetRef.current.x - x;
          dy = targetRef.current.y - y;
          const dist = Math.hypot(dx, dy);

          if (dist > SPEED) {
            dx = (dx / dist) * SPEED;
            dy = (dy / dist) * SPEED;
            x += dx;
            y += dy;
          } else {
            dx = targetRef.current.x - x;
            dy = targetRef.current.y - y;
            x = targetRef.current.x;
            y = targetRef.current.y;
          }

          const moved = Math.hypot(dx, dy);
          if (moved > 0) {
            distanceRef.current += moved;
            accumulator += moved;

            if (distanceRef.current > random) {
              alert('encontrou algo !!');
              resetDistance();
              targetRef.current = null; // 🛑 Para o movimento
              return { x, y };
            }

            const newDir = getDirection(dx, dy, directionRef.current);
            if (newDir !== directionRef.current) {
              directionRef.current = newDir;
              setDirection(newDir);
            }

            if (accumulator >= 20) {
              setFrame((f) => (f + 1) % FRAME_COUNT);
              accumulator = 0;
            }
          }
        }

        return { x, y };
      });

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', stop);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', stop);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      style={{
        width: '100vw',
        height: '100vh',
        border: '2px solid red',
        position: 'relative',
        backgroundColor: '#e5e5e5',
        touchAction: 'none',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: BOX_SIZE,
          height: BOX_SIZE,
          backgroundImage: `url(${spriteSrc})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: `${SPRITE_SIZE * FRAME_COUNT}px ${SPRITE_SIZE * 4}px`,
          backgroundPosition: `-${frame * SPRITE_SIZE}px -${directionRowMap[directionRef.current] * SPRITE_SIZE}px`,
          position: 'absolute',
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: 'transform 0.05s linear',
        }}
      />
      <UI
        distanceTraveled={distanceRef}
        resetDistanceTraveled={resetDistance}
        random={random}
      />
    </div>
  );
}
