import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { formataData } from "../../helpers/";

export const ArticleThumbnail: React.FC<Article> = ({
  id,
  imagem,
  titulo,
  resumo,
  dataPublicacao,
  tempoLeitura,
  autor
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getHandleClick = (edit: boolean = false) => {
    return () => {
      navigate(`/artigo${edit ? "/edit" : ""}/${id}`);
    };
  };

  return (
    <div className="flex flex-col w-2/3 mt-5">
      <header className="flex flex-row gap-3 items-center hover:cursor-pointer" onClick={getHandleClick()}>
        <img src={autor.avatar} className="rounded-full" style={{ width: "30px", height: "30px" }} />
        <div>{autor.nome}</div>
        <div className="text-sm text-gray-500">{formataData(dataPublicacao)}</div>
      </header>
      <div className="grid grid-cols-4 gap-3 hover:cursor-pointer" onClick={getHandleClick()}>
        <div className="col-span-3 flex flex-col">
          <div className="font-bold text-lg pt-3">{titulo}</div>
          <div className="font-light pt-2 text-base text-gray-600">{resumo}</div>
        </div>
        <div className="flex items-center h-[100px]">
          <img className="mt-10" src={imagem} alt={`imagem-do-artigo-${titulo}`} />
        </div>
      </div>
      <footer className="flex flex-row pt-7 gap-3 items-center">
        <div className="text-gray-500 text-xs my-1 hover:cursor-pointer" onClick={getHandleClick()}>
          {tempoLeitura} de leitura
        </div>
        {location.pathname === "/artigos" && (
          <button
            onClick={getHandleClick(true)}
            className={`
                hover:bg-blue-400 bg-blue-300 text-white
                delay-100 duration-100
                rounded-full py-1 px-2 text-xs
                `}>
            Editar
          </button>
        )}
      </footer>
      <hr className="mt-5" />
    </div>
  );
};
