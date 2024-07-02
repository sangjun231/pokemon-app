"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getPokemons } from "@/app/services/pokemonService";
import Link from "next/link";

type Pokemon = {
  id: number;
  name: string;
  korean_name: string;
  height: number;
  weight: number;
  sprites: { front_default: string };
  types: { type: { name: string; korean_name: string } }[];
  abilities: { ability: { name: string; korean_name: string } }[];
  moves: { move: { name: string; korean_name: string } }[];
};

const PokemonList = () => {
  const {
    data: pokemons,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["pokemons"],
    queryFn: getPokemons,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div>
      <h2 className="flex justify-center mb-4">Pokemon List</h2>
      <ul className="grid grid-cols-6 gap-4 mx-4">
        {pokemons.map((pokemon: Pokemon) => (
          <li
            key={pokemon.id}
            className="flex flex-col items-center p-4 border rounded shadow"
          >
            <Link href={`/pokemons/${pokemon.id}`}>
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="w-20 h-20"
              />
              <p>{pokemon.korean_name || pokemon.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;
