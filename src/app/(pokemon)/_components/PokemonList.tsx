"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useRef, useEffect } from "react";
import { getPokemons } from "@/services/pokemonService";
import Link from "next/link";
import Image from "next/image";
import { TOTAL_POKEMON, POKEMON_PER_PAGE } from "@/constants/constants";

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
// 무한스크롤 다시 보자..
const PokemonList = () => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["pokemons"],
    queryFn: ({ pageParam = 1 }: number) => getPokemons(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      if (allPages.length * POKEMON_PER_PAGE < TOTAL_POKEMON)
        return allPages.length + 1;
      return undefined;
    },
  });

  const observerElem = useRef<HTMLDivElement>(null);
  // 개선해보기
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (observerElem.current) {
      observer.observe(observerElem.current);
    }

    return () => {
      if (observerElem.current) {
        observer.unobserve(observerElem.current);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div>
      <h2 className="flex justify-center mb-4">Pokemon List</h2>
      <ul className="grid grid-cols-6 gap-4">
        {data?.pages.flatMap((page) =>
          page.map((pokemon: Pokemon) => (
            <li
              key={pokemon.id}
              className="flex flex-col items-center text-center border rounded shadow"
            >
              <Link href={`/pokemons/${pokemon.id}`}>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={200}
                  height={200}
                />
                <p>{pokemon.korean_name || pokemon.name}</p>
              </Link>
            </li>
          ))
        )}
      </ul>
      <div ref={observerElem} className="h-10 text-xl"></div>
      {isFetchingNextPage && <div>Loading more...</div>}
    </div>
  );
};

export default PokemonList;
