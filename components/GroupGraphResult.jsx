import * as React from "react";
import Nav from "./Nav";
import { BiBell } from "react-icons/bi";
import Title from "./Titlle";
import PieChart from "./PieChart";
import Image from "next/image";
import BlackBlock from "./BlackBlock";
import Groups from "./Groups";
import VerticalChart from "./VerticalChart";

export default function GroupGraphResult() {
  return (
    <div>
      <VerticalChart style={{ width: "10%", height: "10%" }} />
    </div>
  );
}
