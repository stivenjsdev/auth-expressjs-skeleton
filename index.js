import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';

const server = express();
const PORT = process.env.port;
const URL = process.env.url;
// console.log(process.env.port);

server.use(express.json());
server.use(cors());

const main = async () => {
  try {
    await mongoose.connect(URL);

    server.listen(PORT, () => {
      console.log(`Servidor corriendo en el  puerto ${PORT}`);
    });
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
    // console.log(error.stack);
  }
}

main();