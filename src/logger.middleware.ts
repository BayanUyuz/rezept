import type { Request, Response, NextFunction } from "express";

export function logger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();

  res.on("finish", () => {
    const dauer = Date.now() - start;
    console.log(`${req.method} ${req.url} → ${res.statusCode} (${dauer} ms)`);
  });

  next();
}
