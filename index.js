import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import routres from './routes/index.js';
import router from './routes/index.js';
import path from 'path';

const hostname = '127.0.0.1';
dotenv.config();

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log('Connected to DB');
  })
  .catch(err => {
    console.log(err);
  });

const server = express();
console.log(Date.now());
// const __dirname = path.dirname(new URL(import.meta.url).pathname);

const corsOptions = {
  corsOptions: true,
  origin: true,
  credentials: true,
  optionsSuccessStatus: 200,
};

server.use(cors(corsOptions));
server.use(express.json());
server.use('/api', router);

const port = process.env.PORT || 8000;
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
