import { randomBytes } from "crypto";
import { Types } from "mongoose";
import { VerificationTokenModel } from "../model/verification-token.model";

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
