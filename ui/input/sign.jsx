import React from "react"
import Input from "."

export default function SignInput({ className = "", ...rest }) {
  console.log({ rest })
  return (
    <Input
      {...rest}
      className={`outline-none mb-2 border-2 border-[#4B6DCF] 
      text-semibold rounded-md h-9 pl-2 w-full focus:border-custom-blue ${className}`}
    />
  )
}
