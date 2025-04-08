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
    <section className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-8 backdrop-blur-sm min-w-[1600px] max-w-[1600px] w-full">
      <div className="flex flex-col items-center justify-center text-center ">
        <div className="relative">
          <img
            src={picture}
            alt={name}
            className="w-48 h-48 md:w-64 md:h-64 object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <div className="flex flex-col align-middle items-center mb-4">
            <p className="text-center uppercase font-bebas text-2xl md:text-3xl tracking-wider content-center">
              {name}
            </p>
            <span className="text-xl ml-4 opacity-80">{ID}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:col-span-2 content-start">
        <div className="p-4 col-span-1 sm:col-span-2">
          <span className="text-md tracking-wider mb-1 block uppercase font-worksans">
            Description
          </span>
          <p className="text-lg md:text-xl tracking-wider whitespace-pre-line font-bebas">
            {description}
          </p>
        </div>

        {Object.entries(pokemonBiodata).map(([key, value]) => (
          <div
            key={key}
            className="flex flex-col p-4 rounded-lg transition-colors duration-300 font-worksans"
          >
            <span className="text-md tracking-wider mb-1 uppercase">{key}</span>
            <span className="text-xl md:text-2xl uppercase font-bebas">
              {Array.isArray(value) ? value.join(", ") : value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
