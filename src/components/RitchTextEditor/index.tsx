import React from "react";
import { RitchTextEditorProps } from "./RitchTextEditor.type";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { getBase64 } from "../../helpers";

export const RitchTextEditor: React.FC<RitchTextEditorProps> = ({ label, id, onChange, value }) => {
  const mdParser = new MarkdownIt();

  const handleEditorChange = ({ html, text }: any) => {
    if (onChange) {
      onChange(text);
    }
  };

  return (
    <>
      <label htmlFor={id} className="block my-2 text-xs font-semibold text-gray-600 uppercase">
        {label}
      </label>
      <MdEditor
        style={{ height: "500px" }}
        renderHTML={(text) => mdParser.render(text)}
        value={value}
        onChange={handleEditorChange}
        onImageUpload={getBase64}
      />
    </>
  );
};
