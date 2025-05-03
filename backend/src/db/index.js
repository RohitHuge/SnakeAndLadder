import mongo from 'mongoose';
import { DB_NAME } from '../constants.js';

const connectDB = async () => {
  try {
    await mongo.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
    console.log(`MongoDB connected to ${DB_NAME}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
}

export { connectDB };