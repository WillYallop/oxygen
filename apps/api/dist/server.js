"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const ip_1 = __importDefault(require("ip"));
const appPort = process.env.APP_PORT || 3003;
const appServer = http_1.default.createServer(app_1.default);
console.log(`API server started on IPS ${ip_1.default.address()}:3003`);
appServer.listen(appPort);
//# sourceMappingURL=server.js.map