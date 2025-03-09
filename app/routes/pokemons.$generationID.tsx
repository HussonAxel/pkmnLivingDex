import { ErrorComponent, Link, createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { pokemonsPerGenerationDetailsOptions } from "~/utils/pokemonList";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { NotFound } from "~/components/NotFound";
import { Sparkle, Translate, Rows, SquaresFour } from "@phosphor-icons/react";
import { useState } from "react";
import {
  PokemonType,
  PokemonSprites,
  Pokemon,
} from "~/utils/types/pokemonList.types";

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
  const [isSquaresFour, setIsSquaresFour] = useState(true);

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

  const generationRanges: Record<string, { min: number; max: number }> = {
    "1": { min: 1, max: 151 },
    "2": { min: 152, max: 251 },
    "3": { min: 252, max: 386 },
    "4": { min: 387, max: 493 },
    "5": { min: 494, max: 649 },
    "6": { min: 650, max: 721 },
    "7": { min: 722, max: 809 },
    "8": { min: 810, max: 905 },
    "9": { min: 906, max: 1025 },
  };

  const { basicForms, regionalForms } = (() => {
    const currentGenRange = generationRanges[generationID];

    if (!currentGenRange) {
      return { basicForms: generationData, regionalForms: [] };
    }

    const basic: Pokemon[] = [];
    const regional: Pokemon[] = [];

    generationData.forEach((pokemon: Pokemon) => {
      if (
        pokemon.pokedex_id >= currentGenRange.min &&
        pokemon.pokedex_id <= currentGenRange.max
      ) {
        basic.push(pokemon);
      } else {
        regional.push(pokemon);
      }
    });

    return { basicForms: basic, regionalForms: regional };
  })();

  return (
    <div className="space-y-2 flex-1 mx-8">
      <div>
        <div className="mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold">Generation {generationID}</h2>
          <div className="flex gap-4 mt-2">
            <span
              className="cursor-pointer hover:bg-white/10 p-1 rounded-full transition-colors"
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
              className="cursor-pointer hover:bg-white/10 p-1 rounded-full transition-colors"
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
            {isSquaresFour ? (
              <span
                className="cursor-pointer hover:bg-white/10 p-1 rounded-full transition-colors"
                onClick={() => setIsSquaresFour(!isSquaresFour)}
                title={isSquaresFour ? "Show as a list" : "Show as a grid"}
              >
                <SquaresFour size={32} weight="bold" />
              </span>
            ) : (
              <span
                className="cursor-pointer hover:bg-white/10 p-1 rounded-full transition-colors"
                onClick={() => setIsSquaresFour(!isSquaresFour)}
                title={isSquaresFour ? "Show as a list" : "Show as a grid"}
              >
                <Rows size={32} weight="bold" />
              </span>
            )}
          </div>
        </div>

        {/* Basic Forms Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Basic Forms</h3>
          {isSquaresFour ? (
            <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-4 cursor-pointer">
              {basicForms.map((pokemon) => (
                <div
                  key={pokemon.pokedex_id}
                  className="p-4 border rounded-lg shadow hover:shadow-md transition-all hover:bg-white/10 hover:border-white/30 hover:scale-105"
                >
                  <img
                    src={getOfficialArtworkUrl(pokemon.pokedex_id)}
                    alt={pokemon.name[language]}
                    className="w-32 h-32 mx-auto object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        pokemon.sprites.regular;
                    }}
                  />
                  <div className="mt-2 text-center">
                    <span>#{pokemon.pokedex_id}</span>
                    <h3 className="font-semibold">{pokemon.name[language]}</h3>
                    <div className="flex gap-2 justify-center mt-1">
                      {pokemon.types.map((type: PokemonType) => (
                        <div
                          key={type.name}
                          className={`text-md rounded-full p-2 ${type.name}`}
                        >
                          <img
                            src={`/assets/static/pkmnsTypes/${type.name}.svg`}
                            alt={type.name}
                            className="w-4 h-4 object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                pokemon.sprites.regular;
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-4 grid md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 cursor-pointer">
              {basicForms.map((pokemon) => (
                <div
                  key={pokemon.pokedex_id}
                  className="flex flex-row p-4 m-4 border border-white/30 rounded-lg shadow hover:shadow-md transition-all hover:bg-white/10 hover:scale-105"
                >
                  <img
                    src={getOfficialArtworkUrl(pokemon.pokedex_id)}
                    alt={pokemon.name[language]}
                    className="w-24 h-24 object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        pokemon.sprites.regular;
                    }}
                  />
                  <div>
                    <h3 className="font-semibold">{pokemon.name[language]}</h3>
                    <span>#{pokemon.pokedex_id}</span>
                    <div className="flex gap-2 mt-1">
                      {pokemon.types.map((type: PokemonType) => (
                        <div
                          key={type.name}
                          className={`text-md rounded-full p-2 ${type.name}`}
                        >
                          <img
                            src={`/assets/static/pkmnsTypes/${type.name}.svg`}
                            alt={type.name}
                            className="w-4 h-4 object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                pokemon.sprites.regular;
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Regional Forms Section - Only show if there are regional forms */}
        {regionalForms.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Regional Forms & Variants
            </h3>
            {isSquaresFour ? (
              <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-4 cursor-pointer">
                {regionalForms.map((pokemon) => (
                  <div
                    key={pokemon.pokedex_id}
                    className="p-4 border rounded-lg shadow hover:shadow-md transition-all hover:bg-white/10 hover:border-white/30 hover:scale-105 border-yellow-500/50"
                  >
                    <img
                      src={getOfficialArtworkUrl(pokemon.pokedex_id)}
                      alt={pokemon.name[language]}
                      className="w-32 h-32 mx-auto object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          pokemon.sprites.regular;
                      }}
                    />
                    <div className="mt-2 text-center">
                      <span>#{pokemon.pokedex_id}</span>
                      <h3 className="font-semibold">
                        {pokemon.name[language]}
                      </h3>
                      <div className="flex gap-2 justify-center mt-1">
                        {pokemon.types.map((type: PokemonType) => (
                          <div
                            key={type.name}
                            className={`text-md rounded-full p-2 ${type.name}`}
                          >
                            <img
                              src={`/assets/static/pkmnsTypes/${type.name}.svg`}
                              alt={type.name}
                              className="w-4 h-4 object-contain"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  pokemon.sprites.regular;
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-4 grid md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 cursor-pointer">
                {regionalForms.map((pokemon) => (
                  <div
                    key={pokemon.pokedex_id}
                    className="flex flex-row p-4 m-4 border border-yellow-500/50 rounded-lg shadow hover:shadow-md transition-all hover:bg-white/10 hover:scale-105"
                  >
                    <img
                      src={getOfficialArtworkUrl(pokemon.pokedex_id)}
                      alt={pokemon.name[language]}
                      className="w-24 h-24 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          pokemon.sprites.regular;
                      }}
                    />
                    <div>
                      <h3 className="font-semibold">
                        {pokemon.name[language]}
                      </h3>
                      <span>#{pokemon.pokedex_id}</span>
                      <div className="flex gap-2 mt-1">
                        {pokemon.types.map((type: PokemonType) => (
                          <div
                            key={type.name}
                            className={`text-md rounded-full p-2 ${type.name}`}
                          >
                            <img
                              src={`/assets/static/pkmnsTypes/${type.name}.svg`}
                              alt={type.name}
                              className="w-4 h-4 object-contain"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  pokemon.sprites.regular;
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
