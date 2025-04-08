import { useEffect, useRef, useState } from 'react';
import { Expand } from '../icons/Expand';
import spriteSrc from '/chxk2csydkh81.png';

const SPRITE_SIZE = 32;
const FRAME_COUNT = 4;

const directionRowMap = {
  down: 0,
  right: 2,
  left: 1,
  up: 3,
};

export default function MovableBox() {
  const [frame, setFrame] = useState(0);
  const [direction, setDirection] = useState('down');
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const containerRef = useRef(null);
  const targetPosition = useRef(null);
  const isMouseDown = useRef(false);

  const speed = 4;
  const boxSize = 30;

  const updateTargetFromEvent = (clientX, clientY) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const offsetY = clientY - rect.top;
    const maxX = containerRef.current.clientWidth - boxSize;
    const maxY = containerRef.current.clientHeight - boxSize;

    const x = Math.max(0, Math.min(maxX, offsetX - boxSize / 2));
    const y = Math.max(0, Math.min(maxY, offsetY - boxSize / 2));

    targetPosition.current = { x, y };
  };

  useEffect(() => {
    const getDirection = (dx, dy) => {
      if (Math.abs(dx) > Math.abs(dy)) {
        return dx > 0 ? 'right' : 'left';
      } else if (dy !== 0) {
        return dy > 0 ? 'down' : 'up';
      }
      return direction;
    };

    const handleMouseMove = (e) => {
      if (isMouseDown.current) updateTargetFromEvent(e.clientX, e.clientY);
    };

    const handleTouchMove = (e) => {
      if (isMouseDown.current) updateTargetFromEvent(e.touches[0].clientX, e.touches[0].clientY);
    };

    const stopMove = () => {
      isMouseDown.current = false;
      targetPosition.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', stopMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', stopMove);

    let animationFrameId;
    let moveAccumulator = 0;

    const update = () => {
      setPosition((prev) => {
        let { x, y } = prev;
        let dx = 0, dy = 0;

        if (targetPosition.current) {
          dx = targetPosition.current.x - x;
          dy = targetPosition.current.y - y;
          const distance = Math.hypot(dx, dy);

          if (distance > speed) {
            dx = (dx / distance) * speed;
            dy = (dy / distance) * speed;
            x += dx;
            y += dy;
          } else {
            dx = targetPosition.current.x - x;
            dy = targetPosition.current.y - y;
            x = targetPosition.current.x;
            y = targetPosition.current.y;
          }
        }

        const moved = Math.hypot(dx, dy);
        if (moved > 0) {
          moveAccumulator += moved;
          setDirection(getDirection(dx, dy));

          if (moveAccumulator >= 20) {
            setFrame((prev) => (prev + 1) % FRAME_COUNT);
            moveAccumulator = 0;
          }
        }

        return { x, y };
      });

      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', stopMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', stopMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [direction]);

  const handleStart = (clientX, clientY) => {
    isMouseDown.current = true;
    updateTargetFromEvent(clientX, clientY);
  };

  const handleMouseDown = (e) => {
    if (e.target.tagName === 'BUTTON') return;
    handleStart(e.clientX, e.clientY);
  };

  const handleTouchStart = (e) => {
    if (e.target.tagName === 'BUTTON') return;
    handleStart(e.touches[0].clientX, e.touches[0].clientY);
  };

  const toggleFullScreen = () => {
    const el = document.documentElement;
    if (!document.fullscreenElement) {
      el.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

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
      <button
        onClick={toggleFullScreen}
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          color: 'black',
          zIndex: 1000,
          padding: '10px 15px',
          fontSize: '16px',
        }}
      >
        <Expand />
      </button>

      <div
        style={{
          width: `${boxSize}px`,
          height: `${boxSize}px`,
          backgroundImage: `url(${spriteSrc})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: `${SPRITE_SIZE * FRAME_COUNT}px ${SPRITE_SIZE * 4}px`,
          backgroundPosition: `-${frame * SPRITE_SIZE}px -${directionRowMap[direction] * SPRITE_SIZE}px`,
          position: 'absolute',
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: 'transform 0.05s linear',
        }}
      />
    </div>
  );
}
