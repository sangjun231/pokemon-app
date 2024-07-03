import React from "react";
import { getPokemon } from "@/services/pokemonService";
import Link from "next/link";
import Image from "next/image";

type Type = {
  type: { name: string; korean_name: string };
};

type Ability = {
  ability: { name: string; korean_name: string };
};

type Move = {
  move: { name: string; korean_name: string };
};

type Pokemon = {
  id: number;
  name: string;
  korean_name: string;
  height: number;
  weight: number;
  sprites: { front_default: string };
  types: Type[];
  abilities: Ability[];
  moves: Move[];
};

const PokemonDetail = async ({ id }: { id: string }) => {
  const pokemon: Pokemon = await getPokemon(id);

  return (
    <div className="container mx-auto p-4">
      <Image
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        width={300}
        height={300}
      />
      <h2 className="text-2xl font-bold mb-4">
        이름: {pokemon.korean_name || pokemon.name}
      </h2>

      <p>
        <strong>키:</strong> {`${pokemon.height / 10}m`}
      </p>
      <p>
        <strong>무게:</strong> {`${pokemon.weight / 10}kg`}
      </p>
      <p>
        <strong>타입: </strong>
        {pokemon.types
          .map((type: Type) => type.type.korean_name || type.type.name)
          .join(", ")}
      </p>
      <p>
        <strong>특성: </strong>
        {pokemon.abilities
          .map(
            (ability: Ability) =>
              ability.ability.korean_name || ability.ability.name
          )
          .join(", ")}
      </p>
      <p>
        <strong>기술: </strong>
        {pokemon.moves
          .map((move: Move) => move.move.korean_name || move.move.name)
          .join(", ")}
      </p>
      <Link href="/pokemonList" className="text-blue-500 underline">
        뒤로 가기
      </Link>
    </div>
  );
};

export default PokemonDetail;
