import { ErrorComponent, createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { pokemonsPerGenerationDetailsOptions } from "~/utils/pokemonList";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { PokemonGenerationView } from "~/components/PokemonGenerationView";

export const Route = createFileRoute("/pokedex/$generationID")({
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

  component: PostComponent,
});


function PostComponent() {
  const { generationID } = Route.useParams();
  const { data } = useSuspenseQuery(
    pokemonsPerGenerationDetailsOptions(generationID)
  );
  const arrayIndex = parseInt(generationID) - 1;
  const generationData = data?.[arrayIndex];

  if (!Array.isArray(generationData)) {
    if (generationID === "0") {
      return (
        <PokemonGenerationView
          generationID={generationID}
          generationData={data.flat()}
        />
      );
    } else {
      return (
        <div className="p-8 text-center">
          No data available for this generation
        </div>
      );
    }
  }

  return (
    <PokemonGenerationView
      generationID={generationID}
      generationData={generationData}
    />
  );
}
