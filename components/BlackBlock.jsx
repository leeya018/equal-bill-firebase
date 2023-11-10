import * as React from "react";
import Nav from "./Nav";
import { BiBell } from "react-icons/bi";
import Title from "./Titlle";
import PieChart from "./PieChart";
import Image from "next/image";

export default function BlackBlock() {
  return (
    <div
      className="mb-5 mx-5 p-6 border-2
     border-gray rounded-2xl  text-white
  flex justify-start gap-10 bg-zebra"
    >
      {/* <PieChart style={{ width: "10%", height: "10%" }} /> */}
      <Image
        alt="profile image"
        width={96}
        height={96}
        className="rounded-full "
        src={"/me.jpg"}
      />
      <div className="flex flex-col  justify-around gap-4">
        <div className="font-semibold text-lg">My Balance </div>
        <div className="font-bold text-5xl">1000000000</div>
        <div className="font-semibold text-lg">
          Show account balance in <span className="text-[#7987B4]"> USD</span>
        </div>
      </div>
    </div>
  );
}
