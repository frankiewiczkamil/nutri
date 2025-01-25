import { Unit, UNIT } from "./Unit.ts";

export type Mineral =
  | "arsenic"
  | "cadmium"
  | "calcium"
  | "chloride"
  | "chromium"
  | "copper"
  | "iodine"
  | "iron"
  | "lead"
  | "magnesium"
  | "manganese"
  | "mercury"
  | "molybdenum"
  | "phosphorus"
  | "potassium"
  | "selenium"
  | "sodium"
  | "zinc";

const { mikrogram, miligram, nanogram } = UNIT;

export const mineralUnits: Record<Mineral, Unit> = {
  calcium: miligram,
  chloride: miligram,
  chromium: mikrogram,
  copper: mikrogram,
  iodine: mikrogram,
  iron: miligram,
  magnesium: miligram,
  manganese: miligram,
  molybdenum: mikrogram,
  phosphorus: miligram,
  potassium: miligram,
  selenium: mikrogram,
  sodium: miligram,
  zinc: miligram,
  lead: nanogram,
  mercury: nanogram,
  arsenic: nanogram,
  cadmium: nanogram,
};
