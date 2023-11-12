import React from "react";

export default function ApproveButton({
  children,
  onClick = () => {},
  disabled = false,
  isLoading,
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${
        isLoading ? "bg-gray" : "bg-[#35d08c] border-[#e2e2e2]"
      } mb-2  border-2  rounded-md  py-2 px-4 text-white 
    font-semibold flex justify-center items-center`}
    >
      {children}
    </button>
  );
}
