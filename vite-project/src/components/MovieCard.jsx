/* eslint-disable react/prop-types */
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

function MovieCard(props) {
  const navigate = useNavigate();

  function seeDetails(movieId) {
    const query = new URLSearchParams();
    query.set("id", movieId);
    navigate(`/movie?${query.toString()}`);
  }
  return (
    <ul className="bg-slate-200 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {props.movies.map((movie) => (
        <li onClick={() => seeDetails(movie.id)}
          key={movie.id}
          className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col"
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-72 "
          />

          <div className="p-4 flex flex-col justify-between h-full">
            <h2 className="text-xl font-bold mb-2 text-center">
              {movie.title}
            </h2>

            <p className="text-sm text-gray-600 mb-2 line-clamp-3">
              {movie.overview}
            </p>

            <p className="text-sm mb-1 flex items-center justify-center">
              <span className="font-semibold">Nota:</span>{" "}
              {movie.vote_average.toFixed(1)}
              <Star className="text-yellow-500"/>
            </p>
            <p className="text-sm mb-1">
              <span className="font-semibold">Lançamento:</span>{" "}
              {movie.release_date}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Gêneros:</span>{" "}
              {movie.genre_ids
                .map((genreId) => {
                  const genreObj = props.genres.find((g) => g.id === genreId);
                  return genreObj ? genreObj.name : "Desconhecido";
                })
                .join(", ")}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default MovieCard;
