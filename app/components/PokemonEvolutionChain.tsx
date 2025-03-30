import { useSuspenseQuery } from "@tanstack/react-query";
import { Route as PokemonRoute } from "~/routes/pokemons.$pokemonName";
import {
  getOfficialArtworkUrl,
  translatePokemonName,
  formatPokemonNameForUrl,
} from "~/utils/pokemonUtils";

export function PokemonEvolutionChain() {
  const { pokemonName } = PokemonRoute.useParams();

  // Fetch Pokémon data from Tyradex API
  const tyradexQuery = useSuspenseQuery({
    queryKey: ["pokemon-tyradex", pokemonName],
    queryFn: () =>
      fetch(`https://tyradex.vercel.app/api/v1/pokemon/${pokemonName}`).then(
        (res) => res.json(),
      ),
  });

  // Extract data from Tyradex response with safety checks
  const currentPokemon = tyradexQuery.data || {};
  const previousForms = currentPokemon?.evolution?.pre || [];
  const nextForms = currentPokemon?.evolution?.next || [];
  const formsData = currentPokemon?.formes || [];
  const megaForms = currentPokemon?.evolution?.mega || [];
  const gmaxForms = currentPokemon?.sprites?.gmax;

  // Fetch G-Max form data if it exists and we don't have a proper image
  const gmaxQuery = useSuspenseQuery({
    queryKey: ["pokemon-gmax", pokemonName],
    queryFn: async () => {
      try {
        const formattedName = `${pokemonName.toLowerCase().replace(/\s+/g, "-")}-gmax`;
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${formattedName}`,
        );

        if (!response.ok) {
          return { success: false };
        }

        const data = await response.json();
        return {
          success: true,
          image:
            data.sprites.other?.["official-artwork"]?.front_default ||
            data.sprites.other?.home?.front_default ||
            data.sprites.front_default,
          sprites: data.sprites,
        };
      } catch (error) {
        console.error("Error fetching G-Max form:", error);
        return { success: false };
      }
    },
    enabled: !!gmaxForms, // Only run this query if gmaxForms exists from the Tyradex API
  });

  // Function to get mega form image
  const getMegaFormUrl = (formIndex) => {
    // Determine if it's a specific mega form (X/Y)
    const megaForm = megaForms[formIndex] || {};

    // Format the mega reference name
    const megaType = megaForm.name?.includes("X")
      ? "-mega-x"
      : megaForm.name?.includes("Y")
        ? "-mega-y"
        : "-mega";

    // Construct the base URL from the PokeAPI format
    const baseName = (currentPokemon?.name?.en || pokemonName)
      .toLowerCase()
      .replace(/\s+/g, "-");

    // Return the constructed URL to the official artwork for the mega form
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${baseName}${megaType}.png`;
  };

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
                    alt={form.name}
                    className="w-64 h-64 object-contain"
                  />
                  <div className="text-white text-center mt-2 text-md">
                    {form.name}
                  </div>
                  <p className="relative">{form.condition}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Current Pokémon */}
        <div className="flex flex-col items-center mx-4">
          <h3 className="text-lg font-semibold text-white/80 mb-2">Current</h3>
          <div className="flex flex-col items-center p-8 bg-white/10 rounded-lg border border-white/20">
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
                  className="flex flex-col items-center p-8 bg-white/5 rounded-lg"
                >
                  <img
                    src={getOfficialArtworkUrl(form.pokedex_id, false)}
                    alt={form.name}
                    className="w-64 h-64 object-contain"
                  />
                  <div className="text-white text-center mt-2">{form.name}</div>
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
                  className="flex flex-col items-center p-8 bg-white/5 rounded-lg"
                >
                  <div className="text-white/70 text-sm mb-1">Form</div>
                  <img
                    src={`/assets/static/regionalForms/${formatPokemonNameForUrl(
                      form.name?.en || `Form ${index + 1}`,
                    )}.png`}
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
                  className="flex flex-col items-center p-8 bg-white/5 rounded-lg"
                >
                  <div className="text-white/70 text-sm mb-1">Mega</div>
                  <img
                    src={form.sprites?.regular || getMegaFormUrl(index)}
                    alt={
                      form.name ||
                      `Mega ${currentPokemon?.name?.en || pokemonName}`
                    }
                    className="w-64 h-64 object-contain"
                    onError={(e) => {
                      // Fallback if the constructed URL fails
                      e.target.src = getOfficialArtworkUrl(
                        form.pokedex_id || currentPokemon?.pokedex_id,
                        false,
                      );
                    }}
                  />
                  <div className="text-white text-center mt-2">
                    {form.name ||
                      `Mega ${currentPokemon?.name?.en || pokemonName}`}
                  </div>
                </div>
              ))}

            {/* Gigantamax Forms */}
            {gmaxForms && (
              <div className="flex flex-col items-center p-8 bg-white/5 rounded-lg">
                <div className="text-white/70 text-sm mb-1">G-Max</div>
                <img
                  src={
                    gmaxQuery.data?.success ? gmaxQuery.data.image : gmaxForms
                  }
                  alt={`Gigantamax ${currentPokemon?.name?.en || pokemonName}`}
                  className="w-64 h-64 object-contain"
                  onError={(e) => {
                    // Fallback if the G-Max image fails to load
                    e.target.src = getOfficialArtworkUrl(
                      currentPokemon?.pokedex_id,
                      false,
                    );
                  }}
                />
                <div className="text-white text-center mt-2">
                  Gigantamax {currentPokemon?.name?.en || pokemonName}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
