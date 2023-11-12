import * as React from "react";

import { BiBell } from "react-icons/bi";

export default function Groups() {
  return (
    <div
      className="mx-6 py-5 flex justify-start gap-4 items-center
  "
    >
      <AddGroup />
      <Group className="bg-[#FFFBEF]" />
      <Group className="bg-[#F0F4FF]" />
      <Group className="bg-[#FEF8FC]" />
      <Group className="bg-[#F8F9FE]" />
      <Group className="bg-[#FFFBEF]" />
    </div>
  );
}

function AddGroup({}) {
  return (
    <div
      className={`p-7 flex flex-col items-center justify-center border-2 border-gray
      rounded-xl gap-1 cursor-pointer`}
    >
      <BiBell
        size={20}
        color="black"
        className="border-2 rounded-full bg-white mb-2"
      />
      <div className="">Add Group</div>
    </div>
  );
}
function Group({ className }) {
  return (
    <div
      className={`p-3 flex flex-col border-2 border-gray
      rounded-xl gap-1 cursor-pointer ${className}`}
    >
      <BiBell
        size={20}
        color="black"
        className="border-2 rounded-full bg-white mb-2"
      />
      <div className="text-lg font-semibold">Group Name</div>
      <div className="text-gray text-sm">Category</div>
    </div>
  );
}
