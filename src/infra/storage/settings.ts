import { Vitamin } from '../../domain/Vitamin.ts';
import { Mineral } from '../../domain/Mineral.ts';
import { Macroelement } from '../../domain/Macro.ts';

const SELECTED_VITAMINS_KEY = 'selected-vitamins';
const SELECTED_MINERALS_KEY = 'selected-minerals';
const SELECTED_MACROELEMENTS_KEY = 'selected-macroelements';

export function getSelectedVitamins(): Vitamin[] | null {
  const selectedVitamins = localStorage.getItem(SELECTED_VITAMINS_KEY);
  if (selectedVitamins === null) {
    return null;
  } else {
    return JSON.parse(selectedVitamins);
  }
}

export function getSelectedMinerals(): Mineral[] | null {
  const selectedMinerals = localStorage.getItem(SELECTED_MINERALS_KEY);
  if (selectedMinerals === null) {
    return null;
  } else {
    return JSON.parse(selectedMinerals);
  }
}

export function getSelectedMacroelements(): Macroelement[] | null {
  const selectedMacroelements = localStorage.getItem(SELECTED_MACROELEMENTS_KEY);
  if (selectedMacroelements === null) {
    return null;
  } else {
    return JSON.parse(selectedMacroelements);
  }
}

export function updateSelectedVitamins(vitamins: Vitamin[]) {
  console.log('vitamins', vitamins);
  localStorage.setItem(SELECTED_VITAMINS_KEY, JSON.stringify(vitamins));
}

export function updateSelectedMinerals(minerals: Mineral[]) {
  localStorage.setItem(SELECTED_MINERALS_KEY, JSON.stringify(minerals));
}

export function updateSelectedMacroelements(macroelements: Macroelement[]) {
  localStorage.setItem(SELECTED_MACROELEMENTS_KEY, JSON.stringify(macroelements));
}
