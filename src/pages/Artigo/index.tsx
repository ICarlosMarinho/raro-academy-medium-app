import faker from "@faker-js/faker";
import { useState, useEffect } from "react";
import { ArticleView } from "../../components/ArticleView";

export const ArtigoPage = () => {
  const [article, setArticle] = useState<string>("");
  const [autor] = useState({
    nome: faker.name.firstName(),
    avatar: faker.image.avatar()
  });
  const [dataPublicacao] = useState(new Date());

  useEffect(() => {
    async function loadArticle() {
      const response = await fetch("/article.md");
      const article = await response.text();
      setArticle(article);
    }

    loadArticle();
  }, []);

  return (
    <div className="m-10">
      <ArticleView article={article} autor={autor} dataPublicacao={dataPublicacao} tempoLeitura={"10min"} />
    </div>
  );
};
