import { config } from "dotenv";
import { z } from "zod";

config();

const envSchema = z.object({
  DB_URI: z.string().nonempty(),
});

export default envSchema.parse(process.env);
