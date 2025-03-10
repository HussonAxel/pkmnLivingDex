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
    <div className="space-y-2 flex-1 mx-8">
      <div>
        <div className="mb-6 border-b pb-4">
          {generationID === "0" ? (
            <h2 className="text-2xl font-bold">
              Toutes générations confondues
            </h2>
          ) : (
            <h2 className="text-2xl font-bold">Generation {generationID}</h2>
          )}
        </div>

        <PokemonGrid
          generationData={generationData}
          viewSettings={viewSettings}
        />
      </div>
      <ViewControls viewSettings={viewSettings} toggleSetting={toggleSetting} />
    </div>
  );
}
