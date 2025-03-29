import { PokemonCard } from "./PokemonCard";
import { ViewSettings } from "~/types/pokemonTypes";
import { getGenerationVariantsForm } from "~/utils/pokemonUtils";

type PokemonGridProps = {
  generationData: any[];
  viewSettings: ViewSettings;
};

export function PokemonGrid({
  generationData,
  viewSettings,
}: PokemonGridProps) {
  const isRegionalForm = (pokemonName: string): boolean => {
    return getGenerationVariantsForm.some((region) =>
      pokemonName.toLowerCase().includes(region.toLowerCase())
    );
  };

  const basicForms = generationData.filter(
    (pokemon) => !isRegionalForm(pokemon.name[viewSettings.language])
  );
  const regionalVariants = generationData.filter((pokemon) =>
    isRegionalForm(pokemon.name[viewSettings.language])
  );

  return (
    <div className="space-y-8">
      {basicForms.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4 font-worksans">
            Basic Forms
          </h3>
          <div
            className={`grid gap-8 ${
              viewSettings.isGridView
                ? "md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6"
                : "md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3"
            }`}
          >
            {basicForms.map((pokemon) => (
              <PokemonCard
                key={pokemon.pokedex_id}
                pokemon={pokemon}
                viewSettings={viewSettings}
              />
            ))}
          </div>
        </div>
      )}

      {regionalVariants.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4 font-worksans">
            Regional Variants
          </h3>
          <div
            className={`grid gap-8 ${
              viewSettings.isGridView
                ? "md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6"
                : "md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3"
            }`}
          >
            {regionalVariants.map((pokemon) => (
              <PokemonCard
                key={pokemon.pokedex_id}
                pokemon={pokemon}
                viewSettings={viewSettings}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
