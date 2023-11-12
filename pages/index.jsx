import React from "react";
import Left from "components/left";
import Right from "components/right";

export default function index() {
  return (
    <div className="flex gap-2 w-[100vw]  h-[100vh]">
      <Left />
      <Right />
    </div>
  );
}
