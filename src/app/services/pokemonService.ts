import axios from "axios";

export const fetchPokemons = async () => {
  const response = await axios.get("/api/pokemons");
  return response.data;
};
