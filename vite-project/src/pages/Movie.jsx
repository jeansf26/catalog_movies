import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Star } from "lucide-react";

function Movie() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const movieID = parseInt(searchParams.get("id"));

  const filmesSalvos = JSON.parse(localStorage.getItem("filmes")) || [];
  const generosSalvos = JSON.parse(localStorage.getItem("generos")) || [];

  const [movie] = useState(filmesSalvos.find((m) => m.id === movieID) || {});
  const [generos] = useState(generosSalvos);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("Favorites")) || []
  );
  
  useEffect(
    function save() {
      localStorage.setItem("Favorites", JSON.stringify(favorites));
    },
    [favorites]
  );

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white rounded-2xl shadow-lg overflow-hidden">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-[500px]"
      />

      <div className="p-6 space-y-4">
        <h1 className="text-3xl font-bold text-center">{movie.title}</h1>

        <p className="text-gray-700 leading-relaxed text-justify">
          {movie.overview || "Sinopse não disponível."}
        </p>

        <div className="grid grid-cols-2 gap-4 text-sm text-gray-800">
          <p>
            <span className="font-semibold">Título original:</span>{" "}
            {movie.original_title}
          </p>
          <p>
            <span className="font-semibold">Lançamento:</span>{" "}
            {movie.release_date}
          </p>
          <p className="flex items-center gap-1 mb-1 justify-center">
            <span className="font-semibold">Nota:</span>{" "}
            {movie.vote_average?.toFixed(1)}{" "}
            <Star className="text-yellow-500" />
          </p>
          <p>
            <span className="font-semibold">Gêneros:</span>{" "}
            {movie.genre_ids
              ?.map(
                (id) => generos.find((g) => g.id === id)?.name || "Desconhecido"
              )
              .join(", ")}
          </p>
          <div className="text-center mt-6">
            <button
              onClick={() => navigate(-1)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg shadow transition"
            >
              Voltar
            </button>
          </div>
          <div className="text-center mt-6">
            <button
              onClick={function () {
                favorites.includes(movieID)
                  ? setFavorites(favorites.filter((id) => id !== movieID))
                  : setFavorites([...favorites, movieID]);
              }}
              className="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-2 rounded-lg shadow transition"
            >
              {favorites.includes(movieID)
                ? "Remover dos Favoritos"
                : "Adicionar aos Favoritos"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Movie;
