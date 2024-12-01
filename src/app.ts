import express, { Request, Response } from 'express';
import { productRoutes } from './module/product/product.route';
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/products', productRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

export default app;
