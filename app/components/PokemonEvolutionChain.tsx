import { useSuspenseQuery } from "@tanstack/react-query";
import { Route as PokemonRoute } from "~/routes/pokemon.$pokemonName";
import { getOfficialArtworkUrl, getIdFromUrl } from "~/utils/pokemonUtils";

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

  return (
    <>
      <div> Base pokemon : {fetchedEvolutionBasedPokemon}</div>
      <img
        src={getOfficialArtworkUrl(
          getIdFromUrl(evolutionChainData.data.chain.species.url),
          false,
        )}
        alt={"sqdqdsqfqsf"}
      />
      <div className="test">
        {fetchedEvolutionEvolvesTo.map((evolution) => {
          const currentEvolutionEvolvesTo = evolution.evolves_to;
          return (
            <>
              <p key={evolution.species.name}>
                Next Pokemon : {evolution.species.name}
                <img
                  src={getOfficialArtworkUrl(
                    getIdFromUrl(evolution.species.url),
                    false,
                  )}
                  alt={"sqdqdsqfqsf"}
                />
                {currentEvolutionEvolvesTo.map((evolution) => {
                  return (
                    <p key={evolution.species.name}>
                      Next next pokemon : {evolution.species.name} {}
                      <img
                        src={getOfficialArtworkUrl(
                          getIdFromUrl(evolution.species.url),
                          false,
                        )}
                        alt={"sqdqdsqfqsf"}
                      />
                    </p>
                  );
                })}
              </p>
            </>
          );
        })}
      </div>
    </>
  );
}
