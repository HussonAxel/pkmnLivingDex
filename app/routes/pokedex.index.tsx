import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/pokedex/")({
  component: PokemonsIndexComponent,
});

function PokemonsIndexComponent() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Select a Region:</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {regions.map((region) => (
          <Link
            to="/pokedex/$generationID"
            params={{ generationID: region.id }}
          >
            <div
              key={region.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transform cursor-pointer transition-all duration-500"
            >
              <img
                src={region.img}
                alt={`${region.name} region`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {region.name}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

const regions = [
  {
    name: "allRegions",
    id: "0",
    img: "allregions.png",
  },
  {
    name: "kanto",
    id: "1",
    img: "test.png",
  },
  {
    name: "johto",
    id: "2",
    img: "johto.png",
  },
  {
    name: "hoenn",
    id: "3",
    img: "hoenn.png",
  },
  {
    name: "sinnoh",
    id: "4",
    img: "sinnoh.png",
  },
  {
    name: "unova",
    id: "5",
    img: "unova.png",
  },
  {
    name: "kalos",
    id: "6",
    img: "kalos.png",
  },
  {
    name: "alola",
    id: "7",
    img: "alola.png",
  },
  {
    name: "galar",
    id: "8",
    img: "galar.png",
  },
  {
    name: "paldea",
    id: "9",
    img: "paldea.png",
  },
];
