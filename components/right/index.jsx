import { useState } from "react";
import { BiBell } from "react-icons/bi";
import Expenses from "./Expenses";

export default function Right() {
  const [expenses, setExpenses] = useState([1, 2, 3, 4]);

  return (
    <div className="h-full w-[25%] ">
      <div className="mx-16 h-full flex flex-col items-center  gap-4">
        {/* button */}
        <Transfer />
        {/* expenses */}
        <Expenses expenses={expenses} />
        {/* current results */}
        <div>1</div>
      </div>
    </div>
  );
}

function Transfer() {
  return (
    <div
      className="mt-4 p-2 w-full
     bg-[#F5F6FB]  text-black rounded-xl flex  
     justify-center items-center gap-1 "
    >
      <div>Transfer</div>
      <BiBell size={20} color="gray" />
    </div>
  );
}
