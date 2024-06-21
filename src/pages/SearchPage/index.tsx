import { Link, useLocation } from "react-router-dom";
import FilmCard from "../../components/FilmCard";
import { useEffect, useState } from "react";
import movieApi from "../../apis/movieApi";
import { Movie } from "../../type/type";

const SearchPage = () => {
  const pathname = useLocation().search;
  const searchParams = new URLSearchParams(pathname);
  const query = searchParams.get("query");
  const [results, setResults] = useState<Movie[]>([]);

  useEffect(() => {
    if (query) {
      if (query.length > 1) {
        movieApi.search(query).then((response) => {
          setResults(response.data);
        });
      } else {
        setResults([]);
      }
    }
  }, [query]);
  return (
    <div className="flex flex-col gap-5 py-5 mx-auto max-w-7xl">
      <div className="text-[40px] text-center">Kết quả tìm kiếm</div>
      <div className="grid grid-flow-row grid-cols-4 gap-4">
        {results.map((movie) => {
          return (
            <Link to={`/movie/${movie.id}`}>
              <FilmCard key={movie.id} movie={movie} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default SearchPage;
