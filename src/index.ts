import { createServer } from "node:http";
import { connectToDatabase } from "./config/database";
import app from "./app";
import env from "./config/env";

const server = createServer(app);
const port = process.env.PORT ?? 3000;

async function startServer() {
  try {
    await connectToDatabase(env.DB_URI);
    server.listen(port, () =>
      console.log(`Server is listening on port ${port}`)
    );
  } catch (error) {
    console.error(error);
  }
}

startServer();
