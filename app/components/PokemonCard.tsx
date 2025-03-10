import { ViewSettings } from "~/types/pokemonTypes";

type PokemonCardProps = {
  pokemon: any;
  viewSettings: ViewSettings;
};

export function PokemonCard({ pokemon, viewSettings }: PokemonCardProps) {
  const getOfficialArtworkUrl = (pokemonId: number) => {
    const baseUrl =
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork";

    return `${baseUrl}${viewSettings.isShiny ? "/shiny" : ""}/${pokemonId}.png`;
  };

  const getGenerationVariantsForm = ["Paldea", "Alola", "Hisui", "Galar"];

  return (
    <div className="p-4 border rounded-lg shadow hover:shadow-md transition-all hover:bg-white/20 hover:border-white/40 hover:scale-105 ">
      <div
        key={pokemon.pokedex_id}
        className={`${viewSettings.isUserDatabase ? "opacity-30" : "opacity-100"}`}
      >
        <img
          src={getOfficialArtworkUrl(pokemon.pokedex_id)}
          alt={pokemon.name[viewSettings.language]}
          className={`mx-auto object-contain ${viewSettings.isGridView ? "w-32 h-32" : "w-24 h-24 float-left mr-4"}`}
          onError={(e) => {
            (e.target as HTMLImageElement).src = pokemon.sprites.regular;
          }}
        />

        <div
          className={`${viewSettings.isGridView ? "mt-2 text-center" : "flex flex-col justify-center h-24"}`}
        >
          <span className={viewSettings.isGridView ? "" : "text-sm"}>
            #{pokemon.pokedex_id}
          </span>

          <h3 className="font-semibold">
            {pokemon.name[viewSettings.language]}
          </h3>

          <div
            className={`flex gap-2 mt-1 ${viewSettings.isGridView ? "justify-center" : ""}`}
          >
            {pokemon.types ? (
              pokemon.types.map((type: { name: string }) => (
                <PokemonType key={type.name} type={type} />
              ))
            ) : (
              <div>No types available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function PokemonType({ type }: { type: { name: string } }) {
  return (
    <div className={`text-md rounded-full p-2 ${type.name}`} title={type.name}>
      <img
        src={`/assets/static/pkmnsTypes/${type.name}.svg`}
        alt={type.name}
        className="w-4 h-4 object-contain"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/assets/static/placeholder.svg";
        }}
      />
    </div>
  );
}
