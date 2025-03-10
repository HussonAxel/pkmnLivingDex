import { ErrorComponent, createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  getEntirePokedexTyradexOptions,
  pokemonsPerGenerationDetailsOptions,
} from "~/utils/pokemonList";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { NotFound } from "~/components/NotFound";
import { PokemonGenerationView } from "~/components/PokemonGenerationView";

export const Route = createFileRoute("/pokemons/$generationID")({
  loader: async ({ params: { generationID }, context }) => {
    await context.queryClient.ensureQueryData(
      pokemonsPerGenerationDetailsOptions(generationID)
    );

    return {
      title: `Generation ${generationID} Pokédex`,
    };
  },

  head: ({ loaderData }) => ({
    meta: loaderData ? [{ title: loaderData.title }] : undefined,
  }),

  errorComponent: PostErrorComponent,
  notFoundComponent: () => <NotFound>Pokémon not found</NotFound>,
  component: PostComponent,
});

export function PostErrorComponent({ error }: ErrorComponentProps) {
  return <ErrorComponent error={error} />;
}

function PostComponent() {
  const dataPokedex = useSuspenseQuery(getEntirePokedexTyradexOptions());
  const { generationID } = Route.useParams();
  const { data } = useSuspenseQuery(
    pokemonsPerGenerationDetailsOptions(generationID)
  );

  const arrayIndex = parseInt(generationID) - 1;
  const generationData = data?.[arrayIndex];

  if (!Array.isArray(generationData)) {
    return (
      <div className="p-8 text-center">
        No data available for this generation
      </div>
    );
  }

  return (
    <PokemonGenerationView
      generationID={generationID}
      generationData={generationData}
    />
  );
}
