import mongoose from 'mongoose';
import { env } from '../utils/env.js';

// const DB_URI = `mongodb+srv://edelaida:UBAMSpvPnXeQUffJ@cluster0.9thvc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// export async function initMongoConnection() {
//   await mongoose.connect(DB_URI);
// }
export const initMongoConnection = async () => {
  try {
    const user = env('MONGODB_USER');
    const pwd = env('MONGODB_PASSWORD');
    const url = env('MONGODB_URL');
    const db = env('MONGODB_DB');  

    await mongoose.connect(
      `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`,
    );
    console.log('Mongo connection successfully established!');
  } catch (e) {
    console.log('Error while setting up mongo connection', e);
    throw e;
  }
};

 