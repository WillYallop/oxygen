import http from 'http';
import app from "./app";
import ip from 'ip';

const port = 3003;
   
// Start app
const appPort = process.env.APP_PORT || port;
const appServer = http.createServer(app);

console.log(`API server started on at http://localhost:${port} (http://${ip.address()}:${port})`);

appServer.listen(appPort);