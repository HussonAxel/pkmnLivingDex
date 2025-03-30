export type PokemonsListType = {
  count: number;
  next: null;
  previous: null;
  results: Array<{
    name: string;
    url: string;
  }>;
};

export type PokemonListType = {
  results: Array<{
    name: string;
    url: string;
  }>;
};

export type PokemonDetailsType = {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  order: number;
  is_default: boolean;
  location_area_encounters: string;
  species: {
    name: string;
    url: string;
  };
  sprites: {
    back_default: string | null;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
    other: {
      dream_world: {
        front_default: string | null;
        front_female: string | null;
      };
      home: {
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
      };
      "official-artwork": {
        front_default: string | null;
        front_shiny: string | null;
      };
      showdown: {
        back_default: string | null;
        back_female: string | null;
        back_shiny: string | null;
        back_shiny_female: string | null;
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
      };
    };
    versions: {
      "generation-i": {
        "red-blue": {
          back_default: string | null;
          back_gray: string | null;
          back_transparent: string | null;
          front_default: string | null;
          front_gray: string | null;
          front_transparent: string | null;
        };
        yellow: {
          back_default: string | null;
          back_gray: string | null;
          back_transparent: string | null;
          front_default: string | null;
          front_gray: string | null;
          front_transparent: string | null;
        };
      };
      "generation-ii": {
        crystal: {
          back_default: string | null;
          back_shiny: string | null;
          back_shiny_transparent: string | null;
          back_transparent: string | null;
          front_default: string | null;
          front_shiny: string | null;
          front_shiny_transparent: string | null;
          front_transparent: string | null;
        };
        gold: {
          back_default: string | null;
          back_shiny: string | null;
          front_default: string | null;
          front_shiny: string | null;
          front_transparent: string | null;
        };
        silver: {
          back_default: string | null;
          back_shiny: string | null;
          front_default: string | null;
          front_shiny: string | null;
          front_transparent: string | null;
        };
      };
      "generation-iii": {
        emerald: {
          front_default: string | null;
          front_shiny: string | null;
        };
        "firered-leafgreen": {
          back_default: string | null;
          back_shiny: string | null;
          front_default: string | null;
          front_shiny: string | null;
        };
        "ruby-sapphire": {
          back_default: string | null;
          back_shiny: string | null;
          front_default: string | null;
          front_shiny: string | null;
        };
      };
      "generation-iv": {
        "diamond-pearl": {
          back_default: string | null;
          back_female: string | null;
          back_shiny: string | null;
          back_shiny_female: string | null;
          front_default: string | null;
          front_female: string | null;
          front_shiny: string | null;
          front_shiny_female: string | null;
        };
        "heartgold-soulsilver": {
          back_default: string | null;
          back_female: string | null;
          back_shiny: string | null;
          back_shiny_female: string | null;
          front_default: string | null;
          front_female: string | null;
          front_shiny: string | null;
          front_shiny_female: string | null;
        };
        platinum: {
          back_default: string | null;
          back_female: string | null;
          back_shiny: string | null;
          back_shiny_female: string | null;
          front_default: string | null;
          front_female: string | null;
          front_shiny: string | null;
          front_shiny_female: string | null;
        };
      };
      "generation-v": {
        "black-white": {
          animated: {
            back_default: string | null;
            back_female: string | null;
            back_shiny: string | null;
            back_shiny_female: string | null;
            front_default: string | null;
            front_female: string | null;
            front_shiny: string | null;
            front_shiny_female: string | null;
          };
          back_default: string | null;
          back_female: string | null;
          back_shiny: string | null;
          back_shiny_female: string | null;
          front_default: string | null;
          front_female: string | null;
          front_shiny: string | null;
          front_shiny_female: string | null;
        };
      };
      "generation-vi": {
        "omegaruby-alphasapphire": {
          front_default: string | null;
          front_female: string | null;
          front_shiny: string | null;
          front_shiny_female: string | null;
        };
        "x-y": {
          front_default: string | null;
          front_female: string | null;
          front_shiny: string | null;
          front_shiny_female: string | null;
        };
      };
      "generation-vii": {
        icons: {
          front_default: string | null;
          front_female: string | null;
        };
        "ultra-sun-ultra-moon": {
          front_default: string | null;
          front_female: string | null;
          front_shiny: string | null;
          front_shiny_female: string | null;
        };
      };
      "generation-viii": {
        icons: {
          front_default: string | null;
          front_female: string | null;
        };
      };
    };
  };
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
  abilities: Array<{
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }>;
  forms: Array<{
    name: string;
    url: string;
  }>;
  game_indices: Array<any>;
  held_items: Array<any>;
  moves: Array<{
    move: {
      name: string;
      url: string;
    };
    version_group_details: Array<{
      level_learned_at: number;
      move_learn_method: {
        name: string;
        url: string;
      };
      version_group: {
        name: string;
        url: string;
      };
    }>;
  }>;
  past_abilities: Array<any>;
  past_types: Array<any>;
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }>;
  cries: {
    latest: string | null;
    legacy: string | null;
  };
};

