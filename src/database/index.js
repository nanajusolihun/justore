import { URL_DB } from "@/config";
import mongoose from "mongoose";

const configOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

const connectToDB = async () => {
  const connectionUrl = URL_DB;

  mongoose
    .connect(connectionUrl, configOptions)
    .then(() => console.log("Database connected successfully!"))
    .catch((err) =>
      console.log(`Getting Error from DB connection ${err.message}`)
    );
};

export default connectToDB;
