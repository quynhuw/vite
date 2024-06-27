import { useEffect, useState } from "react";
import { Movie, ScreenType, ShowTimeType } from "../../type/type";
import { addNew, filter, getScreenAvailable } from "../../apis/showTimeApi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaPen } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import ShowtimeStatusComp from "./components/ShowtimeStatusComp";
import movieApi from "../../apis/movieApi";

const ShowtimesManagePage = () => {
  const [showtimes, setShowtimes] = useState<ShowTimeType[]>([]);
  const [pageCount, setPageCount] = useState<number>(4);
  const [page, setPage] = useState(1);
  const [image, setImage] = useState<File | null>(null);
  const [reviewImg, setReviewImg] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState("2024");
  const [hiddenFilters, setHiddenFilters] = useState(true);
  const [searchInput, setSearchInput] = useState<string>("");
  const [openModal, setOpenModal] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [dateAdd, setDateAdd] = useState<string>("2024-06-27");
  const [selectedScreen, setSelectedScreen] = useState<ScreenType>();
  const [screenAvailables, setScreenAvailables] = useState<ScreenType[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number>(0);
  const handleChangeDateAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateAdd(e.target.value);
  };
  const [selectedMovie, setSelectedMovie] = useState<Movie | undefined>(
    movies[0]
  );
  const [selectedStartTime, setSelectedStartTime] = useState<string>("00:00");
  const [selectedEndTime, setSelectedEndTime] = useState<string>("00:00");
  function addMinutes(date: Date, minutes: number): Date {
    return new Date(date.getTime() + minutes * 60000);
  }

  const initialTime = new Date(2024, 0, 1, 2, 30, 0, 0); // Năm, tháng (0-11), ngày, giờ, phút, giây, mili giây
  const newTime = addMinutes(initialTime, 90);

  console.log("New Time:", newTime);
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const hourString = hour.toString().padStart(2, "0");
        const minuteString = minute.toString().padStart(2, "0");
        options.push(`${hourString}:${minuteString}`);
      }
    }
    return options;
  };
  const timeOptions = generateTimeOptions();

  const handleOpenModal = () => {
    setOpenModal(true);
    movieApi.getAll().then((res) => {
      setMovies(res.data);
      setSelectedMovie(res.data[0]);
    });
  };
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  const sortTabs = ["Tất cả lịch chiếu", "Mới nhất", "Cũ nhất"];
  const [sortTab, setSortTab] = useState<string>(sortTabs[0]);
  const handleToggleFilters = () => {
    setHiddenFilters(!hiddenFilters);
  };
  const handleSort = (tab: string) => {
    handleToggleFilters();
    if (tab === "Không") {
      setSortTab(tab);
    }
    if (tab === "Mới nhất") {
      setSortTab(tab);
    }
    if (tab === "Cũ nhất") {
      setSortTab(tab);
    }
    getFilter();
  };

  // handle search and filter
  const [selectedDay, setSelectedDay] = useState<string>(
    new Date().getDate().toString()
  );
  const [selectedMonth, setSelectedMonth] = useState<string>(
    (new Date().getMonth() + 1).toString().padStart(2, "0")
  );
  const days = Array.from({ length: 32 }, (_, index) => {
    // Thêm số 0 vào phía trước nếu số ngày nhỏ hơn 10
    const day = index.toString().padStart(2, "0");
    return day;
  });
  const months = Array.from({ length: 13 }, (_, index) => {
    const month = (index + 0).toString().padStart(2, "0");
    return month;
  });
  const years = [2024, 2023];
  const handlePagination = (page: number) => {
    setPage(page);
  };
  // handle add
  const handleChangeMovie = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const movieName = e.target.value;
    const m = movies.find((movie) => movie.nameVn === movieName);
    setSelectedMovie(m);
  };
  const handleChangeStartTime = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // Cộng thêm 90 phút
    setSelectedStartTime(e.target.value);
    const startTime = e.target.value;

    // Tính toán giờ kết thúc
    const duration = Number.parseInt(selectedMovie?.time || "") || 90; // Thời lượng phim
    const startHour = Number(startTime.split(":")[0]);
    const startMinute = Number(startTime.split(":")[1]);

    const startDateTime = new Date(2024, 0, 1, startHour, startMinute, 0, 0);
    const endDateTime = addMinutes(startDateTime, duration);

    // Format giờ kết thúc theo dạng hh:mm
    const endHour = endDateTime.getHours().toString().padStart(2, "0");
    const endMinute = endDateTime.getMinutes().toString().padStart(2, "0");

    const endTime = `${endHour}:${endMinute}`;
    setSelectedEndTime(endTime); // Cập nhật giờ kết thúc
    console.log("Start Time:", dateAdd + "T" + startTime + ":00");
    getFreeScreenAtTime(
      dateAdd + "T" + startTime + ":00",
      dateAdd + "T" + endTime + ":00"
    ); // Gọi API kiểm tra phòng chiếu trống
  };
  const handleChangeScreen = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedScreen(
      screenAvailables.find((screen) => screen.name === e.target.value)
    );
  };
  useEffect(() => {
    getFreeScreenAtTime(
      dateAdd + "T" + selectedStartTime + ":00",
      dateAdd + "T" + selectedEndTime + ":00"
    ); // Gọi API kiểm tra phòng chiếu trống
  }, [selectedStartTime, dateAdd, selectedEndTime]);
  useEffect(() => {
    getFreeScreenAtTime(
      dateAdd + "T" + selectedStartTime + ":00",
      dateAdd + "T" + selectedEndTime + ":00"
    ); // Gọi API kiểm tra phòng chiếu trống
  }, []);
  // call api
  const getFreeScreenAtTime = async (startTime: string, endTime: string) => {
    const response = await getScreenAvailable(startTime, endTime);
    setScreenAvailables(response.data);
    console.log("Screen Available:", screenAvailables);
  };

  const getFilter = async () => {
    if (sortTab === "Tất cả lịch chiếu") setSelectedTab("");
    if (sortTab === "Mới nhất") setSelectedTab("asc");
    if (sortTab === "Cũ nhất") setSelectedTab("desc");

    const response = await filter(
      searchInput,
      selectedYear + "-" + selectedMonth + "-" + selectedDay,
      selectedTab,
      page,
      10
    );
    setShowtimes(response.data.content);
    setPageCount(response.data.totalPages);
  };

  useEffect(() => {
    getFilter();
  }, []);
  useEffect(() => {
    getFilter();
  }, [searchInput, selectedDay, selectedMonth, selectedYear, sortTab, page]);
  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
      setReviewImg(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDay(event.target.value);
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(event.target.value);
  };
  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value);
  };

  useEffect(() => {
    if (image) {
      console.log(image);
    }
  }, [image]);
  const handleSubmit = async () => {
    if (image) {
      // const response = await submitData(image, image.name);
    }
  };

  // call api
  const add = async () => {
    const response = await addNew(
      selectedMovie?.id || 0,
      dateAdd + "T" + selectedStartTime + ":00",
      dateAdd + "T" + selectedEndTime + ":00",
      selectedPrice,
      selectedScreen?.id || 1
    );
    console.log("haa", response);
  };
  const handleAdd = () => {
    add();

    setTimeout(() => {
      setOpenModal(false);
      getFilter();
    }, 1000);
  };
  return (
    <div className={`flex flex-col w-full gap-2 p-2 rounded shadow-sm `}>
      <div className="">
        <input
          onChange={(e) => handleChangeImg(e)}
          type="file"
          accept=".jpg,.png"
        />
        <img
          className="w-[92px] h-[92px] object-contain"
          src={reviewImg || ""}
          alt=""
        />
        <button onClick={handleSubmit}>submit</button>
      </div>
      {openModal && (
        <div className="fixed z-[3] top-0 left-0 w-full h-full grid place-items-center bg-black bg-opacity-60">
          <div className="flex flex-col gap-3 p-5 bg-white">
            <h1 className="text-[30px] font-bold">Thêm lịch chiếu</h1>
            <div className="flex gap-3">
              <div>Chọn phim</div>
              <select
                value={selectedMovie?.nameVn}
                onChange={handleChangeMovie}
                className="min-w-[300px] bg-white text-black"
                name="movies"
                id=""
              >
                {movies.map((movie, index) => (
                  <option key={index} value={movie.nameVn}>
                    {movie.nameVn}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-3">
              <div className="flex">
                <div>Bắt đầu</div>
                <select
                  value={selectedStartTime}
                  onChange={handleChangeStartTime}
                  className="text-black bg-white"
                  name="startTime"
                  id=""
                >
                  {timeOptions.map((time, index) => (
                    <option key={index} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2">
                <div>Kết thúc</div>
                <div>{selectedEndTime}</div>
              </div>
              <input
                onChange={handleChangeDateAdd}
                value={dateAdd}
                type="date"
                className="bg-white"
              />
            </div>
            <div className="flex gap-3">
              <div>Chọn phòng chiếu (còn trống)</div>
              <select
                value={selectedScreen?.name}
                onChange={handleChangeScreen}
                className="text-black bg-white"
                name="=screen"
                id=""
              >
                {screenAvailables.map((screen, index) => {
                  return (
                    <option key={index} value={screen.name}>
                      {screen.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex gap-3">
              <div>Giá vé</div>
              <input
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(Number(e.target.value))}
                type="number"
                className="text-black bg-white border border-black"
                name="price"
                id=""
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => handleOpenModal()}
                className="px-5 py-2 bg-white rounded-2xl hover:bg-gray-200"
              >
                Huỷ
              </button>
              <button
                onClick={() => handleAdd()}
                className="px-5 py-2 bg-primary rounded-2xl bg-opacity-90 hover:bg-opacity-100"
              >
                Thêm
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="text-[25px]">{"Quản lý lịch chiếu"}</div>
      <div className="flex items-center justify-end gap-2">
        <div className="bg-white text-[#262626] flex gap-5">
          <div className="flex">
            <label htmlFor="daySelect">Ngày</label>
            <select
              onChange={handleDayChange}
              value={selectedDay}
              className="px-2 pr-4 bg-white"
              id="daySelect"
            >
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>
          <div className="flex">
            <label htmlFor="monthSelect">Tháng</label>
            <select
              onChange={handleMonthChange}
              value={selectedMonth}
              className="px-2 bg-white"
              id="monthSelect"
            >
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <div className="flex">
            <label htmlFor="monthSelect">Năm</label>
            <select
              onChange={handleYearChange}
              value={selectedYear}
              className="px-2 bg-white"
              id="monthSelect"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="relative flex justify-end w-full ">
          <div
            onClick={() => handleToggleFilters()}
            className="flex items-center gap-2 py-2 border-2 rounded cursor-pointer select-none w-fit hover:text-white hover:bg-primary px-7 border-primary"
          >
            <div>Sắp xếp theo</div>
            <FaAngleDown />
          </div>
          <div
            className={
              hiddenFilters
                ? "hidden "
                : "absolute z-[1] select-none top-12 border border-black right-0 flex flex-col overflow-hidden bg-white rounded shadow-form"
            }
          >
            {sortTabs.map((tab) => {
              return (
                <div
                  onClick={() => handleSort(tab)}
                  className={`flex items-center py-2 border-b cursor-pointer hover:bg-primary hover:text-white px-7 ${
                    sortTab === tab ? "bg-primary text-white" : ""
                  }`}
                >
                  {tab}
                </div>
              );
            })}
          </div>
        </div>
        <input
          value={searchInput}
          onChange={handleChangeInput}
          type="search"
          className="px-4 py-2 mx-2 text-base bg-white border border-black rounded outline-none opacity-80"
          placeholder="Tìm kiếm theo phim..."
        />
        <button
          onClick={() => handleOpenModal()}
          className="focus:outline-none text-white bg-primary hover:bg-secondary  font-medium rounded-lg text-base px-4 py-2.5 mb-2"
        >
          Thêm
        </button>
        <button className="focus:outline-none text-white bg-primary hover:bg-secondary  font-medium rounded-lg text-base px-4 py-2.5 mb-2">
          Xoá
        </button>
      </div>

      <div className="flex flex-col h-full gap-3 ">
        <div className="grid h-full grid-cols-12 pb-2 text-center border-b border-black text-nowrap opacity-80 ">
          <div className="flex col-span-1 gap-2">
            <input type="checkbox" className="w-6 " />
            <div>ID</div>
          </div>
          <div className="w-full col-span-1">Hình ảnh</div>
          <div className="w-full col-span-2">Tên phim</div>
          <div className="w-full col-span-1">Ngày chiếu</div>
          <div className="w-full col-span-1">Giờ chiếu</div>
          <div className="flex w-full col-span-1 gap-3">
            <div className="w-1/2 mx-auto">Phòng</div>
            <div className="w-1/2 mx-auto">Giá bán</div>
          </div>
          <div className="w-full col-span-1"></div>
          <div className="w-full col-span-1">Đã bán</div>
          <div className="w-full col-span-1"></div>
          <div className="w-full col-span-1">Trạng thái</div>
          <div className="col-span-1 "></div>
        </div>
        {showtimes.map((showtime, index) => {
          return (
            <div
              key={index}
              className="grid items-center justify-center w-full h-full grid-cols-12 pb-2 text-center border-b border-black opacity-80"
            >
              <div className="flex col-span-1 gap-2">
                <input type="checkbox" className="w-6 " />
                <div>{showtime.id}</div>
              </div>
              <div className="w-full col-span-1">
                <img
                  src={showtime.movie?.image}
                  className="object-cover w-full col-span-1 px-4 aspect-auto"
                  alt=""
                />
              </div>
              <div className="w-full col-span-2 font-bold">
                {showtime.movie?.nameVn}
              </div>
              <div className="w-full col-span-1">
                {showtime.startTime?.slice(0, 10)}
              </div>
              <div className="w-full col-span-1">
                {showtime.startTime?.slice(11, 16) +
                  "-" +
                  showtime.endTime?.slice(11, 16)}
              </div>
              <div className="flex w-full col-span-1 gap-3">
                <div className="w-1/2 mx-auto">
                  {showtime.screenShowTime?.screen?.id}
                </div>
                <div className="w-1/2 mx-auto">{showtime.price}</div>
              </div>
              <div className="w-full col-span-1"></div>
              <div className="w-full col-span-1"></div>
              <div className="w-full col-span-1">{}</div>
              <ShowtimeStatusComp status={showtime.status || 0} />
              <div className="flex justify-center col-span-1 gap-2 text-xl">
                <FaPen className="cursor-pointer hover:text-primary" />
                <RiDeleteBin5Line className="cursor-pointer hover:text-primary" />
              </div>
            </div>
          );
        })}
        <div className="w-full ">
          <div className="grid grid-flow-col mx-auto overflow-hidden border divide-x rounded w-fit">
            {pageCount > 1 &&
              Array.from({ length: pageCount }, (_, index) => {
                return (
                  <div
                    onClick={() => handlePagination(index + 1)}
                    key={index}
                    className={`px-4 py-1.5 w-fit cursor-pointer select-none hover:bg-primary ${
                      page === index + 1 ? "bg-primary" : ""
                    }`}
                  >
                    {index + 1}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShowtimesManagePage;
