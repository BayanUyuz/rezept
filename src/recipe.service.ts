import { RecipeNotFoundError, ValidationError } from "./errors.ts";

export type Rezept = {
  id: number;
  titel: string;
  minuten: number;
  portionen: number;
  zutaten?: string[];
};

let rezepte: Rezept[] = [
  {
    id: 1,
    titel: "Spaghetti Carbonara",
    minuten: 20,
    portionen: 2,
    zutaten: ["Spaghetti", "Guanciale", "Eigelb", "Pecorino Romano", "Schwarzer Pfeffer"]
  },
  {
    id: 2,
    titel: "Linsen-Curry",
    minuten: 35,
    portionen: 4,
    zutaten: ["Rote Linsen", "Kokosmilch", "Tomaten", "Zwiebeln", "Currypulver"]
  },
  {
    id: 3,
    titel: "Avocado Toast",
    minuten: 10,
    portionen: 1,
    zutaten: ["Sauerteigbrot", "Avocado", "Zitrone", "Chiliflocken", "Salz"]
  }
];

let naechsteId = 4;

export async function getAllRecipes(maxMinuten?: number): Promise<Rezept[]> {
  if (maxMinuten !== undefined && !isNaN(maxMinuten)) {
    return rezepte.filter((r) => r.minuten <= maxMinuten);
  }
  return rezepte;
}

export async function getRecipeById(id: number): Promise<Rezept> {
  const rezept = rezepte.find((r) => r.id === id);
  if (!rezept) {
    throw new RecipeNotFoundError(id);
  }
  return rezept;
}

export async function createRecipe(daten: Omit<Rezept, "id">): Promise<Rezept> {
  if (!daten.titel || daten.titel.trim() === "") {
    throw new ValidationError("Ein Rezept braucht einen Titel");
  }
  if (daten.minuten === undefined || Number(daten.minuten) <= 0) {
    throw new ValidationError("Zubereitungszeit in Minuten muss größer als 0 sein");
  }
  if (daten.portionen === undefined || Number(daten.portionen) <= 0) {
    throw new ValidationError("Portionen müssen mindestens 1 sein");
  }

  const neues: Rezept = {
    id: naechsteId++,
    titel: daten.titel.trim(),
    minuten: Number(daten.minuten),
    portionen: Number(daten.portionen),
    zutaten: daten.zutaten || []
  };

  rezepte.push(neues);
  return neues;
}

export async function deleteRecipe(id: number): Promise<boolean> {
  const index = rezepte.findIndex((r) => r.id === id);
  if (index === -1) {
    throw new RecipeNotFoundError(id);
  }
  rezepte.splice(index, 1);
  return true;
}
