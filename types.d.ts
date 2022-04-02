interface Article {
  id: number;
  imagem: string;
  titulo: string;
  resumo: string;
  dataPublicacao: Date;
  tempoLeitura?: string;
  autor: Author;
}

interface Author {
  id: number;
  nome: string;
  avatar: string;
}
