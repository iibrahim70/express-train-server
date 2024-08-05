import { model, Schema } from 'mongoose';
import { ITicket } from './ticket.interface';

// Define the schema for the Ticket model
const ticketSchema = new Schema<ITicket>(
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
    price: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

// Create the Ticket model using the schema
export const Ticket = model<ITicket>('Ticket', ticketSchema);
