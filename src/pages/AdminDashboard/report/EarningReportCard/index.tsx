/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import Chart from "./Chart";
import bookingHistoryApi, {
  getAllYears,
} from "../../../../apis/bookingHistoryApi";

export type SeriesItem = {
  name: string;
  data: number[];
};
type DataType = {
  year: number;
  x: string[];
  y: SeriesItem[];
};

const EarningReportCard = () => {
  const [years, setYears] = useState<number[]>([2022, 2023, 2024]);
  const [activeYear, setActiveYear] = useState(0);
  const [xAxis, setXAxis] = useState<string[]>([]);
  const [yAxis, setYAxis] = useState<SeriesItem[]>([]);
  const [datas, setDatas] = useState<DataType[]>([]);

  const handleActiveYear = (year: number) => {
    setActiveYear(year);
  };

  const [toggleYear, setToggleYear] = useState(false);
  const handleToggleYear = () => {
    setToggleYear(!toggleYear);
  };

  const getRevenue = async () => {
    const datasTemp: DataType[] = [];
    const allYears: number[] = await getAllYears();
    setYears(allYears);
    setActiveYear(allYears[0]);
    for (let i = 0; i < allYears.length; i++) {
      const data = await bookingHistoryApi.revenueMonthly(allYears[i]);
      const yearData = data.data.data;
      console.log(yearData);

      datasTemp.push({
        year: allYears[i],
        x: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "July",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        y: [
          {
            name: "Orders",
            data: yearData,
          },
        ],
      });
    }
    // console.log(datasTemp);
    setDatas(datasTemp);
  };

  useEffect(() => {
    getRevenue();
  }, []);
  useEffect(() => {
    setXAxis(datas.find((item) => item.year === activeYear)?.x || []);
    setYAxis(datas.find((item) => item.year === activeYear)?.y || []);
    // console.log(data.find((item) => item.year === activeYear)?.y || []);
  }, [activeYear, datas]);

  return (
    <div className="flex flex-col gap-6 bg-white rounded-md text-blacks shadow-chart-report">
      <div className="flex justify-between">
        <div className="flex flex-col gap-[2px]">
          <div className="text-[18px] font-medium leading-6 opacity-90">
            Báo cáo doanh thu
          </div>
          <div className="left-5 text-[13px] opacity-50">
            Tổng quan {activeYear}
          </div>
        </div>
        <div>
          <FaEllipsisV
            onClick={() => handleToggleYear()}
            className="opacity-50 cursor-pointer"
          />
          <div className="relative select-none">
            <div
              className={`absolute top-0 right-0 z-[1] flex-col mr-2 border bg-white border-gray-200 divide-y divide-gray-200 rounded shadow-sm cursor-pointer 
            ${toggleYear ? "flex" : "hidden"}`}
            >
              {years.map((year) => {
                return (
                  <div
                    key={year}
                    onClick={() => handleActiveYear(year)}
                    className={`px-8 py-2 hover:bg-gray-200 ${
                      activeYear === year ? "bg-gray-200" : ""
                    }`}
                  >
                    {year}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <Chart xAxis={xAxis} yAxis={yAxis} />
    </div>
  );
};
export default EarningReportCard;
