import express, { NextFunction, Response, Request } from 'express';
// import cookieParser from 'cookie-parser';
import morgan from 'morgan';
// import fileUpload from 'express-fileupload';

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
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    res.status(200).json({});
  }
  next();
};

// ------------------------------------
// APP                                |
// ------------------------------------
const app = express();
// ------------------------------------
// CORS
app.use(sharedCors);
// ------------------------------------
// MIDDLEWARE
app.use(morgan('dev'));
// ------------------------------------
// Routes
app.get('/', (req, res) => {
  res.send('GET request to the homepage');
});

// ------------------------------------
// ERROR HANDLING
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error('Not Found');
  next(error);
});
app.use((error: any, req: Request, res: Response) => {
  res.status(error.status || 500);
});

export default app;
