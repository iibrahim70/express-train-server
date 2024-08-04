import { Router } from 'express';
import { UserRoutes } from '../modules/User/user.route';
import { StationRoutes } from '../modules/Station/station.route';
import { TrainRoutes } from '../modules/Train/train.route';
import { WalletRoutes } from '../modules/Wallet/wallet.route';
import { TicketRoutes } from '../modules/Ticket/ticket.route';

const router = Router();

const routes = [
  { path: '/users', route: UserRoutes },
  { path: '/stations', route: StationRoutes },
  { path: '/trains', route: TrainRoutes },
  { path: '/wallets', route: WalletRoutes },
  { path: '/tickets', route: TicketRoutes },
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;
