import {toggleFullScreen} from '../utils/fullScreen'

export default function WelcomeModal({ open, onClose}) {
  if (!open) return null;
  
  const handleOnClose = () => {
    toggleFullScreen()
    onClose()
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"

    >
      <div
        className="backdrop-blur-sm rounded-2xl shadow-lg pb-10 w-80 text-center"
        onClick={(e) => e.stopPropagation()} // Evita fechar ao clicar no conteúdo
      >
        <div className='flex flex-1 justify-center'>
        <img src='/logo.png'  height={200} width={200} />
        
        </div>
        
        <button
          onClick={handleOnClose}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}