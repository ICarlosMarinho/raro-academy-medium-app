import React, { FC, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { formataData } from "../../helpers/";
import { deleteArticle, getMyArticles } from "../../services";
import { Message } from "../Message";
import { ComponentProps } from "./ArticleThumbnail.model";

export const ArticleThumbnail: FC<ComponentProps> = ({ article, setArticles }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<RequestError>({ message: "", hasError: false });

  const getHandleClick = (edit: boolean = false) => {
    return () => {
      navigate(`/artigo${edit ? "/edit" : ""}/${article.id}`);
    };
  };

  const handleDeleteClick = () => {
    if (!deleteClicked) {
      setDeleteClicked(true);
    } else {
      setDeleteClicked(false);
      setLoading(true);
      setError({ message: "", hasError: false });

      deleteArticle(article.id)
        .then(() => {
          return getMyArticles().then((result) => {
            setArticles(result);
            setLoading(false);
          });
        })
        .catch((err) => {
          setError({ message: err.message, hasError: true });
          setLoading(false);
        });
    }
  };

  const renderEditButton = () => {
    return location.pathname === "/artigos" ? (
      <>
        <button
          onClick={getHandleClick(true)}
          className={`
            hover:bg-blue-400 bg-blue-300 text-white
            delay-100 duration-100
            rounded-full py-1 px-2 text-xs
            `}>
          Editar
        </button>
        <button
          disabled={loading}
          onClick={handleDeleteClick}
          className={`
            ${deleteClicked ? "bg-red-400" : "bg-red-300"} text-white
            delay-100 duration-100
            rounded-full py-1 px-2 text-xs
            `}>
          {deleteClicked ? "Confirmar" : "Deletar"}
        </button>
      </>
    ) : null;
  };

  const renderError = () => {
    return error.hasError ? <Message variant="error">{error.message}</Message> : null;
  };

  const renderLoading = () => {
    return loading ? <Message variant="info">Carregando...</Message> : null;
  };

  return (
    <div className="flex flex-col w-2/3 mt-5">
      <header className="flex flex-row gap-3 items-center hover:cursor-pointer" onClick={getHandleClick()}>
        <img src={article.autor.avatar} className="rounded-full" style={{ width: "30px", height: "30px" }} />
        <div>{article.autor.nome}</div>
        <div className="text-sm text-gray-500">{formataData(article.dataPublicacao)}</div>
      </header>
      <div className="grid grid-cols-4 gap-3 hover:cursor-pointer" onClick={getHandleClick()}>
        <div className="col-span-3 flex flex-col">
          <div className="font-bold text-lg pt-3">{article.titulo}</div>
          <div className="font-light pt-2 text-base text-gray-600">{article.resumo}</div>
        </div>
        <div className="flex items-center h-[100px]">
          <img className="mt-10" src={article.imagem} alt={`imagem-do-artigo-${article.titulo}`} />
        </div>
      </div>
      <footer className="flex flex-row pt-7 gap-3 items-center">
        <div className="text-gray-500 text-xs my-1 hover:cursor-pointer" onClick={getHandleClick()}>
          {article.tempoDeLeitura ? `${article.tempoDeLeitura} de leitura` : ""}
        </div>
        {renderEditButton()}
      </footer>
      {renderError()}
      {renderLoading()}
      <hr className="mt-5" />
    </div>
  );
};
