import { z } from "zod";

export const signUpSchema = z.object({
  body: z.object({
    firstName: z.string().nonempty(),
    lastName: z.string().nonempty(),
    email: z.string().email().nonempty(),
    password: z.string().min(8),
  }),
});
