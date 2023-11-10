import * as React from "react";

import { BiBell } from "react-icons/bi";

export default function Groups() {
  return (
    <div
      className="mx-6 py-5 flex justify-start gap-4 items-center
  "
    >
      <Group className="bg-[#FFFBEF]" />
      <Group className="bg-[#F0F4FF]" />
      <Group className="bg-[#FEF8FC]" />
      <Group className="bg-[#F8F9FE]" />
      <Group className="bg-[#FFFBEF]" />
    </div>
  );
}

function Group({ className }) {
  return (
    <div
      className={`p-7 flex flex-col border-2 border-gray
      rounded-xl gap-2 ${className}`}
    >
      <BiBell
        size={30}
        color="black"
        className="border-2 rounded-full bg-white mb-3"
      />
      <div className="text-xl font-semibold">Group Name</div>
      <div className="text-gray ">Category</div>
    </div>
  );
}
