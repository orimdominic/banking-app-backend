import { Router } from "express";
import {
  signUpSchema,
  verificationSchema,
} from "../request-schema/auth.schema";
import validateRequestPayload from "../middlewares/payload-validator";
import {
  handleUserVerification,
  signUpHandler,
} from "../controllers/auth.controller";

const router = Router();

router.post("/signup", validateRequestPayload(signUpSchema), signUpHandler());

router.post(
  "/verification",
  validateRequestPayload(verificationSchema),
  handleUserVerification()
);

export default router;
