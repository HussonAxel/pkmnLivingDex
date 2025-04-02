import { queryOptions } from "@tanstack/react-query";
import { notFound, NotFoundError } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import {
  Pokemon,
  PokemonDetailsType,
  PokemonSpeciesType,
  PokemonListType,
  MainRegionsTypes,
} from "../types/pokemonTypes";
import axios from "redaxios";


const pokeAPIRootURL = "https://pokeapi.co/api/v2/";
const tyradexAPIRootURL = "https://tyradex.vercel.app/api/v1/";


export const fetchGenerationsDetails = createServerFn({
  method: "GET",
}).handler(async () => {
  console.info("Fetching generations with full data...");

  const generationsList = await axios
    .get<PokemonListType>(`${pokeAPIRootURL}generation/`)
    .then((response) => response.data.results);

  const generationsData = await Promise.all(
    generationsList.map(async (gen) => {
      const genId = gen.url.split("/").filter(Boolean).pop();

      try {
        const fullData = await axios
          .get<MainRegionsTypes>(`${pokeAPIRootURL}generation/${genId}`)
          .then((response) => response.data);

        return {
          ...fullData,
          displayName: fullData.name,
        } as MainRegionsTypes;
      } catch (error) {
        console.error(
          `Error fetching details for generation ${gen.name}:`,
          error
        );
        return {
          ...gen,
          displayName: gen.name,
          error: true,
        };
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
    .get<PokemonListType>(`${pokeAPIRootURL}generation/`)
    .then((response) => response.data.results);

  const pokemonsPerGeneration = await Promise.all(
    generationsList.map(async (gen, index) => {
      const genId = gen.url.split("/").filter(Boolean).pop();
      try {
        const pokemonListPerGen = await axios
          .get<Pokemon[]>(`${tyradexAPIRootURL}gen/${genId}`)
          .then((response) => response.data);

        // Filter out MissingNo from the first generation
        if (index === 0) {
          return pokemonListPerGen.filter(
            (pokemon: Pokemon) => pokemon.pokedex_id !== 0
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
      .get<PokemonListType>(`${pokeAPIRootURL}pokemon?limit=-1`)
      .then((response) => response.data.results);
  }
);

export const pokemonQueryOptions = () =>
  queryOptions({
    queryKey: ["pokemons"],
    queryFn: () => fetchPokemonList(),
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
        if (err.response?.status === 404) {
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


export const fetchPokemonSpecies = createServerFn({ method: "GET" })
  .validator((name: string) => name)
  .handler(async ({ data: name }) => {
    console.info(`Fetching ${name} species data...`);
    const formattedName = name.split("-")[0];
    const species = await axios
      .get<PokemonSpeciesType>(
        `${pokeAPIRootURL}pokemon-species/${formattedName}`
      )
      .then((r) => r.data)
      .catch((err) => {
        console.error(err);
        if (err.status === 404) {
          throw notFound();
        }
        throw err;
      });
    return species;
  });

export const pokemonSpeciesQueryOptions = (pokemonName: string) =>
  queryOptions({
    queryKey: ["pokemon", "species", pokemonName],
    queryFn: () => fetchPokemonSpecies({ data: pokemonName }),
    staleTime: 1000 * 60 * 10,
  });
