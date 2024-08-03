import express, { Request, Response } from 'express';
import cors from 'cors';
import router from './routes';
import globalErrorHandler from './middlewares/globalErrorHandler';
import notFound from './middlewares/notFound';

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1', router);

// default route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// global error handler
app.use(globalErrorHandler);

// not found route
app.use(notFound);

export default app;
