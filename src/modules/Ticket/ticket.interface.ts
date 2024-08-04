import { Document, Model } from 'mongoose';

export interface ITicket extends Document {
  userId: string;
  trainId: string;
  fromStation: string;
  toStation: string;
  fare: number;
  purchaseDate: Date;
}

export interface TicketModel extends Model<ITicket> {
  purchaseTicket(userId: string, trainId: string, fromStation: string, toStation: string): Promise<ITicket>;
}