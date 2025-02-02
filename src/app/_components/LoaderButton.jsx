import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const LoaderButton = ({
  loading,
  onClick,
  buttonText,
  disabled = false,
  className = "",
  ...props
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        "flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#4845d2] hover:bg-[#4845d2]/90 disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      {loading && (
        <svg
          className="w-5 h-5 animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          ></path>
        </svg>
      )}
      <span>{buttonText}</span>
    </Button>
  );
};

export default LoaderButton;
