import {
  Info,
  PlusCircle,
  Share,
  Sparkles,
  Target,
  Trash2,
} from "lucide-react";
import { Pokemon } from "~/types/pokemonTypes";

export const getOfficialArtworkUrl = (pokemonId: number, isShiny: boolean) => {
  const baseUrl =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork";

  return `${baseUrl}${isShiny ? "/shiny" : ""}/${pokemonId}.png`;
};

export const getGenerationVariantsForm = ["Paldea", "Alola", "Hisui", "Galar"];

export const formatPokemonNameForUrl = (name: string): string => {
  return name
    .replace(/[\s\.]/g, "-")
    .replace(/[\'\.]/g, "")
    .toLowerCase();
};

export const hasPokemonRegionalVariant = (pokemon: Pokemon): boolean => {
  return getGenerationVariantsForm.some((variant) =>
    pokemon.name.en.includes(variant)
  );
};

export const dropdownPokemonCard = [
  { icon: PlusCircle, text: "Add to collection" },
  { icon: Sparkles, text: "Add to collection as shiny" },
  {
    icon: Info,
    text: "See more information",
  },
  { icon: Target, text: "Start Hunting" },
  {
    icon: Trash2,
    text: "Remove from collection",
  },
  { icon: Share, text: "Share pokemon's page" },
];
