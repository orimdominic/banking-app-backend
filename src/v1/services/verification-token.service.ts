import { randomBytes } from "crypto";
import { Types } from "mongoose";
import { VerificationTokenModel } from "../model/verification-token.model";
import ServiceError from "../utils/ServiceError";

export async function createToken(
  userId: Types.ObjectId,
  { VerificationToken = VerificationTokenModel } = {}
) {
  const token = randomBytes(6).toString("hex").substring(6).toUpperCase();
  await VerificationToken.create({
    token,
    userId,
  });
  return token;
}

interface IsTokenValidParmas {
  userId: string;
  token: string;
}
/** @throws ServiceError with label TOKEN_NOT_FOUND */
export async function ensureTokenIsValid(
  { userId, token }: IsTokenValidParmas,
  { VerificationToken = VerificationTokenModel } = {}
) {
  const tokenDocument = await VerificationToken.findOne({
    userId,
    token,
  });

  if (!tokenDocument) {
    throw new ServiceError("Token not found", "TOKEN_NOT_FOUND");
  }

  await VerificationToken.deleteOne({
    userId,
    token,
  });
}
