import { json } from "react-router-dom";

let filmes = [];
let generos = [];
let FavID = json.parse(localStorage.getItem("Favorites")) || [];

const apiKey = "5fa2b72e548d5bb8d182e2c08f89c310";
const baseURL = "https://api.themoviedb.org/3/movie/top_rated";

async function buscarGeneros() {
  const resposta = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=pt-BR`
  );
  const dados = await resposta.json();
  generos = dados.genres;
  localStorage.setItem("generos", JSON.stringify(generos));
}

async function buscarTop160() {
  // Cada página traz 20 filmes. Pegamos 5 páginas = 100 filmes
  for (let page = 1; page <= 8; page++) {
    const response = await fetch(
      `${baseURL}?api_key=${apiKey}&language=pt-BR&page=${page}`
    );
    const data = await response.json();
    filmes = filmes.concat(data.results);
  }
  localStorage.setItem("filmes", JSON.stringify(filmes));
}

buscarGeneros();
buscarTop160();
localStorage.setItem("Favorites", JSON.stringify(FavID));
