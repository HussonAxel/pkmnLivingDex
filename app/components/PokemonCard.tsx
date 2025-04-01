import { PokemonCardProps } from "~/types/pokemonTypes";
import { MoreVertical } from "lucide-react";
import { useState } from "react";
import { PokemonCardMenu } from "./DropdownMenu";
import { Link } from "@tanstack/react-router";
import {
  dropdownPokemonCard,
  getGenerationVariantsForm,
} from "~/utils/pokemonUtils";
import {
  formatPokemonNameForUrl,
  getOfficialArtworkUrl,
} from "~/utils/pokemonUtils";

export function PokemonCard({ pokemon, viewSettings }: PokemonCardProps) {
  const formattedPokemonName = formatPokemonNameForUrl(pokemon.name.en);

  const [menuOpen, setMenuOpen] = useState(false);

  const isRegionalVariant = getGenerationVariantsForm.some((region) =>
    pokemon.name.en.toLowerCase().includes(region.toLowerCase())
  );

  const getSpriteUrl = () => {
    if (isRegionalVariant) {
      return `/assets/static/regionalForms/${formattedPokemonName}.png`;
    }
    return getOfficialArtworkUrl(pokemon.pokedex_id, viewSettings.isShiny);
  };

  return (
    <Link
      to="/pokemon/$pokemonName"
      params={{
        pokemonName: formattedPokemonName,
      }}
      className="block"
    >
      <div className="h-full p-4 border rounded-lg shadow hover:shadow-md transition-all group hover:bg-white/20 hover:border-white/40 hover:scale-[1.02] relative font-worksans">
        <div
          key={pokemon.pokedex_id}
          className={`${viewSettings.isUserDatabase ? "opacity-30" : "opacity-100"}`}
        >
          <div className="relative">
            <MoreVertical
              size={24}
              className="absolute right-0 mr-8 md:mr-0 cursor-pointer group-hover:visible menu-trigger"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setMenuOpen(!menuOpen);
              }}
            />
            <PokemonCardMenu
              isOpen={menuOpen}
              onClose={() => setMenuOpen(!menuOpen)}
              menuItems={dropdownPokemonCard as []}
            />
          </div>
          <img
            loading="lazy"
            src={getSpriteUrl()}
            alt={pokemon.name[viewSettings.language]}
            className={`mx-auto object-contain ${viewSettings.isGridView ? "w-4/5 h-4/5" : "w-44 h-44 float-left mr-4"}`}
            onError={(e) => {
              (e.target as HTMLImageElement).src = pokemon.sprites.regular;
            }}
          />
          <div
            className={`${viewSettings.isGridView ? "flex flex-col text-center gap-2 " : "flex flex-col justify-center h-24"}`}
          >
            <h2 className="font-bold text-xl xl:text-2xl truncate w-full ">
              {pokemon.name[viewSettings.language]}
            </h2>
            <span className="font-worksans text-lg text-white/70 tracking-wide">
              #{pokemon.pokedex_id}
            </span>
            <div
              className={`flex gap-2 mt-1 ${viewSettings.isGridView ? "justify-center" : ""}`}
            >
              {pokemon.types ? (
                pokemon.types.map((type: { name: string }) => (
                  <PokemonType key={type.name} type={type} />
                ))
              ) : (
                <div>No types available</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function PokemonType({ type }: { type: { name: string } }) {
  return (
    <div className={`text-md rounded-full p-2 ${type.name}`} title={type.name}>
      <img
        src={`/assets/static/pkmnsTypes/${type.name}.svg`}
        alt={type.name}
        className="w-4 h-4 object-contain"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/assets/static/placeholder.svg";
        }}
      />
    </div>
  );
}
