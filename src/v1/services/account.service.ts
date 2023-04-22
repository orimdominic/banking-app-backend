import { randomBytes } from "crypto";
import { Types } from "mongoose";
import { AccountModel } from "../model/account.model";

export async function generateAccountNumber({ Account = AccountModel } = {}) {
  let accountNumber = randomBytes(10).toString("hex").toUpperCase();

  let accountNumberExists = !!(await Account.findOne({
    number: accountNumber,
  }));
  const cache = new Map();

  while (accountNumberExists) {
    cache.set(accountNumber, true);
    accountNumber = randomBytes(10).toString("hex").toUpperCase();

    if (cache.has(accountNumber)) {
      accountNumberExists = true;
      continue;
    }

    accountNumberExists = !!(await Account.findOne({ number: accountNumber }));
  }

  return accountNumber;
}

interface CreateAccountData {
  number: string;
  ownerId: Types.ObjectId;
}
export async function createAccount(
  accountData: CreateAccountData,
  { Account = AccountModel } = {}
) {
  const account = await Account.create(accountData);
  return account.toObject();
}
