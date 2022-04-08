import { Dispatch, FC, FormEvent, SetStateAction, useContext, useEffect, useState } from "react";
import { Button } from "../Button";
import { Input } from "../Input";
import { RitchTextEditor } from "../RitchTextEditor";
import { ComponentProps } from "./ArticleForm.model";
import { getBase64 } from "../../helpers";
import { Message } from "../Message";
import { RequestContext } from "../../states/RequestProvider";

export const ArticleForm: FC<ComponentProps> = ({ article, onSubmit }) => {
  const { requestState } = useContext(RequestContext);
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [resumo, setResumo] = useState("");
  const [imagem, setImagem] = useState("");
  const [error, setError] = useState({ message: "", hasError: false });

  useEffect(() => {
    setTitulo(article?.titulo || "");
    setConteudo(article?.conteudo || "");
    setResumo(article?.resumo || "");
    setImagem(article?.imagem || "");
  }, [article]);

  const getHandleChange = (setValue: Dispatch<SetStateAction<string>>) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.id === "imagem" && event.target.files) {
        getBase64(event.target.files[0])
          .then((result) => setValue(result))
          .catch((_error) => {
            setError({ message: "Não foi possível carregar a imagem", hasError: true });
          });
      } else {
        setValue(event.target.value);
      }
    };
  };

  const renderError = () => {
    return error.hasError ? <Message variant="error">{error.message}</Message> : null;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (onSubmit) {
      const articleToSubmit = { ...article, titulo, conteudo, resumo, imagem } as Article;

      onSubmit(articleToSubmit);
    }
  };

  return (
    <div className="grid min-h-screen mx-10 ">
      <div>
        <h1 className="text-xl font-semibold">
          Hello there 👋,&nbsp;
          <span className="font-normal">please fill in your information to continue</span>
        </h1>
        <form className="mt-6" onSubmit={handleSubmit}>
          <Input
            placeholder="Digite aqui o título"
            type="text"
            id="titulo"
            label="Titulo"
            required
            value={titulo}
            onChange={getHandleChange(setTitulo)}
          />
          <Input
            placeholder="Breve resumo do artigo"
            type="textarea"
            id="resumo"
            label="Resumo"
            required
            value={resumo}
            onChange={getHandleChange(setResumo)}
          />
          <Input
            placeholder="Imagem do artigo"
            type="file"
            id="imagem"
            label="Banner"
            accept="image/*"
            required
            onChange={getHandleChange(setImagem)}
          />

          <RitchTextEditor label="Conteúdo" id="conteudo" value={conteudo} onChange={setConteudo} />

          <Button type="submit" disabled={requestState.loading}>
            Salvar
          </Button>
          {renderError()}
        </form>
      </div>
    </div>
  );
};
