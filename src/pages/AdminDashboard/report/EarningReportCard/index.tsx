import { useEffect, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import Chart from "./Chart";
import bookingHistoryApi from "../../../../apis/bookingHistoryApi";

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
  const [activeYear, setActiveYear] = useState(years[0]);
  const [xAxis, setXAxis] = useState<string[]>([]);
  const [yAxis, setYAxis] = useState<SeriesItem[]>([]);
  const [data, setData] = useState<DataType[]>([]);

  const handleActiveYear = (year: number) => {
    setActiveYear(year);
  };

  const [toggleYear, setToggleYear] = useState(false);
  const handleToggleYear = () => {
    setToggleYear(!toggleYear);
  };
  // const data = [
  //   {
  //     year: 2024,
  //     x: [
  //       "Jan",
  //       "Feb",
  //       "Mar",
  //       "Apr",
  //       "May",
  //       "Jun",
  //       "July",
  //       "Aug",
  //       "Sep",
  //       "Oct",
  //       "Nov",
  //       "Dec",
  //     ],
  //     y: [
  //       {
  //         name: "Orders",
  //         data: [30, 10, 45, 38, 15, 30, 35, 28, 8, 45, 10, 60],
  //       },
  //     ],
  //   },
  //   {
  //     year: 2023,
  //     x: [
  //       "Jan",
  //       "Feb",
  //       "Mar",
  //       "Apr",
  //       "May",
  //       "Jun",
  //       "July",
  //       "Aug",
  //       "Sep",
  //       "Oct",
  //       "Nov",
  //       "Dec",
  //     ],
  //     y: [
  //       {
  //         name: "Orders",
  //         data: [28, 10, 45, 38, 15, 30, 35, 28, 8, 45, 10, 60],
  //       },
  //     ],
  //   },
  //   {
  //     year: 2022,
  //     x: [
  //       "Jan",
  //       "Feb",
  //       "Mar",
  //       "Apr",
  //       "May",
  //       "Jun",
  //       "July",
  //       "Aug",
  //       "Sep",
  //       "Oct",
  //       "Nov",
  //       "Dec",
  //     ],
  //     y: [
  //       {
  //         name: "Orders",
  //         data: [10, 10, 45, 38, 15, 30, 35, 28, 8, 45, 10, 60],
  //       },
  //     ],
  //   },
  // ];

  useEffect(() => {
    bookingHistoryApi.getAllYears().then((res) => {
      setYears(res.data.data);
      res.data.data.map((year: number) => {
        bookingHistoryApi.revenueMonthly(year).then((res) => {
          setData([
            ...data,
            {
              year: year,
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
              y: [{ name: "" + year, data: res.data.data }],
            },
          ]);
          console.log(name, "" + year, data, res.data.data);
        });
      });
    });
  }, []);
  useEffect(() => {
    setXAxis(data.find((item) => item.year === activeYear)?.x || []);
    setYAxis(data.find((item) => item.year === activeYear)?.y || []);
  }, [activeYear, data]);

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
