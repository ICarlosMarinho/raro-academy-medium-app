export interface ComponentProps {
  article: Article | null;
  loading: boolean;
  onSubmit?: (article: Article) => void;
}
