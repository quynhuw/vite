import { IoTicketOutline } from "react-icons/io5";
import { CiCircleInfo } from "react-icons/ci";
import { Movie } from "../../type/type";
import React from "react";

interface FilmCardProps {
  className?: string;
  movie: Movie;
  type?: string;
}
const FilmCard: React.FC<FilmCardProps> = (props) => {
  const { className, movie, type } = props;

  return (
    <div
      className={
        "flex flex-col gap-1 pb-1 overflow-hidden bg-yellow-700 rounded bg-opacity-20 h-fit group/item " +
        className
      }
    >
      <div className="relative overflow-hidden">
        <img className=" w-full h-[370px] mx-auto" src={movie.image} />
        <div className="absolute bottom-0 left-0 hidden w-full py-4 bg-black animate-go-up group-hover/item:grid bg-opacity-70 place-items-center">
          {type === "2" ? (
            <div className="flex flex-row gap-4">
              <div className="flex items-center justify-center h-10 gap-2 px-4 py-1 bg-green-300 rounded-md cursor-pointer hover:bg-green-500 w-fit">
                <IoTicketOutline className="text-[20px]" />
                <div className="text-[16px] ">Đặt vé </div>
              </div>
              <div className="grid px-2 bg-green-300 rounded-md cursor-pointer hover:bg-green-500 place-items-center">
                <CiCircleInfo className="text-[25px] " />
              </div>
            </div>
          ) : (
            <div className="flex flex-row gap-2">
              <div className="flex items-center justify-center gap-2 px-3 py-1 bg-green-300 rounded-md hover:bg-green-500 ">
                <CiCircleInfo className="text-[25px]" />
                <div className="text-[16px]">CHI TIẾT</div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-1  px-2 text-[13px]  leading-[14px]">
        <div className="grid px-1 bg-yellow-300 border border-yellow-900 rounded cursor-pointer whitespace-nowrap place-items-center">
          {movie.type_name_vn}
        </div>
        <div className="grid p-1 bg-green-300 border border-green-900 rounded cursor-pointer place-items-center ">
          {movie.limitage_vn}
        </div>
      </div>
      <div className="flex items-center  px-2 h-20 text-[14px]">
        <div className="flex flex-col gap-2">
          <div className="text-[18px] leading-5  cursor-pointer hover:text-black w-full ">
            {movie.nameVn}
          </div>
          <div className="flex flex-row gap-1 leading-3">
            <div className="">Thời lượng:</div>
            <div className="cursor-pointer hover:text-black">
              {movie.time + " "} phút
            </div>
          </div>
          <div className="flex flex-row gap-1 leading-3">
            <div className="">Khởi chiếu:</div>
            <div className="cursor-pointer hover:text-black">
              {movie.release_date && movie.release_date.slice(0, 9)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FilmCard;
