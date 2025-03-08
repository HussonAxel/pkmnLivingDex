import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import { pokemonQueryOptions } from "~/utils/pokemonList";

export const Route = createFileRoute("/pokemons")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(pokemonQueryOptions());
  },
  head: () => ({
    meta: [{ title: "Pokemons" }],
  }),
  component: PostsComponent,
});

function PostsComponent() {
  const pokemonsQuery = useSuspenseQuery(pokemonQueryOptions());

  return (
    <div className="p-2 flex gap-2">
      <ul className="list-disc pl-4">
        {[
          ...pokemonsQuery.data,
          { name: "i-do-not-exist", title: "Non-existent Post" },
        ].map((pokemon) => {
          return (
            <li key={pokemon.name} className="whitespace-nowrap">
              <Link
                to="/pokemons/$pokemonName"
                params={{
                  pokemonName: pokemon.name,
                }}
                className="block py-1 text-blue-800 hover:text-blue-600"
                activeProps={{ className: "text-black font-bold" }}
              >
                <div>{pokemon.name}</div>
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
