import { Model, ObjectId } from 'mongoose';

export interface ITicket {
  userId: ObjectId;
  trainId: ObjectId;
  fromStation: string;
  toStation: string;
  fare: number;
  purchaseDate: Date;
}

export interface TicketModel extends Model<ITicket> {
  purchaseTicket(
    userId: ObjectId,
    trainId: ObjectId,
    fromStation: string,
    toStation: string,
  ): Promise<ITicket>;
}
