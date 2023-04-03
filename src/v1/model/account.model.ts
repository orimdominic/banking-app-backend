import { Schema, Types, model } from "mongoose";

interface AccountData {
  ownerId: Types.ObjectId;
  balance: number;
}

interface AccountDocument extends AccountData {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const accountSchema = new Schema<AccountData>(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const AccountModel = model<AccountDocument>("Account", accountSchema);

export { AccountModel };
