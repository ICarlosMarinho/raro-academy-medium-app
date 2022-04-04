import { faker } from "@faker-js/faker";

export const geraArtigos = (quantidade: number): Article[] => {
  return Array.from(new Array(quantidade)).map(
    (_, index) =>
      ({
        id: index,
        imagem: faker.image.imageUrl(),
        titulo: faker.lorem.sentence(),
        resumo: faker.lorem.paragraph(),
        dataPublicacao: faker.date.past(),
        dataAtualizacao: faker.date.past(),
        autor: {
          id: index,
          nome: faker.name.firstName(),
          avatar: faker.image.avatar()
        }
      } as Article)
  );
};
