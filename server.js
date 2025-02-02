import app from "./src/app.js";
import { connectMongodb } from "./src/config/mongodb.js";

const startServer = async () => {
  await connectMongodb();
  console.log("Connected to MongoDB");
};

startServer();

export default app;
