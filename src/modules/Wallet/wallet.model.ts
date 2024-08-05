import { Schema, model } from 'mongoose';
import { ITransaction, IWallet } from './wallet.interface';

const transactionSchema = new Schema<ITransaction>({
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const walletSchema = new Schema<IWallet>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    balance: {
      type: Number,
      required: true,
      default: 0,
    },
    transactions: {
      type: [transactionSchema],
      default: [],
    },
  },
  { timestamps: true },
);

export const Wallet = model<IWallet>('Wallet', walletSchema);
