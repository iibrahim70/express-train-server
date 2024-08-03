import { Router } from 'express';
import { UserRoutes } from '../modules/User/user.route';

const router = Router();

const routes = [{ path: '/users', route: UserRoutes }];

routes.forEach((route) => router.use(route.path, route.route));

export default router;
