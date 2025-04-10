import {
  Sparkles,
  Languages,
  List,
  LayoutGrid,
  ArrowLeftRight,
} from "lucide-react";
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
    <div
      className="flex justify-around
      backdrop-blur-sm bg-black/30 shadow-lg w-1/4 m-auto
      fixed bottom-8 left-0 right-0 z-10 border rounded-full"
    >
      <span
        className="cursor-pointer hover:bg-white/10 p-4 rounded-full transition-colors"
        onClick={() => toggleSetting("isShiny")}
        title={
          viewSettings.isShiny ? "Show normal sprites" : "Show shiny sprites"
        }
      >
        <Sparkles
          size={22}
          color={viewSettings.isShiny ? "#FFD700" : undefined}
        />
      </span>

      <span
        className="cursor-pointer hover:bg-white/10 p-4 rounded-full transition-colors"
        onClick={() => toggleSetting("language")}
        title={
          viewSettings.language === "en"
            ? "Switch to French"
            : "Switch to English"
        }
      >
        <Languages
          size={22}
          color={viewSettings.language === "fr" ? "#FFD700" : undefined}
        />
      </span>

      <ViewToggleButton
        isGridView={viewSettings.isGridView}
        toggleSetting={toggleSetting}
      />

      <span
        className="cursor-pointer hover:bg-white/10 p-4 rounded-full transition-colors"
        onClick={() => toggleSetting("isUserDatabase")}
        title={
          viewSettings.isUserDatabase
            ? "Show the entire pokedex"
            : "Show pokemons owned by the user"
        }
      >
        <ArrowLeftRight
          size={22}
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
      className="cursor-pointer hover:bg-white/10 p-4 rounded-full transition-colors"
      onClick={() => toggleSetting("isGridView")}
      title={isGridView ? "Show as a list" : "Show as a grid"}
    >
      {isGridView ? <List size={22} /> : <LayoutGrid size={22} />}
    </span>
  );
}
