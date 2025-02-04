import { Document, ObjectId } from 'mongoose';

export interface ITransaction {
  amount: number;
  date: Date;
  type: 'credit' | 'debit'; 
  ref?: string;
}

export interface IWallet extends Document {
  userId: ObjectId;
  balance: number;
  transactions: ITransaction[];
}
