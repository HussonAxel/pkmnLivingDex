import { useSuspenseQuery } from "@tanstack/react-query";
import { Outlet, createFileRoute } from "@tanstack/react-router";
// import { postsQueryOptions } from "../utils/posts";
import { pokemonQueryOptions } from "~/utils/pokemonList";

export const Route = createFileRoute("/posts")({
  loader: async ({ context }) => {
    // await context.queryClient.ensureQueryData(postsQueryOptions());
    await context.queryClient.ensureQueryData(pokemonQueryOptions());
  },
  head: () => ({
    meta: [{ title: "Posts" }],
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
          { id: "i-do-not-exist", title: "Non-existent Post" },
        ].map((pokemon) => {
          return (
            <li key={pokemon.name} className="whitespace-nowrap">
              {pokemon.name}
            </li>
          );
        })}
      </ul>
      <hr />
      <Outlet />
    </div>
  );
}
