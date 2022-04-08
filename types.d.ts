interface Article {
  id: number;
  imagem: string;
  titulo: string;
  resumo: string;
  conteudo?: string;
  dataPublicacao: Date = new Date();
  dataAtualizacao: Date = new Date();
  tempoDeLeitura?: string;
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
  userName: string;
}

interface RequestError {
  message: string;
  hasError: boolean;
}
