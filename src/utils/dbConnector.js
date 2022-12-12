import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

const dbURI = process.env.MONGO_URI || 'mongodb://localhost:27017/poll-db';
const connectToDb = () => {
  mongoose.set('strictQuery', false);
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    return mongoose.connect(dbURI, options);
  } catch (error) {
    throw new Error(error);
  }
};

export default connectToDb;
