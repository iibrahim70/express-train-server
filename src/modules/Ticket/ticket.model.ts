import { Schema, model } from 'mongoose';
import { ITicket, TicketModel } from './ticket.interface';
import { Train } from '../Train/train.model';
import { Wallet } from '../Wallet/wallet.model';

const ticketSchema = new Schema<ITicket, TicketModel>(
  {
    userId: {
      type: String,
      required: true,
    },
    trainId: {
      type: String,
      required: true,
    },
    fromStation: {
      type: String,
      required: true,
    },
    toStation: {
      type: String,
      required: true,
    },
    fare: {
      type: Number,
      required: true,
    },
    purchaseDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

ticketSchema.statics.purchaseTicket = async function (
  userId: string,
  trainId: string,
  fromStation: string,
  toStation: string
) {
  const train = await Train.findById(trainId);
  if (!train) {
    throw new Error('Train not found');
  }

  // Calculate fare based on train stops (for simplicity, assuming a flat rate)
  const fare = 50; // Example flat fare

  const wallet = await Wallet.findOne({ userId });
  if (!wallet || wallet.balance < fare) {
    throw new Error('Insufficient wallet balance');
  }

  wallet.balance -= fare;
  wallet.transactions.push({ amount: -fare, date: new Date(), type: 'debit' });
  await wallet.save();

  const ticket = await this.create({ userId, trainId, fromStation, toStation, fare });
  return ticket;
};

export const Ticket = model<ITicket, TicketModel>('Ticket', ticketSchema);