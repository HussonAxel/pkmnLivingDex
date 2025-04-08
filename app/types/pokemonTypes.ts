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

export type PokemonListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
};

export type PokemonSpeciesType = {
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
};

export interface PokemonListType {
  count: number;
  next: null;
  previous: null;
  results: pokemonListPerGenType[];
}

export interface pokemonListPerGenType {
  name: string;
  url: string;
}

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

export interface MainRegion {
  name: string;
  url: string;
}

export interface Name {
  language: MainRegion;
  name: string;
}

export interface PokemonDetailsType {
  abilities: Ability[];
  base_experience: number;
  cries: Cries;
  forms: Species[];
  game_indices: GameIndex[];
  height: number;
  held_items: HeldItem[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  past_abilities: any[];
  past_types: any[];
  species: Species;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  weight: number;
}

export interface Ability {
  ability: Species;
  is_hidden: boolean;
  slot: number;
}

export interface Species {
  name: string;
  url: string;
}

export interface Cries {
  latest: string;
  legacy: string;
}

export interface GameIndex {
  game_index: number;
  version: Species;
}

export interface HeldItem {
  item: Species;
  version_details: VersionDetail[];
}

export interface VersionDetail {
  rarity: number;
  version: Species;
}

export interface Move {
  move: Species;
  version_group_details: VersionGroupDetail[];
}

export interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: Species;
  order: null;
  version_group: Species;
}

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

export interface Other {
  dream_world: DreamWorld;
  home: Home;
  "official-artwork": OfficialArtwork;
  showdown: Sprites;
}

export interface Sprites {
  back_default: string;
  back_female: null;
  back_shiny: string;
  back_shiny_female: null;
  front_default: string;
  front_female: null;
  front_shiny: string;
  front_shiny_female: null;
  other?: Other;
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

export interface OfficialArtwork {
  front_default: string;
  front_shiny: string;
}

export interface Home {
  front_default: string;
  front_female: null;
  front_shiny: string;
  front_shiny_female: null;
}

export interface GenerationVii {
  icons: DreamWorld;
  "ultra-sun-ultra-moon": Home;
}

export interface DreamWorld {
  front_default: string;
  front_female: null;
}

export interface GenerationViii {
  icons: DreamWorld;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: Species;
}

export interface Type {
  slot: number;
  type: Species;
}

export type PokemonBioData = {
  species: string;
  height: string;
  weight: string;
  gender: string;
  region: string;
  abilities: string[];
  forms?: string;
};
