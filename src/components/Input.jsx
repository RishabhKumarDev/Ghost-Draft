import { useId } from "react";

function Input({
  label,
  type = "text",
  placeholder = "Dude Write as the label says...",
  className = "",
  myRef, // no need of forwardRef if i am using a diff prop name then 'ref' and that's still not a prob in react19;
  ...props
}) {
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
        ref={myRef}
      />
    </div>
  );
}

export default Input;
