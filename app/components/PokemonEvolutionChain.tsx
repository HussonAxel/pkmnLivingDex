import { useSuspenseQuery } from "@tanstack/react-query";
import { Route as PokemonRoute } from "~/routes/pokemon.$pokemonName";
import { getOfficialArtworkUrl, getIdFromUrl } from "~/utils/pokemonUtils";
import React from "react";
import { Link } from "@tanstack/react-router";

import {
  pokemonSpeciesQueryOptions,
  pokemonDetailsQueryOptions,
} from "~/utils/pokemonList";

interface PokemonDisplayCardProps {
  name: string;
  url: string;
  className?: string;
}
function PokemonDisplayCard({
  name,
  url,
  className = "h-56 w-auto",
}: PokemonDisplayCardProps) {
  const pokemonId = getIdFromUrl(url);
  const imageUrl = pokemonId ? getOfficialArtworkUrl(pokemonId, false) : null;
  return (
    <Link
      to="/pokemon/$pokemonName"
      params={{ pokemonName: name }}
      className="pokemon-display-card flex flex-col items-center p-2 text-center hover:bg-slate-700 rounded-md transition-colors m-4"
    >
      <p className="capitalize font-medium text-sm mb-1">{name}</p>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          loading="lazy"
          className={`object-contain ${className}`}
        />
      ) : (
        <div
          className={`bg-gray-600 flex items-center justify-center text-xs text-gray-400 rounded ${className}`}
        >
          No Img
        </div>
      )}
    </Link>
  );
}

export function PokemonEvolutionChain() {
  const { pokemonName } = PokemonRoute.useParams();

  const pokemonData = useSuspenseQuery(pokemonDetailsQueryOptions(pokemonName));
  const pokemonSpeciesData = useSuspenseQuery(
    pokemonSpeciesQueryOptions(pokemonName)
  );

  const fetchedSpeciesData = pokemonSpeciesData.data;
  const fetchedSpeciesVarietiesData = fetchedSpeciesData.varieties;
  const evolutionChainUrl = fetchedSpeciesData.evolution_chain.url;

  const evolutionChainData = useSuspenseQuery({
    queryKey: ["evolutionChain", evolutionChainUrl],
    queryFn: async () => {
      const response = await fetch(evolutionChainUrl);
      return response.json();
    },
  });

  const baseEvolutionLink = evolutionChainData.data.chain;
  const firstEvolutions = baseEvolutionLink.evolves_to;

  return (
    <div className="space-y-8 p-4">
      <section>
        <h3 className="text-lg font-semibold mb-4 text-center">
          Evolution Chain
        </h3>
        <div className="flex flex-row justify-center items-center space-y-4">
          <PokemonDisplayCard
            name={baseEvolutionLink.species.name}
            url={baseEvolutionLink.species.url}
            className="h-56 w-auto"
          />
          {firstEvolutions.length > 0 && (
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
              {firstEvolutions.map(
                (evolution: {
                  evolves_to: any;
                  evolution_details: {
                    min_level: any;
                    item: any;
                    trigger: { name: any };
                  }[];
                  species: { name: React.Key | null | undefined; url: string };
                }) => {
                  console.log(evolution);
                  const secondEvolutions = evolution.evolves_to;

                  const evolutionCondition = evolution.evolution_details?.[0]
                    ? ` Via ${
                        evolution.evolution_details[0].min_level
                          ? `Lv ${evolution.evolution_details[0].min_level}`
                          : evolution.evolution_details[0].item?.name ||
                            evolution.evolution_details[0].trigger?.name ||
                            "Special"
                      }`
                    : "";

                  return (
                    <div
                      key={evolution.species.name}
                      className="flex flex-row items-center"
                    >
                      <span className="text-xl text-gray-400 mb-1 px-2">
                        {" "}
                        →{" "}
                      </span>
                      <span className="text-xs text-gray-400 mb-1">
                        {evolutionCondition}
                      </span>
                      {evolution.species.name && (
                        <PokemonDisplayCard
                          name={evolution.species.name as string}
                          url={evolution.species.url}
                          className="h-56 w-auto"
                        />
                      )}

                      {secondEvolutions.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-2">
                          {secondEvolutions.map(
                            (innerEvolution: {
                              evolution_details: {
                                min_level: any;
                                item: any;
                                trigger: { name: any };
                              }[];
                              species: {
                                name: React.Key | null | undefined;
                                url: string;
                              };
                            }) => {
                              console.log(innerEvolution);
                              const innerEvolutionCondition = innerEvolution
                                .evolution_details?.[0]
                                ? `Via ${
                                    innerEvolution.evolution_details[0]
                                      .min_level
                                      ? `Lv ${innerEvolution.evolution_details[0].min_level}`
                                      : innerEvolution.evolution_details[0].item
                                          ?.name ||
                                        innerEvolution.evolution_details[0]
                                          .trigger?.name ||
                                        "Special"
                                  }`
                                : "";
                              return (
                                <div
                                  key={innerEvolution.species.name}
                                  className="flex flex-row items-center"
                                >
                                  <span className="text-lg text-gray-500 px-2">
                                    →
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {innerEvolutionCondition}
                                  </span>
                                  <PokemonDisplayCard
                                    name={innerEvolution.species.name as string}
                                    url={innerEvolution.species.url}
                                    className="h-56 w-auto"
                                  />
                                </div>
                              );
                            }
                          )}
                        </div>
                      )}
                    </div>
                  );
                }
              )}
            </div>
          )}
        </div>
      </section>
      {fetchedSpeciesVarietiesData &&
        fetchedSpeciesVarietiesData.filter((v) => !v.is_default).length > 0 && (
          <section id="alternativesForms">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Alternative Forms
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {fetchedSpeciesVarietiesData
                .filter((variety) => variety.is_default === false)
                .map((variety) => (
                  <PokemonDisplayCard
                    key={variety.pokemon.name}
                    name={variety.pokemon.name}
                    url={variety.pokemon.url}
                    className="h-56 w-auto"
                  />
                ))}
            </div>
          </section>
        )}
    </div>
  );
}
