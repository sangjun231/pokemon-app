import axios from "axios";

export const getPokemons = async () => {
  const response = await axios.get("/api/pokemons");
  return response.data;
};

export const getPokemon = async (id: string) => {
  const response = await axios.get(`/api/pokemons/${id}`);
  return response.data;
};
