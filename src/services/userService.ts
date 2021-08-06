import bcrypt from "bcrypt";
import { getRepository } from "typeorm";

import User from "../entities/User";

export async function singUp (email: string, password: string){
  const repository = getRepository(User);

  const hashedPassword = bcrypt.hashSync(password, 10);

  await repository.insert({email, password: hashedPassword});
}