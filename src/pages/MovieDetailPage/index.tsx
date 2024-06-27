import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Movie, ShowTimeType } from "../../type/type";
import showTimeApi from "../../apis/showTimeApi";
import movieApi from "../../apis/movieApi";

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie>();
  const [showTimes, setShowTimes] = useState<ShowTimeType[]>([]);
  const [showDates, setShowDates] = useState<string[]>([]);
  // const showDates = ["10/04/2024", "11/04/2024", "12/04/2024"];

  useEffect(() => {
    window.scrollTo(0, 0);
    id &&
      movieApi
        .get(id)
        .then((response) => setMovie(response.data))
        .catch((error) => console.error(error));
  }, [id]);
  useEffect(() => {
    movie &&
      showTimeApi
        .getDatesByMovieId(movie.id)
        .then((response) => {
          setShowDates(response.data);
        })
        .catch((error) => console.error(error));
    movie &&
      showTimeApi
        .getByMovie(movie.id)
        .then((response) => {
          console.log(response.data);

          setShowTimes(response.data);
          console.log("showtime", showTimes);
        })
        .catch((error) => console.error(error));
  }, [movie]);
  // useEffect(() => console.log("showtime", showTimes), [showTimes]);
  return (
    <div>
      <div className="mx-auto mt-6 max-w-7xl">
        {movie && (
          <div className="flex w-full gap-16 px-20 ">
            <div className="w-1/4">
              <img className="rounded " src={movie.image} alt="" />
            </div>
            <div className="flex flex-col w-3/4 gap-5">
              <div className="pb-1 text-3xl border-b-2 w-fit">
                {movie.nameVn}
              </div>
              <div className="flex flex-col w-4/5 gap-1 pb-5 border-b border-gray-400">
                <div>Thể loại: {movie.type_name_vn}</div>
                <div>Đạo diễn:{" " + movie.director}</div>
                <div>Ngày chiếu:{" " + movie.release_date}</div>
                <div>Diễn viên:{" " + movie.actor}</div>
                <div>Thời lượng:{" " + movie.time + " phút"}</div>
              </div>
              <div className="text-[16px] pr-5  font-light text-black">
                {movie.brief_vn}
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-2 px-20 py-4">
          <div
            className={`pb-1 text-3xl uppercase border-b-2 border-gray-500 w-fit ${
              movie?.status === "1" ? "hidden" : ""
            }`}
          >
            Lịch chiếu
          </div>
          <div className="flex flex-col justify-center gap-6 p-4">
            {showDates.map((showDate, index) => {
              return (
                <div
                  key={index}
                  className="flex gap-10 pb-4 border-b border-black border-opacity-20"
                >
                  <div
                    key={showDate}
                    className="px-10 py-4 text-center text-white rounded select-none bg-primary"
                  >
                    {showDate}
                  </div>
                  <div className="flex flex-wrap items-center justify-start gap-3">
                    {showTimes.map((showTime) => {
                      if (showTime.startTime!.slice(0, 10) === showDate) {
                        return (
                          <NavLink
                            key={showTime.id}
                            to={`/seat-selecting?movieId=${movie?.id}&showTimeId=${showTime.id}`}
                          >
                            <div className="grid px-3 py-1 text-white border rounded w-fit h-fit place-items-center bg-primary">
                              {showTime.startTime!.slice(11, 16)}
                            </div>
                          </NavLink>
                        );
                      }
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MovieDetailPage;
