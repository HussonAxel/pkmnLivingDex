import { Link, createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { postQueryOptions } from "../utils/posts";
import { PostErrorComponent } from "./pokemons.$pokemonName";

export const Route = createFileRoute("/pokemons_/$pokemonName/deep")({
  loader: async ({ params: { pokemonName }, context }) => {
    const data = await context.queryClient.ensureQueryData(
      postQueryOptions(pokemonName)
    );

    return {
      title: data.title,
    };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [{ title: loaderData.title }] : undefined,
  }),
  errorComponent: PostErrorComponent,
  component: PostDeepComponent,
});

function PostDeepComponent() {
  const { pokemonName } = Route.useParams();
  const postQuery = useSuspenseQuery(postQueryOptions(pokemonName));

  return (
    <div className="p-2 space-y-2">
      <Link
        to="/pokemons"
        className="block py-1 text-blue-800 hover:text-blue-600"
      >
        ← All Posts
      </Link>
      <h4 className="text-xl font-bold underline">{postQuery.data.title}</h4>
      <div className="text-sm">{postQuery.data.body}</div>
    </div>
  );
}
