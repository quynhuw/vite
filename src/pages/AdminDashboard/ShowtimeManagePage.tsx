import { useEffect, useState } from "react";
import { ShowTimeType } from "../../type/type";
import showTimeApi from "../../apis/showTimeApi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaPen } from "react-icons/fa";
import { ShowtimeStatus } from "../../enum";

const ShowtimesManagePage = () => {
  const [showtimes, setShowtimes] = useState<ShowTimeType[]>([]);

  useEffect(() => {
    showTimeApi.getAll().then((res) => {
      setShowtimes(res.data);
    });
  }, []);

  return (
    <div className={`flex flex-col w-full gap-2 p-2 rounded shadow-sm `}>
      <div className="text-[25px]">{"Quản lý lịch chiếu"}</div>
      <div className="flex items-center justify-end gap-2">
        <input
          type="search"
          className="px-4 py-2 mx-2 text-base bg-white border border-black rounded outline-none opacity-80"
          placeholder="Tìm kiếm..."
        />
        <button className="focus:outline-none text-white bg-primary hover:bg-secondary  font-medium rounded-lg text-base px-4 py-2.5 mb-2">
          Thêm
        </button>
        <button className="focus:outline-none text-white bg-primary hover:bg-secondary  font-medium rounded-lg text-base px-4 py-2.5 mb-2">
          Xoá
        </button>
      </div>
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-12 pb-2 text-center border-b border-black text-nowrap opacity-80 ">
          <div className="flex col-span-1 gap-2">
            <input type="checkbox" className="w-6 " />
            <div>ID</div>
          </div>
          <div className="w-full col-span-1">Hình ảnh</div>
          <div className="w-full col-span-2">Tên phim</div>
          <div className="w-full col-span-1">Ngày chiếu</div>
          <div className="w-full col-span-1">Giờ chiếu</div>
          <div className="w-full col-span-1">Phòng</div>
          <div className="w-full col-span-1">Giá bán</div>
          <div className="w-full col-span-1">Đã bán</div>
          <div className="w-full col-span-1">Ngày tạo</div>
          <div className="w-full col-span-1">Trạng thái</div>
          <div className="col-span-1 "></div>
        </div>
        {showtimes.map((showtime, index) => {
          return (
            <div
              key={index}
              className="grid items-center justify-center w-full grid-cols-12 pb-2 text-center border-b border-black opacity-80"
            >
              <div className="flex col-span-1 gap-2">
                <input type="checkbox" className="w-6 " />
                <div>{showtime.id}</div>
              </div>
              <div className="w-full col-span-1">
                <img
                  src={showtime.movie?.image}
                  className="object-cover w-full col-span-1 px-4 aspect-auto"
                  alt=""
                />
              </div>
              <div className="w-full col-span-2 font-bold">
                {showtime.movie?.nameVn}
              </div>
              <div className="w-full col-span-1">
                {showtime.startTime?.slice(0, 10)}
              </div>
              <div className="w-full col-span-1">
                {showtime.startTime?.slice(11, 16) +
                  "-" +
                  showtime.endTime?.slice(11, 16)}
              </div>
              <div className="w-full col-span-1">
                {showtime.screenShowTime?.screen?.id}
              </div>
              <div className="w-full col-span-1">{showtime.price}</div>
              <div className="w-full col-span-1"></div>
              <div className="w-full col-span-1">{showtime.createTime}</div>
              {showtime.status === ShowtimeStatus.active && (
                <div className="w-full col-span-1 py-1 text-black bg-green-500 rounded-3xl">
                  Active
                </div>
              )}
              {showtime.status === ShowtimeStatus.cancel && (
                <div className="w-full col-span-1 py-1 text-black bg-gray-500 rounded-3xl">
                  Canceled
                </div>
              )}
              {showtime.status === ShowtimeStatus.delete && (
                <div className="w-full col-span-1 py-1 text-black bg-gray-200 rounded-3xl">
                  Deleted
                </div>
              )}
              {showtime.status === ShowtimeStatus.screened && (
                <div className="w-full col-span-1 py-1 text-black bg-blue-400 rounded-3xl">
                  Screened
                </div>
              )}
              <div className="flex justify-center col-span-1 gap-2 text-xl">
                <FaPen className="cursor-pointer hover:text-primary" />
                <RiDeleteBin5Line className="cursor-pointer hover:text-primary" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ShowtimesManagePage;
