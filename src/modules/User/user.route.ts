import { Router } from 'express';
import { UserControllers } from './user.controller';

const router = Router();

router.post('/register', UserControllers.registerUser);
router.post('/login', UserControllers.loginUser);

export const UserRoutes = router;
