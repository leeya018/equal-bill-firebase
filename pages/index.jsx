import Left from "components/Left";
import React from "react";

export default function index() {
  return (
    <div className="flex gap-2 w-[100vw]  h-[100vh]">
      <Left />
      <div className="h-full w-[30%]">right</div>
    </div>
  );
}
