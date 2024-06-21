import logo from "../../assets/images/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../Search";
import { useEffect, useState } from "react";
import senku from "../../assets/images/senku.jpg";
import { UserType } from "../../type/type";
import { getUserFromSession } from "../../utils/User";
const Header = () => {
  const navigate = useNavigate();
  const url = useLocation().pathname;
  const [user, setUser] = useState<UserType>();

  const checked = () => {
    const userFromSession = getUserFromSession();
    setUser(() => (userFromSession ? userFromSession : undefined));
  };
  useEffect(() => {
    checked();
  }, [url]);

  return (
    <div className="w-full pt-1 text-white bg-primary">
      <div className="flex items-center justify-between mx-auto h-18 max-w-7xl">
        <a href="/">
          <img
            className="w-40 cursor-pointer "
            src={logo}
            alt="Ironhack logo"
          />
        </a>
        <SearchBar />
        <div className="flex items-center gap-2 text-base cursor-pointer group/item">
          <img
            onClick={() => navigate("/account")}
            src="data:image/png;base64,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"
            className={`w-10 rounded-full ${user?.id ? "hidden" : "block"}`}
            alt="Avatar"
          />{" "}
          <img
            src={senku}
            onClick={() => navigate(`/user/${user?.id}`)}
            className={`w-10 object-cover rounded-full ${
              !user?.id ? "hidden" : "block"
            }`}
            alt="Avatar"
          />
          <div
            onClick={() => navigate("/account")}
            className={`group-hover/item:opacity-70 ${
              user?.id ? "hidden" : "block"
            }`}
          >
            Đăng nhập
          </div>
          <div
            onClick={() => navigate(`/user/${user?.id}`)}
            className={`group-hover/item:opacity-70 ${
              user?.id ? "block" : "hidden"
            }`}
          >
            {user?.name}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
