import { io } from 'socket.io-client';

const URL = import.meta.env.DEV ? 'http://localhost:3000' : import.meta.env.VITE_WS_HOST;

export const socket = io(URL);
