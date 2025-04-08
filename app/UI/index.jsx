import { useEffect } from 'react';
import { ButtonExpand } from './ButtonExpand';


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

const DistanceTraveledBar = ({distanceTraveled}) => {
  let width = (distanceTraveled.current / 10000) * 100

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

export const UI = (props) => {

  return (
    <>
      <ButtonExpand />
      <UIBottom>
        <DistanceTraveledBar 
        distanceTraveled={props.distanceTraveled}
        resetDistanceTraveled={props.resetDistanceTraveled}
        random={props.random}
        />
      </UIBottom>
    </>
  )
}