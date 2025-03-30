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
  if (name === "Galarian Mr. Mime") {
    return "mr-mime-galar";
  }
  if (name === "Mime Jr.") {
    return "mime-jr";
  }
  if (name === "Mr. Mime") {
    return "mr-mime";
  }
  const regionMappings: Record<string, string> = {
    Alolan: "alola",
    Paldean: "paldea",
    Hisuian: "hisui",
    Galarian: "galar",
  };

  let formattedName = name.replace(/[\s \.]/g, "-").replace(/[\'\.]/g, "");

  for (const [search, replace] of Object.entries(regionMappings)) {
    if (formattedName.includes(search)) {
      formattedName = formattedName
        .replace(search, "")
        .trim()
        .replace(/^-|-$/g, "");
      formattedName = `${formattedName}-${replace}`;
    }
  }

  return formattedName.toLowerCase();
};

export const hasPokemonRegionalVariant = (pokemon: Pokemon): boolean => {
  return getGenerationVariantsForm.some((variant) =>
    pokemon.name.en.includes(variant),
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

export const generationToRegion = {
  "generation-i": "Kanto",
  "generation-ii": "Johto",
  "generation-iii": "Hoenn",
  "generation-iv": "Sinnoh",
  "generation-v": "Unova",
  "generation-vi": "Kalos",
  "generation-vii": "Alola",
  "generation-viii": "Galar",
  "generation-ix": "Paldea",
};

export const formatPokedexID = (id: number): string => {
  return id.toString().padStart(4, "0");
};
