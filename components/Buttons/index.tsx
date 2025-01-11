"use client";

import React from "react";

interface ButtonProps {
  children?: JSX.Element | React.ReactNode;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset"; 
}

const Buttons: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  disabled,
  type = "button", 
}) => {
  return (
    <button
      type={type}
      className={`py-1 px-5 bg-red-600 text-white rounded-xl flex justify-center items-center gap-3 hover:scale-105 hover:shadow-antiMetal transition-all duration-500 ${className}`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Buttons;
