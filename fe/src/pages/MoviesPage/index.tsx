import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FilmCard from "../../components/FilmCard";
import { Movie } from "../../type/type";
import movieApi from "../../apis/movieApi";

const types = ["2", "1"];

const FilmsPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [type, setType] = useState<string>("2");

  useEffect(() => {
    movieApi
      .getByType(type)
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => console.error(error));
  }, [type]);

  return (
    <div className="relative mx-auto max-w-7xl">
      <div className="flex gap-8">
        <div className="flex flex-col w-1/5 gap-5 py-6 text-xl text-center uppercase">
          {types.map((t) => {
            return (
              <div
                className={`cursor-pointer hover:font-bold ${
                  type === t ? "font-bold duration-300" : ""
                }`}
                onClick={() => setType(t)}
                key={t}
              >
                {t === "2" ? "Phim đang chiếu" : "Phim sắp chiếu"}
              </div>
            );
          })}
        </div>
        <div className="flex flex-col items-center justify-center w-4/5 gap-6 py-5">
          <div className="grid w-full grid-cols-3 gap-8">
            {movies.map((movie) => {
              return (
                <Link key={movie.id} to={`/movie/${movie.id}`}>
                  <FilmCard key={movie.id} movie={movie} type={type} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default FilmsPage;
