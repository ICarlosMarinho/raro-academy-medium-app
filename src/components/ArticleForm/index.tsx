import { Button } from "../Button";
import { Input } from "../Input";
import { RitchTextEditor } from "../RitchTextEditor";

export const ArticleForm = () => {
  return (
    <div className="grid min-h-screen mx-10 ">
      <div>
        <h1 className="text-xl font-semibold">
          Hello there 👋,&nbsp;
          <span className="font-normal">please fill in your information to continue</span>
        </h1>
        <form className="mt-6">
          <Input placeholder="Digite aqui o título" type="text" id="titulo" label="Titulo" required />
          <Input placeholder="Breve rewsumo do artigo" type="textarea" id="resumo" label="Resumo" required />

          <Input placeholder="Breve rewsumo do artigo" type="file" id="image" label="Banner" required />

          <RitchTextEditor label="Conteúdo" name="conteudo" />

          <Button type="submit">Salvar</Button>
        </form>
      </div>
    </div>
  );
};
