import { Server } from 'socket.io';

export default function createIOServer(id, server) {
    const io = new Server(server, {
        path: id
    });

    io.on('connection', (socket) => {
        console.log(`user: ${socket.id} connected`);
      
        socket.on('vote', (voteData) => {
          console.log('dta', voteData);
          socket.emit('response', voteData);
          socket.broadcast.emit('response', voteData);
        });
      
        socket.on('disconnect', () => {
          console.log(`${socket.id} disconnected`);
        });
      });
}