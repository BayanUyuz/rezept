import type { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(`[${err.name || "Error"}]: ${err.message}`);
  const status = typeof err.status === "number" ? err.status : 500;
  res.status(status).json({
    fehler: err.message || "Interner Serverfehler"
  });
}
