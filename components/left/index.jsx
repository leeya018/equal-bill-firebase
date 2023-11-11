import * as React from "react";
import Nav from "./Nav";
import { BiBell } from "react-icons/bi";
import Title from "./Titlle";
import PieChart from "./PieChart";
import Image from "next/image";
import BlackBlock from "./BlackBlock";
import Groups from "./Groups";
import VerticalChart from "./VerticalChart";
import GroupGraphResult from "./GroupGraphResult";

export default function Left() {
  return (
    <div className="h-full w-[75%]">
      <div className="flex flex-col">
        {/* nav */}

        <Nav />
        {/* title */}
        <Title />
        {/* black block */}
        <BlackBlock />
        {/* groups items */}
        <Groups />
        {/* Grapth */}
        <GroupGraphResult />
      </div>
    </div>
  );
}
