import React from "react";

export default function Input({
  inputRef = null,
  value = "",
  onChange = () => {},
  placeholder = "",
}) {
  return (
    <input
      ref={inputRef}
      value={value}
      onChange={onChange}
      type="text"
      placeholder={placeholder}
      className="pl-5 h-10  w-full border-2 border-[#e2e2e2]"
    />
  );
}
