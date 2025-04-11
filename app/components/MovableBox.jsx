import { useEffect, useRef } from 'react';

import { useGame } from '../context/GameContext';

export default function MovableBox() {
  const {
    frame, setFrame,
    characterAttr, setCharacterAttr,
    randomRef,
    containerRef,
    targetRef,
    isMouseDown,
    distanceRef,
    setFoundOpen,
    foundOpen,
    lastPositionRef,
    handleResize
  } = useGame();
  const { sprite } = characterAttr
  const isClient = typeof window !== 'undefined';
  const accumulatorRef = useRef(0);
  const movingRef = useRef(false);

  // Posição inicial
  useEffect(() => {
    if (!isClient) return;
    const x = window.innerWidth / 2 - sprite.boxSize / 2;
    const y = window.innerHeight - sprite.boxSize;
    setCharacterAttr((prev) => ({
      ...prev,
      position: { x, y },
    }));
    lastPositionRef.current = { x, y };
  }, []);

  // Atualiza última posição
  useEffect(() => {
    lastPositionRef.current = characterAttr.position;
  }, [characterAttr.position]);

  // Responsividade
  useEffect(() => {
    if (!isClient) return;
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  const getDirection = (dx, dy, current) => {
    if (Math.abs(dx) > Math.abs(dy)) return dx > 0 ? 'right' : 'left';
    if (dy !== 0) return dy > 0 ? 'down' : 'up';
    return current;
  };

  const updateTarget = (clientX, clientY) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width - sprite.boxSize, clientX - rect.left - sprite.boxSize / 2));
    const y = Math.max(0, Math.min(rect.height - sprite.boxSize, clientY - rect.top - sprite.boxSize / 2));
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

    const handleStop = () => {
      isMouseDown.current = false;
      targetRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleStop);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleStop);

    let rafMove, rafFrame;

    const moveLoop = () => {
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

          if (dist > sprite.speed) {
            dx = (dx / dist) * sprite.speed;
            dy = (dy / dist) * sprite.speed;
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
            if (distanceRef.current > randomRef.current) {
              setFoundOpen(true);
              targetRef.current = null;
              isMouseDown.current = false;
              return { ...prev, position: { x, y } };
            }

            const newDir = getDirection(dx, dy, prev.direction);
            movingRef.current = true;
            return {
              ...prev,
              position: { x, y },
              direction: newDir,
            };
          }
        }

        movingRef.current = false;
        return prev;
      });

      rafMove = requestAnimationFrame(moveLoop);
    };

    const frameLoop = () => {
      if (movingRef.current) {
        accumulatorRef.current += 1;
        if (accumulatorRef.current >= 15) {
          setFrame((f) => (f + 1) % sprite.frameCount);
          accumulatorRef.current = 0;
        }
      } else {
        setFrame(0);
      }

      rafFrame = requestAnimationFrame(frameLoop);
    };

    rafMove = requestAnimationFrame(moveLoop);
    rafFrame = requestAnimationFrame(frameLoop);

    return () => {
      cancelAnimationFrame(rafMove);
      cancelAnimationFrame(rafFrame);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleStop);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleStop);
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
        backgroundSize: '100px 100px',
        touchAction: 'none',
        overflow: 'hidden',
        zIndex: 20,
      }}
    >
      <div
        style={{
          width: sprite.boxSize,
          height: sprite.boxSize,
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
            width: sprite.boxSize * 0.6,
            height: 6,
            backgroundColor: 'rgba(0, 0, 0, 0.25)',
            borderRadius: '50%',
            zIndex: 1,
          }}
        />
        {/* sprite */}
        <div
          style={{
            width: sprite.boxSize,
            height: sprite.boxSize,
            imageRendering: 'pixelated',
            backgroundImage: `url(${sprite.img})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: `${sprite.height * sprite.frameCount}px ${sprite.height * 4}px`,
            backgroundPosition: `-${frame * sprite.height}px -${characterAttr.directionRowMap[characterAttr.direction] * sprite.height}px`,
            zIndex: 2,
            position: 'relative',
          }}
        />
      </div>
    </div>
  );
}
