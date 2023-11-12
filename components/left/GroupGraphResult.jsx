import * as React from "react";

import VerticalChart from "./VerticalChart";

export default function GroupGraphResult() {
  return (
    <div className="w-full flex justify-center">
      <VerticalChart style={{ width: 400, height: 200 }} />
    </div>
  );
}
