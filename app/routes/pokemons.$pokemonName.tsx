import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { NotFound } from "~/components/NotFound";
import {
  pokemonDetailsQueryOptions,
  pokemonSpeciesQueryOptions,
} from "~/utils/pokemonList";
import { PokemonBioData } from "~/components/PokemonBiodata";
import { generationToRegion } from "~/utils/pokemonUtils";

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

  const artworkUrl = data.sprites.other["official-artwork"].front_default;

  return (
    <div className="p-2 space-y-2">
      <PokemonBioData
        name={pokemonName}
        desc={
          dataSpecies.genera?.find((entry) => entry?.language?.name === "en")
            ?.genus || ""
        }
        picture={artworkUrl ?? ""}
        pokemonBiodata={{
          species: dataSpecies.name,
          height: `${data.height / 10}m`,
          weight: `${data.weight / 10}kg`,
          gender:
            dataSpecies.gender_rate === -1
              ? "Genderless"
              : `${(dataSpecies.gender_rate / 8) * 100}% ♀ - ${100 - (dataSpecies.gender_rate / 8) * 100}% ♂`,
          region:
            generationToRegion[
              dataSpecies.generation.name as keyof typeof generationToRegion
            ],
          abilities: data.abilities,
        }}
      />
    </div>
  );
}
