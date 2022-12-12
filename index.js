import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

import * as dotenv from 'dotenv';
import dbConnector from './src/utils/dbConnector.js';
import routes from './src/views/routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(routes);

const server = http.createServer(app);
const io = new Server(server);

app.route('/').get((req, res) => {
  // res.send('Hey Hackathoners! 👋🏻');
  res.sendFile('index.html', { root: '.'});
});
dbConnector();
const port = process.env.PORT || 8080;

// app.route('/newSession').post((req, res) => {

// });

io.on('connection', (socket) => {
  console.log(`user: ${socket.id} connected`);
  // console.log('query', socket.handshake.query);
  // console.log('auth', socket.handshake.auth);

  socket.on('vote', (voteData) => {
    console.log('dta', voteData);
    socket.emit('response', voteData);
    socket.broadcast.emit('response', voteData);
  });

  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`);
  });
});

server.listen(port, () => {
  // eslint-disable-next-line
  console.log('Server is running 🚀......');
});
