import { queryOptions } from "@tanstack/react-query";
import { notFound, NotFoundError } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import {
  PokemonDetailsType,
  PokemonListType,
  PokemonsListType,
  GenerationsRoot,
  RootpokemonDetailsPerGenerations,
  GmaxQueryResult,
} from "./types/pokemonList.types";
import axios from "redaxios";

const pokeAPIRootURL = "https://pokeapi.co/api/v2/";
const tyradexAPIRootURL = "https://tyradex.vercel.app/api/v1/";

type GenerationData =
  | (GenerationsRoot & { displayName: string })
  | { name: string; displayName: string; error?: boolean };

interface PokemonSpeciesType {
  base_happiness: number;
  capture_rate: number;
  color: { name: string };
  egg_groups: Array<{ name: string }>;
  evolution_chain: { url: string };
  evolves_from_species: { name: string } | null;
  flavor_text_entries: Array<{
    flavor_text: string;
    language: { name: string };
    version: { name: string };
  }>;
  form_descriptions: Array<any>;
  forms_switchable: boolean;
  gender_rate: number;
  genera: Array<{
    genus: string;
    language: { name: string };
  }>;
  generation: { name: string };
  growth_rate: { name: string };
  habitat: { name: string } | null;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  names: Array<{
    language: { name: string };
    name: string;
  }>;
  order: number;
  pal_park_encounters: Array<any>;
  pokedex_numbers: Array<any>;
  shape: { name: string };
  varieties: Array<{
    is_default: boolean;
    pokemon: { name: string; url: string };
  }>;
}

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

// New query functions for Pokemon Evolution Chain

export const fetchPokemonTyradex = createServerFn({ method: "GET" })
  .validator((name: string) => name)
  .handler(async ({ data: name }) => {
    console.info(`Fetching ${name} data from Tyradex...`);
    return fetch(`${tyradexAPIRootURL}pokemon/${name}`)
      .then((res) => {
        if (!res.ok) {
          throw notFound();
        }
        return res.json();
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
  });

export const pokemonTyradexQueryOptions = (pokemonName: string) =>
  queryOptions({
    queryKey: ["pokemon-tyradex", pokemonName],
    queryFn: () => fetchPokemonTyradex({ data: pokemonName }),
    staleTime: 1000 * 60 * 10,
  });

// GMax form data query
// Using GmaxQueryResult imported from types file

export const fetchPokemonGmax = createServerFn({ method: "GET" })
  .validator((name: string) => name)
  .handler(async ({ data: name }): Promise<GmaxQueryResult> => {
    try {
      console.info(`Fetching G-Max form for ${name}...`);
      const formattedName = `${name.toLowerCase().replace(/\s+/g, "-")}-gmax`;
      const response = await fetch(`${pokeAPIRootURL}pokemon/${formattedName}`);

      if (!response.ok) {
        return { success: false };
      }

      const data = await response.json();
      return {
        success: true,
        image:
          data.sprites.other?.["official-artwork"]?.front_default ||
          data.sprites.other?.home?.front_default ||
          data.sprites.front_default,
        sprites: data.sprites,
      };
    } catch (error) {
      console.error("Error fetching G-Max form:", error);
      return { success: false };
    }
  });

export const pokemonGmaxQueryOptions = (
  pokemonName: string,
  enabled: boolean
) =>
  queryOptions({
    queryKey: ["pokemon-gmax", pokemonName],
    queryFn: () => fetchPokemonGmax({ data: pokemonName }),
    enabled,
  });
