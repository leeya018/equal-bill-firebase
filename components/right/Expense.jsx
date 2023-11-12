import * as React from "react";
import Image from "next/image";
import { useState } from "react";

import { BiBell } from "react-icons/bi";

export default function Expense({ expense }) {
  const { name, amount, date } = expense;
  return (
    <li className=" flex items-center justify-between w-full">
      <div className="flex items-center gap-4">
        <Image
          alt="profile image"
          width={35}
          height={35}
          className=" rounded-xl "
          src={"/me.jpg"}
        />
        <div className="flex flex-col justify-center gap-.5">
          <div className="text-md font-semibold">{name}</div>
          <div className="text-gray text-sm">Shopping</div>
        </div>
      </div>
      <div className="text-lg text-[#EC9BD6">{amount}$</div>
    </li>
  );
}
