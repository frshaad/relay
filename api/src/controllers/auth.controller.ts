import type { Request, Response } from 'express';

import { AppError } from '../lib/errors';
import { UserService } from '../services/user.services';

export async function signUp(req: Request, res: Response) {
  try {
    const { fullname, email, password } = req.body;

    const { user } = await UserService.signup(
      {
        fullname,
        email,
        password,
      },
      res,
    );

    res.status(201).json({
      status: 'success',
      data: { user },
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    } else {
      console.error('Error in Sign Up Controller:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  }
}

// ********************************************

export async function logIn(req: Request, res: Response) {
  res.send('Log In Route');
}

// ********************************************

export async function logOut(req: Request, res: Response) {
  res.send('Log Out Route');
}
