import { Router } from 'express';
import { UserRoutes } from '../modules/User/user.route';
import { StationRoutes } from '../modules/Station/station.route';

const router = Router();

const routes = [
  { path: '/users', route: UserRoutes },
  { path: '/stations', route: StationRoutes },
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;
