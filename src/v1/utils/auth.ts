import * as bcrypt from "bcrypt";

export const hashPassword = async (
  password: string,
  { hash = bcrypt.hash } = {}
): Promise<string> => {
  return hash(password, 10);
};
