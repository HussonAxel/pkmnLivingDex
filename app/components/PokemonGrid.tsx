import { PokemonCard } from "./PokemonCard";
import { ViewSettings } from "~/types/pokemonTypes";

type PokemonGridProps = {
  generationData: any[];
  viewSettings: ViewSettings;
};

export function PokemonGrid({
  generationData,
  viewSettings,
}: PokemonGridProps) {
  console.log(generationData);
  return (
    <div
      className={`my-4 grid gap-8 ${
        viewSettings.isGridView
          ? "md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6"
          : "md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3"
      }`}
    >
      {generationData.map((pokemon) => (
        <PokemonCard
          key={pokemon.pokedex_id}
          pokemon={pokemon}
          viewSettings={viewSettings}
        />
      ))}
    </div>
  );
}
