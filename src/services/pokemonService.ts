import axios from "axios";

export const getPokemons = async (page: number) => {
  try {
    const response = await axios.get(`/api/pokemons?page=${page}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching pokemons:", error);
    throw new Error("Failed to fetch pokemons");
  }
};

export const getPokemon = async (id: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/pokemons/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching pokemon with id ${id}:`, error);
    throw new Error("Failed to fetch pokemon");
  }
};
