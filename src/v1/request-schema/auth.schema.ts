import { z } from "zod";
import { Types } from "mongoose";

export const signUpSchema = z.object({
  body: z.object({
    firstName: z.string().nonempty(),
    lastName: z.string().nonempty(),
    email: z.string().email().nonempty(),
    password: z.string().min(8),
  }),
});

export const verificationSchema = z.object({
  body: z.object({
    userId: z.string().refine((val) => {
      return Types.ObjectId.isValid(val);
    }),
    token: z.string().length(6),
  }),
});
