import { Pokemon } from "~/types/pokemonTypes";

export const getOfficialArtworkUrl = (pokemonId: number, isShiny: boolean) => {
  const baseUrl =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork";

  return `${baseUrl}${isShiny ? "/shiny" : ""}/${pokemonId}.png`;
};

export const getGenerationVariantsForm = ["Paldea", "Alola", "Hisui", "Galar"];

export const hasPokemonRegionalVariant = (pokemon: Pokemon): boolean => {
  return getGenerationVariantsForm.some((variant) =>
    pokemon.name.en.includes(variant)
  );
};
