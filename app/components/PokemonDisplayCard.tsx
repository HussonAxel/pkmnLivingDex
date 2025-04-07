import React from "react";
import { Link } from "@tanstack/react-router";
import { getOfficialArtworkUrl, getIdFromUrl } from "~/utils/pokemonUtils";

interface PokemonDisplayCardProps {
  name: string;
  url: string;
  className?: string;
}

function PokemonDisplayCard({
  name,
  url,
  className = "h-32 w-32",
}: PokemonDisplayCardProps) {
  const pokemonId = getIdFromUrl(url);
  const imageUrl = pokemonId ? getOfficialArtworkUrl(pokemonId, false) : null;
  return (
    <Link
      to="/pokemon/$pokemonName"
      params={{ pokemonName: name }}
      className="pokemon-display-card flex flex-col items-center p-2 text-center hover:bg-slate-700 rounded-md transition-colors"
    >
      <p className="capitalize font-medium text-sm mb-1">{name}</p>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          loading="lazy"
          className={`object-contain ${className}`}
        />
      ) : (
        <div
          className={`bg-gray-600 flex items-center justify-center text-xs text-gray-400 rounded ${className}`}
        >
          No Img
        </div>
      )}
    </Link>
  );
}
