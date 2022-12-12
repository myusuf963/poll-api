import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.route('/').get((req, res) => {
  res.send('Hey Hackathoners! 👋🏻');
});
const port = process.env.PORT || 8080;
app.listen(port, () => {
  // eslint-disable-next-line
  console.log('Server is running 🚀......');
});
