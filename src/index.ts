import { createServer } from "node:http";
import app from "./app";

const server = createServer(app);
const port = process.env.PORT ?? 3000;

async function startServer() {
  try {
    server.listen(port, () => console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.error(error);
  }
}

startServer();
