export interface BearStatePopulation {
  bears: number;
  increaseBearPopulation(): void;
  lowerBearPopulation(): void;
  resetBearPopulation(): void;
}

export interface BearState {
  bears: number;
}

export interface BearActions {
  increaseBearPopulation: () => void;
  lowerBearPopulation: () => void;
  resetBearPopulation: () => void;
}
