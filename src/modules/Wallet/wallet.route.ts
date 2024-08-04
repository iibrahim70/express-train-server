import { Router } from 'express';
import { WalletControllers } from './wallet.controller';

const router = Router();

router.post('/add-funds', WalletControllers.addFunds);
router.get('/:userId', WalletControllers.getWallet);

export const WalletRoutes = router;
