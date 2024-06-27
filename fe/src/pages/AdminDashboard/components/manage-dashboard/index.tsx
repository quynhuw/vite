import { RiDeleteBin5Line } from "react-icons/ri";
import { FaPen } from "react-icons/fa";

interface ManageDashboardProps {
  subjectName: string;
  subjects: Subject[];
  className?: string;
}
type Subject = {
  field: string;
  data: string;
  width: number;
};

const ManageDashboard: React.FC<ManageDashboardProps> = (props) => {
  const { subjectName, subjects, className } = props;
  return (
    <div
      className={`flex flex-col w-full gap-2 p-6 m-2 rounded shadow-sm ${className}`}
    >
      <div className="text-[25px]">{"Quản lý " + subjectName}</div>
      <div className="flex items-center justify-end gap-2">
        <input
          type="search"
          className="px-4 py-2 mx-2 text-base bg-white border border-black rounded outline-none h-fit opacity-80"
          placeholder="Tìm kiếm..."
        />
        <button className="focus:outline-none text-white bg-primary hover:bg-secondary  font-medium rounded-lg text-base px-4 py-2.5 mb-2">
          Thêm
        </button>
        <button className="focus:outline-none text-white bg-primary hover:bg-secondary  font-medium rounded-lg text-base px-4 py-2.5 mb-2">
          Xoá
        </button>
      </div>
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-12 pb-2 text-center border-b border-black text-nowrap opacity-80 ">
          {subjects.map((subject, index) => {
            if (subject.field === "ID") {
              return (
                <div className="flex col-span-1 gap-2">
                  <input type="checkbox" className="w-6 " />
                  <div>ID</div>
                </div>
              );
            }
            return (
              <div
                key={index}
                className={`w-full ${"col-span-" + subject.width}`}
              >
                {subject.field}
              </div>
            );
          })}
          <div className="col-span-1 "></div>
        </div>
        <div className="grid items-center justify-center w-full grid-cols-12 pb-2 text-center border-b border-black opacity-80">
          <div className="flex justify-center col-span-1 gap-2 text-xl">
            <FaPen className="cursor-pointer hover:text-primary" />
            <RiDeleteBin5Line className="cursor-pointer hover:text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ManageDashboard;
