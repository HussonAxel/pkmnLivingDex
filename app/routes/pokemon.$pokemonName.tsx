import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { NotFound } from "~/components/NotFound";
import {
  pokemonDetailsQueryOptions,
  pokemonSpeciesQueryOptions,
} from "~/utils/pokemonList";
import { PokemonBioData } from "~/components/PokemonBiodata";
import { generationToRegion, formatPokedexID } from "~/utils/pokemonUtils";
import { SideData } from "~/components/ui/SideData";
import { PokemonEvolutionChain } from "~/components/PokemonEvolutionChain";

export const Route = createFileRoute("/pokemon/$pokemonName")({
  loader: async ({ params: { pokemonName }, context }) => {
    await context.queryClient.ensureQueryData(
      pokemonDetailsQueryOptions(pokemonName)
    );
    return { title: pokemonName };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [{ title: loaderData.title }] : undefined,
  }),
  errorComponent: NotFound,
  component: PokemonDetail,
});

function PokemonDetail() {
  const { pokemonName } = Route.useParams();
  const { data } = useSuspenseQuery(pokemonDetailsQueryOptions(pokemonName));
  const { data: dataSpecies } = useSuspenseQuery(
    pokemonSpeciesQueryOptions(pokemonName)
  );

  const artworkUrl = data.sprites.other["official-artwork"].front_default;
  const genus =
    dataSpecies.genera?.find((entry) => entry?.language?.name === "en")
      ?.genus || "";
  const generationName = dataSpecies.generation.name;
  const region =
    generationToRegion[generationName as keyof typeof generationToRegion];
  const formattedGeneration = generationName.replace("generation-", "GEN ");

  const genderRatio =
    dataSpecies.gender_rate === -1
      ? "Genderless"
      : `${(dataSpecies.gender_rate / 8) * 100}% ♀ - ${100 - (dataSpecies.gender_rate / 8) * 100}% ♂`;

  return (
    <div>
      <SideData dataName="BIODATA" dataPage="01 / 05">
        <PokemonBioData
          name={pokemonName}
          ID={`#${formatPokedexID(data.id)}`}
          description={
            dataSpecies.flavor_text_entries
              .find((entry) => entry.language.name === "en")
              ?.flavor_text.replace(/[\n\r]/g, " ") || ""
          }
          genus={genus}
          picture={artworkUrl ?? ""}
          pokemonBiodata={{
            region: `${region} - ${formattedGeneration}`,
            species: genus,
            gender: genderRatio,
            weight: `${data.weight / 10}kg - ${Math.round(
              (data.weight / 10) * 2.20462
            )} pounds`,
            height: `${data.height / 10}m - ${Math.round(
              (data.height / 10) * 3.2808
            )} ft`,
            abilities: data.abilities.map((ability) =>
              ability.is_hidden
                ? `${ability.ability.name} (Hidden)`
                : ability.ability.name
            ),
          }}
        />
      </SideData>
      <SideData dataName="FORMS" dataPage="02 / 05">
        <PokemonEvolutionChain />
      </SideData>
    </div>
  );
}
