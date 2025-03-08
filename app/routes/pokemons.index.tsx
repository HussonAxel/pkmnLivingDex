import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/pokemons/")({
  component: PokemonsIndexComponent,
});

function PokemonsIndexComponent() {
  return <div>Select a pokemon.</div>;
}
