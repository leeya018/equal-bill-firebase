import React from "react";
import Left from "components/left";
import Right from "components/right";
import AddModal from "components/Modal";

export default function index() {
  return (
    <div className="flex gap-2 w-[100vw]  h-[100vh]">
      <AddModal />
      <Left />
      <Right />
    </div>
  );
}
