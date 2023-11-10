import * as React from "react";
import Nav from "./Nav";
import { BiBell } from "react-icons/bi";
import Title from "./Titlle";
import PieChart from "./PieChart";
import Image from "next/image";
import BlackBlock from "./BlackBlock";

export default function Left() {
  return (
    <div className="h-full w-[70%]">
      <div className="flex flex-col">
        {/* nav */}

        <Nav />
        {/* title */}
        <Title />
        {/* black block */}
        <BlackBlock />
        {/* groups items */}
        <div>inarstein</div>
        {/* Grapth */}
        <div>inarstein</div>
      </div>
    </div>
  );
}