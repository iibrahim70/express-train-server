import { ObjectId } from 'mongoose';

export interface ITicket {
  userId: ObjectId;
  trainId: ObjectId;
  fromStation: string;
  toStation: string;
  price: number;
  purchaseDate: Date;
  ticketNumber: string;
}