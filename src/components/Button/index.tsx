import React from "react";

type ButtonProps = {
  variant?: "primary" | "secondary" | "tertiary";
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  onClick,
  disabled = false,
}) => {
  const baseClasses =
    "px-4 py-2 rounded font-semibold transition-colors duration-300 w-full text-center shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500";

  const variantClasses = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-green-500 text-white hover:bg-gray-600",
    tertiary: "bg-yellow-500 text-white hover:bg-red-600",
  };

  const classes = `${baseClasses} ${variantClasses[variant]}`;

  return (
    <button className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
