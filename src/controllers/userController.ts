import { Request, Response } from "express";  
import loginSchema from "../schemas/loginSchema";
import registerSchema from "../schemas/registerSchema";

import * as userService from "../services/userService";

export async function signUp (req: Request, res: Response) {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) return res.sendStatus(400);
  
    const existingEmail = await userService.getUserByEmail(req.body.email);
    if (existingEmail) return res.sendStatus(409);
    
    const { email, password } = req.body as {email: string, password: string};
    await userService.signUp(email, password);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export async function signIn (req: Request, res: Response) {
  try {
    const validBody = loginSchema.validate(req.body);

    if (validBody.error) res.sendStatus(400);

    const { email, password } = req.body as {email: string, password: string};
    const token = await userService.signIn(email, password);
    
    if(token === null) return res.sendStatus(401);
    
    res.status(200).send({ token });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}
