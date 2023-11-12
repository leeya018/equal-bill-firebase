import React from "react";
import Left from "components/left";
import Right from "components/right";
import AddGroupModal from "components/modal/group/add";
import SuccessModal from "components/modal/message/success";
import EditGroupModal from "components/modal/group/edit";

export default function index() {
  return (
    <div className="flex gap-2 w-[100vw]  h-[100vh]">
      <SuccessModal />
      <Left />
      <Right />
    </div>
  );
}
