export interface TUser {
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  isDeleted: boolean;
  role: 'customer' | 'admin';
}
