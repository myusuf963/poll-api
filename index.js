import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import dbConnector from './src/utils/dbConnector.js';
import routes from './src/views/routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(routes);

app.route('/').get((req, res) => {
  res.send('Hey Hackathoners! 👋🏻');
});
dbConnector();
const port = process.env.PORT || 8080;
app.listen(port, () => {
  // eslint-disable-next-line
  console.log('Server is running 🚀......');
});
