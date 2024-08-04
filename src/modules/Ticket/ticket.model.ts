import { model, Schema } from 'mongoose';
import { ITicket, TicketModel } from './ticket.interface';
import { Train } from '../Train/train.model';
import { Wallet } from '../Wallet/wallet.model';

// Define the schema for the Ticket model
const ticketSchema = new Schema<ITicket, TicketModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    trainId: {
      type: Schema.Types.ObjectId,
      ref: 'Train',
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
      type: Number, // Fare in cents to avoid floating-point precision issues
      required: true,
    },
  },
  { timestamps: true },
);

// Static method to purchase a ticket
ticketSchema.statics.purchaseTicket = async function (
  userId: string,
  trainId: string,
  fromStation: string,
  toStation: string,
) {
  const train = await Train.findById(trainId);
  if (!train) {
    throw new Error('Train not found');
  }

  // Calculate fare based on train stops (for simplicity, assuming a flat rate)
  const fare = 50; // Example flat fare in cents

  const wallet = await Wallet.findOne({ userId });
  if (!wallet || wallet.balance < fare) {
    throw new Error('Insufficient wallet balance');
  }

  wallet.balance -= fare;
  wallet.transactions.push({
    amount: -fare,
    date: new Date(),
    type: 'credit',
  });
  await wallet.save();

  const ticket = await this.create({
    userId,
    trainId,
    fromStation,
    toStation,
    fare,
  });

  return ticket;
};

// Create the Ticket model using the schema
export const Ticket = model<ITicket, TicketModel>('Ticket', ticketSchema);
