import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (userData: TUser) => {
  const user = new User(userData);
  const result = await User.create(user);
  return result;
};

export const UserServices = {
  createUserIntoDB,
};
