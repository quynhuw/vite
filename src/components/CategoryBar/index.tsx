import { useNavigate } from "react-router-dom";

const CategoryBar = () => {
  const navigate = useNavigate();
  return (
    <div className=" bg-primary">
      <div className="flex items-center justify-center py-2 mx-auto text-[19px] font-semibold text-white max-w-7xl gap-x-16">
        <div onClick={() => navigate("/")}>
          <div className="cursor-pointer category hover:text-tertiary">
            Trang chủ
          </div>
        </div>
        <div onClick={() => navigate("/movies")}>
          <div className="cursor-pointer category hover:text-tertiary">
            Phim
          </div>
        </div>
        <div>
          <div className="cursor-pointer category hover:text-tertiary">
            Sự kiện
          </div>
        </div>
        <div>
          <div className="cursor-pointer category hover:text-tertiary">
            Liên hệ
          </div>
        </div>
      </div>
    </div>
  );
};
export default CategoryBar;
