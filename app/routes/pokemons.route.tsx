import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import { pokemonQueryGenerationsDetailsOptions } from "~/utils/pokemonList";
import type { GenerationsRoot } from "~/utils/types/pokemonList.types";

export const Route = createFileRoute("/pokemons")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(
      pokemonQueryGenerationsDetailsOptions()
    );
  },
  head: () => ({
    meta: [{ title: "Pokemons" }],
  }),
  component: PostsComponent,
});

function PostsComponent() {
  const generationsQuery = useSuspenseQuery(
    pokemonQueryGenerationsDetailsOptions()
  );

  return (
    <div className="flex gap-2">
      <ul className="text-xl border-r-2">
        {...generationsQuery.data.map((generation) => {
          console.log(generation);
          return (
            <Link
              key={generation.name}
              to="/pokemons/$pokemonName"
              params={{
                pokemonName: generation.name,
              }}
              className="block py-1 text-white"
              activeProps={{ className: "bg-[#313244]" }}
            >
              <li className="whitespace-nowrap px-16 py-1 hover:bg-gray-800">
                <div className="capitalize">{`Generation ${generation.id} - ${generation.main_region?.name}`}</div>
              </li>
            </Link>
          );
        })}
      </ul>
      <hr />
      <Outlet />
    </div>
  );
}
