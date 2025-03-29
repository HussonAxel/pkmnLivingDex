import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { NotFound } from "~/components/NotFound";
import {
  pokemonDetailsQueryOptions,
  pokemonSpeciesQueryOptions,
} from "~/utils/pokemonList";
import { PokemonBioData } from "~/components/PokemonBiodata";
import { generationToRegion } from "~/utils/pokemonUtils";
import { SideData } from "~/components/ui/SideData";
import { PokemonEvolutionChain } from "~/components/PokemonEvolutionChain";

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
    <div className="space-y-2">
      <SideData dataName={"BIODATA"} dataPage="01 / 05">
        <PokemonBioData
          name={pokemonName}
          desc={
            dataSpecies.genera?.find((entry) => entry?.language?.name === "en")
              ?.genus || ""
          }
          picture={artworkUrl ?? ""}
          pokemonBiodata={{
            species:
              dataSpecies.genera?.find(
                (entry) => entry?.language?.name === "en"
              )?.genus || "",
            height: `${data.height / 10}m`,
            weight: `${data.weight / 10}kg`,
            gender:
              dataSpecies.gender_rate === -1
                ? "Genderless"
                : `${(dataSpecies.gender_rate / 8) * 100}% ♀ - ${100 - (dataSpecies.gender_rate / 8) * 100}% ♂`,
            region: `${
              generationToRegion[
                dataSpecies.generation.name as keyof typeof generationToRegion
              ]
            } - ${dataSpecies.generation.name.replace("generation-", "GEN ")}`,
            abilities: data.abilities,
          }}
        />
      </SideData>
      <SideData dataName="EVOLUTION CHAIN & FORMS" dataPage="02 / 05">
        <PokemonEvolutionChain />
      </SideData>
    </div>
  );
}
