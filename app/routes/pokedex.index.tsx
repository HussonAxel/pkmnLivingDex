import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/pokedex/")({
  component: PokemonsIndexComponent,
});

function PokemonsIndexComponent() {
  return (
    <div className="container mx-auto px-6 py-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 relative inline-block">
        <span className="relative z-10">Select a Region</span>
        <span className="absolute bottom-0 left-0 w-full h-3 bg-yellow-300 opacity-40 -z-10 transform -rotate-1"></span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {regions.map((region) => (
          <Link
            key={region.id}
            to="/pokedex/$generationID"
            params={{ generationID: region.id }}
            className="group focus:outline-none focus:ring-2 focus:ring-red-500 rounded-xl"
          >
            <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full border flex flex-col">
              <div className="relative overflow-hidden">
                <img
                  src={standardizeImagePath(region.img) || "/placeholder.svg"}
                  alt={`${formatRegionName(region.name)} region`}
                  className="w-full h-72 object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-4 flex-grow flex flex-col">
                <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">
                  {formatRegionName(region.name)}
                </h3>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    {getPokemonCount(region.id)}
                  </span>
                  <span className="inline-flex items-center text-sm font-medium text-red-500 group-hover:text-red-600 transition-colors">
                    Explore
                    <svg
                      className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function formatRegionName(name: string): string {
  if (name === "allRegions") return "All Regions";
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function standardizeImagePath(path: string): string {
  if (path.startsWith("public/")) {
    return path.replace("public/", "/");
  }
  return path;
}

// Helper function to get Pokémon count per region
function getPokemonCount(regionId: string): string {
  const counts: Record<string, string> = {
    "0": "All Pokémon",
    "1": "151 Pokémon",
    "2": "100 Pokémon",
    "3": "135 Pokémon",
    "4": "107 Pokémon",
    "5": "156 Pokémon",
    "6": "72 Pokémon",
    "7": "88 Pokémon",
    "8": "89 Pokémon",
    "9": "103 Pokémon",
  };

  return counts[regionId] || "Multiple Pokémon";
}

const regions = [
  {
    name: "allRegions",
    id: "0",
    img: "/assets/static/RegionsAssets/AllRegions.webp",
  },
  {
    name: "kanto",
    id: "1",
    img: "/assets/static/RegionsAssets/Kanto.webp",
  },
  {
    name: "johto",
    id: "2",
    img: "/assets/static/RegionsAssets/Johto.webp",
  },
  {
    name: "hoenn",
    id: "3",
    img: "/assets/static/RegionsAssets/Hoenn.webp",
  },
  {
    name: "sinnoh",
    id: "4",
    img: "/assets/static/RegionsAssets/Sinnoh.webp",
  },
  {
    name: "unova",
    id: "5",
    img: "/assets/static/RegionsAssets/Unova.webp",
  },
  {
    name: "kalos",
    id: "6",
    img: "/assets/static/RegionsAssets/Kalos.webp",
  },
  {
    name: "alola",
    id: "7",
    img: "/assets/static/RegionsAssets/Alola.webp",
  },
  {
    name: "galar",
    id: "8",
    img: "/assets/static/RegionsAssets/Galar.webp",
  },
  {
    name: "paldea",
    id: "9",
    img: "/assets/static/RegionsAssets/Paldea.webp",
  },
];
