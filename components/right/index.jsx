import { useEffect, useState } from "react";
import { BiBell } from "react-icons/bi";
import Expenses from "./Expenses";
import PieChart from "components/left/PieChart";
import ChartResults from "./ChartResults";
import { GroupsStore } from "mobx/groupsStore";

import { observer } from "mobx-react-lite";

const Right = observer(({}) => {
  const [expenses, setExpenses] = useState([]);
  useEffect(() => {
    if (GroupsStore.chosenGroup) {
      setExpenses(GroupsStore.chosenGroup.expenses);
    } else {
      setExpenses(GroupsStore.myGroups.map((g) => g.expenses).flat());
    }
  }, [GroupsStore.chosenGroup]);

  return (
    <div className="h-full w-[25%] ">
      <div className="mx-16 h-full flex flex-col items-center  gap-4">
        {/* button */}
        <Transfer />
        {/* expenses */}
        <Expenses expenses={expenses} />
        {/* current results */}
        {GroupsStore.chosenGroup && <ChartResults />}
      </div>
    </div>
  );
});

export default Right;

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
