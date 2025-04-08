import { useState } from 'react';
import { ExpandIn } from '../icons/ExpandIn';
import { ExpandOut } from '../icons/ExpandOut';
import {toggleFullScreen } from '../utils/fullScreen'

export const ButtonExpand = () => {
  const [isExpand, setIsExpand] = useState(false)
  const handleExpand = () =>{
    setIsExpand(!isExpand)
    toggleFullScreen()
  }
    return (
        <button
        onClick={handleExpand}
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
        {isExpand ? <ExpandIn /> : <ExpandOut/>}
      </button>
    )
}