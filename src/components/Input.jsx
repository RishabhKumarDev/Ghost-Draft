import { forwardRef, useId } from "react";

const Input = forwardRef(function Input(
  {
    label,
    type = "text",
    placeholder = "Dude Write as the label says...",
    className = "",
    ...props
  },
  ref
) {
  const id = useId();

  return (
    <div>
      {label && (
        <label htmlFor={id} className={` inline-block mb-1 pl-1 text-white`}>
          {label}
        </label>
      )}

      <input
        type={type}
        id={id}
        className={`px-3 py-2 rounded-md bg-zinc-800 text-white placeholder-zinc-400 outline-none focus:shadow-[0_0_20px_rgba(251,191,36,0.3)] border border-zinc-600 w-full ${className}`}
        placeholder={placeholder}
        ref={ref}
        {...props}
      />
    </div>
  );
});
export default Input;
