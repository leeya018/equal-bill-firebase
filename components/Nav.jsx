import React from "react";
import { BiBell } from "react-icons/bi";
import Image from "next/image";

export default function Nav() {
  return (
    <div className="mb-4  bg-white w-full flex justify-between items-center text-black">
      <div className=" p-5 flex justify-between items-center w-full  ">
        <div className="relative flex items-center w-[60%]">
          <BiBell size={20} color="gray" className="absolute my-auto left-2 " />

          <input
            type="text"
            placeholder="Search"
            className="pl-10 h-14  w-full border-2 border-gray rounded-xl"
          />
        </div>
        <div className="flex gap-6 items-center">
          <BiBell size={30} color="gray" />
          <BiBell size={30} color="gray" />
          <BiBell size={30} color="gray" />

          <Image
            alt="profile image"
            width={40}
            height={40}
            className="rounded-full "
            src={"/me.jpg"}
          />
        </div>
      </div>
    </div>
  );
}
