//import React from 'react';
import React, { useState } from "react";
import axios from "axios";
import { api } from "./common/http-common";
import { Bar, Pie } from "@ant-design/charts";

const Dashboard = () => {
  const [stat, setStat] = useState<any>({});
  React.useEffect(() => {
    axios.get(`${api.uri}/articles/stat`).then((resp) => {
      setStat(resp.data);
    });
  }, []);
  let bar = null;
  if (stat.kindStat) {
    const barConfig = {
      title: {
        visible: true,
        text: "Kinds Bar",
      },
      data: stat.kindStat,
      xField: "kind",
      yField: "count",
    };
    bar = <Bar {...barConfig} />;
  }
  let pie = null;
  if (stat.regionStat) {
    const pieConfig = {
      title: {
        visible: true,
        text: "Region Pie",
      },
      data: stat.regionStat,
      angleField: "count",
      colorField: "region",
    };
    pie = <Pie {...pieConfig} />;
  }

  return (
    <div className="flex flex-col justify-center text-black">
      <div className="py-4 px-10 text-green-900 font-bold">
        <p>Dashboard</p>
      </div>
      <div className="flex gap-2">
        <div className="w-1/2">
          <p className="px-20 pt-10 text-2xl font-bold">Breeds Stat</p>
        {bar}
        </div>
        <div className="w-1/2">
          <p className="px-20 pt-10 text-2xl font-bold">Region Stat</p>
          {pie}
          </div>
      </div>
    </div>
  );
};

export default Dashboard;
