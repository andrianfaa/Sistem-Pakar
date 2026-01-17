import type { InputProps } from "./types";

/**
 * Input component
 *
 * @param props InputProps
 * @returns JSX.Element
 */
export default function Input({ id, name, label, className = "relative", inputClassName, ...rest }: InputProps) {
  return (
    <label htmlFor={id} className={className}>
      <span className="mt-0.5 w-full rounded border-gray-300 sm:text-sm">{label || "Label"}</span>

      <input
        id={id}
        name={name}
        className={`mt-0.5 w-full bg-white rounded border-gray-300 hover:border-primary focus:border-primary active:border-primary ring-0 shadow-sm sm:text-sm disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-gray-100 ${inputClassName}`}
        {...rest}
      />
    </label>
  );
}
