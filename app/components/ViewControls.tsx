import {
  Sparkle,
  Translate,
  Rows,
  SquaresFour,
  Swap,
} from "@phosphor-icons/react";
import { ViewSettings } from "~/types/pokemonTypes";

type ViewControlsProps = {
  viewSettings: ViewSettings;
  toggleSetting: (setting: keyof ViewSettings) => void;
};

export function ViewControls({
  viewSettings,
  toggleSetting,
}: ViewControlsProps) {
  return (
    <div className="flex gap-4 mt-2">
      <span
        className="cursor-pointer hover:bg-white/10 p-1 rounded-full transition-colors"
        onClick={() => toggleSetting("isShiny")}
        title={
          viewSettings.isShiny ? "Show normal sprites" : "Show shiny sprites"
        }
      >
        <Sparkle
          size={32}
          weight="bold"
          color={viewSettings.isShiny ? "#FFD700" : undefined}
        />
      </span>

      <span
        className="cursor-pointer hover:bg-white/10 p-1 rounded-full transition-colors"
        onClick={() => toggleSetting("language")}
        title={
          viewSettings.language === "en"
            ? "Switch to French"
            : "Switch to English"
        }
      >
        <Translate
          size={32}
          weight="bold"
          color={viewSettings.language === "fr" ? "#0055A4" : undefined}
        />
      </span>

      <ViewToggleButton
        isGridView={viewSettings.isGridView}
        toggleSetting={toggleSetting}
      />

      <span
        className="cursor-pointer hover:bg-white/10 p-1 rounded-full transition-colors"
        onClick={() => toggleSetting("isUserDatabase")}
        title={
          viewSettings.isUserDatabase
            ? "Show the entire pokedex"
            : "Show pokemons owned by the user"
        }
      >
        <Swap
          size={32}
          weight="bold"
          color={viewSettings.isUserDatabase ? "#FFD700" : undefined}
        />
      </span>
    </div>
  );
}

function ViewToggleButton({
  isGridView,
  toggleSetting,
}: {
  isGridView: boolean;
  toggleSetting: (setting: keyof ViewSettings) => void;
}) {
  return (
    <span
      className="cursor-pointer hover:bg-white/10 p-1 rounded-full transition-colors"
      onClick={() => toggleSetting("isGridView")}
      title={isGridView ? "Show as a list" : "Show as a grid"}
    >
      {isGridView ? (
        <Rows size={32} weight="bold" />
      ) : (
        <SquaresFour size={32} weight="bold" />
      )}
    </span>
  );
}
