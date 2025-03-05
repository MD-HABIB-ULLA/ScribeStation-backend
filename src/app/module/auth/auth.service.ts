/* eslint-disable @typescript-eslint/no-unused-vars */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';
import config from '../../config';
import { Cart } from '../cart/cart.model';

const register = async (payload: TUser) => {
  const result = await User.create(payload);
  await Cart.create({ user: result._id });
  return result;
};

const login = async (payload: { email: string; password: string }) => {
  // checking if the user exists
  const user = await User.findOne({ email: payload?.email }).select(
    '+password',
  );

  if (!user) {
    throw new Error('This user is not found!');
  }

  // checking if the user is inactive
  if (!user.isActive) {
    throw new Error('This user is blocked!');
  }

  // checking if the password is correct
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user.password,
  );

  if (!isPasswordMatched) {
    throw new Error('Wrong Password!!! Tell me who are you? 😈');
  }

  // create token
  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(jwtPayload, config.secret as string, {
    expiresIn: '1d',
  });

  // remove password from user object
  const { password, isDeleted, isActive, ...data } = user.toObject();

  return { token, user: data };
};

export const AuthService = {
  register,
  login,
};
