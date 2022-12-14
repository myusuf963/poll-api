import { Server } from 'socket.io';

let servers = [];

export function createIOServer(id, server) {
    const io = new Server(server, {
        path: id
    });
    if (servers.length > 0) servers = [];
    servers.push(io);

}

export function runServer() {
  [ io ] = servers;
  io.on('connection', (socket) => {
    console.log(`user: ${socket.id} connected`);
  
    socket.on('disconnect', () => {
      console.log(`${socket.id} disconnected`);
    });
  });
}

export function deleteServers() {
  servers = [];
}

export function getServer() {
  return servers[0];
}