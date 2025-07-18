function Button({
  children,
  type = "button",
  className = "",
  textColor = "text-white",
  bgColor = "bg-blue-600",
  ...props
}) {
  return (
    <button
      type={type}
      className={`px-4 py-4 rounded-lg ${className} ${textColor} ${bgColor} `}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
