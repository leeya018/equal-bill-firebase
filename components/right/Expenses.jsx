import * as React from "react";
import Image from "next/image";
import { useState } from "react";

import { BiBell } from "react-icons/bi";
import Expense from "./Expense";

export default function Expenses({ expenses }) {
  return (
    <div className="p-3 border-gray border-2 rounded-xl  w-full">
      <div className="font-semibold text-xl">Expenses</div>
      <div className="text-gray text-md">Recent Expenses</div>
      <ul className=" flex flex-col items-center w-full mt-2">
        {expenses.map((expense, key) => (
          <Expense key={key} expense={expense} />
        ))}
      </ul>
      <div
        className="mt-4 p-2 w-full
bg-[#F5F6FB]  text-black rounded-xl flex  
justify-center items-center gap-1 "
      >
        Show More
      </div>
    </div>
  );
}
