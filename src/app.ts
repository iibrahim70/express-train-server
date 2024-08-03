import cors from 'cors';
import express, { Request, Response } from 'express';
import router from './routes';
import globalErrorHandler from './middlewares/globalErrorHandler';
import notFound from './middlewares/notFound';

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// Default route for the root URL
app.get('/', (req: Request, res: Response) => {
  const serverStatus = {
    status: 'running',
    message: 'Express Train API is operational and running smoothly.',
    timestamp: new Date().toISOString(),
    version: 'v1.0.1',
    uptime: process.uptime(),
    author: {
      name: 'Ibrahim Khalil',
      email: 'iibrahiim.dev@gmail.com',
      website: 'https://iibrahim-dev.netlify.app/',
    },
    contact: {
      support: 'iibrahiim.dev@gmail.com',
      website: 'https://iibrahim-dev.netlify.app/',
    },
  };

  res.json(serverStatus);
});

// Application routes under the '/api/v1' path
app.use('/api/v1', router);

// Error-handling middlewares
app.use(globalErrorHandler); // Global error handler middleware
app.use(notFound); // Middleware to handle 404 - Not Found errors

export default app;
