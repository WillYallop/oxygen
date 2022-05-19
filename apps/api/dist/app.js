"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const sharedCors = (req, res, next) => {
    const allowedOrigins = [
        ''
    ];
    const origin = req.headers.origin;
    if (allowedOrigins.includes('*')) {
        res.setHeader('Access-Control-Allow-Origin', '*');
    }
    else {
        if (origin) {
            if (allowedOrigins.includes(origin)) {
                res.setHeader('Access-Control-Allow-Origin', origin);
            }
        }
    }
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Auth-Strategy');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
};
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.get('/test', (req, res) => {
    console.log('here');
    res.send('GET request to the homepage');
});
app.use((req, res, next) => {
    const error = new Error('Not Found');
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
});
exports.default = app;
//# sourceMappingURL=app.js.map