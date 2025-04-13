import { useGame } from '../context/GameContext';
import { ButtonExpand } from './ButtonExpand';
import FoundModal from './FoundModal';
import { TopLevelAlert } from './TopLevelAlert'
import WelcomeModal from './WelcomeModal'
import { DistanceTraveledBar } from './DistanceTraveledBar'

const UIBottom = ({ children }) => {
  return <div style={{
    position: 'fixed',
    bottom: 0,
    right: 0,
    width: '100%',
    color: 'black',
    zIndex: 199,
    height: '5px',
    fontSize: '16px',
  }}>
    {children}
  </div>
}

const ShowMoviment = ({ characterAttr, distanceRef, randomRef }) => {
  return <div style={{
    position: 'fixed',
    bottom: 10,
    right: 10,
    width: '70px',
    height: '50px',
    color: 'black',
    fontSize: '10px ',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'end',
  }}>
    <div>{`E: ${randomRef.current}`}</div>
    <div>{`D: ${Math.floor(distanceRef.current)}`}</div>
    {`y: ${Math.floor(characterAttr.position.y)} x: ${Math.floor(characterAttr.position.x)}`}
  </div>
}

export const UI = () => {
  const { modaStartOpen, setModaStart, distanceRef, characterAttr, randomRef, topLevelAlert, windowSize, fullBar } = useGame()


  return (
    <>
      <ButtonExpand />
      <WelcomeModal open={modaStartOpen} onClose={() => setModaStart(false)} />
      <FoundModal />
      <TopLevelAlert topLevelAlert={topLevelAlert} />
      <ShowMoviment characterAttr={characterAttr} distanceRef={distanceRef} randomRef={randomRef} />
      <UIBottom>

        <DistanceTraveledBar
          distanceRef={distanceRef}
          windowSize={windowSize}
          randomRef={randomRef}
          fullBar={fullBar}
        />
      </UIBottom>
    </>
  )
}