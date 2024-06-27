import React from "react";

interface StatisticsProps {
  statistics: statistic[];
}

type statistic = {
  icon: React.ReactNode;
  title: string;
  data: number;
  unit: string;
};
const Statistics: React.FC<StatisticsProps> = (props) => {
  const { statistics } = props;

  return (
    <div className="flex gap-8">
      {statistics.map((statistic, index) => {
        return (
          <div key={index} className="flex justify-center gap-3 opacity-80">
            <div className="my-auto text-[30px]"> {statistic.icon}</div>
            <div className="flex flex-col">
              <div>{statistic.data + statistic.unit}</div>
              <div>{statistic.title}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Statistics;
