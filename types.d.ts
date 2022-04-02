interface Article {
  id: number;
  imagem: string;
  titulo: string;
  resumo: string;
  conteudo?: string;
  dataPublicacao: Date = new Date();
  tempoLeitura: string = `Mais de ${Math.random() * 10 + 1} minutos`;
  autor: Author;
}

interface Author {
  id: number;
  nome: string;
  login?: string;
  senha?: string;
  avatar: string;
}

interface TokenData {
  userId: number;
  token: string;
}
