import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Banner from "./components/Banner";
import FilmCard from "../../components/FilmCard";
import { Movie, Setting } from "../../type/type";
import CustomSlider from "../../components/CustomSlider";
import movieApi from "../../apis/movieApi";

const SHOWING_MOVIE = "2";
const COMING_MOVIE = "1";

const Homepage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [comingMovies, setComingMovies] = useState<Movie[]>([]);

  const settingsSlider: Setting = {
    arrows: true,
    autoplay: false,
    dots: false,
    infinite: true,
    slidesToScroll: 1,
    slidesToShow: 4,
  };
  useEffect(() => {
    movieApi
      .getByType(SHOWING_MOVIE)
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => console.error(error));
    movieApi
      .getByType(COMING_MOVIE)
      .then((response) => {
        setComingMovies(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="">
      <Banner />

      <div className="flex flex-col gap-10 mx-auto mt-10 max-w-7xl ">
        <div className="flex flex-col gap-3 ">
          <h1 className="text-3xl text-center ">PHIM ĐANG CHIẾU</h1>
          <CustomSlider
            settings={settingsSlider}
            children={movies.map((movie) => {
              return (
                <Link key={movie.id} to={`/movie/${movie.id}`}>
                  <FilmCard
                    className="mx-2"
                    movie={movie}
                    type={SHOWING_MOVIE}
                  />
                </Link>
              );
            })}
          ></CustomSlider>
        </div>
        <div className="flex flex-col gap-3 ">
          <h1 className="text-3xl text-center ">PHIM SẮP CHIẾU</h1>
          <CustomSlider
            settings={settingsSlider}
            children={comingMovies.map((movie) => {
              return (
                <Link key={movie.id} to={`/movie/${movie.id}`}>
                  <FilmCard
                    className="mx-2"
                    movie={movie}
                    type={COMING_MOVIE}
                  />
                </Link>
              );
            })}
          ></CustomSlider>
        </div>
      </div>
    </div>
  );
};
export default Homepage;
