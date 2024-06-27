import axios from "axios";
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
  getLastByUserId(userId: number) {
    const url = `/bookingHistories/getLastBooking?userId=${userId}`;
    return AxiosClient.get(url);
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
export const add = async (
  userId: number,
  showTimeId: number,
  seatsId: number[],
  discount: number
) => {
  const url = `${import.meta.env.VITE_API_END_POINT}/payment/payment_success`;
  const body = {
    seatIds: seatsId,
    userId: userId,
    discount: discount,
    showTimeId: showTimeId,
  };
  const response = await axios.post(url, body);
  return response;
};

export const getAllYears = async () => {
  const url = `${import.meta.env.VITE_API_END_POINT}/bookingHistories/allYears`;
  const response = await axios.get(url);

  return response.data.data as number[];
};
