import { Schema, Types, model } from "mongoose";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
}

interface UserDocument extends UserData {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserData>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true
    },
    passwordHash: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserModel = model<UserDocument>("User", userSchema);

export { UserModel };
