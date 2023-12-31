import React from "react"

export default function Input({
  inputRef = null,
  type = "text",
  value = "",
  onChange = () => {},
  placeholder = "",
  className = "",
}) {
  console.log({ value })

  return (
    <input
      ref={inputRef}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      className={className}
    />
  )
}
