
import { useGame } from '../context/GameContext';
import { ButtonExpand } from './ButtonExpand';
import FoundModal from './FoundModal';

const UIBottom = ({children}) => {
  return <div style={{
    position: 'fixed',
    bottom: 0,
    right: 0,
    width: '100%',
    color: 'black',
    zIndex: 1000,
    height: '5px',
    fontSize: '16px',
  }}>
    {children}
  </div>
}

const DistanceTraveledBar = ({distanceRef}) => {
  let width = (distanceRef.current / 4000) * 100

  return <div style={{
    width: '100%',
    color: 'black',
    height: '5px',
  }}>
    <div style={{
      background: 'red',
      height: '10px',
      width: `${width}%`
    }}>

    </div>
  </div>
}

export const UI = () => {
  const { distanceRef ,foundOpen, setFoundOpen, resetDistance} =  useGame()
  return (
    <>
      <ButtonExpand />
      <FoundModal open={foundOpen} onClose={() => setFoundOpen(false)} resetDistance={resetDistance} />
      <UIBottom>
        <DistanceTraveledBar 
        distanceRef={distanceRef}
        />
      </UIBottom>
    </>
  )
}