import React from "react"
import Button from "."

export default function SignButton({
  children,
  onClick = () => {},
  isLoading = false,
  className = "",
}) {
  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      className={`  border-2  rounded-xl w-full py-2 text-white font-semibold flex justify-center items-center ${className}`}
    >
      {children}
    </Button>
  )
}
