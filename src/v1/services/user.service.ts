import { UserModel } from "../model/user.model";
import ServiceError from "../utils/ServiceError";

/** Throws an error with the label `EMAIL_ALREADY_EXISTS` if email is found */
export async function ensureEmailIsNew(
  email: string,
  { User = UserModel } = {}
) {
  const user = await User.findOne({ email: email.toLowerCase() });

  if (user) {
    throw new ServiceError("Email already exists", "EMAIL_ALREADY_EXISTS");
  }
}

interface CreateUserData {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
}
export async function createUser(
  userData: CreateUserData,
  { User = UserModel } = {}
) {
  const newUser = await User.create(userData);
  return newUser.toObject();
}

/**
 * @throws ServiceError with the label USER_NOT_FOUND
 * @throws ServiceError with the label USER_ALREADY_VERIFIED
 */
export async function verifyUser(
  userId: string,
  { User = UserModel } = {}
) {
  const user = await User.findById(userId);

  if (!user) {
    throw new ServiceError("User not found", "USER_NOT_FOUND");
  }

  if (user.isVerified) {
    throw new ServiceError("User is already verified", "USER_ALREADY_VERIFIED");
  }

  user.isVerified = true;

  const updatedUser = await user.save();

  return updatedUser.toObject();
}
