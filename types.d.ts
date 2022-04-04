interface Article {
  id: number;
  imagem: string;
  titulo: string;
  resumo: string;
  conteudo?: string;
  dataPublicacao: Date = new Date();
  dataAtualizacao: Date = new Date();
  tempoLeitura: string = `Mais de ${Math.random() * 10 + 1} min`;
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

interface RequestError {
  message: string;
  hasError: boolean;
}
