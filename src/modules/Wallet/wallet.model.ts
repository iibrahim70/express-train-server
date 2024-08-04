import { Schema, model } from 'mongoose';
import { ITransaction, IWallet, WalletModel } from './wallet.interface';

const transactionSchema = new Schema<ITransaction>(
  {
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    type: {
      type: String,
      enum: ['credit', 'debit'],
      required: true,
    },
  },
  { _id: false }
);

const walletSchema = new Schema<IWallet, WalletModel>(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
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
  { timestamps: true }
);

walletSchema.statics.addFunds = async function (userId: string, amount: number) {
  const wallet = await this.findOne({ userId });
  if (!wallet) {
    throw new Error('Wallet not found');
  }
  wallet.balance += amount;
  wallet.transactions.push({ amount, date: new Date(), type: 'credit' });
  await wallet.save();
  return wallet;
};

export const Wallet = model<IWallet, WalletModel>('Wallet', walletSchema);
