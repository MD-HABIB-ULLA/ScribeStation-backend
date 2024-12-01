import express, { Request, Response } from 'express';
import { productRoutes } from './module/product/product.route';

const app = express();


app.use('/api/v1/products', productRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

export default app;
