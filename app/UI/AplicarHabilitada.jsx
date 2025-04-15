import { useState, useEffect } from 'react';


export const AplicarHabilidades = ({ scale }) => {
  const habilidades = [
    { nome: './power/3klP.gif', size: 300, duracao: 1000 },
    { nome: './power/4s2J.gif', size: 350, duracao: 1000 },
    { nome: './power/YlW9.gif', size: 300, duracao: 1000 },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIndex((prev) => (prev + 1) % habilidades.length);
    }, habilidades[index].duracao);

    return () => clearTimeout(timeout);
  }, [index]);

  const atual = habilidades[index];

  return (
    <div className={`absolute inset-0 flex items-center justify-center pointer-events-none z-10 ${scale}`}>
      <img
        src={atual.nome}
        alt="poder"
        style={{ width: `${atual.size}px` }}
      />
    </div>
  );
};


export default AplicarHabilidades;
