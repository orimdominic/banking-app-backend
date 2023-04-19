import { Router } from "express";
import { signUpSchema } from "../request-schema/auth.schema";
import validateRequestPayload from "../middlewares/payload-validator";

const router = Router();

router.post("/signup", validateRequestPayload(signUpSchema), (req, res) =>
  res.json({ ok: true })
);

export default router;
