import { useSuspenseQuery } from "@tanstack/react-query";
import { Route as PokemonRoute } from "~/routes/pokemons.$pokemonName";
import { getOfficialArtworkUrl } from "~/utils/pokemonUtils";

interface dataSpeciesTypes {
  dataSpecies: string;
}
export function PokemonEvolutionChain() {
  const { pokemonName } = PokemonRoute.useParams();
  console.log(pokemonName);

  const evolutionChainQuery = useSuspenseQuery({
    queryKey: ["evolution-chain"],
    queryFn: () =>
      fetch(`https://tyradex.vercel.app/api/v1/pokemon/${pokemonName}`).then(
        (res) => res.json(),
      ),
  });
  const previousForms = evolutionChainQuery.data.evolution.pre;
  const nextForms = evolutionChainQuery.data.evolution.next;
  const formsData = evolutionChainQuery.data.formes;
  const megaForms = evolutionChainQuery.data.evolution.mega;
  const gmaxForms = evolutionChainQuery.data.sprites.gmax;
  const sprite = evolutionChainQuery.data.pokedex_id;

  if (previousForms) {
    console.log("previousForms", previousForms);
  }
  if (nextForms) {
    console.log("nextForms", nextForms);
  }
  if (formsData) {
    console.log("alternatives forms", formsData);
  }
  if (megaForms) {
    console.log("megaForms", megaForms);
  }
  if (gmaxForms) {
    console.log("gmaxForms", gmaxForms);
  }

  return (
    <section className="flex">
      {previousForms &&
        previousForms.map((form) => {
          return (
            <>
              <div key={form.id}>{form.name}</div>{" "}
              <img
                src={getOfficialArtworkUrl(form.pokedex_id, false)}
                alt={form.name}
                className="w-64 h-64"
              />
            </>
          );
        })}
      {nextForms &&
        nextForms.map((form) => {
          return (
            <>
              <div key={form.id}>{form.name}</div>{" "}
              <img
                src={getOfficialArtworkUrl(form.pokedex_id, false)}
                alt={form.name}
                className="w-64 h-64"
              />
            </>
          );
        })}
    </section>
  );
}
