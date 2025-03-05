import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { User } from '../module/user/user.model';

interface CustomRequest extends Request {
  user?: string;
}

const authMiddleware = catchAsync(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
      throw new Error('You are not authorized!');
    }

    const decoded = jwt.verify(token, config.secret as string) as JwtPayload;
    const { email } = decoded;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('User not found!');
    }
    // console.log(user);

    // Attach user info to request
    req.body.user = user._id.toString();
    next();
  },
);

export default authMiddleware;

// import jwt from "jsonwebtoken";
// import { Request, Response, NextFunction } from "express";
// import User from "../models/User"; // Adjust the path to your User model

// interface AuthRequest extends Request {
//   user?: { id: string; email: string; role: string };
// }

// const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
//   try {
//     // Get token from headers
//     const token = req.header("Authorization")?.split(" ")[1]; // "Bearer <token>"

//     if (!token) {
//       return res.status(401).json({ message: "No token, authorization denied" });
//     }

//     // Verify the token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { email: string; role: string };

//     // Fetch the user from the database using email
//     const user = await User.findOne({ email: decoded.email });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Attach user details to request
//     req.user = { id: user._id.toString(), email: user.email, role: user.role };

//     next(); // Move to next middleware
//   } catch (error) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

// export default authMiddleware;
