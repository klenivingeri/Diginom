import { useEffect, useRef } from 'react';
import spriteSrc from '/chxk2csydkh81.png';
import { useGame } from '../context/GameContext';

const SPRITE_SIZE = 32;
const FRAME_COUNT = 4;
const BOX_SIZE = 30;
const SPEED = 4;

export default function MovableBox() {
  const {
    frame, setFrame,
    characterAttr, setCharacterAttr,
    random,
    containerRef,
    targetRef,
    isMouseDown,
    distanceRef,
    setFoundOpen,
    foundOpen,
  } = useGame();

  const isClient = typeof window !== 'undefined';
  const lastOrientationRef = useRef(
    isClient && window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
  );
  const lastPositionRef = useRef({ x: 0, y: 0 });

  // Posição inicial
  useEffect(() => {
    if (!isClient) return;
    const x = window.innerWidth / 2 - BOX_SIZE / 2;
    const y = window.innerHeight - BOX_SIZE;
    setCharacterAttr((prev) => ({
      ...prev,
      position: { x, y },
    }));
    lastPositionRef.current = { x, y };
  }, []);

  // Atualiza referência da última posição
  useEffect(() => {
    lastPositionRef.current = characterAttr.position;
  }, [characterAttr.position]);

  // Responsividade em rotação de tela
  useEffect(() => {
    if (!isClient) return;

    const handleResize = () => {
      const currentOrientation = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
      const was = lastOrientationRef.current;
      const pos = lastPositionRef.current;

      let newX = pos.x;
      let newY = pos.y;

      if (currentOrientation !== was) {
        newX = Math.min(window.innerWidth - BOX_SIZE, pos.y);
        newY = Math.min(window.innerHeight - BOX_SIZE, pos.x);
        lastOrientationRef.current = currentOrientation;
      } else {
        newX = Math.min(window.innerWidth - BOX_SIZE, pos.x);
        newY = Math.min(window.innerHeight - BOX_SIZE, pos.y);
      }

      setCharacterAttr((prev) => ({
        ...prev,
        position: { x: newX, y: newY },
      }));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setCharacterAttr]);

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

  const accumulatorRef = useRef(0);

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

    let raf = null;
    let animFrame = null;
    const movingRef = { current: false };

    const loop = () => {
      if (foundOpen) {
        targetRef.current = null;
        isMouseDown.current = false;
        return;
      }

      setCharacterAttr((prev) => {
        let { x, y } = prev.position;
        let dx = 0, dy = 0;
        let moved = false;

        if (targetRef.current) {
          dx = targetRef.current.x - x;
          dy = targetRef.current.y - y;
          const dist = Math.hypot(dx, dy);

          if (dist > SPEED) {
            dx = (dx / dist) * SPEED;
            dy = (dy / dist) * SPEED;
            x += dx;
            y += dy;
            moved = true;
          } else if (dist > 0) {
            x = targetRef.current.x;
            y = targetRef.current.y;
            moved = true;
          }

          if (moved) {
            distanceRef.current += Math.hypot(dx, dy);
            if (distanceRef.current > random) {
              setFoundOpen(true);
              targetRef.current = null;
              isMouseDown.current = false;
              return {
                ...prev,
                position: { x, y }
              };
            }

            const newDir = getDirection(dx, dy, prev.direction);
            movingRef.current = true; // ⬅️ AQUI
            return {
              ...prev,
              position: { x, y },
              direction: newDir,
            };
          }
        }

        movingRef.current = false; // ⬅️ E AQUI
        return prev;
      });

      raf = requestAnimationFrame(loop);
    };

    const animate = () => {
      if (movingRef.current) {
        accumulatorRef.current += 1;
        if (accumulatorRef.current >= 15) {
          setFrame((f) => (f + 1) % FRAME_COUNT);
          accumulatorRef.current = 0;
        }
      } else {
        setFrame(0);
      }

      animFrame = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(loop);
    animFrame = requestAnimationFrame(animate);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (animFrame) cancelAnimationFrame(animFrame);
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
        position: 'relative',
        background: 'url("/gramabase.png") repeat',
        backgroundSize: '100px 100px',
        touchAction: 'none',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: BOX_SIZE,
          height: BOX_SIZE,
          position: 'absolute',
          transform: `translate(${characterAttr.position.x}px, ${characterAttr.position.y}px)`,
          transition: 'transform 0.05s linear',
          zIndex: 3,
        }}
      >
        {/* sombra oval */}
        <div
          style={{
            position: 'absolute',
            bottom: -4,
            left: '50%',
            transform: 'translateX(-50%)',
            width: BOX_SIZE * 0.6,
            height: 6,
            backgroundColor: 'rgba(0, 0, 0, 0.25)',
            borderRadius: '50%',
            zIndex: 1,
          }}
        />
        {/* sprite */}
        <div
          style={{
            width: BOX_SIZE,
            height: BOX_SIZE,
            imageRendering: 'pixelated',
            backgroundImage: `url(${spriteSrc})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: `${SPRITE_SIZE * FRAME_COUNT}px ${SPRITE_SIZE * 4}px`,
            backgroundPosition: `-${frame * SPRITE_SIZE}px -${characterAttr.directionRowMap[characterAttr.direction] * SPRITE_SIZE}px`,
            zIndex: 2,
            position: 'relative',
          }}
        />
      </div>
    </div>
  );
}
