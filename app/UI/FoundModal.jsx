import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { monstersMap1 } from '../monsters/monsterMap1'
import { AplicarHabilidades } from './AplicarHabilitada'

export default function FoundModal() {
  const { currentGridLevel, foundOpen, setFoundOpen, resetDistance, characterAttr, randomRef } = useGame();
  const [isItem, setIsItem] = useState(0)
  if (!foundOpen) return null;

  const handleOnClose = () => {
    resetDistance();
    setFoundOpen();
    setIsItem(Math.round(Math.random()))
  };


  return isItem
    ? (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div
          className="bg-white rounded-2xl shadow-lg p-6 w-80 text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-xl font-bold mb-4 text-black">Você encontrou algo!</h2>
          <p className="mb-2 text-black text-sm">
            Você está no <strong>nível {currentGridLevel}</strong> do mapa.
          </p>
          <p className="mb-6 text-sm text-black">Continue explorando para achar mais surpresas.</p>
          <button
            onClick={handleOnClose}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Fechar
          </button>
        </div>
      </div>
    )
    : (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className='bg-white rounded-2xl shadow-lg p-6 w-80 text-center'>
          <div id="combate" className=' flex bg-black' >
            <div className="relative w-full bg-gray-100 flex justify-between items-end px-4">

              <div className="relative flex w-full justify-center items-center align-middle" id="pet">
                <AplicarHabilidades scale="-scale-x-100" />

                <img
                  src={characterAttr.pet.sprite.img}
                  width={characterAttr.pet.width}
                  className={characterAttr.pet.sprite.rotate.pet ? '-scale-x-100' : ''}
                />
              </div>

              <div className="relative flex  w-full justify-center a" id="enemy">
                <AplicarHabilidades />
                <img
                  src={monstersMap1[currentGridLevel].sprite.img}
                  width={monstersMap1[currentGridLevel].width}
                  className={characterAttr.pet.sprite.rotate.emeny ? '-scale-x-100' : ''}
                />
              </div>
            </div>

          </div>
          <button
            onClick={handleOnClose}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Fechar
          </button>
        </div>

      </div>
    );;
}
