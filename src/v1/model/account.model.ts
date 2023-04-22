import { Schema, Types, model } from "mongoose";

interface AccountData {
  ownerId: Types.ObjectId;
  balance: number;
  number: string;
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
      default: 0,
    },
    number: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toObject: {
      virtuals: true,
      getters: true,
    },
  }
);

const AccountModel = model<AccountDocument>("Account", accountSchema);

export { AccountModel };
