import { io, type Socket } from 'socket.io-client';

const URL = 'http://localhost:3000';

let initiatedSocket: Socket | null = null;

export const initateSocket = (token: string) => {
  if (initiatedSocket) {
    return initiatedSocket;
  }

  initiatedSocket = io(URL, {
    autoConnect: false,
    extraHeaders: {
      Authorization: 'Bearer ' + token,
    },
  });

  return initiatedSocket;
};
