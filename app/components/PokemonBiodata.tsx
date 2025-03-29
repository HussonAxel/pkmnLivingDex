interface PokemonBioDataTypes {
  name: string;
  desc: string;
  picture: string;
  pokemonBiodata: {
    species: string;
    height: string;
    weight: string;
    gender: string;
    region: string;
    abilities: Ability[];
  };
}
export interface Ability {
  ability: Ability2;
  is_hidden: boolean;
  slot: number;
}

export interface Ability2 {
  name: string;
  url: string;
}

export function PokemonBioData(props: PokemonBioDataTypes) {
  return (
    <section className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-8 p-6 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center space-y-4">
        <p className="text-center uppercase font-anton text-2xl md:text-3xl text-white/90 tracking-wider">
          [{props.desc}]
        </p>
        <div className="relative group">
          <img
            src={props.picture}
            alt={props.name}
            className="w-64 h-64 object-contain transition-transform duration-300"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 md:col-span-2">
        {Object.entries(props.pokemonBiodata).map(([key, value]) => (
          <div
            key={key}
            className="flex flex-col items-center p-4 rounded-lg transition-colors duration-300"
          >
            <span className="uppercase font-worksans text-sm text-white/60 tracking-wider mb-2">
              {key}
            </span>
            <span className="uppercase font-anton text-xl md:text-2xl text-white/90 tracking-wider">
              {Array.isArray(value)
                ? value.map((ability) => ability.ability.name).join(", ")
                : value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
