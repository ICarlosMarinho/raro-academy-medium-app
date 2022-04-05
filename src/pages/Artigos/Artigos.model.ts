export interface ComponentProps {
  request: (titulo?: string) => Promise<Article[]>;
}
