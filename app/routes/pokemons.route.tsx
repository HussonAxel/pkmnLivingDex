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
            <li
              key={generation.name}
              className="whitespace-nowrap px-16 hover:bg-[#313244]"
            >
              <Link
                to="/pokemons/$pokemonName"
                params={{
                  pokemonName: generation.name,
                }}
                className="block py-1 text-white "
                activeProps={{ className: "text-black font-bold underline" }}
              >
                <div className="capitalize">{`Generation ${generation.id} - ${generation.main_region?.name}`}</div>
              </Link>
            </li>
          );
        })}
      </ul>
      <hr />
      <Outlet />
    </div>
  );
}
