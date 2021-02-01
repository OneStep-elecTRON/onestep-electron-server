import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { json } from 'body-parser';
import { signin } from './routes/signin';
import { signup } from './routes/signup';
import { progress } from './routes/progressBar';
import { quiz } from './routes/quiz';
import { getUser } from './routes/getUser';

const dotenv = require('dotenv');
const app = express();
const httpserver = require('http').createServer(app);
const PORT = process.env.PORT || 4000;

declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}

dotenv.config();

app.use(json());
app.use(cors());

app.use(getUser);
app.use(signup);
app.use(signin);
app.use(progress);
app.use(quiz);

httpserver.listen(PORT, async () => {
  await mongoose.connect(
    `mongodb+srv://itsaadarsh:${process.env.MONGO_PWD}@onestep-server.bhw4e.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true }
  );
  console.log('Connected to Database');
  console.log(`Listening at PORT ${PORT}`);
});
