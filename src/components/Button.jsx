function Button({
  children,
  type ="button",
  className = "",
  textColor = "text-zinc-950",
  bgColor = "bg-amber-500",
  hoverColor = "hover:bg-amber-600",
  ...props // rest  values
}) {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 cursor-pointer ${className} ${textColor} ${bgColor} ${hoverColor}`}
      {...props} // spread values
    >
      {children}
    </button>
  );
}

export default Button;
