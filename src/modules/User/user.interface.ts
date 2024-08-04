import { Model, ObjectId } from 'mongoose';
import { USER_ROLE } from './user.constant';

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

export type TUserRole = keyof typeof USER_ROLE;

// for creating a static
export interface UserModel extends Model<IUser> {
  isUserExistsByEmail(email: string): Promise<IUser | null>;
}
