import axios from "axios";
import AxiosClient from "./AxiosClient";

const showTimeApi = {
  getAll: () => {
    const url = "/showtimes";
    return AxiosClient.get(url);
  },
  get(id: string) {
    const url = `/showtimes/${id}`;
    return AxiosClient.get(url);
  },
  getDatesByMovieId(id: number) {
    const url = `/showtimes/dateByMovieId/${id}`;
    return AxiosClient.get(url);
  },
  getByMovie(id: number) {
    const url = `/showtimes/movie/${id}`;
    return AxiosClient.get(url);
  },
};
export const filter = async (
  movieTitle: string,
  date: string,
  sortDirection: string,
  page: number,
  size: number
) => {
  const url = `${import.meta.env.VITE_API_END_POINT}/showtimes/filter`;
  const by = setBy(date)[0];
  const d = setBy(date)[1];
  const body = {
    movieTitle: movieTitle,
    date: d,
    by: by,
    sortDirection: sortDirection,
    page: page - 1,
    size: size,
  };
  const response = await axios.post(url, body);
  return response.data;
};
export const getScreenAvailable = async (
  startTime: string,
  endTime: string
) => {
  const url = `${import.meta.env.VITE_API_END_POINT}/showtimes/screenAvailable`;
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);
  const body = {
    startTime: startDate.toISOString(),
    endTime: endDate.toISOString(),
  };
  const response = await axios.post(url, body);
  return response.data;
};
export const addNew = async (
  movieId: number,
  startTime: string,
  endTime: string,
  price: number,
  screenId: number
) => {
  const url = `${import.meta.env.VITE_API_END_POINT}/showtimes/add`;
  const body = {
    movieId: movieId,
    startTime: startTime,
    endTime: endTime,
    price: price,
    screenId: screenId,
  };
  const response = await axios.post(url, body);
  return response.data;
};
const setBy = (date: string) => {
  if (date.slice(8, 10) === "00" && date.slice(5, 7) !== "00") {
    date = date.replace("00", "01");
    return [2, date];
  }
  if (date.slice(5, 7) === "00") {
    date = date.replaceAll("00", "01");
    return [3, date];
  }
  if (date.slice(8, 10) !== "00" && date.slice(5, 7) !== "00") {
    return [1, date];
  }
  return [1, date];
};
export default showTimeApi;
