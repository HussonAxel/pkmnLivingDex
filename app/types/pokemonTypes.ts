import { PokeAPI } from "pokeapi-types";

export type ViewSettings = {
  isShiny: boolean;
  isUserDatabase: boolean;
  language: "fr" | "en";
  isGridView: boolean;
};

export type PokemonType = {
  name: string;
  url?: string;
  image?: string;
};

export type PokemonSprites = {
  regular: string;
  shiny?: string;
  gmax?: string;
  back_default?: string | null;
  back_female?: string | null;
  back_shiny?: string | null;
  back_shiny_female?: string | null;
  front_default?: string | null;
  front_female?: string | null;
  front_shiny?: string | null;
  front_shiny_female?: string | null;
};

export type Pokemon = {
  pokedex_id: number;
  generation: number;
  category: string;
  name: {
    en: string;
    fr: string;
    jp?: string;
    [key: string]: string | undefined;
  };
  types: PokemonType[];
  sprites: PokemonSprites;
  evolution?: {
    pre?: PokemonForm[];
    next?: PokemonForm[];
    mega?: MegaForm[];
  };
  talents?: Talent[];
  stats?: Stats;
  resistances?: Resistance[];
  height?: string;
  weight?: string;
  egg_groups?: string[];
  sexe?: Sexe;
  catch_rate?: number;
  level_100?: number;
  formes?: Forme[];
};

export type PokemonForm = {
  id?: string;
  pokedex_id?: number;
  name?: string;
  condition?: string;
  sprites?: {
    regular?: string;
  };
};

export type MegaForm = PokemonForm & {
  name?: string;
};

export type Talent = {
  name: string;
  tc: boolean;
};

export type Stats = {
  hp: number;
  atk: number;
  def: number;
  spe_atk: number;
  spe_def: number;
  vit: number;
};

export type Resistance = {
  name: string;
  multiplier: number;
};

export type Sexe = {
  male: number;
  female: number;
};

export type Forme = {
  region: string;
  name: {
    fr: string;
    en: string;
    jp: string;
  };
};

export type PokemonCardProps = {
  pokemon: Pokemon;
  viewSettings: ViewSettings;
};

export type PokemonListResponse = PokeAPI.NamedAPIResourceList;

export type PokemonSpeciesType = PokeAPI.PokemonSpecies;

export interface PokemonListType extends PokeAPI.NamedAPIResourceList {
  results: pokemonListPerGenType[];
}

export interface pokemonListPerGenType extends PokeAPI.NamedAPIResource {}

export interface MainRegionsTypes {
  abilities: any[];
  id: number;
  main_region: MainRegion;
  moves: MainRegion[];
  name: string;
  names: Name[];
  pokemon_species: MainRegion[];
  types: MainRegion[];
  version_groups: MainRegion[];
}

export interface MainRegion extends PokeAPI.NamedAPIResource {}

export interface Name {
  language: MainRegion;
  name: string;
}

export interface PokemonDetailsType extends PokeAPI.Pokemon {}

export interface Ability extends PokeAPI.PokemonAbility {}

export interface Species extends PokeAPI.NamedAPIResource {}

export interface Cries {
  latest: string;
  legacy: string;
}

export interface GameIndex extends PokeAPI.VersionGameIndex {}

export interface HeldItem extends PokeAPI.PokemonHeldItem {}

export interface VersionDetail extends PokeAPI.PokemonHeldItemVersion {}

export interface Move extends PokeAPI.PokemonMove {}

export interface VersionGroupDetail extends PokeAPI.PokemonMoveVersion {}

export interface GenerationV {
  "black-white": Sprites;
}

export interface GenerationIv {
  "diamond-pearl": Sprites;
  "heartgold-soulsilver": Sprites;
  platinum: Sprites;
}

export interface Versions {
  "generation-i": GenerationI;
  "generation-ii": GenerationIi;
  "generation-iii": GenerationIii;
  "generation-iv": GenerationIv;
  "generation-v": GenerationV;
  "generation-vi": { [key: string]: Home };
  "generation-vii": GenerationVii;
  "generation-viii": GenerationViii;
}

export interface DreamWorld {
  front_default: string | null;
  front_female: string | null;
}

export interface Home {
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}

export interface OfficialArtwork {
  front_default: string | null;
  front_shiny: string | null;
}

export interface PokemonSpriteOther {
  dream_world?: DreamWorld;
  home?: Home;
  "official-artwork"?: OfficialArtwork;
  [key: string]: any;
}

export interface Sprites {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  other?: PokemonSpriteOther;
  versions?: Versions;
  animated?: Sprites;
}

export interface GenerationI {
  "red-blue": RedBlue;
  yellow: RedBlue;
}

export interface RedBlue {
  back_default: string;
  back_gray: string;
  back_transparent: string;
  front_default: string;
  front_gray: string;
  front_transparent: string;
}

export interface GenerationIi {
  crystal: Crystal;
  gold: Gold;
  silver: Gold;
}

export interface Crystal {
  back_default: string;
  back_shiny: string;
  back_shiny_transparent: string;
  back_transparent: string;
  front_default: string;
  front_shiny: string;
  front_shiny_transparent: string;
  front_transparent: string;
}

export interface Gold {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
  front_transparent?: string;
}

export interface GenerationIii {
  emerald: OfficialArtwork;
  "firered-leafgreen": Gold;
  "ruby-sapphire": Gold;
}

export interface GenerationVii {
  icons: DreamWorld;
  "ultra-sun-ultra-moon": Home;
}

export interface GenerationViii {
  icons: DreamWorld;
}

export interface Stat extends PokeAPI.PokemonStat {}

export interface Type extends PokeAPI.PokemonType {}

export type PokemonBioData = {
  species: string;
  height: string;
  weight: string;
  gender: string;
  region: string;
  abilities: string[];
  forms?: string;
};
