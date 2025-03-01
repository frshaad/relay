import { type Request, type Response } from 'express';

export function signUp(req: Request, res: Response) {
  res.send('Sign Up Route');
}

export function logIn(req: Request, res: Response) {
  res.send('Log In Route');
}

export function logOut(req: Request, res: Response) {
  res.send('Log Out Route');
}
