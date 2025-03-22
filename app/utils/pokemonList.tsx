import { queryOptions } from "@tanstack/react-query";
import { notFound, NotFoundError } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import {
  PokemonDetailsType,
  PokemonListType,
  PokemonsListType,
  GenerationsRoot,
  RootpokemonDetailsPerGenerations,
} from "./types/pokemonList.types";
import axios from "redaxios";

const pokeAPIRootURL = "https://pokeapi.co/api/v2/";
const tyradexAPIRootURL = "https://tyradex.vercel.app/api/v1/";

type GenerationData =
  | (GenerationsRoot & { displayName: string })
  | { name: string; displayName: string; error?: boolean };

export const fetchGenerationsDetails = createServerFn({
  method: "GET",
}).handler(async () => {
  console.info("Fetching generations with full data...");

  const generationsList = await axios
    .get<PokemonsListType>(`${pokeAPIRootURL}generation/`)
    .then((response) => response.data.results);

  const generationsData = await Promise.all(
    generationsList.map(async (gen) => {
      const genId = gen.url.split("/").filter(Boolean).pop();

      try {
        const fullData = await axios
          .get<GenerationsRoot>(`${pokeAPIRootURL}generation/${genId}`)
          .then((response) => response.data);

        return {
          ...fullData,
          displayName: fullData.name,
        } as GenerationData;
      } catch (error) {
        console.error(
          `Error fetching details for generation ${gen.name}:`,
          error
        );
        return {
          ...gen,
          displayName: gen.name,
          error: true,
        } as GenerationData;
      }
    })
  );
  return generationsData;
});

export const pokemonQueryGenerationsDetailsOptions = () =>
  queryOptions({
    queryKey: ["generations-full-data"],
    queryFn: () => fetchGenerationsDetails(),
  });

export const pokemonsPerGenerationDetails = createServerFn({
  method: "GET",
}).handler(async () => {
  console.info("Fetching generations with full data...");

  const generationsList = await axios
    .get<PokemonsListType>(`${pokeAPIRootURL}generation/`)
    .then((response) => response.data.results);

  const pokemonsPerGeneration = await Promise.all(
    generationsList.map(async (gen, index) => {
      const genId = gen.url.split("/").filter(Boolean).pop();
      try {
        const pokemonListPerGen = await axios
          .get<RootpokemonDetailsPerGenerations>(
            `${tyradexAPIRootURL}gen/${genId}`
          )
          .then((response) => response.data);

        // Filter out MissingNo from the first generation
        if (index === 0) {
          return pokemonListPerGen.filter(
            (pokemon) => pokemon.pokedex_id !== 0
          );
        }
        return pokemonListPerGen;
      } catch (error) {
        console.error(
          `Error fetching details for generation ${gen.name}:`,
          error
        );
        return {
          name: gen.name,
          url: gen.url,
          error: true,
        };
      }
    })
  );
  return pokemonsPerGeneration;
});

export const pokemonsPerGenerationDetailsOptions = (genID: string) =>
  queryOptions({
    queryKey: ["pokemon", "details", genID],
    queryFn: () => pokemonsPerGenerationDetails(),
    staleTime: 1000 * 60 * 10,
  });

export const fetchPokemonList = createServerFn({ method: "GET" }).handler(
  async () => {
    console.info("Fetching pokemon list...");
    return axios
      .get<PokemonsListType>(`${pokeAPIRootURL}pokemon?limit=-1`)
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
      .get<PokemonListType>(`${pokeAPIRootURL}pokemon/${data}`)
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
      .get<PokemonDetailsType>(`${pokeAPIRootURL}pokemon/${name}`)
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

export const getEntirePokedexTyradex = createServerFn({
  method: "GET",
}).handler(async () => {
  console.info("Fetching pokemon list from Tyradex");
  return axios
    .get<RootpokemonDetailsPerGenerations>(`${tyradexAPIRootURL}pokemon`)
    .then((response) =>
      response.data.filter((pokemon) => pokemon.pokedex_id !== 0)
    );
});

export const getEntirePokedexTyradexOptions = () =>
  queryOptions({
    queryKey: ["pokedex"],
    queryFn: () => getEntirePokedexTyradex(),
  });
