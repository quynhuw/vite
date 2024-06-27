import AxiosClient from "./AxiosClient";
import axiosClient from "./AxiosClient";

const movieApi = {
  getAll: (params?: string) => {
    const url = "/movies";
    return axiosClient.get(url, { params });
  },
  get(id: string) {
    const url = `/movies/${id}`;
    return axiosClient.get(url);
  },
  getByType(type: string) {
    const url = `/movies/type?type=${type}`;
    return axiosClient.get(url);
  },
  search(name: string) {
    const url = `/movies/search?query=${name}`;
    return AxiosClient.get(url);
  },
};
export default movieApi;
