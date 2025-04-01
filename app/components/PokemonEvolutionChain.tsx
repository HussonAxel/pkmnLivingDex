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
    pokemonSpeciesQueryOptions(pokemonName)
  );


  const fetchedSpeciesData = pokemonSpeciesData.data;
  const fetchedPokemonData = pokemonData.data;

  console.log("Fetched Species Data:", fetchedSpeciesData);
  console.log("Fetched Pokemon Data:", fetchedPokemonData);

  return <div> Je suis un test </div>;
}
