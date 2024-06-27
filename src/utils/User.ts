import { UserType } from "../type/type";

export const getUserFromSession = () => {
  const user = sessionStorage.getItem("user");
  if (user) {
    return JSON.parse(user) as UserType;
  }
  return null;
};
export const setUserToSession = (user: UserType) => {
  sessionStorage.setItem("user", JSON.stringify(user));
};
