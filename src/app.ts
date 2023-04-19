import express from "express";
import v1Router from "./v1/routes";

import type { Request, Response, NextFunction, Application } from "express";

const app: Application = express();

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  return res.json({ ok: true });
});

app.use("/api/v1", v1Router);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  return res.status(500).json({
    error: err.message,
    status: "error",
  });
});

export default app;
