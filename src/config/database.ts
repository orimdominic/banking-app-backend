import { connect, connection, disconnect } from "mongoose";

export async function connectToDatabase(dbUri: string) {
  await connect(dbUri)
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
      console.error("Error connecting to database");
      console.error(err);
      throw err;
    });
}

export async function close() {
  try {
    return disconnect();
  } catch (error) {
    console.error("Error disconnecting from database");
    console.error(error);
    throw error;
  }
}

export async function dropDB() {
  try {
    return connection.dropDatabase();
  } catch (error) {
    console.error("Error dropping database");
    console.error(error);
    throw error;
  }
}
