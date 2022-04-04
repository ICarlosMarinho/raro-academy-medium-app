import { useEffect, useState } from "react";
import { ArticleList } from "../../components/ArticleList";
import { geraArtigos } from "../../stories/helpers/gerador-artigos";

export const ArtigosPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    setArticles(geraArtigos(10));
  }, []);

  return (
    <div className="my-30">
      <ArticleList articles={articles} />
    </div>
  );
};
