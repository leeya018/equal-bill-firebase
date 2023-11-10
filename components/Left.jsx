import * as React from "react";
import Nav from "./Nav";
import { BiBell } from "react-icons/bi";
import Title from "./Titlle";

export default function Left() {
  return (
    <div className="h-full w-[70%]">
      <div className="flex flex-col">
        {/* nav */}

        <Nav />
        {/* title */}
        <Title />
        {/* black block */}
        <div>inarstein</div>
        {/* groups items */}
        <div>inarstein</div>
        {/* Grapth */}
        <div>inarstein</div>
      </div>
    </div>
  );
}
