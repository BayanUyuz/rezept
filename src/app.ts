import express from "express";
import recipeRoutes from "./recipe.routes.ts";
import { logger } from "./logger.middleware.ts";
import { errorHandler } from "./error.middleware.ts";

const app = express();

app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.send("Willkommen bei der Rezepte-API 👋");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Test-Route für kontrollierten Fehler (Bonus)
app.get("/crash", (req, res) => {
  throw new Error("Absichtlicher Absturz zum Testen");
});

app.use("/recipes", recipeRoutes);

// 404-Fallback für unbekannte Routen
app.use((req, res) => {
  res.status(404).json({
    fehler: `Route ${req.method} ${req.url} existiert nicht`
  });
});

// Globale Error-Middleware
app.use(errorHandler);

export default app;
