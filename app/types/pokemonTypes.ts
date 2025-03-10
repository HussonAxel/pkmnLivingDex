export type ViewSettings = {
  isShiny: boolean;
  language: "en" | "fr";
  isGridView: boolean;
};

export type PokemonType = {
  name: string;
  // Add other type properties as needed
};

export type Pokemon = {
  pokedex_id: number;
  name: {
    en: string;
    fr: string;
    [key: string]: string;
  };
  types: PokemonType[];
  sprites: {
    regular: string;
    // Add other sprite properties as needed
  };
  // Add other pokemon properties as needed
};
