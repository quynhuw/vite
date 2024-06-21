import clsx from "clsx";
import { useState } from "react";
import { SeatType } from "../../../type/type";
import { SeatStatus } from "../../../enum";

export interface SeatProps {
  seat?: SeatType;
  className?: string;
  onClick?: () => void;
}
const Seat: React.FC<SeatProps> = (props) => {
  const { seat, onClick, className } = props;

  const [selected, setSelected] = useState(false);

  const handleSelect = () => {
    // if (
    //   seat?.status === SeatStatus.booked ||
    //   seat?.status === SeatStatus.unavailable
    // )
    //   return;
    // setSelected(!selected);
    // seatApi.chooseSeat(seat?.id || -1).then((response) => {
    //   console.log("choose seat", response.data);
    //   dispatch({ type: "TOGGLE_SEAT", payload: seat });
    // });
    setSelected(!selected);
  };

  const classes = clsx(
    className,
    "h-7 select-none border border-black rounded-sm aspect-[1.05] text-[13px] flex items-center font-bold justify-center cursor-pointer",
    seat?.status === SeatStatus.booked ? "bg-red-400" : "",
    seat?.status === SeatStatus.unavailable ? "bg-gray-400" : "",
    selected ? "bg-green-400" : ""
  );

  return (
    <div
      onClick={() => {
        handleSelect();
        onClick && onClick();
      }}
      className={classes}
    >
      {seat?.seatIndex}
    </div>
  );
};
export default Seat;
