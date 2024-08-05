import { Document, ObjectId } from 'mongoose';

export interface ITransaction {
  amount: number;
  date: Date;
}

export interface IWallet extends Document {
  userId: ObjectId;
  balance: number;
  transactions: ITransaction[];
}
