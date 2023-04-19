import { NextFunction, Response, Request } from "express";
import { z } from "zod";

export default function validateRequestPayload(schema: z.AnyZodObject) {
  return function (req: Request, res: Response, next: NextFunction) {
    try {
      const { body, params, query } = req;

      schema.parse({ body, params, query });

      next();
    } catch (error) {
      const errors = JSON.parse((error as z.ZodError).message);

      const responseErrors = errors.map(
        (err: { path: string[]; message: string }) => {
          return {
            source: err.path.join("."),
            message: err.message,
          };
        }
      );

      return res.status(400).json({
        status: "error",
        error: responseErrors,
      });
    }
  };
}
