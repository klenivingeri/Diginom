import { toggleFullScreen } from '../utils/fullScreen'
import { useGame } from '../context/GameContext';


export default function WelcomeModal({ open, onClose }) {
  const { resetDistance } = useGame();
  if (!open) return null;

  const handleOnClose = () => {
    //toggleFullScreen()
    resetDistance()
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        className="rounded-2xl shadow-lg pb-10 w-80 text-center relative"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="flex flex-1 justify-center relative z-50">
          <img src="/logo.png" height={200} width={200} />
        </div>
        <div className="flex flex-1 justify-center absolute left-[0px] top-[-60px] z-30 -scale-x-100">
          <img src="/diginom/BeelzemonBlastMode.webp" className="-scale-x-100" width={110} />
        </div>
        <div className="flex flex-1 justify-center absolute right-[60px] top-[-130px] z-60 ">
          <img src="/diginom/Cherubimon_29_vg.webp" width={200} />
        </div>

        <div className="flex flex-1 justify-center absolute right-[-20px] top-[-80px] z-60 -scale-x-100">
          <img src="/diginom/WarGarurumon.webp" width={180} />
        </div>

        <button
          onClick={handleOnClose}
          className="bg-gradient-to-b from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-lg hover:brightness-110 transition mt-8 border-b-[6px] border-orange-700 shadow-md font-bold"
        >
          Entrar
        </button>

      </div>
    </div>

  );
}