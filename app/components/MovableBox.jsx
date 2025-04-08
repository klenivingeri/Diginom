import { useEffect, useRef, useState } from 'react';
import { Expand } from '../icons/Expand';

export default function MovableBox() {
  const containerRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const targetPosition = useRef(null);
  const isMouseDown = useRef(false);
  const keys = useRef({
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
  });

  const speed = 4;
  const boxSize = 50;

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
    const handleKeyDown = (e) => {
      if (e.key in keys.current) {
        keys.current[e.key] = true;
        targetPosition.current = null;
      }
    };

    const handleKeyUp = (e) => {
      if (e.key in keys.current) {
        keys.current[e.key] = false;
      }
    };

    const handleMouseMove = (e) => {
      if (!isMouseDown.current) return;
      updateTargetFromEvent(e.clientX, e.clientY);
    };

    const handleTouchMove = (e) => {
      if (!isMouseDown.current) return;
      updateTargetFromEvent(e.touches[0].clientX, e.touches[0].clientY);
    };

    const stopMove = () => {
      isMouseDown.current = false;
      targetPosition.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', stopMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', stopMove);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    let animationFrameId;

    const update = () => {
      setPosition((prev) => {
        let newX = prev.x;
        let newY = prev.y;

        const isUsingKeyboard =
          keys.current.ArrowUp ||
          keys.current.ArrowDown ||
          keys.current.ArrowLeft ||
          keys.current.ArrowRight;

        const maxX = containerRef.current?.clientWidth - boxSize || 0;
        const maxY = containerRef.current?.clientHeight - boxSize || 0;

        if (isUsingKeyboard) {
          if (keys.current.ArrowUp) newY = Math.max(0, newY - speed);
          if (keys.current.ArrowDown) newY = Math.min(maxY, newY + speed);
          if (keys.current.ArrowLeft) newX = Math.max(0, newX - speed);
          if (keys.current.ArrowRight) newX = Math.min(maxX, newX + speed);
        } else if (targetPosition.current) {
          const dx = targetPosition.current.x - newX;
          const dy = targetPosition.current.y - newY;
          const distance = Math.hypot(dx, dy);

          if (distance > speed) {
            newX += (dx / distance) * speed;
            newY += (dy / distance) * speed;
          } else {
            newX = targetPosition.current.x;
            newY = targetPosition.current.y;
          }
        }

        return { x: newX, y: newY };
      });

      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', stopMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', stopMove);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleStart = (clientX, clientY) => {
    isMouseDown.current = true;
    updateTargetFromEvent(clientX, clientY);
  };

  const handleMouseDown = (e) => {
    // evita ativar movimento se clicar no botão
    if (e.target.tagName === 'BUTTON') return;
    handleStart(e.clientX, e.clientY);
  };

  const handleTouchStart = (e) => {
    if (e.target.tagName === 'BUTTON') return;
    handleStart(e.touches[0].clientX, e.touches[0].clientY);
  };

  const toggleFullScreen = () => {
    const elem = containerRef.current;
    if (!elem) return;

    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch((err) =>
        console.error('Erro ao entrar em tela cheia:', err)
      );
    } else {
      document.exitFullscreen();
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
  {/* Botão dentro da área fullscreen */}
  <button
    onClick={toggleFullScreen}
    style={{
      position: 'absolute',
      top: 10,
      right: 10,
      color:'black',
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
      backgroundColor: 'red',
      position: 'absolute',
      transform: `translate(${position.x}px, ${position.y}px)`,
    }}
  />
</div>
  );
}
