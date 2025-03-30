import { useSuspenseQuery } from "@tanstack/react-query";
import { Currency } from "lucide-react";
import { Route as PokemonRoute } from "~/routes/pokemons.$pokemonName";
import { getOfficialArtworkUrl } from "~/utils/pokemonUtils";
import { translatePokemonName } from "~/utils/pokemonUtils";

interface dataSpeciesTypes {
  dataSpecies: string;
}

export function PokemonEvolutionChain() {
  const { pokemonName } = PokemonRoute.useParams();

  const evolutionChainQuery = useSuspenseQuery({
    queryKey: ["evolution-chain"],
    queryFn: () =>
      fetch(`https://tyradex.vercel.app/api/v1/pokemon/${pokemonName}`).then(
        (res) => res.json(),
      ),
  });

  const currentPokemon = evolutionChainQuery.data;
  const previousForms = evolutionChainQuery.data.evolution.pre;
  const nextForms = evolutionChainQuery.data.evolution.next;
  const formsData = evolutionChainQuery.data.formes;
  const megaForms = evolutionChainQuery.data.evolution.mega;
  const gmaxForms = evolutionChainQuery.data.sprites.gmax;
  const sprite = evolutionChainQuery.data.pokedex_id;

  const translatedName = translatePokemonName(pokemonName);
  console.log(translatedName);

  console.log(currentPokemon);

  return (
    <section className="flex flex-col items-center w-full p-4">
      <h2 className="text-2xl font-bold text-white mb-6">Evolution Chain</h2>

      <div className="flex flex-wrap items-center justify-center gap-4">
        {/* Previous Evolution Forms */}
        {previousForms && previousForms.length > 0 && (
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold text-white/80 mb-2">
              Previous
            </h3>
            <div className="flex flex-wrap gap-4 justify-center">
              {previousForms.map((form) => (
                <div
                  key={form.id}
                  className="flex flex-col items-center p-8 bg-white/5 rounded-lg "
                >
                  <img
                    src={getOfficialArtworkUrl(form.pokedex_id, false)}
                    alt={translatePokemonName(form.name)}
                    className="w-64 h-64 object-contain"
                  />
                  <div className="text-white text-center mt-2 text-md">
                    {translatePokemonName(form.name)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Current Pokémon */}
        <div className="flex flex-col items-center mx-4">
          <h3 className="text-lg font-semibold text-white/80 mb-2">Current</h3>
          <div className="flex flex-col items-center p-8 bg-white/10 rounded-lg  border border-white/20">
            <img
              src={getOfficialArtworkUrl(currentPokemon.pokedex_id, false)}
              alt={currentPokemon.name.en}
              className="w-64 h-64 object-contain"
            />
            <div className="text-white font-bold text-center mt-2">
              {currentPokemon.name.en}
            </div>
          </div>
        </div>

        {/* Next Evolution Forms */}
        {nextForms && nextForms.length > 0 && (
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold text-white/80 mb-2">Next</h3>
            <div className="flex flex-wrap gap-4 justify-center">
              {nextForms.map((form) => (
                <div
                  key={form.id}
                  className="flex flex-col items-center p-8 bg-white/5 rounded-lg "
                >
                  <img
                    src={getOfficialArtworkUrl(form.pokedex_id, false)}
                    alt={translatePokemonName(form.name)}
                    className="w-64 h-64 object-contain"
                  />
                  <div className="text-white text-center mt-2">
                    {translatePokemonName(form.name)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Special Forms Section */}
      {(formsData || megaForms || gmaxForms) && (
        <div className="mt-8 w-full">
          <h3 className="text-xl font-semibold text-white/80 mb-4 text-center">
            Special Forms
          </h3>
          <div className="flex flex-wrap gap-6 justify-center">
            {/* Alternative Forms */}
            {formsData &&
              formsData.length > 0 &&
              formsData.map((form, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-8 bg-white/5 rounded-lg "
                >
                  <div className="text-white/70 text-sm mb-1">Form</div>
                  <img
                    src={
                      form.sprites?.regular ||
                      getOfficialArtworkUrl(
                        form.pokedex_id || currentPokemon.pokedex_id,
                        false,
                      )
                    }
                    alt={form.name?.en || `Alternative form ${index}`}
                    className="w-64 h-64 object-contain"
                  />
                  <div className="text-white text-center mt-2">
                    {form.name?.en || `Form ${index + 1}`}
                  </div>
                </div>
              ))}

            {/* Mega Forms */}
            {megaForms &&
              megaForms.length > 0 &&
              megaForms.map((form, index) => (
                <div
                  key={`mega-${index}`}
                  className="flex flex-col items-center p-8 bg-white/5 rounded-lg "
                >
                  <div className="text-white/70 text-sm mb-1">Mega</div>
                  <img
                    src={
                      form.sprites?.regular ||
                      getOfficialArtworkUrl(
                        form.pokedex_id || currentPokemon.pokedex_id,
                        false,
                      )
                    }
                    alt={form.name || `Mega form ${index}`}
                    className="w-64 h-64 object-contain"
                  />
                  <div className="text-white text-center mt-2">
                    {form.name || `Mega ${index + 1}`}
                  </div>
                </div>
              ))}

            {/* Gigantamax Forms */}
            {gmaxForms && (
              <div className="flex flex-col items-center p-8 bg-white/5 rounded-lg ">
                <div className="text-white/70 text-sm mb-1">G-Max</div>
                <img
                  src={gmaxForms}
                  alt="Gigantamax form"
                  className="w-64 h-64 object-contain"
                />
                <div className="text-white text-center mt-2">Gigantamax</div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
