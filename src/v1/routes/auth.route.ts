import { Router } from "express";
import { signUpSchema } from "../request-schema/auth.schema";
import validateRequestPayload from "../middlewares/payload-validator";
import { signUpHandler } from "../controllers/auth.controller";

const router = Router();

router.post("/signup", validateRequestPayload(signUpSchema), signUpHandler());

export default router;
