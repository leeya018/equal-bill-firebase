import React from "react";
import { BiBell } from "react-icons/bi";
import Image from "next/image";

export default function Title() {
  return (
    <div className="p-5 mb-1 w-full flex justify-between ">
      <div className=" font-bold text-2xl">Earning</div>
      <button
        className="p-2 flex justify-around items-center 
    rounded-xl border-2 border-gray gap-1"
      >
        <div className="font-semibold">More</div>
        <BiBell size={20} color="gray" />
      </button>
    </div>
  );
}
