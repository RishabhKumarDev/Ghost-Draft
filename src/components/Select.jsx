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
        className={` px-3 py-2 bg-white text-black rounded-lg outline-none duration-200 border border-gray-200 focus:bg-gray-50 w-full`}
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
