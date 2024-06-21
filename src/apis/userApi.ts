import AxiosClient from "./AxiosClient";

const userApi = {
  //   getAll: (params?: string) => {
  //     const url = "/movies";
  //     return axiosClient.get(url, { params });
  //   },
  get(id: number) {
    const url = `/users/${id}`;
    return AxiosClient.get(url);
  },
  login(email: string, password: string) {
    const url = `/users/login`;
    return AxiosClient.post(url, { email, password });
  },
  update(
    id: number,
    name: string,
    birth: string,
    email: string,
    phone: string
  ) {
    const url = `/users/update`;
    const body = {
      id: id,
      name: name,
      email: email,
      phone: phone,
      birth: birth,
    };
    return AxiosClient.put(url, body);
  },
};
export default userApi;
