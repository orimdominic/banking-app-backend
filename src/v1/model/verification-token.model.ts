import { Types, Schema, model } from "mongoose";

interface VerificationTokenData {
  token: string;
  userId: Types.ObjectId;
}

interface VerificationTokenDocument extends VerificationTokenData {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const verificationTokenSchema = new Schema<VerificationTokenData>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    token: {
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

const VerificationTokenModel = model<VerificationTokenDocument>(
  "VerificationToken",
  verificationTokenSchema
);

export { VerificationTokenModel };
