import type { Response, Request } from "express";
import type ServiceError from "../utils/ServiceError";

import { StatusCodes } from "http-status-codes";
import { createUser, ensureEmailIsNew } from "../services/user.service";
import {
  generateAccountNumber,
  createAccount,
} from "../services/account.service";
import { hashPassword } from "../utils/auth";
import { createToken } from "../services/verification-token.service";
import { sendVerificationRequest } from "../services/mail.service";

export function signUpHandler({
  ensureEmailDoesNotExist = ensureEmailIsNew,
  getAccountNumber = generateAccountNumber,
  createNewUser = createUser,
  createUserAccount = createAccount,
  createVerificationToken = createToken,
  sendVerificationRequestMail = sendVerificationRequest,
} = {}) {
  return async function signUp(req: Request, res: Response) {
    try {
      const payload = req.body;

      await ensureEmailDoesNotExist(payload.email);
      const accountNumber = await getAccountNumber();
      const hashedPassword = await hashPassword(payload.password);

      const user = await createNewUser({
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        passwordHash: hashedPassword,
      });

      await createUserAccount({
        ownerId: user._id,
        number: accountNumber,
      });

      const token = await createVerificationToken(user._id);

      sendVerificationRequestMail({ email: payload.email, token });

      return res.status(StatusCodes.CREATED).json({
        message: "User account created successully",
        status: "success",
        data: null
      });
    } catch (error) {
      const labelCodeMap: Record<string, StatusCodes> = {
        EMAIL_ALREADY_EXISTS: StatusCodes.CONFLICT,
      };

      const statusCode =
        labelCodeMap[(error as ServiceError)?.label] ??
        StatusCodes.INTERNAL_SERVER_ERROR;

      return res.status(statusCode).json({
        status: "error",
        message: (error as Error).message,
      });
    }
  };
}
