import { Router } from 'express';
import { TrainControllers } from './train.controller';
import validateAuth from '../../middlewares/validateAuth';
import { USER_ROLE } from '../User/user.constant';

const router = Router();

router.get('/', TrainControllers.getAllTrains);
router.get('/:trainId', TrainControllers.getSingleTrain);

router.post(
  '/create-train',
  validateAuth(USER_ROLE.admin, USER_ROLE.user),
  TrainControllers.createTrain,
);
router.patch(
  '/update-train/:trainId',
  validateAuth(USER_ROLE.admin, USER_ROLE.user),
  TrainControllers.updateTrain,
);

export const TrainRoutes = router;
