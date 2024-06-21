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
export default showTimeApi;
