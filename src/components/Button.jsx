function Button({
  children,
  type = "button",
  className = "",
  textColor = "text-white",
  bgColor = "bg-blue-600",
  ...props // rest  values
}) {
  return (
    <button
      type={type}
      className={`px-4 py-4 rounded-lg ${className} ${textColor} ${bgColor} `}
      {...props} // spread values
    >
      {children}
    </button>
  );
}

export default Button;
