import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, '../.env') });

import contactRoute from './routes/contact.js';
import subscribeRoute from './routes/subscribe.js';

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(
  cors({
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200,
  })
);

app.use('/api', subscribeRoute);
app.use('/api', contactRoute);

app.get('/', (_, res) => {
  res.send('Hello Pranjal!');
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running at port ${port}`));
