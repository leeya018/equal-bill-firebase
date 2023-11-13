import * as React from "react";
import Image from "next/image";

import { BiAddToQueue } from "react-icons/bi";
import Expense from "./Expense";

import { observer } from "mobx-react-lite";
import { ModalStore } from "mobx/modalStore";
import { modals } from "@/util";
import { GroupsStore } from "mobx/groupsStore";
import AddExpenseModal from "components/modal/expense/add";

const Expenses = observer(({ expenses }) => {
  return (
    <div className="p-3 border-gray border-2 rounded-xl  w-full">
      <div className="flex justify-between px-2 items-center">
        <div className="font-semibold text-xl">
          {GroupsStore.chosenGroup
            ? GroupsStore.chosenGroup?.name + " "
            : "All Expenses"}
          Expenses
        </div>
        <AddExpenseModal />
        {GroupsStore.chosenGroup && (
          <BiAddToQueue
            size={30}
            color="black"
            className="cursor-pointer bg-white mb-2"
            onClick={() => ModalStore.openModal(modals.add_expense)}
          />
        )}
      </div>
      <div className="text-gray text-sm">Recent Expenses</div>
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
});

export default Expenses;
