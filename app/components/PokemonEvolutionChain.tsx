import { useSuspenseQuery } from "@tanstack/react-query";
import { Route as PokemonRoute } from "~/routes/pokemons.$pokemonName";
import React from "react";
import {
  getOfficialArtworkUrl,
  formatPokemonNameForUrl,
} from "~/utils/pokemonUtils";
import {
  pokemonTyradexQueryOptions,
  pokemonGmaxQueryOptions,
} from "~/utils/pokemonList";
import {
  PokemonForm,
  MegaForm,
  PokemonData,
} from "~/utils/types/pokemonList.types";

const PokemonCard: React.FC<{
  name: string;
  imageUrl: string;
  condition?: string;
  type?: string;
  className?: string;
  onImageError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}> = ({ name, imageUrl, condition, type, className = "", onImageError }) => (
  <div
    className={`flex flex-col items-center p-8 bg-white/5 rounded-lg ${className}`}
  >
    {type && <div className="text-white/70 text-sm mb-1">{type}</div>}
    <img
      src={imageUrl}
      alt={name}
      className="w-64 h-64 object-contain"
      onError={onImageError}
    />
    <div className="text-white text-center mt-2">{name}</div>
    {condition && <p className="relative">{condition}</p>}
  </div>
);

export function PokemonEvolutionChain() {
  const { pokemonName } = PokemonRoute.useParams();

  // Use the extracted query options from pokemonList.tsx
  const tyradexQuery = useSuspenseQuery(
    pokemonTyradexQueryOptions(pokemonName)
  );

  const currentPokemon: PokemonData = tyradexQuery.data || {};
  const previousForms = currentPokemon?.evolution?.pre || [];
  const nextForms = currentPokemon?.evolution?.next || [];
  const formsData = currentPokemon?.formes || [];
  const megaForms = currentPokemon?.evolution?.mega || [];
  const gmaxForms = currentPokemon?.sprites?.gmax;

  // Use the extracted Gmax query options
  const gmaxQuery = useSuspenseQuery(
    pokemonGmaxQueryOptions(pokemonName, !!gmaxForms)
  );

  const getMegaFormUrl = (formIndex: number): string => {
    const megaForm = megaForms[formIndex] || {};

    const megaType = megaForm.name?.includes("X")
      ? "-mega-x"
      : megaForm.name?.includes("Y")
        ? "-mega-y"
        : "-mega";

    const baseName = (currentPokemon?.name?.en || pokemonName)
      .toLowerCase()
      .replace(/\s+/g, "-");

    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${baseName}${megaType}.png`;
  };

  // Handle image error by providing a fallback
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement>,
    fallbackId?: number
  ) => {
    const imgElement = e.currentTarget;
    imgElement.src = getOfficialArtworkUrl(
      fallbackId || currentPokemon?.pokedex_id || 0,
      false
    );
  };

  return (
    <section className="flex flex-col items-center w-full p-4">
      <h2 className="text-2xl font-bold text-white mb-6">Evolution Chain</h2>

      <div className="flex flex-wrap items-center justify-center gap-4">
        {previousForms.length > 0 && (
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold text-white/80 mb-2">
              Previous
            </h3>
            <div className="flex flex-wrap gap-4 justify-center">
              {previousForms.map((form) => (
                <PokemonCard
                  key={form.id}
                  name={form.name || ""}
                  imageUrl={getOfficialArtworkUrl(form.pokedex_id || 0, false)}
                  condition={form.condition}
                  onImageError={(e) => handleImageError(e, form.pokedex_id)}
                />
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col items-center mx-4">
          <h3 className="text-lg font-semibold text-white/80 mb-2">Current</h3>
          <PokemonCard
            name={currentPokemon.name?.en || pokemonName}
            imageUrl={getOfficialArtworkUrl(
              currentPokemon.pokedex_id || 0,
              false
            )}
            className="border border-white/20 bg-white/10"
            onImageError={(e) => handleImageError(e, currentPokemon.pokedex_id)}
          />
        </div>

        {nextForms.length > 0 && (
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold text-white/80 mb-2">Next</h3>
            <div className="flex flex-wrap gap-4 justify-center">
              {nextForms.map((form) => (
                <PokemonCard
                  key={form.id}
                  name={form.name || ""}
                  imageUrl={getOfficialArtworkUrl(form.pokedex_id || 0, false)}
                  onImageError={(e) => handleImageError(e, form.pokedex_id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {(formsData.length > 0 || megaForms.length > 0 || gmaxForms) && (
        <div className="mt-8 w-full">
          <h3 className="text-xl font-semibold text-white/80 mb-4 text-center">
            Special Forms
          </h3>
          <div className="flex flex-wrap gap-6 justify-center">
            {formsData.length > 0 &&
              formsData.map((form, index) => (
                <PokemonCard
                  key={`form-${index}`}
                  type="Form"
                  name={form.name?.en || `Form ${index + 1}`}
                  imageUrl={`/assets/static/regionalForms/${formatPokemonNameForUrl(
                    form.name?.en || `Form ${index + 1}`
                  )}.png`}
                />
              ))}

            {megaForms.length > 0 &&
              megaForms.map((form, index) => (
                <PokemonCard
                  key={`mega-${index}`}
                  type="Mega"
                  name={
                    form.name ||
                    `Mega ${currentPokemon?.name?.en || pokemonName}`
                  }
                  imageUrl={form.sprites?.regular || getMegaFormUrl(index)}
                  onImageError={(e) =>
                    handleImageError(
                      e,
                      form.pokedex_id || currentPokemon?.pokedex_id
                    )
                  }
                />
              ))}

            {gmaxForms && (
              <PokemonCard
                type="G-Max"
                name={`Gigantamax ${currentPokemon?.name?.en || pokemonName}`}
                imageUrl={
                  gmaxQuery.data?.success
                    ? gmaxQuery.data.image || ""
                    : gmaxForms
                }
                onImageError={(e) =>
                  handleImageError(e, currentPokemon?.pokedex_id)
                }
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
