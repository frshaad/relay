import type { Request, Response } from 'express';

import { AppError, ValidationError } from '../lib/errors';
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
    console.error('Signup error:', error);

    if (error instanceof ValidationError) {
      return res.status(400).json({
        status: 'error',
        message: error.message,
      });
    }

    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
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
