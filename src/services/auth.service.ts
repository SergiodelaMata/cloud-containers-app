import { NextFunction, Request, Response } from "express";

export class AuthService {
  public static authUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (req.session && req.session.email) {
      return next();
    } else return res.sendStatus(401);
  }

  public static generateSession(req: Request) {
    req.session.email = req.body.email;
  }
}
