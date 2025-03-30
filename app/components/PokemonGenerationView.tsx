import { useState } from "react";
import { ViewControls } from "./ViewControls";
import { PokemonGrid } from "./PokemonGrid";
import { ViewSettings } from "~/types/pokemonTypes";

type PokemonGenerationViewProps = {
  generationID: string;
  generationData: any[];
};

export function PokemonGenerationView({
  generationID,
  generationData,
}: PokemonGenerationViewProps) {
  const [viewSettings, setViewSettings] = useState<ViewSettings>({
    isUserDatabase: false,
    isShiny: false,
    language: "en",
    isGridView: true,
  });

  const toggleSetting = (setting: keyof ViewSettings) => {
    if (setting === "language") {
      setViewSettings((prev) => ({
        ...prev,
        language: prev.language === "en" ? "fr" : "en",
      }));
    } else {
      setViewSettings((prev) => ({
        ...prev,
        [setting]: !prev[setting],
      }));
    }
  };

  return (
    <div className="flex-1 mx-8">
      <div>
        <PokemonGrid
          generationData={generationData}
          viewSettings={viewSettings}
          generationID={generationID}
        />
      </div>
      <ViewControls viewSettings={viewSettings} toggleSetting={toggleSetting} />
    </div>
  );
}
