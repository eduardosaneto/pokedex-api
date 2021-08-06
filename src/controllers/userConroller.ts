import { Request, Response } from "express";  

import * as userService from "../services/userService";

export async function signUp (req: Request, res: Response) {
  try {
    const { email, password } = req.body as {email: string, password: string};
    await userService.singUp(email, password);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export async function singIn (req: Request, res: Response) {
  try {
    const { email, password } = req.body as {email: string, password: string};
    await userService.singUp(email, password);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}
