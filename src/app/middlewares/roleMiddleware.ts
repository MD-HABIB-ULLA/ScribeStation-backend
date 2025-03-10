import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { TUserRole } from '../module/user/user.interface';
import { User } from '../module/user/user.model';
import catchAsync from '../utils/catchAsync';
import config from '../config';

// Custom Request interface
interface CustomRequest extends Request {
  user?: JwtPayload;
}

const roleMiddleware = (...requiredRoles: TUserRole[]) => {
  return catchAsync(
    async (req: CustomRequest, res: Response, next: NextFunction) => {
      const token = req.header('Authorization')?.split(' ')[1];

      if (!token) {
        throw new Error('You are not authorized!');
      }

      // checking if the given token is valid
      const decoded = jwt.verify(token, config.secret as string) as JwtPayload;

      const { role, email } = decoded;

      // checking if the user is exist
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error('This user is not found !');
      }

      // checking if the user is inactive
      const userStatus = user?.isActive;

      if (userStatus === false) {
        throw new Error('This user is blocked ! !');
      }

      if (requiredRoles && !requiredRoles.includes(role)) {
        throw new Error('You are not authorized');
      }

      req.user = decoded;
      next();
    },
  );
};

export default roleMiddleware;
