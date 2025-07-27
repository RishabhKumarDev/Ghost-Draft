function Button({
  children,
  type ={type} || "button",
  className = "",
  textColor = "text-white",
  bgColor = "bg-blue-600",
  ...props // rest  values
}) {
  return (
    <button
      type={type}
      className={`px-4 py-4 rounded-lg cursor-pointer hover:brightness-75 duration-200 ${className} ${textColor} ${bgColor} `}
      {...props} // spread values
    >
      {children}
    </button>
  );
}

export default Button;
