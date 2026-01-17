import type { ButtonProps } from "./types";

export default function Button({ children, type = "button", onClick, className, ...rest }: ButtonProps) {
  return (
    <button
      className={`inline-block rounded-sm border border-primary bg-primary text-sm shadow-sm font-medium text-white hover:bg-transparent hover:text-primary disabled:opacity-50 disabled:pointer-events-none ${className}`}
      type={type}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
