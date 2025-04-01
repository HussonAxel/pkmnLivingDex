import { PokemonType } from "./PokemonCard";

interface PokemonBioDataTypes {
  name: string;
  picture: string;
  description: string;
  pokemonBiodata: {
    species: string;
    height: string;
    weight: string;
    gender: string;
    region: string;
    abilities: string[];
  };
  ID: string;
}

export function PokemonBioData(props: PokemonBioDataTypes) {
  const { name, ID, picture, description, pokemonBiodata } = props;

  return (
    <section className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-8 md:p-24 backdrop-blur-sm p-24 min-w-[1600px] max-w-[1600px] w-full">
      <div className="flex flex-col items-center justify-center bg-white/5 rounded-lg p-6 text-center">
        <div className="relative group mb-4">
          <img
            src={picture}
            alt={name}
            className="w-64 h-64 md:w-80 md:h-80 object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <p className="text-center uppercase font-anton text-2xl md:text-3xl text-white/90 tracking-wider mb-1">
          {name}
        </p>
        <span className="font-worksans text-lg text-white/70 tracking-wide">
          {ID}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:col-span-2 content-start">
        <div className="p-4 col-span-1 sm:col-span-2">
          <span className="capitalize text-md text-white/60 tracking-wider mb-1 block">
            Description
          </span>
          <p className="text-lg md:text-xl text-white/90 tracking-wider whitespace-pre-line font-worksans">
            {description}
          </p>
        </div>

        {Object.entries(pokemonBiodata).map(([key, value]) => (
          <div
            key={key}
            className="flex flex-col p-4 rounded-lg transition-colors duration-300 font-worksans"
          >
            <span className="capitalize text-md text-white/60 tracking-wider mb-1">
              {key}
            </span>
            <span className="text-xl md:text-2xl text-white/90 capitalize ">
              {Array.isArray(value) ? value.join(", ") : value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
