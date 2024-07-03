import { NextResponse } from "next/server";
import axios from "axios";
import { TOTAL_POKEMON, POKEMON_PER_PAGE } from "@/constants/constants";

export const GET = async (request: Request) => {
  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const start = (page - 1) * POKEMON_PER_PAGE + 1;
    const end = Math.min(start + POKEMON_PER_PAGE - 1, TOTAL_POKEMON);

    const allPokemonPromises = Array.from(
      { length: end - start + 1 },
      (_, index) => {
        const id = start + index;
        return Promise.all([
          axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`),
          axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
        ]);
      }
    );

    const allPokemonResponses = await Promise.all(allPokemonPromises);

    const allPokemonData = allPokemonResponses.map(
      ([response, speciesResponse]) => {
        const koreanName = speciesResponse.data.names.find(
          (name: any) => name.language.name === "ko"
        );
        return { ...response.data, korean_name: koreanName?.name || null };
      }
    );

    return NextResponse.json(allPokemonData);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" });
  }
};
