import { Link, createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { NotFound } from "~/components/NotFound";
import {
  pokemonDetailsQueryOptions,
  pokemonSpeciesQueryOptions,
} from "~/utils/pokemonList";
import { Volume2 } from "lucide-react";
import useSound from "use-sound";
import { PokemonBioData } from "~/components/PokemonBiodata";

export const Route = createFileRoute("/pokemons/$pokemonName")({
  loader: async ({ params: { pokemonName }, context }) => {
    await context.queryClient.ensureQueryData(
      pokemonDetailsQueryOptions(pokemonName)
    );

    return {
      title: pokemonName,
    };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [{ title: loaderData.title }] : undefined,
  }),
  errorComponent: NotFound,
  component: pokemonDeepComponent,
});

function pokemonDeepComponent() {
  const { pokemonName } = Route.useParams();
  const pokemonQuery = useSuspenseQuery(
    pokemonDetailsQueryOptions(pokemonName)
  );
  const pokemonSpeciesQuery = useSuspenseQuery(
    pokemonSpeciesQueryOptions(pokemonName)
  );
  const data = pokemonQuery.data;
  const dataSpecies = pokemonSpeciesQuery.data;

  console.log(dataSpecies);

  const artworkUrl = data.sprites.other["official-artwork"].front_default;

  const crySound = data.cries.latest ?? "";
  const [play] = useSound(crySound);

  return (
    <div className="p-2 space-y-2">
      <PokemonBioData
        name={pokemonName}
        id={data.id}
        picture={artworkUrl ?? ""}
        biodata={[
          "position",
          "timeline",
          "capital",
          "contro",
          "power",
          "legacy",
        ]}
      />
    </div>
  );
}
