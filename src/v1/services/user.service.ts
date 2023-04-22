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
