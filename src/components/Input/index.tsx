import React, { HTMLInputTypeAttribute, InputHTMLAttributes, TextareaHTMLAttributes } from "react";

export type InputProps = {
  id: string;
  label: string;
  type: HTMLInputTypeAttribute | "textarea";
};

export const Input: React.FC<
  InputProps & (InputHTMLAttributes<HTMLInputElement> | TextareaHTMLAttributes<HTMLTextAreaElement>)
> = ({ id, label, type, ...rest }) => {
  const inputClassNames = `
    rounded-lg border border-gray-300 px-4 py-2 w-full
    block w-full p-3 mt-2
    text-gray-700 bg-gray-100 focus:bg-gray-150 focus:shadow-inner
    appearance-none focus:outline-none
  `;

  return (
    <>
      <label htmlFor={id} className="block mt-2 text-xs font-semibold text-gray-600 uppercase">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          rows={2}
          className={inputClassNames}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={id}
          type={type}
          className={`${inputClassNames} resize-none`}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
    </>
  );
};
