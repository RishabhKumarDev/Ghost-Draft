import { forwardRef, useId } from "react";

function Select({ options = [], label, className = "", ...prop }, ref) {
  const id = useId();
  return (
    <div className=" w-full">
      {label && <label htmlFor={id}>{label}</label>}
      <select
        name={label}
        id={id}
        ref={ref}
        {...prop}
        className={`px-3 py-2 bg-zinc-800 text-white placeholder-zinc-400 border border-zinc-700 rounded-md w-full focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 ${className}`}
      >
        {options?.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default forwardRef(Select);
