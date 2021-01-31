import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import { signin } from './routes/signin';
import { signup } from './routes/signup';

const app = express();

app.use(json());
app.use(cors());

app.use(signup);
app.use(signin);

app.listen(4000, () => console.log('Listening at 4000'));
