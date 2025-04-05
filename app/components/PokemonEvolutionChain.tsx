import { useSuspenseQuery } from "@tanstack/react-query";
import { Route as PokemonRoute } from "~/routes/pokemon.$pokemonName";

import {
  pokemonSpeciesQueryOptions,
  pokemonDetailsQueryOptions,
} from "~/utils/pokemonList";

export function PokemonEvolutionChain() {
  const { pokemonName } = PokemonRoute.useParams();

  const pokemonData = useSuspenseQuery(pokemonDetailsQueryOptions(pokemonName));
  const pokemonSpeciesData = useSuspenseQuery(
    pokemonSpeciesQueryOptions(pokemonName),
  );

  const fetchedSpeciesData = pokemonSpeciesData.data;
  const fetchedPokemonData = pokemonData.data;
  const evolutionChainUrl = fetchedSpeciesData.evolution_chain.url;

  const evolutionChainData = useSuspenseQuery({
    queryKey: ["evolutionChain", evolutionChainUrl],
    queryFn: async () => {
      const response = await fetch(evolutionChainUrl);
      return response.json();
    },
  });

  const fetchedEvolutionBasedPokemon =
    evolutionChainData.data.chain.species.name;
  const fetchedEvolutionEvolvesTo = evolutionChainData.data.chain.evolves_to;
  console.log("Fetched Species Data:", evolutionChainData.data.chain);
  console.log("Fetched Evolution Based Pokemon:", fetchedEvolutionBasedPokemon);

  return (
    <>
      <div> Base pokemon : {fetchedEvolutionBasedPokemon}</div>
      <div className="test">
        {fetchedEvolutionEvolvesTo.map((evolution) => {
          const currentEvolutionEvolvesTo = evolution.evolves_to;
          return (
            <p key={evolution.species.name}>
              Next Pokemon : {evolution.species.name}
              {currentEvolutionEvolvesTo.map((evolution) => {
                return (
                  <p key={evolution.species.name}>
                    Next next pokemon : {evolution.species.name} {}
                  </p>
                );
              })}
            </p>
          );
        })}
      </div>
    </>
  );
}
