import { SeatType } from "../type/type";
import AxiosClient from "./AxiosClient";

const bookingHistoryApi = {
  //   getAll: (params?: string) => {
  //     const url = "/movies";
  //     return AxiosClient.get(url, { params });
  //   },
  getByUserId(userId: number) {
    const url = `/bookingHistories?userId=${userId}`;
    return AxiosClient.get(url);
  },
  add(
    userId: number,
    showTimeId: number,
    seats: SeatType[],
    discount: number,
    total: number,
    status: number
  ) {
    const url = `/bookingHistories`;
    const body = {
      user: {
        id: userId,
      },
      tickets: seats.map((seat) => {
        return {
          showTime: {
            id: showTimeId,
          },
          seat: {
            id: seat.id,
            seatIndex: seat.seatIndex,
          },
        };
      }),
      discount: discount,
      total: total,
      status: status,
    };
    localStorage.setItem("body", JSON.stringify(body));
    return AxiosClient.post(url, body);
  },
  pay(amount: number) {
    const url = `/payment/create_payment?amount=${amount}`;
    return AxiosClient.get(url);
  },
  getAllYears() {
    const url = `/bookingHistories/allYears`;
    return AxiosClient.get(url);
  },
  revenueMonthly(year: number) {
    const url = `/bookingHistories/revenueMonthly/${year}`;
    return AxiosClient.get(url);
  },
};
export default bookingHistoryApi;
