import App from '@/app';
import * as http from 'http';
import { Server } from 'socket.io';

import agenda from '@/utils/agenda';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import validateEnv from '@utils/validateEnv';
import UserRoute from './routes/user.route';

import { PORT, NODE_ENV } from './config';
import { logger } from './utils/logger';
import NewsletterRoute from './routes/newsletter.route';

validateEnv();

const app = new App([
  new IndexRoute(),
  new AuthRoute(),
  new UserRoute(),
  new NewsletterRoute(),
]);

const server = http.createServer(app.app);
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins or specify your client URL
    methods: ['GET', 'POST'],
  },
});

// Handle WebSocket connections
io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

export { io };

server.listen(PORT, () => {
  logger.info(`================================================`);
  logger.info(`=============== ENV: ${NODE_ENV} ===============`);
  logger.info(`🚀 App listening on the port ${PORT} on Server`);
  logger.info(`================================================`);
});

agenda.start();
