import PieChart from "components/left/PieChart";
import React from "react";
import { BiBell } from "react-icons/bi";

export default function ChartResults() {
  return (
    <div className=" border-gray border-2 rounded-xl flex flex-col w-full">
      <div className="p-3 w-full border-b-2  text-lg font-semibold flex items-center justify-between">
        <div>Users</div>
        <BiBell size={20} color="gray" />
      </div>
      <div>
        <PieChart style={{ width: 60, height: 60 }} />
      </div>
    </div>
  );
}
