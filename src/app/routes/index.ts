import { Router } from 'express';

import { ProductRoutes } from '../module/product/product.routes';
import { OrderRoutes } from '../module/order/order.routes';
import { UserRoutes } from '../module/user/user.routes';
import AuthRouter from '../module/auth/auth.routes';
import { CartRoutes } from '../module/cart/cart.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRouter,
  },
  {
    path: '/cart',
    route: CartRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
