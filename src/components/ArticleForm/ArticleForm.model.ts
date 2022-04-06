export interface ComponentProps {
  article: Article | null;
  onSubmit?: (article: Article) => void;
}
