import { Link, createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { NotFound } from "~/components/NotFound";
import { pokemonDetailsQueryOptions } from "~/utils/pokemonList";
import { Waveform } from "@phosphor-icons/react";
import useSound from "use-sound";

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
  const data = pokemonQuery.data;
  const artworkUrl = data.sprites.other["official-artwork"].front_default;

  const crySound = data.cries.latest ?? "";
  const [play] = useSound(crySound);

  return (
    <div className="p-2 space-y-2">
      <h1>{data.name}</h1>
      {artworkUrl && <img src={artworkUrl} alt={data.name} />}
      <Waveform onClick={() => play()} />
    </div>
  );
}
