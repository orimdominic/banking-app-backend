import express from "express";

import type { Request, Response, NextFunction, Application } from "express";

const app: Application = express();

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.json({ ok: true });
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  return res.status(500).json({
    error: err.message,
    status: "error",
  });
});

export default app;
