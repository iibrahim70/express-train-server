import { Router } from 'express';
import { TicketControllers } from './ticket.controller';
import validateAuth from '../../middlewares/validateAuth';
import { USER_ROLE } from '../User/user.constant';

const router = Router();

router.post(
  '/purchase',
  validateAuth(USER_ROLE.admin, USER_ROLE.user),
  TicketControllers.purchaseTicket,
);

export const TicketRoutes = router;
