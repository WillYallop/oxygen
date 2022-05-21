require('dotenv').config();

import http from 'http';
import ip from 'ip';
import app from './app';

const port = 3003;

// Start app
const appPort = process.env.APP_PORT || port;
const appServer = http.createServer(app);

// eslint-disable-next-line
console.log(
  `API server started on at http://localhost:${port} (http://${ip.address()}:${port})`,
);

appServer.listen(appPort);
