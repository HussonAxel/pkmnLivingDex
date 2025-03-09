import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import { pokemonQueryGenerationsDetailsOptions } from "~/utils/pokemonList";
import { CaretRight } from "@phosphor-icons/react";

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
    <div className="flex ">
      <ul className="text-xl border-r-2 border-b-2">
        {generationsQuery.data.map((generation) => {
          if (!("id" in generation)) return null;
          return (
            <Link
              key={generation.name}
              to="/pokemons/$generationID"
              params={{
                generationID: generation.id.toString(),
              }}
              className="flex my-2 text-white mx-4"
              activeProps={{
                className:
                  "bg-gray-600/80 rounded-md group is-active font-bold underline",
              }}
            >
              <li className="whitespace-nowrap w-full p-4 group-[.is-active]:hover:bg-gray-600/80 hover:bg-gray-600/40 hover:rounded-md">
                <div className="capitalize flex text-center items-end justify-between w-[350px]">
                  {`Generation ${generation.id} - ${generation.main_region?.name}`}
                  <CaretRight size={24} weight="bold" />
                </div>
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
