import { Expand } from '../icons/Expand';

export const ButtonExpand = () => {
    const toggleFullScreen = () => {
        const el = document.documentElement;
        if (!document.fullscreenElement) {
          el.requestFullscreen?.();
        } else {
          document.exitFullscreen?.();
        }
      };
    return (
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
    )
}