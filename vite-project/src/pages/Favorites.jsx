import { useState } from "react";
import MovieCard from "../components/MovieCard";
import { useNavigate } from "react-router-dom";

function Favorites() {
  // Carrega os generos de filmes do sessionstorage ou inicializa com um array vazio
  const [generos] = useState(JSON.parse(localStorage.getItem("generos")) || []);

  const [selectedGenre, setSelectedGenre] = useState("todos");

  const navigate = useNavigate();

  // Carrega os filmes do sessionstorage ou inicializa com um array vazio
  const [movies] = useState(JSON.parse(localStorage.getItem("filmes")) || []);

  const filteredMovies =
    selectedGenre === "todos"
      ? movies
      : movies.filter((movie) =>
          movie.genre_ids.includes(parseInt(selectedGenre))
        );

  return (
    <div>
      <div className="bg-slate-200 flex flex-col sm:flex-row justify-center gap-6 p-6">
        <div
          onClick={() => {
            navigate("/");
          }}
          className="bg-white hover:bg-slate-100 rounded-xl shadow-md px-6 py-4 text-center border-4 border-blue-500 w-[400px] h-[80px]"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-600">
            🎬 Catálogo de Filmes
          </h1>
        </div>
        <div className="bg-white rounded-xl shadow-md px-6 py-4 text-center border-4 border-green-500 w-[400px] h-[80px]">
          <h1 className="text-2xl sm:text-3xl font-bold text-green-600">
            ⭐ Favoritos
          </h1>
        </div>
      </div>

      {/* Filtro por gênero */}
      <div className="flex justify-center mb-1">
        <div className="bg-white shadow-md border border-blue-200 rounded-xl px-4 py-3 w-full max-w-md">
          <label className="block text-sm font-medium text-blue-700 mb-1">
            🎭 Filtrar por gênero
          </label>
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="w-full px-4 py-2 border border-blue-400 rounded-md shadow-sm text-blue-800 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="todos">Todos os Gêneros</option>
            {generos.map((genero) => (
              <option key={genero.id} value={genero.id}>
                {genero.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button className=""></button>
      {/* Renderiza o componente MovieCard passando os filmes e generos */}
      <MovieCard
        movies={filteredMovies.filter((filme) =>
          JSON.parse(localStorage.getItem("Favorites")).includes(filme.id)
        )}
        genres={generos}
      />
    </div>
  );
}
export default Favorites;
