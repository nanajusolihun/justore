import mongoose from "mongoose";

const configOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

const connectToDB = async () => {
  const connectionUrl = "mongodb+srv://jusolihun_nana:wCHow3OsjP50mRSM@cluster0.u5xs4ut.mongodb.net/justore";

  mongoose
    .connect(connectionUrl, configOptions)
    .then(() => console.log("Database connected successfully!"))
    .catch((err) =>
      console.log(`Getting Error from DB connection ${err.message}`)
    );
};

export default connectToDB;
