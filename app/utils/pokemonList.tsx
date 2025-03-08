import { queryOptions } from "@tanstack/react-query";
import { notFound, NotFoundError } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import {
  PokemonDetailsType,
  PokemonListType,
  PokemonsListType,
} from "./types/pokemonList.types";
import axios from "redaxios";

const rootApiURL = "https://pokeapi.co/api/v2/";

export const fetchGenerationList = createServerFn({ method: "GET" }).handler(
  async () => {
    console.info("Fetching generations list...");
    return axios
      .get<PokemonsListType>(`${rootApiURL}generation/`)
      .then((response) => response.data.results);
  }
);

export const pokemonQueryGenerationOptions = () =>
  queryOptions({
    queryKey: ["generations"],
    queryFn: () => fetchGenerationList(),
  });

export const fetchPokemonList = createServerFn({ method: "GET" }).handler(
  async () => {
    console.info("Fetching pokemon list...");
    return axios
      .get<PokemonsListType>(`${rootApiURL}pokemon?limit=-1`)
      .then((response) => response.data.results);
  }
);

export const pokemonQueryOptions = () =>
  queryOptions({
    queryKey: ["pokemons"],
    queryFn: () => fetchPokemonList(),
  });

export const fetchPokemon = createServerFn({ method: "GET" })
  .validator((d: string) => d)
  .handler(async ({ data }) => {
    console.info("Fetching Pokemon Data");
    const pokemon = await axios
      .get<PokemonListType>(`${rootApiURL}${data}`)
      .then((response) => response.data)
      .catch((err) => {
        console.error(err);
        if (err.status === 404) {
          throw notFound();
        }
        throw err;
      });
    return pokemon;
  });

export const pokemonListQueryOptions = (pokemonName: string) =>
  queryOptions({
    queryKey: ["pokemon", pokemonName],
    queryFn: () => fetchPokemon({ data: pokemonName }),
  });

export const fetchPokemonDetails = createServerFn({ method: "GET" })
  .validator((name: string) => name)
  .handler(async ({ data: name }) => {
    console.info(`Fetching ${name} data...`);
    const pokemon = await axios
      .get<PokemonDetailsType>(`${rootApiURL}pokemon/${name}`)
      .then((r) => r.data)
      .catch((err) => {
        console.error(err);
        if (err.status === 404) {
          throw notFound();
        }
        throw err;
      });
    return pokemon;
  });

export const pokemonDetailsQueryOptions = (pokemonName: string) =>
  queryOptions({
    queryKey: ["pokemon", "details", pokemonName],
    queryFn: () => fetchPokemonDetails({ data: pokemonName }),
    staleTime: 1000 * 60 * 10,
  });
