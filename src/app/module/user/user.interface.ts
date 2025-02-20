import { USER_ROLE } from "./user.constant";

export interface TUser {
  name: string;
  email: string;
  image: string;
  password: string;
  isActive: boolean;
  isDeleted: boolean;
  role: 'customer' | 'admin';
}


export type TUserRole = keyof typeof USER_ROLE;