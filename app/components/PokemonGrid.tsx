import { PokemonCard } from "./PokemonCard";
import { ViewSettings } from "~/types/pokemonTypes";
import { getGenerationVariantsForm } from "~/utils/pokemonUtils";

type PokemonGridProps = {
  generationData: any[];
  viewSettings: ViewSettings;
  generationID: string;
};

export function PokemonGrid({
  generationData,
  viewSettings,
  generationID,
}: PokemonGridProps) {
  const isRegionalForm = (pokemonName: string): boolean => {
    return getGenerationVariantsForm.some((region) =>
      pokemonName.toLowerCase().includes(region.toLowerCase())
    );
  };

  const sortedData = generationData.sort(
    (a, b) => a.pokedex_id - b.pokedex_id
  );

  return (
    <div>
      {generationID === "0" ? (
        <h2 className="text-[64px] py-2 font-anton uppercase">
          Toutes générations confondues
        </h2>
      ) : (
        <h2 className="text-[64px] py-2 font-anton uppercase">
          Generation {generationID}
        </h2>
      )}
      {sortedData.length > 0 && (
        <div>
          <div
            className={`grid gap-8 ${
              viewSettings.isGridView
                ? "md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6"
                : "md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3"
            }`}
          >
            {sortedData.map((pokemon, index) => {
              return (
                <PokemonCard
                  key={index}
                  pokemon={pokemon}
                  viewSettings={viewSettings}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
