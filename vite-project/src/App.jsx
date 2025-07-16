import "./App.css";
import { useState } from "react";
import MovieCard from "./components/MovieCard";
import { useNavigate } from "react-router-dom";

function App() {
  const [generos] = useState(
    JSON.parse(localStorage.getItem("generos")) || []
  );

  const navigate = useNavigate();

  const [movies] = useState(JSON.parse(localStorage.getItem("filmes")) || []);

  const [selectedGenre, setSelectedGenre] = useState("todos");

  // Filtra os filmes com base no gênero selecionado
  const filteredMovies =
    selectedGenre === "todos"
      ? movies
      : movies.filter((movie) =>
          movie.genre_ids.includes(parseInt(selectedGenre))
        );

  return (
    <div>
      <div className="bg-slate-200 flex flex-col sm:flex-row justify-center gap-6 p-6">
        <div className="bg-white rounded-xl shadow-md px-6 py-4 text-center border-4 border-blue-500 w-[400px] H-[80px]">
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-600">
            🎬 Catálogo de Filmes
          </h1>
        </div>
        <div
          onClick={() => {
            navigate("/favorites");
          }}
          className="bg-white hover:bg-slate-100 cursor-pointer rounded-xl shadow-md px-6 py-4 text-center border-4 border-green-500 w-[400px] h-[80px]"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-green-600">
            ⭐ Favoritos
          </h1>
        </div>
      </div>

      {/* Filtro por gênero */}
      <div className="flex justify-center mb-8">
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

      {/* Filmes filtrados */}
      <MovieCard movies={filteredMovies} genres={generos} />
    </div>
  );
}

export default App;
