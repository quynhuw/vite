/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
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
export const updateUser = async (
  id: number,
  name: string,
  birth: string,
  email: string,
  phone: string
) => {
  try {
    const infor = {
      id: id,
      name: name,
      email: email,
      phone: phone,
      birth: birth,
    };
    const response = await axios.post(
      `${import.meta.env.VITE_API_END_POINT}/users/update`,
      infor
    );
    if (response.data.status == "ok") {
      const user = response.data.data;
      sessionStorage.setItem("user", JSON.stringify(user));
      return { success: true, user: user };
    } else {
      return { success: false, message: "Wrong username or password" };
    }
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
