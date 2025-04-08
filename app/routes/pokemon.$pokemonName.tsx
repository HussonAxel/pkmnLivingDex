import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { PokemonBioData as PokemonBioDataComponent } from "~/components/PokemonBiodata";
import {
  pokemonDetailsQueryOptions,
  pokemonSpeciesQueryOptions,
  fetchPokemonDetails,
  fetchPokemonSpecies,
} from "~/utils/pokemonList";
import { formatPokedexID, generationToRegion } from "~/utils/pokemonUtils";
import { SideData } from "~/components/ui/SideData";
import { PokemonEvolutionChain } from "~/components/PokemonEvolutionChain";
import { getOfficialArtworkUrl } from "~/utils/pokemonUtils";
import {
  PokemonSpeciesType,
  PokemonDetailsType,
  PokemonBioData,
} from "~/types/pokemonTypes";
import { NotFound } from "~/components/NotFound";

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
  const { data } = useSuspenseQuery({
    ...pokemonDetailsQueryOptions(pokemonName),
    queryFn: () =>
      fetchPokemonDetails({ data: pokemonName }) as Promise<PokemonDetailsType>,
  });

  const { data: dataSpecies } = useSuspenseQuery({
    ...pokemonSpeciesQueryOptions(pokemonName),
    queryFn: () =>
      fetchPokemonSpecies({ data: pokemonName }) as Promise<PokemonSpeciesType>,
  });

  const genus =
    dataSpecies.genera?.find((entry) => entry?.language?.name === "en")
      ?.genus || "";
  const generationName = dataSpecies.generation.name;
  const region =
    generationToRegion[generationName as keyof typeof generationToRegion];
  const formattedGeneration = generationName
    .replace("generation-", "GEN ")
    .toUpperCase();

  const genderRatio =
    dataSpecies.gender_rate === -1
      ? "Genderless"
      : `${(dataSpecies.gender_rate / 8) * 100}% ♀ - ${100 - (dataSpecies.gender_rate / 8) * 100}% ♂`;

  // Get available forms
  const availableForms = dataSpecies.varieties.map((variety) => ({
    name: variety.pokemon.name,
    isDefault: variety.is_default,
  }));

  const pokemonBiodata: PokemonBioData = {
    region: `${region} - ${formattedGeneration}`,
    species: genus,
    gender: genderRatio,
    weight: `${data.weight / 10}kg - ${Math.round(
      (data.weight / 10) * 2.20462
    )} pounds`,
    abilities: data.abilities.map((ability) =>
      ability.is_hidden
        ? `${ability.ability.name} (Hidden)`
        : ability.ability.name
    ),
    height: `${data.height / 10}m - ${Math.round(
      (data.height / 10) * 3.2808
    )} ft`,
    forms:
      availableForms.length > 1
        ? availableForms.map((form) => form.name).join(", ")
        : "No other forms",
  };

  return (
    <div>
      <SideData dataName="BIODATA" dataPage="01 / 05">
        <PokemonBioDataComponent
          name={pokemonName}
          ID={`#${formatPokedexID(data.id)}`}
          picture={getOfficialArtworkUrl(data.id, false) ?? ""}
          description={
            dataSpecies.flavor_text_entries
              .find((entry) => entry.language.name === "en")
              ?.flavor_text.replace(/[\n\r]/g, " ") || ""
          }
          pokemonBiodata={pokemonBiodata}
        />
      </SideData>
      <SideData dataName="EVOLUTION" dataPage="02 / 05">
        <PokemonEvolutionChain />
      </SideData>
    </div>
  );
}
