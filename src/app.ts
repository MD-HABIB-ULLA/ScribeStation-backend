import express, { Request, Response } from 'express';
import { productRoutes } from './module/product/product.route';
import cors from 'cors';
import { orderRoutes } from './module/order/order.route';
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

export default app;
