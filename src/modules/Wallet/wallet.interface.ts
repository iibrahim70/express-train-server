import { Document, Model } from 'mongoose';

export interface ITransaction {
  amount: number;
  date: Date;
  type: 'credit' | 'debit';
}

export interface IWallet extends Document {
  userId: string;
  balance: number;
  transactions: ITransaction[];
}

export interface WalletModel extends Model<IWallet> {
  addFunds(userId: string, amount: number): Promise<IWallet>;
}