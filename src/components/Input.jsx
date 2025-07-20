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
        <label htmlFor={id} className={` inline-block mb-1 pl-1`}>
          {label}
        </label>
      )}

      <input
        type={type}
        id={id}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full  ${className}`}
        placeholder={placeholder}
        ref={ref}
        {...props}
      />
    </div>
  );
});
export default Input;
