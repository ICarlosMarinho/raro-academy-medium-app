import { Dispatch, FC, FormEvent, SetStateAction, useState } from "react";
import { Button } from "../Button";
import { Input } from "../Input";
import { RitchTextEditor } from "../RitchTextEditor";
import { ComponentProps } from "./ArticleForm.model";
import { getBase64 } from "../../helpers";
import { Message } from "../Message";

export const ArticleForm: FC<ComponentProps> = ({ article, onSubmit, loading }) => {
  const [titulo, setTitulo] = useState(article?.titulo || "");
  const [conteudo, setConteudo] = useState(article?.conteudo || "");
  const [resumo, setResumo] = useState(article?.resumo || "");
  const [imagem, setImagem] = useState(article?.imagem || "");
  const [error, setError] = useState<RequestError>({ message: "", hasError: false });

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

          <Button type="submit" disabled={loading}>
            {loading ? "Carregando..." : "Salvar"}
          </Button>
          {renderError()}
        </form>
      </div>
    </div>
  );
};
