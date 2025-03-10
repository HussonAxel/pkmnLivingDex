export type ViewSettings = {
  isShiny: boolean;
  isUserDatabase: boolean;
  language: "en" | "fr";
  isGridView: boolean;
};

export type PokemonType = {
  name: string;
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
  };
};
