import { Model } from 'mongoose';

export interface IUser {
  fullName: string;
  email: string;
  phoneNumber: string;
  avatar: string;
  password: string;
  role: 'user' | 'admin';
  isDeleted: boolean;
  isBlocked: boolean;
  status: 'in-progress' | 'blocked';
}

// for creating a static
export interface UserModel extends Model<IUser> {
  isUserExistsByEmail(email: string): Promise<IUser | null>;
}
