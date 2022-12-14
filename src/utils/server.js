import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import * as dotenv from 'dotenv';
import routes from '../views/routes.js';
import dbConnector from './dbConnector.js';
import { createIOServer } from './ioServer.js';

let server;

export function runServer() {
  dotenv.config();

  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(routes);

  server = http.createServer(app);
  createIOServer('/test', server);

  app.route('/').get((req, res) => {
    res.sendFile('index.html', { root: '.' });
  });
  dbConnector();
  const port = process.env.PORT || 8080;

  server.listen(port, () => {
    // eslint-disable-next-line
    console.log('Server is running 🚀......');
  });
}

export { server };
