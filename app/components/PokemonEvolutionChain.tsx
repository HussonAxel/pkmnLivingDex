import { Route as PokemonRoute } from "~/routes/pokemons.$pokemonName";

export function PokemonEvolutionChain() {
  const { pokemonName } = PokemonRoute.useParams();

  return <div>{pokemonName}</div>;
}
