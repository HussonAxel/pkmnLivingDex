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
    <section className="grid grid-cols-3">
      <div className="flex flex-col justify-center m-auto">
        <p className="text-center uppercase font-anton text-2xl">
          [{props.desc}]
        </p>
        <img src={props.picture} alt={props.name} className="w-64 h-64" />
      </div>
      <div className="grid grid-cols-2">
        {Object.entries(props.pokemonBiodata).map(([key, value]) => (
          <div key={key} className="flex flex-col text-center">
            <span className="uppercase font-worksans text-[15px] text-center">
              {key}:
            </span>
            <span className="uppercase font-anton text-[34px]">
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
