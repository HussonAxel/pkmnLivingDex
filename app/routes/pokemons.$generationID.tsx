import { ErrorComponent, Link, createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { pokemonsPerGenerationDetailsOptions } from "~/utils/pokemonList";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { NotFound } from "~/components/NotFound";
import { Sparkle, Translate } from "@phosphor-icons/react";
import { useState } from "react";

export const Route = createFileRoute("/pokemons/$generationID")({
  loader: async ({ params: { generationID }, context }) => {
    const data = await context.queryClient.ensureQueryData(
      pokemonsPerGenerationDetailsOptions(generationID)
    );
    console.log(data);

    return {
      title: "Pokedex",
    };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [{ title: loaderData.title }] : undefined,
  }),
  errorComponent: PostErrorComponent,
  notFoundComponent: () => {
    return <NotFound>Pokemon not found </NotFound>;
  },
  component: PostComponent,
});

export function PostErrorComponent({ error }: ErrorComponentProps) {
  return <ErrorComponent error={error} />;
}

function PostComponent() {
  const { generationID } = Route.useParams();
  const arrayIndex = parseInt(generationID) - 1;
  const [isShiny, setIsShiny] = useState(false);
  const [language, setLanguage] = useState<"en" | "fr">("en");

  const postQuery = useSuspenseQuery(
    pokemonsPerGenerationDetailsOptions(generationID)
  );

  const generationData = postQuery.data?.[arrayIndex];

  if (!Array.isArray(generationData)) {
    return <div>No data available for this generation</div>;
  }

  const getOfficialArtworkUrl = (pokemonId: number) => {
    return isShiny
      ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokemonId}.png`
      : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
  };

  return (
    <div className="space-y-2 flex-1 mx-8">
      <div>
        <div>
          <h2 className="text-2xl font-bold">Generation {generationID}</h2>
          <div className="flex gap-4">
            <span
              className="cursor-pointer"
              onClick={() => setIsShiny(!isShiny)}
              title={isShiny ? "Show normal sprites" : "Show shiny sprites"}
            >
              <Sparkle
                size={32}
                weight="bold"
                color={isShiny ? "#FFD700" : undefined}
              />
            </span>

            <span
              className="cursor-pointer"
              onClick={() => setLanguage(language === "en" ? "fr" : "en")}
              title={
                language === "en" ? "Switch to French" : "Switch to English"
              }
            >
              <Translate
                size={32}
                weight="bold"
                color={language === "fr" ? "#0055A4" : undefined}
              />
            </span>
          </div>
        </div>
        <div className="mt-4 grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {generationData.map((pokemon) => (
            <div
              key={pokemon.pokedex_id}
              className="p-4 border rounded-lg shadow hover:shadow-md transition-all hover:bg-white/10 hover:border-white/30"
            >
              <img
                src={getOfficialArtworkUrl(pokemon.pokedex_id)}
                alt={pokemon.name[language]}
                className="w-32 h-32 mx-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = pokemon.sprites.regular;
                }}
              />
              <div className="mt-2 text-center">
                <h3 className="font-semibold">{pokemon.name[language]}</h3>
                <div className="flex gap-2 justify-center mt-1">
                  {pokemon.types.map((type) => (
                    <span
                      key={type.name}
                      className="px-2 py-1 text-md rounded border w-fit"
                    >
                      {type.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
