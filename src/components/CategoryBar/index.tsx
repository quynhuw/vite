import { NavLink } from "react-router-dom";

const CategoryBar = () => {
  return (
    <div className=" bg-primary">
      <div className="flex items-center justify-center py-2 mx-auto text-[19px] font-semibold text-white max-w-7xl gap-x-16">
        <NavLink to="/">
          <div className="cursor-pointer category hover:text-tertiary">
            Trang chủ
          </div>
        </NavLink>
        <NavLink to="/movies">
          <div className="cursor-pointer category hover:text-tertiary">
            Phim
          </div>
        </NavLink>
        <NavLink to="/events">
          <div className="cursor-pointer category hover:text-tertiary">
            Sự kiện
          </div>
        </NavLink>
        <NavLink to="/contact">
          <div className="cursor-pointer category hover:text-tertiary">
            Liên hệ
          </div>
        </NavLink>
      </div>
    </div>
  );
};
export default CategoryBar;
