import * as React from "react";
import Nav from "./Nav";
import { BiBell } from "react-icons/bi";
import Title from "./Titlle";
import PieChart from "./PieChart";
import Image from "next/image";

export default function BlackBlock() {
  return (
    <div
      className="mb-1 mx-5 p-4 border-2
     border-gray rounded-2xl  text-white
  flex justify-start gap-10 bg-zebra"
    >
      {/* <PieChart style={{ width: "10%", height: "10%" }} /> */}
      <div className="flex justify-center items-center">
        <Image
          alt="profile image"
          width={55}
          height={55}
          className="rounded-full "
          src={"/me.jpg"}
        />
      </div>
      <div className="flex flex-col  justify-around gap-2">
        <div className="font-semibold text-md">My Balance </div>
        <div className="font-bold text-2xl">1000000000</div>
        <div className="font-semibold text-md">
          Show account balance in <span className="text-[#7987B4]"> USD</span>
        </div>
      </div>
    </div>
  );
}
