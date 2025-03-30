import { useSuspenseQuery } from "@tanstack/react-query";
import { Route as PokemonRoute } from "~/routes/pokemons.$pokemonName";

interface dataSpeciesTypes {
  dataSpecies: string;
}
export function PokemonEvolutionChain({ dataSpecies }: dataSpeciesTypes) {
  const { pokemonName } = PokemonRoute.useParams();

  const evolutionChainQuery = useSuspenseQuery({
    queryKey: ["evolution-chain", dataSpecies],
    queryFn: () => fetch(dataSpecies).then((res) => res.json()),
  });

  console.log(evolutionChainQuery.data);

  return <div>{pokemonName}</div>;
}
