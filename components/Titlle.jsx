import React from "react";
import { BiBell } from "react-icons/bi";
import Image from "next/image";

export default function Title() {
  return (
    <div className="p-5 mb-5 w-full flex justify-between ">
      <div className=" font-bold text-5xl">Earning</div>
      <button
        className="p-3 flex justify-around items-center 
    rounded-xl border-2 border-gray gap-2"
      >
        <div className="font-semibold">More</div>
        <BiBell size={30} color="gray" />
      </button>
    </div>
  );
}
