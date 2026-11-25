import type { Request, Response, NextFunction } from "express";
import {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  deleteRecipe
} from "./recipe.service.ts";

export async function getRecipesHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const maxMinuten = req.query.maxMinuten ? Number(req.query.maxMinuten) : undefined;
    const rezepte = await getAllRecipes(maxMinuten);
    res.json(rezepte);
  } catch (err) {
    next(err);
  }
}

export async function getRecipeHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const rezept = await getRecipeById(id);
    res.json(rezept);
  } catch (err) {
    next(err);
  }
}

export async function createRecipeHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const neues = await createRecipe(req.body);
    res.status(201).json(neues);
  } catch (err) {
    next(err);
  }
}

export async function deleteRecipeHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    await deleteRecipe(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
