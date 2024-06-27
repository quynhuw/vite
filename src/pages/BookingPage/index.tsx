import clsx from "clsx";
import { useEffect, useState } from "react";
import bookingHistoryApi from "../../apis/bookingHistoryApi";
import { BookingType } from "../../type/type";

const SuccessBookingPage = () => {
  const [bookingHistory, setBookingHistory] = useState<BookingType>();
  const [visibleForm, setVisibleForm] = useState(false);
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");

  useEffect(() => {
    bookingHistoryApi.getLastByUserId(user.id).then((response) => {
      setBookingHistory(response.data);
    });
  }, []);

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
    <div className="flex flex-col w-3/4 gap-5 p-5 pt-20 mx-auto pb-14 ">
      {visibleForm && (
        <div
          id={`detail`}
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
                  src={bookingHistory?.tickets[0].showTime?.movie?.image}
                  alt=""
                />
              </div>
              <div>{bookingHistory?.tickets[0].showTime?.movie?.nameVn}</div>
            </div>
            <div className="w-full border border-dashed border-secondary"></div>
            <div className="text-center ">
              {bookingHistory?.time.slice(11, 16).replaceAll("-", "/")}
              {" - "}
              {bookingHistory?.time.slice(0, 10).replaceAll("-", "/")}
            </div>
            <div className="w-full border border-dashed border-secondary"></div>
            <div className="flex justify-between">
              <div>Số vé</div>
              <div>Chỗ ngồi</div>
              <div>Tổng tiền</div>
            </div>
            <div className="flex justify-between text-center">
              <div>{bookingHistory?.tickets.length} vé</div>
              <div className="mx-auto text-center text-wrap max-w-64">
                {bookingHistory?.tickets
                  .map((ticket) => ticket.seat?.seatIndex?.toUpperCase())
                  .join(", ")}
              </div>
              <div>
                {(50000 * (bookingHistory?.tickets.length || 0)).toLocaleString(
                  "vi-VN"
                )}{" "}
                VND
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-3">
        <div className="text-[22px] font-light uppercase">
          Cảm ơn quý khách đã sử dụng dịch vụ của chúng tôi.
        </div>
        <div className="text-[22px] font-light uppercase">
          Chúc bạn có trải nghiệm xem phim vui vẻ!
        </div>
        <div className=" bg-primary h-[2px] rounded-md"></div>
      </div>
      <div className="flex flex-col gap-5">
        <div
          id={`booking-history-item`}
          key={bookingHistory?.tickets[0].id}
          className="flex items-center justify-between py-2 pl-3 pr-4 mx-2 text-primary bg-gray-200 rounded cursor-pointer hover:scale-[1.01] duration-150"
        >
          <div className="flex items-center gap-2">
            <img
              className="w-20 h-24 rounded aspect-auto"
              src={bookingHistory?.tickets[0].showTime?.movie?.image}
              alt=""
            />
            <div className="w-80">
              {bookingHistory?.tickets[0].showTime?.movie?.nameVn}
            </div>
          </div>

          <div>
            {" "}
            {bookingHistory?.time.slice(11, 16).replaceAll("-", "/")}
            {" - "}
            {bookingHistory?.time.slice(0, 10).replaceAll("-", "/")}
          </div>
          <div>
            {" "}
            {(50000 * (bookingHistory?.tickets.length || 0)).toLocaleString(
              "vi-VN"
            )}{" "}
            VND
          </div>
          <label
            htmlFor={`detail`}
            onClick={() => {
              setVisibleForm(!visibleForm);
            }}
            className="cursor-pointer hover:scale-105"
          >
            Chi tiết
          </label>
        </div>
      </div>
    </div>
  );
};
export default SuccessBookingPage;
