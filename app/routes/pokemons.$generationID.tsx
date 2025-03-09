import { ErrorComponent, createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { pokemonsPerGenerationDetailsOptions } from "~/utils/pokemonList";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { NotFound } from "~/components/NotFound";
import { Sparkle, Translate, Rows, SquaresFour } from "@phosphor-icons/react";
import { useState } from "react";

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
  const { generationID } = Route.useParams();
  const arrayIndex = parseInt(generationID) - 1;
  const [viewSettings, setViewSettings] = useState({
    isShiny: false,
    language: "en" as "en" | "fr",
    isGridView: true,
  });

  const { data } = useSuspenseQuery(
    pokemonsPerGenerationDetailsOptions(generationID)
  );

  const generationData = data?.[arrayIndex];

  if (!Array.isArray(generationData)) {
    return (
      <div className="p-8 text-center">
        No data available for this generation
      </div>
    );
  }

  const getOfficialArtworkUrl = (pokemonId: number) => {
    const baseUrl =
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork";
    return `${baseUrl}${viewSettings.isShiny ? "/shiny" : ""}/${pokemonId}.png`;
  };

  const toggleSetting = (setting: keyof typeof viewSettings) => {
    if (setting === "language") {
      setViewSettings((prev) => ({
        ...prev,
        language: prev.language === "en" ? "fr" : "en",
      }));
    } else {
      setViewSettings((prev) => ({
        ...prev,
        [setting]: !prev[setting],
      }));
    }
  };

  const ViewToggleButton = () => (
    <span
      className="cursor-pointer hover:bg-white/10 p-1 rounded-full transition-colors"
      onClick={() => toggleSetting("isGridView")}
      title={viewSettings.isGridView ? "Show as a list" : "Show as a grid"}
    >
      {viewSettings.isGridView ? (
        <Rows size={32} weight="bold" />
      ) : (
        <SquaresFour size={32} weight="bold" />
      )}
    </span>
  );

  const PokemonCard = ({ pokemon }) => (
    <div
      key={pokemon.pokedex_id}
      className="p-4 border rounded-lg shadow hover:shadow-md transition-all hover:bg-white/10 hover:border-white/30 hover:scale-105"
    >
      <img
        src={getOfficialArtworkUrl(pokemon.pokedex_id)}
        alt={pokemon.name[viewSettings.language]}
        className={`mx-auto object-contain ${viewSettings.isGridView ? "w-32 h-32" : "w-24 h-24 float-left mr-4"}`}
        onError={(e) => {
          (e.target as HTMLImageElement).src = pokemon.sprites.regular;
        }}
      />
      <div
        className={`${viewSettings.isGridView ? "mt-2 text-center" : "flex flex-col justify-center h-24"}`}
      >
        <span className={viewSettings.isGridView ? "" : "text-sm"}>
          #{pokemon.pokedex_id}
        </span>
        <h3 className="font-semibold">{pokemon.name[viewSettings.language]}</h3>
        <div
          className={`flex gap-2 mt-1 ${viewSettings.isGridView ? "justify-center" : ""}`}
        >
          {pokemon.types.map((type) => (
            <div
              key={type.name}
              className={`text-md rounded-full p-2 ${type.name}`}
              title={type.name}
            >
              <img
                src={`/assets/static/pkmnsTypes/${type.name}.svg`}
                alt={type.name}
                className="w-4 h-4 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "/assets/static/placeholder.svg";
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-2 flex-1 mx-8">
      <div>
        <div className="mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold">Generation {generationID}</h2>
          <div className="flex gap-4 mt-2">
            <span
              className="cursor-pointer hover:bg-white/10 p-1 rounded-full transition-colors"
              onClick={() => toggleSetting("isShiny")}
              title={
                viewSettings.isShiny
                  ? "Show normal sprites"
                  : "Show shiny sprites"
              }
            >
              <Sparkle
                size={32}
                weight="bold"
                color={viewSettings.isShiny ? "#FFD700" : undefined}
              />
            </span>

            <span
              className="cursor-pointer hover:bg-white/10 p-1 rounded-full transition-colors"
              onClick={() => toggleSetting("language")}
              title={
                viewSettings.language === "en"
                  ? "Switch to French"
                  : "Switch to English"
              }
            >
              <Translate
                size={32}
                weight="bold"
                color={viewSettings.language === "fr" ? "#0055A4" : undefined}
              />
            </span>

            <ViewToggleButton />
          </div>
        </div>

        <div
          className={`mt-4 grid gap-4 ${
            viewSettings.isGridView
              ? "md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6"
              : "md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3"
          }`}
        >
          {generationData.map((pokemon) => (
            <PokemonCard key={pokemon.pokedex_id} pokemon={pokemon} />
          ))}
        </div>
      </div>
    </div>
  );
}
