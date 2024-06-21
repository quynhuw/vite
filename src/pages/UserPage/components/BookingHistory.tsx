import clsx from "clsx";
import { useEffect, useState } from "react";
import { BookingType, UserType } from "../../../type/type";
import bookingHistoryApi from "../../../apis/bookingHistoryApi";
import { getUserFromSession } from "../../../utils/User";
import { BookingStatus } from "../../../enum";

const BookingHistory = () => {
  const [bookingHistories, setBookingHistories] = useState<BookingType[]>([]);
  const [visibleForm, setVisibleForm] = useState(false);
  const [index, setIndex] = useState<number>(-1);
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    setUser(getUserFromSession() || {});
  }, []);

  useEffect(() => {
    user?.id &&
      bookingHistoryApi.getByUserId(user.id).then((response) => {
        setBookingHistories(response.data);
      });
  }, [user?.id, bookingHistories.length]);

  const handleCloseForm = () => {
    document.querySelector("#form")?.classList.remove("animate-film-form-open");
    document.querySelector("#form")?.classList.add("animate-film-form-close");
    setTimeout(() => {
      setVisibleForm(false);
    }, 300);
  };
  const modalClass = clsx(
    "bg-tertiary w-[550px] h-fit p-5 pt-0 rounded  flex-col gap-3 ",
    visibleForm ? " animate-film-form-open flex" : "hidden"
  );
  return (
    <div className="flex flex-col w-4/5 gap-5 p-5 ">
      {visibleForm && (
        <div
          id={`detail-${index}`}
          className="fixed top-0 left-0 z-10 flex items-center justify-center w-full h-full overflow-hidden bg-opacity-30 bg-tertiary"
        >
          <div id="form" className={modalClass}>
            <div
              className="cursor-pointer text-end text-[30px]"
              onClick={() => handleCloseForm()}
            >
              x
            </div>
            <div className="flex flex-col justify-center gap-5 text-center">
              <div className="w-32 mx-auto">
                <img
                  className="w-full rounded"
                  src={
                    bookingHistories[index].tickets[0].showTime?.movie?.image
                  }
                  alt=""
                />
              </div>
              <div>
                {bookingHistories[index].tickets[0].showTime?.movie?.nameVn}
              </div>
            </div>
            <div className="w-full border border-dashed border-secondary"></div>
            <div className="text-center ">
              {bookingHistories[index].time.slice(11, 16).replaceAll("-", "/")}
              {" - "}
              {bookingHistories[index].time.slice(0, 10).replaceAll("-", "/")}
            </div>
            <div className="w-full border border-dashed border-secondary"></div>
            <div className="flex justify-between">
              <div>Số vé</div>
              <div>Chỗ ngồi</div>
              <div>Tổng tiền</div>
            </div>
            <div className="flex justify-between text-center">
              <div>{bookingHistories[index].tickets.length} vé</div>
              <div className="mx-auto text-center text-wrap max-w-64">
                {bookingHistories[index].tickets
                  .map((ticket) => ticket.seat?.seatIndex?.toUpperCase())
                  .join(", ")}
              </div>
              <div>
                {(
                  50000 * bookingHistories[index].tickets.length
                ).toLocaleString("vi-VN")}{" "}
                VND
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-3">
        <div className="text-[22px] font-light uppercase">
          Lịch sử giao dịch
        </div>
        <div className=" bg-primary h-[2px] rounded-md"></div>
      </div>
      <div className="flex flex-col gap-5">
        {bookingHistories.map((bookingHistorie, index) => {
          const movie = bookingHistorie.tickets[0].showTime?.movie;

          return (
            <div
              id={`booking-history-item-${index}`}
              key={bookingHistorie.tickets[0].id}
              className="flex items-center justify-between py-2 pl-3 pr-4 mx-2 text-primary bg-gray-200 rounded cursor-pointer hover:scale-[1.01] duration-150"
            >
              <div className="flex items-center gap-2">
                <img
                  className="w-20 h-24 rounded aspect-auto"
                  src={movie?.image}
                  alt=""
                />
                <div className="w-80">{movie?.nameVn}</div>
              </div>
              <div
                className={`${
                  Number.parseInt(movie?.status || "-1") ===
                  BookingStatus.cancel
                    ? "text-red-500"
                    : "text-green-400"
                }`}
              >
                {Number.parseInt(movie?.status || "-1") === BookingStatus.cancel
                  ? "Đã hủy"
                  : "Thành công"}
              </div>
              <div>
                {" "}
                {bookingHistorie.time.slice(11, 16).replaceAll("-", "/")}
                {" - "}
                {bookingHistorie.time.slice(0, 10).replaceAll("-", "/")}
              </div>
              <div>
                {" "}
                {(50000 * bookingHistorie.tickets.length).toLocaleString(
                  "vi-VN"
                )}{" "}
                VND
              </div>
              <label
                htmlFor={`detail-${index}`}
                onClick={() => {
                  setIndex(index);
                  setVisibleForm(!visibleForm);
                }}
                className="cursor-pointer hover:scale-105"
              >
                Chi tiết
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default BookingHistory;
