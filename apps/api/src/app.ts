import express, { NextFunction, Response, Request } from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import v1Routes from './routes/v1';

interface Error {
    status?: number;
}

const app = express();

// ------------------------------------
// CORS                               |
// ------------------------------------
const sharedCors = (req: Request, res: Response, next: NextFunction) => {
    const allowedOrigins = [''];
    const { origin } = req.headers;
    if (allowedOrigins.includes('*')) {
        res.setHeader('Access-Control-Allow-Origin', '*');
    } else if (origin) {
        if (allowedOrigins.includes(origin)) {
            res.setHeader('Access-Control-Allow-Origin', origin);
        }
    }
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization, Auth-Strategy',
    );
    if (req.method === 'OPTIONS') {
        res.header(
            'Access-Control-Allow-Methods',
            'PUT, POST, PATCH, DELETE, GET',
        );
        res.status(200).json({});
    }
    next();
};

// ------------------------------------
// MIDDLEWARE
// ------------------------------------
app.use(express.json());
app.use(sharedCors);
app.use(morgan('dev'));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
    fileUpload({
        useTempFiles: false,
        limits: { fileSize: 4 * 1024 * 1024 },
    }),
);

// ------------------------------------
// Routes
// ------------------------------------
// developer routes
app.use('/v1/dev/library', v1Routes.developer.library);
app.use('/v1/dev/setting', v1Routes.developer.setting);
// core routes
app.use('/v1/core/authentication', v1Routes.core.authentication);
app.use('/v1/core/user', v1Routes.core.user);

// ------------------------------------
// ERROR HANDLING
// ------------------------------------
app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error('Not Found');
    next(error);
});

app.use((error: Error, req: Request, res: Response) => {
    res.status(error.status || 500);
});

export default app;
