import { ErrorComponent, Link, createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { pokemonDetailsQueryOptions } from "~/utils/pokemonList";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { NotFound } from "~/components/NotFound";

export const Route = createFileRoute("/pokemons/$pokemonName")({
  loader: async ({ params: { pokemonName }, context }) => {
    const data = await context.queryClient.ensureQueryData(
      pokemonDetailsQueryOptions(pokemonName)
    );

    return {
      title: data.name,
    };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [{ title: loaderData.title }] : undefined,
  }),
  errorComponent: PostErrorComponent,
  notFoundComponent: () => {
    return <NotFound>Pokemon not found </NotFound>;
  },
  component: PostComponent,
});

export function PostErrorComponent({ error }: ErrorComponentProps) {
  return <ErrorComponent error={error} />;
}

function PostComponent() {
  const { pokemonName } = Route.useParams();
  const postQuery = useSuspenseQuery(pokemonDetailsQueryOptions(pokemonName));

  return (
    <div className="space-y-2">
      <h4 className="text-xl font-bold underline">
        {postQuery.data.species.name}
      </h4>
      <div className="text-sm">{postQuery.data.base_experience}</div>
      <img
        src={
          postQuery.data.sprites.other["official-artwork"].front_default ?? ""
        }
      />
      <Link
        to="/pokemons/$pokemonName/deep"
        params={{
          pokemonName: postQuery.data.name,
        }}
        activeProps={{ className: "text-black font-bold" }}
        className="block py-1 text-blue-800 hover:text-blue-600"
      >
        Deep View
      </Link>
    </div>
  );
}
