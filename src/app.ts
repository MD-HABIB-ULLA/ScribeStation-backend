import express, { Application, Request, Response } from 'express';

import cors from 'cors';
import router from './app/routes';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
const app: Application = express();

app.use(express.json({ limit: '20mb' })); // Set JSON request body limit to 20MB

app.use(
  cors({
    origin: 'http://localhost:5173', // Allow frontend origin
    credentials: true, // Allow sending cookies if needed
  }),
);
// app.use(cors({ origin: ['http://localhost:5000'], credentials: true }));

app.use('/api/', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});
app.use(globalErrorHandler);
app.use(notFound);

export default app;
