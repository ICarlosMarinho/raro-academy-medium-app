export type RitchTextEditorProps = {
  id: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;
};
