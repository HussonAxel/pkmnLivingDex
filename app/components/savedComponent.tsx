import React from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { queryOptions } from "@tanstack/react-query";
import { Route as PokemonRoute } from "~/routes/pokemon.$pokemonName";
import { pokemonSpeciesQueryOptions } from "~/utils/pokemonList";

interface PokemonSpeciesReference {
  name: string;
  url: string;
}

export interface EvolutionChainLink {
  species: PokemonSpeciesReference;
  evolves_to: EvolutionChainLink[];
}

export interface EvolutionChainResponse {
  id: number;
  chain: EvolutionChainLink;
}

export const evolutionChainQueryOptions = (url: string | undefined) =>
  queryOptions<EvolutionChainResponse>({
    queryKey: ["evolutionChain", url],
    queryFn: async () => {
      if (!url) {
        throw new Error("Evolution chain URL is required.");
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch evolution chain: ${response.statusText}`,
        );
      }
      return response.json() as Promise<EvolutionChainResponse>;
    },
    enabled: !!url,
  });

interface EvolutionNodeProps {
  node: EvolutionChainLink;
}

function EvolutionNode({ node }: EvolutionNodeProps) {
  console.log(node);
  return (
    <li>
      <span>{node.species.name}</span>
      {node.evolves_to.length > 0 && (
        <ul>
          {node.evolves_to.map((nextNode) => (
            <EvolutionNode key={nextNode.species.name} node={nextNode} />
          ))}
        </ul>
      )}
    </li>
  );
}

export function PokemonEvolutionChain() {
  const { pokemonName } = PokemonRoute.useParams();

  const pokemonSpecies = useSuspenseQuery(
    pokemonSpeciesQueryOptions(pokemonName),
  );

  const evolutionChainUrl = pokemonSpecies.data?.evolution_chain.url;

  const evolutionChainData = useSuspenseQuery(
    evolutionChainQueryOptions(evolutionChainUrl),
  ).data as EvolutionChainResponse;

  return (
    <div>
      <h3>Evolution Chain</h3>
      <ul>
        <EvolutionNode node={evolutionChainData.chain} />
      </ul>
    </div>
  );
}
