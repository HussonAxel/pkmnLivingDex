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
  // Create a mapping for regional forms
  const regionMappings: Record<string, string> = {
    Alolan: "alola",
    Paldean: "paldea",
    Hisuian: "hisui",
    Galarian: "galar",
  };

  // First, replace special characters
  let formattedName = name.replace(/[\s \.]/g, "-").replace(/[\'\.]/g, "");

  // Handle regional forms with reordering
  for (const [search, replace] of Object.entries(regionMappings)) {
    if (formattedName.includes(search)) {
      // Remove the regional form name and add it at the end
      formattedName = formattedName
        .replace(search, "")
        .trim()
        .replace(/^-|-$/g, ""); // Remove any leading/trailing hyphens
      formattedName = `${formattedName}-${replace}`;
    }
  }

  return formattedName.toLowerCase();
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
