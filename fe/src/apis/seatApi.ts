import AxiosClient from "./AxiosClient";

const seatApi = {
  //   getAll: (params?: string) => {
  //     const url = "/movies";
  //     return axiosClient.get(url, { params });
  //   },
  //   get(id: string) {
  //     const url = `/movies/${id}`;
  //     return axiosClient.get(url);
  //   },
  getSeatsByShowtimeId(showtimeId: number) {
    const url = `/seats?showtimeId=${showtimeId}`;
    return AxiosClient.get(url);
  },
  get(id: number) {
    const url = `/seats/${id}`;
    return AxiosClient.get(url);
  },
  isBookingList(seatsID: number[]) {
    const url = `/seats/isBookingList`;
    return AxiosClient.post(url, seatsID);
  },
};
export default seatApi;
