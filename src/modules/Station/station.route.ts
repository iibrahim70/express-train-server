import { Router } from 'express';
import { StationControllers } from './station.controller';
import validateAuth from '../../middlewares/validateAuth';
import { USER_ROLE } from '../User/user.constant';

const router = Router();

router.get('/', StationControllers.getAllStations);
router.get('/:stationId', StationControllers.getSingleStation);
router.post(
  '/create-station',
  validateAuth(USER_ROLE.admin, USER_ROLE.user),
  StationControllers.createStation,
);
router.patch(
  '/update-station/:stationId',
  validateAuth(USER_ROLE.admin, USER_ROLE.user),
  StationControllers.updateStation,
);

export const StationRoutes = router;