export interface GenerationsRoot {
  abilities: any[];
  id: number;
  main_region: MainRegion;
  moves: Mfe[];
  name: string;
  names: Name[];
  pokemon_species: PokemonSpecy[];
  types: Type[];
  version_groups: VersionGroup[];
}

export interface MainRegion {
  name: string;
  url: string;
}

export interface Mfe {
  name: string;
  url: string;
}

export interface Name {
  language: Language;
  name: string;
}

export interface Language {
  name: string;
  url: string;
}

export interface PokemonSpecy {
  name: string;
  url: string;
}

export interface Type {
  name: string;
  url: string;
}

export interface VersionGroup {
  name: string;
  url: string;
}

export type RootpokemonDetailsPerGenerations = pokemonDetailsPerGenerations[];

export interface pokemonDetailsPerGenerations {
  pokedex_id: number;
  generation: number;
  category: string;
  name: Name;
  sprites: Sprites;
  types: Type[];
  talents: Talent[];
  stats: Stats;
  resistances: Resistance[];
  evolution?: Evolution;
  height: string;
  weight: string;
  egg_groups?: string[];
  sexe?: Sexe;
  catch_rate: number;
  level_100: number;
  formes?: Forme[];
}

export interface Name {
  fr: string;
  en: string;
  jp: string;
}

export interface Sprites {
  regular: string;
  shiny?: string;
  gmax: any;
}

export interface Type {
  name: string;
  image: string;
}

export interface Talent {
  name: string;
  tc: boolean;
}

export interface Stats {
  hp: number;
  atk: number;
  def: number;
  spe_atk: number;
  spe_def: number;
  vit: number;
}

export interface Resistance {
  name: string;
  multiplier: number;
}

export interface Evolution {
  pre?: Pre[];
  next?: Next[];
  mega: any;
}

export interface Pre {
  pokedex_id: number;
  name: string;
  condition?: string;
  conditio?: string;
}

export interface Next {
  pokedex_id: number;
  name: string;
  condition: string;
}

export interface Sexe {
  male: number;
  female: number;
}

export interface Forme {
  region: string;
  name: Name2;
}

export interface Name2 {
  fr: string;
  en: string;
  jp: string;
}

export interface PokemonType {
  name: string;
  url?: string;
}

export interface PokemonSprites {
  regular: string;
  shiny?: string;
}

export interface Pokemon {
  pokedex_id: number;
  generation: number;
  category: string;
  name: {
    en: string;
    fr: string;
  };
  types: PokemonType[];
  sprites: PokemonSprites;
  evolution?: any;
  talents?: any[];
  stats?: any;
  resistances?: any[];
}

// Evolution chain interfaces

export interface PokemonForm {
  id?: string;
  pokedex_id?: number;
  name?: string;
  condition?: string;
  sprites?: {
    regular?: string;
  };
}

export interface MegaForm extends PokemonForm {
  name?: string;
}

export interface PokemonData {
  pokedex_id?: number;
  name?: {
    en?: string;
  };
  evolution?: {
    pre?: PokemonForm[];
    next?: PokemonForm[];
    mega?: MegaForm[];
  };
  formes?: any[];
  sprites?: {
    gmax?: string;
  };
}

export interface GmaxQueryResult {
  success: boolean;
  image?: string;
  sprites?: any;
}
