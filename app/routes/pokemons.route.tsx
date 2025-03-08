import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import { pokemonQueryGenerationsDetailsOptions } from "~/utils/pokemonList";

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
  console.log(generationsQuery.data);

  return (
    <div className="p-2 flex gap-2">
      <ul className="list-disc pl-4">
        {[
          ...generationsQuery.data,
          { name: "i-do-not-exist", displayName: "Non-existent Post" },
        ].map((generation) => {
          return (
            <li key={generation.name} className="whitespace-nowrap">
              <Link
                to="/pokemons/$pokemonName"
                params={{
                  pokemonName: generation.name,
                }}
                className="block py-1 text-blue-800 hover:text-blue-600"
                activeProps={{ className: "text-black font-bold" }}
              >
                <div>{generation.displayName}</div>
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
